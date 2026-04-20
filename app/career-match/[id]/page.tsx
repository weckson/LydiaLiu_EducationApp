import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteCareerMatch } from "@/lib/career-match-actions";
import { OccupationMatchCard } from "@/components/OccupationMatchCard";
import { DOMAIN_LABELS } from "@/lib/career-match/anzsco-catalogue";
import type { DetailedOccupationMatch } from "@/lib/career-match/types";

export const dynamic = "force-dynamic";

export default async function CareerMatchResultPage({
  params,
}: {
  params: { id: string };
}) {
  const m = await prisma.careerMatch.findUnique({ where: { id: params.id } });
  if (!m) notFound();

  let occupations: DetailedOccupationMatch[] = [];
  try {
    occupations = JSON.parse(m.matchedOccupations ?? "[]");
  } catch {}

  let workExp: any[] = [];
  try {
    workExp = JSON.parse(m.workExperience);
  } catch {}

  const deleteWithId = deleteCareerMatch.bind(null, m.id);

  // 处理中状态
  if (m.status === "PROCESSING") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="font-serif text-xl text-ink-900">AI 正在匹配职业...</p>
        <p className="text-sm text-ink-500">通常 60-120 秒</p>
        <meta httpEquiv="refresh" content="5" />
      </div>
    );
  }

  // 失败状态
  if (m.status === "FAILED") {
    return (
      <div className="space-y-6">
        <div className="elegant-card p-8 text-center space-y-4 border-brand-200">
          <div className="text-4xl text-brand-500">⚠️</div>
          <h2 className="font-serif text-2xl text-ink-900">匹配失败</h2>
          <p className="text-sm text-ink-600">
            {m.errorMessage || "未知错误"}
          </p>
          <Link href="/career-match" className="btn-primary inline-flex">
            重试
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 面包屑 */}
      <div className="flex items-center justify-between gap-2 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Link
            href="/career-match"
            className="hover:text-brand-600 transition"
          >
            职业匹配
          </Link>
          <span className="text-gold-400">/</span>
          <span className="text-ink-700 truncate max-w-xs">
            {m.clientName || "未命名"}
          </span>
        </div>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded-full text-brand-600 hover:bg-brand-50 transition"
          >
            删除
          </button>
        </form>
      </div>

      {/* 头部 - 客户档案 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10 shadow-soft-lg">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-gold-200/40 blur-3xl"></div>

        <div className="relative">
          <div className="text-[10px] tracking-[0.25em] uppercase text-brand-700 mb-2">
            Career Matching Report
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink-900 mb-3">
            {m.clientName || "未命名客户"}
            <span className="text-gold-500 ml-2">✦</span>
          </h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="tag-chip">{m.highestDegree}</span>
            <span className="tag-chip">{m.fieldOfStudy}</span>
            {m.degreeCountry && (
              <span className="tag-chip">{m.degreeCountry}</span>
            )}
            {m.graduationYear && (
              <span className="tag-chip">{m.graduationYear} 毕业</span>
            )}
            <span className="tag-chip">{workExp.length} 段经验</span>
            {m.australianStudy && (
              <span className="tag-chip-gold">✓ 澳洲学历</span>
            )}
          </div>
          <div className="mt-3 text-xs text-ink-500">
            生成于{" "}
            {new Date(m.createdAt).toLocaleString("zh-CN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            {m.tokensUsed && ` · ${m.tokensUsed} tokens`}
          </div>
        </div>
      </section>

      {/* 整体总结 */}
      {m.summary && (
        <section className="elegant-card p-6">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
            Summary
          </div>
          <h2 className="font-serif text-xl text-ink-900 mb-3">整体分析</h2>
          <p className="text-ink-700 leading-relaxed">{m.summary}</p>
        </section>
      )}

      {/* UNMATCHED 状态 */}
      {m.status === "UNMATCHED" && (
        <section className="elegant-card p-8 border-brand-200 bg-brand-50/30 space-y-4">
          <div className="text-3xl text-brand-500">⚠️</div>
          <h2 className="font-serif text-2xl text-ink-900">
            未匹配到合适职业
          </h2>
          {m.unmatchedReason && (
            <p className="text-ink-700">{m.unmatchedReason}</p>
          )}
          <div className="text-sm text-ink-600">
            建议探索其他移民路径（如 482 SID 雇主担保、商业投资类、伴侣类、非技术移民）。
          </div>
        </section>
      )}

      {/* 职业匹配列表 */}
      {occupations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
                Matched Occupations
              </div>
              <h2 className="font-serif text-2xl text-ink-900">
                匹配的职业 ({occupations.length})
              </h2>
              <p className="text-xs text-ink-500 mt-1">
                按匹配度从高到低排序，每个职业含评估机构详细要求 + 各州接受情况
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {occupations.map((occ, i) => (
              <OccupationMatchCard key={i} occ={occ} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* 客户输入回顾 */}
      <section className="elegant-card p-6 bg-cream-50/40">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-3">
          Input Recap
        </div>
        <h2 className="font-serif text-lg text-ink-900 mb-3">输入信息回顾</h2>
        <div className="text-sm text-ink-700 space-y-2">
          <div>
            <strong>学历：</strong>
            {m.highestDegree} · {m.fieldOfStudy}
            {m.degreeCountry && ` · ${m.degreeCountry}`}
          </div>
          {workExp.length > 0 && (
            <div>
              <strong>工作经验：</strong>
              <ul className="ml-4 mt-1 space-y-1">
                {workExp.map((w: any, i: number) => (
                  <li key={i} className="text-xs">
                    {w.isInternship ? "[实习] " : ""}
                    {w.jobTitle} @ {w.company || "—"} ({w.country},{" "}
                    {w.durationYears} 年)
                    {w.description && (
                      <span className="text-ink-500"> · {w.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {m.certifications && (
            <div>
              <strong>证书：</strong>
              {m.certifications}
            </div>
          )}
          {m.notes && (
            <div>
              <strong>补充：</strong>
              {m.notes}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
