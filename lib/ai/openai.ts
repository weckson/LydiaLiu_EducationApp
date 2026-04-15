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
      // GPT-5 系列和 o1/o3 系列是 reasoning models，
      // 参数名不同，且不支持自定义 temperature
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
        // 新一代 reasoning 模型：max_completion_tokens、不支持 temperature
        params.max_completion_tokens = options?.maxTokens ?? 2000;
      } else {
        // gpt-4o / gpt-4 / gpt-3.5 等旧模型
        params.max_tokens = options?.maxTokens ?? 1500;
        params.temperature = options?.temperature ?? 0.3;
      }

      const response = await client.chat.completions.create(params);

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
