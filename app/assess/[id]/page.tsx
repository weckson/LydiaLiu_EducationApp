import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteAssessment } from "@/lib/assessment-actions";
import { PointsBreakdownCard } from "@/components/PointsBreakdownCard";
import { PathPlanCard } from "@/components/PathPlanCard";
import { StateComparisonTable } from "@/components/StateComparisonTable";
import type {
  PointsBreakdown,
  RecommendedOccupation,
  PathPlan,
  StateStatus,
  PolicyUpdate,
} from "@/lib/assessment/types";

export const dynamic = "force-dynamic";

export default async function AssessmentReportPage({
  params,
}: {
  params: { id: string };
}) {
  const a = await prisma.assessment.findUnique({ where: { id: params.id } });
  if (!a) notFound();

  // 解析 JSON 字段
  const pointsBreakdown = safeParse<PointsBreakdown>(a.pointsBreakdown);
  const occupations = safeParse<RecommendedOccupation[]>(a.recommendedOccupations) ?? [];
  const pathA = safeParse<PathPlan>(a.pathA);
  const pathB = safeParse<PathPlan>(a.pathB);
  const pathC = safeParse<PathPlan>(a.pathC);
  const stateComparison = safeParse<StateStatus[]>(a.stateComparison) ?? [];
  const recentUpdates = safeParse<PolicyUpdate[]>(a.recentPolicyUpdates) ?? [];
  const citedIds = safeParse<string[]>(a.citedKnowledgeIds) ?? [];

  // 加载引用的知识条目
  const citedEntries =
    citedIds.length > 0
      ? await prisma.knowledgeEntry.findMany({
          where: { id: { in: citedIds } },
          select: { id: true, title: true, category: true },
        })
      : [];

  const deleteWithId = deleteAssessment.bind(null, a.id);

  // 处理中或失败状态
  if (a.status === "PROCESSING") {
    return <ProcessingView id={a.id} />;
  }
  if (a.status === "FAILED") {
    return <FailedView id={a.id} error={a.errorMessage} />;
  }

  return (
    <div className="space-y-8">
      {/* 面包屑 + 操作 */}
      <div className="flex items-center justify-between gap-2 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Link href="/assess" className="hover:text-brand-600 transition">
            移民评估
          </Link>
          <span className="text-gold-400">/</span>
          <span className="text-ink-700 truncate max-w-xs">
            {a.clientName || "未命名"}
          </span>
        </div>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded-full text-brand-600 hover:bg-brand-50 transition"
          >
            删除评估
          </button>
        </form>
      </div>

      {/* 顶部信息 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10 shadow-soft-lg">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-gold-200/40 blur-3xl"></div>

        <div className="relative space-y-3">
          <div className="text-[10px] tracking-[0.25em] uppercase text-brand-700">
            Migration Assessment Report
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink-900">
            {a.clientName || "未命名客户"}
            <span className="text-gold-500 ml-2">✦</span>
          </h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="tag-chip">
              {a.age} 岁
            </span>
            <span className="tag-chip">
              {a.highestDegree} · {a.fieldOfStudy}
            </span>
            <span className="tag-chip">{a.nationality || "—"}</span>
            <span className="tag-chip">
              英语 {a.englishTest} {a.englishOverall ?? "—"}
            </span>
            <span className="tag-chip">
              目标 {a.targetState || "ANY"}
            </span>
          </div>

          {/* 生成信息 */}
          <div className="pt-3 flex flex-wrap gap-4 text-xs text-ink-500">
            <span>
              📅 生成于{" "}
              {new Date(a.createdAt).toLocaleString("zh-CN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
            {a.dataFreshness && (
              <span>
                🌐 政策数据新鲜度：
                <strong className="text-brand-600">
                  {new Date(a.dataFreshness).toLocaleString("zh-CN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </strong>
              </span>
            )}
            {a.tokensUsed != null && (
              <span>⚡ 消耗 {a.tokensUsed} tokens</span>
            )}
          </div>
        </div>
      </section>

      {/* 分数 */}
      {pointsBreakdown && <PointsBreakdownCard breakdown={pointsBreakdown} />}

      {/* 核心结论（取自 Plan A 的 rationale，占位） */}
      {pathA?.rationale && (
        <section className="elegant-card p-6 md:p-8">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
            Executive Summary
          </div>
          <h2 className="font-serif text-xl text-ink-900 mb-3">核心结论</h2>
          <p className="text-ink-700 leading-relaxed">{pathA.rationale}</p>
        </section>
      )}

      {/* 推荐职业 */}
      {occupations.length > 0 && (
        <section className="elegant-card p-6 md:p-8 space-y-5">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
              Recommended Occupations
            </div>
            <h2 className="font-serif text-2xl text-ink-900">
              推荐职业评估
            </h2>
            <p className="text-xs text-ink-500 mt-1">
              基于客户的学历和工作经验，Top 3 最匹配的 ANZSCO 职业代码
            </p>
          </div>
          <div className="space-y-3">
            {occupations.map((o, i) => (
              <OccupationCard key={i} occ={o} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Plan A/B/C */}
      {pathA && <PathPlanCard plan={pathA} />}
      {pathB && <PathPlanCard plan={pathB} />}
      {pathC && <PathPlanCard plan={pathC} />}

      {/* 各州对比 */}
      {stateComparison.length > 0 && (
        <StateComparisonTable states={stateComparison} />
      )}

      {/* 最近政策变化 */}
      {recentUpdates.length > 0 && (
        <section className="elegant-card p-6 md:p-8 space-y-4">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
              Recent Updates
            </div>
            <h2 className="font-serif text-2xl text-ink-900">
              最近 30 天政策变化
            </h2>
          </div>
          <ul className="space-y-3">
            {recentUpdates.map((u, i) => (
              <li
                key={i}
                className="border-l-2 border-gold-400 pl-4 py-1"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1">
                    <div className="text-[11px] text-ink-500 tracking-wide">
                      {u.date} · {u.category}
                    </div>
                    <div className="font-serif text-base text-ink-900 mt-0.5">
                      {u.title}
                    </div>
                    <div className="text-sm text-ink-700 mt-1">
                      {u.summary}
                    </div>
                    {u.sourceUrl && (
                      <a
                        href={u.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-600 hover:underline mt-1 inline-block"
                      >
                        来源 →
                      </a>
                    )}
                  </div>
                  <ImpactBadge impact={u.impactToClient} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 引用的知识条目 */}
      {citedEntries.length > 0 && (
        <section className="elegant-card p-6 md:p-8 space-y-4">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
              Cited Knowledge
            </div>
            <h2 className="font-serif text-xl text-ink-900">
              引用的知识条目
            </h2>
            <p className="text-xs text-ink-500 mt-1">
              本次评估参考了知识库中的以下 SOP 和资料
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {citedEntries.map((e) => (
              <Link
                key={e.id}
                href={`/knowledge/${e.id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition"
              >
                📚 {e.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// 辅助组件
// ════════════════════════════════════════════

function OccupationCard({
  occ,
  rank,
}: {
  occ: RecommendedOccupation;
  rank: number;
}) {
  const confidenceMeta = {
    high: { label: "高度匹配", color: "bg-green-50 text-green-700 border-green-200" },
    medium: { label: "可行", color: "bg-gold-50 text-gold-700 border-gold-200" },
    low: { label: "需补充", color: "bg-cream-100 text-ink-600 border-cream-300" },
  }[occ.confidence] ?? { label: occ.confidence, color: "bg-cream-100 text-ink-600 border-cream-300" };

  return (
    <div className="bg-white border border-brand-100 rounded-xl p-4 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-rose-button flex items-center justify-center text-white font-serif flex-shrink-0 shadow-soft">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-serif text-base text-ink-900">
            {occ.code}
          </span>
          <span className="text-sm text-ink-700">{occ.name}</span>
          <span className="text-xs text-ink-500">· {occ.nameZh}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-xs flex-wrap">
          <span className="tag-chip-gold">{occ.assessmentBody}</span>
          {occ.list.map((l) => (
            <span key={l} className="tag-chip">
              {l}
            </span>
          ))}
          <span
            className={`px-2 py-0.5 rounded-full border ${confidenceMeta.color}`}
          >
            {confidenceMeta.label}
          </span>
        </div>
        {occ.reason && (
          <p className="text-xs text-ink-600 mt-2 italic">💡 {occ.reason}</p>
        )}
      </div>
    </div>
  );
}

function ImpactBadge({
  impact,
}: {
  impact: PolicyUpdate["impactToClient"];
}) {
  const fallback = { label: "—", color: "bg-cream-50 text-ink-400 border-cream-200" };
  const meta = {
    high: { label: "高影响", color: "bg-brand-100 text-brand-700 border-brand-200" },
    medium: { label: "中等", color: "bg-gold-100 text-gold-700 border-gold-200" },
    low: { label: "轻微", color: "bg-cream-100 text-ink-600 border-cream-200" },
    none: { label: "无关", color: "bg-cream-50 text-ink-400 border-cream-200" },
  }[impact ?? "none"] ?? fallback;
  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${meta.color}`}
    >
      {meta.label}
    </span>
  );
}

function ProcessingView({ id }: { id: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="font-serif text-xl text-ink-900">AI 正在生成评估报告...</p>
      <p className="text-sm text-ink-500">
        通常需要 30-90 秒（含实时政策搜索）
      </p>
      <p className="text-xs text-ink-400">请勿关闭页面</p>
      <meta httpEquiv="refresh" content="5" />
    </div>
  );
}

function FailedView({ id, error }: { id: string; error: string | null }) {
  return (
    <div className="space-y-6">
      <div className="elegant-card p-8 text-center space-y-4 border-brand-200">
        <div className="text-4xl text-brand-500">⚠️</div>
        <h2 className="font-serif text-2xl text-ink-900">评估生成失败</h2>
        <p className="text-sm text-ink-600">
          {error || "未知错误。请查看服务器日志或重试。"}
        </p>
        <Link href="/assess" className="btn-primary inline-flex">
          返回列表
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// JSON 安全解析
// ════════════════════════════════════════════

function safeParse<T>(s: string | null | undefined): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
