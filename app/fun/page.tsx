import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function FunLandingPage() {
  const [snackCount, restaurantCount, dishCount] = await Promise.all([
    prisma.snackRanking.count(),
    prisma.restaurant.count(),
    prisma.dish.count(),
  ]);

  const tools: Array<{
    href: string;
    label: string;
    sub: string;
    desc: string;
    count: number;
    emoji: string;
    accent: string;
  }> = [
    {
      href: "/fun/snacks",
      label: "零食排行榜",
      sub: "Snack Rankings",
      desc: "澳洲本土热门 + 华人社区最爱的 Top 10 零食",
      count: snackCount,
      emoji: "🍪",
      accent: "from-brand-200 to-gold-200",
    },
    {
      href: "/fun/restaurants",
      label: "今晚吃什么",
      sub: "Dine Tonight",
      desc: "悉尼餐厅随机选择器，告别选择困难症",
      count: restaurantCount,
      emoji: "🍽️",
      accent: "from-gold-200 to-cream-300",
    },
    {
      href: "/fun/dishes",
      label: "今晚做什么菜",
      sub: "Cook Tonight",
      desc: "中式家常菜随机抽奖，荤菜 + 青菜各来一道",
      count: dishCount,
      emoji: "👩‍🍳",
      accent: "from-cream-200 to-brand-200",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-12 shadow-soft-lg">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-gold-200/40 blur-3xl"></div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-brand-700 mb-4">
            <span className="h-px w-8 bg-gold-500"></span>
            Fun Atelier
            <span className="h-px w-8 bg-gold-500"></span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-3 leading-tight">
            小工具 <span className="italic text-brand-700">Atelier</span>
            <span className="text-gold-500"> ✦</span>
          </h1>
          <p className="text-ink-600 text-base md:text-lg max-w-xl">
            生活里那些愉悦的小决定 —— 零食、餐厅、今晚做什么菜。
          </p>
        </div>
      </section>

      {/* 工具卡片 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="elegant-card elegant-card-hover group overflow-hidden relative"
          >
            {/* 顶部渐变装饰 */}
            <div
              className={`h-24 bg-gradient-to-br ${t.accent} flex items-center justify-center relative`}
            >
              <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                {t.emoji}
              </span>
              <div className="absolute top-3 right-3 text-white/70 text-xs tracking-wider">
                ✦
              </div>
            </div>

            <div className="p-5">
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
                {t.sub}
              </div>
              <h2 className="font-serif text-xl text-ink-900 group-hover:text-brand-700 transition mb-2">
                {t.label}
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                {t.desc}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-400">
                  <strong className="text-brand-600 font-serif text-base">
                    {t.count}
                  </strong>{" "}
                  条数据
                </span>
                <span className="text-brand-600 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
