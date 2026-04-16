import Link from "next/link";
import { BreakoutGame } from "@/components/games/BreakoutGame";

export default function PageBreakout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun/games" className="hover:text-brand-600 transition">小游戏</Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">打砖块</span>
      </div>
      <div className="text-center">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">Breakout</div>
        <h1 className="font-serif text-3xl text-ink-900">打砖块</h1>
      </div>
      <BreakoutGame />
    </div>
  );
}
