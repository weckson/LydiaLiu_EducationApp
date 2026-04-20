// 小红书 / 微信 / 抖音 等平台时下热门的澳洲留学/移民话题库
//
// 分类：
// - 签证政策 VISA
// - 技术移民 SKILLED
// - 留学申请 STUDY
// - 毕业路径 GRADUATE
// - 生活成本 COST
// - 案例故事 STORIES
// - 选校选专业 CHOICE
// - 避坑指南 WARNINGS
// - 情感共鸣 EMOTION

export type TopicCategory =
  | "VISA"
  | "SKILLED"
  | "STUDY"
  | "GRADUATE"
  | "COST"
  | "STORIES"
  | "CHOICE"
  | "WARNINGS"
  | "EMOTION";

export type HotTopic = {
  category: TopicCategory;
  title: string; // 主题名（用户点击后填入 topic 字段）
  trend?: "🔥" | "⚠️" | "💎" | "📊"; // 热度/类型标签
  hint?: string; // 提示，帮助顾问快速理解这个话题
};

export const HOT_TOPICS: HotTopic[] = [
  // ════════════════════════════════════════
  // 签证政策 —— 2025-2026 新政
  // ════════════════════════════════════════
  { category: "VISA", trend: "🔥", title: "500 学生签证 2026 年新规全解读", hint: "GS 替代 GTE、费用上涨到 $2000、英语门槛提高" },
  { category: "VISA", trend: "🔥", title: "485 毕业生工签大砍！年龄 50→35 岁", hint: "2024.7 新政，英语 6.0→6.5，停留时间缩短" },
  { category: "VISA", trend: "🔥", title: "SID 雇主担保新规来了！482 TSS 替代详解", hint: "2024.12.7 Skills in Demand 正式上线" },
  { category: "VISA", trend: "⚠️", title: "188 商业投资签证被暂停！新 NIV 等什么", hint: "2024.7 起暂停新申请" },
  { category: "VISA", trend: "🔥", title: "2025 年 7 月签证费大涨 25%！学生签跳到 $2000", hint: "各类签证 VAC 调整" },
  { category: "VISA", trend: "💎", title: "伴侣签证 820/801 拒签率飙升，四大支柱你准备好了吗", hint: "关系证据的经济/家庭/社交/承诺四维度" },
  { category: "VISA", trend: "📊", title: "父母签证 143 到底要不要排队？2026 实测处理时间", hint: "付费类 vs 非付费类对比" },
  { category: "VISA", title: "600 访客签证探亲怎么办最稳？最新技巧", hint: "父母探亲、朋友邀请、资金证明" },
  { category: "VISA", title: "462 打工度假签证 2026 抢配额全攻略", hint: "中国大陆 5000 个名额" },
  { category: "VISA", title: "ART 申诉新政策解读：AAT 变 ART 后区别在哪", hint: "2024.10.14 新机构" },

  // ════════════════════════════════════════
  // 技术移民 —— 配额 / 分数 / 州担保
  // ════════════════════════════════════════
  { category: "SKILLED", trend: "🔥", title: "2025-26 澳洲永居配额 185,000 确定！各类别分析", hint: "技术 132,200 + 家庭 52,500" },
  { category: "SKILLED", trend: "🔥", title: "189 独立技术移民腰斩！从 30,000 到 16,900", hint: "分数只会更高，建议走州担保" },
  { category: "SKILLED", trend: "🔥", title: "190 州担保各州 2025-26 配额最新汇总", hint: "NSW 2100 / VIC 3400 / QLD 2600 / SA 1500" },
  { category: "SKILLED", trend: "🔥", title: "491 偏远地区捷径！TAS / SA / NT 哪个最友好", hint: "分数低 + 转 PR 容易" },
  { category: "SKILLED", trend: "💎", title: "CSOL 新职业清单 456 个职业全解读", hint: "替代旧 MLTSSL/STSOL" },
  { category: "SKILLED", trend: "⚠️", title: "2026 积分制要大改！400 分保证邀请是真的吗", hint: "英文测评、薪资加分、年龄倾斜" },
  { category: "SKILLED", title: "IT 程序员 189 获邀线涨到 95，怎么办", hint: "ACS 评估 + 高分策略" },
  { category: "SKILLED", title: "会计专业移民还有戏吗？2026 真实数据告诉你", hint: "CPA 评估 + 内审 / 外审" },
  { category: "SKILLED", title: "护士移民最稳的路径？ANMAC 评估全流程", hint: "RN 注册护士 250, 254" },
  { category: "SKILLED", title: "非技术移民客户的 5 条后路 —— 482 / DAMA / 商业", hint: "分数不够怎么办" },
  { category: "SKILLED", title: "NAATI CCL 5 分怎么考？中文母语者的福利", hint: "通过率 + 备考建议" },
  { category: "SKILLED", title: "偏远地区定义 2026 最新：Gold Coast 也算？", hint: "Cat 1 Cat 2 区别" },

  // ════════════════════════════════════════
  // 留学申请
  // ════════════════════════════════════════
  { category: "STUDY", trend: "🔥", title: "澳洲 Go8 八大 2026 最新录取门槛对比", hint: "墨大/悉大/UNSW/ANU/Monash/UQ/UWA/Adelaide" },
  { category: "STUDY", trend: "🔥", title: "莫名被拒？500 签证 GS 陈述写作完整指南", hint: "Genuine Student 1200-1800 字" },
  { category: "STUDY", trend: "🔥", title: "国际生名额被砍！2026 入学还能申请吗", hint: "联邦限额政策" },
  { category: "STUDY", trend: "💎", title: "澳洲读硕士 vs 英硕 vs 美硕 —— 2026 深度对比", hint: "费用 / 时间 / PR 路径" },
  { category: "STUDY", title: "国内 985 211 去澳洲，真的香吗", hint: "生源定位 + 学位价值" },
  { category: "STUDY", title: "澳洲预科 / Foundation 必须读吗？", hint: "直录 vs 预科" },
  { category: "STUDY", title: "TAFE 职业教育真香！移民捷径还是陷阱", hint: "厨师 / 美发 / 幼教" },
  { category: "STUDY", title: "国际生存款 $29,710/年，怎么证明最稳", hint: "存期 + 来源说明" },
  { category: "STUDY", title: "IELTS / PTE / TOEFL 换算表，哪个最容易拿分", hint: "技术流选 PTE" },
  { category: "STUDY", title: "OSHC 健康保险怎么选？Bupa vs Medibank vs AHM", hint: "留学生必备" },

  // ════════════════════════════════════════
  // 毕业路径
  // ════════════════════════════════════════
  { category: "GRADUATE", trend: "🔥", title: "毕业后一步步拿 PR 的 5 条路径", hint: "485 → 491 / 190 / 482 TRT" },
  { category: "GRADUATE", title: "485 毕业工签：如何从 1.5 年延长到 4 年", hint: "偏远地区 + STEM + 硕士研究型" },
  { category: "GRADUATE", title: "Professional Year 值不值得读？IT/ 会计/工程", hint: "+5 分 + 本地实习" },
  { category: "GRADUATE", title: "485 持有期间怎么找工作最高效", hint: "LinkedIn + 澳洲简历模板" },

  // ════════════════════════════════════════
  // 生活成本
  // ════════════════════════════════════════
  { category: "COST", trend: "🔥", title: "2026 澳洲留学一年真实花费：学费 + 房租 + 生活", hint: "Sydney/Melbourne/Adelaide 对比" },
  { category: "COST", title: "留学生合租 vs Homestay vs Studio 花费对比", hint: "不同城市不同区域" },
  { category: "COST", title: "澳洲打工时薪 $24+，怎么最大化收入", hint: "学生签每 2 周 48 小时" },

  // ════════════════════════════════════════
  // 真实案例
  // ════════════════════════════════════════
  { category: "STORIES", trend: "💎", title: "28 岁本科女生从 0 到 PR 的完整时间线", hint: "+ 真实分数 + 费用" },
  { category: "STORIES", title: "硕士毕业 2 年内拿到 491 —— 南澳路径实录", hint: "Adelaide 毕业生的选择" },
  { category: "STORIES", title: "IT 程序员分数不够转 482 到 186 两年拿 PR", hint: "雇主担保完整路径" },
  { category: "STORIES", title: "护士从国内来澳读硕士再到 PR 的 4 年路", hint: "ANMAC + 州担保" },
  { category: "STORIES", title: "35+ 年龄客户怎么移民澳洲？3 条路径案例", hint: "DAMA / 858 / 482 TRT" },

  // ════════════════════════════════════════
  // 选校选专业
  // ════════════════════════════════════════
  { category: "CHOICE", title: "墨大 vs 悉大：商学院到底选哪个", hint: "Melbourne Model vs Sydney" },
  { category: "CHOICE", title: "冷门高性价比：阿德莱德 / 塔斯马尼亚大学", hint: "偏远地区 + 学费便宜" },
  { category: "CHOICE", title: "移民友好专业 TOP 10：学完就能走 PR", hint: "护理 / 教师 / IT / 工程" },
  { category: "CHOICE", title: "澳洲八大 QS 2026 排名变化", hint: "Melbourne 20 / Sydney 25" },

  // ════════════════════════════════════════
  // 避坑
  // ════════════════════════════════════════
  { category: "WARNINGS", trend: "⚠️", title: "移民路上最常见 10 大踩坑", hint: "学历造假 / 工作虚报 / 英语不够" },
  { category: "WARNINGS", trend: "⚠️", title: "500 签证 GS 拒签最常见 5 个原因", hint: "资金 / 学习规划 / 过往拒签" },
  { category: "WARNINGS", title: "中介坑你的 5 种套路，怎么识别", hint: "MARA 持牌 + 合同细节" },
  { category: "WARNINGS", title: "伴侣签证假结婚被抓的真实后果", hint: "3 年 re-entry ban" },

  // ════════════════════════════════════════
  // 情感共鸣
  // ════════════════════════════════════════
  { category: "EMOTION", title: "留学第二年决定移民：我的心路历程", hint: "读者代入感强" },
  { category: "EMOTION", title: "30 岁决定辞职来澳读研，值得吗", hint: "家庭 + 职业规划纠结" },
  { category: "EMOTION", title: "父母不理解我留学移民的选择", hint: "家庭沟通共鸣" },
  { category: "EMOTION", title: "五年后悔不当初：那些没选移民的留学生", hint: "反思 + 警示" },
];

export const CATEGORY_LABELS: Record<TopicCategory, { label: string; emoji: string }> = {
  VISA: { label: "签证政策", emoji: "🛂" },
  SKILLED: { label: "技术移民", emoji: "💼" },
  STUDY: { label: "留学申请", emoji: "🎓" },
  GRADUATE: { label: "毕业路径", emoji: "🚀" },
  COST: { label: "生活成本", emoji: "💰" },
  STORIES: { label: "真实案例", emoji: "📖" },
  CHOICE: { label: "选校选专业", emoji: "🏫" },
  WARNINGS: { label: "避坑指南", emoji: "⚠️" },
  EMOTION: { label: "情感共鸣", emoji: "💭" },
};
