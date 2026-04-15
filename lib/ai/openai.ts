// OpenAI 的 LLMProvider 实现

import OpenAI from "openai";
import type {
  ChatMessage,
  ChatOptions,
  ChatResult,
  LLMProvider,
} from "./provider";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `环境变量 ${name} 未设置。请在 .env 文件中配置。参考 .env.example`
    );
  }
  return v;
}

export function createOpenAIProvider(): LLMProvider {
  const apiKey = requireEnv("OPENAI_API_KEY");
  const chatModel = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
  const embeddingModel =
    process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
  const baseURL = process.env.OPENAI_BASE_URL; // 可选，支持国内代理

  const client = new OpenAI({
    apiKey,
    baseURL: baseURL || undefined,
  });

  return {
    embeddingModel,
    chatModel,

    async embed(text: string): Promise<number[]> {
      const response = await client.embeddings.create({
        model: embeddingModel,
        input: text.slice(0, 8000), // 避免超出 token 上限
      });
      return response.data[0].embedding;
    },

    async embedBatch(texts: string[]): Promise<number[][]> {
      if (texts.length === 0) return [];
      // OpenAI 支持一次最多 2048 个输入
      const chunkSize = 100;
      const results: number[][] = [];
      for (let i = 0; i < texts.length; i += chunkSize) {
        const chunk = texts.slice(i, i + chunkSize).map((t) => t.slice(0, 8000));
        const response = await client.embeddings.create({
          model: embeddingModel,
          input: chunk,
        });
        for (const item of response.data) {
          results.push(item.embedding);
        }
      }
      return results;
    },

    async chat(
      messages: ChatMessage[],
      options?: ChatOptions
    ): Promise<ChatResult> {
      // GPT-5 系列和 o1/o3/o4 系列是 reasoning models
      const isReasoningModel =
        chatModel.startsWith("gpt-5") ||
        chatModel.startsWith("o1") ||
        chatModel.startsWith("o3") ||
        chatModel.startsWith("o4");

      const params: any = {
        model: chatModel,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      if (isReasoningModel) {
        // ⚠️ 关键：max_completion_tokens 包含 reasoning tokens + 输出 tokens
        // 如果设得太低（比如 2000），reasoning 阶段就会把 token 用光，
        // 导致最终输出为空字符串。必须留足空间。
        params.max_completion_tokens = options?.maxTokens ?? 8000;

        // ⚠️ 对 RAG 问答这种"基于上下文作答"的场景，用 minimal
        // 让模型少思考多输出，响应更快、几乎不会出现空回答
        params.reasoning_effort = "minimal";
      } else {
        // gpt-4o / gpt-4 / gpt-3.5 等旧模型
        params.max_tokens = options?.maxTokens ?? 1500;
        params.temperature = options?.temperature ?? 0.3;
      }

      const response = await client.chat.completions.create(params);

      const content = response.choices[0]?.message?.content ?? "";
      const finishReason = response.choices[0]?.finish_reason;

      // 检测空回答：reasoning models 偶尔会因为 token 耗尽或被截断返回空
      if (!content.trim()) {
        const reasoning = (response.choices[0]?.message as any)?.reasoning;
        throw new Error(
          `模型返回空回答（finish_reason: ${finishReason}）。` +
            (finishReason === "length"
              ? " 原因是 max_completion_tokens 用完。请增加 token 上限或换更强的模型。"
              : reasoning
                ? " 模型内部思考完成了但没有输出，请重试或换 gpt-4o-mini。"
                : " 请重试一次，或检查问题是否太过复杂。")
        );
      }

      return {
        content,
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
      };
    },
  };
}
