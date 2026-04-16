import Link from "next/link";
import { SnakeGame } from "@/components/games/SnakeGame";

export default function PageSnake() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun/games" className="hover:text-brand-600 transition">小游戏</Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">贪吃蛇</span>
      </div>
      <div className="text-center">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">Snake</div>
        <h1 className="font-serif text-3xl text-ink-900">贪吃蛇</h1>
      </div>
      <SnakeGame />
    </div>
  );
}
