import type { PathPlan } from "@/lib/assessment/types";

/**
 * Plan A/B/C 单张卡片
 */
export function PathPlanCard({ plan }: { plan: PathPlan }) {
  const labelMeta = {
    A: {
      title: "Plan A",
      subtitle: "主推荐 Primary",
      gradient: "from-brand-100 to-gold-100",
      badge: "bg-gradient-rose-button text-white",
    },
    B: {
      title: "Plan B",
      subtitle: "备选 Alternative",
      gradient: "from-gold-100 to-cream-200",
      badge: "bg-gradient-to-br from-gold-400 to-gold-600 text-white",
    },
    C: {
      title: "Plan C",
      subtitle: "保底 Fallback",
      gradient: "from-cream-100 to-brand-50",
      badge: "bg-gradient-to-br from-cream-400 to-cream-500 text-ink-800",
    },
  }[plan.label];

  const feasibilityColor = {
    high: "text-green-700 bg-green-50 border-green-200",
    medium: "text-gold-700 bg-gold-50 border-gold-200",
    low: "text-brand-700 bg-brand-50 border-brand-200",
  }[plan.feasibility ?? "medium"] ?? "text-ink-600 bg-cream-100 border-cream-200";

  const feasibilityLabel = {
    high: "可行性高",
    medium: "可行性中",
    low: "可行性低",
  }[plan.feasibility ?? "medium"] ?? "可行性未知";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${labelMeta.gradient} p-6 md:p-8 shadow-soft`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative space-y-5">
        {/* 头部 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-700">
              {labelMeta.subtitle}
            </div>
            <h2 className="font-serif text-3xl text-ink-900 mt-1">
              {labelMeta.title}
            </h2>
          </div>
          <div
            className={`${labelMeta.badge} px-4 py-2 rounded-full text-sm font-bold shadow-soft`}
          >
            {plan.visaSubclass}
          </div>
        </div>

        {/* 签证名称 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/60">
          <div className="font-serif text-lg text-ink-900">
            {plan.visaName}
          </div>
          {plan.targetState && (
            <div className="text-sm text-ink-600 mt-1">
              推荐州：<strong>{plan.targetState}</strong>
            </div>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="tag-chip-gold">
              客户分数 {plan.expectedPoints}
            </span>
            {plan.invitationCutoff != null && (
              <span className="tag-chip">
                当前获邀线 ~{plan.invitationCutoff}
              </span>
            )}
            <span
              className={`px-2.5 py-1 rounded-full border ${feasibilityColor}`}
            >
              {feasibilityLabel}
            </span>
          </div>
        </div>

        {/* 理由 */}
        {plan.rationale && (
          <div className="text-sm text-ink-700 italic border-l-2 border-gold-400 pl-3">
            {plan.rationale}
          </div>
        )}

        {/* 时间线 / 成本 / 成功率 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Metric label="时间线" value={plan.timeline} icon="⏱" />
          <Metric label="成本" value={plan.estimatedCost} icon="💰" />
          <Metric label="成功率" value={plan.successRate} icon="🎯" />
        </div>

        {/* 关键步骤 */}
        {plan.keySteps.length > 0 && (
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-700 mb-2">
              Key Steps 关键步骤
            </div>
            <ol className="space-y-1.5">
              {plan.keySteps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                  <span className="font-serif text-brand-600 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 优势 + 风险 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plan.advantages.length > 0 && (
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-[10px] tracking-[0.2em] uppercase text-green-700 mb-2">
                ✅ Advantages 优势
              </div>
              <ul className="space-y-1 text-xs text-ink-700">
                {plan.advantages.map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
            </div>
          )}
          {plan.risks.length > 0 && (
            <div className="bg-white/60 rounded-xl p-3">
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand-700 mb-2">
                ⚠️ Risks 风险
              </div>
              <ul className="space-y-1 text-xs text-ink-700">
                {plan.risks.map((r, i) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white/60 rounded-xl p-3">
      <div className="text-[10px] tracking-[0.2em] uppercase text-gold-700 mb-1">
        {icon} {label}
      </div>
      <div className="text-sm text-ink-800">{value || "—"}</div>
    </div>
  );
}
