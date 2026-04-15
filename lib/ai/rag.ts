// RAG（Retrieval-Augmented Generation）主管道
//
// 流程：
// 1. 用户提问
// 2. 生成问题 embedding
// 3. 从数据库加载所有知识条目的 embedding
// 4. 计算余弦相似度，取 top-k
// 5. 构造带引用编号的 system prompt
// 6. 调用 LLM，返回答案 + 引用信息

import { prisma } from "../db";
import { getProvider } from "./provider";
import type { ChatMessage } from "./provider";
import { parseEmbedding, topKSimilar } from "./similarity";

export type Retrieved = {
  entryId: string;
  title: string;
  category: string | null;
  contentMd: string;
  sourceUrl: string | null;
  score: number;
};

export type RagResult = {
  answer: string;
  retrieved: Retrieved[]; // 用于在 UI 展示引用
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

/** 相似度下限——分数低于此值的不作为上下文（避免无关内容干扰）
 *  对中文 text-embedding-3-small 来说，0.1-0.15 是合理阈值 */
const MIN_SIMILARITY_THRESHOLD = 0.12;

/** 检索多少条作为上下文 */
const DEFAULT_TOP_K = 5;

/**
 * 从知识库检索与查询最相关的条目
 */
export async function retrieve(
  query: string,
  options: {
    topK?: number;
    onlyStudentVisible?: boolean; // Phase 3 学生端会用
  } = {}
): Promise<Retrieved[]> {
  const topK = options.topK ?? DEFAULT_TOP_K;
  const provider = await getProvider();

  // 1. 生成 query 的 embedding
  const queryVec = await provider.embed(query);

  // 2. 加载所有带 embedding 的条目
  const where: any = {
    embedding: { not: null },
  };
  if (options.onlyStudentVisible) {
    where.visibility = "STUDENT_VISIBLE";
  }
  const entries = await prisma.knowledgeEntry.findMany({
    where,
    select: {
      id: true,
      title: true,
      category: true,
      contentMd: true,
      sourceUrl: true,
      embedding: true,
    },
  });

  if (entries.length === 0) {
    // 检查总条目数——如果有条目但没有 embedding，就是没跑 db:embed
    const totalCount = await prisma.knowledgeEntry.count(
      options.onlyStudentVisible
        ? { where: { visibility: "STUDENT_VISIBLE" } }
        : undefined
    );
    if (totalCount > 0) {
      console.warn(
        `[RAG] 知识库有 ${totalCount} 条内容，但都没有 embedding。请在服务器上运行: npm run db:embed`
      );
    }
    return [];
  }

  // 3. 解析 embedding，计算相似度
  const candidates = entries
    .map((e) => {
      const vec = parseEmbedding(e.embedding);
      return vec
        ? {
            entryId: e.id,
            title: e.title,
            category: e.category,
            contentMd: e.contentMd,
            sourceUrl: e.sourceUrl,
            embedding: vec,
          }
        : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // 4. top-k + 阈值过滤
  const top = topKSimilar(queryVec, candidates, topK).filter(
    (c) => c.score >= MIN_SIMILARITY_THRESHOLD
  );

  return top.map(({ embedding, ...rest }) => rest);
}

/**
 * 构造带引用编号的 system prompt
 */
function buildSystemPrompt(retrieved: Retrieved[]): string {
  if (retrieved.length === 0) {
    return `你是刘丽航的专业澳洲留学/移民咨询助手。

⚠️ 系统提示：当前知识库中没有找到与用户问题语义相近的条目。可能原因：
- 问题确实超出当前知识库范围
- 或服务器的 embedding 向量未生成（请在服务器运行 npm run db:embed）

请按以下原则回答：
1. 先诚实告知"知识库里没找到相关条目"
2. 如果是常见的签证/留学问题，基于通用知识给出**简短的**指引，并明确标注这不来自知识库
3. 建议查询 Home Affairs 官网或联系 Lydia 本人
4. 涉及具体数字（费用、分数、日期）时务必提醒"以官网最新为准"
5. 不要编造具体数字`;
  }

  const contextBlocks = retrieved
    .map((r, i) => {
      // 截断过长的内容避免超 token
      const content = r.contentMd.slice(0, 2000);
      return `[${i + 1}] 标题：${r.title}
分类：${r.category ?? "无"}
${r.sourceUrl ? `来源：${r.sourceUrl}\n` : ""}内容：
${content}`;
    })
    .join("\n\n---\n\n");

  return `你是刘丽航的专业澳洲留学/移民咨询助手。请严格基于下方"知识库参考"作答。

【知识库参考】
${contextBlocks}

【回答要求】
1. **语言**：用简体中文专业地回答
2. **引用标注**：在答案相关位置用 [1] [2] 等编号标注引用来源，编号对应上面的知识库参考
3. **忠实来源**：如果知识库中没有某个问题的答案，诚实说"知识库里没找到相关信息"，不要编造
4. **数字提醒**：涉及费用、分数、日期、配额等容易变化的数字时，提醒用户"以官网最新为准"
5. **专业语气**：保持留学移民顾问的专业、严谨语气，避免口语化
6. **简洁有力**：答案结构清晰，必要时使用列表或表格，避免冗长`;
}

/**
 * 完整的 RAG 问答：检索 + 生成
 */
export async function askRag(
  query: string,
  conversationHistory: ChatMessage[] = [],
  options: {
    topK?: number;
    onlyStudentVisible?: boolean;
  } = {}
): Promise<RagResult> {
  const provider = await getProvider();

  // 检索
  const retrieved = await retrieve(query, options);

  // 构造消息列表
  const systemPrompt = buildSystemPrompt(retrieved);
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: query },
  ];

  // 调 LLM
  const result = await provider.chat(messages, {
    temperature: 0.3,
    maxTokens: 1500,
  });

  return {
    answer: result.content,
    retrieved,
    promptTokens: result.promptTokens,
    completionTokens: result.completionTokens,
    totalTokens: result.totalTokens,
  };
}
