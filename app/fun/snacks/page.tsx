import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SnacksPage() {
  const [au, zh] = await Promise.all([
    prisma.snackRanking.findMany({
      where: { category: "AU" },
      orderBy: { rank: "asc" },
    }),
    prisma.snackRanking.findMany({
      where: { category: "ZH" },
      orderBy: { rank: "asc" },
    }),
  ]);

  return (
    <div className="space-y-10">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun" className="hover:text-brand-600 transition">
          小工具
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">零食排行榜</span>
      </div>

      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Snack Rankings
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-ink-900 gold-underline">
          零食排行榜
        </h1>
        <p className="mt-3 text-sm text-ink-500 max-w-xl">
          澳洲本土 Top 10 与华人社区 Top 10，收录当下最受欢迎的经典零食。
        </p>
      </div>

      {/* 双栏排行榜 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RankingColumn
          title="澳洲本土 Top 10"
          subtitle="Australian Favourites"
          items={au}
          gradient="from-brand-100 to-gold-100"
        />
        <RankingColumn
          title="华人社区 Top 10"
          subtitle="Chinese Community Favourites"
          items={zh}
          gradient="from-gold-100 to-cream-200"
        />
      </div>

      {/* 说明 */}
      <div className="elegant-card p-5 bg-cream-50/70">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-2">
          About
        </div>
        <p className="text-sm text-ink-600 leading-relaxed">
          ✦ 这份榜单基于公开销售数据和社区推荐人工整理，会不定期更新。
          <br />✦
          想添加或修改条目，直接进数据库管理，或告诉我加个在线编辑面板。
        </p>
      </div>
    </div>
  );
}

function RankingColumn({
  title,
  subtitle,
  items,
  gradient,
}: {
  title: string;
  subtitle: string;
  items: Array<{
    id: string;
    rank: number;
    name: string;
    nameEn: string | null;
    emoji: string | null;
    description: string | null;
    priceRange: string | null;
  }>;
  gradient: string;
}) {
  return (
    <section>
      <div
        className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 mb-4 shadow-soft`}
      >
        <div className="text-[10px] tracking-[0.2em] uppercase text-ink-700 mb-1">
          {subtitle}
        </div>
        <h2 className="font-serif text-2xl text-ink-900">{title}</h2>
      </div>

      <ul className="space-y-3">
        {items.length === 0 && (
          <li className="elegant-card p-10 text-center text-ink-500 text-sm">
            暂无数据 · 运行 npm run db:seed 导入初始数据
          </li>
        )}
        {items.map((item) => (
          <li key={item.id}>
            <div className="elegant-card elegant-card-hover p-5 flex items-start gap-4">
              {/* 排名徽章 */}
              <RankBadge rank={item.rank} />

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <h3 className="font-serif text-lg text-ink-900 leading-tight">
                    {item.emoji && (
                      <span className="mr-1">{item.emoji}</span>
                    )}
                    {item.name}
                  </h3>
                  {item.nameEn && (
                    <span className="text-xs text-ink-400 italic">
                      {item.nameEn}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-ink-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                )}
                {item.priceRange && (
                  <div className="mt-2">
                    <span className="tag-chip-gold">💰 {item.priceRange}</span>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    const colors = [
      "from-gold-400 to-gold-600 shadow-[0_4px_20px_rgba(201,169,110,0.35)]", // 金
      "from-ink-300 to-ink-500 shadow-[0_4px_20px_rgba(139,122,122,0.35)]", // 银
      "from-brand-400 to-brand-600 shadow-[0_4px_20px_rgba(176,104,118,0.35)]", // 铜
    ][rank - 1];
    return (
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors} flex items-center justify-center flex-shrink-0 relative`}
      >
        <span className="font-serif text-2xl text-white">{rank}</span>
        <span className="absolute -top-1 -right-1 text-xs">
          {rank === 1 ? "👑" : "✦"}
        </span>
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-2xl bg-cream-100 border border-cream-300 flex items-center justify-center flex-shrink-0">
      <span className="font-serif text-2xl text-ink-500">{rank}</span>
    </div>
  );
}
