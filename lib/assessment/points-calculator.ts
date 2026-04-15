// 移民方案智能评估器 - 确定性打分函数
//
// 基于 Home Affairs 现行 EOI 打分规则，纯 TypeScript 实现。
// 不经过 LLM，结果 100% 可复现、可解释。
//
// 参考：知识库 "技术移民路径评估 SOP" 条目 + Home Affairs 官网

import type {
  AssessmentInput,
  PointsBreakdown,
  WorkExperience,
  EnglishTestType,
} from "./types";

// ════════════════════════════════════════════
// 年龄打分
// ════════════════════════════════════════════
function calculateAgePoints(age: number): { points: number; eligible: boolean } {
  if (age < 18 || age >= 45) return { points: 0, eligible: false };
  if (age <= 24) return { points: 25, eligible: true };
  if (age <= 32) return { points: 30, eligible: true };
  if (age <= 39) return { points: 25, eligible: true };
  return { points: 15, eligible: true }; // 40-44
}

// ════════════════════════════════════════════
// 英语打分
// ════════════════════════════════════════════

/** 把各种英语考试分数换算到 IELTS 总分等效值 */
export function normalizeToIELTS(
  test: EnglishTestType | undefined,
  overall: number | undefined
): number {
  if (!test || overall == null) return 0;
  switch (test) {
    case "IELTS":
      return overall;
    case "PTE":
      // PTE → IELTS 近似对照（保守估计）
      if (overall >= 79) return 8.0;
      if (overall >= 65) return 7.0;
      if (overall >= 50) return 6.0;
      if (overall >= 36) return 5.0;
      if (overall >= 30) return 4.5;
      return 0;
    case "TOEFL":
      // TOEFL iBT 总分
      if (overall >= 110) return 8.0;
      if (overall >= 94) return 7.0;
      if (overall >= 64) return 6.0;
      if (overall >= 35) return 5.0;
      return 0;
    case "OET":
      // OET 字母等级（A/B/C），数字 0-500
      // OET 用法不同，这里简化：如果传了数字就用近似
      if (overall >= 450) return 8.0; // Grade A
      if (overall >= 350) return 7.0; // Grade B
      if (overall >= 250) return 6.0; // Grade C
      return 0;
  }
}

function calculateEnglishPoints(
  test: EnglishTestType | undefined,
  overall: number | undefined
): { points: number; eligible: boolean; ieltsEquivalent: number } {
  const ielts = normalizeToIELTS(test, overall);
  // Superior (IELTS 8.0 / PTE 79+): +20
  // Proficient (IELTS 7.0 / PTE 65+): +10
  // Competent (IELTS 6.0 / PTE 50+): 0 分（但符合基本资格）
  // 低于 Competent：不符合技术移民英语门槛
  if (ielts >= 8.0)
    return { points: 20, eligible: true, ieltsEquivalent: ielts };
  if (ielts >= 7.0)
    return { points: 10, eligible: true, ieltsEquivalent: ielts };
  if (ielts >= 6.0)
    return { points: 0, eligible: true, ieltsEquivalent: ielts };
  return { points: 0, eligible: false, ieltsEquivalent: ielts };
}

// ════════════════════════════════════════════
// 工作经验打分
// ════════════════════════════════════════════

/**
 * 从工作经历数组中算出海外/澳洲工作年限
 * - 按每段工作的起止日期计算月数
 * - < 20 小时/周按半职折算
 * - 境内外分开统计
 */
export function splitWorkExperience(
  entries: WorkExperience[]
): { overseasYears: number; auYears: number } {
  let overseasMonths = 0;
  let auMonths = 0;

  for (const entry of entries) {
    const start = parseYearMonth(entry.startDate);
    const end =
      entry.endDate === "NOW" || !entry.endDate
        ? new Date()
        : parseYearMonth(entry.endDate);
    if (!start || !end) continue;

    const months = monthsBetween(start, end);
    if (months <= 0) continue;

    // 兼职折算：< 20 小时/周 减半
    const adjustedMonths =
      entry.hoursPerWeek && entry.hoursPerWeek < 20 ? months / 2 : months;

    if (entry.country === "AU" || entry.country === "Australia") {
      auMonths += adjustedMonths;
    } else {
      overseasMonths += adjustedMonths;
    }
  }

  return {
    overseasYears: Math.floor(overseasMonths / 12),
    auYears: Math.floor(auMonths / 12),
  };
}

function parseYearMonth(s: string): Date | null {
  // 支持 "YYYY-MM" 或 "YYYY-MM-DD"
  const m = /^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/.exec(s);
  if (!m) return null;
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10) - 1;
  return new Date(year, month, 1);
}

function monthsBetween(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
}

function calculateOverseasWorkPoints(years: number): number {
  if (years >= 8) return 15;
  if (years >= 5) return 10;
  if (years >= 3) return 5;
  return 0;
}

function calculateAuWorkPoints(years: number): number {
  if (years >= 8) return 20;
  if (years >= 5) return 15;
  if (years >= 3) return 10;
  if (years >= 1) return 5;
  return 0;
}

// ════════════════════════════════════════════
// 学历打分
// ════════════════════════════════════════════
function calculateEducationPoints(degree: AssessmentInput["highestDegree"]): number {
  switch (degree) {
    case "PHD":
      return 20;
    case "MASTER":
    case "BACHELOR":
      return 15;
    case "DIPLOMA":
      return 10;
    default:
      return 0;
  }
}

// ════════════════════════════════════════════
// 配偶加分
// ════════════════════════════════════════════
function calculatePartnerPoints(
  maritalStatus: AssessmentInput["maritalStatus"],
  partnerEligible: boolean
): number {
  // 单身：+10 分（视为"无配偶牵制"）
  if (maritalStatus === "SINGLE") return 10;
  // 已婚/事实婚姻 + 配偶 Competent 英语 + 职业评估：+10
  if (partnerEligible) return 10;
  // 已婚 + 配偶只有 Competent 英语（无评估）：+5
  // 这里假设只要已婚就至少 +5（简化处理）
  return 5;
}

// ════════════════════════════════════════════
// 主函数
// ════════════════════════════════════════════

/**
 * 计算一个客户的完整 EOI 分数
 *
 * @param input 评估输入（经过前端验证）
 * @returns 分项明细 + 三档总分
 */
export function calculatePoints(input: AssessmentInput): PointsBreakdown {
  const notes: string[] = [];

  // 年龄
  const ageResult = calculateAgePoints(input.age);
  if (!ageResult.eligible) {
    notes.push(`⚠️ 年龄 ${input.age} 超出技术移民范围（45 岁封顶）`);
  }

  // 英语
  const englishResult = calculateEnglishPoints(input.englishTest, input.englishOverall);
  if (!englishResult.eligible) {
    notes.push(
      `⚠️ 英语不足 Competent（IELTS 6.0 / PTE 50），不符合技术移民基本门槛`
    );
  } else if (englishResult.points === 20) {
    notes.push(`✅ 英语 Superior（+20 分）`);
  } else if (englishResult.points === 10) {
    notes.push(`✅ 英语 Proficient（+10 分）`);
  }

  // 工作经验
  const { overseasYears, auYears } = splitWorkExperience(input.workExperience);
  const overseasWorkPoints = calculateOverseasWorkPoints(overseasYears);
  const auWorkPoints = calculateAuWorkPoints(auYears);
  if (overseasYears > 0) notes.push(`境外工作经验 ${overseasYears} 年（+${overseasWorkPoints} 分）`);
  if (auYears > 0) notes.push(`澳洲工作经验 ${auYears} 年（+${auWorkPoints} 分）`);

  // 学历
  const educationPoints = calculateEducationPoints(input.highestDegree);

  // 澳洲学习
  const auStudyPoints = input.australianStudy ? 5 : 0;
  const regionalStudyPoints = input.regionalStudy ? 5 : 0;
  if (input.australianStudy) notes.push(`✅ 澳洲学习 2+ 年（+5 分）`);
  if (input.regionalStudy) notes.push(`✅ 偏远地区学习（+5 分）`);

  // NAATI / PY
  const naatiPoints = input.hasNAATI ? 5 : 0;
  const pyPoints = input.hasProfessionalYear ? 5 : 0;
  if (input.hasNAATI) notes.push(`✅ NAATI CCL（+5 分）`);
  if (input.hasProfessionalYear) notes.push(`✅ Professional Year（+5 分）`);

  // 配偶
  const partnerPoints = calculatePartnerPoints(
    input.maritalStatus,
    input.partnerEligible
  );
  if (input.maritalStatus === "SINGLE") {
    notes.push(`单身（+10 分）`);
  } else if (input.partnerEligible) {
    notes.push(`✅ 配偶职业评估 + 英语达标（+10 分）`);
  } else {
    notes.push(`配偶只有基本英语（+5 分，可通过考英语/做评估提升到 +10）`);
  }

  // 合计基础分（不含州担保）
  const base189 =
    ageResult.points +
    englishResult.points +
    overseasWorkPoints +
    auWorkPoints +
    educationPoints +
    auStudyPoints +
    regionalStudyPoints +
    naatiPoints +
    pyPoints +
    partnerPoints;

  // 州担保加分
  const stateNomination190 = 5;
  const stateNomination491 = 15;

  return {
    age: ageResult.points,
    english: englishResult.points,
    overseasWork: overseasWorkPoints,
    auWork: auWorkPoints,
    education: educationPoints,
    auStudy: auStudyPoints,
    regionalStudy: regionalStudyPoints,
    naati: naatiPoints,
    professionalYear: pyPoints,
    partner: partnerPoints,
    stateNomination190,
    stateNomination491,
    total189: base189,
    total190: base189 + stateNomination190,
    total491: base189 + stateNomination491,
    overseasYears,
    auYears,
    ageEligible: ageResult.eligible,
    englishEligible: englishResult.eligible,
    notes,
  };
}

// ════════════════════════════════════════════
// 辅助：判断是否符合基本技术移民资格
// ════════════════════════════════════════════

export type EligibilityResult = {
  eligible: boolean;
  reasons: string[]; // 不符合的原因
};

export function checkEligibility(
  input: AssessmentInput,
  breakdown: PointsBreakdown
): EligibilityResult {
  const reasons: string[] = [];
  if (!breakdown.ageEligible) {
    reasons.push("年龄超出 45 岁上限");
  }
  if (!breakdown.englishEligible) {
    reasons.push("英语未达 Competent 水平（IELTS 6.0 / PTE 50）");
  }
  if (breakdown.total491 < 65) {
    reasons.push(
      `491 总分 ${breakdown.total491} 低于 65 分获邀基本线，建议考虑非技术移民路径（如 482 SID / DAMA）`
    );
  }
  return {
    eligible: reasons.length === 0,
    reasons,
  };
}
