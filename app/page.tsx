import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [entryCount, tagCount, recent] = await Promise.all([
    prisma.knowledgeEntry.count(),
    prisma.tag.count(),
    prisma.knowledgeEntry.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { tags: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">欢迎回来，Lydia 👋</h1>
        <p className="text-brand-50/90">
          这里是你的专属知识库。日常随手记录、后期用 AI 问答检索。
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/knowledge/new"
            className="bg-white text-brand-700 px-4 py-2 rounded-lg font-medium hover:bg-brand-50 transition"
          >
            + 新增知识
          </Link>
          <Link
            href="/knowledge"
            className="bg-white/10 border border-white/30 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition"
          >
            浏览全部
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="知识条目" value={entryCount} icon="📚" />
        <StatCard label="标签" value={tagCount} icon="🏷️" />
        <StatCard label="当前阶段" value="Phase 1" icon="🚀" />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800">最近更新</h2>
          <Link
            href="/knowledge"
            className="text-sm text-brand-600 hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        {recent.length === 0 ? (
          <EmptyHint />
        ) : (
          <ul className="space-y-2">
            {recent.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/knowledge/${e.id}`}
                  className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-brand-500 transition"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-slate-800">{e.title}</h3>
                    <time className="text-xs text-slate-400">
                      {new Date(e.updatedAt).toLocaleDateString("zh-CN")}
                    </time>
                  </div>
                  {e.category && (
                    <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {e.category}
                    </span>
                  )}
                  {e.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {e.tags.map((t) => (
                        <span
                          key={t.id}
                          className="text-xs text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded"
                        >
                          #{t.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function EmptyHint() {
  return (
    <div className="bg-white border border-dashed border-slate-300 rounded-lg p-8 text-center">
      <p className="text-slate-500">还没有任何知识条目。</p>
      <Link
        href="/knowledge/new"
        className="inline-block mt-3 text-brand-600 hover:underline font-medium"
      >
        录入第一条 →
      </Link>
    </div>
  );
}
