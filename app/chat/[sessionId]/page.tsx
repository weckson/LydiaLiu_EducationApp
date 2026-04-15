import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { sendMessage, deleteSession } from "@/lib/chat-actions";
import { renderMarkdown } from "@/lib/markdown";
import { ChatInput } from "@/components/ChatInput";

export const dynamic = "force-dynamic";

export default async function ChatSessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const session = await prisma.chatSession.findUnique({
    where: { id: params.sessionId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          citations: {
            orderBy: { rank: "asc" },
            include: {
              entry: {
                select: {
                  id: true,
                  title: true,
                  category: true,
                  sourceUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session) notFound();

  const sendWithId = sendMessage.bind(null, session.id);
  const deleteWithId = deleteSession.bind(null, session.id);

  return (
    <div className="space-y-5">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/chat" className="hover:text-brand-600 transition">
          AI 问答
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700 truncate max-w-xs font-serif">
          {session.title}
        </span>
        <form action={deleteWithId} className="ml-auto">
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded-full text-brand-600 hover:bg-brand-50 transition"
          >
            删除对话
          </button>
        </form>
      </div>

      {/* 消息列表 */}
      <div className="space-y-5 pb-32">
        {session.messages.length === 0 && (
          <div className="elegant-card p-12 text-center bg-gradient-hero/30">
            <div className="text-5xl text-gold-400 mb-4">✦</div>
            <p className="font-serif text-xl text-ink-800 mb-2">开始提问吧</p>
            <p className="text-xs text-ink-500 mt-2 leading-relaxed">
              试试："500 学生签证 2026 年的新政有什么变化？"
              <br />
              "蒙纳士大学商学院硕士申请均分大概要多少？"
              <br />
              "澳洲哪些大学在偏远地区，有移民加分？"
            </p>
          </div>
        )}

        {session.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* 输入框（带 pending 加载动画） */}
      <form
        action={sendWithId}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-10"
      >
        <ChatInput />
      </form>
    </div>
  );
}

// —— 消息气泡组件 ——
function MessageBubble({
  message,
}: {
  message: {
    id: string;
    role: string;
    content: string;
    tokensUsed: number | null;
    createdAt: Date;
    citations: Array<{
      rank: number;
      score: number;
      entry: {
        id: string;
        title: string;
        category: string | null;
        sourceUrl: string | null;
      };
    }>;
  };
}) {
  const isUser = message.role === "USER";

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="bg-gradient-rose-button text-white rounded-2xl rounded-tr-md px-5 py-3 max-w-2xl shadow-soft">
          <p className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // [1] [2] 变成可视化的上标
  const html = renderMarkdown(message.content).replace(
    /\[(\d+)\]/g,
    (_m, n) =>
      `<sup class="inline-flex items-center justify-center w-5 h-5 mx-0.5 text-[10px] font-bold text-brand-700 bg-brand-100 rounded-full border border-brand-200">${n}</sup>`
  );

  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="w-9 h-9 rounded-full bg-gradient-rose-button flex items-center justify-center flex-shrink-0 shadow-soft">
        <span className="text-white text-sm">✦</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="elegant-card px-6 py-5 bg-white">
          <div
            className="prose-simple"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* 引用展示 */}
        {message.citations.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-gold-400/60"></span>
              Citations · 引用 {message.citations.length} 条
            </div>
            <div className="flex flex-col gap-2">
              {message.citations.map((c) => (
                <Link
                  key={c.entry.id}
                  href={`/knowledge/${c.entry.id}`}
                  className="elegant-card elegant-card-hover block px-4 py-3 group"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-bold text-white bg-gradient-rose-button rounded-full shadow-soft flex-shrink-0">
                      {c.rank}
                    </span>
                    <span className="font-serif text-ink-900 flex-1 truncate group-hover:text-brand-700 transition">
                      {c.entry.title}
                    </span>
                    <span className="text-xs text-ink-400 flex-shrink-0 tracking-wide">
                      {(c.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  {c.entry.category && (
                    <div className="mt-1.5 ml-9">
                      <span className="tag-chip-gold text-[10px]">
                        {c.entry.category}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 元信息 */}
        <div className="mt-2 text-[11px] text-ink-400 px-1 tracking-wide">
          {new Date(message.createdAt).toLocaleString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {message.tokensUsed ? ` · ${message.tokensUsed} tokens` : ""}
        </div>
      </div>
    </div>
  );
}
