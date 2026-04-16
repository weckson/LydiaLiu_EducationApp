"use client";

import { useState, useEffect, useCallback } from "react";

const EMOJIS = ["🌸", "🦋", "🌺", "💎", "🎀", "🧸", "🌙", "🍰"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function createDeck(): Card[] {
  const pairs = EMOJIS.flatMap((emoji, i) => [
    { id: i * 2, emoji, flipped: false, matched: false },
    { id: i * 2 + 1, emoji, flipped: false, matched: false },
  ]);
  // Shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched === EMOJIS.length;

  const handleClick = useCallback(
    (idx: number) => {
      if (locked || cards[idx].flipped || cards[idx].matched) return;
      if (selected.length >= 2) return;

      const newCards = [...cards];
      newCards[idx] = { ...newCards[idx], flipped: true };
      setCards(newCards);

      const newSelected = [...selected, idx];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = newSelected;
        if (newCards[a].emoji === newCards[b].emoji) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, matched: true } : c
              )
            );
            setMatched((m) => m + 1);
            setSelected([]);
          }, 400);
        } else {
          // No match
          setLocked(true);
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, flipped: false } : c
              )
            );
            setSelected([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, selected, locked]
  );

  const restart = () => {
    setCards(createDeck());
    setSelected([]);
    setMoves(0);
    setMatched(0);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Moves</div>
          <div className="font-serif text-2xl text-ink-900">{moves}</div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Matched</div>
          <div className="font-serif text-2xl text-ink-900">
            {matched}/{EMOJIS.length}
          </div>
        </div>
        <button onClick={restart} className="btn-secondary text-xs">
          重来
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleClick(idx)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
                card.matched
                  ? "bg-green-100 border-2 border-green-300 scale-95"
                  : card.flipped
                    ? "bg-white border-2 border-brand-300 shadow-soft"
                    : "bg-gradient-rose-button shadow-soft cursor-pointer hover:shadow-soft-lg active:scale-95"
              }`}
            >
              {card.flipped || card.matched ? (
                <span>{card.emoji}</span>
              ) : (
                <span className="text-white text-lg">✦</span>
              )}
            </button>
          ))}
        </div>

        {won && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="font-serif text-3xl text-ink-900">
              🎉 完美配对！
            </div>
            <div className="text-sm text-ink-600">
              用了 {moves} 步
            </div>
            <button onClick={restart} className="btn-primary text-sm">
              再来一局
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-400">翻开两张找到相同的 emoji</p>
    </div>
  );
}
