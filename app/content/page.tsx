import Link from "next/link";
import { prisma } from "@/lib/db";
import { generateContent, deleteContent } from "@/lib/content-actions";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const posts = await prisma.contentPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const platformLabel: Record<string, { label: string; emoji: string }> = {
    XIAOHONGSHU: { label: "小红书", emoji: "📕" },
    WECHAT: { label: "微信公众号", emoji: "💬" },
    INSTAGRAM: { label: "Instagram", emoji: "📸" },
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Content Studio
          </div>
          <h1 className="font-serif text-3xl text-ink-900 gold-underline">
            内容工坊
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            基于知识库内容，一键生成小红书 / 微信 / Instagram 帖子
          </p>
        </div>
      </div>

      {/* 生成表单 */}
      <form action={generateContent} className="elegant-card p-6 space-y-4">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          New Post
        </div>
        <h2 className="font-serif text-xl text-ink-900">生成新帖子</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              平台 <span className="text-brand-500">*</span>
            </label>
            <select
              name="platform"
              defaultValue="XIAOHONGSHU"
              required
              className="input-elegant cursor-pointer"
            >
              <option value="XIAOHONGSHU">📕 小红书</option>
              <option value="WECHAT">💬 微信公众号</option>
              <option value="INSTAGRAM">📸 Instagram</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-ink-700 mb-1.5">
              主题 <span className="text-brand-500">*</span>
            </label>
            <input
              name="topic"
              required
              placeholder="如：500 学生签证 2025 新政解读"
              className="input-elegant"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary">
          <span>✦</span> 生成帖子
        </button>
      </form>

      {/* 历史帖子 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          History
        </div>
        <h2 className="font-serif text-xl text-ink-900 mb-4">历史帖子</h2>

        {posts.length === 0 ? (
          <div className="elegant-card p-12 text-center">
            <div className="text-4xl text-gold-400 mb-3">✦</div>
            <p className="text-ink-500">还没有生成过帖子</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {posts.map((p) => {
              const meta = platformLabel[p.platform] ?? {
                label: p.platform,
                emoji: "📄",
              };
              const deleteWithId = deleteContent.bind(null, p.id);
              let hashtags: string[] = [];
              try { hashtags = JSON.parse(p.hashtags ?? "[]"); } catch {}

              return (
                <li key={p.id} className="elegant-card p-6 space-y-3 group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{meta.emoji}</span>
                      <span className="tag-chip-gold">{meta.label}</span>
                      <span className="text-xs text-ink-400">
                        {new Date(p.createdAt).toLocaleString("zh-CN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <form action={deleteWithId}>
                      <button
                        type="submit"
                        className="text-xs px-2 py-1 rounded-full text-brand-600 hover:bg-brand-50 transition opacity-0 group-hover:opacity-100"
                      >
                        删除
                      </button>
                    </form>
                  </div>

                  <div className="text-xs text-ink-500">主题：{p.topic}</div>
                  <h3 className="font-serif text-lg text-ink-900">
                    {p.title}
                  </h3>
                  <div className="text-sm text-ink-700 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                    {p.content}
                  </div>

                  {hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {hashtags.map((h, i) => (
                        <span key={i} className="tag-chip text-[10px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <CopyButton text={`${p.title}\n\n${p.content}\n\n${hashtags.join(" ")}`} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
      className="btn-secondary text-xs"
    >
      📋 一键复制全文
    </button>
  );
}
