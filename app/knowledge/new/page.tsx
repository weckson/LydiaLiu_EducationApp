import Link from "next/link";
import { createEntry } from "@/lib/actions";
import { EntryForm } from "@/components/EntryForm";

export default function NewEntryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/knowledge" className="hover:text-brand-600">
          知识库
        </Link>
        <span>/</span>
        <span className="text-slate-800">新增</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800">新增知识条目</h1>

      <EntryForm action={createEntry} submitLabel="保存" />
    </div>
  );
}
