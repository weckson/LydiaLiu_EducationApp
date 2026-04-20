// 职业匹配工具的类型定义

import type { Domain } from "./anzsco-catalogue";

// ════════════════════════════════════════════
// 输入
// ════════════════════════════════════════════

export type WorkExperienceEntry = {
  jobTitle: string;
  company?: string;
  country?: string;
  durationYears: number;
  description?: string; // 职责描述
  isInternship?: boolean;
};

export type CareerMatchInput = {
  clientName?: string;

  highestDegree: "DIPLOMA" | "BACHELOR" | "MASTER" | "PHD";
  fieldOfStudy: string;
  degreeCountry?: string;
  graduationYear?: number;

  workExperience: WorkExperienceEntry[];
  certifications?: string;
  australianStudy: boolean;
  notes?: string;
};

// ════════════════════════════════════════════
// 输出 - 单个职业的详细匹配
// ════════════════════════════════════════════

/** 各种官方清单 */
export type OccupationLists = {
  CSOL: boolean; // Core Skills Occupation List (482 SID)
  MLTSSL: boolean; // Medium and Long-term Strategic Skills List (189)
  STSOL: boolean; // Short-term Skilled Occupation List
  ROL: boolean; // Regional Occupation List
  ENSOL: boolean; // Employer Nominated Skilled Occupation List (186 DE)
};

/** 各州对该职业的接受情况 */
export type StateAvailability = {
  state: "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";
  programs: Array<{
    program: "190" | "491";
    available: "open" | "closed" | "by-streams" | "unknown";
    notes?: string; // 比如"需特定行业经验"、"仅限本州毕业生"等
  }>;
};

/** 评估机构详细要求 */
export type AssessmentRequirements = {
  body: string; // ACS / EA / VETASSESS 等
  educationRequirement: string; // 例："ICT 本科或以上，ICT 学分占比 ≥ 50%"
  workExperienceRequirement: string; // 例："2 年相关全职工作经验"
  englishRequirement?: string;
  deductionRules?: string; // 工作年限扣减规则
  applicationFee?: string; // 评估费
  processingTime?: string; // 处理时间
  specialNotes?: string;
};

/** 一个职业的完整匹配信息 */
export type DetailedOccupationMatch = {
  // 基本信息
  anzscoCode: string;
  nameEn: string;
  nameZh: string;
  domain: Domain;

  // 评估机构详细要求
  assessment: AssessmentRequirements;

  // 在哪些清单上
  onLists: OccupationLists;

  // 各州接受情况
  stateAvailability: StateAvailability[];

  // 匹配分析
  matchScore: number; // 0-100
  confidence: "high" | "medium" | "low";
  matchReasoning: string; // 为什么匹配
  pros: string[]; // 优势
  cons: string[]; // 短板
  improvementTips: string[]; // 如何强化这条路径

  // 推荐签证路径
  recommendedVisas: string[]; // ["189", "190 NSW", "491 SA", "482"]

  // 数据来源
  sources?: string[]; // web search 引用的 URL
};

// ════════════════════════════════════════════
// 完整结果
// ════════════════════════════════════════════

export type CareerMatchResult = {
  // 整体总结
  summary: string;

  // 是否能匹配到任何职业
  matched: boolean;

  // 如果匹配不上，给出原因和建议
  unmatchedReason?: string;
  alternativePaths?: string[]; // 例如：补一个澳洲学位、转行、走非技术移民

  // 所有匹配的职业（按 matchScore 倒序）
  occupations: DetailedOccupationMatch[];

  // 按领域分组的简短统计
  domainsCovered: Domain[];

  // 元信息
  tokensUsed: number;
  dataFreshness: string;
};
