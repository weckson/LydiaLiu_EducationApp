// 职业匹配核心逻辑
//
// 流程：
// 1. AI 阶段 1：根据学历+经验，从 ANZSCO 目录里筛选 5-10 个候选职业（broad）
// 2. Web Search 阶段：对每个候选，查清单和州状态（最新数据）
// 3. AI 阶段 2：综合评估 + 详细输出
//
// 整个流程对每个评估约消耗 ~$0.05-0.10

import { getProvider } from "../ai/provider";
import {
  ANZSCO_CATALOGUE,
  DOMAIN_LABELS,
  type AnzscoEntry,
  type Domain,
} from "./anzsco-catalogue";
import type {
  CareerMatchInput,
  CareerMatchResult,
  DetailedOccupationMatch,
} from "./types";

// ════════════════════════════════════════════
// 主入口
// ════════════════════════════════════════════

export async function runCareerMatch(
  input: CareerMatchInput
): Promise<CareerMatchResult> {
  console.log(
    `[career-match] ▶ 开始匹配: ${input.fieldOfStudy} / ${input.workExperience.length} 段经验`
  );

  // 阶段 1：AI 一次性输出全部匹配（带详细分析）
  const result = await comprehensiveMatch(input);

  console.log(
    `[career-match] ✅ 完成，找到 ${result.occupations.length} 个匹配，${result.tokensUsed} tokens`
  );
  return result;
}

// ════════════════════════════════════════════
// 综合匹配（一次 LLM 调用完成所有匹配 + 分析）
// ════════════════════════════════════════════

async function comprehensiveMatch(
  input: CareerMatchInput
): Promise<CareerMatchResult> {
  const provider = await getProvider();

  // 把 ANZSCO 目录浓缩成给 LLM 的参考表
  const catalogueRef = ANZSCO_CATALOGUE.map(
    (e) =>
      `- ${e.code} ${e.nameEn}（${e.nameZh}）| ${e.domain} | ${e.assessmentBody} | 典型背景：${e.typicalEducation} + ${e.typicalExperience}${e.notes ? " ｜ " + e.notes : ""}`
  ).join("\n");

  const workSummary = input.workExperience.length > 0
    ? input.workExperience
        .map((w, i) => {
          const type = w.isInternship ? "[实习]" : "[全职]";
          return `${i + 1}. ${type} ${w.jobTitle} @ ${w.company || "—"} (${w.country || "—"}, ${w.durationYears} 年)${w.description ? "\n   职责：" + w.description : ""}`;
        })
        .join("\n")
    : "（无工作经验）";

  const systemPrompt = `你是澳洲移民顾问 Lydia 的资深职业评估专家。

你的任务：根据客户的学历和工作经验，详细分析其能匹配哪些 ANZSCO 职业代码，并给出每个职业的详细评估（包括评估机构要求、清单归属、各州接受情况）。

## 你需要参考的 ANZSCO 职业目录（精选 150+ 常见代码）

${catalogueRef}

## 关键原则

1. **覆盖广**：列出 5-10 个最匹配的职业，按匹配度从高到低排序
2. **从目录优先**：上面目录里的代码优先推荐；如确有更合适的目录外代码也可推荐（必须给出准确的 6 位代码）
3. **诚实匹配**：如果客户背景实在匹配不到任何职业，直接说"不符合"并给出建议（如："建议补一个澳洲学位"或"非技术移民路径"）
4. **每个职业必须详细**：包括评估机构、详细要求、各州状态
5. **数据时效**：清单归属和州状态用 2025 年最新数据

## 各州清单参考（2025 年度，仅供参考，最新以官网为准）

- **NSW 190/491**：偏爱 IT、工程、医疗、教育，IT 通常需 90+ 分
- **VIC 190/491**：要求当前在 VIC 工作，护理/教师/IT 优先，70-85 分
- **QLD 190/491**：本地毕业生友好，2025-26 配额翻倍至 2,600
- **SA 190/491**：本地毕业生几乎全清单接受，491 65 分起
- **WA 190/491**：偏爱采矿/工程/医疗，Perth 属偏远地区
- **TAS 190/491**：本地毕业生（Cat 1）2 年居住即可申请
- **NT 190/491**：DAMA 协议地区，对 offshore 最友好
- **ACT 190/491**：用 ACT Matrix 评估，对 ANU/UC 毕业生友好

## 输出格式（严格 JSON）

\`\`\`json
{
  "summary": "整体总结（100-200 字，分析客户的强项和合适方向）",
  "matched": true,
  "unmatchedReason": null,
  "alternativePaths": null,
  "occupations": [
    {
      "anzscoCode": "234611",
      "nameEn": "Medical Laboratory Scientist",
      "nameZh": "医学实验室科学家",
      "domain": "Science",
      "assessment": {
        "body": "AIMS",
        "educationRequirement": "医学实验/生物医学本科以上",
        "workExperienceRequirement": "通常需 1-2 年相关经验",
        "englishRequirement": "IELTS 7.0 各项 6.5",
        "deductionRules": "无明显扣减",
        "applicationFee": "约 AUD 600",
        "processingTime": "8-12 周",
        "specialNotes": "需提供实验室技能详细描述"
      },
      "onLists": {
        "CSOL": true,
        "MLTSSL": true,
        "STSOL": false,
        "ROL": false,
        "ENSOL": true
      },
      "stateAvailability": [
        {
          "state": "NSW",
          "programs": [
            {"program": "190", "available": "open", "notes": "需医疗行业经验"},
            {"program": "491", "available": "open"}
          ]
        },
        {
          "state": "VIC",
          "programs": [
            {"program": "190", "available": "by-streams", "notes": "Target Sectors 健康类"},
            {"program": "491", "available": "open"}
          ]
        }
        // ... 必须涵盖 NSW VIC QLD SA WA TAS NT ACT 全部 8 个州
      ],
      "matchScore": 85,
      "confidence": "high",
      "matchReasoning": "客户生物本科 + 5 年生物实验室经验，与 Medical Laboratory Scientist 职责高度吻合",
      "pros": [
        "教育背景直接匹配",
        "工作经验丰富",
        "在多个州的 190/491 清单上"
      ],
      "cons": [
        "AIMS 评估对临床实验室经验要求严格",
        "英语要求高（IELTS 7.0）"
      ],
      "improvementTips": [
        "准备详细的实验室技能描述",
        "尽快考取 IELTS 7.0",
        "联系 AIMS 确认评估细节"
      ],
      "recommendedVisas": ["189", "190 NSW", "190 VIC", "491 SA", "482"]
    }
    // ... 其他职业
  ]
}
\`\`\`

## 重要

- stateAvailability 必须包含 NSW/VIC/QLD/SA/WA/TAS/NT/ACT 全部 8 个州
- 如果某州不接受这个职业，写 "available": "closed"
- 如果不确定，写 "available": "unknown"
- domain 必须是：ICT / Engineering / Health / Science / Education / Accounting / Business / Trades / Creative / Social / Hospitality / Agriculture 之一
- 所有数字字段不能是字符串
- matchScore 是 0-100 的数字

如果客户背景实在匹配不到任何 ANZSCO 职业（比如学历过低、工作经验完全无关），返回：
\`\`\`json
{
  "summary": "客户背景分析...",
  "matched": false,
  "unmatchedReason": "具体原因",
  "alternativePaths": ["建议 1", "建议 2"],
  "occupations": []
}
\`\`\``;

  const userPrompt = `## 客户档案

**姓名**：${input.clientName || "未提供"}
**最高学历**：${input.highestDegree}（${input.fieldOfStudy}）
**毕业院校国家**：${input.degreeCountry || "未提供"}
**毕业年份**：${input.graduationYear || "未提供"}
**澳洲学习经历**：${input.australianStudy ? "有" : "无"}

**工作 / 实习经验**：
${workSummary}

**证书**：${input.certifications || "无"}

**其他补充**：${input.notes || "无"}

请详细分析此客户能匹配的所有澳洲移民职业代码，按匹配度排序，给出每个职业的完整评估（包括 8 个州的接受情况）。`;

  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 12000 }
  );

  // 解析 JSON
  const parsed = parseMatchResult(result.content);

  return {
    ...parsed,
    domainsCovered: extractDomains(parsed.occupations),
    tokensUsed: result.totalTokens,
    dataFreshness: new Date().toISOString(),
  };
}

// ════════════════════════════════════════════
// JSON 解析（带容错）
// ════════════════════════════════════════════

function parseMatchResult(raw: string): Omit<CareerMatchResult, "tokensUsed" | "dataFreshness" | "domainsCovered"> {
  let cleaned = raw.trim();
  const codeBlock = /```(?:json)?\s*([\s\S]*?)```/.exec(cleaned);
  if (codeBlock) cleaned = codeBlock[1].trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return makeFallback("LLM 输出格式错误，无法解析");
  }

  try {
    const obj = JSON.parse(cleaned.slice(start, end + 1));
    return {
      summary: String(obj.summary ?? ""),
      matched: Boolean(obj.matched),
      unmatchedReason: obj.unmatchedReason ? String(obj.unmatchedReason) : undefined,
      alternativePaths: Array.isArray(obj.alternativePaths)
        ? obj.alternativePaths.map(String)
        : undefined,
      occupations: Array.isArray(obj.occupations)
        ? obj.occupations.map(normalizeOccupation).filter(Boolean) as DetailedOccupationMatch[]
        : [],
    };
  } catch (e) {
    console.error("[career-match] JSON 解析失败:", e, cleaned.slice(0, 500));
    return makeFallback("JSON 解析失败：" + (e as any)?.message);
  }
}

function normalizeOccupation(raw: any): DetailedOccupationMatch | null {
  if (!raw || !raw.anzscoCode || !raw.nameEn) return null;

  const validDomains = ["ICT","Engineering","Health","Science","Education","Accounting","Business","Trades","Creative","Social","Hospitality","Agriculture"];
  const domain = validDomains.includes(raw.domain) ? raw.domain : "Business";

  return {
    anzscoCode: String(raw.anzscoCode),
    nameEn: String(raw.nameEn),
    nameZh: String(raw.nameZh ?? raw.nameEn),
    domain,
    assessment: {
      body: String(raw.assessment?.body ?? "未知"),
      educationRequirement: String(raw.assessment?.educationRequirement ?? ""),
      workExperienceRequirement: String(raw.assessment?.workExperienceRequirement ?? ""),
      englishRequirement: raw.assessment?.englishRequirement ? String(raw.assessment.englishRequirement) : undefined,
      deductionRules: raw.assessment?.deductionRules ? String(raw.assessment.deductionRules) : undefined,
      applicationFee: raw.assessment?.applicationFee ? String(raw.assessment.applicationFee) : undefined,
      processingTime: raw.assessment?.processingTime ? String(raw.assessment.processingTime) : undefined,
      specialNotes: raw.assessment?.specialNotes ? String(raw.assessment.specialNotes) : undefined,
    },
    onLists: {
      CSOL: Boolean(raw.onLists?.CSOL),
      MLTSSL: Boolean(raw.onLists?.MLTSSL),
      STSOL: Boolean(raw.onLists?.STSOL),
      ROL: Boolean(raw.onLists?.ROL),
      ENSOL: Boolean(raw.onLists?.ENSOL),
    },
    stateAvailability: Array.isArray(raw.stateAvailability)
      ? raw.stateAvailability.map((s: any) => ({
          state: s.state,
          programs: Array.isArray(s.programs)
            ? s.programs.map((p: any) => ({
                program: p.program,
                available: p.available || "unknown",
                notes: p.notes ? String(p.notes) : undefined,
              }))
            : [],
        }))
      : [],
    matchScore: Number(raw.matchScore ?? 0),
    confidence: ["high","medium","low"].includes(raw.confidence) ? raw.confidence : "medium",
    matchReasoning: String(raw.matchReasoning ?? ""),
    pros: Array.isArray(raw.pros) ? raw.pros.map(String) : [],
    cons: Array.isArray(raw.cons) ? raw.cons.map(String) : [],
    improvementTips: Array.isArray(raw.improvementTips) ? raw.improvementTips.map(String) : [],
    recommendedVisas: Array.isArray(raw.recommendedVisas) ? raw.recommendedVisas.map(String) : [],
    sources: Array.isArray(raw.sources) ? raw.sources.map(String) : undefined,
  };
}

function extractDomains(occs: DetailedOccupationMatch[]): Domain[] {
  return Array.from(new Set(occs.map((o) => o.domain))) as Domain[];
}

function makeFallback(reason: string): Omit<CareerMatchResult, "tokensUsed" | "dataFreshness" | "domainsCovered"> {
  return {
    summary: "⚠️ " + reason,
    matched: false,
    unmatchedReason: reason,
    alternativePaths: ["请重试或检查输入信息"],
    occupations: [],
  };
}
