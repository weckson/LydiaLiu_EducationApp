// 悉尼餐厅随机选择器 - 初始数据
// Lydia 可以在 app 里随时增删改

export type RestaurantSeed = {
  name: string;
  cuisine: string;
  suburb: string;
  priceLevel: number; // 1-4
  note?: string;
  emoji?: string;
};

export const RESTAURANTS: RestaurantSeed[] = [
  // 粤菜
  { name: "Golden Century 金唐海鲜酒家", cuisine: "粤菜", suburb: "CBD", priceLevel: 3, note: "经典粤式海鲜，深夜食堂代表", emoji: "🦞" },
  { name: "East Ocean 东海酒家", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 3, note: "早茶点心一流", emoji: "🥟" },
  { name: "Marigold 万寿宫", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 3, note: "港式点心与烧味", emoji: "🍗" },
  { name: "Emperor's Garden 皇朝酒家", cuisine: "粤菜", suburb: "Haymarket", priceLevel: 2, note: "经济实惠的港式早茶", emoji: "🍵" },

  // 川菜
  { name: "Dainty Sichuan 成都印象", cuisine: "川菜", suburb: "Chatswood", priceLevel: 3, note: "水煮鱼、麻辣火锅出名", emoji: "🌶️" },
  { name: "Red Chilli 红辣椒", cuisine: "川菜", suburb: "Chatswood", priceLevel: 2, note: "地道川菜，麻辣兼备", emoji: "🔥" },
  { name: "Spicy World 辣界", cuisine: "川菜", suburb: "Haymarket", priceLevel: 2, note: "水煮、干锅、冷吃兔", emoji: "🌶️" },

  // 上海菜
  { name: "New Shanghai 新上海", cuisine: "上海菜", suburb: "Chatswood", priceLevel: 2, note: "小笼包和生煎是招牌", emoji: "🥟" },
  { name: "Taste of Shanghai 上海人家", cuisine: "上海菜", suburb: "Ashfield", priceLevel: 2, note: "本帮菜和小笼", emoji: "🍜" },
  { name: "Din Tai Fung 鼎泰丰", cuisine: "台湾菜", suburb: "World Square", priceLevel: 3, note: "精品小笼包，环境好", emoji: "🥟" },

  // 北方菜
  { name: "Shan Dong Mama 山东妈妈", cuisine: "山东菜", suburb: "Melbourne CBD", priceLevel: 2, note: "地道山东水饺", emoji: "🥟" },
  { name: "Good Luck Pin Yi 好运品逸", cuisine: "东北菜", suburb: "Eastwood", priceLevel: 2, note: "东北大拉皮和锅包肉", emoji: "🍖" },
  { name: "West Lake 西湖", cuisine: "江浙菜", suburb: "Ashfield", priceLevel: 2, note: "红烧肉和东坡肉", emoji: "🐷" },

  // 湘菜
  { name: "The Eight 宴东方", cuisine: "粤菜", suburb: "Market City", priceLevel: 3, note: "大型粤菜酒楼，适合聚餐", emoji: "🐟" },

  // 日料
  { name: "Sokyo 宗郷", cuisine: "日料", suburb: "Pyrmont", priceLevel: 4, note: "高端日料，创意料理", emoji: "🍣" },
  { name: "Toko", cuisine: "日料", suburb: "Surry Hills", priceLevel: 3, note: "现代创意日料", emoji: "🍱" },
  { name: "Masuya 益屋", cuisine: "日料", suburb: "CBD", priceLevel: 3, note: "居酒屋氛围，生鱼片新鲜", emoji: "🍶" },
  { name: "Ichi-Ni 一二", cuisine: "日料", suburb: "Bondi", priceLevel: 3, note: "海景居酒屋", emoji: "🌊" },

  // 韩料
  { name: "Arisun 阿里郎", cuisine: "韩料", suburb: "CBD", priceLevel: 2, note: "韩式烤肉连锁", emoji: "🥩" },
  { name: "Seoul Ria 首尔", cuisine: "韩料", suburb: "CBD", priceLevel: 3, note: "经典韩式家常菜", emoji: "🍲" },
  { name: "Madang", cuisine: "韩料", suburb: "CBD", priceLevel: 3, note: "韩式烤肉+石锅拌饭", emoji: "🔥" },

  // 越南
  { name: "Pho An 越南 Pho", cuisine: "越南菜", suburb: "Bankstown", priceLevel: 1, note: "地道越南牛肉河粉", emoji: "🍜" },
  { name: "Great Aunty Three", cuisine: "越南菜", suburb: "Marrickville", priceLevel: 2, note: "现代越南菜", emoji: "🌿" },

  // 泰国
  { name: "Chat Thai", cuisine: "泰国菜", suburb: "CBD", priceLevel: 2, note: "地道泰国街头美食", emoji: "🍛" },
  { name: "Spice I Am", cuisine: "泰国菜", suburb: "Surry Hills", priceLevel: 2, note: "地道辛辣泰菜", emoji: "🌶️" },
  { name: "Longrain", cuisine: "泰国菜", suburb: "Surry Hills", priceLevel: 3, note: "现代泰式 fine dining", emoji: "🍹" },

  // 火锅
  { name: "Haidilao 海底捞", cuisine: "火锅", suburb: "World Square", priceLevel: 3, note: "服务一流的火锅连锁", emoji: "🍲" },
  { name: "Shuang Jiao 双椒", cuisine: "火锅", suburb: "Chatswood", priceLevel: 2, note: "四川麻辣火锅", emoji: "🌶️" },

  // 西餐 / 澳洲
  { name: "Quay 码头餐厅", cuisine: "现代澳洲", suburb: "Circular Quay", priceLevel: 4, note: "悉尼顶级 fine dining，景观一流", emoji: "🌉" },
  { name: "Bennelong 歌剧院餐厅", cuisine: "现代澳洲", suburb: "Opera House", priceLevel: 4, note: "歌剧院内部，海港景观", emoji: "🎭" },
  { name: "Rockpool Bar & Grill", cuisine: "澳洲牛排", suburb: "CBD", priceLevel: 4, note: "顶级澳洲牛排", emoji: "🥩" },

  // 早餐 / 咖啡
  { name: "Bills 早午餐", cuisine: "早午餐", suburb: "Surry Hills", priceLevel: 2, note: "招牌松饼", emoji: "🥞" },
  { name: "Single O Coffee", cuisine: "咖啡店", suburb: "Surry Hills", priceLevel: 1, note: "精品咖啡 + 早餐", emoji: "☕" },

  // 亚洲甜品
  { name: "Meet Fresh 鲜芋仙", cuisine: "台式甜品", suburb: "Chatswood", priceLevel: 1, note: "台湾甜品连锁", emoji: "🍧" },
  { name: "Lot.1 Dessert Kitchen", cuisine: "港式甜品", suburb: "Chatswood", priceLevel: 2, note: "港式糖水和下午茶", emoji: "🍮" },
];
