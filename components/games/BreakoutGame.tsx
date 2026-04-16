"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const W = 360;
const H = 480;
const PADDLE_W = 60;
const PADDLE_H = 10;
const BALL_R = 6;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_W = W / BRICK_COLS - 4;
const BRICK_H = 16;

const COLORS = ["#C8838F", "#D89BA5", "#C9A96E", "#DFCB9B", "#EBB8C4"];

export function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);

  const stateRef = useRef({
    paddleX: W / 2 - PADDLE_W / 2,
    ballX: W / 2,
    ballY: H - 40,
    dx: 3,
    dy: -3,
    bricks: [] as { x: number; y: number; alive: boolean; color: string }[],
    score: 0,
    lives: 3,
    running: false,
  });

  const initBricks = useCallback(() => {
    const bricks: { x: number; y: number; alive: boolean; color: string }[] = [];
    for (let r = 0; r < BRICK_ROWS; r++)
      for (let c = 0; c < BRICK_COLS; c++)
        bricks.push({
          x: c * (BRICK_W + 4) + 2,
          y: r * (BRICK_H + 4) + 30,
          alive: true,
          color: COLORS[r % COLORS.length],
        });
    return bricks;
  }, []);

  const restart = useCallback(() => {
    const s = stateRef.current;
    s.paddleX = W / 2 - PADDLE_W / 2;
    s.ballX = W / 2;
    s.ballY = H - 40;
    s.dx = 3;
    s.dy = -3;
    s.bricks = initBricks();
    s.score = 0;
    s.lives = 3;
    s.running = true;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWon(false);
    setStarted(true);
  }, [initBricks]);

  useEffect(() => {
    stateRef.current.bricks = initBricks();
  }, [initBricks]);

  // Mouse / touch control
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.paddleX = Math.max(
        0,
        Math.min(W - PADDLE_W, clientX - rect.left - PADDLE_W / 2)
      );
    };
    const mouseHandler = (e: MouseEvent) => onMove(e.clientX);
    const touchHandler = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    canvas.addEventListener("mousemove", mouseHandler);
    canvas.addEventListener("touchmove", touchHandler, { passive: false });
    return () => {
      canvas.removeEventListener("mousemove", mouseHandler);
      canvas.removeEventListener("touchmove", touchHandler);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const loop = () => {
      const s = stateRef.current;
      if (!s.running) return;

      // Move ball
      s.ballX += s.dx;
      s.ballY += s.dy;

      // Wall bounce
      if (s.ballX <= BALL_R || s.ballX >= W - BALL_R) s.dx = -s.dx;
      if (s.ballY <= BALL_R) s.dy = -s.dy;

      // Paddle bounce
      if (
        s.ballY >= H - PADDLE_H - 20 - BALL_R &&
        s.ballY <= H - 20 &&
        s.ballX >= s.paddleX &&
        s.ballX <= s.paddleX + PADDLE_W
      ) {
        s.dy = -Math.abs(s.dy);
        // Adjust angle
        const hitPos = (s.ballX - s.paddleX) / PADDLE_W - 0.5;
        s.dx = hitPos * 6;
      }

      // Miss
      if (s.ballY >= H) {
        s.lives--;
        setLives(s.lives);
        if (s.lives <= 0) {
          s.running = false;
          setGameOver(true);
          return;
        }
        s.ballX = W / 2;
        s.ballY = H - 40;
        s.dx = 3;
        s.dy = -3;
      }

      // Brick collision
      for (const brick of s.bricks) {
        if (!brick.alive) continue;
        if (
          s.ballX >= brick.x &&
          s.ballX <= brick.x + BRICK_W &&
          s.ballY >= brick.y &&
          s.ballY <= brick.y + BRICK_H
        ) {
          brick.alive = false;
          s.dy = -s.dy;
          s.score++;
          setScore(s.score);
          break;
        }
      }

      // Win check
      if (s.bricks.every((b) => !b.alive)) {
        s.running = false;
        setWon(true);
        return;
      }

      // Draw
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#FDF8F5";
      ctx.fillRect(0, 0, W, H);

      // Bricks
      for (const brick of s.bricks) {
        if (!brick.alive) continue;
        ctx.fillStyle = brick.color;
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, BRICK_W, BRICK_H, 4);
        ctx.fill();
      }

      // Paddle
      ctx.fillStyle = "#C8838F";
      ctx.beginPath();
      ctx.roundRect(s.paddleX, H - PADDLE_H - 20, PADDLE_W, PADDLE_H, 5);
      ctx.fill();

      // Ball
      ctx.fillStyle = "#C9A96E";
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [started]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Score</div>
          <div className="font-serif text-2xl text-ink-900">{score}</div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase text-gold-600">Lives</div>
          <div className="font-serif text-2xl text-ink-900">
            {"❤️".repeat(lives)}
          </div>
        </div>
        <button onClick={restart} className="btn-secondary text-xs">
          重来
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="rounded-2xl border border-cream-300 shadow-soft cursor-none"
        />

        {!started && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <button onClick={restart} className="btn-primary">
              开始游戏
            </button>
          </div>
        )}

        {(gameOver || won) && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="font-serif text-3xl text-ink-900">
              {won ? "🎉 通关！" : "Game Over"}
            </div>
            <div className="text-sm text-ink-600">得分：{score}</div>
            <button onClick={restart} className="btn-primary text-sm">
              再来一局
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-400">鼠标 / 手指控制挡板</p>
    </div>
  );
}
