"use client";

import { useState, useEffect } from "react";

type Dish = {
  id: string;
  name: string;
  nameEn: string | null;
  type: string;
  difficulty: string;
  note: string | null;
  emoji: string | null;
};

export function DishPicker({ dishes }: { dishes: Dish[] }) {
  const meatDishes = dishes.filter((d) => d.type === "MEAT");
  const veggieDishes = dishes.filter((d) => d.type === "VEGGIE");

  const [meatPick, setMeatPick] = useState<Dish | null>(null);
  const [veggiePick, setVeggiePick] = useState<Dish | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [meatIdx, setMeatIdx] = useState(0);
  const [veggieIdx, setVeggieIdx] = useState(0);

  useEffect(() => {
    if (!spinning) return;
    let count = 0;
    const maxCount = 18;
    const interval = setInterval(() => {
      setMeatIdx((prev) => (prev + 1) % meatDishes.length);
      setVeggieIdx((prev) => (prev + 1) % veggieDishes.length);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        const mi = Math.floor(Math.random() * meatDishes.length);
        const vi = Math.floor(Math.random() * veggieDishes.length);
        setMeatIdx(mi);
        setVeggieIdx(vi);
        setMeatPick(meatDishes[mi]);
        setVeggiePick(veggieDishes[vi]);
        setSpinning(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [spinning, meatDishes, veggieDishes]);

  const handleSpin = () => {
    if (meatDishes.length === 0 || veggieDishes.length === 0 || spinning)
      return;
    setMeatPick(null);
    setVeggiePick(null);
    setSpinning(true);
  };

  const meatDisplay = spinning ? meatDishes[meatIdx] : meatPick;
  const veggieDisplay = spinning ? veggieDishes[veggieIdx] : veggiePick;

  return (
    <div className="space-y-6">
      {/* 抽奖展示区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DishCard
          label="一荤"
          subtitle="Meat Dish"
          dish={meatDisplay}
          spinning={spinning}
          gradient="from-brand-100 to-gold-100"
          defaultEmoji="🥩"
        />
        <DishCard
          label="一素"
          subtitle="Veggie Dish"
          dish={veggieDisplay}
          spinning={spinning}
          gradient="from-gold-100 to-cream-200"
          defaultEmoji="🥬"
        />
      </div>

      {/* 按钮 */}
      <div className="flex justify-center gap-3 flex-wrap">
        <button
          onClick={handleSpin}
          disabled={
            spinning || meatDishes.length === 0 || veggieDishes.length === 0
          }
          className="bg-gradient-rose-button hover:bg-gradient-rose-button-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-sm">✦</span>
          {spinning
            ? "抽选中..."
            : meatPick
              ? "再抽一次"
              : "开始抽选 一荤一素"}
        </button>
        {meatPick && !spinning && (
          <button
            onClick={() => {
              setMeatPick(null);
              setVeggiePick(null);
            }}
            className="bg-white/80 backdrop-blur-sm text-ink-600 border border-cream-300 px-6 py-3 rounded-full font-medium hover:bg-white transition-all duration-300"
          >
            清除
          </button>
        )}
      </div>
    </div>
  );
}

function DishCard({
  label,
  subtitle,
  dish,
  spinning,
  gradient,
  defaultEmoji,
}: {
  label: string;
  subtitle: string;
  dish: Dish | null | undefined;
  spinning: boolean;
  gradient: string;
  defaultEmoji: string;
}) {
  const difficultyMap: Record<string, { label: string; color: string }> = {
    EASY: { label: "简单", color: "text-gold-700 bg-gold-100 border-gold-200" },
    MEDIUM: {
      label: "中等",
      color: "text-brand-700 bg-brand-100 border-brand-200",
    },
    HARD: {
      label: "进阶",
      color: "text-brand-800 bg-brand-200 border-brand-300",
    },
  };

  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-br ${gradient} p-8 shadow-soft-lg min-h-[280px] flex flex-col items-center justify-center overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative text-center w-full">
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-700 mb-2">
          {label} · {subtitle}
        </div>

        {!dish ? (
          <div className="py-4">
            <div className="text-5xl mb-3 opacity-40">{defaultEmoji}</div>
            <p className="text-ink-500 text-sm">等待抽选...</p>
          </div>
        ) : (
          <div key={dish.id} className={spinning ? "" : "animate-slide-up"}>
            <div
              className={`text-5xl mb-3 ${spinning ? "animate-bounce" : ""}`}
            >
              {dish.emoji ?? defaultEmoji}
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-ink-900 mb-1">
              {dish.name}
            </h3>
            {dish.nameEn && (
              <p className="text-xs text-ink-500 italic mb-3">{dish.nameEn}</p>
            )}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {difficultyMap[dish.difficulty] && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyMap[dish.difficulty].color}`}
                >
                  {difficultyMap[dish.difficulty].label}
                </span>
              )}
            </div>
            {dish.note && !spinning && (
              <p className="mt-3 text-xs text-ink-600 italic max-w-xs mx-auto">
                {dish.note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
