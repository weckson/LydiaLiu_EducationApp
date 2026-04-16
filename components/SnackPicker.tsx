"use client";

import { useState, useEffect, useMemo, useRef } from "react";

type Snack = {
  id: string;
  category: string;
  name: string;
  nameEn: string | null;
  emoji: string | null;
  description: string | null;
  priceRange: string | null;
};

export function SnackPicker({ snacks }: { snacks: Snack[] }) {
  const [selected, setSelected] = useState<Snack | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const categories = useMemo(
    () => Array.from(new Set(snacks.map((s) => s.category))),
    [snacks]
  );
  const filtered = useMemo(
    () =>
      categoryFilter
        ? snacks.filter((s) => s.category === categoryFilter)
        : snacks,
    [snacks, categoryFilter]
  );

  const filteredRef = useRef(filtered);
  filteredRef.current = filtered;

  useEffect(() => {
    if (!spinning) return;
    if (filteredRef.current.length === 0) {
      setSpinning(false);
      return;
    }
    let count = 0;
    const maxCount = 20;
    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % filteredRef.current.length);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * filteredRef.current.length);
        setDisplayIndex(finalIndex);
        setSelected(filteredRef.current[finalIndex]);
        setSpinning(false);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [spinning]);

  const handleSpin = () => {
    if (filtered.length === 0 || spinning) return;
    setSelected(null);
    setSpinning(true);
  };

  const displayItem = spinning ? filtered[displayIndex] : selected;
  const categoryLabel = { AU: "Coles / Woolworths", ZH: "华人超市" };

  return (
    <div className="space-y-6">
      {/* 分类筛选 */}
      <div className="elegant-card p-4">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-3">
          筛选来源
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter("")}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
              categoryFilter === ""
                ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
                : "bg-white text-ink-600 border-brand-100 hover:border-brand-300"
            }`}
          >
            全部 ({snacks.length})
          </button>
          {categories.map((c) => {
            const count = snacks.filter((s) => s.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  categoryFilter === c
                    ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
                    : "bg-white text-ink-600 border-brand-100 hover:border-brand-300"
                }`}
              >
                {(categoryLabel as any)[c] ?? c} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 抽奖主卡 */}
      <div className="relative rounded-3xl bg-gradient-hero p-8 md:p-12 shadow-soft-lg min-h-[320px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-gold-200/40 blur-3xl pointer-events-none"></div>

        <div className="relative text-center w-full">
          {!displayItem && (
            <div className="py-8">
              <div className="text-6xl mb-4 animate-pulse">🍪</div>
              <p className="font-serif text-2xl text-ink-800 mb-2">
                今天吃什么零食？
              </p>
              <p className="text-sm text-ink-500">点击下方按钮开始抽选</p>
            </div>
          )}

          {displayItem && (
            <div
              key={displayItem.id}
              className={spinning ? "" : "animate-slide-up"}
            >
              <div
                className={`text-6xl mb-4 ${spinning ? "animate-bounce" : ""}`}
              >
                {displayItem.emoji ?? "🍬"}
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
                {spinning ? "Spinning..." : "Today's Snack"}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2 leading-tight">
                {displayItem.name}
              </h2>
              {displayItem.nameEn && (
                <p className="text-sm text-ink-500 italic mb-3">
                  {displayItem.nameEn}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                <span className="tag-chip-gold">
                  {(categoryLabel as any)[displayItem.category] ??
                    displayItem.category}
                </span>
                {displayItem.priceRange && (
                  <span className="tag-chip">
                    💰 {displayItem.priceRange}
                  </span>
                )}
              </div>
              {displayItem.description && !spinning && (
                <p className="mt-4 text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
                  {displayItem.description}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <button
              onClick={handleSpin}
              disabled={spinning || filtered.length === 0}
              className="bg-gradient-rose-button hover:bg-gradient-rose-button-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-sm">✦</span>
              {spinning ? "选择中..." : selected ? "再来一次" : "开始抽选"}
            </button>
            {selected && !spinning && (
              <button
                onClick={() => setSelected(null)}
                className="bg-white/80 backdrop-blur-sm text-ink-600 border border-cream-300 px-6 py-3 rounded-full font-medium hover:bg-white transition-all duration-300"
              >
                清除
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
