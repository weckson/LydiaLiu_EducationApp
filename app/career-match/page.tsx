import Link from "next/link";
import { prisma } from "@/lib/db";
import { createCareerMatch } from "@/lib/career-match-actions";
import { CareerMatchForm } from "@/components/CareerMatchForm";

export const dynamic = "force-dynamic";

export default async function CareerMatchPage() {
  const recentMatches = await prisma.careerMatch.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Career Match
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          职业匹配工具
        </h1>
        <p className="mt-3 text-sm text-ink-500 max-w-2xl">
          根据客户的学历和工作经验，AI 自动匹配所有可能的 ANZSCO
          职业代码，并详细分析评估机构要求 + 各州接受情况。
          适用于"咨询初期"的快速职业可行性评估。
        </p>
      </div>

      {/* 历史评估（精简列表） */}
      {recentMatches.length > 0 && (
        <div className="elegant-card p-5">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-3">
            Recent Matches
          </div>
          <ul className="space-y-2">
            {recentMatches.map((m) => {
              const meta =
                m.status === "DONE"
                  ? { label: "已完成", color: "bg-green-50 text-green-700" }
                  : m.status === "UNMATCHED"
                    ? { label: "无匹配", color: "bg-cream-100 text-ink-600" }
                    : m.status === "PROCESSING"
                      ? { label: "进行中", color: "bg-gold-50 text-gold-700" }
                      : { label: "失败", color: "bg-brand-50 text-brand-700" };
              return (
                <li key={m.id}>
                  <Link
                    href={`/career-match/${m.id}`}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-cream-50 transition group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${meta.color} flex-shrink-0`}
                      >
                        {meta.label}
                      </span>
                      <span className="text-sm text-ink-800 truncate group-hover:text-brand-700 transition">
                        {m.clientName || "（未命名）"} · {m.highestDegree} ·{" "}
                        {m.fieldOfStudy}
                      </span>
                    </div>
                    <time className="text-xs text-ink-400 flex-shrink-0">
                      {new Date(m.createdAt).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 表单 */}
      <CareerMatchForm action={createCareerMatch} />
    </div>
  );
}
