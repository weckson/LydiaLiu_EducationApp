import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function KnowledgeListPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const category = searchParams.category?.trim() ?? "";

  const where: any = {};
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { contentMd: { contains: q } },
      { category: { contains: q } },
      { tags: { some: { name: { contains: q } } } },
    ];
  }
  if (category) {
    where.category = category;
  }

  const [entries, categories] = await Promise.all([
    prisma.knowledgeEntry.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: { tags: true },
      take: 100,
    }),
    prisma.knowledgeEntry
      .groupBy({
        by: ["category"],
        _count: { _all: true },
      })
      .then((rows) =>
        rows
          .filter((r) => r.category)
          .sort((a, b) => b._count._all - a._count._all)
      ),
  ]);

  return (
    <div className="space-y-8">
      {/* 标题区 */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Knowledge Library
          </div>
          <h1 className="font-serif text-3xl text-ink-900 gold-underline">
            知识书房
          </h1>
        </div>
        <Link href="/knowledge/new" className="btn-primary">
          + 新增知识
        </Link>
      </div>

      {/* 搜索框 */}
      <form method="get" className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            ✦
          </span>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="搜索标题、正文、标签..."
            className="input-elegant pl-10"
          />
        </div>
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="btn-primary whitespace-nowrap">
          搜索
        </button>
        {(q || category) && (
          <Link href="/knowledge" className="btn-secondary whitespace-nowrap">
            清除
          </Link>
        )}
      </form>

      {/* 分类筛选 */}
      {categories.length > 0 && (
        <div className="elegant-card p-4">
          <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-3">
            Browse by Category
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/knowledge?category=${encodeURIComponent(c.category!)}`}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  category === c.category
                    ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
                    : "bg-white text-ink-600 border-brand-100 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {c.category}{" "}
                <span className="text-[11px] opacity-70 ml-0.5">
                  {c._count._all}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 结果统计 */}
      <div className="text-sm text-ink-500 flex items-center gap-2">
        <span className="font-serif text-brand-600 text-lg">
          {entries.length}
        </span>
        <span>条结果</span>
        {q && (
          <>
            <span className="text-ink-300">·</span>
            <span>
              关键词 <em className="text-brand-600 not-italic">"{q}"</em>
            </span>
          </>
        )}
        {category && (
          <>
            <span className="text-ink-300">·</span>
            <span>
              分类 <em className="text-brand-600 not-italic">{category}</em>
            </span>
          </>
        )}
      </div>

      {/* 条目列表 */}
      {entries.length === 0 ? (
        <div className="elegant-card p-16 text-center">
          <div className="text-4xl text-gold-400 mb-3">✦</div>
          <p className="text-ink-500 mb-4">没有找到匹配的知识条目</p>
          <Link href="/knowledge/new" className="btn-primary">
            + 录入新知识
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id}>
              <Link
                href={`/knowledge/${e.id}`}
                className="elegant-card elegant-card-hover block p-5 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-lg text-ink-900 group-hover:text-brand-700 transition flex-1">
                    {e.title}
                  </h2>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {e.visibility === "STUDENT_VISIBLE" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 border border-gold-200">
                        学生可见
                      </span>
                    )}
                    <time className="text-xs text-ink-400 tracking-wide">
                      {new Date(e.updatedAt).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                <p className="mt-2 text-sm text-ink-500 line-clamp-2 leading-relaxed">
                  {e.contentMd.replace(/[#*`_\-]/g, "").slice(0, 180)}
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {e.category && (
                    <span className="tag-chip-gold">{e.category}</span>
                  )}
                  {e.tags.map((t) => (
                    <span key={t.id} className="tag-chip">
                      {t.name}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
