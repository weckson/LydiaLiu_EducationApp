// AI 自动标签和分类推荐
//
// 给定知识条目的标题和正文，推荐分类和标签。
// 功能 2（PDF 导入）和功能 3（手动录入推荐）共用这个模块。

import { getProvider } from "./provider";
import { prisma } from "../db";

export type TagSuggestion = {
  category: string;
  tags: string[];
  title?: string; // PDF 导入时用，手动录入时已有标题
};

/**
 * 根据标题和内容推荐分类和标签
 * @param title 标题（PDF 导入时可能为空，LLM 会自动生成）
 * @param content 正文内容
 * @returns 推荐的分类、标签、标题
 */
export async function suggestTagsAndCategory(
  title: string,
  content: string
): Promise<TagSuggestion> {
  // 1. 获取已有的所有分类和标签（让 LLM 优先从中选择，保持一致性）
  const [existingCategories, existingTags] = await Promise.all([
    prisma.knowledgeEntry
      .groupBy({ by: ["category"] })
      .then((rows) =>
        rows.map((r) => r.category).filter((c): c is string => c != null)
      ),
    prisma.tag.findMany({ select: { name: true } }).then((tags) =>
      tags.map((t) => t.name)
    ),
  ]);

  // 2. 构造 prompt
  const provider = await getProvider();

  const systemPrompt = `你是澳洲留学/移民顾问 Lydia 的知识库管理助手。

任务：根据知识条目的标题和正文，推荐最合适的分类和标签。

已有分类（优先从中选择）：
${existingCategories.length > 0 ? existingCategories.join("、") : "（暂无，请创建新分类）"}

已有标签（优先从中选择，也可以新建）：
${existingTags.length > 0 ? existingTags.join("、") : "（暂无）"}

规则：
1. 分类选 1 个，要简洁（如"签证政策"、"院校信息"、"技术移民"、"费用信息"等）
2. 标签选 3-5 个，可以混合已有标签和新建标签
3. 标签要具体（如"500签证"、"IELTS"、"NSW"），不要太泛（如"移民"）
4. 如果标题为空，基于正文内容生成一个简洁的标题
5. 只输出 JSON，不要其他文字

输出格式：
{"category": "分类名", "tags": ["标签1", "标签2", "标签3"], "title": "标题"}`;

  const userPrompt = `标题：${title || "（请根据内容生成标题）"}

正文（前 2000 字）：
${content.slice(0, 2000)}`;

  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 500 }
  );

  // 3. 解析 JSON
  return parseTagSuggestion(result.content, title);
}

function parseTagSuggestion(raw: string, originalTitle: string): TagSuggestion {
  try {
    let cleaned = raw.trim();
    // 去掉 markdown 代码块
    const codeBlock = /```(?:json)?\s*([\s\S]*?)```/.exec(cleaned);
    if (codeBlock) cleaned = codeBlock[1].trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      const obj = JSON.parse(cleaned.slice(start, end + 1));
      return {
        category: String(obj.category ?? "未分类"),
        tags: Array.isArray(obj.tags)
          ? obj.tags.map(String).slice(0, 8)
          : [],
        title: obj.title && !originalTitle ? String(obj.title) : undefined,
      };
    }
  } catch (e) {
    console.error("[auto-tagger] JSON 解析失败:", e);
  }

  return { category: "未分类", tags: [] };
}
