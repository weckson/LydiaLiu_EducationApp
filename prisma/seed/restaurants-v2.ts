// 悉尼餐厅 - 第二批扩充
// 大幅加入中餐各大菜系 + 其他菜系

import type { RestaurantSeed } from "./restaurants";

export const RESTAURANTS_V2: RestaurantSeed[] = [
  // ══════════════════════════════════════════════════════════
  // 粤菜 Cantonese （加大量）
  // ══════════════════════════════════════════════════════════
  { name: "Mr. Wong 王先生", cuisine: "粤菜", suburb: "CBD", priceLevel: 4, note: "现代粤菜 fine dining，Merivale 集团", emoji: "🦆" },
  { name: "Double Lucky 双喜", cuisine: "粤菜", suburb: "CBD", priceLevel: 3, note: "经典港式烧味 + 糖醋咕咾肉", emoji: "🍖" },
  { name: "Royal Dragon 龙皇轩", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 3, note: "广式早茶点心名店", emoji: "🥟" },
  { name: "Silver Phoenix 银凤楼", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 3, note: "港式烧腊和海鲜", emoji: "🐟" },
  { name: "BBQ King 烧腊大王", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 2, note: "经典烧腊饭", emoji: "🍗" },
  { name: "Phoenix 凤城酒家", cuisine: "粤菜", suburb: "CBD", priceLevel: 3, note: "传统广式海鲜酒楼", emoji: "🦞" },

  // ══════════════════════════════════════════════════════════
  // 川菜 Sichuan（加大量）
  // ══════════════════════════════════════════════════════════
  { name: "Spice Temple 香料殿堂", cuisine: "川菜", suburb: "CBD", priceLevel: 4, note: "Neil Perry 川湘滇粤融合 fine dining", emoji: "🌶️" },
  { name: "Chefs Gallery 名厨坊", cuisine: "川菜", suburb: "CBD", priceLevel: 2, note: "现代川菜 + 手工面条表演", emoji: "🍜" },
  { name: "Chongqing Hotpot 重庆小天鹅", cuisine: "川菜", suburb: "Chatswood", priceLevel: 3, note: "正宗川味麻辣火锅", emoji: "🔥" },
  { name: "Sichuan Folk 川菜民间", cuisine: "川菜", suburb: "Ashfield", priceLevel: 2, note: "家常川菜水煮系列", emoji: "🌶️" },
  { name: "Shu Jiu Xiang 蜀九香", cuisine: "川菜", suburb: "Chatswood", priceLevel: 3, note: "成都正宗火锅连锁", emoji: "🔥" },
  { name: "Mala Tang 麻辣烫", cuisine: "川菜", suburb: "Haymarket", priceLevel: 1, note: "自助选菜麻辣烫", emoji: "🌶️" },

  // ══════════════════════════════════════════════════════════
  // 湘菜 Hunan（新）
  // ══════════════════════════════════════════════════════════
  { name: "The Chairman 主席", cuisine: "湘菜", suburb: "Darlinghurst", priceLevel: 3, note: "Mrs Ding 家传湘菜，2008 年开业", emoji: "🌶️" },
  { name: "Hunan Spice 湘辣", cuisine: "湘菜", suburb: "Chatswood", priceLevel: 2, note: "剁椒鱼头和血鸭", emoji: "🐟" },
  { name: "Xiang Cun Cuisine 湘村菜", cuisine: "湘菜", suburb: "Eastwood", priceLevel: 2, note: "农家湘菜", emoji: "🌶️" },

  // ══════════════════════════════════════════════════════════
  // 上海 / 江浙菜（增加）
  // ══════════════════════════════════════════════════════════
  { name: "Shanghai Night 夜上海", cuisine: "上海菜", suburb: "Ashfield", priceLevel: 2, note: "最早的 Ashfield 小笼包店，便宜正宗", emoji: "🥟" },
  { name: "Taste of Shanghai 上海人家", cuisine: "上海菜", suburb: "Burwood", priceLevel: 2, note: "2007 年开业，招牌小笼包和煎包", emoji: "🥟" },
  { name: "Lanzhou Beef Noodle 兰州拉面", cuisine: "西北菜", suburb: "Haymarket", priceLevel: 1, note: "正宗兰州牛肉拉面", emoji: "🍜" },
  { name: "Shanghai Grandma 上海奶奶", cuisine: "上海菜", suburb: "Eastwood", priceLevel: 2, note: "本帮菜红烧肉、醉鸡", emoji: "🍷" },
  { name: "Jiangnan Vila 江南庄园", cuisine: "江浙菜", suburb: "Chatswood", priceLevel: 3, note: "精致淮扬菜和本帮菜", emoji: "🍤" },

  // ══════════════════════════════════════════════════════════
  // 东北菜 / 山东菜（新）
  // ══════════════════════════════════════════════════════════
  { name: "Little Northeast 小东北", cuisine: "东北菜", suburb: "Chatswood", priceLevel: 2, note: "锅包肉、猪肉炖粉条", emoji: "🥟" },
  { name: "Dongbei Renjia 东北人家", cuisine: "东北菜", suburb: "Burwood", priceLevel: 2, note: "大碗菜 + 饺子", emoji: "🥟" },
  { name: "Harbin Dumpling 哈尔滨饺子馆", cuisine: "东北菜", suburb: "Eastwood", priceLevel: 1, note: "手工水饺和煎饺", emoji: "🥟" },
  { name: "Shandong Mama 山东妈妈", cuisine: "山东菜", suburb: "Chatswood", priceLevel: 2, note: "山东手工水饺和煎饼", emoji: "🥟" },

  // ══════════════════════════════════════════════════════════
  // 新疆 / 西北菜（新）
  // ══════════════════════════════════════════════════════════
  { name: "Kiroran Silk Road 丝绸之路", cuisine: "新疆菜", suburb: "Haymarket", priceLevel: 2, note: "正宗维吾尔族大盘鸡", emoji: "🧆" },
  { name: "Xinjiang Flavour 新疆风味", cuisine: "新疆菜", suburb: "Chatswood", priceLevel: 2, note: "羊肉串、手抓饭、拉条子", emoji: "🐑" },
  { name: "Uyghur House 维吾尔之家", cuisine: "新疆菜", suburb: "Ashfield", priceLevel: 2, note: "馕坑烤包子和烤全羊", emoji: "🔥" },

  // ══════════════════════════════════════════════════════════
  // 云南 / 贵州菜（新）
  // ══════════════════════════════════════════════════════════
  { name: "Yunnan Memory 云南印象", cuisine: "云南菜", suburb: "Chatswood", priceLevel: 2, note: "过桥米线和汽锅鸡", emoji: "🍜" },
  { name: "Guizhou Style 贵州味道", cuisine: "贵州菜", suburb: "Haymarket", priceLevel: 2, note: "酸汤鱼和折耳根", emoji: "🐟" },

  // ══════════════════════════════════════════════════════════
  // 北京菜 / 潮汕菜 / 客家菜（新）
  // ══════════════════════════════════════════════════════════
  { name: "Beijing Kaoya 北京烤鸭坊", cuisine: "京菜", suburb: "Burwood", priceLevel: 3, note: "片皮北京烤鸭", emoji: "🦆" },
  { name: "Chaozhou Seafood 潮州海鲜", cuisine: "潮汕菜", suburb: "Haymarket", priceLevel: 3, note: "潮式打冷和卤水拼盘", emoji: "🦐" },
  { name: "Hakka Village 客家村", cuisine: "客家菜", suburb: "Chatswood", priceLevel: 2, note: "梅菜扣肉和盐焗鸡", emoji: "🐔" },

  // ══════════════════════════════════════════════════════════
  // 火锅 / 烧烤 / 麻辣烫（加多）
  // ══════════════════════════════════════════════════════════
  { name: "Memory Tongue Hotpot 忆味火锅", cuisine: "火锅", suburb: "Chatswood", priceLevel: 3, note: "重庆老火锅，花椒味浓", emoji: "🔥" },
  { name: "OZ Hot Pot Buffet 澳锅", cuisine: "火锅", suburb: "Chatswood", priceLevel: 2, note: "$35 自助火锅", emoji: "🍲" },
  { name: "Legend Hotpot 传奇火锅", cuisine: "火锅", suburb: "Burwood", priceLevel: 2, note: "全亚洲自助火锅", emoji: "🥘" },
  { name: "Xiao Long Kan 小龙坎", cuisine: "火锅", suburb: "Haymarket", priceLevel: 3, note: "成都网红火锅品牌", emoji: "🌶️" },
  { name: "Tasty BBQ 味道烧烤", cuisine: "烧烤", suburb: "Eastwood", priceLevel: 2, note: "东北烧烤串串", emoji: "🍢" },
  { name: "Red Star BBQ 红星烧烤", cuisine: "烧烤", suburb: "Chatswood", priceLevel: 2, note: "羊肉串、烤鱼、夜宵", emoji: "🔥" },

  // ══════════════════════════════════════════════════════════
  // 台湾菜 / 港式茶餐厅（增加）
  // ══════════════════════════════════════════════════════════
  { name: "One Tea Lounge 一茶轩", cuisine: "台湾菜", suburb: "World Square", priceLevel: 2, note: "台式茶饮和便当", emoji: "🧋" },
  { name: "Formosan Tea House 福尔摩沙茶馆", cuisine: "台湾菜", suburb: "Chatswood", priceLevel: 2, note: "卤肉饭和珍珠奶茶", emoji: "🍚" },
  { name: "Tim Ho Wan 添好运", cuisine: "港式茶餐厅", suburb: "Chatswood", priceLevel: 2, note: "米其林港式点心", emoji: "🥟" },
  { name: "Cafe De Grand 大班冰室", cuisine: "港式茶餐厅", suburb: "Haymarket", priceLevel: 2, note: "港式冰室经典", emoji: "🍞" },
  { name: "Tsim Tung Cafe 尖东冰室", cuisine: "港式茶餐厅", suburb: "Burwood", priceLevel: 2, note: "菠萝油和丝袜奶茶", emoji: "🥐" },

  // ══════════════════════════════════════════════════════════
  // 日料（加大量）
  // ══════════════════════════════════════════════════════════
  { name: "Nobu 信武", cuisine: "日料", suburb: "Pyrmont", priceLevel: 4, note: "世界级日料名店", emoji: "🍣" },
  { name: "Tetsuya's 哲也", cuisine: "日料", suburb: "CBD", priceLevel: 4, note: "日法混合 fine dining", emoji: "🍱" },
  { name: "Azuma 东国", cuisine: "日料", suburb: "CBD", priceLevel: 3, note: "CBD 经典日料", emoji: "🍣" },
  { name: "Izakaya Fujiyama 富士山居酒屋", cuisine: "日料", suburb: "Darlinghurst", priceLevel: 2, note: "日式居酒屋", emoji: "🍶" },
  { name: "Ramen O-San 拉面王", cuisine: "日料", suburb: "CBD", priceLevel: 2, note: "豚骨拉面", emoji: "🍜" },
  { name: "Ippudo 一风堂", cuisine: "日料", suburb: "Westfield", priceLevel: 2, note: "正宗博多拉面连锁", emoji: "🍜" },
  { name: "Maru Sushi 丸寿司", cuisine: "日料", suburb: "Chatswood", priceLevel: 2, note: "回转寿司", emoji: "🍱" },

  // ══════════════════════════════════════════════════════════
  // 韩料（增加）
  // ══════════════════════════════════════════════════════════
  { name: "Ban Jeon Ok 半传屋", cuisine: "韩料", suburb: "Strathfield", priceLevel: 2, note: "韩式烤肉", emoji: "🥩" },
  { name: "Korea House 韩国家庭", cuisine: "韩料", suburb: "Eastwood", priceLevel: 2, note: "韩式家常菜", emoji: "🍚" },
  { name: "Chicken & Beer 炸鸡啤酒", cuisine: "韩料", suburb: "CBD", priceLevel: 2, note: "韩式炸鸡 + 啤酒", emoji: "🍗" },
  { name: "Sariwon 沙里园", cuisine: "韩料", suburb: "Haymarket", priceLevel: 3, note: "高级韩式烤肉", emoji: "🥩" },

  // ══════════════════════════════════════════════════════════
  // 越南菜（增加）
  // ══════════════════════════════════════════════════════════
  { name: "Miss Chu 朱小姐", cuisine: "越南菜", suburb: "CBD", priceLevel: 2, note: "现代越南菜连锁", emoji: "🥢" },
  { name: "Marrickville Pork Roll", cuisine: "越南菜", suburb: "Marrickville", priceLevel: 1, note: "最好吃的越南法棍", emoji: "🥖" },
  { name: "Pho Pasteur 巴斯德河粉", cuisine: "越南菜", suburb: "Cabramatta", priceLevel: 1, note: "经济河粉", emoji: "🍜" },
  { name: "Bau Truong 宝庄", cuisine: "越南菜", suburb: "Bankstown", priceLevel: 2, note: "越南海鲜", emoji: "🦐" },

  // ══════════════════════════════════════════════════════════
  // 泰国 / 马来菜
  // ══════════════════════════════════════════════════════════
  { name: "Boon Cafe 盆咖啡", cuisine: "泰国菜", suburb: "CBD", priceLevel: 2, note: "泰式便当店", emoji: "🍛" },
  { name: "Thai La-Ong 泰兰昂", cuisine: "泰国菜", suburb: "Newtown", priceLevel: 2, note: "地道泰菜", emoji: "🌶️" },
  { name: "Sailors Thai 水手泰", cuisine: "泰国菜", suburb: "Rocks", priceLevel: 3, note: "老牌精致泰菜", emoji: "🍹" },
  { name: "Ho Jiak 好吃", cuisine: "马来西亚菜", suburb: "Haymarket", priceLevel: 2, note: "马来经典炒粿条", emoji: "🍜" },
  { name: "PappaRich 家乡鸡饭", cuisine: "马来西亚菜", suburb: "Chatswood", priceLevel: 2, note: "海南鸡饭和咖喱", emoji: "🍚" },
  { name: "Mamak", cuisine: "马来西亚菜", suburb: "Haymarket", priceLevel: 2, note: "印度风味马来美食", emoji: "🥞" },

  // ══════════════════════════════════════════════════════════
  // 印度 / 中东（新）
  // ══════════════════════════════════════════════════════════
  { name: "Manjits 曼吉", cuisine: "印度菜", suburb: "Wharf 5", priceLevel: 3, note: "悉尼老牌印度菜", emoji: "🥘" },
  { name: "Nilgiri's 尼尔吉里", cuisine: "印度菜", suburb: "Neutral Bay", priceLevel: 3, note: "精致印度南北料理", emoji: "🍛" },
  { name: "Steki Taverna", cuisine: "希腊菜", suburb: "Newtown", priceLevel: 2, note: "地道希腊家常", emoji: "🫒" },
  { name: "Stanbuli 伊斯坦布尔", cuisine: "土耳其菜", suburb: "Enmore", priceLevel: 3, note: "精致土耳其料理", emoji: "🫓" },
  { name: "Efendy 艾芬迪", cuisine: "土耳其菜", suburb: "Balmain", priceLevel: 3, note: "土耳其 fine dining", emoji: "🥙" },

  // ══════════════════════════════════════════════════════════
  // 意大利 / 法国 / 西班牙
  // ══════════════════════════════════════════════════════════
  { name: "Buon Ricordo 美好回忆", cuisine: "意大利菜", suburb: "Paddington", priceLevel: 4, note: "悉尼最好的意大利 fine dining", emoji: "🍝" },
  { name: "Pendolino 潘多里诺", cuisine: "意大利菜", suburb: "CBD", priceLevel: 3, note: "Strand Arcade 意大利", emoji: "🍝" },
  { name: "Pilu at Freshwater", cuisine: "意大利菜", suburb: "Freshwater", priceLevel: 4, note: "海景撒丁岛菜", emoji: "🌊" },
  { name: "Bistro Guillaume 吉约姆酒馆", cuisine: "法国菜", suburb: "CBD", priceLevel: 4, note: "米其林大厨的法式小馆", emoji: "🥖" },
  { name: "Felix Bistro 费利克斯酒馆", cuisine: "法国菜", suburb: "CBD", priceLevel: 3, note: "Merivale 的巴黎风", emoji: "🍷" },
  { name: "MoVida Sydney", cuisine: "西班牙菜", suburb: "CBD", priceLevel: 3, note: "地道西班牙小吃 Tapas", emoji: "🥘" },

  // ══════════════════════════════════════════════════════════
  // 现代澳洲 / 早午餐
  // ══════════════════════════════════════════════════════════
  { name: "Three Blue Ducks", cuisine: "现代澳洲", suburb: "Rosebery", priceLevel: 3, note: "Farm-to-table 早午餐", emoji: "🥓" },
  { name: "The Grounds 花园餐厅", cuisine: "早午餐", suburb: "Alexandria", priceLevel: 3, note: "网红花园餐厅", emoji: "🌸" },
  { name: "Reuben Hills 鲁宾山", cuisine: "咖啡店", suburb: "Surry Hills", priceLevel: 2, note: "精品咖啡 + 拉美风味", emoji: "☕" },
  { name: "Devon Cafe 德文咖啡", cuisine: "早午餐", suburb: "Surry Hills", priceLevel: 2, note: "日系早午餐", emoji: "🍳" },
  { name: "Cafe Sydney 悉尼咖啡", cuisine: "现代澳洲", suburb: "Circular Quay", priceLevel: 4, note: "海港景观，现代菜", emoji: "🌉" },

  // ══════════════════════════════════════════════════════════
  // 创意料理 / 海鲜
  // ══════════════════════════════════════════════════════════
  { name: "Saint Peter 圣彼得", cuisine: "海鲜", suburb: "Paddington", priceLevel: 4, note: "全鱼料理 fine dining", emoji: "🐟" },
  { name: "The Boat House", cuisine: "海鲜", suburb: "Balmoral", priceLevel: 4, note: "海滩边海鲜餐厅", emoji: "🦪" },
  { name: "Catalina 卡塔琳娜", cuisine: "海鲜", suburb: "Rose Bay", priceLevel: 4, note: "海滨高级海鲜", emoji: "🦐" },
  { name: "Icebergs Dining Room", cuisine: "意大利菜", suburb: "Bondi", priceLevel: 4, note: "Bondi 海滩最美意大利", emoji: "🌊" },

  // ══════════════════════════════════════════════════════════
  // 夜宵 / 快餐
  // ══════════════════════════════════════════════════════════
  { name: "Mappen 满福", cuisine: "日料", suburb: "CBD", priceLevel: 1, note: "平价日式乌冬", emoji: "🍜" },
  { name: "Ume Burger 梅汉堡", cuisine: "日料", suburb: "Barangaroo", priceLevel: 2, note: "日式汉堡", emoji: "🍔" },
  { name: "Mr. Crackles 脆皮先生", cuisine: "澳洲", suburb: "Darlinghurst", priceLevel: 1, note: "烤乳猪三明治", emoji: "🥪" },

  // ══════════════════════════════════════════════════════════
  // 素食 / 健康
  // ══════════════════════════════════════════════════════════
  { name: "Bodhi 菩提", cuisine: "素食", suburb: "CBD", priceLevel: 2, note: "亚洲素食点心", emoji: "🌱" },
  { name: "Gigi Pizzeria 吉吉披萨", cuisine: "意大利菜", suburb: "Newtown", priceLevel: 2, note: "纯素披萨", emoji: "🍕" },
  { name: "Soul Burger 灵魂汉堡", cuisine: "素食", suburb: "Randwick", priceLevel: 2, note: "素食汉堡连锁", emoji: "🥗" },

  // ══════════════════════════════════════════════════════════
  // 地道中餐馆（小馆子系列）
  // ══════════════════════════════════════════════════════════
  { name: "Lotus 莲", cuisine: "粤菜", suburb: "CBD", priceLevel: 3, note: "Merivale 现代粤菜", emoji: "🪷" },
  { name: "Queen Chow 周后", cuisine: "粤菜", suburb: "Enmore", priceLevel: 2, note: "现代粤式酒吧", emoji: "🍹" },
  { name: "Sydney Dumpling King 饺子王", cuisine: "东北菜", suburb: "Burwood", priceLevel: 1, note: "手工水饺和馄饨", emoji: "🥟" },
  { name: "Din Tai Fung 鼎泰丰", cuisine: "台湾菜", suburb: "Chatswood", priceLevel: 3, note: "世界级小笼包连锁", emoji: "🥟" },
  { name: "Mother Chu's Vegetarian 母后素食", cuisine: "素食", suburb: "CBD", priceLevel: 1, note: "台式素食斋菜", emoji: "🌿" },
];
