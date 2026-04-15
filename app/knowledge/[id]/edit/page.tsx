import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateEntry } from "@/lib/actions";
import { EntryForm } from "@/components/EntryForm";

export default async function EditEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await prisma.knowledgeEntry.findUnique({
    where: { id: params.id },
    include: { tags: true },
  });

  if (!entry) notFound();

  const action = updateEntry.bind(null, entry.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/knowledge" className="hover:text-brand-600">
          知识库
        </Link>
        <span>/</span>
        <Link
          href={`/knowledge/${entry.id}`}
          className="hover:text-brand-600 truncate max-w-xs"
        >
          {entry.title}
        </Link>
        <span>/</span>
        <span className="text-slate-800">编辑</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800">编辑知识条目</h1>

      <EntryForm action={action} entry={entry} submitLabel="保存修改" />
    </div>
  );
}
