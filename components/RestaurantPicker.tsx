"use client";

import { useState, useEffect, useMemo, useRef } from "react";

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  suburb: string;
  priceLevel: number;
  note: string | null;
  emoji: string | null;
};

export function RestaurantPicker({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [cuisineFilter, setCuisineFilter] = useState<string>("");

  // 用 useMemo 保持引用稳定
  const cuisines = useMemo(
    () => Array.from(new Set(restaurants.map((r) => r.cuisine))),
    [restaurants]
  );
  const filtered = useMemo(
    () =>
      cuisineFilter
        ? restaurants.filter((r) => r.cuisine === cuisineFilter)
        : restaurants,
    [restaurants, cuisineFilter]
  );

  // 用 ref 追踪最新的 filtered 数组，避免闭包陷阱
  const filteredRef = useRef(filtered);
  filteredRef.current = filtered;

  // 转动动画 —— 只依赖 spinning，数组通过 ref 获取
  useEffect(() => {
    if (!spinning) return;
    if (filteredRef.current.length === 0) {
      setSpinning(false);
      return;
    }

    let count = 0;
    const maxCount = 18;
    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % filteredRef.current.length);
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        const finalIndex = Math.floor(
          Math.random() * filteredRef.current.length
        );
        setDisplayIndex(finalIndex);
        setSelected(filteredRef.current[finalIndex]);
        setSpinning(false);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [spinning]);

  const handleSpin = () => {
    if (filtered.length === 0 || spinning) return;
    setSelected(null);
    setSpinning(true);
  };

  const displayItem = spinning ? filtered[displayIndex] : selected;
  const priceSymbols = displayItem ? "$".repeat(displayItem.priceLevel) : "";

  return (
    <div className="space-y-6">
      {/* 菜系筛选 */}
      <div className="elegant-card p-4">
        <div className="text-[10px] tracking-[0.2em] uppercase text-gold-600 mb-3">
          筛选菜系（可选）
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCuisineFilter("")}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
              cuisineFilter === ""
                ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
                : "bg-white text-ink-600 border-brand-100 hover:border-brand-300"
            }`}
          >
            全部 ({restaurants.length})
          </button>
          {cuisines.map((c) => {
            const count = restaurants.filter((r) => r.cuisine === c).length;
            return (
              <button
                key={c}
                onClick={() => setCuisineFilter(c)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  cuisineFilter === c
                    ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
                    : "bg-white text-ink-600 border-brand-100 hover:border-brand-300"
                }`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 抽奖主卡片 */}
      <div className="relative rounded-3xl bg-gradient-hero p-8 md:p-12 shadow-soft-lg min-h-[320px] flex flex-col items-center justify-center overflow-hidden">
        {/* 装饰圆斑 */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-gold-200/40 blur-3xl pointer-events-none"></div>

        <div className="relative text-center w-full">
          {!displayItem && (
            <div className="py-8">
              <div className="text-6xl mb-4 animate-pulse">🍽️</div>
              <p className="font-serif text-2xl text-ink-800 mb-2">
                今晚吃什么？
              </p>
              <p className="text-sm text-ink-500">点击下方按钮开始抽选</p>
            </div>
          )}

          {displayItem && (
            <div
              key={displayItem.id}
              className={`py-4 ${spinning ? "" : "animate-slide-up"}`}
            >
              <div
                className={`text-6xl mb-4 ${spinning ? "animate-bounce" : ""}`}
              >
                {displayItem.emoji ?? "🍽️"}
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-2">
                {spinning ? "Spinning..." : "Tonight's Pick"}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-3 leading-tight">
                {displayItem.name}
              </h2>
              <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                <span className="tag-chip-gold">{displayItem.cuisine}</span>
                <span className="tag-chip">📍 {displayItem.suburb}</span>
                <span className="tag-chip">{priceSymbols}</span>
              </div>
              {displayItem.note && !spinning && (
                <p className="mt-4 text-sm text-ink-600 max-w-md mx-auto italic">
                  "{displayItem.note}"
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

          {filtered.length === 0 && (
            <p className="mt-4 text-sm text-brand-600">
              该菜系没有餐厅，换一个试试
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
