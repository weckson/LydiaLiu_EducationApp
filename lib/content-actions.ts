"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { prisma } from "./db";
import { getProvider } from "./ai/provider";
import { retrieve } from "./ai/rag";
import {
  buildSystemPrompt,
  buildUserPrompt,
  type Platform,
  type Emotion,
  type Audience,
} from "./content-prompts";

// ════════════════════════════════════════════
// 主入口：生成内容
// ════════════════════════════════════════════

export async function generateContent(formData: FormData) {
  const platform = (String(formData.get("platform") ?? "XIAOHONGSHU") || "XIAOHONGSHU") as Platform;
  const emotion = (String(formData.get("emotion") ?? "INFO") || "INFO") as Emotion;
  const audience = (String(formData.get("audience") ?? "ANY") || "ANY") as Audience;
  const topic = String(formData.get("topic") ?? "").trim();
  const extraInstructions = String(formData.get("extraInstructions") ?? "").trim() || undefined;
  const useWebSearch = String(formData.get("useWebSearch") ?? "") === "on";

  if (!topic) {
    throw new Error("请输入主题");
  }

  // 1. RAG 检索内部知识库
  let ragContext = "";
  let sourceEntryId: string | null = null;
  try {
    const retrieved = await retrieve(topic, { topK: 3 });
    if (retrieved.length > 0) {
      ragContext = retrieved
        .map((r, i) => `[${i + 1}] ${r.title}\n${r.contentMd.slice(0, 1500)}`)
        .join("\n\n---\n\n");
      sourceEntryId = retrieved[0].entryId;
    }
  } catch (e) {
    console.error("[content] RAG 检索失败:", e);
  }

  // 2. （可选）Web search 参考最近的热门帖子
  let webTrendRef = "";
  const referenceSources: string[] = [];
  if (useWebSearch) {
    try {
      const webResult = await searchTrendingPosts(topic, platform);
      webTrendRef = webResult.content;
      referenceSources.push(...webResult.sources);
    } catch (e) {
      console.error("[content] web search 失败:", e);
    }
  }

  const fullReference = [ragContext, webTrendRef].filter(Boolean).join("\n\n===\n\n");

  // 3. 构造 prompt
  const systemPrompt = buildSystemPrompt(platform, emotion, audience);
  const userPrompt = buildUserPrompt(topic, fullReference, extraInstructions);

  // 4. 调用主 LLM
  const provider = await getProvider();
  const result = await provider.chat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 8000 }
  );

  // 5. 解析
  const { title, titleVariants, content, hashtags } = parseOutput(
    result.content,
    topic
  );

  // 6. 保存
  const post = await prisma.contentPost.create({
    data: {
      platform,
      emotion,
      audience,
      topic,
      title,
      content,
      hashtags: JSON.stringify(hashtags),
      titleVariants: JSON.stringify(titleVariants),
      referenceSources: referenceSources.length > 0 ? JSON.stringify(referenceSources) : null,
      sourceEntryId,
      tokensUsed: result.totalTokens,
    },
  });

  revalidatePath("/content");
  revalidatePath(`/content/${post.id}`);
  redirect(`/content/${post.id}`);
}

export async function deleteContent(id: string) {
  await prisma.contentPost.delete({ where: { id } });
  revalidatePath("/content");
  redirect("/content");
}

// ════════════════════════════════════════════
// Web Search：找最近的热门帖子作为风格参考
// ════════════════════════════════════════════

async function searchTrendingPosts(
  topic: string,
  platform: Platform
): Promise<{ content: string; sources: string[] }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY 未设置");

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });

  const model = process.env.OPENAI_SEARCH_MODEL || "gpt-4o-mini-search-preview";

  const platformSearchTerm = {
    XIAOHONGSHU: "小红书 + 帖子",
    WECHAT: "微信公众号 + 文章",
    DOUYIN: "抖音 + 爆款",
    INSTAGRAM: "Instagram + posts",
    ZHIHU: "知乎 + 回答",
  }[platform];

  const query = `近一个月 ${platformSearchTerm} 关于"${topic}"的爆款 / 热门内容，它们的标题、开头、关键数据、读者反应是什么？`;

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "你是一位中文社交媒体内容分析师。根据用户查询，搜索最近的热门帖子和文章，总结它们的风格、用词、切入角度。",
        },
        { role: "user", content: query },
      ],
      max_tokens: 1500,
    } as any);

    const content = response.choices[0]?.message?.content ?? "";
    const annotations = (response.choices[0]?.message as any)?.annotations ?? [];
    const sources: string[] = annotations
      .filter((a: any) => a.type === "url_citation")
      .map((a: any) => a.url_citation?.url)
      .filter(Boolean);

    return {
      content: `【近期热门帖子参考】\n${content}`,
      sources: Array.from(new Set(sources)),
    };
  } catch (e: any) {
    console.error("[content] search 模型失败:", e?.message);
    return { content: "", sources: [] };
  }
}

// ════════════════════════════════════════════
// 输出解析
// ════════════════════════════════════════════

function parseOutput(
  raw: string,
  fallbackTitle: string
): {
  title: string;
  titleVariants: string[];
  content: string;
  hashtags: string[];
} {
  const titleMatch = /---TITLE---\s*([\s\S]*?)---TITLE_VARIANTS---/.exec(raw);
  const variantsMatch = /---TITLE_VARIANTS---\s*([\s\S]*?)---CONTENT---/.exec(raw);
  const contentMatch = /---CONTENT---\s*([\s\S]*?)---HASHTAGS---/.exec(raw);
  const hashtagsMatch = /---HASHTAGS---\s*([\s\S]*)$/.exec(raw);

  // 如果格式完全匹配
  if (titleMatch && contentMatch) {
    const title = titleMatch[1].trim();
    const titleVariants = variantsMatch
      ? variantsMatch[1]
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && !s.startsWith("#"))
          .slice(0, 3)
      : [];
    const content = contentMatch[1].trim();
    const hashtags = hashtagsMatch
      ? hashtagsMatch[1]
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.startsWith("#"))
      : [];
    return { title, titleVariants, content, hashtags };
  }

  // Fallback：兼容旧格式或 LLM 没按格式
  const legacyTitle = /---标题---\s*([\s\S]*?)---正文---/.exec(raw);
  const legacyContent = /---正文---\s*([\s\S]*?)(?:---标签---|$)/.exec(raw);
  const legacyHashtag = /---标签---\s*([\s\S]*)$/.exec(raw);

  if (legacyTitle || legacyContent) {
    return {
      title: legacyTitle?.[1]?.trim() || fallbackTitle,
      titleVariants: [],
      content: legacyContent?.[1]?.trim() || raw,
      hashtags: legacyHashtag?.[1]
        ?.split("\n")
        .map((s) => s.trim())
        .filter((s) => s.startsWith("#")) ?? [],
    };
  }

  // 最终 fallback：整段作为 content
  const firstLine = raw.split("\n")[0]?.trim().slice(0, 50);
  return {
    title: firstLine || fallbackTitle,
    titleVariants: [],
    content: raw,
    hashtags: [],
  };
}
