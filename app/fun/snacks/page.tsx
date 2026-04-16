import Link from "next/link";
import { prisma } from "@/lib/db";
import { SnackPicker } from "@/components/SnackPicker";

export const dynamic = "force-dynamic";

export default async function SnacksPage() {
  const snacks = await prisma.snackRanking.findMany({
    orderBy: [{ category: "asc" }, { rank: "asc" }],
  });

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun" className="hover:text-brand-600 transition">
          小工具
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">零食抽奖</span>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Snack Lottery
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-ink-900 gold-underline">
          零食抽奖
        </h1>
        <p className="mt-3 text-sm text-ink-500 max-w-xl">
          抽到什么吃什么！覆盖 Coles / Woolworths + 华人超市热门零食 {snacks.length} 种
        </p>
      </div>

      <SnackPicker snacks={snacks} />
    </div>
  );
}
