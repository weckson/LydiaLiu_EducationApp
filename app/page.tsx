import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    entryCount,
    embeddedCount,
    sessionCount,
    todoActiveCount,
    recent,
  ] = await Promise.all([
    prisma.knowledgeEntry.count(),
    prisma.knowledgeEntry.count({ where: { embedding: { not: null } } }),
    prisma.chatSession.count(),
    prisma.todo.count({ where: { done: false } }),
    prisma.knowledgeEntry.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { tags: true },
    }),
  ]);

  return (
    <div className="space-y-14">
      {/* ═══ Hero 区 ═══ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-14 shadow-soft-lg">
        {/* 装饰性圆斑 */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/40 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-gold-200/40 blur-3xl"></div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-brand-700 mb-4">
            <span className="h-px w-8 bg-gold-500"></span>
            Rose Study · Est. 2026
            <span className="h-px w-8 bg-gold-500"></span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-3 leading-tight">
            Welcome back,
            <br />
            <span className="italic text-brand-700">Lydia</span>
            <span className="text-gold-500"> ✦</span>
          </h1>

          <p className="text-ink-600 text-base md:text-lg max-w-xl leading-relaxed">
            这里是你的专属知识书房。日常随手沉淀，<br className="hidden md:inline" />
            AI 随时为你检索、引用、作答。
          </p>

          <div className="mt-8 flex gap-3 flex-wrap">
            <Link
              href="/chat"
              className="bg-white/95 text-brand-700 px-6 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg hover:bg-white transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-gold-500">✦</span> 开启 AI 问答
            </Link>
            <Link
              href="/knowledge/new"
              className="bg-transparent border border-brand-400/60 text-brand-800 px-6 py-3 rounded-full font-medium hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
            >
              + 新增知识
            </Link>
            <Link
              href="/knowledge"
              className="bg-transparent text-ink-700 px-6 py-3 rounded-full font-medium hover:bg-white/40 backdrop-blur-sm transition-all duration-300"
            >
              浏览书房
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 统计卡片 ═══ */}
      <section>
        <SectionHeader title="今日概览" subtitle="Overview" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard
            label="知识条目"
            value={entryCount}
            subtitle="Entries"
            accent="rose"
          />
          <StatCard
            label="待办事项"
            value={todoActiveCount}
            subtitle="Todos"
            accent="gold"
          />
          <StatCard
            label="可检索"
            value={embeddedCount}
            subtitle="Indexed"
            accent="cream"
          />
          <StatCard
            label="对话记录"
            value={sessionCount}
            subtitle="Chats"
            accent="rose"
          />
        </div>
      </section>

      {/* 快捷小工具入口 */}
      <section>
        <SectionHeader title="小工具" subtitle="Atelier" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLink
            href="/todo"
            emoji="📝"
            label="待办"
            sub="Todo"
          />
          <QuickLink
            href="/fun/snacks"
            emoji="🍪"
            label="零食榜"
            sub="Snacks"
          />
          <QuickLink
            href="/fun/restaurants"
            emoji="🍽️"
            label="今晚吃什么"
            sub="Dine"
          />
          <QuickLink
            href="/fun/dishes"
            emoji="👩‍🍳"
            label="做什么菜"
            sub="Cook"
          />
        </div>
      </section>

      {/* ═══ 最近更新 ═══ */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <SectionHeader title="最近更新" subtitle="Recent" noBottomMargin />
          <Link
            href="/knowledge"
            className="text-sm text-brand-600 hover:text-brand-700 transition flex items-center gap-1"
          >
            查看全部 <span>→</span>
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyHint />
        ) : (
          <ul className="space-y-3">
            {recent.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/knowledge/${e.id}`}
                  className="elegant-card elegant-card-hover block p-5 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg text-ink-900 group-hover:text-brand-700 transition">
                      {e.title}
                    </h3>
                    <time className="text-xs text-ink-400 flex-shrink-0 tracking-wide">
                      {new Date(e.updatedAt).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {e.category && (
                      <span className="tag-chip-gold">{e.category}</span>
                    )}
                    {e.tags.slice(0, 4).map((t) => (
                      <span key={t.id} className="tag-chip">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ═════════════════════════════════════
// 组件
// ═════════════════════════════════════

function SectionHeader({
  title,
  subtitle,
  noBottomMargin,
}: {
  title: string;
  subtitle: string;
  noBottomMargin?: boolean;
}) {
  return (
    <div className={noBottomMargin ? "" : "mb-6"}>
      <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
        {subtitle}
      </div>
      <h2 className="font-serif text-2xl text-ink-900 gold-underline">
        {title}
      </h2>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string;
  value: number | string;
  subtitle: string;
  accent: "rose" | "gold" | "cream";
}) {
  const accentColor = {
    rose: "text-brand-500",
    gold: "text-gold-600",
    cream: "text-cream-400",
  }[accent];

  return (
    <div className="elegant-card p-5 relative overflow-hidden">
      <div className="text-[10px] tracking-[0.2em] uppercase text-ink-400">
        {subtitle}
      </div>
      <div
        className={`mt-2 font-serif text-4xl ${accentColor} tracking-tight`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-600">{label}</div>
      <div className="absolute top-3 right-3 text-gold-400 text-sm">✦</div>
    </div>
  );
}

function QuickLink({
  href,
  emoji,
  label,
  sub,
}: {
  href: string;
  emoji: string;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="elegant-card elegant-card-hover p-5 text-center group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">
        {emoji}
      </div>
      <div className="font-serif text-base text-ink-900 group-hover:text-brand-700 transition">
        {label}
      </div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mt-0.5">
        {sub}
      </div>
    </Link>
  );
}

function EmptyHint() {
  return (
    <div className="elegant-card p-12 text-center">
      <div className="text-4xl text-gold-400 mb-3">✦</div>
      <p className="text-ink-500 mb-4">这里还没有任何知识条目</p>
      <Link href="/knowledge/new" className="btn-primary">
        录入第一条
      </Link>
    </div>
  );
}
