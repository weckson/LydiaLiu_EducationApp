// 中餐家常菜 - 第二批大扩充
//
// 覆盖：
// - 八大菜系（川鲁粤苏闽浙湘徽）经典菜
// - 各主料（猪牛羊鸡鸭鱼虾蛋豆腐青菜）
// - 家常 + 略进阶
//
// 目标：让"今晚做什么"有几百种选择，基本一年不重样

import type { DishSeed } from "./dishes";

export const DISHES_V2: DishSeed[] = [
  // ════════════════════════════════════════════════════════
  // 猪肉类 PORK
  // ════════════════════════════════════════════════════════
  { name: "东坡肉", nameEn: "Dongpo Pork", type: "MEAT", difficulty: "HARD", note: "杭州名菜，五花肉慢炖 2 小时", emoji: "🥘" },
  { name: "粉蒸肉", nameEn: "Steamed Pork with Rice Flour", type: "MEAT", difficulty: "MEDIUM", note: "五花肉裹米粉蒸，软糯入味", emoji: "🍚" },
  { name: "锅包肉", nameEn: "Northeastern Sweet-Sour Pork", type: "MEAT", difficulty: "MEDIUM", note: "东北经典，里脊挂糊炸后浇糖醋汁", emoji: "🥓" },
  { name: "咕咾肉", nameEn: "Sweet and Sour Pork Hong Kong Style", type: "MEAT", difficulty: "MEDIUM", note: "港式糖醋肉，配菠萝", emoji: "🍍" },
  { name: "糖醋排骨", nameEn: "Sweet and Sour Spare Ribs", type: "MEAT", difficulty: "MEDIUM", note: "经典开胃菜，老少皆宜", emoji: "🍖" },
  { name: "豉汁蒸排骨", nameEn: "Steamed Ribs with Black Bean Sauce", type: "MEAT", difficulty: "EASY", note: "粤式早茶经典", emoji: "🥟" },
  { name: "蒜蓉粉丝排骨", nameEn: "Spare Ribs with Garlic Vermicelli", type: "MEAT", difficulty: "EASY", note: "蒸的菜，鲜香", emoji: "🍲" },
  { name: "无锡排骨", nameEn: "Wuxi Ribs", type: "MEAT", difficulty: "MEDIUM", note: "甜口排骨，江浙名菜", emoji: "🍖" },
  { name: "叉烧肉", nameEn: "Cantonese BBQ Pork", type: "MEAT", difficulty: "MEDIUM", note: "广式腌烤猪肉", emoji: "🍖" },
  { name: "蒜泥白肉", nameEn: "Garlic Pork Slices", type: "MEAT", difficulty: "EASY", note: "冷盘，川味蘸料", emoji: "🌶️" },
  { name: "蒜苔炒肉丝", nameEn: "Pork with Garlic Stem", type: "MEAT", difficulty: "EASY", note: "家常快炒", emoji: "🥢" },
  { name: "青椒炒肉丝", nameEn: "Pork with Green Peppers", type: "MEAT", difficulty: "EASY", note: "国民菜，下饭神器", emoji: "🫑" },
  { name: "尖椒肉丝", nameEn: "Pork with Sharp Peppers", type: "MEAT", difficulty: "EASY", note: "略辣，开胃", emoji: "🌶️" },
  { name: "芹菜炒肉丝", nameEn: "Pork with Celery", type: "MEAT", difficulty: "EASY", note: "清爽家常菜", emoji: "🌿" },
  { name: "榨菜肉丝", nameEn: "Pork with Pickled Mustard", type: "MEAT", difficulty: "EASY", note: "榨菜的鲜咸配肉丝", emoji: "🥢" },
  { name: "酸菜肉丝", nameEn: "Pork with Pickled Cabbage", type: "MEAT", difficulty: "EASY", note: "开胃下饭", emoji: "🥬" },
  { name: "豆角炒肉", nameEn: "Pork with Green Beans", type: "MEAT", difficulty: "EASY", note: "家常搭配", emoji: "🫘" },
  { name: "湖南小炒肉", nameEn: "Hunan Stir-fried Pork", type: "MEAT", difficulty: "EASY", note: "辣椒猛炒五花肉", emoji: "🌶️" },
  { name: "辣椒炒肉", nameEn: "Pepper Pork Stir-fry", type: "MEAT", difficulty: "EASY", note: "湘菜家常", emoji: "🔥" },
  { name: "肉末茄子", nameEn: "Eggplant with Minced Pork", type: "MEAT", difficulty: "EASY", note: "下饭经典", emoji: "🍆" },
  { name: "肉末烧豆腐", nameEn: "Tofu with Minced Pork", type: "MEAT", difficulty: "EASY", note: "豆腐吸汁鲜香", emoji: "🍲" },
  { name: "孜然炒肉", nameEn: "Cumin Pork", type: "MEAT", difficulty: "EASY", note: "西北风味", emoji: "🌶️" },
  { name: "蒜蓉粉丝娃娃菜", nameEn: "Baby Cabbage with Garlic Vermicelli", type: "MEAT", difficulty: "EASY", note: "蒸菜，易上手", emoji: "🥬" },
  { name: "辣白菜炒五花", nameEn: "Kimchi with Pork Belly", type: "MEAT", difficulty: "EASY", note: "韩式融合", emoji: "🌶️" },
  { name: "水煮肉片", nameEn: "Sichuan Boiled Pork Slices", type: "MEAT", difficulty: "HARD", note: "麻辣鲜香，川菜代表", emoji: "🔥" },
  { name: "腊肉炒菜薹", nameEn: "Cured Pork with Choy Sum", type: "MEAT", difficulty: "EASY", note: "湖北经典", emoji: "🥓" },
  { name: "小炒肉", nameEn: "Stir-fried Pork", type: "MEAT", difficulty: "EASY", note: "家常小炒，百搭", emoji: "🥢" },
  { name: "咸烧白", nameEn: "Salty Steamed Pork", type: "MEAT", difficulty: "HARD", note: "川菜九大碗之一", emoji: "🍚" },
  { name: "甜烧白", nameEn: "Sweet Steamed Pork", type: "MEAT", difficulty: "HARD", note: "红豆沙甜味蒸肉", emoji: "🍡" },

  // ════════════════════════════════════════════════════════
  // 鸡肉类 CHICKEN
  // ════════════════════════════════════════════════════════
  { name: "三杯鸡", nameEn: "Three Cup Chicken", type: "MEAT", difficulty: "EASY", note: "台式名菜，一杯酱油 + 一杯麻油 + 一杯米酒", emoji: "🐔" },
  { name: "口水鸡", nameEn: "Mouthwatering Chicken", type: "MEAT", difficulty: "MEDIUM", note: "川菜凉菜，麻辣酱汁", emoji: "🌶️" },
  { name: "盐焗鸡", nameEn: "Salt-baked Chicken", type: "MEAT", difficulty: "MEDIUM", note: "客家经典，咸香入味", emoji: "🧂" },
  { name: "叫花鸡", nameEn: "Beggar's Chicken", type: "MEAT", difficulty: "HARD", note: "荷叶泥巴包裹烤制", emoji: "🍗" },
  { name: "黄焖鸡", nameEn: "Yellow Braised Chicken", type: "MEAT", difficulty: "EASY", note: "山东经典，配米饭", emoji: "🍲" },
  { name: "大盘鸡", nameEn: "Xinjiang Big Plate Chicken", type: "MEAT", difficulty: "MEDIUM", note: "新疆名菜，配皮带面", emoji: "🍛" },
  { name: "左宗棠鸡", nameEn: "General Tso's Chicken", type: "MEAT", difficulty: "MEDIUM", note: "湘菜，炸鸡配甜辣酱", emoji: "🍗" },
  { name: "啤酒鸡", nameEn: "Beer Chicken", type: "MEAT", difficulty: "EASY", note: "啤酒炖出的香浓鸡肉", emoji: "🍺" },
  { name: "手撕鸡", nameEn: "Hand-shredded Chicken", type: "MEAT", difficulty: "EASY", note: "拌汁凉菜", emoji: "🌿" },
  { name: "豆豉蒸鸡", nameEn: "Chicken with Black Bean Sauce", type: "MEAT", difficulty: "EASY", note: "蒸菜，豆豉香", emoji: "🥢" },
  { name: "清蒸鸡", nameEn: "Steamed Chicken", type: "MEAT", difficulty: "EASY", note: "最原汁原味", emoji: "🐔" },
  { name: "香菇蒸鸡", nameEn: "Chicken with Shiitake", type: "MEAT", difficulty: "EASY", note: "蒸菜，鲜美", emoji: "🍄" },
  { name: "棒棒鸡", nameEn: "Bang Bang Chicken", type: "MEAT", difficulty: "EASY", note: "川菜凉拌，芝麻酱底", emoji: "🌰" },
  { name: "椒麻鸡", nameEn: "Peppercorn Chicken", type: "MEAT", difficulty: "EASY", note: "花椒 + 青葱的凉拌", emoji: "🌶️" },
  { name: "葱油鸡", nameEn: "Scallion Oil Chicken", type: "MEAT", difficulty: "EASY", note: "简单又美味", emoji: "🌱" },
  { name: "咖喱鸡", nameEn: "Curry Chicken", type: "MEAT", difficulty: "EASY", note: "配米饭或面条", emoji: "🍛" },
  { name: "蜜汁鸡翅", nameEn: "Honey Chicken Wings", type: "MEAT", difficulty: "EASY", note: "甜味鸡翅，小朋友最爱", emoji: "🍯" },
  { name: "黑椒鸡翅", nameEn: "Black Pepper Chicken Wings", type: "MEAT", difficulty: "EASY", note: "煎烤风味", emoji: "🌶️" },
  { name: "红烧鸡腿", nameEn: "Braised Chicken Legs", type: "MEAT", difficulty: "EASY", note: "家常风味", emoji: "🍗" },
  { name: "干锅鸡", nameEn: "Dry Pot Chicken", type: "MEAT", difficulty: "MEDIUM", note: "湘菜，爆辣可口", emoji: "🔥" },
  { name: "鸡公煲", nameEn: "Chicken Hotpot", type: "MEAT", difficulty: "MEDIUM", note: "重庆风味，半汤菜", emoji: "🍲" },
  { name: "荷叶蒸鸡", nameEn: "Lotus Leaf Steamed Chicken", type: "MEAT", difficulty: "MEDIUM", note: "荷叶清香", emoji: "🌿" },
  { name: "酱鸡腿", nameEn: "Soy Sauce Chicken", type: "MEAT", difficulty: "EASY", note: "浓郁酱香", emoji: "🐔" },
  { name: "香菇炒鸡", nameEn: "Chicken with Mushrooms", type: "MEAT", difficulty: "EASY", note: "滑炒鲜嫩", emoji: "🍄" },
  { name: "清炖鸡汤", nameEn: "Clear Chicken Soup", type: "MEAT", difficulty: "EASY", note: "滋补家常汤", emoji: "🍜" },
  { name: "花菇炖鸡", nameEn: "Chicken with Dried Mushrooms", type: "MEAT", difficulty: "EASY", note: "广式老火汤", emoji: "🍲" },

  // ════════════════════════════════════════════════════════
  // 牛肉类 BEEF
  // ════════════════════════════════════════════════════════
  { name: "孜然牛肉", nameEn: "Cumin Beef", type: "MEAT", difficulty: "EASY", note: "西北风味，下饭", emoji: "🥩" },
  { name: "酸汤肥牛", nameEn: "Beef in Sour Soup", type: "MEAT", difficulty: "MEDIUM", note: "金针菇打底，酸辣开胃", emoji: "🍲" },
  { name: "蚝油牛肉", nameEn: "Beef with Oyster Sauce", type: "MEAT", difficulty: "EASY", note: "滑嫩咸香", emoji: "🥩" },
  { name: "铁板牛柳", nameEn: "Sizzling Beef", type: "MEAT", difficulty: "MEDIUM", note: "洋葱打底，铁板爆响", emoji: "🍳" },
  { name: "葱爆牛肉", nameEn: "Beef with Scallion", type: "MEAT", difficulty: "EASY", note: "北方家常", emoji: "🌱" },
  { name: "红烧牛腩", nameEn: "Braised Beef Brisket", type: "MEAT", difficulty: "MEDIUM", note: "炖煮软烂", emoji: "🥘" },
  { name: "咖喱牛肉", nameEn: "Curry Beef", type: "MEAT", difficulty: "EASY", note: "配米饭或面包", emoji: "🍛" },
  { name: "卤牛肉", nameEn: "Braised Soy Beef", type: "MEAT", difficulty: "MEDIUM", note: "冷盘，切片食用", emoji: "🥩" },
  { name: "清炖牛肉", nameEn: "Clear-stewed Beef", type: "MEAT", difficulty: "EASY", note: "萝卜或土豆炖", emoji: "🥕" },
  { name: "夫妻肺片", nameEn: "Husband and Wife Beef Offal", type: "MEAT", difficulty: "HARD", note: "川菜凉菜经典", emoji: "🌶️" },
  { name: "尖椒牛柳", nameEn: "Beef with Sharp Peppers", type: "MEAT", difficulty: "EASY", note: "下饭菜", emoji: "🫑" },
  { name: "芹菜炒牛肉", nameEn: "Beef with Celery", type: "MEAT", difficulty: "EASY", note: "清爽家常", emoji: "🌿" },
  { name: "水煮肥牛", nameEn: "Boiled Beef in Chili Oil", type: "MEAT", difficulty: "HARD", note: "川味麻辣", emoji: "🔥" },

  // ════════════════════════════════════════════════════════
  // 羊肉类 LAMB
  // ════════════════════════════════════════════════════════
  { name: "葱爆羊肉", nameEn: "Lamb with Scallion", type: "MEAT", difficulty: "EASY", note: "北方家常", emoji: "🐑" },
  { name: "红烧羊肉", nameEn: "Braised Lamb", type: "MEAT", difficulty: "MEDIUM", note: "冬日暖身菜", emoji: "🥘" },
  { name: "羊肉串", nameEn: "Lamb Skewers", type: "MEAT", difficulty: "EASY", note: "新疆夜市经典", emoji: "🍢" },
  { name: "手抓羊肉", nameEn: "Hand-held Lamb", type: "MEAT", difficulty: "EASY", note: "清水煮羊肉，蘸盐", emoji: "🐑" },
  { name: "羊肉萝卜汤", nameEn: "Lamb and Radish Soup", type: "MEAT", difficulty: "EASY", note: "冬季滋补", emoji: "🍲" },
  { name: "羊肉泡馍", nameEn: "Shaanxi Lamb Soup with Bread", type: "MEAT", difficulty: "MEDIUM", note: "陕西经典", emoji: "🍜" },

  // ════════════════════════════════════════════════════════
  // 海鲜类 SEAFOOD
  // ════════════════════════════════════════════════════════
  { name: "清蒸鲈鱼", nameEn: "Steamed Sea Bass", type: "MEAT", difficulty: "EASY", note: "粤式经典，最考新鲜度", emoji: "🐟" },
  { name: "糖醋鲤鱼", nameEn: "Sweet and Sour Carp", type: "MEAT", difficulty: "HARD", note: "山东名菜，造型漂亮", emoji: "🐟" },
  { name: "剁椒鱼头", nameEn: "Fish Head with Chopped Peppers", type: "MEAT", difficulty: "MEDIUM", note: "湘菜经典", emoji: "🌶️" },
  { name: "水煮鱼", nameEn: "Boiled Fish in Chili Oil", type: "MEAT", difficulty: "HARD", note: "川菜火辣代表", emoji: "🔥" },
  { name: "酸菜鱼", nameEn: "Sauerkraut Fish", type: "MEAT", difficulty: "MEDIUM", note: "酸辣开胃", emoji: "🐟" },
  { name: "油焖大虾", nameEn: "Oil-braised Prawns", type: "MEAT", difficulty: "EASY", note: "鲁菜经典", emoji: "🦐" },
  { name: "白灼虾", nameEn: "Poached Prawns", type: "MEAT", difficulty: "EASY", note: "粤式，蘸蒜醋", emoji: "🦐" },
  { name: "椒盐虾", nameEn: "Salt and Pepper Prawns", type: "MEAT", difficulty: "EASY", note: "粤菜，带壳吃", emoji: "🦐" },
  { name: "咖喱虾", nameEn: "Curry Prawns", type: "MEAT", difficulty: "EASY", note: "东南亚风味", emoji: "🍛" },
  { name: "蒜蓉蒸虾", nameEn: "Garlic Steamed Prawns", type: "MEAT", difficulty: "EASY", note: "粉丝底蒸", emoji: "🦐" },
  { name: "避风塘炒蟹", nameEn: "Typhoon Shelter Crab", type: "MEAT", difficulty: "HARD", note: "港式，蒜蓉爆炒", emoji: "🦀" },
  { name: "麻辣小龙虾", nameEn: "Spicy Crayfish", type: "MEAT", difficulty: "MEDIUM", note: "夏日必吃", emoji: "🦐" },
  { name: "辣炒蛤蜊", nameEn: "Spicy Clams", type: "MEAT", difficulty: "EASY", note: "鲁菜家常", emoji: "🐚" },
  { name: "葱烧海参", nameEn: "Braised Sea Cucumber with Scallion", type: "MEAT", difficulty: "HARD", note: "鲁菜名菜", emoji: "🍲" },
  { name: "豉汁蒸扇贝", nameEn: "Steamed Scallops with Black Bean", type: "MEAT", difficulty: "EASY", note: "粤式蒸菜", emoji: "🐚" },

  // ════════════════════════════════════════════════════════
  // 鸭肉类 DUCK
  // ════════════════════════════════════════════════════════
  { name: "啤酒鸭", nameEn: "Beer Duck", type: "MEAT", difficulty: "EASY", note: "川湘家常", emoji: "🦆" },
  { name: "酸萝卜老鸭汤", nameEn: "Duck Soup with Pickled Radish", type: "MEAT", difficulty: "EASY", note: "重庆名汤", emoji: "🍲" },
  { name: "板栗烧鸭", nameEn: "Braised Duck with Chestnuts", type: "MEAT", difficulty: "MEDIUM", note: "秋冬滋补", emoji: "🌰" },
  { name: "盐水鸭", nameEn: "Nanjing Salted Duck", type: "MEAT", difficulty: "MEDIUM", note: "南京名菜", emoji: "🦆" },
  { name: "茶树菇烧鸭", nameEn: "Duck with Tea Tree Mushrooms", type: "MEAT", difficulty: "EASY", note: "鲜香下饭", emoji: "🍄" },

  // ════════════════════════════════════════════════════════
  // 蛋类 EGGS (归为荤)
  // ════════════════════════════════════════════════════════
  { name: "韭菜炒蛋", nameEn: "Chives with Egg", type: "MEAT", difficulty: "EASY", note: "快手家常", emoji: "🥚" },
  { name: "虾仁炒蛋", nameEn: "Shrimp with Egg", type: "MEAT", difficulty: "EASY", note: "嫩滑鲜美", emoji: "🦐" },
  { name: "青椒炒蛋", nameEn: "Green Pepper with Egg", type: "MEAT", difficulty: "EASY", note: "快手家常菜", emoji: "🫑" },
  { name: "蒸水蛋", nameEn: "Chinese Steamed Egg Custard", type: "MEAT", difficulty: "EASY", note: "滑嫩如豆腐", emoji: "🥚" },
  { name: "茶叶蛋", nameEn: "Tea Eggs", type: "MEAT", difficulty: "EASY", note: "卤蛋的一种", emoji: "🥚" },
  { name: "卤蛋", nameEn: "Braised Egg", type: "MEAT", difficulty: "EASY", note: "酱油卤煮", emoji: "🥚" },
  { name: "皮蛋豆腐", nameEn: "Century Egg with Tofu", type: "MEAT", difficulty: "EASY", note: "凉拌冷盘", emoji: "🥚" },
  { name: "蒜苔炒鸡蛋", nameEn: "Garlic Stem with Egg", type: "MEAT", difficulty: "EASY", note: "清爽快手", emoji: "🥚" },

  // ════════════════════════════════════════════════════════
  // 青菜类（绿叶菜）
  // ════════════════════════════════════════════════════════
  { name: "清炒菠菜", nameEn: "Stir-fried Spinach", type: "VEGGIE", difficulty: "EASY", note: "简单蒜炒", emoji: "🌿" },
  { name: "蒜蓉油麦菜", nameEn: "Garlic Yau Mak", type: "VEGGIE", difficulty: "EASY", note: "粤式家常", emoji: "🥬" },
  { name: "白灼芥蓝", nameEn: "Blanched Gai Lan", type: "VEGGIE", difficulty: "EASY", note: "蚝油蒜蓉底", emoji: "🥬" },
  { name: "清炒豆苗", nameEn: "Stir-fried Pea Shoots", type: "VEGGIE", difficulty: "EASY", note: "春季嫩菜", emoji: "🌱" },
  { name: "蚝油白菜", nameEn: "Cabbage with Oyster Sauce", type: "VEGGIE", difficulty: "EASY", note: "快手下饭", emoji: "🥬" },
  { name: "醋溜白菜", nameEn: "Sour Cabbage Stir-fry", type: "VEGGIE", difficulty: "EASY", note: "开胃爽口", emoji: "🥬" },
  { name: "手撕包菜", nameEn: "Hand-torn Cabbage", type: "VEGGIE", difficulty: "EASY", note: "火候大的干煸", emoji: "🥬" },
  { name: "上汤菠菜", nameEn: "Spinach in Supreme Soup", type: "VEGGIE", difficulty: "EASY", note: "配皮蛋咸蛋", emoji: "🍲" },
  { name: "凉拌莴笋", nameEn: "Cold Lettuce Stem", type: "VEGGIE", difficulty: "EASY", note: "清爽小菜", emoji: "🥗" },
  { name: "蒜蓉茼蒿", nameEn: "Garlic Chrysanthemum Greens", type: "VEGGIE", difficulty: "EASY", note: "冬日暖胃", emoji: "🌿" },

  // ════════════════════════════════════════════════════════
  // 瓜果根茎类
  // ════════════════════════════════════════════════════════
  { name: "酸辣土豆丝", nameEn: "Sour Spicy Potato Strips", type: "VEGGIE", difficulty: "EASY", note: "国民小菜", emoji: "🥔" },
  { name: "拍黄瓜", nameEn: "Smashed Cucumber", type: "VEGGIE", difficulty: "EASY", note: "凉拌蒜醋", emoji: "🥒" },
  { name: "红烧冬瓜", nameEn: "Braised Winter Melon", type: "VEGGIE", difficulty: "EASY", note: "家常素菜", emoji: "🍈" },
  { name: "红烧萝卜", nameEn: "Braised White Radish", type: "VEGGIE", difficulty: "EASY", note: "入味软烂", emoji: "🥕" },
  { name: "干锅花菜", nameEn: "Dry Pot Cauliflower", type: "VEGGIE", difficulty: "MEDIUM", note: "湘菜，略干煸", emoji: "🥦" },
  { name: "白灼菜花", nameEn: "Blanched Cauliflower", type: "VEGGIE", difficulty: "EASY", note: "清淡健康", emoji: "🥦" },
  { name: "凉拌苦瓜", nameEn: "Cold Bitter Melon", type: "VEGGIE", difficulty: "EASY", note: "清火消暑", emoji: "🥒" },
  { name: "糖醋南瓜", nameEn: "Sweet and Sour Pumpkin", type: "VEGGIE", difficulty: "EASY", note: "秋日当季", emoji: "🎃" },
  { name: "南瓜饼", nameEn: "Pumpkin Pancake", type: "VEGGIE", difficulty: "EASY", note: "甜点般的素菜", emoji: "🥮" },
  { name: "番茄炖萝卜", nameEn: "Tomato with Radish", type: "VEGGIE", difficulty: "EASY", note: "清汤暖胃", emoji: "🍅" },
  { name: "素炒三丝", nameEn: "Stir-fried Three Strips", type: "VEGGIE", difficulty: "EASY", note: "胡萝卜 + 土豆 + 青椒", emoji: "🥕" },

  // ════════════════════════════════════════════════════════
  // 豆腐/豆制品
  // ════════════════════════════════════════════════════════
  { name: "煎豆腐", nameEn: "Pan-fried Tofu", type: "VEGGIE", difficulty: "EASY", note: "外焦里嫩", emoji: "🍛" },
  { name: "红烧豆腐", nameEn: "Braised Tofu", type: "VEGGIE", difficulty: "EASY", note: "家常百搭", emoji: "🍲" },
  { name: "铁板豆腐", nameEn: "Sizzling Tofu", type: "VEGGIE", difficulty: "EASY", note: "铁板带汁", emoji: "🍳" },
  { name: "香煎豆腐", nameEn: "Pan-seared Tofu", type: "VEGGIE", difficulty: "EASY", note: "简单素菜", emoji: "🥢" },
  { name: "凉拌豆腐", nameEn: "Cold Tofu Salad", type: "VEGGIE", difficulty: "EASY", note: "配葱花酱油", emoji: "🌿" },
  { name: "白菜豆腐汤", nameEn: "Cabbage Tofu Soup", type: "VEGGIE", difficulty: "EASY", note: "清淡暖胃", emoji: "🍲" },
  { name: "客家酿豆腐", nameEn: "Hakka Stuffed Tofu", type: "VEGGIE", difficulty: "MEDIUM", note: "客家名菜", emoji: "🥘" },
  { name: "香辣豆干", nameEn: "Spicy Dried Tofu", type: "VEGGIE", difficulty: "EASY", note: "小炒下饭", emoji: "🌶️" },
  { name: "豆皮炒豆芽", nameEn: "Tofu Skin with Bean Sprouts", type: "VEGGIE", difficulty: "EASY", note: "简单快手", emoji: "🌿" },
  { name: "豆腐炖鱼", nameEn: "Tofu Fish Soup", type: "VEGGIE", difficulty: "EASY", note: "汤菜鲜美", emoji: "🍲" },

  // ════════════════════════════════════════════════════════
  // 菇类
  // ════════════════════════════════════════════════════════
  { name: "蚝油蘑菇", nameEn: "Mushrooms with Oyster Sauce", type: "VEGGIE", difficulty: "EASY", note: "鲜香下饭", emoji: "🍄" },
  { name: "凉拌金针菇", nameEn: "Cold Enoki Mushrooms", type: "VEGGIE", difficulty: "EASY", note: "清爽凉菜", emoji: "🍄" },
  { name: "清炒口蘑", nameEn: "Stir-fried Button Mushrooms", type: "VEGGIE", difficulty: "EASY", note: "简单家常", emoji: "🍄" },
  { name: "双菇青菜", nameEn: "Greens with Two Mushrooms", type: "VEGGIE", difficulty: "EASY", note: "素菜搭配", emoji: "🥬" },
  { name: "素烧三鲜", nameEn: "Three Treasures Stir-fry", type: "VEGGIE", difficulty: "EASY", note: "多种菇 + 青菜", emoji: "🌿" },
  { name: "蒜蓉蒸金针菇", nameEn: "Steamed Enoki with Garlic", type: "VEGGIE", difficulty: "EASY", note: "蒸菜，鲜美", emoji: "🍄" },

  // ════════════════════════════════════════════════════════
  // 其他素菜
  // ════════════════════════════════════════════════════════
  { name: "素炒豆芽", nameEn: "Stir-fried Bean Sprouts", type: "VEGGIE", difficulty: "EASY", note: "快手家常", emoji: "🌱" },
  { name: "凉拌海带丝", nameEn: "Cold Seaweed Strips", type: "VEGGIE", difficulty: "EASY", note: "爽口开胃", emoji: "🌿" },
  { name: "凉拌粉丝", nameEn: "Cold Vermicelli", type: "VEGGIE", difficulty: "EASY", note: "酸辣开胃", emoji: "🥢" },
  { name: "木耳炒山药", nameEn: "Wood Ear with Yam", type: "VEGGIE", difficulty: "EASY", note: "滑嫩健康", emoji: "🍄" },
  { name: "凉拌木耳", nameEn: "Cold Wood Ear Salad", type: "VEGGIE", difficulty: "EASY", note: "清爽凉菜", emoji: "🌿" },
  { name: "胡萝卜炒木耳", nameEn: "Carrot with Wood Ear", type: "VEGGIE", difficulty: "EASY", note: "色彩搭配", emoji: "🥕" },
  { name: "素三鲜", nameEn: "Vegetarian Three Delights", type: "VEGGIE", difficulty: "EASY", note: "多种素菜搭配", emoji: "🥦" },
  { name: "韭菜炒豆芽", nameEn: "Chives with Bean Sprouts", type: "VEGGIE", difficulty: "EASY", note: "清爽家常", emoji: "🌱" },
  { name: "丝瓜炒蛋", nameEn: "Loofah with Egg", type: "VEGGIE", difficulty: "EASY", note: "半素半荤", emoji: "🥒" },
  { name: "西葫芦炒蛋", nameEn: "Zucchini with Egg", type: "VEGGIE", difficulty: "EASY", note: "快手早餐也可", emoji: "🥚" },
  { name: "黄瓜炒蛋", nameEn: "Cucumber with Egg", type: "VEGGIE", difficulty: "EASY", note: "夏日清爽", emoji: "🥒" },
  { name: "韭菜饼", nameEn: "Chinese Chive Pancake", type: "VEGGIE", difficulty: "MEDIUM", note: "北方面食", emoji: "🥞" },
  { name: "素炒莲藕", nameEn: "Stir-fried Lotus Root", type: "VEGGIE", difficulty: "EASY", note: "脆爽清淡", emoji: "🌸" },
  { name: "凉拌莲藕", nameEn: "Cold Lotus Root", type: "VEGGIE", difficulty: "EASY", note: "酸辣开胃", emoji: "🌸" },
  { name: "素春卷", nameEn: "Vegetable Spring Rolls", type: "VEGGIE", difficulty: "MEDIUM", note: "炸制酥脆", emoji: "🌯" },
  { name: "麻辣凉皮", nameEn: "Cold Noodles in Chili Sauce", type: "VEGGIE", difficulty: "EASY", note: "陕西小吃", emoji: "🍜" },
  { name: "芹菜拌花生", nameEn: "Celery with Peanuts", type: "VEGGIE", difficulty: "EASY", note: "凉拌下酒", emoji: "🥜" },
  { name: "拌香干", nameEn: "Cold Dried Tofu Salad", type: "VEGGIE", difficulty: "EASY", note: "配芹菜或青椒", emoji: "🥢" },
  { name: "素烧麦", nameEn: "Vegetable Shumai", type: "VEGGIE", difficulty: "MEDIUM", note: "糯米素馅蒸饺", emoji: "🥟" },
  { name: "酸辣蕨根粉", nameEn: "Sour Spicy Fern Root Noodles", type: "VEGGIE", difficulty: "EASY", note: "凉拌开胃", emoji: "🥢" },
];
