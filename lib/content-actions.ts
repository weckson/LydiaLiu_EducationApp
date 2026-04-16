"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { getProvider } from "./ai/provider";
import { retrieve } from "./ai/rag";

type Platform = "XIAOHONGSHU" | "WECHAT" | "INSTAGRAM";

const PLATFORM_PROMPTS: Record<Platform, string> = {
  XIAOHONGSHU: `你是一个专业的小红书内容创作者，同时也是澳洲留学/移民领域的专家。

写作风格要求：
- **标题**：10-20 字，带 2-3 个 emoji，用问句或感叹句吸引点击
- **正文**：300-600 字
- 分段要短（每段 2-3 句话）
- 用大量 emoji 装饰关键段落
- 用"划重点"、"一定要看"等口语化表达
- 加粗重点数据和结论
- 结尾加互动引导（"你觉得呢？""评论区告诉我"）
- 整体风格：专业但亲切，像一个懂行的姐姐在分享经验
- 最后列出 5-8 个 hashtag（# 开头）`,

  WECHAT: `你是一个专业的微信公众号内容编辑，同时也是澳洲留学/移民领域的资深顾问。

写作风格要求：
- **标题**：15-30 字，严谨但有吸引力
- **正文**：800-1500 字
- 段落结构清晰（用小标题分区）
- 引用官方来源和数据
- 语气专业严谨但不生硬
- 适当使用表格展示对比数据
- 结尾有行动建议（"建议尽快咨询专业顾问"）
- 不用过多 emoji，保持专业形象
- 文末附联系方式提示`,

  INSTAGRAM: `You are a professional Instagram content creator specializing in Australian immigration and education.

Writing requirements:
- **Caption**: 100-250 words in English
- Engaging opening line (hook)
- Key information in concise bullet points
- Professional yet approachable tone
- Call to action at the end
- 10-15 relevant hashtags
- Mix of niche and broad hashtags (#AustraliaImmigration #StudentVisa #StudyInAustralia etc.)`,
};

export async function generateContent(formData: FormData) {
  const platform = (formData.get("platform") as Platform) ?? "XIAOHONGSHU";
  const topic = String(formData.get("topic") ?? "").trim();

  if (!topic) throw new Error("请输入主题");

  // RAG 检索相关知识
  const retrieved = await retrieve(topic, { topK: 3 });
  const ragContext = retrieved
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.contentMd.slice(0, 1500)}`)
    .join("\n\n---\n\n");

  const provider = await getProvider();

  const systemPrompt = PLATFORM_PROMPTS[platform] ?? PLATFORM_PROMPTS.XIAOHONGSHU;

  const userPrompt = `主题：${topic}

参考资料（来自知识库）：
${ragContext || "（无相关知识库内容，请基于通用知识创作）"}

请根据以上主题和参考资料，创作一篇适合该平台的帖子。

输出格式：
---标题---
(标题内容)
---正文---
(正文内容)
---标签---
(hashtags，每行一个)`;

  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 4000 }
  );

  // 解析输出
  const { title, content, hashtags } = parseContentOutput(result.content, topic);

  // 保存到数据库
  const post = await prisma.contentPost.create({
    data: {
      platform,
      topic,
      title,
      content,
      hashtags: JSON.stringify(hashtags),
      sourceEntryId: retrieved[0]?.entryId ?? null,
    },
  });

  revalidatePath("/content");
  redirect(`/content`);
}

export async function deleteContent(id: string) {
  await prisma.contentPost.delete({ where: { id } });
  revalidatePath("/content");
}

function parseContentOutput(
  raw: string,
  fallbackTitle: string
): { title: string; content: string; hashtags: string[] } {
  const titleMatch = /---标题---\s*([\s\S]*?)---正文---/.exec(raw);
  const contentMatch = /---正文---\s*([\s\S]*?)(?:---标签---|$)/.exec(raw);
  const hashtagMatch = /---标签---\s*([\s\S]*)$/.exec(raw);

  const title = titleMatch?.[1]?.trim() || fallbackTitle;
  const content = contentMatch?.[1]?.trim() || raw;
  const hashtags = hashtagMatch?.[1]
    ?.split(/\n/)
    .map((h) => h.trim())
    .filter((h) => h.startsWith("#")) ?? [];

  return { title, content, hashtags };
}
