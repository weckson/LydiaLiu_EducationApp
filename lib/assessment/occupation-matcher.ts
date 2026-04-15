// 移民方案智能评估器 - 职业代码匹配
//
// 根据客户的学历 + 工作经验，推荐 3-5 个合适的 ANZSCO 职业代码 + 评估机构。
// 策略：
// 1. 用 RAG 从知识库检索 CSOL 清单相关条目
// 2. 把客户背景 + 检索结果 + 常见职业代码表传给 LLM
// 3. LLM 输出结构化 JSON（带 confidence 和 reason）

import { getProvider } from "../ai/provider";
import { retrieve } from "../ai/rag";
import type {
  AssessmentInput,
  RecommendedOccupation,
  WorkExperience,
} from "./types";

/**
 * 为客户匹配 Top 3-5 个职业代码
 */
export async function matchOccupations(
  input: AssessmentInput
): Promise<RecommendedOccupation[]> {
  // 1. 构造查询串，从知识库检索相关内容
  const searchQuery = buildSearchQuery(input);
  const retrieved = await retrieve(searchQuery, { topK: 3 });

  // 2. 构造给 LLM 的提示
  const ragContext = retrieved
    .map(
      (r, i) =>
        `[${i + 1}] ${r.title}\n${r.contentMd.slice(0, 1500)}`
    )
    .join("\n\n---\n\n");

  const workSummary = summarizeWork(input.workExperience);

  const systemPrompt = `你是澳洲移民顾问 Lydia 的职业评估专家助手。

任务：根据客户的学历和工作经验，推荐 3 个最匹配的 ANZSCO 职业代码。

参考资料（RAG 检索）：
${ragContext || "（无相关知识库内容）"}

常见职业代码速查（仅供参考，不是完整清单）：
- **ICT 类（ACS 评估）**：
  - 261313 Software Engineer 软件工程师
  - 261312 Developer Programmer 开发员
  - 261112 Systems Analyst 系统分析师
  - 261111 ICT Business Analyst ICT 业务分析师
  - 263111 Computer Network and Systems Engineer 网络工程师
  - 262111 Database Administrator 数据库管理员
  - 262112 ICT Security Specialist 信息安全专家
  - 261399 Software and Applications Programmers nec
- **工程类（EA 评估）**：
  - 233211 Civil Engineer 土木工程师
  - 233214 Structural Engineer 结构工程师
  - 233512 Mechanical Engineer 机械工程师
  - 233311 Electrical Engineer 电气工程师
  - 233111 Chemical Engineer 化学工程师
  - 233611 Mining Engineer 采矿工程师
  - 233912 Biomedical Engineer 生物医学工程师
  - 233915 Environmental Engineer 环境工程师
- **会计类（CPA/CA_ANZ/IPA 评估）**：
  - 221111 Accountant (General) 普通会计师
  - 221112 Management Accountant 管理会计师
  - 221113 Taxation Accountant 税务会计师
  - 221213 External Auditor 外部审计师
- **护理医疗类（ANMAC / AHPRA）**：
  - 254415 Registered Nurse (Medical) 注册护士
  - 254411 Midwifery 助产士
  - 252711 Physiotherapist 理疗师
  - 252411 Occupational Therapist 职业治疗师
- **教师类（AITSL）**：
  - 241111 Early Childhood Teacher 早教教师
  - 241213 Primary School Teacher 小学教师
  - 241411 Secondary School Teacher 中学教师
- **商业专业（VETASSESS）**：
  - 225111 Advertising Specialist 广告专家
  - 132211 Finance Manager 财务经理
  - 133111 Construction Project Manager 建筑项目经理
  - 149913 Restaurant Manager 餐厅经理
  - 225311 PR Professional 公关
- **技工类（TRA 评估）**：
  - 351311 Chef 厨师
  - 351411 Cook 厨工
  - 331212 Carpenter 木工
  - 341111 Electrician 电工
  - 334111 Plumber 水管工

评估原则：
1. **看重学历-职业匹配度**：如工程本科 → 工程类；计算机本科 → ICT 类
2. **看重工作经验主线**：过往 5 年主要做什么决定第一推荐
3. **confidence**：high=高度匹配；medium=可以评估但非最佳；low=需额外课程
4. **输出 3 个职业**，按推荐强度降序
5. **必须返回合法 JSON**，严格按照下方 schema`;

  const userPrompt = `【客户背景】
- 年龄：${input.age}
- 最高学历：${input.highestDegree} (${input.fieldOfStudy})
- 毕业年份：${input.graduationYear}
- 毕业院校国家：${input.degreeCountry}
- GPA：${input.gpa ?? "未提供"}
- 澳洲学习：${input.australianStudy ? "是" : "否"}
${workSummary}

请以 JSON 数组格式输出 3 个推荐职业：
\`\`\`json
[
  {
    "code": "261313",
    "name": "Software Engineer",
    "nameZh": "软件工程师",
    "assessmentBody": "ACS",
    "list": ["CSOL"],
    "confidence": "high",
    "reason": "客户计算机本科 + 5 年软件开发工作经验，高度匹配"
  },
  ...
]
\`\`\`

assessmentBody 必须是：ACS / EA / VETASSESS / CPA / CA_ANZ / IPA / TRA / ANMAC / AHPRA / AACA / AITSL / OTHER 之一
confidence 必须是：high / medium / low 之一
list 是数组，元素是：CSOL / MLTSSL / STSOL / ROL 之一（通常填 ["CSOL"]）

只输出 JSON 数组，不要其他文字。`;

  const provider = await getProvider();
  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 2000 }
  );

  // 3. 解析 JSON
  const occupations = parseOccupationsJSON(result.content);
  return occupations;
}

// ════════════════════════════════════════════
// 辅助函数
// ════════════════════════════════════════════

function buildSearchQuery(input: AssessmentInput): string {
  const mostRecent = input.workExperience[0];
  const jobTitle = mostRecent?.jobTitle ?? "";
  return `${input.fieldOfStudy} ${jobTitle} ANZSCO 职业评估 CSOL`;
}

function summarizeWork(experiences: WorkExperience[]): string {
  if (experiences.length === 0) return "- 工作经验：无";
  const lines = experiences.map((w, i) => {
    const duration =
      w.endDate === "NOW" ? `${w.startDate} 至今` : `${w.startDate} 至 ${w.endDate}`;
    return `- 工作 ${i + 1}：${w.jobTitle} @ ${w.company} (${w.country}, ${duration}, ${w.hoursPerWeek}h/周)`;
  });
  return "- 工作经验：\n" + lines.join("\n");
}

/**
 * 从 LLM 的回答里提取 JSON 数组
 * 处理 markdown 代码块 + 有时候 LLM 加的前缀文字
 */
function parseOccupationsJSON(raw: string): RecommendedOccupation[] {
  // 去掉 markdown 代码块
  let cleaned = raw.trim();
  const codeBlockMatch = /```(?:json)?\s*([\s\S]*?)```/.exec(cleaned);
  if (codeBlockMatch) cleaned = codeBlockMatch[1].trim();

  // 找第一个 [ 到最后一个 ]
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1) {
    console.error("[occupation-matcher] 无法解析 JSON:", raw);
    return [];
  }

  try {
    const jsonStr = cleaned.slice(start, end + 1);
    const parsed = JSON.parse(jsonStr);
    if (!Array.isArray(parsed)) return [];
    // 基本字段清洗
    return parsed
      .filter((o) => o && typeof o === "object" && o.code && o.name)
      .map((o) => ({
        code: String(o.code),
        name: String(o.name),
        nameZh: String(o.nameZh ?? o.name),
        assessmentBody: (o.assessmentBody ?? "OTHER") as any,
        list: Array.isArray(o.list) ? o.list : ["CSOL"],
        confidence: (o.confidence ?? "medium") as any,
        reason: String(o.reason ?? ""),
      }))
      .slice(0, 5);
  } catch (e) {
    console.error("[occupation-matcher] JSON parse 失败:", e, raw);
    return [];
  }
}
