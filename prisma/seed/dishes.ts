// 家常菜随机抽奖 - 初始数据
// type: MEAT 荤菜 | VEGGIE 素菜/青菜

export type DishSeed = {
  name: string;
  nameEn?: string;
  type: "MEAT" | "VEGGIE";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  note?: string;
  emoji?: string;
};

export const DISHES: DishSeed[] = [
  // ════════════════════════════════════════
  // 荤菜 MEAT
  // ════════════════════════════════════════
  { name: "红烧肉", nameEn: "Braised Pork Belly", type: "MEAT", difficulty: "MEDIUM", note: "五花肉 + 冰糖 + 老抽，炖到入口即化", emoji: "🥘" },
  { name: "宫保鸡丁", nameEn: "Kung Pao Chicken", type: "MEAT", difficulty: "EASY", note: "鸡胸肉 + 花生 + 干辣椒，酸甜微辣", emoji: "🌶️" },
  { name: "鱼香肉丝", nameEn: "Yuxiang Pork", type: "MEAT", difficulty: "MEDIUM", note: "猪肉丝 + 木耳 + 胡萝卜，经典下饭菜", emoji: "🥢" },
  { name: "糖醋里脊", nameEn: "Sweet and Sour Pork", type: "MEAT", difficulty: "MEDIUM", note: "里脊肉挂糊炸 + 糖醋汁", emoji: "🍖" },
  { name: "回锅肉", nameEn: "Twice-cooked Pork", type: "MEAT", difficulty: "MEDIUM", note: "五花肉先煮后炒 + 豆瓣酱 + 青蒜", emoji: "🥓" },
  { name: "水煮牛肉", nameEn: "Boiled Beef in Chili Oil", type: "MEAT", difficulty: "HARD", note: "麻辣鲜香的川菜经典", emoji: "🌶️" },
  { name: "可乐鸡翅", nameEn: "Coca-Cola Chicken Wings", type: "MEAT", difficulty: "EASY", note: "懒人料理，可乐 + 鸡翅 + 酱油", emoji: "🍗" },
  { name: "蒜蓉白切鸡", nameEn: "Poached Chicken with Garlic", type: "MEAT", difficulty: "EASY", note: "清淡健康，广东家常", emoji: "🐔" },
  { name: "辣子鸡", nameEn: "Spicy Chicken", type: "MEAT", difficulty: "MEDIUM", note: "鸡块炸过 + 大量干辣椒花椒", emoji: "🔥" },
  { name: "孜然羊肉", nameEn: "Cumin Lamb", type: "MEAT", difficulty: "EASY", note: "羊肉 + 孜然 + 辣椒，西北风味", emoji: "🐑" },
  { name: "红烧排骨", nameEn: "Braised Spare Ribs", type: "MEAT", difficulty: "MEDIUM", note: "排骨 + 冰糖 + 酱油，软烂入味", emoji: "🍖" },
  { name: "土豆烧牛肉", nameEn: "Beef with Potatoes", type: "MEAT", difficulty: "EASY", note: "家常炖菜，牛肉 + 土豆 + 胡萝卜", emoji: "🥔" },
  { name: "京酱肉丝", nameEn: "Beijing Shredded Pork", type: "MEAT", difficulty: "EASY", note: "肉丝 + 甜面酱 + 豆皮卷葱", emoji: "🥯" },
  { name: "黑椒牛柳", nameEn: "Black Pepper Beef", type: "MEAT", difficulty: "EASY", note: "牛柳 + 洋葱 + 黑椒酱", emoji: "🥩" },
  { name: "酱爆虾仁", nameEn: "Shrimp in Soy Sauce", type: "MEAT", difficulty: "EASY", note: "虾仁 + 豆瓣 + 葱姜", emoji: "🦐" },
  { name: "梅菜扣肉", nameEn: "Preserved Vegetable Pork Belly", type: "MEAT", difficulty: "HARD", note: "客家经典，五花肉 + 梅干菜", emoji: "🥘" },
  { name: "番茄牛腩", nameEn: "Tomato Beef Brisket", type: "MEAT", difficulty: "MEDIUM", note: "牛腩 + 番茄，酸香开胃", emoji: "🍅" },
  { name: "红烧鱼", nameEn: "Braised Fish", type: "MEAT", difficulty: "MEDIUM", note: "整条鱼 + 葱姜蒜 + 酱油", emoji: "🐟" },

  // ════════════════════════════════════════
  // 素菜 VEGGIE
  // ════════════════════════════════════════
  { name: "蒜蓉空心菜", nameEn: "Water Spinach with Garlic", type: "VEGGIE", difficulty: "EASY", note: "大火快炒，蒜香四溢", emoji: "🥬" },
  { name: "清炒时蔬", nameEn: "Stir-fried Seasonal Greens", type: "VEGGIE", difficulty: "EASY", note: "青菜 + 蒜末，简单健康", emoji: "🌿" },
  { name: "干煸四季豆", nameEn: "Dry-fried Green Beans", type: "VEGGIE", difficulty: "MEDIUM", note: "四季豆炸过 + 肉末 + 辣椒", emoji: "🫛" },
  { name: "地三鲜", nameEn: "Three Treasures of Earth", type: "VEGGIE", difficulty: "MEDIUM", note: "茄子 + 土豆 + 青椒，东北家常", emoji: "🍆" },
  { name: "番茄炒蛋", nameEn: "Tomato Scrambled Egg", type: "VEGGIE", difficulty: "EASY", note: "国民菜，番茄 + 鸡蛋", emoji: "🍅" },
  { name: "醋溜土豆丝", nameEn: "Sour Shredded Potato", type: "VEGGIE", difficulty: "EASY", note: "土豆切细丝 + 醋 + 辣椒", emoji: "🥔" },
  { name: "凉拌黄瓜", nameEn: "Smashed Cucumber Salad", type: "VEGGIE", difficulty: "EASY", note: "黄瓜拍碎 + 蒜 + 醋 + 香油", emoji: "🥒" },
  { name: "蒜泥茄子", nameEn: "Garlic Eggplant", type: "VEGGIE", difficulty: "EASY", note: "蒸茄子 + 蒜泥酱油", emoji: "🍆" },
  { name: "蚝油生菜", nameEn: "Oyster Sauce Lettuce", type: "VEGGIE", difficulty: "EASY", note: "生菜烫熟 + 蚝油", emoji: "🥬" },
  { name: "虎皮青椒", nameEn: "Tiger Skin Green Peppers", type: "VEGGIE", difficulty: "EASY", note: "青椒煎到起虎皮 + 醋酱油", emoji: "🫑" },
  { name: "麻婆豆腐", nameEn: "Mapo Tofu", type: "VEGGIE", difficulty: "MEDIUM", note: "嫩豆腐 + 豆瓣酱 + 花椒", emoji: "🌶️" },
  { name: "开水白菜", nameEn: "Boiled Cabbage in Consomme", type: "VEGGIE", difficulty: "HARD", note: "国宴名菜，清汤底的白菜", emoji: "🥬" },
  { name: "家常豆腐", nameEn: "Home-style Tofu", type: "VEGGIE", difficulty: "EASY", note: "豆腐煎过 + 酱汁 + 青椒", emoji: "🍛" },
  { name: "西红柿烧茄子", nameEn: "Tomato with Eggplant", type: "VEGGIE", difficulty: "EASY", note: "番茄 + 茄子 + 蒜，软烂鲜甜", emoji: "🍅" },
  { name: "上汤娃娃菜", nameEn: "Baby Bok Choy in Broth", type: "VEGGIE", difficulty: "EASY", note: "娃娃菜 + 皮蛋 + 咸蛋黄", emoji: "🥬" },
  { name: "蚝油菜心", nameEn: "Oyster Sauce Choy Sum", type: "VEGGIE", difficulty: "EASY", note: "菜心烫熟 + 蚝油蒜蓉", emoji: "🌿" },
  { name: "清炒荷兰豆", nameEn: "Stir-fried Snow Peas", type: "VEGGIE", difficulty: "EASY", note: "荷兰豆 + 蒜，清脆爽口", emoji: "🫛" },
  { name: "油焖茄子", nameEn: "Braised Eggplant", type: "VEGGIE", difficulty: "EASY", note: "茄子 + 蒜末 + 酱油", emoji: "🍆" },
];
