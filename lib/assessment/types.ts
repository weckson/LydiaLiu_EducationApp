// 移民方案智能评估器 - 类型定义
//
// 整个 assessment 管线的 TypeScript 类型契约

// ════════════════════════════════════════════
// 输入类型 - 客户档案
// ════════════════════════════════════════════

export type MaritalStatus = "SINGLE" | "MARRIED" | "DE_FACTO";

export type HighestDegree = "DIPLOMA" | "BACHELOR" | "MASTER" | "PHD";

export type EnglishTestType = "IELTS" | "PTE" | "TOEFL" | "OET";

export type TargetState =
  | "ANY"
  | "NSW"
  | "VIC"
  | "QLD"
  | "SA"
  | "WA"
  | "TAS"
  | "NT"
  | "ACT";

export type BudgetTier = "LOW" | "MEDIUM" | "HIGH";
export type Urgency = "LOW" | "NORMAL" | "HIGH";

/** 一段工作经历 */
export type WorkExperience = {
  jobTitle: string;
  company: string;
  country: string; // "AU" 或其他国家代码
  startDate: string; // "YYYY-MM"
  endDate: string; // "YYYY-MM" 或 "NOW"
  hoursPerWeek: number; // 每周工作小时数，用于兼职折算
};

/** 评估输入 —— 表单收集的所有字段 */
export type AssessmentInput = {
  // 客户基础
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  age: number;
  nationality?: string;
  maritalStatus: MaritalStatus;
  partnerEligible: boolean;

  // 学历
  highestDegree: HighestDegree;
  fieldOfStudy: string;
  degreeCountry: string;
  graduationYear: number;
  gpa?: number;
  australianStudy: boolean;
  regionalStudy: boolean;

  // 工作经验
  workExperience: WorkExperience[];

  // 英语
  englishTest?: EnglishTestType;
  englishOverall?: number;
  englishListening?: number;
  englishReading?: number;
  englishWriting?: number;
  englishSpeaking?: number;
  englishTestDate?: string;

  // 加分项
  hasNAATI: boolean;
  hasProfessionalYear: boolean;

  // 偏好
  targetState: TargetState;
  willingRegional: boolean;
  budgetTier: BudgetTier;
  urgency: Urgency;
};

// ════════════════════════════════════════════
// 打分类型 - 确定性计算输出
// ════════════════════════════════════════════

/** EOI 分数分项明细 */
export type PointsBreakdown = {
  age: number; // 年龄分（0-30）
  english: number; // 英语分（0-20）
  overseasWork: number; // 海外工作经验（0-15）
  auWork: number; // 澳洲工作经验（0-20）
  education: number; // 学历分（0-20）
  auStudy: number; // 澳洲学习（0-5）
  regionalStudy: number; // 偏远地区学习（0-5）
  naati: number; // NAATI CCL（0-5）
  professionalYear: number; // PY 专业年（0-5）
  partner: number; // 配偶加分（0-10）
  stateNomination190: number; // 190 州担保加分（固定 5）
  stateNomination491: number; // 491 偏远担保加分（固定 15）
  total189: number; // 189 独立技术移民总分
  total190: number; // 190 州担保总分 = total189 + 5
  total491: number; // 491 偏远地区总分 = total189 + 15
  // 辅助信息
  overseasYears: number; // 算出的海外工作年限
  auYears: number; // 算出的澳洲工作年限
  ageEligible: boolean; // 年龄是否 < 45
  englishEligible: boolean; // 英语是否 >= Competent (6.0)
  notes: string[]; // 算分过程的备注（比如"配偶加分因 X"）
};

// ════════════════════════════════════════════
// 职业匹配类型
// ════════════════════════════════════════════

export type AssessmentBody =
  | "ACS" // ICT 职业
  | "EA" // 工程职业
  | "VETASSESS" // 多数专业/商业
  | "CPA" // 会计
  | "CA_ANZ" // 会计
  | "IPA" // 会计
  | "TRA" // 技工
  | "ANMAC" // 护理
  | "AHPRA" // 医疗执业
  | "AACA" // 建筑师
  | "AITSL" // 教师
  | "OTHER";

export type RecommendedOccupation = {
  code: string; // 6 位 ANZSCO 代码，如 "261313"
  name: string; // 英文职业名，如 "Software Engineer"
  nameZh: string; // 中文名，如 "软件工程师"
  assessmentBody: AssessmentBody;
  list: ("CSOL" | "MLTSSL" | "STSOL" | "ROL")[]; // 所在清单
  confidence: "high" | "medium" | "low";
  reason: string; // 为什么推荐这个（基于客户的教育/工作背景）
};

// ════════════════════════════════════════════
// 路径方案类型
// ════════════════════════════════════════════

export type VisaSubclass =
  | "189"
  | "190"
  | "491"
  | "482"
  | "186"
  | "494"
  | "858"
  | "DAMA";

export type PathPlan = {
  label: "A" | "B" | "C";
  priority: "primary" | "alternative" | "fallback";
  visaSubclass: VisaSubclass;
  visaName: string; // 签证完整名称
  targetState?: string; // 推荐的州（若适用）
  expectedPoints: number; // 对此路径有效的分数
  invitationCutoff?: number; // 目前的获邀分数线（来自 web search）
  feasibility: "high" | "medium" | "low"; // 可行性
  timeline: string; // 预估时间线，如 "6-12 个月获邀 + 6-12 个月审理"
  estimatedCost: string; // 预估总成本，如 "AUD 10,000-15,000"
  successRate: string; // 成功率评估
  keySteps: string[]; // 关键步骤清单
  risks: string[]; // 风险点
  advantages: string[]; // 优势
  rationale: string; // 为什么这是 A/B/C 方案的理由
};

// ════════════════════════════════════════════
// 州对比类型
// ════════════════════════════════════════════

export type StateStatus = {
  state: string; // NSW / VIC / QLD ...
  stateNameZh: string;
  program: "190" | "491";
  openStatus: "open" | "closed" | "invitation-only" | "unknown";
  allocation2526?: number; // 2025-26 席位
  remainingQuota?: string; // 剩余配额（若已知）
  recentInvitationCutoff?: number; // 最近邀请分数
  occupationOnList: boolean; // 客户的目标职业是否在该州清单上
  notes: string; // 关键信息
};

// ════════════════════════════════════════════
// 政策更新类型
// ════════════════════════════════════════════

export type PolicyUpdate = {
  date: string; // "2026-04-01"
  category: "fees" | "points" | "occupation-list" | "state-nomination" | "other";
  title: string;
  summary: string;
  sourceUrl?: string;
  impactToClient: "high" | "medium" | "low" | "none";
};

// ════════════════════════════════════════════
// 最终评估报告
// ════════════════════════════════════════════

export type AssessmentReport = {
  id: string;
  clientName?: string;
  generatedAt: string;
  dataFreshness: string; // 政策数据抓取时间
  // 核心结论
  executiveSummary: string; // 一段话总结
  // 分数
  pointsBreakdown: PointsBreakdown;
  // 推荐职业
  recommendedOccupations: RecommendedOccupation[];
  // 三大方案
  pathA: PathPlan;
  pathB: PathPlan;
  pathC: PathPlan;
  // 各州对比
  stateComparison: StateStatus[];
  // 最近政策
  recentPolicyUpdates: PolicyUpdate[];
  // 下一步行动
  nextSteps: string[];
  // RAG 引用的知识条目 ID
  citedKnowledgeIds: string[];
  // 元数据
  tokensUsed: number;
};

// ════════════════════════════════════════════
// 内部使用：Web Research 结果
// ════════════════════════════════════════════

export type WebResearchResult = {
  query: string;
  content: string; // LLM 返回的 markdown / text
  sources: string[]; // 引用的 URL
  fromCache: boolean;
  fetchedAt: string;
};
