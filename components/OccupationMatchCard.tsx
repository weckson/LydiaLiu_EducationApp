import type { DetailedOccupationMatch as Match } from "@/lib/career-match/types";
import { DOMAIN_LABELS } from "@/lib/career-match/anzsco-catalogue";

const STATE_NAMES_ZH: Record<string, string> = {
  NSW: "新南威尔士",
  VIC: "维多利亚",
  QLD: "昆士兰",
  SA: "南澳",
  WA: "西澳",
  TAS: "塔斯马尼亚",
  NT: "北领地",
  ACT: "首都领地",
};

export function OccupationMatchCard({
  occ,
  rank,
}: {
  occ: Match;
  rank: number;
}) {
  // 匹配度颜色
  const scoreColor =
    occ.matchScore >= 80
      ? "from-green-400 to-green-600"
      : occ.matchScore >= 60
        ? "from-gold-400 to-gold-600"
        : "from-brand-400 to-brand-600";

  return (
    <article className="elegant-card overflow-hidden">
      {/* 头部 */}
      <div className="bg-gradient-hero p-6 border-b border-cream-200">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scoreColor} flex items-center justify-center text-white font-serif text-2xl flex-shrink-0 shadow-soft`}
            >
              {rank}
            </div>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-serif text-2xl text-ink-900">
                  {occ.anzscoCode}
                </span>
                <span className="font-serif text-lg text-ink-700">
                  {occ.nameEn}
                </span>
              </div>
              <div className="text-sm text-ink-600 mt-0.5">{occ.nameZh}</div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="tag-chip-gold">
                  {DOMAIN_LABELS[occ.domain] ?? occ.domain}
                </span>
                <span className="tag-chip">评估机构 {occ.assessment.body}</span>
                <ConfidenceBadge confidence={occ.confidence} />
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600">
              Match Score
            </div>
            <div className="font-serif text-4xl text-ink-900">
              {occ.matchScore}
            </div>
            <div className="text-xs text-ink-500">/ 100</div>
          </div>
        </div>

        {occ.matchReasoning && (
          <div className="bg-white/70 rounded-lg p-3 text-sm text-ink-700 italic">
            💡 {occ.matchReasoning}
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* 评估机构详细要求 */}
        <Section title="评估机构要求" subtitle="Assessment Requirements" icon="📋">
          <div className="bg-cream-50/60 rounded-xl p-4 space-y-2">
            <KV label="评估机构" value={occ.assessment.body} bold />
            <KV
              label="学历要求"
              value={occ.assessment.educationRequirement}
            />
            <KV
              label="工作经验要求"
              value={occ.assessment.workExperienceRequirement}
            />
            {occ.assessment.englishRequirement && (
              <KV label="英语要求" value={occ.assessment.englishRequirement} />
            )}
            {occ.assessment.deductionRules && (
              <KV
                label="工龄扣减规则"
                value={occ.assessment.deductionRules}
              />
            )}
            {occ.assessment.applicationFee && (
              <KV label="评估费" value={occ.assessment.applicationFee} />
            )}
            {occ.assessment.processingTime && (
              <KV label="处理时间" value={occ.assessment.processingTime} />
            )}
            {occ.assessment.specialNotes && (
              <KV label="特别说明" value={occ.assessment.specialNotes} />
            )}
          </div>
        </Section>

        {/* 各种清单归属 */}
        <Section title="清单归属" subtitle="Occupation Lists" icon="📑">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <ListBadge label="CSOL" on={occ.onLists.CSOL} hint="482 SID" />
            <ListBadge label="MLTSSL" on={occ.onLists.MLTSSL} hint="189" />
            <ListBadge label="STSOL" on={occ.onLists.STSOL} hint="短期" />
            <ListBadge label="ROL" on={occ.onLists.ROL} hint="偏远地区" />
            <ListBadge label="ENSOL" on={occ.onLists.ENSOL} hint="186 DE" />
          </div>
        </Section>

        {/* 各州接受情况 */}
        <Section title="各州接受情况" subtitle="State Availability" icon="🗺️">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-cream-300">
                  <th className="text-left py-2 pr-2 font-serif text-ink-900">
                    州
                  </th>
                  <th className="text-left py-2 pr-2 font-serif text-ink-900">
                    190 州担保
                  </th>
                  <th className="text-left py-2 font-serif text-ink-900">
                    491 偏远担保
                  </th>
                </tr>
              </thead>
              <tbody>
                {occ.stateAvailability.map((s) => {
                  const p190 = s.programs.find((p) => p.program === "190");
                  const p491 = s.programs.find((p) => p.program === "491");
                  return (
                    <tr
                      key={s.state}
                      className="border-b border-cream-200 last:border-b-0 hover:bg-cream-50/40"
                    >
                      <td className="py-2 pr-2">
                        <div className="font-semibold text-ink-900">
                          {s.state}
                        </div>
                        <div className="text-[10px] text-ink-500">
                          {STATE_NAMES_ZH[s.state]}
                        </div>
                      </td>
                      <td className="py-2 pr-2">
                        <StateCell program={p190} />
                      </td>
                      <td className="py-2">
                        <StateCell program={p491} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 优势 + 短板 */}
        <Section title="路径分析" subtitle="Path Analysis" icon="⚖️">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {occ.pros.length > 0 && (
              <div className="bg-green-50/60 border border-green-200 rounded-xl p-3">
                <div className="text-[10px] tracking-[0.2em] uppercase text-green-700 mb-2">
                  ✅ Pros 优势
                </div>
                <ul className="space-y-1 text-xs text-ink-700">
                  {occ.pros.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {occ.cons.length > 0 && (
              <div className="bg-brand-50/60 border border-brand-200 rounded-xl p-3">
                <div className="text-[10px] tracking-[0.2em] uppercase text-brand-700 mb-2">
                  ⚠️ Cons 短板
                </div>
                <ul className="space-y-1 text-xs text-ink-700">
                  {occ.cons.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* 强化建议 */}
        {occ.improvementTips.length > 0 && (
          <Section title="强化建议" subtitle="Improvement Tips" icon="🎯">
            <ul className="space-y-2 text-sm text-ink-700">
              {occ.improvementTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-500 flex-shrink-0">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 推荐签证路径 */}
        {occ.recommendedVisas.length > 0 && (
          <Section title="推荐签证路径" subtitle="Recommended Visas" icon="🛂">
            <div className="flex flex-wrap gap-2">
              {occ.recommendedVisas.map((v, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gradient-rose-button text-white rounded-full text-sm font-medium shadow-soft"
                >
                  {v}
                </span>
              ))}
            </div>
          </Section>
        )}
      </div>
    </article>
  );
}

// ════════════════════════════════════════════
// 子组件
// ════════════════════════════════════════════

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-gold-600">
          {subtitle}
        </span>
        <span className="font-serif text-base text-ink-900">{title}</span>
      </div>
      {children}
    </div>
  );
}

function KV({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-ink-500 flex-shrink-0 min-w-[5rem]">{label}：</span>
      <span className={bold ? "text-ink-900 font-semibold" : "text-ink-700"}>
        {value || "—"}
      </span>
    </div>
  );
}

function ConfidenceBadge({
  confidence,
}: {
  confidence: "high" | "medium" | "low";
}) {
  const meta = {
    high: { label: "高度匹配", color: "bg-green-100 text-green-700 border-green-200" },
    medium: { label: "可行", color: "bg-gold-100 text-gold-700 border-gold-200" },
    low: { label: "需补强", color: "bg-cream-100 text-ink-600 border-cream-300" },
  }[confidence] ?? { label: "未知", color: "bg-cream-100 text-ink-500" };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${meta.color}`}>
      {meta.label}
    </span>
  );
}

function ListBadge({
  label,
  on,
  hint,
}: {
  label: string;
  on: boolean;
  hint: string;
}) {
  return (
    <div
      className={`rounded-xl p-2 text-center border ${
        on
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-cream-50 border-cream-200 text-ink-400"
      }`}
    >
      <div className="text-xs font-bold">{on ? "✓" : "—"}</div>
      <div className="text-[10px] mt-0.5">{label}</div>
      <div className="text-[9px] opacity-70">{hint}</div>
    </div>
  );
}

function StateCell({
  program,
}: {
  program?: { program: string; available: string; notes?: string };
}) {
  if (!program) return <span className="text-ink-300">—</span>;
  const meta = {
    open: { label: "开放", color: "text-green-700" },
    closed: { label: "关闭", color: "text-brand-600" },
    "by-streams": { label: "限流", color: "text-gold-700" },
    unknown: { label: "未知", color: "text-ink-400" },
  }[program.available] ?? { label: program.available, color: "text-ink-500" };

  return (
    <div>
      <span className={`font-medium ${meta.color}`}>{meta.label}</span>
      {program.notes && (
        <div className="text-[10px] text-ink-500 mt-0.5">{program.notes}</div>
      )}
    </div>
  );
}
