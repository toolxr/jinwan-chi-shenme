import { RECIPES } from "./recipes";

export type SourceItem = {
  key: string;
  title: string;
  author: string;
  year: string;
  usage: "公版全文" | "开放授权" | "现代书目参考" | "官方使用指南" | "本站原创";
  url: string;
  note: string;
};

export type LibraryRecipe = {
  id: string;
  name: string;
  category: string;
  region: string;
  minutes: number;
  pots: number;
  difficulty: "入门" | "进阶" | "周末菜";
  technique: string;
  ingredients: string[];
  steps: string[];
  sourceKey: string;
  sourceNote: string;
  fullRecipeId?: string;
  appliance?: "空气炸锅";
  temperatureC?: number;
  checkAtMinute?: number;
};

export const SOURCE_LIBRARY: SourceItem[] = [
  {
    key: "system",
    title: "20 道真正学会计划",
    author: "本站",
    year: "2026",
    usage: "本站原创",
    url: "#system-recipes",
    note: "为普通家庭厨房重新标定用量、火候、计时、库存扣减和失败补救。",
  },
  {
    key: "suiyuan",
    title: "《随园食单》",
    author: "袁枚",
    year: "1792",
    usage: "公版全文",
    url: "https://zh.wikisource.org/zh-hans/%E9%9A%A8%E5%9C%92%E9%A3%9F%E5%96%AE",
    note: "用于理解选料、调味、火候、配搭和补救等中国烹饪基本原则。",
  },
  {
    key: "yinshan",
    title: "《饮膳正要》",
    author: "忽思慧",
    year: "1330",
    usage: "公版全文",
    url: "https://zh.wikisource.org/wiki/%E9%A3%B2%E8%86%B3%E6%AD%A3%E8%A6%81_(%E5%9B%9B%E9%83%A8%E5%8F%A2%E5%88%8A%E6%9C%AC)",
    note: "作为饮食史与食材使用脉络参考；古代食疗主张不当作现代医疗建议。",
  },
  {
    key: "wong",
    title: "Chinese Recipes",
    author: "Nellie C. Wong",
    year: "1927",
    usage: "公版全文",
    url: "https://www.gutenberg.org/files/76573/76573-h/76573-h.htm",
    note: "收录蛋花汤、剩饭、虾、鱼、猪肉和蔬菜等早期英文中国菜记录。",
  },
  {
    key: "wellcome",
    title: "The English-Chinese Cookery Book",
    author: "J. Dyer Ball",
    year: "1890",
    usage: "公版全文",
    url: "https://wellcomecollection.org/works/caqdp57k",
    note: "Wellcome Collection 标记为公共领域，含 200 道中英对照烹饪条目。",
  },
  {
    key: "wikibooks",
    title: "Wikibooks Cookbook · Chinese recipes",
    author: "Wikibooks contributors",
    year: "持续更新",
    usage: "开放授权",
    url: "https://en.wikibooks.org/wiki/Category:Chinese_recipes",
    note: "CC BY-SA 开放菜谱库；本站条目重新组织，并在资料页保留授权与来源链接。",
  },
  {
    key: "sichuan",
    title: "The Food of Sichuan",
    author: "Fuchsia Dunlop",
    year: "2019",
    usage: "现代书目参考",
    url: "https://wwnorton.com/books/9781324004837",
    note: "只参考公开目录所呈现的川菜覆盖范围与技法体系，不复制书中配方或文字。",
  },
  {
    key: "rice",
    title: "Every Grain of Rice",
    author: "Fuchsia Dunlop",
    year: "2012",
    usage: "现代书目参考",
    url: "https://wwnorton.com/books/9780393089042",
    note: "只参考其家常菜、蔬菜优先与日常可操作的公开定位，配方由本站重新编写。",
  },
  {
    key: "mastering",
    title: "Mastering the Art of Chinese Cooking",
    author: "Eileen Yin-Fei Lo",
    year: "2009",
    usage: "现代书目参考",
    url: "https://books.apple.com/us/book/mastering-the-art-of-chinese-cooking/id6447284401",
    note: "只参考公开介绍中的食材、器具与分级技法框架，不复制付费内容。",
  },
  {
    key: "airfryer",
    title: "Philips Airfryer 官方使用与时间指南",
    author: "Philips",
    year: "持续更新",
    usage: "官方使用指南",
    url: "https://www.philips.sa/en/c-m-ho/cooking/airfryer/airfryer",
    note: "用于校准常见食材的起始温度、时间、翻面和避免拥挤等方法；不同容量与功率仍需提前检查。",
  },
  {
    key: "food-safety",
    title: "Safe Minimum Internal Temperature Chart",
    author: "USDA Food Safety and Inspection Service",
    year: "持续更新",
    usage: "官方使用指南",
    url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart/",
    note: "用于核对禽肉、整块肉、肉馅和鱼类的安全中心温度；颜色不能代替食品温度计。",
  },
];

const EXTRA_RECIPES: LibraryRecipe[] = [
  {
    id: "lib-yuxiang-pork", name: "鱼香肉丝", category: "快炒", region: "川味", minutes: 22, pots: 1, difficulty: "进阶", technique: "上浆 · 鱼香汁 · 大火合炒",
    ingredients: ["猪里脊 250克", "木耳 8克", "胡萝卜 半根", "青椒 1个", "泡椒或豆瓣酱 1汤匙"],
    steps: ["肉逆纹切丝，用生抽、料酒、淀粉和油抓匀。", "醋、糖、生抽、水和淀粉调成鱼香汁。", "肉丝滑到变色盛出，再炒香泡椒、姜蒜和配菜。", "肉丝回锅，倒碗汁大火收亮，立刻出锅。"],
    sourceKey: "sichuan", sourceNote: "按川菜鱼香味型重写为家庭小锅版本。",
  },
  {
    id: "lib-twice-cooked-pork", name: "回锅肉", category: "快炒", region: "川味", minutes: 35, pots: 2, difficulty: "进阶", technique: "煮熟回锅 · 煸油 · 酱香",
    ingredients: ["带皮五花肉 350克", "青蒜 3根", "豆瓣酱 1汤匙", "甜面酱 1茶匙", "豆豉 1茶匙"],
    steps: ["五花肉冷水下锅煮至筷子能扎入，放凉切薄片。", "肉片中火煸到微卷、边缘透明，倒出多余油。", "下豆瓣酱和豆豉炒出红油，再加甜面酱。", "放青蒜梗和叶，快速翻匀后出锅。"],
    sourceKey: "sichuan", sourceNote: "保留回锅与灯盏窝的核心判断，减少家庭用油。",
  },
  {
    id: "lib-jingjiang-pork", name: "京酱肉丝", category: "快炒", region: "京味", minutes: 20, pots: 1, difficulty: "进阶", technique: "滑炒 · 甜面酱收汁",
    ingredients: ["猪里脊 300克", "大葱 1根", "甜面酱 2汤匙", "豆腐皮 4张", "糖 1茶匙"],
    steps: ["肉切细丝并上浆，大葱切细丝，豆腐皮切方片。", "热锅滑散肉丝，刚变色就盛出。", "小火炒香甜面酱、糖和少量水。", "肉丝回锅裹匀酱汁，与葱丝、豆腐皮一起上桌。"],
    sourceKey: "mastering", sourceNote: "按北方酱爆技法整理，强调甜面酱小火炒香。",
  },
  {
    id: "lib-celery-shrimp", name: "西芹虾仁", category: "快炒", region: "清鲜", minutes: 16, pots: 1, difficulty: "入门", technique: "短腌 · 分段快炒",
    ingredients: ["虾仁 250克", "西芹 300克", "姜 2片", "盐 2克", "淀粉 1茶匙"],
    steps: ["虾仁擦干，用盐、淀粉和少量油腌 8 分钟。", "西芹斜切薄片，粗梗可先焯 30 秒。", "热锅滑炒虾仁至卷曲变色，先盛出。", "西芹大火炒脆，虾仁回锅，加盐翻匀。"],
    sourceKey: "wong", sourceNote: "参照早期虾类快炒脉络，重新标定现代家庭用量。",
  },
  {
    id: "lib-snowpea-sausage", name: "荷兰豆炒腊肠", category: "快炒", region: "粤味", minutes: 15, pots: 1, difficulty: "入门", technique: "先煸腊肠 · 保持脆绿",
    ingredients: ["荷兰豆 300克", "广式腊肠 2根", "蒜 2瓣", "盐 1克", "水 2汤匙"],
    steps: ["荷兰豆去筋，腊肠斜切薄片。", "冷锅下腊肠，中小火煸到透明出油。", "放蒜片和荷兰豆，转大火翻炒。", "沿锅边加少量水，炒至翠绿断生，轻盐出锅。"],
    sourceKey: "rice", sourceNote: "按家常一荤一素的高复用思路重写。",
  },
  {
    id: "lib-chive-eggs", name: "韭黄炒蛋", category: "快炒", region: "家常", minutes: 10, pots: 1, difficulty: "入门", technique: "嫩蛋 · 余温熟韭黄",
    ingredients: ["鸡蛋 4个", "韭黄 250克", "盐 2克", "白胡椒 少许", "油 1.5汤匙"],
    steps: ["韭黄切段；鸡蛋加盐和白胡椒打匀。", "热锅放油，倒蛋液推到七成熟。", "放韭黄，快速翻 20 至 30 秒。", "蛋液刚凝固、韭黄仍脆时立刻离火。"],
    sourceKey: "rice", sourceNote: "采用家常蛋菜同炒逻辑，避免韭黄久炒出水。",
  },
  {
    id: "lib-cumin-beef", name: "孜然牛肉", category: "快炒", region: "西北风味", minutes: 20, pots: 1, difficulty: "进阶", technique: "逆纹切 · 高温快炒",
    ingredients: ["牛里脊 300克", "洋葱 半个", "香菜 1把", "孜然粉 2茶匙", "辣椒粉 1茶匙"],
    steps: ["牛肉逆纹切薄片，用生抽、淀粉和油抓匀。", "锅烧很热，牛肉分批快速煎炒后盛出。", "洋葱炒到边缘焦香，放孜然和辣椒粉。", "牛肉回锅快速翻匀，关火拌香菜。"],
    sourceKey: "mastering", sourceNote: "依据中式牛肉上浆和旺火快炒技法整理。",
  },
  {
    id: "lib-blackpepper-beef", name: "黑椒牛柳", category: "快炒", region: "粤式餐厅", minutes: 22, pots: 1, difficulty: "进阶", technique: "嫩化 · 黑椒汁挂味",
    ingredients: ["牛里脊 300克", "彩椒 2个", "洋葱 半个", "现磨黑胡椒 1茶匙", "蚝油 1汤匙"],
    steps: ["牛肉逆纹切条，用生抽、淀粉、油和少量水抓匀。", "牛肉大火煎至七成熟，先盛出。", "洋葱和彩椒炒到边缘略焦。", "牛肉回锅，加蚝油和黑胡椒，快速收汁。"],
    sourceKey: "mastering", sourceNote: "按餐厅常用分炒与最后挂汁法重写。",
  },
  {
    id: "lib-asparagus-shrimp", name: "芦笋炒虾仁", category: "快炒", region: "清鲜", minutes: 16, pots: 1, difficulty: "入门", technique: "嫩炒 · 先硬后软",
    ingredients: ["虾仁 250克", "芦笋 300克", "蒜 2瓣", "盐 2克", "料酒 1茶匙"],
    steps: ["芦笋削去老皮、斜切段；虾仁擦干简单腌制。", "虾仁滑至变色后盛出。", "原锅下芦笋和蒜片，大火炒到鲜绿。", "虾仁回锅，加盐翻匀，中心熟透即出锅。"],
    sourceKey: "rice", sourceNote: "以蔬菜为主、蛋白为辅的家常快炒结构。",
  },
  {
    id: "lib-drypot-cauliflower", name: "干锅花菜", category: "快炒", region: "湘川风味", minutes: 22, pots: 1, difficulty: "进阶", technique: "干煸脱水 · 酱香",
    ingredients: ["花菜 500克", "五花肉 120克", "洋葱 半个", "豆瓣酱 1茶匙", "蒜 3瓣"],
    steps: ["花菜切小朵后彻底沥干，五花肉切薄片。", "少油中火煸五花肉到微卷。", "放豆瓣酱、蒜和洋葱炒香，再下花菜。", "中大火不断翻炒至边缘微焦，加生抽调味。"],
    sourceKey: "rice", sourceNote: "强调花菜干燥和锅温，减少家庭版油量。",
  },

  {
    id: "lib-red-pork", name: "红烧肉", category: "烧焖", region: "江南", minutes: 75, pots: 1, difficulty: "周末菜", technique: "煸油 · 糖色可选 · 慢焖",
    ingredients: ["带皮五花肉 600克", "冰糖 20克", "生抽 2汤匙", "老抽 1茶匙", "姜 4片"],
    steps: ["五花肉切方块，冷水焯净浮沫并擦干。", "锅中少油把肉块煸到表面微黄。", "放姜、糖和酱油，加热水没过肉。", "小火焖 50 至 60 分钟，最后开盖收至浓亮。"],
    sourceKey: "wikibooks", sourceNote: "参照红煨肉历史脉络与开放菜谱，重写为少油家庭版。",
  },
  {
    id: "lib-braised-ribs", name: "红烧排骨", category: "烧焖", region: "家常", minutes: 55, pots: 1, difficulty: "进阶", technique: "焯水 · 焖软 · 收汁",
    ingredients: ["猪肋排 600克", "冰糖 15克", "生抽 2汤匙", "老抽 半茶匙", "姜 4片"],
    steps: ["排骨冷水下锅，煮开后洗净浮沫。", "少油把排骨煎到两面微黄。", "加姜、酱油、糖和热水，加盖小火焖。", "肉能轻松脱骨时开盖收汁，尝味后补盐。"],
    sourceKey: "suiyuan", sourceNote: "借鉴古籍对煨肉火候的强调，配方为现代重写。",
  },
  {
    id: "lib-cola-wings", name: "可乐鸡翅", category: "烧焖", region: "现代家常", minutes: 30, pots: 1, difficulty: "入门", technique: "煎皮 · 甜咸收汁",
    ingredients: ["鸡中翅 10只", "可乐 330毫升", "生抽 1.5汤匙", "姜 3片", "料酒 1汤匙"],
    steps: ["鸡翅两面划刀，冷水焯后擦干。", "不粘锅少油，把鸡皮两面煎黄。", "放姜、生抽、料酒和可乐，中火加盖煮。", "鸡肉熟透后开盖收汁，勤翻避免糖汁焦苦。"],
    sourceKey: "system", sourceNote: "现代家庭常见甜咸焖法，按含糖汁防焦原则标定。",
  },
  {
    id: "lib-huangmen-chicken", name: "黄焖鸡", category: "烧焖", region: "鲁味家常", minutes: 40, pots: 1, difficulty: "进阶", technique: "炒香 · 加盖焖",
    ingredients: ["鸡腿肉 600克", "香菇 8朵", "青椒 2个", "土豆 2个", "黄豆酱 1汤匙"],
    steps: ["鸡腿切块，香菇泡发，土豆和青椒切块。", "鸡块煎到表面上色，加姜蒜和黄豆酱炒香。", "放香菇、土豆和热水，加盖焖至土豆软。", "最后放青椒，大火收汁到能挂在鸡块上。"],
    sourceKey: "mastering", sourceNote: "采用典型先炒香、后焖熟、最后放鲜椒的顺序。",
  },
  {
    id: "lib-chestnut-chicken", name: "板栗烧鸡", category: "烧焖", region: "家常", minutes: 50, pots: 1, difficulty: "进阶", technique: "上色 · 慢烧",
    ingredients: ["鸡腿肉 600克", "熟板栗 250克", "生抽 2汤匙", "糖 1茶匙", "姜 4片"],
    steps: ["鸡肉切块擦干，板栗使用已去壳熟板栗。", "热锅把鸡肉煎到表面金黄，放姜炒香。", "加生抽、糖和热水，小火烧 20 分钟。", "放板栗再烧 10 分钟，开盖收汁。"],
    sourceKey: "suiyuan", sourceNote: "参考古籍栗子炒鸡条目，仅保留食材搭配脉络。",
  },
  {
    id: "lib-radish-beef", name: "萝卜炖牛腩", category: "烧焖", region: "家常", minutes: 100, pots: 2, difficulty: "周末菜", technique: "焯水 · 长炖 · 后放萝卜",
    ingredients: ["牛腩 700克", "白萝卜 1根", "姜 5片", "生抽 2汤匙", "八角 1颗"],
    steps: ["牛腩冷水焯去浮沫，白萝卜切滚刀块。", "牛腩与姜、八角、生抽炒香。", "加足量热水，小火炖约 70 分钟。", "牛肉开始变软后放萝卜，再炖 20 分钟调盐。"],
    sourceKey: "yinshan", sourceNote: "借鉴牛羊肉与根茎食材的传统搭配，按现代安全做法重写。",
  },
  {
    id: "lib-oil-prawns", name: "油焖大虾", category: "烧焖", region: "鲁味", minutes: 22, pots: 1, difficulty: "进阶", technique: "煎虾油 · 短焖",
    ingredients: ["大虾 500克", "番茄酱 1汤匙", "糖 2茶匙", "料酒 1汤匙", "姜葱"],
    steps: ["大虾剪须、开背去虾线，彻底擦干。", "热锅少油，把虾两面煎红并压出虾油。", "放姜葱、料酒、番茄酱、糖和少量水。", "加盖焖 2 分钟，开盖收汁到虾壳油亮。"],
    sourceKey: "wong", sourceNote: "参照早期虾类菜谱类别，配方按现代鲁式家常味重写。",
  },
  {
    id: "lib-braised-beltfish", name: "红烧带鱼", category: "烧焖", region: "家常", minutes: 35, pots: 1, difficulty: "进阶", technique: "擦干煎定型 · 烧入味",
    ingredients: ["带鱼段 500克", "生抽 1.5汤匙", "醋 1汤匙", "糖 1茶匙", "葱姜蒜"],
    steps: ["带鱼处理干净，擦干后薄薄拍淀粉。", "中火煎到两面定型，不要频繁翻动。", "放葱姜蒜，加生抽、醋、糖和热水。", "小火烧 10 分钟，最后开盖收汁。"],
    sourceKey: "suiyuan", sourceNote: "延续家常煎鱼先定型、后烧味的传统方法。",
  },
  {
    id: "lib-home-tofu", name: "家常烧豆腐", category: "烧焖", region: "家常", minutes: 22, pots: 1, difficulty: "入门", technique: "煎定型 · 短烧",
    ingredients: ["北豆腐 400克", "青椒 1个", "木耳 8克", "豆瓣酱 1茶匙", "生抽 1汤匙"],
    steps: ["豆腐切厚片并擦干，木耳泡发，青椒切片。", "少油把豆腐两面煎金黄，先盛出。", "炒香豆瓣酱，放木耳和少量水。", "豆腐回锅烧 5 分钟，青椒最后放，薄芡收尾。"],
    sourceKey: "rice", sourceNote: "按家常豆腐的高复用食材组合重新标定。",
  },
  {
    id: "lib-mince-vermicelli", name: "肉末粉丝煲", category: "烧焖", region: "家常", minutes: 25, pots: 1, difficulty: "入门", technique: "炒肉末 · 粉丝吸汁",
    ingredients: ["肉末 200克", "红薯粉丝 120克", "豆瓣酱 1茶匙", "生抽 1汤匙", "葱姜蒜"],
    steps: ["粉丝用冷水泡软但不要泡烂。", "锅中炒散肉末，放葱姜蒜和豆瓣酱。", "加生抽和 300 毫升热水，放粉丝拨散。", "小火煮到粉丝透明，保留少量汤汁后关火。"],
    sourceKey: "rice", sourceNote: "家庭一锅菜逻辑，重点校准粉丝吸水量。",
  },

  {
    id: "lib-steamed-pork-rice", name: "粉蒸肉", category: "蒸菜", region: "多地家常", minutes: 70, pots: 1, difficulty: "周末菜", technique: "腌味 · 蒸汽慢熟",
    ingredients: ["五花肉 500克", "蒸肉米粉 120克", "土豆 300克", "豆瓣酱 1茶匙", "生抽 1汤匙"],
    steps: ["五花肉切片，用豆瓣酱、生抽和料酒腌 20 分钟。", "肉片均匀裹蒸肉米粉，太干可喷少量水。", "碗底铺土豆，肉片松散铺在上面。", "水开后中火蒸 50 分钟，确认肉软糯再出锅。"],
    sourceKey: "suiyuan", sourceNote: "《随园食单》有粉蒸肉条目，本站按现代蒸肉米粉重写。",
  },
  {
    id: "lib-meicai-pork", name: "梅菜扣肉", category: "蒸菜", region: "客家风味", minutes: 120, pots: 2, difficulty: "周末菜", technique: "煮 · 煎皮 · 长蒸",
    ingredients: ["带皮五花肉 700克", "梅干菜 150克", "生抽 2汤匙", "老抽 1茶匙", "糖 1茶匙"],
    steps: ["五花肉煮到七成熟，擦干肉皮并抹少量老抽。", "肉皮朝下煎到起泡，放凉后切厚片。", "梅干菜洗净挤干，炒香并调味。", "肉皮朝下排碗、铺梅菜，蒸 70 分钟后倒扣。"],
    sourceKey: "mastering", sourceNote: "只采用公开的中式扣蒸技法框架，步骤为本站重写。",
  },
  {
    id: "lib-blackbean-ribs", name: "豉汁蒸排骨", category: "蒸菜", region: "粤味", minutes: 35, pots: 1, difficulty: "进阶", technique: "小块腌制 · 旺火蒸",
    ingredients: ["猪小排 500克", "豆豉 1汤匙", "蒜 3瓣", "淀粉 1汤匙", "生抽 1汤匙"],
    steps: ["排骨剁小块，清水浸泡后彻底沥干。", "加豆豉、蒜、生抽、淀粉和油抓匀腌 20 分钟。", "排骨只铺一层，避免堆得太厚。", "水开后大火蒸 18 至 22 分钟，中心熟透再食用。"],
    sourceKey: "mastering", sourceNote: "按粤式蒸排骨的薄铺与上浆逻辑重新标定。",
  },
  {
    id: "lib-steamed-mushroom-chicken", name: "香菇蒸鸡", category: "蒸菜", region: "粤味", minutes: 35, pots: 1, difficulty: "入门", technique: "腌味 · 平铺蒸熟",
    ingredients: ["鸡腿肉 500克", "干香菇 8朵", "姜 3片", "生抽 1汤匙", "淀粉 1茶匙"],
    steps: ["香菇泡发切片，鸡肉斩小块。", "鸡肉加香菇、姜、生抽、淀粉和油腌 15 分钟。", "食材在深盘中摊平，不要压成厚堆。", "水开后大火蒸约 18 分钟，中心达到熟透状态。"],
    sourceKey: "suiyuan", sourceNote: "参考古籍蒸鸡与蘑菇煨鸡的搭配脉络，采用现代蒸法。",
  },
  {
    id: "lib-meatloaf-egg", name: "肉饼蒸蛋", category: "蒸菜", region: "家常", minutes: 30, pots: 1, difficulty: "入门", technique: "顺向搅拌 · 中火蒸",
    ingredients: ["猪肉末 300克", "鸡蛋 2个", "香菇 3朵", "生抽 1汤匙", "淀粉 1茶匙"],
    steps: ["肉末加香菇碎、生抽、淀粉和少量水，顺一个方向搅匀。", "肉馅铺入浅盘，中间压出两个小窝。", "每个窝打入一枚鸡蛋。", "水开后中火蒸约 18 分钟，肉饼中心熟透。"],
    sourceKey: "wong", sourceNote: "参照早期 Meat Custard 类别，重写为家常肉饼蒸蛋。",
  },
  {
    id: "lib-shrimp-custard", name: "虾仁蒸蛋", category: "蒸菜", region: "家常", minutes: 20, pots: 1, difficulty: "入门", technique: "温水蛋液 · 小火蒸",
    ingredients: ["鸡蛋 3个", "虾仁 120克", "温水 300毫升", "盐 2克", "香油 少许"],
    steps: ["鸡蛋加盐打散，加入约 1.5 倍温水，过滤入浅碗。", "盖耐热盘或扎孔保鲜膜，水开后转小火蒸。", "蒸 8 分钟后放入虾仁。", "继续蒸 4 至 5 分钟，蛋羹凝固后淋香油。"],
    sourceKey: "mastering", sourceNote: "以中式蛋羹比例和分段放虾方法重新编写。",
  },
  {
    id: "lib-garlic-vermicelli-cabbage", name: "蒜蓉粉丝蒸娃娃菜", category: "蒸菜", region: "现代家常", minutes: 20, pots: 1, difficulty: "入门", technique: "蒜蓉汁 · 旺火蒸",
    ingredients: ["娃娃菜 2颗", "粉丝 80克", "蒜 8瓣", "生抽 1.5汤匙", "蚝油 1茶匙"],
    steps: ["粉丝泡软剪短，娃娃菜纵切小瓣。", "蒜末用少油小火炒香，加生抽、蚝油和少量水。", "粉丝铺底、娃娃菜摆上，均匀淋蒜蓉汁。", "水开后大火蒸 8 至 10 分钟。"],
    sourceKey: "rice", sourceNote: "按现代家庭蒜蓉蒸菜的通用结构整理。",
  },
  {
    id: "lib-chopped-chili-fish", name: "剁椒蒸鱼", category: "蒸菜", region: "湘味", minutes: 25, pots: 1, difficulty: "进阶", technique: "沸水上锅 · 咸味校准",
    ingredients: ["鱼柳 500克", "剁椒 3汤匙", "姜 3片", "蒸鱼豉油 1汤匙", "葱花"],
    steps: ["鱼柳擦干，厚处划浅刀，剁椒尝咸度后决定是否冲洗。", "盘底垫姜，鱼面均匀铺剁椒。", "水完全沸腾后上锅，大火蒸 8 至 10 分钟。", "最厚处熟透后倒去多余水，淋少量豉油、撒葱。"],
    sourceKey: "mastering", sourceNote: "采用中式蒸鱼火候框架，重点加入剁椒咸度校准。",
  },

  {
    id: "lib-hot-sour-soup", name: "酸辣汤", category: "汤羹", region: "多地家常", minutes: 22, pots: 1, difficulty: "进阶", technique: "薄芡 · 蛋花 · 醋后放",
    ingredients: ["豆腐 200克", "木耳 8克", "鸡蛋 1个", "香菇 4朵", "米醋 2汤匙"],
    steps: ["豆腐、木耳和香菇切细丝，鸡蛋打散。", "汤底烧开，放全部丝料煮 3 分钟。", "淀粉水分次勾薄芡，再细淋蛋液。", "关火后放醋、白胡椒和香油，避免久煮失香。"],
    sourceKey: "wikibooks", sourceNote: "参照开放菜谱类别，按先芡后蛋、醋后放的家庭顺序重写。",
  },
  {
    id: "lib-wintermelon-ribs", name: "冬瓜排骨汤", category: "汤羹", region: "家常", minutes: 70, pots: 2, difficulty: "入门", technique: "焯水 · 清炖",
    ingredients: ["猪肋排 500克", "冬瓜 600克", "姜 4片", "葱 1根", "盐 适量"],
    steps: ["排骨冷水下锅，烧开后洗净浮沫。", "排骨加姜和足量热水，小火炖 40 分钟。", "冬瓜去瓤切厚块，放入汤中。", "再煮 15 分钟，冬瓜透明后加盐和葱花。"],
    sourceKey: "yinshan", sourceNote: "参考传统肉汤与瓜菜搭配，未沿用古代食疗功效表述。",
  },
  {
    id: "lib-corn-ribs", name: "玉米胡萝卜排骨汤", category: "汤羹", region: "家常", minutes: 75, pots: 2, difficulty: "入门", technique: "清炖 · 后调盐",
    ingredients: ["猪肋排 500克", "甜玉米 1根", "胡萝卜 1根", "姜 4片", "盐 适量"],
    steps: ["排骨焯水洗净，玉米和胡萝卜切块。", "排骨、姜和热水小火炖 35 分钟。", "加入玉米、胡萝卜再炖 25 分钟。", "最后再加盐，避免一开始把汤调得过咸。"],
    sourceKey: "system", sourceNote: "现代家庭清炖组合，按食材熟成顺序整理。",
  },
  {
    id: "lib-mushroom-tofu-soup", name: "菌菇豆腐汤", category: "汤羹", region: "素食家常", minutes: 18, pots: 1, difficulty: "入门", technique: "炒香菌菇 · 清汤",
    ingredients: ["豆腐 300克", "混合菌菇 300克", "鸡蛋 1个", "姜 2片", "白胡椒 少许"],
    steps: ["菌菇切成大小接近的片，豆腐切块。", "锅中少油把菌菇炒到出香、略微上色。", "加热水和豆腐煮 6 分钟。", "可淋入蛋液，最后用盐和白胡椒调味。"],
    sourceKey: "rice", sourceNote: "蔬菜与豆制品优先的一锅汤结构。",
  },
  {
    id: "lib-fish-tofu-soup", name: "鲫鱼豆腐汤", category: "汤羹", region: "江南家常", minutes: 40, pots: 1, difficulty: "进阶", technique: "煎鱼 · 沸水出白汤",
    ingredients: ["鲫鱼 1条", "豆腐 300克", "姜 4片", "葱 1根", "热水 1升"],
    steps: ["鱼处理干净并彻底擦干，豆腐切块。", "中火把鱼两面煎到定型微黄。", "一次加入滚烫的水和姜，大火煮 8 分钟。", "放豆腐转中火煮 10 分钟，最后加盐和葱。"],
    sourceKey: "suiyuan", sourceNote: "参考江鲜与豆腐搭配脉络，采用现代家庭白汤技法。",
  },
  {
    id: "lib-loofah-clam-soup", name: "丝瓜蛤蜊汤", category: "汤羹", region: "沿海家常", minutes: 18, pots: 1, difficulty: "入门", technique: "蛤蜊开口即停",
    ingredients: ["蛤蜊 500克", "丝瓜 1根", "姜 3片", "白胡椒 少许", "盐 少量"],
    steps: ["蛤蜊提前吐沙并刷洗，丝瓜去皮切滚刀块。", "锅中少油炒姜和丝瓜 1 分钟。", "加水烧开，放蛤蜊并加盖。", "蛤蜊全部开口后马上关火，尝过汤再决定是否加盐。"],
    sourceKey: "suiyuan", sourceNote: "遵循贝类取鲜与不过火原则，步骤为现代重写。",
  },
  {
    id: "lib-lotus-ribs", name: "莲藕排骨汤", category: "汤羹", region: "湖北风味", minutes: 100, pots: 2, difficulty: "周末菜", technique: "长炖 · 选粉藕",
    ingredients: ["猪肋排 600克", "粉藕 700克", "姜 5片", "盐 适量", "葱花"],
    steps: ["排骨焯水洗净，莲藕去皮切大块。", "排骨、姜和足量热水小火炖 40 分钟。", "加入莲藕继续小火炖 40 分钟。", "莲藕粉糯、排骨松软后加盐和葱花。"],
    sourceKey: "yinshan", sourceNote: "传统根茎肉汤搭配，去除不可靠食疗宣称。",
  },
  {
    id: "lib-radish-beef-soup", name: "萝卜牛肉汤", category: "汤羹", region: "北方家常", minutes: 95, pots: 2, difficulty: "周末菜", technique: "清炖 · 撇脂",
    ingredients: ["牛腱或牛腩 700克", "白萝卜 1根", "姜 5片", "香菜 1把", "盐 适量"],
    steps: ["牛肉冷水焯净，切大块；萝卜切块。", "牛肉和姜加足量热水，小火炖约 60 分钟。", "撇去表面多余油脂，放萝卜再炖 20 分钟。", "肉软后加盐，盛出撒香菜。"],
    sourceKey: "yinshan", sourceNote: "参考传统牛肉汤脉络，按现代清炖与去脂方式整理。",
  },

  {
    id: "lib-smashed-cucumber", name: "凉拌黄瓜", category: "凉拌", region: "家常", minutes: 10, pots: 0, difficulty: "入门", technique: "拍裂 · 先腌后拌",
    ingredients: ["黄瓜 2根", "蒜 4瓣", "米醋 1.5汤匙", "生抽 1汤匙", "香油 1茶匙"],
    steps: ["黄瓜拍裂切段，加一撮盐腌 5 分钟。", "倒掉析出的水，蒜切末。", "醋、生抽、香油和少量糖调匀。", "食用前再拌汁，避免久放出水。"],
    sourceKey: "rice", sourceNote: "按家常凉拌菜少汁、现拌现吃原则整理。",
  },
  {
    id: "lib-cold-wood-ear", name: "凉拌木耳", category: "凉拌", region: "家常", minutes: 15, pots: 1, difficulty: "入门", technique: "充分焯熟 · 酸香",
    ingredients: ["干木耳 20克", "蒜 3瓣", "米醋 1.5汤匙", "生抽 1汤匙", "香菜 1把"],
    steps: ["木耳在冷藏条件下泡发，洗净根部。", "沸水焯 2 至 3 分钟，捞出沥干。", "蒜、醋、生抽、少量糖和香油调汁。", "木耳放凉后拌汁，最后放香菜。"],
    sourceKey: "rice", sourceNote: "加入泡发与焯熟的现代食品安全处理。",
  },
  {
    id: "lib-century-egg-tofu", name: "皮蛋豆腐", category: "凉拌", region: "家常", minutes: 8, pots: 0, difficulty: "入门", technique: "控水 · 现拌",
    ingredients: ["内酯豆腐 1盒", "皮蛋 2个", "生抽 1汤匙", "米醋 1茶匙", "香油 1茶匙"],
    steps: ["豆腐倒出后静置控掉盒中水。", "皮蛋切小块，整齐铺在豆腐上。", "生抽、醋、香油和少量糖调匀。", "吃前淋汁，可加葱花或辣椒油。"],
    sourceKey: "rice", sourceNote: "现代冷菜组合，突出控水和现拌。",
  },
  {
    id: "lib-shredded-chicken", name: "手撕鸡", category: "凉拌", region: "粤味家常", minutes: 35, pots: 1, difficulty: "进阶", technique: "浸熟 · 撕纹理",
    ingredients: ["鸡腿 3只", "黄瓜 1根", "姜葱", "生抽 1汤匙", "芝麻油 1茶匙"],
    steps: ["鸡腿与姜葱冷水下锅，微沸煮熟后关火焖 8 分钟。", "确认中心熟透，捞出放凉后顺纹撕条。", "黄瓜切丝，生抽、醋、芝麻油和蒜调汁。", "鸡丝与黄瓜拌匀，食用前再淋汁。"],
    sourceKey: "mastering", sourceNote: "采用中式白切与浸熟框架，重新编写家庭安全时间。",
  },
  {
    id: "lib-mouthwatering-chicken", name: "口水鸡", category: "凉拌", region: "川味", minutes: 40, pots: 1, difficulty: "进阶", technique: "浸熟鸡 · 红油复合汁",
    ingredients: ["鸡腿 3只", "花生 40克", "辣椒油 2汤匙", "生抽 1汤匙", "花椒粉 半茶匙"],
    steps: ["鸡腿加姜葱煮熟，关火焖透后放凉切块。", "生抽、醋、糖、辣椒油、花椒粉和少量鸡汤调汁。", "酱汁尝到咸、酸、甜、麻辣平衡。", "鸡块装盘淋汁，最后撒花生碎和葱花。"],
    sourceKey: "sichuan", sourceNote: "按川味凉鸡复合味型重写，不复制现代书中配方。",
  },
  {
    id: "lib-kelp-salad", name: "凉拌海带丝", category: "凉拌", region: "家常", minutes: 15, pots: 1, difficulty: "入门", technique: "焯熟 · 酸辣去腥",
    ingredients: ["海带丝 300克", "蒜 3瓣", "米醋 1.5汤匙", "生抽 1汤匙", "辣椒油 1茶匙"],
    steps: ["海带丝充分清洗，按产品情况泡去多余盐分。", "沸水焯到熟而仍有韧度，捞出过凉开水。", "蒜、醋、生抽、辣椒油和糖调汁。", "海带沥干后拌匀，冷藏 10 分钟更入味。"],
    sourceKey: "rice", sourceNote: "家常酸辣凉拌框架，并补充盐渍海带处理。",
  },
  {
    id: "lib-sesame-spinach", name: "麻酱菠菜", category: "凉拌", region: "北方家常", minutes: 12, pots: 1, difficulty: "入门", technique: "焯水挤干 · 澥麻酱",
    ingredients: ["菠菜 500克", "芝麻酱 2汤匙", "生抽 1汤匙", "米醋 1茶匙", "蒜 2瓣"],
    steps: ["菠菜洗净，沸水中焯到刚变软。", "捞出过凉开水，轻轻挤干并切段。", "芝麻酱分次加温水调顺，再放生抽、醋和蒜。", "酱汁食用前淋在菠菜上。"],
    sourceKey: "rice", sourceNote: "按北方芝麻酱凉菜的分次澥酱方法整理。",
  },
  {
    id: "lib-garlic-pork", name: "蒜泥白肉", category: "凉拌", region: "川味", minutes: 45, pots: 1, difficulty: "进阶", technique: "整块煮 · 薄切 · 蒜泥汁",
    ingredients: ["带皮五花肉 500克", "黄瓜 1根", "蒜 8瓣", "辣椒油 2汤匙", "生抽 1.5汤匙"],
    steps: ["五花肉与姜葱冷水下锅，微沸煮熟后放凉。", "肉切尽可能薄的大片，黄瓜刨长片。", "蒜泥、生抽、醋、糖、辣椒油和少量肉汤调汁。", "黄瓜与肉片卷叠装盘，食用前淋汁。"],
    sourceKey: "sichuan", sourceNote: "按川味白肉与复合蒜泥汁框架重写。",
  },

  {
    id: "lib-yangzhou-rice", name: "扬州炒饭", category: "主食", region: "淮扬", minutes: 18, pots: 1, difficulty: "进阶", technique: "冷饭 · 配料小丁 · 分炒",
    ingredients: ["冷米饭 3碗", "鸡蛋 3个", "虾仁 120克", "火腿 80克", "豌豆胡萝卜 150克"],
    steps: ["冷饭抓散，所有配料切成米粒大小的丁。", "鸡蛋炒碎盛出，虾仁炒熟盛出。", "配菜炒干后放米饭，大火炒到颗粒松散。", "蛋和虾回锅，加盐、白胡椒和葱花翻匀。"],
    sourceKey: "wong", sourceNote: "参照早期剩饭利用类别，按现代扬州炒饭结构重写。",
  },
  {
    id: "lib-claypot-rice", name: "腊肠煲仔饭", category: "主食", region: "粤味", minutes: 40, pots: 1, difficulty: "进阶", technique: "砂锅焖饭 · 锅巴",
    ingredients: ["大米 250克", "广式腊肠 2根", "青菜 2棵", "鸡蛋 1个", "煲仔汁 2汤匙"],
    steps: ["大米洗净浸泡 30 分钟，腊肠切片。", "米和适量水入砂锅，中火煮开后转小火。", "水分快收干时铺腊肠、打鸡蛋，沿锅边淋少量油。", "加盖焖熟，关火再焖 8 分钟，放青菜和煲仔汁。"],
    sourceKey: "mastering", sourceNote: "依据中式砂锅饭技法整理，强调浸米和小火。",
  },
  {
    id: "lib-braised-noodles", name: "豆角焖面", category: "主食", region: "北方家常", minutes: 30, pots: 1, difficulty: "进阶", technique: "留汤 · 蒸焖面条",
    ingredients: ["鲜面条 350克", "四季豆 350克", "五花肉 150克", "生抽 2汤匙", "蒜 4瓣"],
    steps: ["四季豆掰段，五花肉切片，面条抖散。", "煸香五花肉，放豆角炒匀，加水和调料煮开。", "盛出半碗汤，面条松散铺在菜上，加盖焖。", "分两次沿边淋回汤汁，面熟后用筷子抖匀。"],
    sourceKey: "mastering", sourceNote: "按北方面食的蒸焖逻辑重写，避免面条浸烂。",
  },
  {
    id: "lib-scallion-oil-noodles", name: "葱油拌面", category: "主食", region: "上海风味", minutes: 20, pots: 2, difficulty: "入门", technique: "小火熬葱油 · 热拌",
    ingredients: ["面条 300克", "小葱 1大把", "生抽 2汤匙", "老抽 1茶匙", "糖 1茶匙"],
    steps: ["小葱擦干切段，葱白和葱绿分开。", "冷油下葱，小火慢熬到葱叶焦脆，捞出。", "葱油中加生抽、老抽和糖，小火煮到融合。", "面条煮熟沥干，趁热拌葱油汁和焦葱。"],
    sourceKey: "rice", sourceNote: "按江南家常面的小火葱油技法整理。",
  },
  {
    id: "lib-zhajiang-noodles", name: "炸酱面", category: "主食", region: "北京风味", minutes: 35, pots: 2, difficulty: "进阶", technique: "煸肉丁 · 小火炸酱",
    ingredients: ["面条 350克", "五花肉丁 250克", "黄酱 3汤匙", "甜面酱 1汤匙", "黄瓜豆芽 适量"],
    steps: ["黄酱和甜面酱用少量水调开，菜码切丝或焯熟。", "锅中煸香五花肉丁，炒到油脂析出。", "倒入酱汁，小火不断翻炒到油酱分离。", "面条煮熟，浇炸酱并铺菜码，拌匀食用。"],
    sourceKey: "mastering", sourceNote: "采用北方炸酱的油酱分离判断，配方为本站重写。",
  },
  {
    id: "lib-yangchun-noodles", name: "阳春面", category: "主食", region: "江南", minutes: 10, pots: 1, difficulty: "入门", technique: "碗底调汤 · 清鲜",
    ingredients: ["细面 250克", "猪油或香油 1茶匙", "生抽 1汤匙", "葱花", "高汤或面汤 600毫升"],
    steps: ["碗底放生抽、猪油或香油、葱花和白胡椒。", "水开下面，煮到刚好没有硬芯。", "先舀热汤冲开碗底调料。", "捞入面条，尝味后补盐，立即食用。"],
    sourceKey: "rice", sourceNote: "按江南清汤面结构整理为十分钟版本。",
  },
  {
    id: "lib-beef-chowfun", name: "牛肉炒河粉", category: "主食", region: "粤味", minutes: 22, pots: 1, difficulty: "进阶", technique: "宽锅 · 少翻 · 镬气",
    ingredients: ["鲜河粉 500克", "牛肉 250克", "豆芽 200克", "韭黄 100克", "生抽 2汤匙"],
    steps: ["牛肉逆纹切片上浆，河粉提前轻轻抖散。", "宽锅大火把牛肉滑到变色后盛出。", "补少量油，下河粉铺开煎热，沿锅边淋生抽。", "放牛肉、豆芽和韭黄，快速抄匀，少翻防碎。"],
    sourceKey: "mastering", sourceNote: "按粤式炒粉的锅量与少翻原则重写。",
  },
  {
    id: "lib-pork-cabbage-dumpling", name: "白菜猪肉饺子", category: "主食", region: "北方", minutes: 70, pots: 1, difficulty: "周末菜", technique: "打水馅 · 白菜挤水",
    ingredients: ["饺子皮 50张", "猪肉末 500克", "白菜 600克", "葱姜水 120毫升", "生抽 2汤匙"],
    steps: ["肉馅分次加入葱姜水，顺一个方向搅到吸收。", "白菜切碎加盐杀水，挤干后拌油。", "白菜与肉馅混合，最后调盐，包入饺子皮。", "沸水下锅，水再次沸腾后点水，煮到皮馅全熟。"],
    sourceKey: "wikibooks", sourceNote: "参照开放饺子类别，按中国家庭打水馅方法重写。",
  },
  {
    id: "lib-chive-egg-dumpling", name: "韭菜鸡蛋饺子", category: "主食", region: "北方", minutes: 60, pots: 2, difficulty: "周末菜", technique: "馅料降温 · 最后放盐",
    ingredients: ["饺子皮 45张", "韭菜 500克", "鸡蛋 5个", "粉丝 80克", "香油 1汤匙"],
    steps: ["鸡蛋炒成小碎块并彻底放凉，粉丝泡软切碎。", "韭菜洗后完全晾干，切碎先拌香油。", "混合鸡蛋、粉丝和韭菜，包之前再放盐。", "沸水下饺子，轻推防粘，煮到鼓起并全熟。"],
    sourceKey: "mastering", sourceNote: "按素馅防出水原则整理，强调冷馅和后放盐。",
  },
  {
    id: "lib-scallion-pancake", name: "葱油饼", category: "主食", region: "北方", minutes: 50, pots: 1, difficulty: "进阶", technique: "烫面 · 抹油酥 · 分层",
    ingredients: ["中筋面粉 300克", "热水 180毫升", "小葱 1把", "面粉 2汤匙", "食用油 3汤匙"],
    steps: ["面粉分次加热水揉成软面团，盖住醒 20 分钟。", "油和面粉调成稀油酥，小葱切碎。", "面团擀薄，抹油酥撒葱，卷起盘成饼再擀开。", "平底锅中小火烙到两面金黄，边烙边转动。"],
    sourceKey: "wellcome", sourceNote: "参考早期中英面点资料类别，步骤按现代烫面法重写。",
  },

  {
    id: "lib-mapo-tofu", name: "麻婆豆腐", category: "经典菜", region: "川味", minutes: 22, pots: 1, difficulty: "进阶", technique: "煮豆腐 · 分次勾芡 · 麻辣",
    ingredients: ["嫩豆腐 500克", "牛肉末或猪肉末 120克", "豆瓣酱 1汤匙", "豆豉 1茶匙", "花椒粉 1茶匙"],
    steps: ["豆腐切块，用淡盐水轻煮后沥出。", "锅中炒酥肉末，放豆瓣酱、豆豉和蒜炒出红油。", "加水和豆腐轻推入味，避免猛翻。", "淀粉水分三次勾芡，出锅撒花椒粉和葱花。"],
    sourceKey: "wikibooks", sourceNote: "结合开放菜谱与川菜技法脉络，重新标定家庭用量。",
  },
  {
    id: "lib-waterboiled-pork", name: "水煮肉片", category: "经典菜", region: "川味", minutes: 35, pots: 1, difficulty: "进阶", technique: "上浆汆熟 · 热油激香",
    ingredients: ["猪里脊 350克", "豆芽 300克", "莴笋 1根", "豆瓣酱 1.5汤匙", "干辣椒花椒"],
    steps: ["肉逆纹切薄片，用盐、淀粉、蛋清和油抓匀。", "蔬菜炒断生铺在大碗底。", "炒香豆瓣酱，加水煮开，肉片逐片下锅到刚熟。", "肉和汤倒碗中，撒辣椒花椒，淋少量热油激香。"],
    sourceKey: "sichuan", sourceNote: "按川菜水煮技法重写，并控制家庭版油量。",
  },
  {
    id: "lib-pickled-fish", name: "酸菜鱼", category: "经典菜", region: "川渝", minutes: 45, pots: 1, difficulty: "进阶", technique: "片鱼上浆 · 鱼骨熬汤 · 短汆",
    ingredients: ["鱼片 500克", "鱼骨 300克", "酸菜 300克", "泡椒 适量", "蛋清 半个"],
    steps: ["鱼片擦干，用盐、蛋清和淀粉抓匀；鱼骨另放。", "鱼骨煎香，加热水煮成汤，过滤或捞出。", "炒香酸菜和泡椒，倒入鱼汤煮出味。", "转小火逐片放鱼，刚变白卷曲就离火。"],
    sourceKey: "sichuan", sourceNote: "依据川渝酸菜鱼的鱼骨汤与短汆结构原创重写。",
  },
  {
    id: "lib-dryfried-beans", name: "干煸四季豆", category: "经典菜", region: "川味", minutes: 25, pots: 1, difficulty: "进阶", technique: "煸皱熟透 · 干香",
    ingredients: ["四季豆 500克", "肉末 100克", "芽菜 30克", "干辣椒 适量", "花椒 1茶匙"],
    steps: ["四季豆去筋擦干，掰成小段。", "锅中适量油把四季豆煸到表皮起皱且完全熟透，盛出。", "少油炒酥肉末、芽菜、辣椒和花椒。", "四季豆回锅，加少量盐和糖翻到干香。"],
    sourceKey: "sichuan", sourceNote: "按干煸的脱水与干香逻辑重写，并强调四季豆熟透。",
  },
  {
    id: "lib-yuxiang-eggplant", name: "鱼香茄子", category: "经典菜", region: "川味", minutes: 25, pots: 1, difficulty: "进阶", technique: "茄子预熟 · 鱼香汁",
    ingredients: ["茄子 500克", "泡椒或豆瓣酱 1汤匙", "蒜 4瓣", "生抽 1汤匙", "醋 1汤匙"],
    steps: ["茄子切条，用盐杀水后挤干，或先蒸到半软。", "少油把茄子煎软后盛出。", "炒香泡椒、姜蒜，加入糖、醋、生抽和水。", "茄子回锅烧入味，薄芡收亮。"],
    sourceKey: "sichuan", sourceNote: "以川菜鱼香味型为脉络，配方独立重写。",
  },
  {
    id: "lib-three-earth", name: "地三鲜", category: "经典菜", region: "东北", minutes: 28, pots: 1, difficulty: "进阶", technique: "分批熟成 · 酱汁合炒",
    ingredients: ["土豆 2个", "茄子 2根", "青椒 2个", "蒜 4瓣", "生抽 1.5汤匙"],
    steps: ["土豆切块先微波或蒸至半熟；茄子盐腌挤水。", "少油分批把土豆煎金黄、茄子煎软。", "青椒和蒜大火炒香。", "全部食材回锅，加生抽、糖和少量淀粉水快速合炒。"],
    sourceKey: "system", sourceNote: "按东北家常组合改成少油、分批预熟版本。",
  },
];

const AIR_FRYER_RECIPES: LibraryRecipe[] = [
  {
    id: "air-garlic-wings", name: "蒜香鸡翅", category: "空气炸锅", region: "家常", minutes: 23, pots: 1, difficulty: "入门", technique: "擦干腌味 · 中途翻面 · 高温上色",
    ingredients: ["鸡中翅 10只", "蒜末 4瓣", "生抽 1汤匙", "蚝油 1茶匙", "食用油 1茶匙"],
    steps: ["鸡翅擦干、两面划刀，与蒜末和调料冷藏腌 20 分钟。", "炸篮薄刷油，鸡翅单层摆放；180°C 炸 10 分钟。", "翻面后再炸 8 分钟，最后调到 200°C 炸 2 至 3 分钟上色。", "最厚处中心达到 74°C 再出锅；不够熟就每次补 2 分钟。"],
    sourceKey: "airfryer", sourceNote: "参考官方鸡翅时间区间重新调味；禽肉以中心 74°C 为熟透标准。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 18,
  },
  {
    id: "air-crispy-drumsticks", name: "椒盐脆皮鸡腿", category: "空气炸锅", region: "家常", minutes: 28, pots: 1, difficulty: "入门", technique: "擦干鸡皮 · 先低后高 · 翻面",
    ingredients: ["琵琶腿 6只", "盐 3克", "白胡椒 半茶匙", "五香粉 半茶匙", "食用油 1茶匙"],
    steps: ["鸡腿擦到表皮干爽，在厚肉处划两刀，拌盐、胡椒和五香粉。", "皮朝下单层摆入炸篮，180°C 炸 12 分钟。", "翻面再炸 10 分钟，最后 200°C 炸 3 至 5 分钟让鸡皮变脆。", "避开骨头测最厚处，达到 74°C 后静置 3 分钟。"],
    sourceKey: "airfryer", sourceNote: "按官方鸡腿起始参数整理；大小不同需以中心温度校正。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 22,
  },
  {
    id: "air-chicken-breast", name: "嫩烤鸡胸", category: "空气炸锅", region: "轻食", minutes: 20, pots: 1, difficulty: "入门", technique: "拍匀厚度 · 表面薄油 · 静置回汁",
    ingredients: ["鸡胸肉 2块约430克", "生抽 1汤匙", "蜂蜜 1茶匙", "黑胡椒 半茶匙", "食用油 1茶匙"],
    steps: ["鸡胸厚处轻拍到约 2 厘米，加入调料冷藏腌 20 分钟。", "表面薄刷油，180°C 炸 8 分钟。", "翻面再炸 6 至 8 分钟，从第 14 分钟开始检查。", "中心达到 74°C 立即取出，静置 5 分钟再切，避免汁水流失。"],
    sourceKey: "airfryer", sourceNote: "采用官方鸡胸温度与时间范围，增加拍薄和提前测温防柴。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 14,
  },
  {
    id: "air-cumin-lamb", name: "孜然羊肉串", category: "空气炸锅", region: "西北风味", minutes: 17, pots: 1, difficulty: "入门", technique: "同等切块 · 松散排布 · 中途翻面",
    ingredients: ["羊腿肉 350克", "洋葱 半个", "孜然粉 2茶匙", "辣椒粉 1茶匙", "食用油 1茶匙"],
    steps: ["羊肉切 2 厘米块，与洋葱、孜然、盐和油抓匀腌 20 分钟。", "串好或直接单层放入炸篮，190°C 炸 6 分钟。", "翻面并补撒孜然，再炸 5 至 6 分钟。", "整块羊肉中心至少 63°C 并静置 3 分钟；想更熟可补 2 分钟。"],
    sourceKey: "airfryer", sourceNote: "按官方羊排高温短烤思路改为小块羊肉；熟度按整块羊肉安全温度判断。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 11,
  },
  {
    id: "air-blackpepper-beef", name: "黑椒牛肉粒", category: "空气炸锅", region: "家常", minutes: 13, pots: 1, difficulty: "进阶", technique: "大块均匀 · 高温短烤 · 及时出锅",
    ingredients: ["牛里脊或牛排 350克", "彩椒 1个", "黑胡椒 1茶匙", "生抽 1汤匙", "食用油 1茶匙"],
    steps: ["牛肉切 2.5 厘米块并擦干，拌生抽、黑胡椒和油。", "200°C 炸 4 分钟，拉出炸篮迅速晃散。", "加入彩椒块，再炸 3 至 5 分钟；从第 7 分钟开始检查。", "按喜欢的熟度及时取出；需安全基准时中心达到 63°C 并静置 3 分钟。"],
    sourceKey: "airfryer", sourceNote: "参考官方牛排高温短烤区间，改写为更适合炸篮的牛肉粒。", appliance: "空气炸锅", temperatureC: 200, checkAtMinute: 7,
  },
  {
    id: "air-cumin-pork", name: "孜然五花肉片", category: "空气炸锅", region: "烧烤风味", minutes: 16, pots: 1, difficulty: "入门", technique: "薄片平铺 · 中途倒油 · 边缘焦香",
    ingredients: ["五花肉片 350克", "孜然粉 2茶匙", "辣椒粉 1茶匙", "生抽 1汤匙", "洋葱 半个"],
    steps: ["五花肉切约 4 毫米薄片，与调料抓匀；洋葱切粗丝。", "190°C 炸 6 分钟后翻动，把粘连肉片拨开。", "加入洋葱再炸 5 至 7 分钟；油脂多时中途小心倒掉接油盘油脂。", "肉片边缘微焦、中心熟透即出锅，撒少量孜然。"],
    sourceKey: "airfryer", sourceNote: "按高脂食材避免拥挤与中途处理油脂的官方使用原则重写。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 11,
  },
  {
    id: "air-garlic-ribs", name: "蒜香小排", category: "空气炸锅", region: "家常", minutes: 35, pots: 1, difficulty: "进阶", technique: "小块腌透 · 先熟后焦 · 分段检查",
    ingredients: ["猪小排 500克", "蒜末 5瓣", "生抽 1.5汤匙", "蚝油 1汤匙", "淀粉 1茶匙"],
    steps: ["小排切小段并擦干，与蒜末和调料冷藏腌至少 30 分钟。", "180°C 单层炸 12 分钟，翻面并把蒜末重新抹在表面。", "再炸 10 至 12 分钟，最后 200°C 炸 2 分钟上色。", "肉边收缩且中心至少 63°C，静置 3 分钟；厚排需继续补时。"],
    sourceKey: "food-safety", sourceNote: "时间按小块排骨家庭实测区间设计，最终以 USDA 整块猪肉中心温度为准。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 22,
  },
  {
    id: "air-lemon-salmon", name: "柠檬黑椒三文鱼", category: "空气炸锅", region: "轻食", minutes: 16, pots: 1, difficulty: "入门", technique: "带皮朝下 · 短时烘烤 · 不频繁翻动",
    ingredients: ["三文鱼排 2块约300克", "柠檬 半个", "黑胡椒 半茶匙", "盐 2克", "食用油 1茶匙"],
    steps: ["三文鱼擦干，抹盐、黑胡椒和薄油，表面放柠檬片。", "皮朝下放入炸篮，180°C 炸 8 分钟。", "从第 8 分钟开始看厚处，通常再需 2 至 4 分钟。", "中心达到 63°C 或鱼肉完全不透明、可轻易分片时取出。"],
    sourceKey: "airfryer", sourceNote: "参考官方 300 克三文鱼 180°C 参数，并加入提前检查避免过熟。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 8,
  },
  {
    id: "air-garlic-shrimp", name: "蒜蓉大虾", category: "空气炸锅", region: "海鲜", minutes: 11, pots: 1, difficulty: "入门", technique: "开背擦干 · 高温短烤 · 及时停火",
    ingredients: ["大虾 12只约400克", "蒜末 4瓣", "食用油 1茶匙", "盐 2克", "白胡椒 少许"],
    steps: ["大虾剪须、开背去虾线并彻底擦干，拌蒜末、盐和油。", "190°C 单层炸 4 分钟。", "翻动一次，再炸 3 至 4 分钟。", "虾身卷曲变红、中心不透明即取出；久炸会明显变硬。"],
    sourceKey: "food-safety", sourceNote: "按海鲜中心 63°C 的安全要求编写，采用短时高温避免虾肉过老。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 7,
  },
  {
    id: "air-crispy-tofu", name: "椒盐脆豆腐", category: "空气炸锅", region: "素食", minutes: 20, pots: 1, difficulty: "入门", technique: "压干水分 · 薄裹淀粉 · 中途翻动",
    ingredients: ["北豆腐 400克", "玉米淀粉 1汤匙", "食用油 2茶匙", "椒盐 1茶匙", "辣椒粉 可选"],
    steps: ["豆腐压去水分后切 2 厘米块，轻轻拌油。", "撒淀粉和一半椒盐，翻到表面均匀无干粉。", "190°C 炸 8 分钟，翻动后再炸 6 至 8 分钟。", "四面金黄后取出，趁热补撒剩余椒盐。"],
    sourceKey: "airfryer", sourceNote: "运用炸篮热风循环与中途翻动原则，按家庭低油版本独立编写。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 14,
  },
  {
    id: "air-king-oyster", name: "黑椒杏鲍菇", category: "空气炸锅", region: "素食", minutes: 15, pots: 1, difficulty: "入门", technique: "切厚片 · 少量油 · 高温焦边",
    ingredients: ["杏鲍菇 3根约450克", "生抽 1汤匙", "黑胡椒 1茶匙", "食用油 1茶匙", "蒜粉 可选"],
    steps: ["杏鲍菇切 1 厘米厚片，表面轻划十字纹。", "与生抽、黑胡椒和油拌匀，静置 5 分钟。", "190°C 炸 6 分钟后翻面。", "再炸 4 至 5 分钟，到边缘焦香、内部仍有汁水时出锅。"],
    sourceKey: "airfryer", sourceNote: "利用高温热风给含水菌菇快速上色，避免长时间烘干。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 10,
  },
  {
    id: "air-garlic-cauliflower", name: "蒜香烤花菜", category: "空气炸锅", region: "素食", minutes: 17, pots: 1, difficulty: "入门", technique: "小朵沥干 · 薄油包裹 · 晃篮",
    ingredients: ["花菜 500克", "蒜末 3瓣", "食用油 2茶匙", "盐 2克", "辣椒粉 半茶匙"],
    steps: ["花菜分成均匀小朵，洗后彻底沥干。", "拌蒜末、油、盐和辣椒粉，薄薄铺入炸篮。", "180°C 炸 7 分钟后拉出晃匀。", "再炸 5 至 7 分钟，到梗刚熟、花球边缘焦黄。"],
    sourceKey: "airfryer", sourceNote: "按小块蔬菜避免拥挤、烹调中晃篮的官方使用原则整理。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 12,
  },
  {
    id: "air-corn", name: "黄油烤玉米", category: "空气炸锅", region: "小食", minutes: 20, pots: 1, difficulty: "入门", technique: "切段 · 两次刷味 · 翻面",
    ingredients: ["甜玉米 2根", "黄油 10克", "盐 1克", "辣椒粉 半茶匙", "孜然粉 半茶匙"],
    steps: ["玉米切成能平放炸篮的段，表面擦干。", "薄刷一半黄油，180°C 炸 8 分钟。", "翻面刷剩余黄油并撒盐、孜然和辣椒粉。", "再炸 7 至 9 分钟，玉米粒鼓起并出现焦点即可。"],
    sourceKey: "airfryer", sourceNote: "按蔬菜类中途翻动与少量油脂上色的原则重新编写。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 15,
  },
  {
    id: "air-honey-pumpkin", name: "蜜烤南瓜", category: "空气炸锅", region: "小食", minutes: 23, pots: 1, difficulty: "入门", technique: "同厚切片 · 后刷蜂蜜 · 防焦",
    ingredients: ["贝贝南瓜 半个约500克", "食用油 1茶匙", "蜂蜜 1茶匙", "盐 1克", "黑胡椒 少许"],
    steps: ["南瓜去籽后切约 1.5 厘米厚片，拌油、盐和黑胡椒。", "180°C 炸 10 分钟后翻面。", "再炸 6 分钟，薄刷蜂蜜后补 2 至 3 分钟。", "筷子能轻松扎透就取出；蜂蜜只在最后放，避免发苦。"],
    sourceKey: "airfryer", sourceNote: "利用官方薯类 180°C 区间，并把含糖调味安排在末段防焦。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 16,
  },
  {
    id: "air-sweet-potato", name: "烤红薯块", category: "空气炸锅", region: "小食", minutes: 28, pots: 1, difficulty: "入门", technique: "均匀切块 · 单层铺开 · 两次晃篮",
    ingredients: ["红薯 500克", "食用油 1茶匙", "肉桂粉 可选", "盐 一小撮"],
    steps: ["红薯去皮切约 2 厘米块，冲去表面淀粉并擦干。", "拌薄油和一小撮盐，180°C 炸 10 分钟。", "晃篮后再炸 8 分钟，再检查并翻动一次。", "继续炸 3 至 5 分钟，到外层微焦、中心软糯。"],
    sourceKey: "airfryer", sourceNote: "参考官方甜薯条 180°C 时间范围，改为更不易干硬的块状版本。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 18,
  },
  {
    id: "air-potato-wedges", name: "脆皮薯角", category: "空气炸锅", region: "小食", minutes: 28, pots: 1, difficulty: "入门", technique: "泡洗淀粉 · 彻底擦干 · 晃篮",
    ingredients: ["土豆 500克", "食用油 2茶匙", "玉米淀粉 1茶匙", "盐 2克", "红椒粉 半茶匙"],
    steps: ["土豆连皮切均匀薯角，冷水泡 10 分钟后彻底擦干。", "拌油、淀粉和红椒粉，单层放入炸篮。", "190°C 炸 10 分钟，晃篮翻面后再炸 8 分钟。", "从第 18 分钟开始检查，金黄酥脆后撒盐；拥挤就分两锅。"],
    sourceKey: "airfryer", sourceNote: "参考官方薯类时间并强调不拥挤与中途晃篮，提升均匀度。", appliance: "空气炸锅", temperatureC: 190, checkAtMinute: 18,
  },
  {
    id: "air-garlic-eggplant", name: "蒜蓉烤茄子", category: "空气炸锅", region: "烧烤风味", minutes: 30, pots: 1, difficulty: "入门", technique: "先软化 · 后铺蒜蓉 · 末段上色",
    ingredients: ["长茄子 2根", "蒜末 6瓣", "生抽 1汤匙", "食用油 2茶匙", "小米辣 可选"],
    steps: ["茄子洗净擦干，表面薄刷油，180°C 整根炸 15 分钟。", "茄子变软后纵向剖开，用勺背轻压平。", "铺上蒜末、生抽、少量油和小米辣，再炸 6 至 8 分钟。", "蒜蓉冒香、茄肉完全软塌后取出，避免蒜末烤黑。"],
    sourceKey: "airfryer", sourceNote: "采用先让整根茄子软化、再加入易焦调味的两段式方法。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 21,
  },
  {
    id: "air-toast-pizza", name: "吐司小披萨", category: "空气炸锅", region: "早餐", minutes: 12, pots: 1, difficulty: "入门", technique: "少酱防湿 · 压住轻料 · 短时融化",
    ingredients: ["厚吐司 4片", "番茄酱 4茶匙", "马苏里拉奶酪 100克", "彩椒 半个", "火腿 80克"],
    steps: ["吐司薄抹番茄酱，铺火腿和彩椒小丁。", "最后撒奶酪并轻压，避免轻小食材被热风吹起。", "180°C 炸 5 分钟后检查。", "奶酪融化并出现焦点即可，通常再需 1 至 2 分钟。"],
    sourceKey: "airfryer", sourceNote: "按烘焙类短时加热和防止轻食材飞起的使用原则重写。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 5,
  },
  {
    id: "air-scallion-pancake", name: "手抓饼鸡蛋卷", category: "空气炸锅", region: "早餐", minutes: 15, pots: 1, difficulty: "入门", technique: "半熟定型 · 加蛋回烤 · 卷起",
    ingredients: ["冷冻手抓饼 2张", "鸡蛋 2个", "葱花 2汤匙", "火腿 2片", "黑胡椒 少许"],
    steps: ["手抓饼无需完全解冻，放烘焙纸上，边缘留出通风空间。", "180°C 先炸 4 分钟，让饼面半熟定型。", "翻面压出浅窝，打入鸡蛋并放火腿、葱花，再炸 5 至 6 分钟。", "确认蛋白和蛋黄达到想要熟度后卷起；鸡蛋需完全熟时中心达到 71°C。"],
    sourceKey: "food-safety", sourceNote: "按鸡蛋安全温度与空气炸锅烘焙逻辑组合成一锅早餐。", appliance: "空气炸锅", temperatureC: 180, checkAtMinute: 9,
  },
  {
    id: "air-banana-oat-cup", name: "香蕉燕麦杯", category: "空气炸锅", region: "早餐", minutes: 20, pots: 1, difficulty: "入门", technique: "耐热模具 · 低温烘烤 · 插签检查",
    ingredients: ["熟香蕉 2根", "即食燕麦 120克", "鸡蛋 2个", "牛奶 100毫升", "坚果 20克"],
    steps: ["香蕉压泥，与鸡蛋、牛奶和燕麦拌匀，静置 5 分钟。", "倒入可进空气炸锅的耐热小模具，表面撒坚果。", "160°C 炸 12 分钟后开始检查。", "中心凝固、插入牙签基本干净即可，通常再需 2 至 4 分钟。"],
    sourceKey: "airfryer", sourceNote: "参考官方烘焙类 160°C 参数，改写为无额外糖的早餐杯。", appliance: "空气炸锅", temperatureC: 160, checkAtMinute: 12,
  },
];

const SYSTEM_LIBRARY_RECIPES: LibraryRecipe[] = RECIPES.map((recipe) => ({
  id: `system-${recipe.id}`,
  fullRecipeId: recipe.id,
  name: recipe.name,
  category: "系统菜",
  region: "家常基础",
  minutes: recipe.minutes,
  pots: recipe.pots,
  difficulty: recipe.minutes > 40 ? "周末菜" : recipe.minutes > 18 ? "进阶" : "入门",
  technique: recipe.technique,
  ingredients: recipe.ingredients.map((item) => item.display ?? `${item.name} ${item.amount}${item.unit}`),
  steps: recipe.steps.map((step) => `${step.heat}｜${step.title}：${step.text}`),
  sourceKey: "system",
  sourceNote: "完整支持库存匹配、分步火候、计时、扣库存和失败补救。",
}));

export const LIBRARY_RECIPES = [...SYSTEM_LIBRARY_RECIPES, ...AIR_FRYER_RECIPES, ...EXTRA_RECIPES];

export const LIBRARY_CATEGORIES = ["全部", "空气炸锅", "系统菜", "快炒", "烧焖", "蒸菜", "汤羹", "凉拌", "主食", "经典菜"];

export function getSource(key: string) {
  return SOURCE_LIBRARY.find((source) => source.key === key) ?? SOURCE_LIBRARY[0];
}
