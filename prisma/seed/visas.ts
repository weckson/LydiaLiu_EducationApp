// 澳洲签证知识库种子数据
//
// ⚠️ 重要提醒：
// 以下内容基于 2025 年 12 月前的公开信息整理，仅作为初始骨架。
// 澳洲移民政策、分数、配额、职业清单变化频繁，Lydia 必须在使用前
// 逐条核对 immi.homeaffairs.gov.au 官方信息，并根据实际案例更新。
//
// 每条包含 sourceUrl 指向官方页面，方便快速核对。

import type { SeedEntry } from "./types";

export const VISAS: SeedEntry[] = [
  // ══════════════════════════════════════════════════════════
  // 分类总览
  // ══════════════════════════════════════════════════════════
  {
    title: "澳洲签证体系总览（分类速查）",
    category: "签证总览",
    tags: ["总览", "分类", "速查"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing",
    contentMd: `# 澳洲签证体系总览

澳洲签证种类繁多，按**目的和申请路径**主要分为以下几大类：

## 1. 技术移民（Skilled Migration）
- **189** Skilled Independent（独立技术移民，永居）
- **190** Skilled Nominated（州担保技术移民，永居）
- **491** Skilled Work Regional（偏远地区技术移民，5 年临居）
- **191** Permanent Residence (Skilled Regional)
- **858** Global Talent（全球人才永居）

## 2. 雇主担保（Employer Sponsored）
- **482** Skills in Demand（原 TSS，2025.12.7 新版上线）
- **186** Employer Nomination Scheme（雇主担保永居）
- **494** Skilled Employer Sponsored Regional（偏远地区雇主担保）
- **400 / 407** 短期工作类

## 3. 学生与毕业生（Student & Graduate）
- **500** 学生签证
- **485** 毕业生工作签证（Post-Study Work）
- **590** 学生监护人
- **476** 技术认可毕业生

## 4. 家庭团聚（Family）
- **820/801** 境内伴侣（临+永）
- **309/100** 境外伴侣（临+永）
- **300** 未婚夫妻
- **143 / 103 / 864 / 870** 父母签证系列
- **101 / 802** 子女签证

## 5. 商业投资（Business & Investment）
- **188** Business Innovation and Investment（临居）
- **888** Business Innovation Permanent（永居）
- **132** 已于 2024 年关闭

## 6. 访客 / 短期停留
- **600** Visitor、**601** ETA、**651** eVisitor
- **462** Work and Holiday（对中国大陆开放）
- **417** Working Holiday（对港澳台开放）

## 7. 过桥签证（Bridging）
- **BVA-BVE**（010 / 020 / 030 / 040 / 050）

## 8. 人道主义
- **866** Protection、**200-204** 难民类

## 2025-26 年度配额关键数字
- 永居配额：**185,000 席位**
- 技术类占约 71%
- 家庭类占约 28%

> 📌 使用建议：先按客户诉求（读书/工作/团聚/投资）判断大类，再细分具体子类。`,
  },

  // ══════════════════════════════════════════════════════════
  // 技术移民
  // ══════════════════════════════════════════════════════════
  {
    title: "189 独立技术移民签证（Skilled Independent Visa）",
    category: "技术移民",
    tags: ["189", "技术移民", "永居", "EOI"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
    contentMd: `# 189 独立技术移民（PR）

## 基本信息
- **类型**：永久居留（PR）
- **有效期**：5 年旅行便利
- **费用**：主申约 AUD 4,765（2025 年度）
- **处理时间**：中位数约 6-12 个月

## 核心要求
1. 年龄：**45 岁以下**
2. 职业在 **MLTSSL**（长期战略技术职业列表）上
3. 通过相关机构的**职业评估**（如 ACS、EA、VETASSESS）
4. **英语**达到 Competent 水平（雅思四个 6 或等同）
5. **分数测试**通过 65 分最低门槛（实际获邀分数通常更高）
6. 通过**健康和品行**要求

## 2025-26 关键信息
- 189 获邀分数长期维持在 **85+**（热门职业可能更高）
- 2025-26 年度 189 类别计划数量**大幅收紧**，主要邀请 NZ 途径申请者
- 2026 年 7 月可能**积分制大改**（已立法讨论）

## 常见坑
- 职业评估有效期 3 年，避免临近到期才递 EOI
- 配偶加分要求配偶职业也在 SOL 上且英语达标
- 分数不够时优先提升 PTE/雅思分数（20 分技术英语加分）

## 适合人群
单身或配偶无加分、分数高、职业竞争激烈（IT/工程）的申请人。`,
  },
  {
    title: "190 州担保技术移民签证（Skilled Nominated Visa）",
    category: "技术移民",
    tags: ["190", "州担保", "技术移民", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190",
    contentMd: `# 190 州担保技术移民（PR）

## 基本信息
- **类型**：永居
- **获州担保**：额外 **+5 分**
- **义务**：通常需承诺在提名州居住/工作约 2 年

## 核心要求
与 189 类似，但有三个区别：
1. 职业在**目标州的提名清单**上（各州不同，每年更新）
2. 获得州/领地政府**提名**（EOI → 州挑选 → 获邀）
3. 职业清单范围更广（STSOL + MLTSSL 均可）

## 各州特点速记（仅供参考，每年变化）
| 州 | 特点 |
|---|---|
| **VIC 维多利亚** | 偏爱 IT、护理、教师；要求墨尔本本地工作经验 |
| **NSW 新南威尔士** | 各行业均有，偏爱本地毕业生和高分 |
| **QLD 昆士兰** | 偏爱本地毕业生和 offshore 高分 |
| **SA 南澳** | 对本地留学生友好，清单广 |
| **TAS 塔斯马尼亚** | 对本地毕业生（Cat 1）和长期居住者友好 |
| **WA 西澳** | 偏爱本地工作经验和关键岗位 |
| **ACT 首都领地** | 用 Canberra Matrix 评估综合分 |
| **NT 北领地** | 对 offshore 申请人相对开放，需有 NT 联系 |

## 2025-26 重点变化
- 州担保配额**全面收紧**，多个州暂停了 offshore 申请
- 很多州提高了**本地工作年限**要求（如 VIC 要求当前在 VIC 工作）

## 常见坑
- 提名获批后 **14 天内**需递交 190 签证申请
- 居住承诺非强制法律义务但会影响后续家人申请
- 各州政策一年多变，每次报案前都要看官网最新公告`,
  },
  {
    title: "491 偏远地区技术移民签证（Skilled Work Regional Provisional）",
    category: "技术移民",
    tags: ["491", "偏远地区", "临居", "转PR"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-work-regional-491",
    contentMd: `# 491 偏远地区技术移民（5 年临居）

## 基本信息
- **类型**：临时签证（5 年有效）
- **担保方**：州/领地政府**或**偏远地区的亲属
- **加分**：**+15 分**（比 190 的 +5 更多）
- **转 PR 路径**：通过 **191 签证**（持 491 满 3 年且年收入达标）

## 核心要求
- 职业在提名州 491 清单上
- 通过职业评估
- 分数达线（含担保加分后 65+）
- 承诺在**指定偏远地区**工作和居住
- 英语 Competent 水平

## 偏远地区定义
除 **Sydney、Melbourne、Brisbane** 外的所有地区都算偏远（2022 年起 Perth、Gold Coast、Adelaide 等也被纳入偏远）。

## 191 转 PR 的硬性要求
1. 持 491 满 **3 年**
2. 其中至少连续 **3 个税务年**，年应税收入不低于 **AUD 53,900**（2024 指标，每年调整）
3. 全程居住在偏远地区
4. 符合签证条件（无违反居住地要求）

## 2025-26 变化
- 491 名额**相对宽松**，多个州仍在接收 offshore 申请
- 部分州（如 SA、TAS）对本地毕业生几乎无门槛

## 常见坑
- 491 持有期间不能长期离开偏远地区
- 转 191 的收入证明必须来自**同一偏远地区的雇主**
- 配偶持副签可以工作但需满足同样的地理限制

## 适合人群
分数不够 189/190、愿意到偏远地区（如 Adelaide、Hobart、Perth、Canberra）发展的申请人。`,
  },
  {
    title: "191 偏远地区技术移民永居签证",
    category: "技术移民",
    tags: ["191", "491转PR", "偏远地区", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-regional-permanent-resident-191",
    contentMd: `# 191 Permanent Residence (Skilled Regional)

## 定位
专为 **491 和 494 持有人**设计的永居通道，2022 年 11 月 16 日开始生效。

## 核心要求
1. 在申请前持有 **491 或 494** 签证
2. 已持有上述签证至少 **3 年**
3. 在签证有效期内至少 **3 个税务年度**达到收入门槛（AUD 53,900/年，每年随 TSMIT 调整）
4. 遵守签证条件：住在偏远地区、按雇主要求工作
5. 通过健康和品行

## 关键要点
- **无年龄限制**、**无新分数测试**、**无新职业评估**
- 无需再接受州提名
- 191 获批后即是永居，无额外居住义务

## 常见坑
- **收入门槛必须是 taxable income**，Centrelink 收入、自雇未报税等不算
- 3 个税务年度必须在**持有 491 期间**，读 500 或持其他签证期间不算
- 配偶和子女需与主申同时达标（只主申收入达标即可）

## 处理时间
目前申请量激增，处理时间 6-15 个月，官方中位数持续波动。`,
  },
  {
    title: "858 全球人才签证（Global Talent Visa）",
    category: "技术移民",
    tags: ["858", "全球人才", "永居", "高端"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/global-talent-858",
    contentMd: `# 858 Global Talent Visa（永居）

## 定位
面向在**目标行业**中具有国际公认成就的高端人才，一步到位永居。

## 目标行业（2024 起调整）
- 农业科技（AgTech）
- 健康产业（Health）
- 先进制造（Advanced Manufacturing）
- 金融科技（FinTech）
- 网络安全（Cyber Security）
- 能源与矿产技术
- 数字科技（DigiTech）
- 太空与先进制造
- 量子/AI 等关键技术

## 核心要求
1. **国际认可的成就**（博士、论文、奖项、专利、公司估值等）
2. 现任专业处于领军位置
3. 能证明收入或潜在收入达到 **Fair Work High Income Threshold**（2025 年 AUD 183,100）
4. 需**提名人**（澳籍公民/PR 或相关组织）
5. 45 岁以下（杰出博士生或特殊情况可豁免）

## 流程
1. 递交 **EOI**（Expression of Interest）
2. 内政部筛选后发**邀请函**
3. 邀请函到手后 60 天内递交签证申请

## 2025-26 变化
- 名额**大幅缩减**（原 15,000 → 几千）
- 评审更严格，材料需更扎实

## 适合人群
高端 IT、科研人员、博士后、成功创业者。不适合普通技术工种。`,
  },

  // ══════════════════════════════════════════════════════════
  // 雇主担保
  // ══════════════════════════════════════════════════════════
  {
    title: "482 Skills in Demand 签证（SID，2025年新版）",
    category: "雇主担保",
    tags: ["482", "SID", "雇主担保", "临居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482",
    contentMd: `# 482 Skills in Demand（临时雇主担保，2025.12.7 新版）

## 重要变化
2025 年 12 月 7 日起，**旧版 TSS 482 正式替换为 Skills in Demand（SID）**，是近年雇主担保移民最大改革。

## 三个收入流（Stream）
| 流 | 收入门槛 | 停留 | 适用岗位 |
|---|---|---|---|
| **Specialist Skills** | AUD 141,210+ | 4 年 | 高端专业 |
| **Core Skills** | AUD 76,515+ | 4 年 | CSOL 清单职业 |
| **Essential Skills** | 待定 | 待定 | 护理/农业等（尚在设计）|

## 申请要求
1. 获得**经核准的雇主（SBS）**提名
2. 职业在 **CSOL**（Core Skills Occupation List）或 Specialist 豁免
3. **1 年相关工作经验**（过去 5 年内，原来是 2 年——重大放宽）
4. 英语：通常雅思总分 5 + 单项 4.5（某些职业要求更高）
5. 通过职业评估（部分职业）
6. 健康和品行

## 转永居（186 TRT）通道
- 持 482 为同一雇主工作满 **2 年**
- 即可申请 186 TRT（原来的 3 年已经缩短）
- **无年龄限制的 TRT 豁免**仅限 Medical Practitioner 和科研类

## 与旧 TSS 的关键区别
- 工作经验要求：2 年 → **1 年**
- 工龄窗口：10 年 → 5 年
- 职业清单：STSOL/MLTSSL/ROL → **统一 CSOL + Specialist**
- 换雇主：180 天宽限期（新政保留）

## 常见坑
- CSOL 仍在动态调整中，建议申请前核对最新版
- 名义职位（Nominated Occupation）必须和实际工作一致
- 雇主需证明"本地招聘测试（LMT）"和"劳动市场合法性"`,
  },
  {
    title: "186 雇主担保永居签证（Employer Nomination Scheme）",
    category: "雇主担保",
    tags: ["186", "ENS", "永居", "雇主担保"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186",
    contentMd: `# 186 ENS（雇主担保永居）

## 三大 Stream
1. **Direct Entry（DE）**：未持 482 直接申请
2. **Temporary Residence Transition（TRT）**：持 482/SID 工作满一定年限转 PR
3. **Labour Agreement**：通过劳工协议申请

## Direct Entry 要求
- 年龄 **45 岁以下**（高收入豁免：过去 3 年有 2 年收入超 AUD 183,100）
- 职业在 **ENSOL**（现并入 CSOL）
- **3 年**相关全职技术工作经验
- 通过职业评估
- 英语：IELTS 各 6 或等同
- 健康和品行

## TRT 要求（2025 年新政）
- 持 482/SID 为同一雇主工作满 **2 年**（原 3 年）
- 雇主仍是提名时的雇主（或子公司）
- 年龄 45 以下（同样有高收入豁免）
- 英语 Competent
- **无需重新职业评估**

## 费用
- 主申 VAC：约 AUD 4,770
- 雇主需支付 SAF（培训基金）：小企业每年 AUD 1,200，大企业每年 AUD 1,800
- 共计几万澳币

## 关键提示
- TRT 路径是目前最稳妥的移民路径之一
- DE 路径审批更严，对雇主和申请人要求更高
- 186 获批后可立即离境，但建议至少和雇主维持合理工作期以避免触发审查`,
  },
  {
    title: "494 偏远地区雇主担保签证",
    category: "雇主担保",
    tags: ["494", "偏远地区", "临居", "雇主担保"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-employer-sponsored-regional-494",
    contentMd: `# 494 偏远地区雇主担保（5 年临居）

## 定位
494 替代了旧 187 RSMS，服务偏远地区雇主和申请人，通过 **191 签证**转永居。

## 核心要求
1. 45 岁以下
2. 获偏远地区雇主提名
3. 职业在 **CSOL**（或 ROL）
4. **3 年**相关工作经验
5. 英语 Competent
6. 通过职业评估

## 偏远地区定义
**Sydney、Melbourne、Brisbane 以外**的所有地区均可（包括 Perth、Gold Coast、Adelaide、Canberra 等）。

## 转 191 永居
- 持 494 满 3 年
- 其中 3 个税务年度年应税收入达标（2024 年 AUD 53,900）
- 全程在偏远地区居住和工作
- 与同一或偏远地区雇主工作关系稳定

## 与 186 的区别
| 项目 | 186 | 494 |
|---|---|---|
| 直接永居 | ✅ | ❌（走 191） |
| 地区限制 | 无 | 偏远地区 |
| 工作经验 | 3 年（DE） | 3 年 |
| 工作时长 | 2 年（TRT） | 3 年 |

## 适合情况
雇主在偏远地区或无法提供 186 DE 所需工龄的申请人。`,
  },
  {
    title: "400 短期工作签证（Temporary Work Short Stay Specialist）",
    category: "雇主担保",
    tags: ["400", "短期", "临时工作"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-work-short-stay-specialist-400",
    contentMd: `# 400 短期工作签证

## 定位
针对**高度专业化的短期任务**（通常 3 个月以内，最长 6 个月）。

## 常见场景
- 跨国公司专家来澳培训、安装设备
- 艺术家/运动员短期演出或比赛
- 应邀来澳参与特定项目的顾问

## 要求
- 工作任务具体、限期、非持续性
- 不能由本地劳动力合理补充
- 有海外常住地

## 关键限制
- **不能**转为长期雇主担保
- 每次停留通常不超过 6 个月
- 配偶/家属可申请副签`,
  },
  {
    title: "407 培训签证（Training Visa）",
    category: "雇主担保",
    tags: ["407", "培训", "临居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/training-visa-407",
    contentMd: `# 407 培训签证

## 定位
为海外人员提供在澳**结构化工作场所培训**，最长 2 年。

## 三种培训类型
1. **职业培训**（Occupational Training）：提升现有技能
2. **教育机构实习**（Workplace-based）
3. **能力发展**（Capacity Building）

## 要求
- 18 岁以上
- 有澳方培训担保人
- 培训计划结构化、详细
- 英语达标（通常雅思 4.5）
- 健康和品行

## 常见用途
- 海外专业人员获取澳洲认证（如护士、医生过渡）
- 公司内部调动的培训前奏`,
  },

  // ══════════════════════════════════════════════════════════
  // 学生与毕业生
  // ══════════════════════════════════════════════════════════
  {
    title: "500 学生签证（Student Visa）",
    category: "学生签证",
    tags: ["500", "学生", "留学", "GS"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    contentMd: `# 500 学生签证

## 基本信息
- **类型**：临时签证
- **停留**：课程结束后 2 个月内
- **最新费用**：AUD 2,000（2025 年 7 月涨价）

## 核心要求
1. **CoE**（Confirmation of Enrolment）入学确认书
2. 通过 **Genuine Student (GS)** 要求（2024.3.23 起替代 GTE）
3. 英语达标（雅思/PTE/TOEFL，具体要求看课程）
4. 足够的**经济担保**（学费 + 生活费 AUD 29,710/年 + 往返机票）
5. **OSHC** 海外学生健康保险
6. 健康和品行检查

## 关键变化（2024-2025）
| 变化 | 说明 |
|---|---|
| **GS 替代 GTE** | 不再要求学生证明"读完会回国"，转而评估学习规划真实性 |
| **英语要求提高** | 500：雅思 5.5 → 6.0；590：5.0 → 5.5 |
| **经济担保上涨** | 24,505 → 29,710 AUD/年 |
| **风险等级评估** | 各院校/国籍风险等级影响审批难度 |

## GS 陈述要点
1. 个人背景与现有学历
2. 选择该课程/澳洲的原因
3. 学习计划与职业规划
4. 所选课程与未来目标的关联
5. 澳洲/祖国的家庭和社会联系

## 常见拒签原因
- GS 陈述泛泛、逻辑不通
- 经济担保存期/来源说不清
- 课程跨度大（跨专业）无合理解释
- 过往拒签或移民意图明显

## 工作权限
- 上课期间每 2 周最多 **48 小时**
- 假期内可全职`,
  },
  {
    title: "485 毕业生工作签证（Temporary Graduate Visa）",
    category: "学生签证",
    tags: ["485", "毕业生", "PSW", "临居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485",
    contentMd: `# 485 Post-Study Work（毕业生工签）

## 两个 Stream
1. **Post-Vocational Education Work Stream**（原 Graduate Work Stream）
   - 需职业评估 + 职业在 MLTSSL 上
   - 停留 18 个月
2. **Post-Higher Education Work Stream**（原 PSW Stream）
   - 学士/硕士/博士，无需职业评估
   - 停留 2-3 年（2024 新政后）

## 2024-2025 新政关键
- **年龄上限**从 50 → **35 岁**（硕士研究型/博士 50 岁）
- **英语要求提高**：总分 6.5、各项 5.5
- **停留时间调整**：
  - Bachelor / Coursework Master：**2 年**（原 3-4 年）
  - Research Master / PhD：3 年（偏远地区 +1-2 年）
- **偏远地区延长**取消部分区域（二类区现在也享受）

## 核心要求
- 2 年内完成符合 CRICOS 要求的课程
- 持有或在 6 个月内持有学生签证
- 澳洲境内递交（除个别例外）
- 英语达标
- OVHC 健康保险

## 关键用途
- 毕业后积累本地工作经验以提升技术移民分数
- 衔接 482 雇主担保或 190/491 州担保

## 常见坑
- 毕业证/学术完成信必须在**申请前**拿到
- CoE 和 student visa 必须吻合，中途换专业要谨慎
- 一生只能申请一次 485（极个别例外）`,
  },
  {
    title: "590 学生监护人签证（Student Guardian Visa）",
    category: "学生签证",
    tags: ["590", "学生监护人", "陪读"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-guardian-590",
    contentMd: `# 590 学生监护人签证

## 定位
允许海外**18 岁以上近亲**（通常父母）陪同未满 18 岁的学生在澳读书。

## 核心要求
- 与学生是直系亲属（父母、祖父母、监护人）
- 有**充足经济能力**支持学生和自己（AUD 24,505+/年）
- **无陪同子女**（除非特殊原因）
- 英语雅思 4.5+（最新提高）
- 海外健康保险
- GS 要求
- 品行和健康

## 关键限制
- **不能工作**（每 2 周不超 40 小时，仅限学生达 18 岁后）
- **不能读超过 3 个月的注册课程**
- 必须和被监护学生同住

## 适合场景
- 未成年学生（通常小学或初中）
- 文化/语言原因需家人照顾的年幼学生`,
  },

  // ══════════════════════════════════════════════════════════
  // 家庭团聚
  // ══════════════════════════════════════════════════════════
  {
    title: "820 / 801 境内伴侣签证（Partner Onshore）",
    category: "家庭团聚",
    tags: ["820", "801", "伴侣", "境内"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-onshore-820-801",
    contentMd: `# 820 / 801 境内伴侣签证

## 两段式
- **820**：临时签证（递交时申请，等待 PR）
- **801**：永居（通常在 820 获批 2 年后审）

## 核心要求
- 担保人是澳籍公民、PR 或合格 NZ 公民
- **真实持续的婚姻或事实婚姻（De Facto）关系**
- 事实婚姻至少 12 个月同居（或注册关系）
- 递交时申请人在澳洲境内
- 健康和品行

## 证据四要素
1. **经济共同**：共同账户、账单、贷款
2. **家庭共同**：同住证据、子女、家庭合影
3. **社会共同**：共同社交、亲友证言
4. **相互承诺**：长期规划、共同决策

## 费用
主申 VAC：约 AUD 9,095（2025 年度），子女附加。
**一次性缴费覆盖 820 + 801**。

## 处理时间
- 820 中位数 12-18 个月
- 802 进入审核时间另算
- 总体完成两段需 2-3 年

## 关键变化与坑
- 婚姻真实性审查严格，早年照片/聊天记录都要留存
- **家暴条款**：即使关系破裂仍可申请 PR（需证据）
- 担保人有**担保记录冷却期**（之前担过过关才能再担）`,
  },
  {
    title: "309 / 100 境外伴侣签证（Partner Offshore）",
    category: "家庭团聚",
    tags: ["309", "100", "伴侣", "境外"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-offshore-309-100",
    contentMd: `# 309 / 100 境外伴侣签证

## 两段式
- **309**：临时（递交时和获批时都在海外）
- **100**：永居

## 核心要求
与 820/801 相似：
- 担保人澳籍/PR
- 真实持续关系（婚姻或事实婚姻）
- **申请人递交时必须在澳洲境外**
- 健康和品行

## 与 820/801 的区别
| 项目 | 309/100 | 820/801 |
|---|---|---|
| 递交时位置 | 境外 | 境内 |
| 获批后入境 | 需等 309 | 持桥签留在境内 |
| 处理时间 | 通常略快 | 略慢 |
| 费用 | 相同 | 相同 |

## 策略建议
- 申请人已在澳读书工作，优先 820
- 申请人在海外且近期不急于入境，优先 309
- 临时签证有效时（如 482、500），可以直接在澳递交 820，无需出境

## 常见坑
- 递交时的地理位置判定严格，递交那一刻必须在海外
- 证据收集从关系开始起持续进行，不要临近递交才准备`,
  },
  {
    title: "300 未婚夫妻签证（Prospective Marriage Visa）",
    category: "家庭团聚",
    tags: ["300", "未婚夫妻", "境外"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/prospective-marriage-300",
    contentMd: `# 300 未婚夫妻签证

## 定位
允许申请人来澳与担保人**结婚**，有效期 9-15 个月。婚后再申请 820/801。

## 核心要求
- 18 岁以上
- 担保人为澳籍/PR
- 双方**见过面、认识、保持真实关系**
- 承诺在签证有效期内结婚
- 递交时申请人**境外**

## 用途场景
- 还未同居 12 个月，不符合事实婚姻
- 在不同国家，难以在同一时间递交伴侣签证

## 后续步骤
1. 入境后在签证有效期内结婚
2. 在澳递交 820/801
3. 完成两段式伴侣签证流程

## 关键坑
- 首次见面后的交流证据要丰富
- 结婚仪式必须在 300 签证有效期内完成
- 子女同递需包含在原申请中`,
  },
  {
    title: "143 付费类父母移民（Contributory Parent）",
    category: "家庭团聚",
    tags: ["143", "父母", "付费", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/contributory-parent-143",
    contentMd: `# 143 付费类父母永居签证

## 定位
**一步到位永居**，费用高但等待时间相对较短（相对 103）。

## 核心要求
1. **Balance of Family Test**：一半以上子女在澳定居
2. 担保人为合格的子女（澳籍/PR 满 2 年）
3. 健康和品行
4. **经济担保金**（Assurance of Support）：AUD 10,000+ 押金，10 年

## 费用结构（2025 年度）
- **VAC 1**（递交时）：约 AUD 4,990
- **VAC 2**（获批前）：约 **AUD 43,600/人**（核心支出）
- 健康保险、AoS 押金等另算
- 一家两位父母 + 保险预估 **10-12 万澳币**

## 处理时间
- 官方：**12-15 年**
- 实际近年：部分申请约 7-9 年完成

## 关键策略
- 如果急需见父母：先申请 870 临时父母签证
- 排队期间可用 600 访客签来往
- AoS 押金 10 年后返还

## 替代方案
- **173**：173 临居 → 143 PR，可分期付款但总费用更高
- **103**：几乎不收钱但排队 20-30 年
- **870**：临居 3-5 年，无法转 PR 但可多次续签`,
  },
  {
    title: "870 付费担保父母临时签证（Sponsored Parent Temporary）",
    category: "家庭团聚",
    tags: ["870", "父母临签", "临居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/sponsored-parent-temporary-870",
    contentMd: `# 870 付费担保父母临时签证

## 定位
允许父母在澳**停留 3 年或 5 年**，可续签至最长 10 年。**不能**转永居。

## 核心要求
- 担保人（子女）需先通过 **Parent Sponsor** 审核
- 担保人过去 12 个月应税收入达 **AUD 83,454**（2024 年度，每年调整）
- 父母健康保险、品行
- 担保人承诺承担一切公共开支

## 费用
- 3 年签：AUD 5,735
- 5 年签：AUD 11,470

## 优缺点
✅ 相对 143 便宜、快批（通常几个月）
✅ 可多次来往
❌ **不能工作**
❌ **不能转 PR**
❌ 累计最多 10 年

## 适合场景
- 子女收入达标但不想付 143 几十万
- 父母身体差需长期陪伴但不要求永居
- 搭配 143 排队期间的过渡方案`,
  },
  {
    title: "103 普通类父母签证（Parent Visa）",
    category: "家庭团聚",
    tags: ["103", "父母", "非付费", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/parent-103",
    contentMd: `# 103 普通类父母移民

## 定位
**费用极低、排队极长**的父母永居类别。

## 核心要求
- Balance of Family Test（一半以上子女在澳）
- 担保人合格
- 健康和品行
- 经济担保

## 费用与时间
- 总费用约 AUD 5,000+
- 排队时间官方估 **30 年+**
- 申请人通常需递交时年龄允许等到审结

## 现实考虑
- 因等待时间过长，**大部分人选择 143 付费类**
- 递交后可持 600 多次访签来回探亲
- 适合经济紧张、年纪尚可的父母作为"占位"`,
  },
  {
    title: "101 / 802 子女签证（Child Visa）",
    category: "家庭团聚",
    tags: ["101", "802", "子女", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/child-101",
    contentMd: `# 子女签证 101（境外）/ 802（境内）

## 定位
澳籍/PR 父母为**未婚、未独立**的亲生/继子女/收养子女申请永居。

## 两个子类
- **101**：申请人递交时**在境外**
- **802**：申请人递交时**在境内**

## 核心要求
1. 未满 18 岁，或
2. 18-25 岁全日制在读，或
3. 25 岁以上但身心障碍需被扶养
4. 未婚、未和伴侣同居
5. 担保人为亲生或合法父母

## 关键注意
- 收养子女需证明合法领养手续
- 继子女需原生父母授权或已过世
- 越晚申请风险越大（满 18 岁后材料更复杂）

## 费用
- 主申：约 AUD 3,135
- 处理时间：中位数 12-30 个月（波动较大）`,
  },

  // ══════════════════════════════════════════════════════════
  // 商业投资
  // ══════════════════════════════════════════════════════════
  {
    title: "188 商业创新与投资临居签证",
    category: "商业投资",
    tags: ["188", "商业投资", "临居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/business-innovation-and-investment-188",
    contentMd: `# 188 商业创新与投资（临居）

## 重大变化（2024 年 7 月）
- **188 签证于 2024 年 7 月 1 日全面暂停新申请**
- 政府计划用"国家创新签证（NIV）"替代
- **已递交的申请继续审理**，已获 188 的可按原规则转 888

## 曾经的 Stream（供参考）
| Stream | 核心要求 |
|---|---|
| **188A Innovation** | 生意背景 + 80 万净资产 + 营业额 |
| **188B Investor** | 管理投资 + 250 万澳币投资 |
| **188C Significant Investor（SIV）** | 500 万澳币合规投资 |
| **188E Entrepreneur** | 创新项目融资 |

## 当前策略建议
- 新客户应关注即将推出的 **NIV 国家创新签证**
- 已持 188 的客户：维持生意 → 按计划申请 888
- 海外投资型客户：考虑 858 全球人才

## 建议关注
定期查看 Home Affairs 商业移民页面更新，NIV 预计将对申请人投入、创新性、技术含量提出更高要求。`,
  },
  {
    title: "888 商业创新与投资永居签证",
    category: "商业投资",
    tags: ["888", "商业投资", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/business-innovation-and-investment-888",
    contentMd: `# 888 商业创新与投资（永居）

## 定位
188 临居持有人满足持续要求后申请的永居签证。188 虽已关停新申请，**888 仍在正常审理**。

## 核心要求（按持有的 188 Stream 区别）

### 188A → 888A
- 持 188A 满 **2 年**（2024 年 7 月前新政延长至 3 年）
- 在澳运营生意至少 2 年
- 营业额、资产、员工等符合要求

### 188B → 888B
- 投资 250 万澳币管理基金至少 **4 年**
- 保持合规

### 188C → 888C
- 500 万澳币合规投资满 4 年
- 每年居住至少 40 天（主申）或 180 天（配偶可替代）

## 关键提醒
- 投资或生意**不能提前变现**否则取消签证
- 投资组合需持续符合合规框架
- 配偶可用于满足居住要求（188C）`,
  },

  // ══════════════════════════════════════════════════════════
  // 访客 / 度假
  // ══════════════════════════════════════════════════════════
  {
    title: "600 访客签证（Visitor Visa）",
    category: "访客签证",
    tags: ["600", "访客", "旅游", "短期"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600",
    contentMd: `# 600 访客签证

## 五大 Stream
1. **Tourist**（旅游）- 中国大陆申请人常用
2. **Business Visitor**（商务访问）
3. **Sponsored Family**（担保类探亲）
4. **Approved Destination Status**（ADS 团队旅游）
5. **Frequent Traveller**（常旅客）

## 核心要求
- 真实访问目的
- 充足经济能力
- 健康和品行
- 符合回国约束（Bona fide visitor）

## 费用
- Tourist：AUD 190（2025 年涨价后）
- 其他 Stream 费用略高

## 停留和有效期
- 通常单次停留 3 个月（可申请 6 或 12 个月）
- 签证有效期可为 **1 年多次、3 年多次、5 年多次、10 年多次**
- 中国大陆申请人常获 **3 年或 5 年多次**（2016 年后放开 10 年给特定情况）

## 关键 Condition
- **8503 No Further Stay**：境内不能申请其他签证（常加于旅游签）
- 加了 8503 的人必须离境才能申请 482/820 等

## 拒签风险
- 过往拒签记录
- 经济证据不足
- 祖国约束力弱（未婚、无房无工作）
- 探亲未提供有效邀请函`,
  },
  {
    title: "462 工作度假签证（Work and Holiday）",
    category: "访客签证",
    tags: ["462", "打工度假", "青年", "中国"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462",
    contentMd: `# 462 Work and Holiday（中国大陆青年可申请）

## 定位
**18-30 岁**青年（含中国大陆）来澳打工+度假体验，最长 **1 年**，可续至 3 年（满足条件）。

## 中国大陆申请要求（特有）
- 年龄 **18-30**
- 持中国大陆护照
- **本科或以上学位**
- **英语达标**：雅思 4.5+ 或等同
- 存款证明：AUD 5,000+
- 无 18 岁以下子女随行
- 健康和品行
- **配额限制**：每年 5,000 个名额

## 工作权限
- 每 **6 个月**最多为同一雇主工作
- 大部分行业开放
- 学习最多 4 个月

## 续签条件（第二、第三年）
- 第一年需完成 **88 天**在偏远地区的指定行业工作（如农场、建筑、旅游）
- 第二年完成 **6 个月**指定工作可申请第三年

## 常见坑
- 配额抢手，开放时秒光
- 学历和英语证明必须符合要求
- 不能转学生签（部分情况除外）
- 8503 不适用，可在境内转其他签证`,
  },
  {
    title: "417 工作度假签证（Working Holiday，对港澳台）",
    category: "访客签证",
    tags: ["417", "打工度假", "港澳台"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417",
    contentMd: `# 417 Working Holiday（港澳台护照持有人）

## 与 462 的关键区别
| 项目 | 417 | 462 |
|---|---|---|
| 对象 | 港澳台等发达国家/地区 | 中国大陆等 |
| 配额 | **无限制** | 有限 |
| 学历要求 | **无** | 本科以上 |
| 英语要求 | 简单功能性 | 雅思 4.5 |

## 核心要求
- 18-30 岁（部分国家放开 35）
- 持合格护照
- 存款 AUD 5,000
- 健康和品行

## 其他条款类似 462
- 最长 1 年，可续至 3 年
- 续签需完成偏远地区指定工作
- 每雇主最多 6 个月`,
  },
  {
    title: "601 电子访客签证（ETA）/ 651 eVisitor",
    category: "访客签证",
    tags: ["601", "651", "ETA", "免签"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
    contentMd: `# 601 ETA / 651 eVisitor

## 对象
- **601 ETA**：美国、加拿大、日本、韩国、新加坡、马来西亚等护照
- **651 eVisitor**：欧盟及欧洲多国护照
- 🚫 **中国大陆护照不能申请**，需申请 600

## 特点
- **在线几分钟获批**
- 12 个月多次入境
- 每次停留最长 3 个月
- 主要用于**旅游或商务访问**
- 651 免费，601 收 AUD 20 服务费

## 使用注意
- 仅限旅游/商务，不能学习正式课程
- 不能工作（除非公司外派会议）
- 停留超 3 个月需申请 600`,
  },

  // ══════════════════════════════════════════════════════════
  // 过桥签证
  // ══════════════════════════════════════════════════════════
  {
    title: "过桥签证总览（Bridging Visas BVA-BVE）",
    category: "过桥签证",
    tags: ["过桥签证", "BVA", "BVB", "BVC", "BVD", "BVE"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/bridging-visas",
    contentMd: `# 过桥签证（Bridging Visas）

## 定位
**过桥签证是等待实质签证审批期间维持合法身份**的临时工具，**不是独立申请签证**。

## 五个主要类型

### BVA 010（Bridging A）
- **境内递交**实质签证申请时**自动获得**
- 通常保留原签证的权利（工作、学习）
- **不能离境**，离境即失效
- 旧签证到期后 BVA 自动生效

### BVB 020（Bridging B）
- 持 BVA 需要离境时申请，**允许离境和返澳**
- 有效期几个月
- 需提供出境理由

### BVC 030（Bridging C）
- 境内递交申请但**原签证已无效**时获得
- 通常**无工作权限**（可另申请）
- 不能离境

### BVD 040 / 041（Bridging D）
- **过渡性**：签证即将到期且即将申请但暂未递交
- 通常 5 天内需要采取行动
- 紧急用途

### BVE 050 / 051（Bridging E）
- 针对**非法滞留者或即将离境者**
- 允许短期合法化身份
- 通常伴随驱逐前的**安排离境**

## 重要注意
- 过桥签证的**工作权限需单独确认**
- 看 VEVO 或批准信确认条款
- 变更不当可能触发 re-entry ban`,
  },

  // ══════════════════════════════════════════════════════════
  // 其他关键签证
  // ══════════════════════════════════════════════════════════
  {
    title: "866 保护签证（Protection Visa）",
    category: "人道主义",
    tags: ["866", "保护", "难民", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/protection-866",
    contentMd: `# 866 保护签证

## 定位
境内合法持签人面临**遭受迫害的风险**可申请保护签证，获批后直接永居。

## 核心要求
- 申请时在澳洲境内且持合法签证
- 符合 **1951 年难民公约**定义（基于种族、宗教、国籍、特定社会群体、政治观点）
- 或符合**辅助保护**（遭酷刑、死刑、残忍待遇风险）
- 不属于排除条款（严重罪行等）

## 流程
1. 递交申请 + 详细声明
2. Home Affairs 面试
3. 获批则永居；不批可上诉至 AAT / 法院

## 常见坑
- **滥用保护通道会损害正常移民**，Home Affairs 近年严厉打击
- 申请过程长（2-5 年），且期间可能受限
- 拒签上诉失败有 re-entry ban

## 专业建议
保护签证属于高难度敏感类别，应由专业持牌代理或移民律师处理。`,
  },
  {
    title: "444 新西兰公民特殊签证（Special Category Visa）",
    category: "其他签证",
    tags: ["444", "新西兰", "SCV"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/special-category-visa-444",
    contentMd: `# 444 新西兰公民特殊签证

## 定位
NZ 公民入境时**自动获得**，允许在澳无限期居住和工作。

## 权益
- 可无限期居住、工作、学习
- Medicare、家庭津贴部分享受
- 可申请担保家人来澳

## 2023 新政重大变化
**2023 年 7 月 1 日起**，持 444 满 4 年的 NZ 公民可**直接申请澳洲公民身份**，无需先申请 189（NZ Stream）永居。这是数十年来最大改革。

## 常见操作
- 已在澳定居的 NZ 公民：直接走入籍路径
- 新抵澳的 NZ 公民：积累 4 年居住史后可入籍
- 家人（非 NZ）：可通过 461 签证获临居

## 注意
- 2001 年 2 月 26 日前抵澳的"Protected SCV"享有更多福利
- 福利和税务身份依"Resident for tax"判定`,
  },
  {
    title: "408 临时活动签证（Temporary Activity Visa）",
    category: "其他签证",
    tags: ["408", "临时活动", "运动员", "艺术家"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-activity-408",
    contentMd: `# 408 临时活动签证

## 适用场景
- 艺术家、娱乐行业人员
- 运动员参赛
- 宗教工作者
- 研究活动
- 特殊项目（COVID 期间曾用于关键行业）

## 核心要求
- 担保人担保
- 活动类别符合
- 经济担保
- 健康和品行

## 停留
通常 **3 个月到 2 年**，按活动性质定。

## 常见坑
- 活动类别不清导致申请失败
- 不能作为长期工作签的替代品
- 配偶/家属副签条件严格`,
  },
  {
    title: "476 技术认可毕业生签证（Skilled Recognised Graduate）",
    category: "学生签证",
    tags: ["476", "工程", "毕业生"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-recognised-graduate-476",
    contentMd: `# 476 Skilled Recognised Graduate

## 定位
针对**特定工程学位**的海外毕业生，获 18 个月工作权利，**无需澳洲学习经历**。

## 核心要求
- 毕业于**认可大学**（指定名单，主要为 QS top 100 工程相关）
- **工程本科或以上**
- 过去 **2 年内**毕业
- **31 岁以下**
- 英语 Competent
- 健康和品行

## 停留和权利
- 18 个月临居
- 工作学习无限制
- **不可续签，一生一次**

## 用途
在澳积累 1.5 年工作经验，冲击 482/186 或 189/190。

## 注意
认可大学名单定期更新，需核对 Home Affairs 最新版本。`,
  },
  {
    title: "887 偏远地区技术移民永居（老款 489 转 PR）",
    category: "技术移民",
    tags: ["887", "偏远地区", "489", "永居"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-regional-887",
    contentMd: `# 887 Skilled Regional（老 489 持有者转 PR）

## 定位
持旧 **489** 偏远地区签证满足条件后转永居。因 491 已推出，887 主要服务存量 489 持有人。

## 核心要求
- 曾持 489（2019 年前发放的）
- 在偏远地区**居住满 2 年**
- **工作满 1 年**（全职）
- 遵守签证条件（未违规）

## 注意
- **不涉及年龄、英语重审**
- 目前基本已停止新申请，仅审存量

## 与 191 的区别
887 服务 489 持有人，191 服务 491/494 持有人。流程和门槛略有不同。`,
  },
  {
    title: "461 新西兰公民家庭关系签证",
    category: "家庭团聚",
    tags: ["461", "新西兰", "家庭"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/nz-citizen-family-461",
    contentMd: `# 461 NZ Citizen Family Relationship

## 定位
非 NZ 公民的 NZ 公民家属（如中国籍配偶）获**5 年临居**和在澳工作权。

## 核心要求
- 与 NZ 公民家庭成员关系真实（伴侣、子女等）
- NZ 公民本人持 444 SCV
- 健康和品行

## 权益
- 5 年居住、工作、学习
- 无 Medicare（默认）
- 可续签

## 常见坑
- 非 PR 不能担保他人来澳
- 福利受限，长期规划建议走伴侣签`,
  },
  {
    title: "金额、时间、经济门槛速查表",
    category: "签证总览",
    tags: ["速查", "费用", "经济担保", "门槛"],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/fees-and-charges",
    contentMd: `# 澳洲移民关键数字速查（2025 年度）

## 签证申请费（主申主要类别）
| 签证 | VAC |
|---|---|
| 189 / 190 / 491 | AUD 4,765 |
| 186 / 187 | AUD 4,770 |
| 482 SID | AUD 3,210-5,010 |
| 494 | AUD 4,770 |
| 500 学生签 | AUD 2,000 |
| 485 毕业生 | AUD 2,245 |
| 820/801 伴侣 | AUD 9,095 |
| 309/100 伴侣 | AUD 9,095 |
| 300 未婚夫妻 | AUD 9,095 |
| 600 访客 | AUD 190 |
| 143 父母付费 VAC1+VAC2 | ~AUD 48,600 |

## 经济担保参考（2025）
- 学生签证：AUD 29,710/年（2024.5 起）
- 父母担保 870 收入门槛：AUD 83,454
- TSMIT / CSIT：AUD 76,515
- Specialist Skills 收入门槛：AUD 141,210
- High Income Threshold：AUD 183,100

## 英语门槛基本换算
| 水平 | IELTS | PTE | TOEFL iBT |
|---|---|---|---|
| Functional | 4.5 | 30 | 32 |
| Vocational | 5 | 36 | 35 |
| Competent | 6 | 50 | 64 |
| Proficient | 7 | 65 | 94 |
| Superior | 8 | 79 | 110 |

## AoS 经济担保金（部分父母类）
- 10 年期押金：AUD 10,000 起（家庭结构定）

> ⚠️ 每年 7 月 1 日各项数字会调整，**使用前务必核对 immi.homeaffairs.gov.au**。`,
  },
];
