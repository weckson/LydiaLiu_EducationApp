"use server";

// Chat Server Actions —— 会话的创建、提问、删除

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { askRag } from "./ai/rag";
import type { ChatMessage as RagChatMessage } from "./ai/provider";

/**
 * 创建一个新会话并跳转
 */
export async function createSession() {
  const session = await prisma.chatSession.create({
    data: { title: "新对话" },
  });
  revalidatePath("/chat");
  redirect(`/chat/${session.id}`);
}

/**
 * 向会话发送用户消息 → 跑 RAG → 保存 AI 回复
 */
export async function sendMessage(sessionId: string, formData: FormData) {
  const userContent = String(formData.get("content") ?? "").trim();
  if (!userContent) return;

  // 1. 保存用户消息
  await prisma.chatMessage.create({
    data: {
      sessionId,
      role: "USER",
      content: userContent,
    },
  });

  // 2. 加载历史对话（最近 10 条，不含刚保存的这条）
  const history = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const ragHistory: RagChatMessage[] = history
    .slice(0, -1) // 去掉刚才保存的
    .map((m) => ({
      role: m.role === "USER" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    }));

  // 3. 调用 RAG
  let answer = "";
  let retrieved: Awaited<ReturnType<typeof askRag>>["retrieved"] = [];
  let tokens = 0;
  try {
    const result = await askRag(userContent, ragHistory);
    answer = result.answer;
    retrieved = result.retrieved;
    tokens = result.totalTokens;
  } catch (e: any) {
    answer = `⚠️ 调用 AI 失败：${e?.message ?? e}\n\n请检查 .env 中的 OPENAI_API_KEY 是否正确，以及网络是否能访问 OpenAI。`;
  }

  // 4. 保存 AI 回复，同时写入引用关联
  const assistantMsg = await prisma.chatMessage.create({
    data: {
      sessionId,
      role: "ASSISTANT",
      content: answer,
      tokensUsed: tokens,
      citations: {
        create: retrieved.map((r, i) => ({
          entryId: r.entryId,
          rank: i + 1,
          score: r.score,
        })),
      },
    },
  });

  // 5. 如果是第一条消息，用它生成会话标题
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
    select: { title: true, messages: { take: 1 } },
  });
  if (session && session.title === "新对话") {
    const newTitle =
      userContent.length > 30 ? userContent.slice(0, 30) + "…" : userContent;
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { title: newTitle },
    });
  } else {
    // 刷新 updatedAt
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    });
  }

  revalidatePath(`/chat/${sessionId}`);
  revalidatePath("/chat");
  return { ok: true, messageId: assistantMsg.id };
}

/**
 * 删除会话
 */
export async function deleteSession(sessionId: string) {
  await prisma.chatSession.delete({ where: { id: sessionId } });
  revalidatePath("/chat");
  redirect("/chat");
}

/**
 * 重命名会话
 */
export async function renameSession(sessionId: string, title: string) {
  const trimmed = title.trim().slice(0, 60);
  if (!trimmed) return;
  await prisma.chatSession.update({
    where: { id: sessionId },
    data: { title: trimmed },
  });
  revalidatePath(`/chat/${sessionId}`);
  revalidatePath("/chat");
}
