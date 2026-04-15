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

  // SQLite LIKE 大小写不敏感默认仅对 ASCII 生效，中文靠 contains 即可
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">知识库</h1>
        <Link
          href="/knowledge/new"
          className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          + 新增知识
        </Link>
      </div>

      <form method="get" className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="搜索标题、正文、标签..."
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-brand-500"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
        >
          搜索
        </button>
        {(q || category) && (
          <Link
            href="/knowledge"
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
          >
            清除
          </Link>
        )}
      </form>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-slate-500">按分类：</span>
          {categories.map((c) => (
            <Link
              key={c.category}
              href={`/knowledge?category=${encodeURIComponent(c.category!)}`}
              className={`px-3 py-1 rounded-full border transition ${
                category === c.category
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-500"
              }`}
            >
              {c.category} ({c._count._all})
            </Link>
          ))}
        </div>
      )}

      <div className="text-sm text-slate-500">
        共 {entries.length} 条{q && ` · 关键词："${q}"`}
        {category && ` · 分类：${category}`}
      </div>

      {entries.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-lg p-12 text-center">
          <p className="text-slate-500">没有找到匹配的知识条目</p>
          <Link
            href="/knowledge/new"
            className="inline-block mt-3 text-brand-600 hover:underline font-medium"
          >
            + 录入新知识
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id}>
              <Link
                href={`/knowledge/${e.id}`}
                className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-brand-500 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-semibold text-slate-800 flex-1">
                    {e.title}
                  </h2>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {e.visibility === "STUDENT_VISIBLE" && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                        学生可见
                      </span>
                    )}
                    <time className="text-xs text-slate-400">
                      {new Date(e.updatedAt).toLocaleDateString("zh-CN")}
                    </time>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {e.contentMd.slice(0, 160)}
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {e.category && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {e.category}
                    </span>
                  )}
                  {e.tags.map((t) => (
                    <span
                      key={t.id}
                      className="text-xs text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded"
                    >
                      #{t.name}
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
