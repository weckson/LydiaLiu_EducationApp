"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GRID = 20;
const CELL = 18;
const INITIAL_SPEED = 150;

type Pos = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

export function SnakeGame() {
  const [snake, setSnake] = useState<Pos[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Pos>({ x: 15, y: 10 });
  const [dir, setDir] = useState<Dir>("RIGHT");
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const dirRef = useRef(dir);
  dirRef.current = dir;
  const snakeRef = useRef(snake);
  snakeRef.current = snake;

  const spawnFood = useCallback(
    (currentSnake: Pos[]): Pos => {
      let pos: Pos;
      do {
        pos = {
          x: Math.floor(Math.random() * GRID),
          y: Math.floor(Math.random() * GRID),
        };
      } while (
        currentSnake.some((s) => s.x === pos.x && s.y === pos.y)
      );
      return pos;
    },
    []
  );

  const restart = () => {
    const initial = [{ x: 10, y: 10 }];
    setSnake(initial);
    setFood(spawnFood(initial));
    setDir("RIGHT");
    setRunning(false);
    setGameOver(false);
    setScore(0);
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      const newDir = map[e.key];
      if (!newDir) return;
      e.preventDefault();
      // Prevent reverse
      const cur = dirRef.current;
      if (
        (newDir === "UP" && cur === "DOWN") ||
        (newDir === "DOWN" && cur === "UP") ||
        (newDir === "LEFT" && cur === "RIGHT") ||
        (newDir === "RIGHT" && cur === "LEFT")
      )
        return;
      setDir(newDir);
      if (!running && !gameOver) setRunning(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [running, gameOver]);

  // Game loop
  useEffect(() => {
    if (!running || gameOver) return;
    const speed = Math.max(50, INITIAL_SPEED - score * 2);
    const interval = setInterval(() => {
      const s = snakeRef.current;
      const head = s[0];
      const d = dirRef.current;
      const newHead = {
        x: head.x + (d === "RIGHT" ? 1 : d === "LEFT" ? -1 : 0),
        y: head.y + (d === "DOWN" ? 1 : d === "UP" ? -1 : 0),
      };
      // Collision check
      if (
        newHead.x < 0 || newHead.x >= GRID ||
        newHead.y < 0 || newHead.y >= GRID ||
        s.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setGameOver(true);
        setRunning(false);
        setBest((prev) => Math.max(prev, score));
        return;
      }
      const ateFood =
        newHead.x === food.x && newHead.y === food.y;
      const newSnake = [newHead, ...s];
      if (!ateFood) newSnake.pop();
      else {
        setScore((sc) => sc + 1);
        setFood(spawnFood(newSnake));
      }
      setSnake(newSnake);
    }, speed);
    return () => clearInterval(interval);
  }, [running, gameOver, food, score, spawnFood]);

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

      <div
        className="relative bg-cream-100 rounded-xl border border-cream-300 shadow-soft"
        style={{ width: GRID * CELL, height: GRID * CELL }}
      >
        {/* Food */}
        <div
          className="absolute text-sm flex items-center justify-center"
          style={{
            left: food.x * CELL,
            top: food.y * CELL,
            width: CELL,
            height: CELL,
          }}
        >
          🍎
        </div>
        {/* Snake */}
        {snake.map((seg, i) => (
          <div
            key={i}
            className={`absolute rounded-sm transition-all duration-75 ${
              i === 0
                ? "bg-brand-600 shadow-soft"
                : "bg-brand-400"
            }`}
            style={{
              left: seg.x * CELL + 1,
              top: seg.y * CELL + 1,
              width: CELL - 2,
              height: CELL - 2,
            }}
          />
        ))}

        {!running && !gameOver && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <button
              onClick={() => setRunning(true)}
              className="btn-primary"
            >
              开始游戏
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3">
            <div className="font-serif text-2xl text-ink-900">
              Game Over
            </div>
            <div className="text-sm text-ink-600">得分：{score}</div>
            <button onClick={restart} className="btn-primary text-sm">
              再来一局
            </button>
          </div>
        )}
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-1 w-36 md:hidden">
        <div />
        <button onClick={() => { setDir("UP"); if (!running) setRunning(true); }} className="btn-secondary text-lg py-1">↑</button>
        <div />
        <button onClick={() => { setDir("LEFT"); if (!running) setRunning(true); }} className="btn-secondary text-lg py-1">←</button>
        <button onClick={() => { setDir("DOWN"); if (!running) setRunning(true); }} className="btn-secondary text-lg py-1">↓</button>
        <button onClick={() => { setDir("RIGHT"); if (!running) setRunning(true); }} className="btn-secondary text-lg py-1">→</button>
      </div>

      <p className="text-xs text-ink-400">方向键 / WASD / 按钮操作</p>
    </div>
  );
}
