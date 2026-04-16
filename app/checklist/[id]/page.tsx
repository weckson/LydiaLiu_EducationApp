import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteChecklist, updateChecklistItem } from "@/lib/checklist-actions";
import { ChecklistView } from "@/components/ChecklistView";

export const dynamic = "force-dynamic";

export default async function ChecklistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const checklist = await prisma.clientChecklist.findUnique({
    where: { id: params.id },
  });
  if (!checklist) notFound();

  let items: any[] = [];
  try {
    items = JSON.parse(checklist.items);
  } catch {}

  const deleteWithId = deleteChecklist.bind(null, checklist.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Link href="/checklist" className="hover:text-brand-600 transition">
            材料清单
          </Link>
          <span className="text-gold-400">/</span>
          <span className="text-ink-700">{checklist.visaName}</span>
        </div>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded-full text-brand-600 hover:bg-brand-50 transition"
          >
            删除清单
          </button>
        </form>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Document Checklist
        </div>
        <h1 className="font-serif text-3xl text-ink-900">
          {checklist.visaName}
          {checklist.clientName && (
            <span className="text-ink-500 text-xl ml-3 font-sans">
              · {checklist.clientName}
            </span>
          )}
        </h1>
        <p className="mt-2 text-xs text-ink-400">
          创建于{" "}
          {new Date(checklist.createdAt).toLocaleString("zh-CN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
          {" · "}点击材料名打勾标记已准备
        </p>
      </div>

      <ChecklistView
        checklistId={checklist.id}
        initialItems={items}
        updateAction={updateChecklistItem}
      />
    </div>
  );
}
