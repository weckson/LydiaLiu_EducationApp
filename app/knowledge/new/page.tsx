import Link from "next/link";
import { createEntry } from "@/lib/actions";
import { EntryForm } from "@/components/EntryForm";

export default function NewEntryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/knowledge" className="hover:text-brand-600 transition">
          知识书房
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">新增</span>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          New Entry
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          新增知识条目
        </h1>
      </div>

      <EntryForm action={createEntry} submitLabel="保存" />
    </div>
  );
}
