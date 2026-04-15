import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { renderMarkdown } from "@/lib/markdown";
import { deleteEntry } from "@/lib/actions";

export default async function EntryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await prisma.knowledgeEntry.findUnique({
    where: { id: params.id },
    include: { tags: true },
  });

  if (!entry) notFound();

  const html = renderMarkdown(entry.contentMd);
  const deleteWithId = deleteEntry.bind(null, entry.id);

  return (
    <div className="space-y-6">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/knowledge" className="hover:text-brand-600 transition">
          知识书房
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700 truncate max-w-xs">{entry.title}</span>
      </div>

      {/* 主体卡片 */}
      <article className="elegant-card p-8 md:p-12 relative overflow-hidden">
        {/* 装饰角落 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-hero opacity-40 rounded-bl-full pointer-events-none"></div>

        {/* 头部 */}
        <header className="relative mb-8 pb-6 border-b border-dashed border-gold-300/50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              {entry.category && (
                <div className="inline-block mb-3">
                  <span className="tag-chip-gold">{entry.category}</span>
                </div>
              )}
              <h1 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight">
                {entry.title}
              </h1>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/knowledge/${entry.id}/edit`}
                className="px-4 py-2 text-sm rounded-full bg-cream-100 text-ink-700 hover:bg-cream-200 transition border border-cream-300"
              >
                编辑
              </Link>
              <form action={deleteWithId}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-full bg-white text-brand-600 hover:bg-brand-50 transition border border-brand-200"
                >
                  删除
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            {entry.visibility === "STUDENT_VISIBLE" ? (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gold-100 text-gold-700 border border-gold-200">
                <span>✦</span> 学生可见
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-cream-100 text-ink-500 border border-cream-200">
                仅自己可见
              </span>
            )}
            {entry.tags.map((t) => (
              <span key={t.id} className="tag-chip">
                {t.name}
              </span>
            ))}
            <span className="text-xs text-ink-400 ml-auto tracking-wide">
              更新于{" "}
              {new Date(entry.updatedAt).toLocaleString("zh-CN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {entry.sourceUrl && (
            <div className="mt-3 text-sm">
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 transition"
              >
                <span>🔗</span> 原始来源
              </a>
            </div>
          )}
        </header>

        {/* 正文 */}
        <div
          className="prose-simple max-w-none relative"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}
