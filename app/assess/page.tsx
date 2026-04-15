import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AssessListPage() {
  const assessments = await prisma.assessment.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Migration Assessment
          </div>
          <h1 className="font-serif text-3xl text-ink-900 gold-underline">
            移民方案评估
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            根据客户的学历、工作、英语等信息，自动生成 EOI 分数 + 推荐职业 + Plan
            A/B/C 方案
          </p>
        </div>
        <Link href="/assess/new" className="btn-primary">
          <span>✦</span> 新建评估
        </Link>
      </div>

      {/* 使用说明 */}
      <div className="elegant-card p-5 bg-gradient-hero/30">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-3">
          How It Works
        </div>
        <div className="text-sm text-ink-700 space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="text-gold-500 flex-shrink-0">1.</span>
            <span>填写客户背景（年龄、学历、工作、英语、偏好）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-500 flex-shrink-0">2.</span>
            <span>
              系统自动算出 EOI 分数（189/190/491 三档）+ 推荐 Top 3 职业代码
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-500 flex-shrink-0">3.</span>
            <span>
              实时抓取最新政策（州担保开放情况、最近邀请分数）+ 结合内部 SOP
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gold-500 flex-shrink-0">4.</span>
            <span>AI 生成 Plan A/B/C 三个可行方案 + 下一步行动清单</span>
          </div>
        </div>
      </div>

      {/* 历史列表 */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            History
          </div>
          <h2 className="font-serif text-xl text-ink-900">历史评估</h2>
        </div>

        {assessments.length === 0 ? (
          <div className="elegant-card p-16 text-center">
            <div className="text-4xl text-gold-400 mb-3">✦</div>
            <p className="text-ink-500 mb-4">还没有任何评估记录</p>
            <Link href="/assess/new" className="btn-primary">
              开始第一次评估
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {assessments.map((a) => {
              const statusMeta =
                a.status === "DONE"
                  ? {
                      label: "已完成",
                      color:
                        "bg-green-50 text-green-700 border-green-200",
                    }
                  : a.status === "PROCESSING"
                    ? {
                        label: "生成中",
                        color:
                          "bg-cream-100 text-ink-600 border-cream-300",
                      }
                    : a.status === "FAILED"
                      ? {
                          label: "失败",
                          color:
                            "bg-brand-50 text-brand-700 border-brand-200",
                        }
                      : {
                          label: "草稿",
                          color:
                            "bg-cream-100 text-ink-600 border-cream-300",
                        };

              return (
                <li key={a.id}>
                  <Link
                    href={`/assess/${a.id}`}
                    className="elegant-card elegant-card-hover block p-5 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-rose-button flex items-center justify-center flex-shrink-0 shadow-soft">
                          <span className="text-white text-xs">
                            {a.calculatedPoints189 ?? "?"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base text-ink-900 group-hover:text-brand-700 transition">
                            {a.clientName || "（未命名客户）"}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-ink-500 flex-wrap">
                            <span>{a.age} 岁</span>
                            <span className="text-ink-300">·</span>
                            <span>{a.highestDegree}</span>
                            <span className="text-ink-300">·</span>
                            <span>{a.fieldOfStudy || "专业未填"}</span>
                            {a.calculatedPoints189 != null && (
                              <>
                                <span className="text-ink-300">·</span>
                                <span className="font-serif text-brand-600">
                                  189: {a.calculatedPoints189} / 190:{" "}
                                  {a.calculatedPoints190} / 491:{" "}
                                  {a.calculatedPoints491}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${statusMeta.color}`}
                        >
                          {statusMeta.label}
                        </span>
                        <time className="text-xs text-ink-400 tracking-wide">
                          {new Date(a.createdAt).toLocaleString("zh-CN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </div>
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
