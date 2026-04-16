import Link from "next/link";
import { prisma } from "@/lib/db";
import { createChecklist } from "@/lib/checklist-actions";

export const dynamic = "force-dynamic";

export default async function ChecklistPage() {
  const [templates, checklists] = await Promise.all([
    prisma.checklistTemplate.findMany({ orderBy: { visaType: "asc" } }),
    prisma.clientChecklist.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Visa Checklist
          </div>
          <h1 className="font-serif text-3xl text-ink-900 gold-underline">
            签证材料清单
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            选择签证类型，自动生成材料清单，可打勾跟踪准备进度
          </p>
        </div>
      </div>

      {/* 新建清单 */}
      <form action={createChecklist} className="elegant-card p-6 space-y-4">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          New Checklist
        </div>
        <h2 className="font-serif text-xl text-ink-900">新建清单</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              签证类型 <span className="text-brand-500">*</span>
            </label>
            <select
              name="visaType"
              required
              className="input-elegant cursor-pointer"
            >
              <option value="">选择签证类型...</option>
              {templates.map((t) => (
                <option key={t.visaType} value={t.visaType}>
                  {t.visaName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              客户姓名（可选）
            </label>
            <input
              name="clientName"
              placeholder="张同学"
              className="input-elegant"
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">
              <span>✦</span> 生成清单
            </button>
          </div>
        </div>
        {templates.length === 0 && (
          <p className="text-xs text-brand-600">
            ⚠️ 没有清单模板。请在服务器运行 <code>npm run db:seed</code> 导入初始数据。
          </p>
        )}
      </form>

      {/* 历史清单 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          History
        </div>
        <h2 className="font-serif text-xl text-ink-900 mb-4">历史清单</h2>
        {checklists.length === 0 ? (
          <div className="elegant-card p-12 text-center">
            <div className="text-4xl text-gold-400 mb-3">✦</div>
            <p className="text-ink-500">还没有任何清单</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {checklists.map((c) => {
              let items: any[] = [];
              try { items = JSON.parse(c.items); } catch {}
              const total = items.length;
              const checked = items.filter((i: any) => i.checked).length;
              const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

              return (
                <li key={c.id}>
                  <Link
                    href={`/checklist/${c.id}`}
                    className="elegant-card elegant-card-hover block p-5 group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base text-ink-900 group-hover:text-brand-700 transition">
                          {c.visaName}{" "}
                          {c.clientName && (
                            <span className="text-ink-500 text-sm font-sans">
                              · {c.clientName}
                            </span>
                          )}
                        </h3>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 bg-cream-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-rose-button h-full rounded-full transition-all"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-xs text-ink-500 flex-shrink-0">
                            {checked}/{total} ({percent}%)
                          </span>
                        </div>
                      </div>
                      <time className="text-xs text-ink-400 flex-shrink-0">
                        {new Date(c.createdAt).toLocaleDateString("zh-CN", {
                          month: "short", day: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
