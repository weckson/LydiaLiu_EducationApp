import Link from "next/link";

export default function GamesPage() {
  const games = [
    {
      href: "/fun/games/2048",
      emoji: "🔢",
      name: "2048",
      sub: "Number Merge",
      desc: "滑动合并数字，目标 2048！",
    },
    {
      href: "/fun/games/memory",
      emoji: "🃏",
      name: "翻牌配对",
      sub: "Memory Match",
      desc: "翻开两张牌找到相同的，锻炼记忆力",
    },
    {
      href: "/fun/games/snake",
      emoji: "🐍",
      name: "贪吃蛇",
      sub: "Snake",
      desc: "经典贪吃蛇，吃到苹果变长",
    },
    {
      href: "/fun/games/breakout",
      emoji: "🧱",
      name: "打砖块",
      sub: "Breakout",
      desc: "控制挡板反弹球打掉所有砖块",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun" className="hover:text-brand-600 transition">
          小工具
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">小游戏</span>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Mini Games
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          小游戏
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          工作间隙放松一下 ✦
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {games.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="elegant-card elegant-card-hover overflow-hidden group"
          >
            <div className="h-28 bg-gradient-to-br from-brand-100 to-gold-100 flex items-center justify-center">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {g.emoji}
              </span>
            </div>
            <div className="p-4">
              <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600">
                {g.sub}
              </div>
              <h2 className="font-serif text-lg text-ink-900 group-hover:text-brand-700 transition">
                {g.name}
              </h2>
              <p className="text-xs text-ink-500 mt-1">{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
