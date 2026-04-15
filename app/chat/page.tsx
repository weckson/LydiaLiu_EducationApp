import Link from "next/link";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/chat-actions";

export const dynamic = "force-dynamic";

export default async function ChatListPage() {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { messages: true } },
    },
    take: 50,
  });

  const [totalEntries, embeddedCount] = await Promise.all([
    prisma.knowledgeEntry.count(),
    prisma.knowledgeEntry.count({ where: { embedding: { not: null } } }),
  ]);

  return (
    <div className="space-y-8">
      {/* 标题 + 新建按钮 */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            AI Atelier
          </div>
          <h1 className="font-serif text-3xl text-ink-900 gold-underline">
            AI 问答
          </h1>
        </div>
        <form action={createSession}>
          <button type="submit" className="btn-primary">
            <span>✦</span> 新建对话
          </button>
        </form>
      </div>

      {/* 向量状态提示 */}
      {totalEntries > 0 && embeddedCount < totalEntries && (
        <div className="elegant-card p-5 border-gold-300/60 bg-gold-50/50">
          <div className="flex items-start gap-3">
            <div className="text-gold-500 text-xl">✦</div>
            <div className="flex-1 text-sm">
              <p className="text-ink-800 font-medium mb-1">
                还有 {totalEntries - embeddedCount} 条知识未生成向量
              </p>
              <p className="text-ink-600">
                在 PowerShell/SSH 中运行{" "}
                <code className="bg-white px-2 py-0.5 rounded text-brand-700 text-xs border border-brand-100">
                  npm run db:embed
                </code>{" "}
                可以为所有遗漏的条目批量生成向量。未生成向量的条目不会出现在检索结果中。
              </p>
            </div>
          </div>
        </div>
      )}

      {totalEntries === 0 && (
        <div className="elegant-card p-5 border-gold-300/60 bg-gold-50/50">
          <div className="flex items-start gap-3">
            <div className="text-gold-500 text-xl">✦</div>
            <div className="flex-1 text-sm text-ink-700">
              知识库里还没有任何条目，请先
              <Link
                href="/knowledge/new"
                className="text-brand-600 underline mx-1"
              >
                录入知识
              </Link>
              ，否则 AI 只能给出泛泛的回答。
            </div>
          </div>
        </div>
      )}

      {/* 信息卡片 */}
      <div className="elegant-card p-5 bg-gradient-hero/30">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-3">
          How It Works
        </div>
        <div className="text-sm text-ink-700 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-gold-500">✦</span>
            <span>AI 会结合你的知识库作答，并标注引用来源</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold-500">✦</span>
            <span>
              知识库 {totalEntries} 条，其中{" "}
              <strong className="text-brand-700">{embeddedCount}</strong> 条可检索
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold-500">✦</span>
            <span>模型：gpt-4o-mini + text-embedding-3-small</span>
          </div>
        </div>
      </div>

      {/* 历史对话 */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            History
          </div>
          <h2 className="font-serif text-xl text-ink-900">历史对话</h2>
        </div>

        {sessions.length === 0 ? (
          <div className="elegant-card p-16 text-center">
            <div className="text-4xl text-gold-400 mb-3">✦</div>
            <p className="text-ink-500 mb-4">还没有任何对话</p>
            <form action={createSession} className="inline-block">
              <button type="submit" className="btn-primary">
                开始第一次提问
              </button>
            </form>
          </div>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/chat/${s.id}`}
                  className="elegant-card elegant-card-hover block p-5 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-rose-button flex items-center justify-center flex-shrink-0 shadow-soft">
                        <span className="text-white text-xs">✦</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base text-ink-900 group-hover:text-brand-700 transition truncate">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-xs text-ink-400">
                          {s._count.messages} 条消息
                        </p>
                      </div>
                    </div>
                    <time className="text-xs text-ink-400 flex-shrink-0 tracking-wide">
                      {new Date(s.updatedAt).toLocaleString("zh-CN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
