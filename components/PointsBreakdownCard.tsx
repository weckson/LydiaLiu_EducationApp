import type { PointsBreakdown } from "@/lib/assessment/types";

/**
 * 分数明细卡片
 * 显示 189/190/491 三档总分 + 分项拆解 + 获邀参考线对比
 *
 * occupationCutoff189: 推荐第一职业在 189 通道的最近获邀分数（来自 web search）
 * 190 和 491 的参考线由此推算
 */
export function PointsBreakdownCard({
  breakdown,
}: {
  breakdown: PointsBreakdown & { occupationCutoff189?: number };
}) {
  // 该职业在 189 的获邀分数（来自 LLM web search），fallback 85
  const occCutoff189 = breakdown.occupationCutoff189 ?? 85;
  // 190 通常比 189 低 5-10 分（因为有州担保 +5）
  const occCutoff190 = Math.max(occCutoff189 - 10, 65);
  // 491 最低线通常是 65
  const occCutoff491 = 65;
  const partnerHint =
    breakdown.partner === 10
      ? "单身或配偶达标"
      : breakdown.partner === 5
        ? "配偶仅有英语"
        : "配偶无技能（比单身少 10 分）";

  const items: Array<{ label: string; value: number; hint?: string }> = [
    { label: "年龄", value: breakdown.age },
    {
      label: "英语",
      value: breakdown.english,
      hint: breakdown.english === 20 ? "Superior" : breakdown.english === 10 ? "Proficient" : "Competent",
    },
    {
      label: "境外工作经验",
      value: breakdown.overseasWork,
      hint: `${breakdown.overseasYears} 年`,
    },
    {
      label: "境内工作经验",
      value: breakdown.auWork,
      hint: `${breakdown.auYears} 年`,
    },
    { label: "学历", value: breakdown.education },
    { label: "澳洲学习", value: breakdown.auStudy },
    { label: "偏远地区学习", value: breakdown.regionalStudy },
    { label: "NAATI", value: breakdown.naati },
    { label: "Professional Year", value: breakdown.professionalYear },
    { label: "配偶", value: breakdown.partner, hint: partnerHint },
  ];

  return (
    <section className="elegant-card p-6 md:p-8 space-y-6">
      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          EOI Score
        </div>
        <h2 className="font-serif text-2xl text-ink-900">EOI 分数计算</h2>
      </div>

      {/* 三档总分 */}
      <div className="grid grid-cols-3 gap-4">
        <ScoreBig
          label="189 独立技术"
          value={breakdown.total189}
          accent="rose"
        />
        <ScoreBig
          label="190 州担保"
          value={breakdown.total190}
          accent="gold"
          hint="含州担保 +5"
        />
        <ScoreBig
          label="491 偏远地区"
          value={breakdown.total491}
          accent="cream"
          hint="含州担保 +15"
        />
      </div>

      {/* 获邀参考线对比 */}
      <div className="bg-cream-50/60 border border-cream-200 rounded-xl p-4">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-3">
          Invitation Cutoff Reference 获邀线对比
        </div>
        <div className="space-y-2">
          <CutoffBar
            label="189"
            score={breakdown.total189}
            cutoff={occCutoff189}
            hint={`该职业 189 获邀线 ~${occCutoff189}`}
          />
          <CutoffBar
            label="190"
            score={breakdown.total190}
            cutoff={occCutoff190}
            hint={`190 参考线 ~${occCutoff190}（189 线 -10）`}
          />
          <CutoffBar
            label="491"
            score={breakdown.total491}
            cutoff={occCutoff491}
            hint={`491 最低线 ${occCutoff491}`}
          />
        </div>
        <div className="mt-3 text-[10px] text-ink-400">
          ⚠️ 获邀线为推荐职业的最近一年参考值（来自 web search），每月可能变动。
        </div>
      </div>

      {/* 资格警告 */}
      {(!breakdown.ageEligible || !breakdown.englishEligible) && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-700 space-y-1">
          {!breakdown.ageEligible && (
            <div>⚠️ 年龄超出 45 岁，不符合标准技术移民</div>
          )}
          {!breakdown.englishEligible && (
            <div>⚠️ 英语未达 Competent（IELTS 6.0 / PTE 50）最低门槛</div>
          )}
        </div>
      )}

      {/* 分项拆解 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-3">
          Breakdown 分项明细
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border p-3 flex items-center justify-between ${
                item.value > 0
                  ? "bg-white border-brand-100"
                  : "bg-cream-50/60 border-cream-200 opacity-60"
              }`}
            >
              <div>
                <div className="text-xs text-ink-600">{item.label}</div>
                {item.hint && (
                  <div className="text-[10px] text-ink-400 mt-0.5">
                    {item.hint}
                  </div>
                )}
              </div>
              <div
                className={`font-serif text-xl ${
                  item.value > 0 ? "text-brand-600" : "text-ink-300"
                }`}
              >
                {item.value > 0 ? `+${item.value}` : "0"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 备注 */}
      {breakdown.notes.length > 0 && (
        <div className="bg-cream-50/60 border border-cream-200 rounded-xl p-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
            Notes
          </div>
          <ul className="space-y-1 text-xs text-ink-600">
            {breakdown.notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function ScoreBig({
  label,
  value,
  accent,
  hint,
}: {
  label: string;
  value: number;
  accent: "rose" | "gold" | "cream";
  hint?: string;
}) {
  const accentClass =
    accent === "rose"
      ? "bg-gradient-rose-button text-white"
      : accent === "gold"
        ? "bg-gradient-to-br from-gold-300 to-gold-500 text-white"
        : "bg-gradient-to-br from-cream-200 to-cream-400 text-ink-800";

  return (
    <div className={`rounded-2xl p-5 text-center shadow-soft ${accentClass}`}>
      <div className="text-[10px] tracking-[0.2em] uppercase opacity-80">
        {label}
      </div>
      <div className="font-serif text-5xl mt-2 leading-none">{value}</div>
      {hint && <div className="text-[10px] opacity-80 mt-2">{hint}</div>}
    </div>
  );
}

/**
 * 获邀分数对比进度条
 * 显示客户分数 vs 参考获邀线
 */
function CutoffBar({
  label,
  score,
  cutoff,
  hint,
}: {
  label: string;
  score: number;
  cutoff: number;
  hint: string;
}) {
  const maxDisplay = 120; // 进度条的最大刻度
  const scorePercent = Math.min((score / maxDisplay) * 100, 100);
  const cutoffPercent = Math.min((cutoff / maxDisplay) * 100, 100);
  const isAbove = score >= cutoff;

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-ink-700 font-medium">{label}</span>
        <span className="text-ink-500">{hint}</span>
      </div>
      <div className="relative h-6 bg-cream-100 rounded-full overflow-hidden">
        {/* 客户分数条 */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all ${
            isAbove
              ? "bg-gradient-to-r from-green-300 to-green-500"
              : "bg-gradient-to-r from-brand-300 to-brand-500"
          }`}
          style={{ width: `${scorePercent}%` }}
        />
        {/* 获邀线标记 */}
        <div
          className="absolute inset-y-0 w-0.5 bg-ink-800"
          style={{ left: `${cutoffPercent}%` }}
        />
        <div
          className="absolute -top-0.5 text-[9px] font-bold text-ink-800 -translate-x-1/2"
          style={{ left: `${cutoffPercent}%` }}
        >
          {cutoff}
        </div>
        {/* 客户分数标签 */}
        <div
          className={`absolute inset-y-0 flex items-center text-xs font-bold pl-2 ${
            isAbove ? "text-green-900" : "text-white"
          }`}
        >
          {score}
        </div>
      </div>
      <div className="text-[10px] mt-0.5 text-right">
        {isAbove ? (
          <span className="text-green-700">
            ✓ 高于参考线 +{score - cutoff}
          </span>
        ) : (
          <span className="text-brand-600">
            ✗ 低于参考线 -{cutoff - score}
          </span>
        )}
      </div>
    </div>
  );
}
