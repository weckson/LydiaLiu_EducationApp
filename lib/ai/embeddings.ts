// 知识条目 embedding 生成辅助函数
// 保存条目时调用；失败时不阻断保存流程

import { prisma } from "../db";
import { getProvider } from "./provider";
import { serializeEmbedding } from "./similarity";

/**
 * 把标题和正文拼成适合 embedding 的文本
 * 标题加权：重复两次让标题信号更强
 */
export function buildEmbeddingText(params: {
  title: string;
  category?: string | null;
  tags?: string[];
  contentMd: string;
}): string {
  const parts: string[] = [];
  parts.push(`标题：${params.title}`);
  if (params.category) parts.push(`分类：${params.category}`);
  if (params.tags && params.tags.length > 0) {
    parts.push(`标签：${params.tags.join(", ")}`);
  }
  parts.push(`标题：${params.title}`); // 重复一次加权
  parts.push(`正文：${params.contentMd}`);
  return parts.join("\n");
}

/**
 * 为单个知识条目生成并保存 embedding
 * 失败时抛错，由调用者决定是否阻断
 */
export async function embedAndSaveEntry(entryId: string): Promise<void> {
  const entry = await prisma.knowledgeEntry.findUnique({
    where: { id: entryId },
    include: { tags: true },
  });
  if (!entry) throw new Error(`条目不存在: ${entryId}`);

  const text = buildEmbeddingText({
    title: entry.title,
    category: entry.category,
    tags: entry.tags.map((t) => t.name),
    contentMd: entry.contentMd,
  });

  const provider = await getProvider();
  const vector = await provider.embed(text);

  await prisma.knowledgeEntry.update({
    where: { id: entryId },
    data: {
      embedding: serializeEmbedding(vector),
      embeddingModel: provider.embeddingModel,
      embeddingUpdatedAt: new Date(),
    },
  });
}

/**
 * 尝试生成 embedding，失败则记录日志但不抛错
 * 用于保存条目后的"后台"embedding 生成——即使 AI 服务短暂故障，用户的保存操作不应失败
 */
export async function tryEmbedEntry(entryId: string): Promise<boolean> {
  try {
    await embedAndSaveEntry(entryId);
    return true;
  } catch (e) {
    console.error(`[embedding] 为 ${entryId} 生成向量失败:`, e);
    return false;
  }
}
