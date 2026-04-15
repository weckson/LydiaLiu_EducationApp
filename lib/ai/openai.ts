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
      const response = await client.chat.completions.create({
        model: chatModel,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: options?.temperature ?? 0.3,
        max_tokens: options?.maxTokens ?? 1500,
      });

      const content = response.choices[0]?.message?.content ?? "";
      return {
        content,
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
      };
    },
  };
}
