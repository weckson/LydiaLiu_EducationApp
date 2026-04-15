// 向量相似度工具
//
// 策略说明：
// 在知识库规模 < 5000 条时，直接把所有 embedding 加载到内存做余弦相似度计算，
// 比安装 sqlite-vec 扩展更简单，速度也足够（1000 条 × 1536 维 ≈ 3ms）。
// 如果未来数据量上来，再换真正的向量数据库。

/**
 * 计算两个等长向量的余弦相似度
 * 返回值范围：[-1, 1]，越接近 1 越相似
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `向量维度不匹配：${a.length} vs ${b.length}。可能是 embedding 模型不一致`
    );
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * 把 JSON 字符串还原为浮点数组
 * 返回 null 说明 embedding 为空或解析失败
 */
export function parseEmbedding(s: string | null | undefined): number[] | null {
  if (!s) return null;
  try {
    const parsed = JSON.parse(s);
    if (!Array.isArray(parsed)) return null;
    return parsed as number[];
  } catch {
    return null;
  }
}

/**
 * 把浮点数组序列化为 JSON 字符串，方便存入 SQLite TEXT 字段
 */
export function serializeEmbedding(v: number[]): string {
  return JSON.stringify(v);
}

/**
 * 从一组候选中找出 top-k 最相似的
 */
export function topKSimilar<T extends { embedding: number[] }>(
  query: number[],
  candidates: T[],
  k: number
): Array<T & { score: number }> {
  const scored = candidates.map((c) => ({
    ...c,
    score: cosineSimilarity(query, c.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}
