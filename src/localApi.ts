import { RECIPES, STOCK_CATALOG } from "@/lib/recipes";

type InventoryItem = { id: number; name: string; quantity: number; unit: string; category: string };
type ShoppingItem = { id: number; name: string; quantity: number; unit: string; source: string };
type HistoryItem = { id: number; recipeId: string; servings: number; cookedAt: string };
type LocalState = { inventory: InventoryItem[]; shopping: ShoppingItem[]; history: HistoryItem[]; nextId: number };

const STORAGE_KEY = "jinwan-chi-shenme-state-v1";

function readState(): LocalState {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as LocalState | null;
    if (parsed?.inventory && parsed?.shopping && parsed?.history) return parsed;
  } catch {
    // A damaged browser-local record should not prevent the app from opening.
  }
  return { inventory: [], shopping: [], history: [], nextId: 1 };
}

function saveState(state: LocalState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

function upsertShopping(state: LocalState, name: string, quantity: number, unit: string, source: string) {
  const existing = state.shopping.find((item) => item.name === name);
  if (existing) Object.assign(existing, { quantity: Math.max(existing.quantity, quantity), unit, source });
  else state.shopping.unshift({ id: state.nextId++, name, quantity, unit, source });
}

export function installLocalApi() {
  const networkFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const requestUrl = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const path = new URL(requestUrl, window.location.origin).pathname.replace(/^\/jinwan-chi-shenme/, "");
    if (!path.startsWith("/api/")) return networkFetch(input, init);

    const state = readState();
    if (path === "/api/state") return json({ inventory: state.inventory, shopping: state.shopping, history: state.history });

    let payload: Record<string, unknown> = {};
    try { payload = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>; } catch { return json({ error: "数据格式不正确" }, 400); }

    if (path === "/api/inventory") {
      const action = String(payload.action ?? "add");
      const rawItems = action === "bulk" ? payload.items : payload.item ? [payload.item] : [];
      const items = Array.isArray(rawItems) ? rawItems as Array<Record<string, unknown>> : [];
      for (const raw of items) {
        const name = String(raw.name ?? "").trim();
        if (!name) continue;
        const quantity = Math.max(0, Number(raw.quantity ?? 0));
        const unit = String(raw.unit ?? "份");
        const category = String(raw.category ?? "其他");
        const existing = state.inventory.find((item) => item.name === name);
        if (action === "remove") state.inventory = state.inventory.filter((item) => item.name !== name);
        else if (existing) Object.assign(existing, { quantity: action === "set" ? quantity : existing.quantity + quantity, unit, category });
        else state.inventory.push({ id: state.nextId++, name, quantity, unit, category });
        if (quantity > 0) state.shopping = state.shopping.filter((item) => item.name !== name);
      }
      saveState(state);
      return json({ ok: true });
    }

    if (path === "/api/shopping") {
      const action = String(payload.action ?? "add");
      const id = Number(payload.id ?? 0);
      const found = state.shopping.find((item) => item.id === id);
      if (action === "purchased" && found) {
        const stock = state.inventory.find((item) => item.name === found.name);
        if (stock) stock.quantity += found.quantity;
        else state.inventory.push({ id: state.nextId++, name: found.name, quantity: found.quantity, unit: found.unit, category: "其他" });
        state.shopping = state.shopping.filter((item) => item.id !== id);
      } else if (action === "remove") state.shopping = state.shopping.filter((item) => item.id !== id);
      else {
        const name = String(payload.name ?? "").trim();
        if (!name) return json({ error: "请输入要买的东西" }, 400);
        upsertShopping(state, name, Math.max(0.1, Number(payload.quantity ?? 1)), String(payload.unit ?? "份"), "手动添加");
      }
      saveState(state);
      return json({ ok: true });
    }

    if (path === "/api/cook") {
      const recipe = RECIPES.find((item) => item.id === String(payload.recipeId ?? ""));
      if (!recipe) return json({ error: "没有找到这道菜" }, 404);
      const servings = Math.min(6, Math.max(1, Number(payload.servings ?? 2)));
      const factor = servings / recipe.servings;
      for (const ingredient of recipe.ingredients) {
        const stock = state.inventory.find((item) => item.name === ingredient.name);
        if (stock) stock.quantity = Math.max(0, stock.quantity - ingredient.amount * factor);
        if (!stock || stock.quantity <= 0) {
          const catalog = STOCK_CATALOG.find((item) => item.name === ingredient.name);
          upsertShopping(state, ingredient.name, catalog?.defaultQuantity ?? ingredient.amount, ingredient.unit, `做完「${recipe.name}」后用完`);
        }
      }
      state.history.unshift({ id: state.nextId++, recipeId: recipe.id, servings, cookedAt: new Date().toISOString() });
      state.history = state.history.slice(0, 12);
      saveState(state);
      return json({ ok: true, recipe: recipe.name });
    }

    return json({ error: "不支持的操作" }, 404);
  };
}
