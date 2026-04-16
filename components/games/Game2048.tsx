"use client";

import { useState, useEffect, useCallback } from "react";

type Board = number[][];

function createEmptyBoard(): Board {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function addRandom(board: Board): Board {
  const b = board.map((r) => [...r]);
  const empty: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) if (b[r][c] === 0) empty.push([r, c]);
  if (empty.length === 0) return b;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  b[r][c] = Math.random() < 0.9 ? 2 : 4;
  return b;
}

function slideRow(row: number[]): { newRow: number[]; score: number } {
  const filtered = row.filter((v) => v !== 0);
  const newRow: number[] = [];
  let score = 0;
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      newRow.push(merged);
      score += merged;
      i += 2;
    } else {
      newRow.push(filtered[i]);
      i++;
    }
  }
  while (newRow.length < 4) newRow.push(0);
  return { newRow, score };
}

function move(board: Board, dir: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
  let totalScore = 0;
  let moved = false;
  const b = board.map((r) => [...r]);

  const process = (row: number[], reverse: boolean) => {
    const input = reverse ? [...row].reverse() : row;
    const { newRow, score } = slideRow(input);
    const result = reverse ? newRow.reverse() : newRow;
    totalScore += score;
    if (result.some((v, i) => v !== row[i])) moved = true;
    return result;
  };

  if (dir === "left" || dir === "right") {
    for (let r = 0; r < 4; r++) {
      const result = process(b[r], dir === "right");
      b[r] = result;
    }
  } else {
    for (let c = 0; c < 4; c++) {
      const col = [b[0][c], b[1][c], b[2][c], b[3][c]];
      const result = process(col, dir === "down");
      for (let r = 0; r < 4; r++) b[r][c] = result[r];
    }
  }
  return { board: b, score: totalScore, moved };
}

function isGameOver(board: Board): boolean {
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) return false;
      if (c < 3 && board[r][c] === board[r][c + 1]) return false;
      if (r < 3 && board[r][c] === board[r + 1][c]) return false;
    }
  return true;
}

function hasWon(board: Board): boolean {
  return board.some((row) => row.some((v) => v >= 2048));
}

const tileColors: Record<number, string> = {
  0: "bg-cream-100",
  2: "bg-cream-200 text-ink-800",
  4: "bg-cream-300 text-ink-800",
  8: "bg-gold-300 text-white",
  16: "bg-gold-400 text-white",
  32: "bg-gold-500 text-white",
  64: "bg-brand-400 text-white",
  128: "bg-brand-500 text-white",
  256: "bg-brand-600 text-white",
  512: "bg-brand-700 text-white",
  1024: "bg-brand-800 text-white",
  2048: "bg-gradient-rose-button text-white",
};

export function Game2048() {
  const [board, setBoard] = useState<Board>(() => addRandom(addRandom(createEmptyBoard())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleMove = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      if (gameOver) return;
      const result = move(board, dir);
      if (!result.moved) return;
      const newBoard = addRandom(result.board);
      const newScore = score + result.score;
      setBoard(newBoard);
      setScore(newScore);
      if (newScore > best) setBest(newScore);
      if (hasWon(newBoard) && !won) setWon(true);
      if (isGameOver(newBoard)) setGameOver(true);
    },
    [board, score, best, gameOver, won]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
        a: "left", d: "right", w: "up", s: "down",
      };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); handleMove(dir); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleMove]);

  // Touch support
  useEffect(() => {
    let startX = 0, startY = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const absDx = Math.abs(dx), absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < 30) return;
      if (absDx > absDy) handleMove(dx > 0 ? "right" : "left");
      else handleMove(dy > 0 ? "down" : "up");
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [handleMove]);

  const restart = () => {
    setBoard(addRandom(addRandom(createEmptyBoard())));
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Score</div>
          <div className="font-serif text-2xl text-ink-900">{score}</div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Best</div>
          <div className="font-serif text-2xl text-ink-900">{best}</div>
        </div>
        <button onClick={restart} className="btn-secondary text-xs">
          重来
        </button>
      </div>

      <div className="relative bg-cream-200 rounded-2xl p-2 shadow-soft">
        <div className="grid grid-cols-4 gap-2">
          {board.flat().map((val, i) => (
            <div
              key={i}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center font-serif text-xl md:text-2xl font-bold transition-all ${
                tileColors[val] ?? "bg-brand-800 text-white"
              }`}
            >
              {val > 0 ? val : ""}
            </div>
          ))}
        </div>

        {(gameOver || won) && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="font-serif text-3xl text-ink-900">
              {won ? "🎉 You Win!" : "Game Over"}
            </div>
            <div className="text-sm text-ink-600">分数：{score}</div>
            <button onClick={restart} className="btn-primary text-sm">
              再来一局
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-400">
        方向键 / WASD / 手指滑动操作
      </p>
    </div>
  );
}
