// LLM Provider 抽象接口
//
// 为什么要抽象：
// 现在用 OpenAI，但保留将来切换到 Claude、通义千问、DeepSeek 等的可能。
// 只要新的 provider 实现这个接口，换模型就只改一个文件。

export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatOptions = {
  temperature?: number;
  maxTokens?: number;
};

export type ChatResult = {
  content: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export interface LLMProvider {
  /** 生成文本嵌入向量 */
  embed(text: string): Promise<number[]>;

  /** 批量生成嵌入（节省 API 调用次数） */
  embedBatch(texts: string[]): Promise<number[][]>;

  /** 基于消息列表生成回复 */
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult>;

  /** 当前 provider 使用的嵌入模型标识，用于版本管理 */
  readonly embeddingModel: string;

  /** 当前 provider 使用的对话模型标识 */
  readonly chatModel: string;
}

// 全局单例 —— 通过 getProvider() 获取
let _provider: LLMProvider | null = null;

export async function getProvider(): Promise<LLMProvider> {
  if (_provider) return _provider;
  // 动态导入避免构建时需要 OPENAI_API_KEY
  const { createOpenAIProvider } = await import("./openai");
  _provider = createOpenAIProvider();
  return _provider;
}

// 测试时可以用这个替换
export function setProvider(provider: LLMProvider) {
  _provider = provider;
}
