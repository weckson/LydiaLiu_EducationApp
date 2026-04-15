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
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/knowledge" className="hover:text-brand-600">
          知识库
        </Link>
        <span>/</span>
        <span className="text-slate-800 truncate max-w-xs">{entry.title}</span>
      </div>

      <article className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <header className="mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex-1">
              {entry.title}
            </h1>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/knowledge/${entry.id}/edit`}
                className="px-3 py-1.5 text-sm rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                编辑
              </Link>
              <form action={deleteWithId}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                >
                  删除
                </button>
              </form>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            {entry.category && (
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                {entry.category}
              </span>
            )}
            {entry.visibility === "STUDENT_VISIBLE" ? (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                学生可见
              </span>
            ) : (
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                仅自己可见
              </span>
            )}
            {entry.tags.map((t) => (
              <span
                key={t.id}
                className="text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded"
              >
                #{t.name}
              </span>
            ))}
            <span className="text-slate-400 ml-auto">
              更新于{" "}
              {new Date(entry.updatedAt).toLocaleString("zh-CN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {entry.sourceUrl && (
            <div className="mt-2 text-sm">
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 hover:underline"
              >
                🔗 原始来源
              </a>
            </div>
          )}
        </header>

        <div
          className="prose-simple max-w-none text-slate-800"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}
