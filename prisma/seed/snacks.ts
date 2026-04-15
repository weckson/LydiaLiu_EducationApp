// 零食排行榜初始数据
// category: "AU" = 澳洲本土热门，"ZH" = 华人社区热门
// Lydia 可以在 app 内编辑、增删、或用 AI 刷新

export type SnackSeed = {
  category: "AU" | "ZH";
  rank: number;
  name: string;
  nameEn?: string;
  emoji?: string;
  description?: string;
  priceRange?: string;
};

export const SNACKS: SnackSeed[] = [
  // ════════════════════════════════════════
  // 澳洲本土 Top 10
  // ════════════════════════════════════════
  {
    category: "AU",
    rank: 1,
    name: "Tim Tam 巧克力夹心饼干",
    nameEn: "Tim Tam",
    emoji: "🍫",
    description:
      "澳洲国民零食，巧克力包覆威化饼干，经典口味是 Original。Tim Tam Slam 喝咖啡的神奇吸管玩法是澳洲人童年记忆。",
    priceRange: "$4-6 / 200g",
  },
  {
    category: "AU",
    rank: 2,
    name: "Arnott's Shapes 咸味饼干",
    nameEn: "Arnott's Shapes",
    emoji: "🧀",
    description:
      "Arnott 家的咸味小饼干，BBQ、Pizza、Cheddar 口味最受欢迎。看电视、下酒、追剧必备。",
    priceRange: "$3-5 / 盒",
  },
  {
    category: "AU",
    rank: 3,
    name: "Lamingtons 莱明顿蛋糕",
    nameEn: "Lamingtons",
    emoji: "🎂",
    description:
      "方块海绵蛋糕裹巧克力酱 + 椰蓉，澳洲国菜级甜点，超市和面包店都有。",
    priceRange: "$5-10 / 4 块",
  },
  {
    category: "AU",
    rank: 4,
    name: "Cherry Ripe 樱桃巧克力",
    nameEn: "Cherry Ripe",
    emoji: "🍒",
    description:
      "澳洲最古老巧克力棒之一，黑巧克力内包椰蓉和樱桃，味道浓郁独特。",
    priceRange: "$2-4 / 条",
  },
  {
    category: "AU",
    rank: 5,
    name: "Violet Crumble 蜂巢脆脆",
    nameEn: "Violet Crumble",
    emoji: "🍯",
    description:
      "脆脆的蜂巢糖芯外裹巧克力，口感独特，经典广告语 It's the way it shatters that matters。",
    priceRange: "$2-4 / 条",
  },
  {
    category: "AU",
    rank: 6,
    name: "Caramello Koala 焦糖考拉",
    nameEn: "Caramello Koala",
    emoji: "🐨",
    description:
      "考拉形状的巧克力，内含流心焦糖，孩子的最爱，也是送礼佳品。",
    priceRange: "$1-2 / 只",
  },
  {
    category: "AU",
    rank: 7,
    name: "Anzac Biscuits 军人饼干",
    nameEn: "Anzac Biscuits",
    emoji: "🍪",
    description:
      "燕麦椰蓉饼干，源自一战军属寄给前线战士的经典零食，至今仍是 ANZAC Day 的文化象征。",
    priceRange: "$3-6 / 盒",
  },
  {
    category: "AU",
    rank: 8,
    name: "Twisties 玉米脆",
    nameEn: "Twisties",
    emoji: "🌽",
    description:
      "螺旋状玉米脆片，芝士和鸡肉口味最经典，和可乐是绝配，派对必备。",
    priceRange: "$3-5 / 袋",
  },
  {
    category: "AU",
    rank: 9,
    name: "Pavlova 帕夫洛娃蛋糕",
    nameEn: "Pavlova",
    emoji: "🍰",
    description:
      "外脆内软的蛋白酥饼，上面铺奶油和新鲜水果，圣诞节和重要节日必吃，和新西兰争夺发源地。",
    priceRange: "$15-30 / 个",
  },
  {
    category: "AU",
    rank: 10,
    name: "Tiny Teddies 小熊饼干",
    nameEn: "Tiny Teddies",
    emoji: "🧸",
    description:
      "Arnott 家的小熊形状饼干，巧克力和蜂蜜口味最受欢迎，澳洲小孩书包常驻。",
    priceRange: "$3-5 / 盒",
  },

  // ════════════════════════════════════════
  // 华人社区 Top 10
  // ════════════════════════════════════════
  {
    category: "ZH",
    rank: 1,
    name: "卫龙辣条",
    nameEn: "Wei Long Spicy Strips",
    emoji: "🌶️",
    description:
      "国民辣条代表，大辣棒、小面筋、魔芋爽都是明星产品，国内外华人超市畅销，Coles/Woolworths 国际区也有。",
    priceRange: "$2-5 / 袋",
  },
  {
    category: "ZH",
    rank: 2,
    name: "大白兔奶糖",
    nameEn: "White Rabbit Creamy Candy",
    emoji: "🐰",
    description:
      "经典中国奶糖，包裹糖纸下的糯米纸是童年记忆。近年还出了冰淇淋和奶茶跨界款。",
    priceRange: "$4-8 / 袋",
  },
  {
    category: "ZH",
    rank: 3,
    name: "旺旺仙贝 / 雪饼",
    nameEn: "Want Want Senbei / Rice Crackers",
    emoji: "🍘",
    description:
      "旺旺集团的经典米饼，甜咸两种口味，过年礼盒装更是家家户户必备。",
    priceRange: "$3-7 / 袋",
  },
  {
    category: "ZH",
    rank: 4,
    name: "好丽友派",
    nameEn: "Orion Choco Pie",
    emoji: "🥧",
    description:
      "巧克力派和蛋黄派，早餐、下午茶、深夜加餐三合一选择。榴莲味、抹茶味国内推出后也受欢迎。",
    priceRange: "$5-10 / 盒",
  },
  {
    category: "ZH",
    rank: 5,
    name: "黄飞红麻辣花生",
    nameEn: "Huang Fei Hong Spicy Peanuts",
    emoji: "🥜",
    description:
      "经典下酒菜，麻辣香脆，华人超市必备。一开袋停不下来，配白粥也神奇地好吃。",
    priceRange: "$3-6 / 袋",
  },
  {
    category: "ZH",
    rank: 6,
    name: "溜溜梅",
    nameEn: "Liu Liu Mei Preserved Plums",
    emoji: "🍑",
    description:
      "酸甜青梅蜜饯，开胃解困神器。出行、开车、工作间隙最佳伙伴。",
    priceRange: "$3-5 / 袋",
  },
  {
    category: "ZH",
    rank: 7,
    name: "徐福记糖果",
    nameEn: "Hsu Fu Chi Candies",
    emoji: "🍬",
    description:
      "新年喜庆糖果代表，酥心糖、沙琪玛、凤梨酥等品类齐全，婚庆和春节必备。",
    priceRange: "$5-15 / 包",
  },
  {
    category: "ZH",
    rank: 8,
    name: "乐事黄瓜味薯片",
    nameEn: "Lay's Cucumber Chips",
    emoji: "🥒",
    description:
      "中国限定口味，清新怪异又上瘾，是国外留学生回国必带回澳洲的怪味零食代表。",
    priceRange: "$3-5 / 袋",
  },
  {
    category: "ZH",
    rank: 9,
    name: "康师傅红烧牛肉面",
    nameEn: "Master Kong Beef Noodle",
    emoji: "🍜",
    description:
      "国民级方便面，留学生应急神器，华人超市常年摆在最显眼的货架。",
    priceRange: "$1-3 / 桶",
  },
  {
    category: "ZH",
    rank: 10,
    name: "无穷烤鸡小腿",
    nameEn: "Wuqiong Chicken Drumettes",
    emoji: "🍗",
    description:
      "独立包装小鸡腿，真空包装可常温保存，追剧、出游、解馋三合一。",
    priceRange: "$5-10 / 袋",
  },
];
