import type { StateStatus } from "@/lib/assessment/types";

/**
 * 各州并列对比表
 */
export function StateComparisonTable({ states }: { states: StateStatus[] }) {
  if (states.length === 0) {
    return null;
  }

  return (
    <section className="elegant-card p-6 md:p-8 space-y-5">
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          State Comparison
        </div>
        <h2 className="font-serif text-2xl text-ink-900">各州对比</h2>
        <p className="text-xs text-ink-500 mt-1">
          最新的州担保状态 / 配额 / 获邀分数线
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gold-300/60">
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                州
              </th>
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                类别
              </th>
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                状态
              </th>
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                配额
              </th>
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                获邀分
              </th>
              <th className="text-left font-serif text-ink-900 py-2 pr-3">
                职业
              </th>
              <th className="text-left font-serif text-ink-900 py-2">
                备注
              </th>
            </tr>
          </thead>
          <tbody>
            {states.map((s, i) => (
              <tr
                key={i}
                className="border-b border-cream-200 last:border-b-0 hover:bg-cream-50/40"
              >
                <td className="py-3 pr-3">
                  <div className="font-semibold text-ink-900">{s.state}</div>
                  <div className="text-[11px] text-ink-500">
                    {s.stateNameZh}
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                    {s.program}
                  </span>
                </td>
                <td className="py-3 pr-3">
                  <StatusBadge status={s.openStatus} />
                </td>
                <td className="py-3 pr-3 text-xs text-ink-700">
                  {s.allocation2526 ? `${s.allocation2526}` : "—"}
                  {s.remainingQuota && (
                    <div className="text-[10px] text-ink-400">
                      {s.remainingQuota}
                    </div>
                  )}
                </td>
                <td className="py-3 pr-3 text-xs">
                  {s.recentInvitationCutoff != null ? (
                    <span className="font-serif text-brand-600 text-base">
                      {s.recentInvitationCutoff}
                    </span>
                  ) : (
                    <span className="text-ink-400">—</span>
                  )}
                </td>
                <td className="py-3 pr-3 text-xs">
                  {s.occupationOnList ? (
                    <span className="text-green-700">✓ 在清单</span>
                  ) : (
                    <span className="text-ink-400">— 不在</span>
                  )}
                </td>
                <td className="py-3 text-xs text-ink-600 max-w-xs">
                  {s.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: StateStatus["openStatus"] }) {
  const fallback = { label: "未知", color: "bg-cream-100 text-ink-600 border-cream-200" };
  const meta = {
    open: { label: "开放", color: "bg-green-100 text-green-700 border-green-200" },
    closed: { label: "关闭", color: "bg-brand-100 text-brand-700 border-brand-200" },
    "invitation-only": {
      label: "仅邀请",
      color: "bg-gold-100 text-gold-700 border-gold-200",
    },
    unknown: fallback,
  }[status ?? "unknown"] ?? fallback;
  return (
    <span
      className={`text-[11px] px-2 py-0.5 rounded-full border ${meta.color}`}
    >
      {meta.label}
    </span>
  );
}
