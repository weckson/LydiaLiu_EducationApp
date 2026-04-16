// 零食大扩充 - Coles/Woolworths 热门 + 华超热门
import type { SnackSeed } from "./snacks";

export const SNACKS_V2: SnackSeed[] = [
  // ════════════════════════════════════════
  // Coles / Woolworths 热门 (AU)
  // ════════════════════════════════════════
  { category: "AU", rank: 11, name: "Cadbury Dairy Milk 牛奶巧克力", nameEn: "Cadbury Dairy Milk", emoji: "🍫", description: "澳洲最畅销巧克力，多种口味", priceRange: "$5-8" },
  { category: "AU", rank: 12, name: "Kettle Chips 手工薯片", nameEn: "Kettle Chips", emoji: "🥔", description: "厚切薯片，Sea Salt 和 Chilli 口味最受欢迎", priceRange: "$5-7" },
  { category: "AU", rank: 13, name: "Red Rock Deli 薯片", nameEn: "Red Rock Deli", emoji: "🥔", description: "高端薯片品牌，Sweet Chilli Sour Cream 经典", priceRange: "$5-7" },
  { category: "AU", rank: 14, name: "Smith's Chips 薯片", nameEn: "Smith's Chips", emoji: "🥔", description: "Original 和 Salt & Vinegar 国民口味", priceRange: "$4-6" },
  { category: "AU", rank: 15, name: "Allen's Lollies 软糖", nameEn: "Allen's Lollies", emoji: "🍬", description: "Snakes 蛇形软糖和 Party Mix 派对混合装", priceRange: "$4-6" },
  { category: "AU", rank: 16, name: "Arnott's Scotch Finger 黄油饼干", nameEn: "Scotch Finger", emoji: "🍪", description: "配茶必备的经典黄油饼干", priceRange: "$3-5" },
  { category: "AU", rank: 17, name: "Vegemite 维吉麦酱", nameEn: "Vegemite", emoji: "🫙", description: "澳洲国宝级酱料，涂面包吃，味道极两极", priceRange: "$5-10" },
  { category: "AU", rank: 18, name: "Freddo Frog 青蛙巧克力", nameEn: "Freddo Frog", emoji: "🐸", description: "Cadbury 旗下小青蛙形状巧克力", priceRange: "$1-2" },
  { category: "AU", rank: 19, name: "Bega Cheese Stringers 芝士棒", nameEn: "Bega Stringers", emoji: "🧀", description: "撕着吃的奶酪棒，健康零食", priceRange: "$6-8" },
  { category: "AU", rank: 20, name: "Arnott's Monte Carlo 饼干", nameEn: "Monte Carlo", emoji: "🍪", description: "果酱奶油夹心饼干，澳洲经典", priceRange: "$4-5" },
  { category: "AU", rank: 21, name: "Golden Gaytime 冰淇淋", nameEn: "Golden Gaytime", emoji: "🍦", description: "澳洲网红冰棍，太妃外衣+饼干碎", priceRange: "$5-10 / 4支" },
  { category: "AU", rank: 22, name: "Magnum 梦龙冰淇淋", nameEn: "Magnum", emoji: "🍦", description: "巧克力脆皮雪糕", priceRange: "$8-12 / 4支" },
  { category: "AU", rank: 23, name: "Byron Bay Cookies 曲奇", nameEn: "Byron Bay Cookies", emoji: "🍪", description: "手工烘焙曲奇，White Choc Macadamia 经典", priceRange: "$6-8" },
  { category: "AU", rank: 24, name: "Darrell Lea Liquorice 甘草糖", nameEn: "Darrell Lea", emoji: "🍬", description: "澳洲本土甘草糖品牌", priceRange: "$4-6" },
  { category: "AU", rank: 25, name: "CC's Corn Chips 玉米片", nameEn: "CC's", emoji: "🌽", description: "Original 和 Nacho Cheese 口味", priceRange: "$3-5" },
  { category: "AU", rank: 26, name: "Harvest Snaps 豌豆脆", nameEn: "Harvest Snaps", emoji: "🫛", description: "烤豌豆零食，低卡健康", priceRange: "$4-5" },
  { category: "AU", rank: 27, name: "Lindt 瑞士莲巧克力", nameEn: "Lindt Lindor", emoji: "🍫", description: "Woolworths 常驻高端巧克力", priceRange: "$6-12" },
  { category: "AU", rank: 28, name: "Pringles 品客薯片", nameEn: "Pringles", emoji: "🥔", description: "罐装薯片全球品牌", priceRange: "$4-6" },
  { category: "AU", rank: 29, name: "Maltesers 麦提莎", nameEn: "Maltesers", emoji: "🍫", description: "麦芯巧克力球，轻脆口感", priceRange: "$5-8" },
  { category: "AU", rank: 30, name: "Carman's Muesli Bar 燕麦棒", nameEn: "Carman's", emoji: "🥜", description: "健康燕麦棒，多种坚果口味", priceRange: "$5-7" },
  { category: "AU", rank: 31, name: "Coles Bakery Croissant 可颂", nameEn: "Coles Croissant", emoji: "🥐", description: "Coles 自营面包房新鲜可颂", priceRange: "$4-6 / 4个" },
  { category: "AU", rank: 32, name: "Woolworths Mud Cake 巧克力蛋糕", nameEn: "Woolworths Mud Cake", emoji: "🎂", description: "超市神饼，生日派对常客", priceRange: "$5-7" },
  { category: "AU", rank: 33, name: "Doritos 多力多滋", nameEn: "Doritos", emoji: "🌮", description: "Cheese Supreme 和 Salsa 口味", priceRange: "$4-6" },
  { category: "AU", rank: 34, name: "Kinder Surprise 健达奇趣蛋", nameEn: "Kinder Surprise", emoji: "🥚", description: "巧克力蛋里藏玩具", priceRange: "$2-4" },
  { category: "AU", rank: 35, name: "Nutella 能多益榛子酱", nameEn: "Nutella", emoji: "🫙", description: "配面包或直接挖着吃", priceRange: "$5-10" },

  // ════════════════════════════════════════
  // 华人超市热门 (ZH)
  // ════════════════════════════════════════
  { category: "ZH", rank: 11, name: "三只松鼠坚果", nameEn: "Three Squirrels Nuts", emoji: "🐿️", description: "混合坚果大礼包，天猫系零食", priceRange: "$8-15" },
  { category: "ZH", rank: 12, name: "百草味牛肉干", nameEn: "Baicaowei Beef Jerky", emoji: "🥩", description: "五香/麻辣牛肉干，追剧必备", priceRange: "$6-10" },
  { category: "ZH", rank: 13, name: "良品铺子猪肉脯", nameEn: "Bestore Pork Jerky", emoji: "🥓", description: "靖江猪肉脯，甜咸适中", priceRange: "$6-10" },
  { category: "ZH", rank: 14, name: "洽洽瓜子", nameEn: "Qia Qia Sunflower Seeds", emoji: "🌻", description: "国民嗑瓜子品牌，原味和焦糖味", priceRange: "$3-5" },
  { category: "ZH", rank: 15, name: "旺旺小小酥", nameEn: "Want Want Mini Rice Crackers", emoji: "🍘", description: "原味/葱香/黑胡椒脆米小饼", priceRange: "$3-5" },
  { category: "ZH", rank: 16, name: "乐事薯片 番茄味", nameEn: "Lay's Tomato", emoji: "🍅", description: "中国限定番茄口味", priceRange: "$3-5" },
  { category: "ZH", rank: 17, name: "统一老坛酸菜面", nameEn: "Uni-President Pickled Cabbage Noodle", emoji: "🍜", description: "国民泡面，酸爽开胃", priceRange: "$1-3" },
  { category: "ZH", rank: 18, name: "旺仔牛奶", nameEn: "Want Want Hot Kid Milk", emoji: "🥛", description: "红色罐装复原乳，童年味道", priceRange: "$2-4" },
  { category: "ZH", rank: 19, name: "喜之郎果冻", nameEn: "Strong Jelly", emoji: "🍮", description: "吸吸果冻和大杯装", priceRange: "$3-6" },
  { category: "ZH", rank: 20, name: "上好佳虾条", nameEn: "Oishi Prawn Crackers", emoji: "🦐", description: "经典虾味膨化食品", priceRange: "$2-4" },
  { category: "ZH", rank: 21, name: "达利园蛋黄派", nameEn: "Dali Garden Egg Pie", emoji: "🥧", description: "早餐零食两用", priceRange: "$4-7" },
  { category: "ZH", rank: 22, name: "盼盼法式小面包", nameEn: "Panpan French Bread", emoji: "🍞", description: "软面包小包装，奶香味", priceRange: "$4-6" },
  { category: "ZH", rank: 23, name: "绿箭口香糖", nameEn: "Doublemint Gum", emoji: "🌿", description: "清新口气必备", priceRange: "$2-3" },
  { category: "ZH", rank: 24, name: "奥利奥饼干", nameEn: "Oreo", emoji: "🍪", description: "中国版有抹茶/草莓等限定口味", priceRange: "$4-6" },
  { category: "ZH", rank: 25, name: "周黑鸭鸭脖", nameEn: "Zhou Hei Ya Duck Neck", emoji: "🦆", description: "甜辣卤味，华人超市冷藏区", priceRange: "$8-15" },
  { category: "ZH", rank: 26, name: "味好美虾片", nameEn: "McCormick Prawn Chips", emoji: "🦐", description: "自己炸的虾片，派对小食", priceRange: "$3-5" },
  { category: "ZH", rank: 27, name: "日清合味道杯面", nameEn: "Nissin Cup Noodle", emoji: "🍜", description: "海鲜味经典杯面", priceRange: "$2-4" },
  { category: "ZH", rank: 28, name: "可比克薯片", nameEn: "Copico Chips", emoji: "🥔", description: "烧烤味国产薯片", priceRange: "$3-5" },
  { category: "ZH", rank: 29, name: "老干妈辣酱", nameEn: "Lao Gan Ma Chili Sauce", emoji: "🌶️", description: "万物皆可老干妈，拌面拌饭神器", priceRange: "$4-6" },
  { category: "ZH", rank: 30, name: "旺旺QQ糖", nameEn: "Want Want QQ Gummy", emoji: "🍬", description: "果汁软糖，多种水果口味", priceRange: "$2-4" },
  { category: "ZH", rank: 31, name: "阿华田巧克力麦芽饮", nameEn: "Ovaltine", emoji: "☕", description: "泡着喝或直接吃粉都行", priceRange: "$5-8" },
  { category: "ZH", rank: 32, name: "金锣火腿肠", nameEn: "Jinluo Ham Sausage", emoji: "🌭", description: "泡面搭档", priceRange: "$3-6" },
  { category: "ZH", rank: 33, name: "双汇王中王火腿", nameEn: "Shuanghui Ham", emoji: "🌭", description: "中国版 SPAM", priceRange: "$3-6" },
  { category: "ZH", rank: 34, name: "脆脆鲨威化饼", nameEn: "Crispy Shark Wafer", emoji: "🦈", description: "巧克力威化棒", priceRange: "$2-4" },
  { category: "ZH", rank: 35, name: "小浣熊干脆面", nameEn: "Tanuki Crispy Noodle", emoji: "🦝", description: "不泡水直接吃的干脆面", priceRange: "$1-2" },
];
