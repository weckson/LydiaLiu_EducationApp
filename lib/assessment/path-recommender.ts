// 移民方案智能评估器 - 主协调器
//
// 这是整个评估管线的入口。负责：
// 1. 确定性打分（本地纯函数）
// 2. 职业匹配（LLM + RAG）
// 3. 政策新鲜度抓取（web search + 缓存）
// 4. RAG 检索相关 SOP
// 5. 最终 LLM 综合生成 Plan A/B/C + 州对比 + 下一步行动
// 6. 返回一份结构化的 AssessmentReport

import { getProvider } from "../ai/provider";
import { retrieve } from "../ai/rag";
import { calculatePoints, checkEligibility } from "./points-calculator";
import { matchOccupations } from "./occupation-matcher";
import { researchLatestPolicies } from "./web-research";
import type {
  AssessmentInput,
  AssessmentReport,
  PointsBreakdown,
  RecommendedOccupation,
  PathPlan,
  StateStatus,
  PolicyUpdate,
  WebResearchResult,
} from "./types";

// ════════════════════════════════════════════
// 主入口
// ════════════════════════════════════════════

export type RunAssessmentResult = {
  report: AssessmentReport;
  tokensUsed: number;
};

export async function runAssessment(
  assessmentId: string,
  input: AssessmentInput
): Promise<RunAssessmentResult> {
  console.log(`[assessment] ▶ 开始评估 ${assessmentId}`);

  // 1. 确定性打分（0 tokens）
  const pointsBreakdown = calculatePoints(input);
  const eligibility = checkEligibility(input, pointsBreakdown);
  console.log(
    `[assessment] ✓ 打分完成 189=${pointsBreakdown.total189} 190=${pointsBreakdown.total190} 491=${pointsBreakdown.total491}`
  );

  // 2. 职业匹配（LLM + RAG）
  const occupations = await matchOccupations(input);
  console.log(
    `[assessment] ✓ 职业匹配完成：${occupations.map((o) => o.code).join(", ")}`
  );

  // 3. 政策新鲜度抓取（可能抓 2-3 次 web search）
  let webResearch: Awaited<ReturnType<typeof researchLatestPolicies>>;
  try {
    webResearch = await researchLatestPolicies(input, occupations);
    console.log(`[assessment] ✓ 政策抓取完成`);
  } catch (err) {
    console.error(`[assessment] ✗ 政策抓取失败:`, err);
    // 降级：用空占位继续往下走
    webResearch = {
      stateAllocations: {
        query: "",
        content: "⚠️ 政策数据抓取失败，以下建议基于知识库",
        sources: [],
        fromCache: false,
        fetchedAt: new Date().toISOString(),
      },
      recentInvitationRounds: {
        query: "",
        content: "",
        sources: [],
        fromCache: false,
        fetchedAt: new Date().toISOString(),
      },
    };
  }

  // 4. RAG 检索相关 SOP（作为 LLM 综合时的专家经验上下文）
  const ragQuery = buildRagQuery(input, pointsBreakdown, occupations);
  const retrieved = await retrieve(ragQuery, { topK: 5 });
  console.log(`[assessment] ✓ RAG 检索到 ${retrieved.length} 条 SOP`);
  const citedKnowledgeIds = retrieved.map((r) => r.entryId);

  // 5. LLM 综合层 —— 生成 Plan A/B/C + 州对比 + 下一步
  const synthesisResult = await synthesizeReport({
    input,
    pointsBreakdown,
    occupations,
    webResearch,
    retrievedSops: retrieved,
    ineligibilityReasons: eligibility.eligible ? [] : eligibility.reasons,
  });

  // 6. 拼装最终报告
  const report: AssessmentReport = {
    id: assessmentId,
    clientName: input.clientName,
    generatedAt: new Date().toISOString(),
    dataFreshness: webResearch.stateAllocations.fetchedAt,
    executiveSummary: synthesisResult.executiveSummary,
    pointsBreakdown,
    recommendedOccupations: occupations,
    pathA: synthesisResult.pathA,
    pathB: synthesisResult.pathB,
    pathC: synthesisResult.pathC,
    stateComparison: synthesisResult.stateComparison,
    recentPolicyUpdates: synthesisResult.recentPolicyUpdates,
    occupationCutoff189: synthesisResult.occupationCutoff189,
    nextSteps: synthesisResult.nextSteps,
    citedKnowledgeIds,
    tokensUsed: synthesisResult.tokensUsed,
  };

  console.log(`[assessment] ✅ 评估完成`);
  return { report, tokensUsed: synthesisResult.tokensUsed };
}

// ════════════════════════════════════════════
// RAG 查询构造
// ════════════════════════════════════════════

function buildRagQuery(
  input: AssessmentInput,
  pts: PointsBreakdown,
  occupations: RecommendedOccupation[]
): string {
  const occNames = occupations.map((o) => o.name).join(", ");
  const scoreRange =
    pts.total491 >= 85
      ? "高分（85+）"
      : pts.total491 >= 75
        ? "中高分"
        : pts.total491 >= 65
          ? "中低分"
          : "低分";
  return `澳洲技术移民 ${scoreRange} 客户 年龄 ${input.age} 岁 ${input.highestDegree} ${input.fieldOfStudy} 职业 ${occNames} 州担保 190 491 雇主担保 482 路径选择`;
}

// ════════════════════════════════════════════
// LLM 综合层
// ════════════════════════════════════════════

type SynthesisInput = {
  input: AssessmentInput;
  pointsBreakdown: PointsBreakdown;
  occupations: RecommendedOccupation[];
  webResearch: Awaited<ReturnType<typeof researchLatestPolicies>>;
  retrievedSops: Array<{ entryId: string; title: string; contentMd: string }>;
  ineligibilityReasons: string[];
};

type SynthesisOutput = {
  executiveSummary: string;
  pathA: PathPlan;
  pathB: PathPlan;
  pathC: PathPlan;
  stateComparison: StateStatus[];
  recentPolicyUpdates: PolicyUpdate[];
  occupationCutoff189: number;
  nextSteps: string[];
  tokensUsed: number;
};

async function synthesizeReport(
  data: SynthesisInput
): Promise<SynthesisOutput> {
  const {
    input,
    pointsBreakdown,
    occupations,
    webResearch,
    retrievedSops,
    ineligibilityReasons,
  } = data;

  const sopsContext = retrievedSops
    .map(
      (s, i) =>
        `[SOP ${i + 1}] ${s.title}\n${s.contentMd.slice(0, 2000)}`
    )
    .join("\n\n---\n\n");

  const systemPrompt = `你是 Lydia 的顶级澳洲移民专家 AI 助手。

你的任务：根据客户的精确分数、推荐职业、最新政策数据和 SOP 知识，生成一份专业的移民方案评估报告。

---

【参考 1：内部 SOP 知识库】
${sopsContext || "（无）"}

---

【参考 2：最新政策数据（来自 web 搜索，${webResearch.stateAllocations.fetchedAt}）】

▸ 州担保配额和开放状态：
${webResearch.stateAllocations.content}

▸ 最近 SkillSelect 邀请轮：
${webResearch.recentInvitationRounds.content}

${
  webResearch.targetStateDetail
    ? `▸ ${input.targetState} 具体情况：\n${webResearch.targetStateDetail.content}`
    : ""
}

---

【输出要求】

你必须输出一个合法的 JSON 对象，结构如下：

\`\`\`json
{
  "executiveSummary": "一段话总结客户情况和主要建议（中文，80-150 字）",
  "pathA": {
    "label": "A",
    "priority": "primary",
    "visaSubclass": "189|190|491|482|186|494|858|DAMA",
    "visaName": "签证完整名称",
    "targetState": "推荐的州名（若适用）",
    "expectedPoints": 数字,
    "invitationCutoff": 数字或 null,
    "feasibility": "high|medium|low",
    "timeline": "时间线说明",
    "estimatedCost": "成本区间",
    "successRate": "成功率描述",
    "keySteps": ["步骤1", "步骤2", "步骤3", "步骤4"],
    "risks": ["风险1", "风险2"],
    "advantages": ["优势1", "优势2"],
    "rationale": "为什么这是 A 方案的理由"
  },
  "pathB": { ... 结构同 pathA，label='B', priority='alternative' },
  "pathC": { ... 结构同 pathA，label='C', priority='fallback' },
  "stateComparison": [
    {
      "state": "NSW",
      "stateNameZh": "新南威尔士",
      "program": "190",
      "openStatus": "open|closed|invitation-only|unknown",
      "allocation2526": 数字,
      "remainingQuota": "文字描述",
      "recentInvitationCutoff": 数字,
      "occupationOnList": true|false,
      "notes": "该州对客户的适合度和关键点"
    },
    ... 必须涵盖 NSW/VIC/QLD/SA/WA/TAS/NT/ACT 全部 8 个州
  ],
  "occupationCutoff189": 数字,
  "recentPolicyUpdates": [
    {
      "date": "YYYY-MM-DD",
      "category": "fees|points|occupation-list|state-nomination|other",
      "title": "标题",
      "summary": "摘要",
      "sourceUrl": "URL 或 null",
      "impactToClient": "high|medium|low|none"
    }
  ],
  "nextSteps": ["下一步 1", "下一步 2", "下一步 3", "下一步 4", "下一步 5"]
}
\`\`\`

关键原则：
1. **Plan A 必须是成功率最高、最推荐的方案**
2. **Plan B 是备选，Plan C 是保底**（分数不够/面临拒签时的退路）
3. 分数数字必须和给定的分项明细一致，不要自己重算
4. 时间线和成本要具体（给范围而不是单一数字）
5. 如果客户分数确实很低，Plan A 应直接建议 482 SID 或 DAMA，而非硬推 189
6. **stateComparison 必须覆盖全部 8 个州/领地**（NSW/VIC/QLD/SA/WA/TAS/NT/ACT），每个都要有 recentInvitationCutoff
7. **recentInvitationCutoff 必须是该州针对客户推荐的第一个职业（ANZSCO）的最近一年获邀分数**，不是大众平均分。基于 web search 数据给出该职业在该州的实际获邀线
8. **allocation2526 绝对不能为 null**——填入 2025-26 配额数字
9. nextSteps 必须是具体可执行的行动清单（包含"本周做"、"本月做"、"这学期做"等时间尺度）
10. **Plan A/B/C 的 invitationCutoff 也必须是针对客户推荐职业的获邀分数**，不是通用分数
11. **occupationCutoff189** 是推荐的第一个职业在 189 通道的最近一年获邀分数（所有 Plan 和分数对比都用这个数字作为基准）
12. 严格按 JSON 输出，不要添加 markdown 前缀`;

  const userPrompt = `【客户基本信息】
姓名：${input.clientName || "未提供"}
年龄：${input.age}
婚姻：${input.maritalStatus}，配偶可加分：${input.partnerEligible}
学历：${input.highestDegree} (${input.fieldOfStudy})，毕业于 ${input.degreeCountry} ${input.graduationYear}
GPA：${input.gpa ?? "未提供"}
澳洲学习：${input.australianStudy}，偏远地区学习：${input.regionalStudy}
英语：${input.englishTest} 总分 ${input.englishOverall ?? "N/A"}
NAATI：${input.hasNAATI}，PY：${input.hasProfessionalYear}
目标州：${input.targetState}，接受偏远地区：${input.willingRegional}
紧迫程度：${input.urgency}

【分数精确计算结果】
- 189 总分：${pointsBreakdown.total189}
- 190 总分：${pointsBreakdown.total190}（含州担保 +5）
- 491 总分：${pointsBreakdown.total491}（含州担保 +15）
- 海外工作年限：${pointsBreakdown.overseasYears}
- 澳洲工作年限：${pointsBreakdown.auYears}
${pointsBreakdown.notes.map((n) => `- ${n}`).join("\n")}

${
  ineligibilityReasons.length > 0
    ? `【⚠️ 注意】客户不完全符合基本资格，原因：\n${ineligibilityReasons.map((r) => "- " + r).join("\n")}\n请在方案中考虑非技术移民路径。`
    : ""
}

【推荐职业】
${occupations
  .map(
    (o, i) =>
      `${i + 1}. ${o.code} ${o.name} (${o.assessmentBody}, ${o.confidence}) - ${o.reason}`
  )
  .join("\n")}

请根据以上信息，结合 SOP 知识和最新政策数据，输出 Plan A/B/C 评估报告（JSON 格式）。`;

  const provider = await getProvider();
  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 8000 }
  );

  // 解析 JSON
  const parsed = parseSynthesisJSON(result.content);
  return {
    ...parsed,
    tokensUsed: result.totalTokens,
  };
}

// ════════════════════════════════════════════
// JSON 解析（容错）
// ════════════════════════════════════════════

function parseSynthesisJSON(raw: string): Omit<SynthesisOutput, "tokensUsed"> {
  let cleaned = raw.trim();
  const codeBlockMatch = /```(?:json)?\s*([\s\S]*?)```/.exec(cleaned);
  if (codeBlockMatch) cleaned = codeBlockMatch[1].trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    console.error("[path-recommender] 无法定位 JSON 对象:", raw.slice(0, 500));
    return makeFallbackSynthesis();
  }

  try {
    const jsonStr = cleaned.slice(start, end + 1);
    const obj = JSON.parse(jsonStr);
    return {
      executiveSummary: String(obj.executiveSummary ?? ""),
      pathA: normalizePathPlan(obj.pathA, "A", "primary"),
      pathB: normalizePathPlan(obj.pathB, "B", "alternative"),
      pathC: normalizePathPlan(obj.pathC, "C", "fallback"),
      stateComparison: Array.isArray(obj.stateComparison)
        ? obj.stateComparison.map(normalizeStateStatus).filter(Boolean)
        : [],
      recentPolicyUpdates: Array.isArray(obj.recentPolicyUpdates)
        ? obj.recentPolicyUpdates.map(normalizePolicyUpdate)
        : [],
      occupationCutoff189: Number(obj.occupationCutoff189 ?? 85),
      nextSteps: Array.isArray(obj.nextSteps)
        ? obj.nextSteps.map(String)
        : [],
    };
  } catch (e) {
    console.error("[path-recommender] JSON parse 失败:", e, raw.slice(0, 500));
    return makeFallbackSynthesis();
  }
}

function normalizePathPlan(
  raw: any,
  label: "A" | "B" | "C",
  priority: "primary" | "alternative" | "fallback"
): PathPlan {
  if (!raw || typeof raw !== "object") {
    return makeEmptyPathPlan(label, priority);
  }
  return {
    label,
    priority,
    visaSubclass: raw.visaSubclass || "189",
    visaName: String(raw.visaName ?? ""),
    targetState: raw.targetState ?? undefined,
    expectedPoints: Number(raw.expectedPoints ?? 0),
    invitationCutoff: raw.invitationCutoff != null ? Number(raw.invitationCutoff) : undefined,
    feasibility: raw.feasibility || "medium",
    timeline: String(raw.timeline ?? ""),
    estimatedCost: String(raw.estimatedCost ?? ""),
    successRate: String(raw.successRate ?? ""),
    keySteps: Array.isArray(raw.keySteps) ? raw.keySteps.map(String) : [],
    risks: Array.isArray(raw.risks) ? raw.risks.map(String) : [],
    advantages: Array.isArray(raw.advantages) ? raw.advantages.map(String) : [],
    rationale: String(raw.rationale ?? ""),
  };
}

function makeEmptyPathPlan(
  label: "A" | "B" | "C",
  priority: "primary" | "alternative" | "fallback"
): PathPlan {
  return {
    label,
    priority,
    visaSubclass: "189",
    visaName: "暂未生成",
    expectedPoints: 0,
    feasibility: "low",
    timeline: "",
    estimatedCost: "",
    successRate: "",
    keySteps: [],
    risks: [],
    advantages: [],
    rationale: "LLM 输出解析失败",
  };
}

function normalizeStateStatus(raw: any): StateStatus | null {
  if (!raw || typeof raw !== "object" || !raw.state) return null;
  return {
    state: String(raw.state),
    stateNameZh: String(raw.stateNameZh ?? raw.state),
    program: raw.program === "491" ? "491" : "190",
    openStatus: raw.openStatus || "unknown",
    allocation2526: raw.allocation2526 != null ? Number(raw.allocation2526) : undefined,
    remainingQuota: raw.remainingQuota ? String(raw.remainingQuota) : undefined,
    recentInvitationCutoff:
      raw.recentInvitationCutoff != null
        ? Number(raw.recentInvitationCutoff)
        : undefined,
    occupationOnList: Boolean(raw.occupationOnList),
    notes: String(raw.notes ?? ""),
  };
}

function normalizePolicyUpdate(raw: any): PolicyUpdate {
  return {
    date: String(raw?.date ?? ""),
    category: raw?.category || "other",
    title: String(raw?.title ?? ""),
    summary: String(raw?.summary ?? ""),
    sourceUrl: raw?.sourceUrl ?? undefined,
    impactToClient: raw?.impactToClient || "none",
  };
}

function makeFallbackSynthesis(): Omit<SynthesisOutput, "tokensUsed"> {
  return {
    executiveSummary: "⚠️ 方案生成失败，请重试或手动检查。",
    pathA: makeEmptyPathPlan("A", "primary"),
    pathB: makeEmptyPathPlan("B", "alternative"),
    pathC: makeEmptyPathPlan("C", "fallback"),
    stateComparison: [],
    recentPolicyUpdates: [],
    occupationCutoff189: 85,
    nextSteps: [],
  };
}
