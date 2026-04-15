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
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/knowledge" className="hover:text-brand-600 transition">
          知识书房
        </Link>
        <span className="text-gold-400">/</span>
        <Link
          href={`/knowledge/${entry.id}`}
          className="hover:text-brand-600 transition truncate max-w-xs"
        >
          {entry.title}
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">编辑</span>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Edit Entry
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          编辑知识条目
        </h1>
      </div>

      <EntryForm action={action} entry={entry} submitLabel="保存修改" />
    </div>
  );
}
