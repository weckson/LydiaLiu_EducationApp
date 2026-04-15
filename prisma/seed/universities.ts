// 澳洲主要大学知识库种子数据
//
// 涵盖澳洲八校联盟（Go8）+ 高申请量主流大学 + 国际学生热门选择
// 数据基于 2025-2026 年度 QS / Times 排名和公开院校信息
//
// ⚠️ 学费、雅思门槛每年变化，以官网为准

import type { SeedEntry } from "./types";

export const UNIVERSITIES: SeedEntry[] = [
  // ══════════════════════════════════════════════════════════
  // 总览
  // ══════════════════════════════════════════════════════════
  {
    title: "澳洲高校体系总览（Go8 + 其他热门）",
    category: "院校总览",
    tags: ["总览", "Go8", "院校分类"],
    sourceUrl: "https://www.studyaustralia.gov.au/",
    contentMd: `# 澳洲高校体系速查

## Group of Eight（八校联盟，Go8）
澳洲最具研究实力的八所大学，国际生首选：
1. **University of Melbourne**（墨尔本大学）
2. **University of Sydney**（悉尼大学）
3. **Australian National University**（澳国立，ANU）
4. **University of New South Wales**（新南威尔士，UNSW）
5. **Monash University**（蒙纳士）
6. **University of Queensland**（昆士兰，UQ）
7. **University of Western Australia**（西澳，UWA）
8. **University of Adelaide**（阿德莱德）

## Innovative Research Universities (IRU)
强调研究和创新的联盟，包括：
- **Griffith University**
- **James Cook University**
- **La Trobe University**
- **Murdoch University**
- **Flinders University**
- **Charles Darwin University**
- **Western Sydney University**

## Australian Technology Network (ATN)
重视应用型和产业联系：
- **UTS**（悉尼科技大学）
- **RMIT**
- **QUT**
- **Curtin University**
- **University of South Australia**
- **Deakin University**

## 2026 QS 世界排名（澳洲前 10）
| 排名 | 大学 |
|---|---|
| 19 | UNSW |
| 20 | Melbourne |
| 25 | Sydney |
| 32 | ANU |
| 36 | Monash |
| 42 | UQ |
| 77 | UWA |
| 82 | Adelaide |
| 96 | UTS |

## 国际生分布
- 2025 年度澳洲高校国际生总数约 **54.5 万**
- 2026 年起国际生**名额管控政策（Cap）**生效，各校有配额上限
- 中国留学生仍占最大比例（约 25-30%）`,
  },

  // ══════════════════════════════════════════════════════════
  // Go8 - Group of Eight
  // ══════════════════════════════════════════════════════════
  {
    title: "The University of Melbourne（墨尔本大学）",
    category: "Go8院校",
    tags: ["墨尔本大学", "Melbourne", "Go8", "VIC"],
    sourceUrl: "https://www.unimelb.edu.au/",
    contentMd: `# 墨尔本大学 University of Melbourne

## 基本信息
- **所在地**：墨尔本，维多利亚州
- **建校**：1853 年（澳洲第二古老大学）
- **QS 2026**：20 位
- **THE 2026**：稳居澳洲第一
- **国际生比例**：约 40%+

## 优势学科
- **法学**（最负盛名）、医学、商学
- 工程、建筑设计、教育
- 艺术人文、文学、心理学

## Melbourne Model 特色
本科采用"通识 + 研究生专业"模式：
- 本科选 6 大 Generalist Degree（Arts、Science、Commerce 等）
- 研究生阶段选具体职业方向（JD 法律、MD 医学、工程硕士）

## 语言要求参考（2025 年度）
- 本科：IELTS 6.5（单项 6.0）
- 硕士：多数 6.5-7.0（法学、医学 7.0+）
- 直录门槛高，Foundation/Trinity College 为常用前置

## 学费参考（年度）
- 文/理/商本科：约 AUD 46,000-55,000
- 商学硕士：约 AUD 55,000-60,000
- 法学 JD：约 AUD 55,000+
- 医学/牙医：最贵 AUD 80,000+

## 申请建议
- 热门专业 early round 录取率更高
- 中国本科 985/211 背景申请商学院硕士建议均分 85+
- 非 211 建议均分 90+ 并配合雅思 7.0`,
  },
  {
    title: "The University of Sydney（悉尼大学）",
    category: "Go8院校",
    tags: ["悉尼大学", "Sydney", "Go8", "NSW"],
    sourceUrl: "https://www.sydney.edu.au/",
    contentMd: `# 悉尼大学 University of Sydney

## 基本信息
- **所在地**：悉尼，新南威尔士州
- **建校**：1850 年（澳洲最古老大学）
- **QS 2026**：25 位
- **国际生**：超 3 万，占比约 35%

## 优势学科
- **商学 / 会计**（全澳顶级）
- 医学、法学、工程
- 建筑、城市规划、传媒

## 特色
- 美丽的哥特式主楼（网红打卡点）
- 与 UNSW 是悉尼两大传统学术中心
- 校友包括多位诺贝尔奖得主

## 语言要求参考
- 本科：IELTS 6.5（单项 6.0）
- 硕士：多数 6.5-7.0
- 法学/医学：7.5

## 学费参考（年度）
- 本科：约 AUD 48,000-55,000
- 商学硕士：约 AUD 55,000-63,000
- JD/MD：AUD 70,000+

## 中国学生申请特点
- **商学院**：中国本科 211 均分 78+，非 211 均分 88+
- **工程**：门槛相对宽松
- **传媒**：竞争激烈，GS 陈述非常关键

## 校园与生活
- 主校区 Camperdown 在 Inner West，生活便利
- 距 CBD 约 15 分钟`,
  },
  {
    title: "The University of New South Wales（新南威尔士大学 UNSW）",
    category: "Go8院校",
    tags: ["UNSW", "新南威尔士", "Go8", "NSW"],
    sourceUrl: "https://www.unsw.edu.au/",
    contentMd: `# UNSW 新南威尔士大学

## 基本信息
- **所在地**：悉尼 Kensington
- **建校**：1949 年
- **QS 2026**：19 位（澳洲最高）
- **国际生占比**：约 40%

## 优势学科
- **工程**（澳洲顶尖，QS 工程类世界前 30）
- **商学**（AGSM 商学院）、精算、金融
- 计算机、建筑、医学
- 法学（与 USYD 齐名）

## 学术特色
- 采用 **三学期制**（Trimester），每年 3 个 main term
- 学生可提前毕业或灵活安排课程
- 与工业界联系紧密（尤其 IT、金融）

## 语言要求参考
- 本科：IELTS 6.5（单项 6.0）
- 硕士：6.5-7.0
- 工程/IT 稍宽松

## 学费参考
- 工程本科：约 AUD 52,000+
- 商学硕士：约 AUD 56,000
- 计算机硕士：约 AUD 54,000

## 申请建议
- **GPA 要求偏高**，尤其商学院（Masters of Commerce 要求 211 均分 82+）
- 工程类录取相对友好
- Offer 发放速度较快

## 校园与生活
- 距市中心约 5 公里
- 靠近 Coogee 海滩
- 国际生比例高，华人圈活跃`,
  },
  {
    title: "Australian National University（澳国立 ANU）",
    category: "Go8院校",
    tags: ["ANU", "澳国立", "Go8", "ACT", "Canberra"],
    sourceUrl: "https://www.anu.edu.au/",
    contentMd: `# ANU 澳大利亚国立大学

## 基本信息
- **所在地**：堪培拉，首都领地 ACT
- **建校**：1946 年（澳洲唯一联邦政府直接资助）
- **QS 2026**：32 位
- **国际生占比**：约 40%

## 优势学科
- **政治学 / 国际关系**（澳洲第一）
- **经济学、公共政策**
- 亚太研究、中文研究
- 天文学、物理、计算机科学

## 特色
- 澳洲唯一**国家型大学**
- 规模较小（约 2.5 万学生），教授/学生比高
- 靠近国会大厦和联邦部委，政治经济研究资源丰富

## 语言要求参考
- 本科/硕士：IELTS 6.5（单项 6.0）
- 部分人文专业要求 7.0

## 学费参考
- 文科本科：约 AUD 45,000-50,000
- 商学硕士：约 AUD 51,000+
- 经济学硕士：约 AUD 52,000+

## 州担保加分
- ACT 地区属**偏远地区**，毕业生有州担保优势
- 491/190 ACT Matrix 对 ANU 毕业生友好

## 校园与生活
- 堪培拉是全澳最宜居的城市之一，生活节奏慢
- 生活成本比悉尼/墨尔本略低
- 华人圈较小，适合静心学习`,
  },
  {
    title: "Monash University（蒙纳士大学）",
    category: "Go8院校",
    tags: ["Monash", "蒙纳士", "Go8", "VIC"],
    sourceUrl: "https://www.monash.edu/",
    contentMd: `# Monash University 蒙纳士大学

## 基本信息
- **所在地**：墨尔本，维多利亚州
- **建校**：1958 年
- **QS 2026**：36 位
- **国际生**：澳洲第一（约 5 万）

## 优势学科
- **药剂学**（世界前 5）
- 医学、护理
- 商学（Monash Business School）
- 工程、IT

## 特色
- 规模最大的澳洲大学之一
- **全球校区**：除 Clayton 主校外，还有马来西亚、印尼、意大利校区
- 学术科研投入大

## 语言要求参考
- 本科：IELTS 6.5（单项 6.0）
- 硕士：6.5-7.0（药剂、护理、教育 7.0+）

## 学费参考
- 本科：AUD 42,000-55,000
- 商学硕士：约 AUD 50,000-55,000
- 医学 MD：AUD 80,000+

## 申请建议
- **商学院**：中国 211 均分 75-80，非 211 均分 85+
- 药剂、护理门槛高，需特定前置课
- IT 专业相对友好，有条件 offer 常见

## 校园与生活
- 主校区 Clayton 距墨尔本市中心 20 公里
- 配套齐全（免费接驳车到火车站）
- Caulfield 校区商学院专用，离 CBD 更近`,
  },
  {
    title: "The University of Queensland（昆士兰大学 UQ）",
    category: "Go8院校",
    tags: ["UQ", "昆士兰大学", "Go8", "QLD", "Brisbane"],
    sourceUrl: "https://www.uq.edu.au/",
    contentMd: `# UQ 昆士兰大学

## 基本信息
- **所在地**：布里斯班，昆士兰州
- **建校**：1909 年
- **QS 2026**：42 位
- **国际生占比**：约 22%

## 优势学科
- **生命科学、生物技术**（世界前列）
- 农业、兽医（澳洲第一）
- 商学（AACSB 认证）
- 旅游酒店管理（世界前 5）

## 特色
- 主校区 **St Lucia** 被誉为澳洲最美校园之一
- 课程丰富，专业覆盖广
- 与当地产业（能源、矿业、农业）联系紧密

## 语言要求参考
- 本科/硕士：IELTS 6.5（单项 6.0）
- 部分健康类 7.0

## 学费参考
- 本科：约 AUD 45,000-55,000
- 商学硕士：约 AUD 50,000-55,000

## 申请建议
- 对中国本科相对友好，211/985 均分 75-78 可申商科
- 非 211 均分 82-85
- 研究型硕士可考虑奖学金

## 生活与优势
- 昆士兰州气候温暖，生活成本低于悉尼墨尔本
- **Brisbane 2032 奥运会**带来发展机遇
- 毕业后留在昆州有 491 加分优势`,
  },
  {
    title: "The University of Western Australia（西澳大学 UWA）",
    category: "Go8院校",
    tags: ["UWA", "西澳大学", "Go8", "WA", "Perth"],
    sourceUrl: "https://www.uwa.edu.au/",
    contentMd: `# UWA 西澳大学

## 基本信息
- **所在地**：珀斯 Perth，西澳州
- **建校**：1911 年
- **QS 2026**：77 位
- **国际生占比**：约 22%

## 优势学科
- **采矿工程**（世界顶尖）
- **农业科学、海洋科学**
- 商学、工程、医学
- 心理学

## 特色
- 澳洲最美校园之一（地中海风格建筑 + 天鹅河畔）
- 规模较小，师生比好
- Perth 属于**偏远地区**（2022 年新政纳入），移民加分

## 语言要求参考
- 本科：IELTS 6.5（单项 6.0）
- 硕士：多数 6.5，医学 7.0+

## 学费参考
- 本科：约 AUD 40,000-52,000
- 硕士：AUD 42,000-50,000

## 州担保优势
- WA 是 491/190 州担保友好州之一
- 本地毕业生就业有加分和优先权

## 生活
- Perth 生活成本比悉尼低 20-30%
- 气候宜人，华人社区小但完整
- 与亚洲同时区，工作学习国内家人沟通方便`,
  },
  {
    title: "The University of Adelaide（阿德莱德大学）",
    category: "Go8院校",
    tags: ["Adelaide", "阿德莱德", "Go8", "SA"],
    sourceUrl: "https://www.adelaide.edu.au/",
    contentMd: `# University of Adelaide 阿德莱德大学

## 基本信息
- **所在地**：阿德莱德 Adelaide，南澳州
- **建校**：1874 年（澳洲第三古老）
- **QS 2026**：82 位
- **国际生占比**：约 30%

## 优势学科
- **葡萄酒学**（世界第一）
- 农业、食品科学
- 医学、牙医
- 采矿、石油工程

## 特色
- 曾走出 5 位诺贝尔奖得主
- Adelaide 是**偏远地区**，移民加分明显
- 州担保对毕业生友好，SA 是 491 重点州

## 语言要求参考
- 本科/硕士：IELTS 6.5（单项 6.0）
- 医学、药剂 7.0+

## 学费参考
- 本科：约 AUD 42,000-52,000
- 硕士：AUD 45,000-55,000

## 州担保优势（极大）
- SA 491/190 对 Adelaide 毕业生极度友好
- 本地读书 + 本地工作可快速获提名
- 适合"技术移民为目标"的申请人

## 生活
- 阿德莱德是南澳首府，生活节奏慢，房租比悉尼墨尔本便宜 40%+
- 华人圈友好
- 5+ 项 491 友好政策对国际生开放`,
  },

  // ══════════════════════════════════════════════════════════
  // 其他热门大学
  // ══════════════════════════════════════════════════════════
  {
    title: "University of Technology Sydney（悉尼科技大学 UTS）",
    category: "非Go8热门",
    tags: ["UTS", "悉尼科技", "NSW", "ATN"],
    sourceUrl: "https://www.uts.edu.au/",
    contentMd: `# UTS 悉尼科技大学

## 基本信息
- **所在地**：悉尼 CBD 旁
- **QS 2026**：96 位（跻身全球前 100）
- **国际生占比**：约 30%

## 优势学科
- **IT / 计算机**（澳洲顶尖）
- 工程、建筑、设计
- 商学、会计
- 传媒、数据科学

## 特色
- 应用导向强，行业对接紧密
- 毕业生就业率领先
- 校园现代化，位于 CBD Haymarket 中国城附近

## 语言要求
- 本科：IELTS 6.5（单项 6.0）
- 硕士：6.5-7.0

## 学费参考
- 本科：AUD 42,000-50,000
- 硕士：AUD 45,000-52,000

## 申请建议
- 对非 211 更友好
- 研究生均分要求灵活
- Graduate School Pathway 项目完善`,
  },
  {
    title: "RMIT University（皇家墨尔本理工）",
    category: "非Go8热门",
    tags: ["RMIT", "皇家墨尔本理工", "VIC", "ATN"],
    sourceUrl: "https://www.rmit.edu.au/",
    contentMd: `# RMIT University

## 基本信息
- **所在地**：墨尔本 CBD
- **建校**：1887 年
- **QS 2026**：约 125 位
- **国际生占比**：约 35%

## 优势学科
- **设计艺术**（澳洲最强，世界前 20）
- 建筑、城市规划
- 工程、IT
- 传媒、游戏设计

## 特色
- 强调"应用实践"和行业合作
- 墨尔本 CBD 正中心，生活便利
- 本硕博 + TAFE 全通道

## 语言要求
- 本科：IELTS 6.5（单项 6.0）
- 设计类作品集要求严格

## 学费参考
- 本科：AUD 40,000-50,000
- 硕士：AUD 45,000-52,000

## 申请建议
- 艺术设计类看重作品集，均分要求灵活
- 工程、IT 有 Pathway 项目
- 预科衔接本科方便`,
  },
  {
    title: "Queensland University of Technology（QUT 昆士兰科技大学）",
    category: "非Go8热门",
    tags: ["QUT", "昆士兰科技", "QLD", "ATN"],
    sourceUrl: "https://www.qut.edu.au/",
    contentMd: `# QUT 昆士兰科技大学

## 基本信息
- **所在地**：布里斯班
- **QS 2026**：约 230 位
- **国际生**：约 2 万

## 优势学科
- **创意产业**（Creative Industries，澳洲第一）
- 商学（AACSB）、法学
- 健康科学、护理
- IT、工程

## 特色
- 应用型大学代表，"a university for the real world" 口号
- 位于 Brisbane CBD，交通便利
- 偏远地区加分 + QLD 友好州政策

## 语言要求
- 本科：IELTS 6.5（单项 6.0）
- 护理、教育：7.0

## 学费参考
- 本科：AUD 35,000-45,000（比 Go8 便宜 20%+）
- 硕士：AUD 40,000-48,000

## 申请建议
- 非 211 友好，均分 75-80 可申
- 护理、教育作为移民专业很热门`,
  },
  {
    title: "Macquarie University（麦考瑞大学）",
    category: "非Go8热门",
    tags: ["Macquarie", "麦考瑞", "NSW"],
    sourceUrl: "https://www.mq.edu.au/",
    contentMd: `# Macquarie University 麦考瑞大学

## 基本信息
- **所在地**：悉尼北区 Macquarie Park
- **建校**：1964 年
- **QS 2026**：约 135 位

## 优势学科
- **精算**（澳洲第一，世界前列）
- **会计 / 金融**
- 心理学、语言学
- 地球科学、生物

## 特色
- 地处悉尼科技产业中心（"澳洲硅谷"）
- 毕业生就业率高
- 与华为、谷歌、微软等有合作

## 语言要求
- 本科：IELTS 6.5（单项 6.0）
- 硕士：6.5-7.0

## 学费参考
- 本科：AUD 42,000-50,000
- 商学硕士：AUD 45,000-52,000

## 申请建议
- **精算专业**：CFA/IAA 认证，业内声誉好
- **会计专业**：CPA/CA 认证硕士，移民热门
- 均分要求中等，非 211 有机会`,
  },
  {
    title: "University of Wollongong（卧龙岗大学 UoW）",
    category: "非Go8热门",
    tags: ["Wollongong", "卧龙岗", "NSW", "偏远地区"],
    sourceUrl: "https://www.uow.edu.au/",
    contentMd: `# UoW 卧龙岗大学

## 基本信息
- **所在地**：卧龙岗（悉尼南 80 公里）
- **QS 2026**：约 170 位
- **国际生占比**：约 30%

## 优势学科
- **工程 / 计算机**
- 护理、商学
- 创意艺术

## 特色 — **偏远地区加分**
- **Wollongong 属于偏远地区**
- 国际学生毕业后**自动享有 491/190 加分**（+5）
- **485 毕业生签可延长 1 年**

## 语言要求
- 本科/硕士：IELTS 6.5（单项 6.0）

## 学费参考
- 本科：AUD 35,000-42,000
- 硕士：AUD 38,000-45,000

## 生活
- 靠海美景，生活成本低
- 距悉尼 1.5 小时火车
- 中国留学生圈完整

## 适合人群
瞄准 491 技术移民、预算相对紧的学生。`,
  },
  {
    title: "University of Newcastle（纽卡斯尔大学）",
    category: "非Go8热门",
    tags: ["Newcastle", "纽卡斯尔", "NSW", "偏远地区"],
    sourceUrl: "https://www.newcastle.edu.au/",
    contentMd: `# University of Newcastle 纽卡斯尔大学

## 基本信息
- **所在地**：纽卡斯尔（悉尼北 160 公里）
- **QS 2026**：约 180 位

## 优势学科
- **医学**（澳洲前列）
- 工程
- 建筑、心理学

## 偏远地区优势
- Newcastle 属偏远地区
- 移民加分（与 Wollongong 类似）
- 485 可延长

## 语言要求
- 本科：IELTS 6.5
- 硕士：6.5-7.0
- 医学：7.0+

## 学费参考
- 本科：AUD 35,000-45,000
- 硕士：AUD 38,000-48,000`,
  },
  {
    title: "Deakin University（迪肯大学）",
    category: "非Go8热门",
    tags: ["Deakin", "迪肯", "VIC", "ATN"],
    sourceUrl: "https://www.deakin.edu.au/",
    contentMd: `# Deakin University 迪肯大学

## 基本信息
- **所在地**：维多利亚州（4 校区，主校 Burwood 在墨尔本）
- **QS 2026**：约 200 位
- **国际生**：约 1.5 万

## 优势学科
- **运动科学**（世界前 5）
- 护理、教育
- 商学、IT

## 特色
- **就业导向强**，实习机会多
- 与多家大型企业合作
- Cloud Campus 远程学习方便

## 语言要求
- 本科：IELTS 6.0-6.5
- 硕士：6.5

## 学费参考
- 本科：AUD 35,000-43,000
- 硕士：AUD 38,000-46,000

## 申请建议
- 门槛友好，211 均分 70-75 可申
- 护理、教育作为移民专业值得考虑`,
  },
  {
    title: "Griffith University（格里菲斯大学）",
    category: "非Go8热门",
    tags: ["Griffith", "格里菲斯", "QLD", "IRU"],
    sourceUrl: "https://www.griffith.edu.au/",
    contentMd: `# Griffith University 格里菲斯大学

## 基本信息
- **所在地**：黄金海岸 & 布里斯班
- **QS 2026**：约 265 位

## 优势学科
- **酒店管理 / 旅游**（澳洲前 3）
- 护理、教育
- 环境科学
- 音乐（昆士兰音乐学院 QCGU）

## 偏远地区优势
- **Gold Coast、Brisbane 均为偏远地区**（2022 新政后）
- 移民友好

## 学费参考
- 本科：AUD 32,000-42,000
- 硕士：AUD 35,000-45,000

## 申请建议
- 非 211 友好
- 酒店、旅游、护理为热门专业`,
  },
  {
    title: "La Trobe University（拉筹伯大学）",
    category: "非Go8热门",
    tags: ["LaTrobe", "拉筹伯", "VIC", "IRU"],
    sourceUrl: "https://www.latrobe.edu.au/",
    contentMd: `# La Trobe University 拉筹伯大学

## 基本信息
- **所在地**：墨尔本（主校 Bundoora）
- **QS 2026**：约 250 位

## 优势学科
- 健康科学、护理
- 商学、教育
- 社会工作

## 特色
- 墨尔本以外部分校区为偏远地区
- 移民友好
- 对国际生录取要求相对友好

## 学费参考
- 本科：AUD 32,000-42,000
- 硕士：AUD 35,000-44,000`,
  },
  {
    title: "Curtin University（科廷大学）",
    category: "非Go8热门",
    tags: ["Curtin", "科廷", "WA", "ATN"],
    sourceUrl: "https://www.curtin.edu.au/",
    contentMd: `# Curtin University 科廷大学

## 基本信息
- **所在地**：珀斯
- **QS 2026**：约 180 位

## 优势学科
- **采矿工程**（世界前 3）
- 商学、会计
- 建筑、设计

## 特色
- 西澳最大大学
- 与当地能源/矿业产业紧密合作
- 珀斯属偏远地区，有移民加分

## 学费参考
- 本科：AUD 32,000-45,000
- 硕士：AUD 35,000-48,000`,
  },
  {
    title: "Queensland Health & James Cook University（詹姆斯库克大学 JCU）",
    category: "非Go8热门",
    tags: ["JCU", "James Cook", "QLD", "偏远地区", "IRU"],
    sourceUrl: "https://www.jcu.edu.au/",
    contentMd: `# JCU 詹姆斯库克大学

## 基本信息
- **所在地**：Townsville、Cairns（昆士兰北部）
- **QS 2026**：约 420 位

## 优势学科
- **海洋生物学**（世界第一）
- **热带医学**
- 兽医
- 土著研究

## 特色 — 极度偏远地区
- Townsville、Cairns 属 **DAMA 指定地区**
- 移民政策极度友好
- 485 签可延长至 3-4 年
- 部分课程有定制版职业清单

## 学费参考
- 本科：AUD 30,000-42,000
- 硕士：AUD 32,000-45,000

## 适合人群
明确想走移民路径、不介意偏远生活的学生。`,
  },
  {
    title: "University of South Australia（南澳大学 UniSA）",
    category: "非Go8热门",
    tags: ["UniSA", "南澳大学", "SA", "ATN"],
    sourceUrl: "https://www.unisa.edu.au/",
    contentMd: `# UniSA 南澳大学

## 基本信息
- **所在地**：阿德莱德
- **QS 2026**：约 330 位

## 重要变化
**2026 年起，UniSA 与 Adelaide 大学合并为 "Adelaide University"**，将成为澳洲第二大综合大学。

## 优势学科
- 商学（AACSB、EQUIS、AMBA "三冠认证"）
- 护理、教育
- 建筑、工程

## 偏远地区 + 州担保
- 南澳 491 对本地毕业生超友好
- 移民通道成熟

## 学费参考
- 本科：AUD 32,000-42,000
- 硕士：AUD 35,000-45,000`,
  },
  {
    title: "University of Tasmania（塔斯马尼亚大学 UTAS）",
    category: "非Go8热门",
    tags: ["UTAS", "塔斯马尼亚大学", "TAS", "偏远地区"],
    sourceUrl: "https://www.utas.edu.au/",
    contentMd: `# UTAS 塔斯马尼亚大学

## 基本信息
- **所在地**：Hobart、Launceston
- **QS 2026**：约 315 位

## 优势学科
- **海洋与南极研究**（全球顶级）
- 农业、酿酒
- 护理、教育

## 偏远地区超级优势
- 塔斯马尼亚全州都是偏远地区
- **TAS 州担保对本地毕业生最友好**
- 对 Cat 1（校内毕业生）2 年居住即可申 491/190
- 学费和生活成本低

## 学费参考
- 本科：AUD 30,000-40,000
- 硕士：AUD 32,000-42,000

## 适合人群
预算有限 + 移民导向 + 能接受偏远安静生活。`,
  },
  {
    title: "Flinders University（弗林德斯大学）",
    category: "非Go8热门",
    tags: ["Flinders", "弗林德斯", "SA", "IRU"],
    sourceUrl: "https://www.flinders.edu.au/",
    contentMd: `# Flinders University

## 基本信息
- **所在地**：阿德莱德
- **QS 2026**：约 410 位

## 优势学科
- 医学、护理
- 心理学
- 社会科学

## 偏远地区优势
- SA 偏远地区友好，州担保通道完整
- 阿德莱德生活成本低

## 学费参考
- 本科：AUD 30,000-40,000
- 硕士：AUD 32,000-42,000`,
  },
  {
    title: "Western Sydney University（西悉尼大学 WSU）",
    category: "非Go8热门",
    tags: ["WSU", "西悉尼大学", "NSW", "IRU"],
    sourceUrl: "https://www.westernsydney.edu.au/",
    contentMd: `# Western Sydney University 西悉尼大学

## 基本信息
- **所在地**：悉尼西郊（Parramatta 为主）
- **QS 2026**：约 400 位

## 优势学科
- 护理、助产
- 教育
- 商学、IT
- 法学

## 特色
- 可持续发展研究全球第一（THE 2024）
- 多校区布局
- 实用型定位

## 学费参考
- 本科：AUD 30,000-38,000
- 硕士：AUD 32,000-40,000

## 申请建议
- 对非 211 非常友好
- 护理、教育作为移民专业有价值`,
  },
  {
    title: "Swinburne University of Technology（斯威本科技大学）",
    category: "非Go8热门",
    tags: ["Swinburne", "斯威本", "VIC"],
    sourceUrl: "https://www.swinburne.edu.au/",
    contentMd: `# Swinburne University 斯威本科技大学

## 基本信息
- **所在地**：墨尔本 Hawthorn
- **QS 2026**：约 310 位

## 优势学科
- 天文学（与 NASA 合作）
- 设计、艺术
- 工程、IT
- 商学

## 特色
- 应用导向
- **Industry Placement** 强制实习项目
- 位置靠近墨尔本 CBD

## 学费参考
- 本科：AUD 35,000-43,000
- 硕士：AUD 36,000-44,000`,
  },
  {
    title: "University of Canberra（堪培拉大学 UC）",
    category: "非Go8热门",
    tags: ["Canberra", "堪培拉大学", "ACT", "偏远地区"],
    sourceUrl: "https://www.canberra.edu.au/",
    contentMd: `# University of Canberra 堪培拉大学

## 基本信息
- **所在地**：堪培拉
- **QS 2026**：约 470 位

## 优势学科
- 护理、助产
- 教育
- 体育科学
- 传媒、IT

## 偏远地区 + ACT 友好政策
- 堪培拉属偏远地区
- **ACT Matrix** 州担保对本地毕业生极友好
- 护理、教育是移民热门专业

## 学费参考
- 本科：AUD 30,000-38,000
- 硕士：AUD 32,000-40,000`,
  },
  {
    title: "Australian Catholic University（澳洲天主教大学 ACU）",
    category: "非Go8热门",
    tags: ["ACU", "澳洲天主教大学"],
    sourceUrl: "https://www.acu.edu.au/",
    contentMd: `# ACU 澳洲天主教大学

## 基本信息
- **校区**：悉尼、墨尔本、布里斯班、堪培拉、阿德莱德
- **QS 2026**：约 580 位

## 优势学科
- **教育、护理**（澳洲前列）
- 社会工作
- 神学

## 特色
- 天主教背景但对所有信仰开放
- 护理教育项目与医院深度合作

## 学费参考
- 本科：AUD 30,000-38,000
- 硕士：AUD 32,000-40,000

## 适合人群
冲着护理、教育专业而来的申请人。`,
  },
  {
    title: "Bond University（邦德大学）",
    category: "非Go8热门",
    tags: ["Bond", "邦德大学", "QLD", "私立"],
    sourceUrl: "https://bond.edu.au/",
    contentMd: `# Bond University 邦德大学

## 基本信息
- **所在地**：黄金海岸
- **类型**：**澳洲第一所私立大学**

## 优势学科
- 法学（澳洲前列）
- 商学、酒店管理
- 体育与健康科学

## 特色
- **三学期制**，可 2 年完成本科
- 小班教学（师生比 1:10）
- 毕业生就业率领先
- 学费较贵（私立）

## 学费参考
- 本科：AUD 45,000-60,000
- 硕士：AUD 50,000-65,000
- JD 法律：AUD 55,000+

## 适合人群
不差钱 + 追求快速毕业 + 想去黄金海岸生活的学生。`,
  },
  {
    title: "Edith Cowan University（埃迪斯科文大学 ECU）",
    category: "非Go8热门",
    tags: ["ECU", "埃迪斯科文大学", "WA"],
    sourceUrl: "https://www.ecu.edu.au/",
    contentMd: `# ECU 埃迪斯科文大学

## 基本信息
- **所在地**：珀斯
- **QS 2026**：约 540 位

## 优势学科
- **网络安全**（澳洲领先）
- 艺术表演、音乐
- 护理

## 特色
- 以"教学质量"见长（学生满意度常年前列）
- Perth 偏远地区优势

## 学费参考
- 本科：AUD 30,000-37,000
- 硕士：AUD 32,000-40,000`,
  },
  {
    title: "Charles Darwin University（查尔斯达尔文大学 CDU）",
    category: "非Go8热门",
    tags: ["CDU", "查尔斯达尔文大学", "NT", "偏远地区"],
    sourceUrl: "https://www.cdu.edu.au/",
    contentMd: `# CDU 查尔斯达尔文大学

## 基本信息
- **所在地**：达尔文 Darwin
- **QS 2026**：约 350 位

## 优势学科
- 环境、土著研究
- 工程
- 护理、教育

## 重要特色 — 移民优势最强
- **NT 北领地属 DAMA 地区**
- 州担保对 CDU 毕业生极度友好
- 临居到 PR 通道最成熟的州之一

## 学费参考
- 本科：AUD 28,000-38,000
- 硕士：AUD 30,000-40,000

## 生活
- 达尔文为热带城市，距东南亚近
- 生活成本低
- 华人圈较小

## 适合人群
**首要目标是技术移民**，不在意地理偏远的申请人。`,
  },
  {
    title: "Murdoch University（默多克大学）",
    category: "非Go8热门",
    tags: ["Murdoch", "默多克", "WA", "IRU"],
    sourceUrl: "https://www.murdoch.edu.au/",
    contentMd: `# Murdoch University 默多克大学

## 基本信息
- **所在地**：珀斯
- **QS 2026**：约 490 位

## 优势学科
- 兽医学（澳洲前 3）
- 法学、工程
- 信息技术

## 特色
- 偏远地区（Perth）
- 学费相对友好

## 学费参考
- 本科：AUD 30,000-38,000
- 硕士：AUD 32,000-40,000`,
  },
  {
    title: "Torrens University Australia（托伦斯大学）",
    category: "非Go8热门",
    tags: ["Torrens", "托伦斯大学", "私立"],
    sourceUrl: "https://www.torrens.edu.au/",
    contentMd: `# Torrens University Australia

## 基本信息
- **类型**：私立大学
- **校区**：悉尼、墨尔本、阿德莱德、布里斯班

## 优势学科
- 酒店管理（Blue Mountains School of Hospitality 隶属）
- 商业、设计
- 医疗健康

## 特色
- 学制灵活（多次开学）
- 入学门槛相对友好
- 与行业合作多

## 学费参考
- 本科：AUD 28,000-38,000
- 硕士：AUD 30,000-42,000

## 注意事项
作为私立大学声誉不如公立 Go8，但对需要快速入学或在特定专业（酒店）深耕的学生友好。`,
  },
  {
    title: "Victoria University（维多利亚大学 VU）",
    category: "非Go8热门",
    tags: ["VU", "维多利亚大学", "VIC"],
    sourceUrl: "https://www.vu.edu.au/",
    contentMd: `# Victoria University 维多利亚大学

## 基本信息
- **所在地**：墨尔本 Footscray、CBD
- **QS 2026**：约 580 位

## 优势学科
- **运动科学**（澳洲前列）
- 商学、IT
- 教育

## 特色 — **Block Model**
- 独特的"一次上一门课"教学模式
- 每 4 周完成一门课程
- 学习压力集中
- 国际学生满意度高

## 学费参考
- 本科：AUD 30,000-38,000
- 硕士：AUD 32,000-40,000`,
  },
  {
    title: "TAFE 与 VET 职业教育总览",
    category: "院校总览",
    tags: ["TAFE", "VET", "职业教育"],
    sourceUrl: "https://www.studyaustralia.gov.au/english/study/vet",
    contentMd: `# TAFE 与 VET 职业教育

## 定位
**TAFE**（Technical and Further Education）是澳洲**政府/公立**职业技术教育体系，**VET**（Vocational Education and Training）包括 TAFE 和私立 RTOs。

## 学历层级
- **Certificate I - IV**：证书
- **Diploma**：大专
- **Advanced Diploma**：高级大专
- 可用作升读本科的 Pathway

## 移民导向热门专业
- **厨师（Cook / Chef）**
- **建筑行业**（水暖工、电工、木工）
- **汽车维修**
- **美发师 / 美容师**
- **幼儿教育**（Early Childhood）
- **社区护理**

## 学费参考
- Certificate III/IV：AUD 8,000-16,000/年
- Diploma：AUD 12,000-22,000/年

## 与大学的区别
- 更短、更便宜
- 实践导向
- 毕业可申 485 Post-Vocational Stream
- 部分课程对应 MLTSSL 职业

## 主要 TAFE 机构
- **TAFE NSW**
- **TAFE Queensland**
- **Melbourne Polytechnic**
- **Chisholm / Holmesglen / Box Hill Institute**
- **TasTAFE**
- **Canberra Institute of Technology**

## 申请注意
- RTO 质量参差不齐，务必选择 CRICOS 注册正规机构
- GS 陈述对 VET 学生审查更严格
- 避免申请被认为是"绕过技术移民"的路径`,
  },
];
