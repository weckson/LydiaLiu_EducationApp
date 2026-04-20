import Link from "next/link";
import { prisma } from "@/lib/db";
import { generateContent } from "@/lib/content-actions";
import { ContentForm } from "@/components/ContentForm";
import { PLATFORM_LABELS, EMOTION_LABELS } from "@/lib/content-prompts";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const posts = await prisma.contentPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Content Studio
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          内容工坊
        </h1>
        <p className="mt-3 text-sm text-ink-500 max-w-2xl">
          按平台 × 情绪 × 受众 生成专业小红书 / 微信 / 抖音 / 知乎帖子。含 50+
          热门主题快选，可选参考网上最新爆款。
        </p>
      </div>

      {/* 表单 */}
      <ContentForm action={generateContent} />

      {/* 历史帖子 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          History
        </div>
        <h2 className="font-serif text-xl text-ink-900 mb-4">历史帖子</h2>

        {posts.length === 0 ? (
          <div className="elegant-card p-10 text-center">
            <div className="text-4xl text-gold-400 mb-2">✦</div>
            <p className="text-ink-500 text-sm">还没有生成过帖子，开始创作吧</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {posts.map((p) => {
              const pMeta = PLATFORM_LABELS[p.platform as keyof typeof PLATFORM_LABELS] ?? {
                label: p.platform,
                emoji: "📄",
              };
              const eMeta = p.emotion
                ? EMOTION_LABELS[p.emotion as keyof typeof EMOTION_LABELS]
                : null;

              return (
                <li key={p.id}>
                  <Link
                    href={`/content/${p.id}`}
                    className="elegant-card elegant-card-hover block p-4 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm">{pMeta.emoji}</span>
                          <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                            {pMeta.label}
                          </span>
                          {eMeta && (
                            <span className="text-xs bg-gold-50 text-gold-700 px-2 py-0.5 rounded-full">
                              {eMeta.emoji} {eMeta.label}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-base text-ink-900 group-hover:text-brand-700 transition truncate">
                          {p.title}
                        </h3>
                        <p className="text-xs text-ink-500 mt-0.5 truncate">
                          主题：{p.topic}
                        </p>
                      </div>
                      <time className="text-xs text-ink-400 flex-shrink-0 tracking-wide">
                        {new Date(p.createdAt).toLocaleString("zh-CN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
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
