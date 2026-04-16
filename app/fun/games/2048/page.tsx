import Link from "next/link";
import { Game2048 } from "@/components/games/Game2048";

export default function Page2048() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun/games" className="hover:text-brand-600 transition">小游戏</Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">2048</span>
      </div>
      <div className="text-center">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">Number Merge</div>
        <h1 className="font-serif text-3xl text-ink-900">2048</h1>
      </div>
      <Game2048 />
    </div>
  );
}
