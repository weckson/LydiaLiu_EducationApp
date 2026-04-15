import type { PointsBreakdown } from "@/lib/assessment/types";

/**
 * 分数明细卡片
 * 显示 189/190/491 三档总分 + 分项拆解
 */
export function PointsBreakdownCard({
  breakdown,
}: {
  breakdown: PointsBreakdown;
}) {
  const items: Array<{ label: string; value: number; hint?: string }> = [
    { label: "年龄", value: breakdown.age },
    {
      label: "英语",
      value: breakdown.english,
      hint: breakdown.english === 20 ? "Superior" : breakdown.english === 10 ? "Proficient" : "Competent",
    },
    {
      label: "海外工作经验",
      value: breakdown.overseasWork,
      hint: `${breakdown.overseasYears} 年`,
    },
    {
      label: "澳洲工作经验",
      value: breakdown.auWork,
      hint: `${breakdown.auYears} 年`,
    },
    { label: "学历", value: breakdown.education },
    { label: "澳洲学习", value: breakdown.auStudy },
    { label: "偏远地区学习", value: breakdown.regionalStudy },
    { label: "NAATI", value: breakdown.naati },
    { label: "Professional Year", value: breakdown.professionalYear },
    { label: "配偶加分", value: breakdown.partner },
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
