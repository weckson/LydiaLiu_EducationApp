import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteContent } from "@/lib/content-actions";
import { ContentCopyButton } from "@/components/ContentCopyButton";
import {
  PLATFORM_LABELS,
  EMOTION_LABELS,
  AUDIENCE_LABELS,
} from "@/lib/content-prompts";

export const dynamic = "force-dynamic";

export default async function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.contentPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  const platformMeta = PLATFORM_LABELS[post.platform as keyof typeof PLATFORM_LABELS] ?? {
    label: post.platform,
    emoji: "📄",
  };
  const emotionMeta = post.emotion
    ? EMOTION_LABELS[post.emotion as keyof typeof EMOTION_LABELS]
    : null;
  const audienceMeta = post.audience
    ? AUDIENCE_LABELS[post.audience as keyof typeof AUDIENCE_LABELS]
    : null;

  let hashtags: string[] = [];
  try { hashtags = JSON.parse(post.hashtags ?? "[]"); } catch {}

  let titleVariants: string[] = [];
  try { titleVariants = JSON.parse(post.titleVariants ?? "[]"); } catch {}

  let referenceSources: string[] = [];
  try { referenceSources = JSON.parse(post.referenceSources ?? "[]"); } catch {}

  const fullText = `${post.title}\n\n${post.content}\n\n${hashtags.join(" ")}`;
  const deleteWithId = deleteContent.bind(null, post.id);

  return (
    <div className="space-y-6">
      {/* 面包屑 */}
      <div className="flex items-center justify-between gap-2 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Link href="/content" className="hover:text-brand-600 transition">
            内容工坊
          </Link>
          <span className="text-gold-400">/</span>
          <span className="text-ink-700 truncate max-w-xs">{post.title}</span>
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

      {/* 头部 */}
      <section className="elegant-card p-6 md:p-8 space-y-4 bg-gradient-hero/40">
        <div className="flex flex-wrap gap-2">
          <span className="tag-chip-gold">
            {platformMeta.emoji} {platformMeta.label}
          </span>
          {emotionMeta && (
            <span className="tag-chip">
              {emotionMeta.emoji} {emotionMeta.label}
            </span>
          )}
          {audienceMeta && (
            <span className="tag-chip">
              {audienceMeta.emoji} {audienceMeta.label}
            </span>
          )}
          {post.tokensUsed && (
            <span className="text-[10px] text-ink-400 ml-auto">
              {post.tokensUsed} tokens
            </span>
          )}
        </div>
        <div className="text-xs text-ink-500">主题：{post.topic}</div>
      </section>

      {/* 标题 + 变体 */}
      <section className="elegant-card p-6 space-y-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Primary Title
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
            {post.title}
          </h1>
        </div>

        {titleVariants.length > 0 && (
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
              Alternate Titles 备选标题
            </div>
            <ul className="space-y-1.5">
              {titleVariants.map((v, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-cream-50/60 rounded-lg px-3 py-2"
                >
                  <span className="text-gold-500 flex-shrink-0">{i + 1}.</span>
                  <span className="text-sm text-ink-700 flex-1">{v}</span>
                  <ContentCopyButton text={v} label="复制" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 正文 */}
      <section className="elegant-card p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
              Content
            </div>
            <h2 className="font-serif text-lg text-ink-900">正文</h2>
          </div>
          <ContentCopyButton text={post.content} label="📋 复制正文" />
        </div>
        <div className="bg-cream-50/40 border border-cream-200 rounded-xl p-5 text-ink-800 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </section>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <section className="elegant-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
                Hashtags
              </div>
              <h2 className="font-serif text-lg text-ink-900">话题标签</h2>
            </div>
            <ContentCopyButton
              text={hashtags.join(" ")}
              label="📋 复制标签"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hashtags.map((h, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100"
              >
                {h}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 一键复制全部 */}
      <section className="elegant-card p-6 text-center bg-gradient-hero/30">
        <div className="text-sm text-ink-700 mb-3">
          🚀 一键复制到剪贴板（含标题 + 正文 + 标签）
        </div>
        <ContentCopyButton text={fullText} label="📋 复制全部内容" />
      </section>

      {/* 引用来源 */}
      {referenceSources.length > 0 && (
        <section className="elegant-card p-5 bg-cream-50/40">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
            Reference Sources
          </div>
          <div className="text-xs text-ink-500 mb-2">
            AI 参考了以下近期网上热门帖子
          </div>
          <ul className="space-y-1">
            {referenceSources.slice(0, 10).map((url, i) => (
              <li key={i} className="text-xs truncate">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 元信息 */}
      <div className="text-center text-xs text-ink-400">
        生成于{" "}
        {new Date(post.createdAt).toLocaleString("zh-CN", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    </div>
  );
}
