"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { RECIPES, Recipe, STARTER_STOCK, STOCK_CATALOG } from "@/lib/recipes";
import { getSource, LIBRARY_CATEGORIES, LIBRARY_RECIPES, LibraryRecipe, SOURCE_LIBRARY } from "@/lib/library";

type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

type ShoppingItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  source: string;
};

type HistoryItem = { id: number; recipeId: string; servings: number; cookedAt: string };
type Tab = "today" | "fridge" | "shopping" | "library";

const TIME_OPTIONS = [
  { value: 10, label: "10 分钟", note: "快点吃上" },
  { value: 15, label: "15 分钟", note: "工作日晚饭" },
  { value: 25, label: "25 分钟", note: "可以慢一点" },
  { value: 120, label: "不赶时间", note: "炖一锅也行" },
];

const POT_OPTIONS = [
  { value: 1, label: "一口锅", note: "洗碗越少越好" },
  { value: 2, label: "两口锅", note: "可以接受" },
  { value: 3, label: "无所谓", note: "好吃优先" },
];

function formatAmount(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}

function formatClock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function CookingApp() {
  const [tab, setTab] = useState<Tab>("today");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [timeBudget, setTimeBudget] = useState(15);
  const [potTolerance, setPotTolerance] = useState(1);
  const [servings, setServings] = useState(2);
  const [recommendationSeed, setRecommendationSeed] = useState(0);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [cooking, setCooking] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [toast, setToast] = useState("");
  const [stockForm, setStockForm] = useState({ name: "", quantity: "", unit: "个" });
  const [shoppingForm, setShoppingForm] = useState({ name: "", quantity: "1", unit: "份" });
  const [libraryQuery, setLibraryQuery] = useState("");
  const [libraryCategory, setLibraryCategory] = useState("全部");
  const [librarySelected, setLibrarySelected] = useState<LibraryRecipe | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }, []);

  const loadState = useCallback(async () => {
    try {
      const response = await fetch("/api/state", { cache: "no-store" });
      const data = (await response.json()) as {
        inventory?: InventoryItem[];
        shopping?: ShoppingItem[];
        history?: HistoryItem[];
        error?: string;
      };
      if (!response.ok) throw new Error(data.error || "读取失败");
      setInventory(data.inventory ?? []);
      setShopping(data.shopping ?? []);
      setHistory(data.history ?? []);
    } catch (error) {
      notify(error instanceof Error ? error.message : "库存暂时没有加载出来");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void loadState();
  }, [loadState]);

  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setTimerRunning(false);
          if (navigator.vibrate) navigator.vibrate([100, 80, 100]);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, secondsLeft]);

  const inventoryMap = useMemo(
    () => new Map(inventory.map((item) => [item.name, Number(item.quantity)])),
    [inventory],
  );

  const getMissing = useCallback(
    (recipe: Recipe) => {
      const factor = servings / recipe.servings;
      return recipe.ingredients.filter(
        (ingredient) => (inventoryMap.get(ingredient.name) ?? 0) + 0.001 < ingredient.amount * factor,
      );
    },
    [inventoryMap, servings],
  );

  const recommendations = useMemo(() => {
    const matchingConstraints = RECIPES.filter(
      (recipe) => recipe.minutes <= timeBudget && recipe.pots <= potTolerance,
    );
    const pool = matchingConstraints.length >= 3 ? matchingConstraints : RECIPES.filter((recipe) => recipe.pots <= potTolerance);

    return [...pool]
      .map((recipe) => {
        const missing = getMissing(recipe);
        const availableRatio = (recipe.ingredients.length - missing.length) / recipe.ingredients.length;
        const exactBonus = missing.length === 0 ? 1000 : 0;
        const repeatPenalty = history.some((item) => item.recipeId === recipe.id) ? 6 : 0;
        const shuffle = ((recipe.id.length * 17 + recommendationSeed * 13) % 19) / 100;
        return {
          recipe,
          missing,
          score: exactBonus + availableRatio * 100 - missing.length * 18 - recipe.minutes / 10 - repeatPenalty + shuffle,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [getMissing, history, potTolerance, recommendationSeed, timeBudget]);

  const filteredLibrary = useMemo(() => {
    const query = libraryQuery.trim().toLowerCase();
    return LIBRARY_RECIPES.filter((recipe) => {
      const matchesCategory = libraryCategory === "全部" || recipe.category === libraryCategory;
      const haystack = [recipe.name, recipe.category, recipe.region, recipe.technique, recipe.appliance ?? "", ...recipe.ingredients].join(" ").toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [libraryCategory, libraryQuery]);

  const postJson = async (url: string, body: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) throw new Error(data.error || "操作失败");
    return data;
  };

  const addStock = async (items: Array<{ name: string; quantity: number; unit: string; category: string }>) => {
    setSaving(true);
    try {
      await postJson("/api/inventory", { action: items.length > 1 ? "bulk" : "add", items, item: items[0] });
      await loadState();
      notify(items.length > 1 ? "常用食材已经放进冰箱" : `已加入 ${items[0].name}`);
    } catch (error) {
      notify(error instanceof Error ? error.message : "添加失败");
    } finally {
      setSaving(false);
    }
  };

  const addStarterStock = () => {
    const items = STARTER_STOCK.map((name) => STOCK_CATALOG.find((item) => item.name === name)).filter(
      (item): item is (typeof STOCK_CATALOG)[number] => Boolean(item),
    );
    void addStock(items.map((item) => ({ ...item, quantity: item.defaultQuantity })));
  };

  const submitStock = (event: FormEvent) => {
    event.preventDefault();
    const name = stockForm.name.trim();
    const quantity = Number(stockForm.quantity);
    if (!name || !quantity) return;
    const catalog = STOCK_CATALOG.find((item) => item.name === name);
    void addStock([
      {
        name,
        quantity,
        unit: stockForm.unit,
        category: catalog?.category ?? "其他",
      },
    ]).then(() => setStockForm({ name: "", quantity: "", unit: stockForm.unit }));
  };

  const updateStock = async (item: InventoryItem, quantity: number) => {
    setSaving(true);
    try {
      await postJson("/api/inventory", {
        action: "set",
        item: { ...item, quantity: Math.max(0, quantity) },
      });
      await loadState();
    } catch (error) {
      notify(error instanceof Error ? error.message : "更新失败");
    } finally {
      setSaving(false);
    }
  };

  const removeStock = async (item: InventoryItem) => {
    setSaving(true);
    try {
      await postJson("/api/inventory", { action: "remove", item });
      await loadState();
      notify(`已移除 ${item.name}`);
    } catch (error) {
      notify(error instanceof Error ? error.message : "移除失败");
    } finally {
      setSaving(false);
    }
  };

  const addMissingToShopping = async (recipe: Recipe) => {
    const factor = servings / recipe.servings;
    const missing = getMissing(recipe);
    setSaving(true);
    try {
      for (const item of missing) {
        const deficit = Math.max(0.1, item.amount * factor - (inventoryMap.get(item.name) ?? 0));
        await postJson("/api/shopping", {
          action: "add",
          name: item.name,
          quantity: deficit,
          unit: item.unit,
        });
      }
      await loadState();
      notify(`缺的 ${missing.length} 样已加入采购清单`);
      setTab("shopping");
      setSelected(null);
    } catch (error) {
      notify(error instanceof Error ? error.message : "加入清单失败");
    } finally {
      setSaving(false);
    }
  };

  const openRecipe = (recipe: Recipe) => {
    setSelected(recipe);
    setCooking(false);
    setStepIndex(0);
    setTimerRunning(false);
    setSecondsLeft(recipe.steps[0].seconds);
  };

  const startCooking = () => {
    if (!selected) return;
    setCooking(true);
    setStepIndex(0);
    setSecondsLeft(selected.steps[0].seconds);
    setTimerRunning(false);
  };

  const goToStep = (next: number) => {
    if (!selected) return;
    const safe = Math.max(0, Math.min(selected.steps.length - 1, next));
    setStepIndex(safe);
    setSecondsLeft(selected.steps[safe].seconds);
    setTimerRunning(false);
  };

  const finishCooking = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await postJson("/api/cook", { recipeId: selected.id, servings });
      await loadState();
      notify(`「${selected.name}」完成，库存已更新`);
      setSelected(null);
      setCooking(false);
      setTimerRunning(false);
      setRecommendationSeed((value) => value + 1);
    } catch (error) {
      notify(error instanceof Error ? error.message : "保存这顿饭失败");
    } finally {
      setSaving(false);
    }
  };

  const submitShopping = async (event: FormEvent) => {
    event.preventDefault();
    if (!shoppingForm.name.trim()) return;
    setSaving(true);
    try {
      await postJson("/api/shopping", {
        action: "add",
        name: shoppingForm.name,
        quantity: Number(shoppingForm.quantity) || 1,
        unit: shoppingForm.unit,
      });
      setShoppingForm({ name: "", quantity: "1", unit: "份" });
      await loadState();
      notify("已加入采购清单");
    } catch (error) {
      notify(error instanceof Error ? error.message : "添加失败");
    } finally {
      setSaving(false);
    }
  };

  const updateShopping = async (item: ShoppingItem, action: "purchased" | "remove") => {
    setSaving(true);
    try {
      await postJson("/api/shopping", { action, id: item.id });
      await loadState();
      notify(action === "purchased" ? `${item.name} 已放进冰箱` : `已删掉 ${item.name}`);
    } catch (error) {
      notify(error instanceof Error ? error.message : "更新失败");
    } finally {
      setSaving(false);
    }
  };

  const selectedMissing = selected ? getMissing(selected) : [];
  const currentStep = selected?.steps[stepIndex];
  const timerProgress = currentStep ? 1 - secondsLeft / currentStep.seconds : 0;

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setTab("today")} aria-label="回到今日推荐">
          <span className="brand-mark">饭</span>
          <span>
            <strong>今晚吃什么</strong>
            <small>少想一点，好好吃饭</small>
          </span>
        </button>
        <div className="topbar-stats" aria-label="做饭系统状态">
          <span><b>{inventory.length}</b> 种库存</span>
          <span><b>{LIBRARY_RECIPES.length}</b> 道菜</span>
          <span><b>{history.length}</b> 次完成</span>
        </div>
      </header>

      <nav className="tabbar" aria-label="主要页面">
        <button className={tab === "today" ? "active" : ""} onClick={() => setTab("today")}>
          <span>01</span> 今天吃什么
        </button>
        <button className={tab === "fridge" ? "active" : ""} onClick={() => setTab("fridge")}>
          <span>02</span> 我的冰箱 <em>{inventory.length}</em>
        </button>
        <button className={tab === "shopping" ? "active" : ""} onClick={() => setTab("shopping")}>
          <span>03</span> 采购清单 <em>{shopping.length}</em>
        </button>
        <button className={tab === "library" ? "active" : ""} onClick={() => setTab("library")}>
          <span>04</span> 菜谱资料库 <em>{LIBRARY_RECIPES.length}</em>
        </button>
      </nav>

      {tab === "today" && (
        <section className="page today-page">
          <div className="hero-copy">
            <div className="eyebrow"><i /> 今日晚饭决策器</div>
            <h1>别搜菜谱了。<br /><span>就做今天能做的。</span></h1>
            <p>库存、时间、洗锅意愿都算进去，只给你三个答案。</p>
          </div>

          <div className="decision-board">
            <div className="decision-row inventory-answer">
              <div className="question-number">1</div>
              <div className="question-copy">
                <h2>你有什么食材？</h2>
                <p>{loading ? "正在看看冰箱…" : inventory.length ? `冰箱里有 ${inventory.length} 种食材` : "冰箱还是空的，先放点食材进去"}</p>
              </div>
              <button className="text-action" onClick={() => setTab("fridge")}>{inventory.length ? "调整库存" : "去添加"} →</button>
            </div>

            {!loading && inventory.length === 0 && (
              <div className="empty-stock-callout">
                <div>
                  <b>先用一组常见食材试试</b>
                  <span>鸡蛋、番茄、青菜、土豆、青椒、豆腐、肉末和紫菜</span>
                </div>
                <button onClick={addStarterStock} disabled={saving}>一键放入示例库存</button>
              </div>
            )}

            <div className="decision-row choice-row">
              <div className="question-number">2</div>
              <div className="question-copy">
                <h2>愿意花几分钟？</h2>
                <p>包括备料和开火</p>
              </div>
              <div className="segmented-options wide">
                {TIME_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={timeBudget === option.value ? "selected" : ""}
                    onClick={() => setTimeBudget(option.value)}
                  >
                    <b>{option.label}</b><small>{option.note}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="decision-row choice-row">
              <div className="question-number">3</div>
              <div className="question-copy">
                <h2>想不想洗很多锅？</h2>
                <p>诚实一点，系统才好用</p>
              </div>
              <div className="segmented-options">
                {POT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={potTolerance === option.value ? "selected" : ""}
                    onClick={() => setPotTolerance(option.value)}
                  >
                    <b>{option.label}</b><small>{option.note}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="recommendation-heading">
            <div>
              <span className="section-index">你的三个答案</span>
              <h2>{inventory.length ? "现在最适合做这些" : "放入库存后，我会从这里选三道"}</h2>
            </div>
            <div className="recommend-actions">
              <label className="serving-select">做给
                <select value={servings} onChange={(event) => setServings(Number(event.target.value))}>
                  <option value={1}>1 人</option>
                  <option value={2}>2 人</option>
                  <option value={3}>3 人</option>
                  <option value={4}>4 人</option>
                </select>
              </label>
              <button className="shuffle-button" onClick={() => setRecommendationSeed((value) => value + 1)}>
                换一组 ↻
              </button>
            </div>
          </div>

          <div className={`recipe-grid ${inventory.length ? "" : "muted-grid"}`}>
            {recommendations.map(({ recipe, missing }, index) => (
              <article className={`recipe-card accent-${recipe.color}`} key={recipe.id}>
                <div className="card-topline">
                  <span className="rank">0{index + 1}</span>
                  <span className={missing.length ? "match partial" : "match exact"}>
                    {missing.length ? `差 ${missing.length} 样` : "库存够做"}
                  </span>
                </div>
                <div className="dish-orbit" aria-hidden="true"><span>{recipe.name.slice(0, 1)}</span></div>
                <h3>{recipe.name}</h3>
                <p>{recipe.tagline}</p>
                <div className="recipe-facts">
                  <span><b>{recipe.minutes}</b> 分钟</span>
                  <span><b>{recipe.pots}</b> 口锅</span>
                  <span>{recipe.technique}</span>
                </div>
                {missing.length > 0 && (
                  <div className="missing-line">缺：{missing.map((item) => item.name).join("、")}</div>
                )}
                <button onClick={() => openRecipe(recipe)}>看看怎么做 <span>→</span></button>
              </article>
            ))}
          </div>

          <aside className="system-note">
            <span className="note-mark">20</span>
            <div><b>不是 500 道随机菜谱</b><p>固定 20 道会反复吃的菜，推荐会优先安排你还没做熟的那几道。</p></div>
          </aside>
        </section>
      )}

      {tab === "fridge" && (
        <section className="page utility-page">
          <div className="utility-header">
            <div><span className="section-index">02 · 我的冰箱</span><h1>家里到底有什么</h1><p>只记会影响晚饭选择的食材，不用把每滴酱油都录进去。</p></div>
            <div className="inventory-count"><strong>{inventory.length}</strong><span>种食材在库</span></div>
          </div>

          <form className="add-form" onSubmit={submitStock}>
            <label>食材名称
              <input
                list="stock-catalog"
                value={stockForm.name}
                onChange={(event) => {
                  const name = event.target.value;
                  const match = STOCK_CATALOG.find((item) => item.name === name);
                  setStockForm((current) => ({ ...current, name, unit: match?.unit ?? current.unit }));
                }}
                placeholder="例如：鸡蛋"
              />
              <datalist id="stock-catalog">{STOCK_CATALOG.map((item) => <option value={item.name} key={item.name} />)}</datalist>
            </label>
            <label>数量<input type="number" min="0.1" step="0.1" value={stockForm.quantity} onChange={(event) => setStockForm((current) => ({ ...current, quantity: event.target.value }))} placeholder="6" /></label>
            <label>单位
              <select value={stockForm.unit} onChange={(event) => setStockForm((current) => ({ ...current, unit: event.target.value }))}>
                {["个", "克", "根", "盒", "把", "条", "碗", "块", "份"].map((unit) => <option key={unit}>{unit}</option>)}
              </select>
            </label>
            <button className="primary-button" disabled={saving}>放进冰箱</button>
          </form>

          {loading ? <div className="loading-panel">正在整理冰箱…</div> : inventory.length === 0 ? (
            <div className="large-empty"><span>空</span><h2>冰箱还没有记录</h2><p>先加真实食材，或者用示例库存体验完整流程。</p><button onClick={addStarterStock}>放入示例库存</button></div>
          ) : (
            <div className="inventory-list">
              {inventory.map((item) => {
                const step = item.unit === "克" ? 50 : 1;
                return (
                  <div className="inventory-item" key={item.id}>
                    <div className="ingredient-avatar">{item.name.slice(0, 1)}</div>
                    <div className="ingredient-name"><b>{item.name}</b><span>{item.category}</span></div>
                    <div className="quantity-control">
                      <button aria-label={`减少${item.name}`} onClick={() => void updateStock(item, item.quantity - step)} disabled={saving}>−</button>
                      <span><b>{formatAmount(item.quantity)}</b> {item.unit}</span>
                      <button aria-label={`增加${item.name}`} onClick={() => void updateStock(item, item.quantity + step)} disabled={saving}>＋</button>
                    </div>
                    <button className="remove-button" aria-label={`移除${item.name}`} onClick={() => void removeStock(item)}>×</button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {tab === "shopping" && (
        <section className="page utility-page shopping-page">
          <div className="utility-header">
            <div><span className="section-index">03 · 下次采购</span><h1>只买真正缺的</h1><p>做完一道菜，用光的食材会自动来到这里。</p></div>
            <div className="inventory-count shopping-count"><strong>{shopping.length}</strong><span>样需要补货</span></div>
          </div>

          <form className="add-form shopping-form" onSubmit={submitShopping}>
            <label>要买什么<input value={shoppingForm.name} onChange={(event) => setShoppingForm((current) => ({ ...current, name: event.target.value }))} placeholder="例如：牛奶" /></label>
            <label>数量<input type="number" min="0.1" step="0.1" value={shoppingForm.quantity} onChange={(event) => setShoppingForm((current) => ({ ...current, quantity: event.target.value }))} /></label>
            <label>单位<input value={shoppingForm.unit} onChange={(event) => setShoppingForm((current) => ({ ...current, unit: event.target.value }))} /></label>
            <button className="primary-button" disabled={saving}>加入清单</button>
          </form>

          {shopping.length === 0 ? (
            <div className="large-empty shopping-empty"><span>✓</span><h2>现在不用买东西</h2><p>清单是空的。做完饭以后，用光的食材会自动出现。</p></div>
          ) : (
            <div className="shopping-list">
              {shopping.map((item) => (
                <div className="shopping-item" key={item.id}>
                  <button className="check-button" onClick={() => void updateShopping(item, "purchased")} disabled={saving} aria-label={`已买到${item.name}`}>✓</button>
                  <div><b>{item.name}</b><span>{item.source}</span></div>
                  <strong>{formatAmount(item.quantity)} {item.unit}</strong>
                  <button className="remove-button" onClick={() => void updateShopping(item, "remove")} aria-label={`删除${item.name}`}>×</button>
                </div>
              ))}
            </div>
          )}
          <div className="shopping-tip"><b>买完怎么处理？</b><span>点每一项左边的勾，它会自动从采购清单进入冰箱库存。</span></div>
        </section>
      )}

      {tab === "library" && (
        <section className="page library-page">
          <div className="utility-header library-header">
            <div>
              <span className="section-index">04 · 菜谱资料库</span>
              <h1>不是抄书，<br />是把资料变成能做的饭</h1>
              <p>20 道完整系统菜 + 60 道来源辅助学习菜 + 20 道空气炸锅菜；全部按两人份家庭厨房重新整理。</p>
            </div>
            <div className="inventory-count library-count"><strong>{LIBRARY_RECIPES.length}</strong><span>道结构化菜谱</span></div>
          </div>

          <section className="air-fryer-spotlight">
            <div className="air-fryer-icon" aria-hidden="true"><span>新</span>♨</div>
            <div>
              <span className="section-index">空气炸锅专区 · 20 道</span>
              <h2>你买的新锅，先从真正会复做的菜开始</h2>
              <p>每道都标了温度、首次检查时间和翻面节点。参数按常见家用机型给起点，肉类最终以中心温度为准。</p>
            </div>
            <button onClick={() => { setLibraryQuery(""); setLibraryCategory("空气炸锅"); }}>只看空气炸锅菜 →</button>
          </section>

          <div className="library-boundary">
            <span className="boundary-mark">资料边界</span>
            <p><b>公共领域和开放授权内容</b>用于核对技法与菜目；<b>现代市售书</b>只引用公开书目信息，不复制配方和正文。你看到的用量、步骤与失败判断均为本站重新编写。</p>
          </div>

          <div className="library-tools">
            <label className="library-search">
              <span>搜菜名、食材或技法</span>
              <input value={libraryQuery} onChange={(event) => setLibraryQuery(event.target.value)} placeholder="试试：空气炸锅、鸡肉、180°C、豆腐…" />
            </label>
            <div className="category-chips" aria-label="菜谱分类">
              {LIBRARY_CATEGORIES.map((category) => (
                <button key={category} className={libraryCategory === category ? "selected" : ""} onClick={() => setLibraryCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="library-result-line">
            <span>找到 <b>{filteredLibrary.length}</b> 道</span>
            <span>点击任意菜谱查看关键用量和四步做法</span>
          </div>

          {filteredLibrary.length ? (
            <div className="library-grid" id="system-recipes">
              {filteredLibrary.map((recipe, index) => {
                const source = getSource(recipe.sourceKey);
                return (
                  <button className={`library-card ${recipe.appliance ? "air-fryer-card" : ""}`} key={recipe.id} onClick={() => setLibrarySelected(recipe)}>
                    <div className="library-card-top"><span>{String(index + 1).padStart(2, "0")}</span><em className={`source-${source.usage}`}>{source.usage}</em></div>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.ingredients.slice(0, 3).join(" · ")}</p>
                    <div className="library-tags"><span>{recipe.category}</span><span>{recipe.region}</span>{recipe.temperatureC ? <span>{recipe.temperatureC}°C</span> : <span>{recipe.difficulty}</span>}</div>
                    <div className="library-card-bottom"><span>{recipe.minutes} 分钟{recipe.checkAtMinute ? ` · ${recipe.checkAtMinute} 分钟检查` : ` · ${recipe.pots} 口锅`}</span><b>查看 →</b></div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="large-empty"><span>?</span><h2>暂时没搜到</h2><p>换一个食材名或清空分类再试。</p><button onClick={() => { setLibraryQuery(""); setLibraryCategory("全部"); }}>查看全部菜谱</button></div>
          )}

          <section className="source-section">
            <div className="source-heading"><div><span className="section-index">资料来源</span><h2>书、开放资料与官方指南怎么被使用</h2></div><p>来源不是装饰：每道辅助菜谱都会标记它参考的技法或安全标准。</p></div>
            <div className="source-grid">
              {SOURCE_LIBRARY.filter((source) => source.key !== "system").map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" className="source-card" key={source.key}>
                  <div><span>{source.usage}</span><em>{source.year}</em></div>
                  <h3>{source.title}</h3>
                  <p>{source.author}</p>
                  <small>{source.note}</small>
                  <b>查看原始资料 ↗</b>
                </a>
              ))}
            </div>
          </section>
        </section>
      )}

      {librarySelected && (
        <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setLibrarySelected(null)}>
          <section className="library-sheet" role="dialog" aria-modal="true" aria-labelledby="library-recipe-title">
            <button className="sheet-close" onClick={() => setLibrarySelected(null)} aria-label="关闭">×</button>
            <header>
              <div className="library-sheet-labels"><span>{librarySelected.category}</span><span>{librarySelected.region}</span><span>{librarySelected.difficulty}</span>{librarySelected.appliance && <span>♨ {librarySelected.appliance}</span>}</div>
              <h2 id="library-recipe-title">{librarySelected.name}</h2>
              <div className="library-sheet-facts"><span><b>{librarySelected.minutes}</b> 分钟</span><span><b>{librarySelected.pots}</b> 口锅</span>{librarySelected.temperatureC && <span><b>{librarySelected.temperatureC}</b>°C</span>}{librarySelected.checkAtMinute && <span>第 <b>{librarySelected.checkAtMinute}</b> 分钟检查</span>}<span>{librarySelected.technique}</span></div>
            </header>
            <div className="library-sheet-body">
              <div>
                <h3>两人份关键用量</h3>
                <ul className="library-ingredients">{librarySelected.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
              </div>
              <div>
                <h3>四步做法</h3>
                <ol className="library-steps">{librarySelected.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
              </div>
            </div>
            <footer className="library-source-note">
              <div><span>资料脉络</span><b>{getSource(librarySelected.sourceKey).title}</b><p>{librarySelected.sourceNote}</p></div>
              <a href={getSource(librarySelected.sourceKey).url} target={librarySelected.sourceKey === "system" ? undefined : "_blank"} rel="noreferrer">{librarySelected.sourceKey === "system" ? "完整系统菜" : "查看来源 ↗"}</a>
            </footer>
            {librarySelected.fullRecipeId && (
              <button className="library-start-button" onClick={() => {
                const full = RECIPES.find((recipe) => recipe.id === librarySelected.fullRecipeId);
                setLibrarySelected(null);
                if (full) openRecipe(full);
              }}>进入分步火候与计时 →</button>
            )}
          </section>
        </div>
      )}

      {selected && !cooking && (
        <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <section className={`recipe-sheet accent-${selected.color}`} role="dialog" aria-modal="true" aria-labelledby="recipe-title">
            <button className="sheet-close" onClick={() => setSelected(null)} aria-label="关闭">×</button>
            <div className="sheet-hero">
              <div><span className={selectedMissing.length ? "match partial" : "match exact"}>{selectedMissing.length ? `还差 ${selectedMissing.length} 样` : "库存足够"}</span><h2 id="recipe-title">{selected.name}</h2><p>{selected.tagline}</p></div>
              <div className="sheet-time"><b>{selected.minutes}</b><span>分钟</span></div>
            </div>
            <div className="sheet-meta"><span>{selected.pots} 口锅</span><span>{selected.technique}</span><span>{servings} 人份</span></div>
            <div className="sheet-columns">
              <div>
                <h3>需要这些</h3>
                <ul className="ingredient-checklist">
                  {selected.ingredients.map((item) => {
                    const needed = item.amount * (servings / selected.servings);
                    const enough = (inventoryMap.get(item.name) ?? 0) + 0.001 >= needed;
                    return <li className={enough ? "enough" : "short"} key={item.name}><span>{enough ? "✓" : "!"}</span><b>{item.name}</b><em>{item.display ?? `${formatAmount(needed)}${item.unit}`}</em></li>;
                  })}
                </ul>
              </div>
              <div>
                <h3>常驻调料</h3>
                <ul className="pantry-list">{selected.pantry.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="rescue-card"><span>失败了怎么救</span><p>{selected.rescue}</p></div>
              </div>
            </div>
            <div className="sheet-actions">
              {selectedMissing.length > 0 && <button className="secondary-button" onClick={() => void addMissingToShopping(selected)} disabled={saving}>缺的加入采购清单</button>}
              <button className="primary-button cook-button" onClick={startCooking}>{selectedMissing.length ? "我其实有，直接开始" : "开始做饭"} →</button>
            </div>
          </section>
        </div>
      )}

      {selected && cooking && currentStep && (
        <div className="cooking-screen" role="dialog" aria-modal="true" aria-labelledby="cooking-title">
          <header className="cooking-header">
            <button onClick={() => { setCooking(false); setTimerRunning(false); }}>← 返回用量</button>
            <div><span>正在做</span><h2 id="cooking-title">{selected.name}</h2></div>
            <span>{stepIndex + 1} / {selected.steps.length}</span>
          </header>
          <div className="step-progress" aria-label={`第 ${stepIndex + 1} 步，共 ${selected.steps.length} 步`}>
            {selected.steps.map((_, index) => <i className={index <= stepIndex ? "done" : ""} key={index} />)}
          </div>
          <section className="cooking-body">
            <div className="step-copy">
              <span className="heat-label">{currentStep.heat}</span>
              <p className="step-kicker">第 {stepIndex + 1} 步</p>
              <h1>{currentStep.title}</h1>
              <p className="step-instruction">{currentStep.text}</p>
              <div className="next-preview">
                {stepIndex < selected.steps.length - 1 ? <><span>下一步</span><b>{selected.steps[stepIndex + 1].title}</b></> : <><span>最后一步</span><b>装盘，准备开饭</b></>}
              </div>
            </div>
            <div className="timer-panel">
              <div className="timer-ring" style={{ "--progress": `${timerProgress * 360}deg` } as React.CSSProperties}>
                <div><b>{formatClock(secondsLeft)}</b><span>{timerRunning ? "计时中" : secondsLeft === 0 ? "时间到" : "准备好再开始"}</span></div>
              </div>
              <button className="timer-button" onClick={() => secondsLeft === 0 ? setSecondsLeft(currentStep.seconds) : setTimerRunning((value) => !value)}>
                {secondsLeft === 0 ? "重新计时" : timerRunning ? "暂停" : "开始计时"}
              </button>
            </div>
          </section>
          <footer className="cooking-footer">
            <button onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex === 0}>← 上一步</button>
            {stepIndex < selected.steps.length - 1 ? (
              <button className="next-step" onClick={() => goToStep(stepIndex + 1)}>这步好了，下一步 →</button>
            ) : (
              <button className="finish-button" onClick={() => void finishCooking()} disabled={saving}>{saving ? "正在更新库存…" : "完成，开饭 ✓"}</button>
            )}
          </footer>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
