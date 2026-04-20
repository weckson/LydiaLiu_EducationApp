"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  PLATFORM_LABELS,
  EMOTION_LABELS,
  AUDIENCE_LABELS,
  type Platform,
  type Emotion,
  type Audience,
} from "@/lib/content-prompts";
import {
  HOT_TOPICS,
  CATEGORY_LABELS,
  type TopicCategory,
  type HotTopic,
} from "@/lib/content-topics";

export function ContentForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | "ALL">("ALL");
  const [topic, setTopic] = useState("");

  const filteredTopics =
    selectedCategory === "ALL"
      ? HOT_TOPICS
      : HOT_TOPICS.filter((t) => t.category === selectedCategory);

  return (
    <form action={action} className="space-y-6">
      {/* Section: 平台 + 情绪 + 受众 */}
      <section className="elegant-card p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-dashed border-gold-300/50">
          <div className="text-2xl">🎨</div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600">
              Style Configuration
            </div>
            <h2 className="font-serif text-xl text-ink-900">内容风格设定</h2>
          </div>
        </div>

        {/* 平台 */}
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">
            📱 发布平台 <span className="text-brand-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => {
              const meta = PLATFORM_LABELS[p];
              return (
                <label key={p} className="cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value={p}
                    defaultChecked={p === "XIAOHONGSHU"}
                    className="peer sr-only"
                  />
                  <div className="px-3 py-2 rounded-xl text-center text-sm border border-cream-300 bg-white hover:border-brand-300 peer-checked:bg-gradient-rose-button peer-checked:text-white peer-checked:border-transparent peer-checked:shadow-soft transition">
                    <div className="text-xl">{meta.emoji}</div>
                    <div className="text-xs mt-0.5">{meta.label}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 情绪 */}
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">
            💭 情绪 / 意图 <span className="text-brand-500">*</span>
            <span className="text-xs text-ink-500 ml-2">（决定文案风格）</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(EMOTION_LABELS) as Emotion[]).map((e) => {
              const meta = EMOTION_LABELS[e];
              return (
                <label key={e} className="cursor-pointer">
                  <input
                    type="radio"
                    name="emotion"
                    value={e}
                    defaultChecked={e === "INFO"}
                    className="peer sr-only"
                  />
                  <div className="px-2 py-2 rounded-xl text-center text-xs border border-cream-300 bg-white hover:border-brand-300 peer-checked:bg-brand-50 peer-checked:border-brand-400 peer-checked:ring-2 peer-checked:ring-brand-200 transition">
                    <div className="text-lg">{meta.emoji}</div>
                    <div className="font-medium mt-0.5">{meta.label}</div>
                    <div className="text-[10px] text-ink-500 mt-0.5">{meta.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 受众 */}
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-2">
            👥 目标受众
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(AUDIENCE_LABELS) as Audience[]).map((a) => {
              const meta = AUDIENCE_LABELS[a];
              return (
                <label key={a} className="cursor-pointer">
                  <input
                    type="radio"
                    name="audience"
                    value={a}
                    defaultChecked={a === "ANY"}
                    className="peer sr-only"
                  />
                  <div className="px-2 py-2 rounded-xl text-center text-xs border border-cream-300 bg-white hover:border-brand-300 peer-checked:bg-gold-50 peer-checked:border-gold-400 peer-checked:ring-2 peer-checked:ring-gold-200 transition">
                    <div className="text-lg">{meta.emoji}</div>
                    <div className="mt-0.5">{meta.label}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: 主题选择 */}
      <section className="elegant-card p-6 space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-dashed border-gold-300/50">
          <div className="text-2xl">🎯</div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600">
              Topic
            </div>
            <h2 className="font-serif text-xl text-ink-900">主题</h2>
          </div>
        </div>

        {/* 热门主题快选 */}
        <div>
          <div className="text-sm font-medium text-ink-700 mb-2">
            🔥 热门主题（点击快速填入，可再编辑）
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <CategoryChip
              label="全部"
              emoji="✨"
              active={selectedCategory === "ALL"}
              onClick={() => setSelectedCategory("ALL")}
            />
            {(Object.keys(CATEGORY_LABELS) as TopicCategory[]).map((c) => (
              <CategoryChip
                key={c}
                label={CATEGORY_LABELS[c].label}
                emoji={CATEGORY_LABELS[c].emoji}
                active={selectedCategory === c}
                onClick={() => setSelectedCategory(c)}
              />
            ))}
          </div>

          {/* 主题列表 */}
          <div className="max-h-64 overflow-y-auto border border-cream-200 rounded-xl p-2 bg-cream-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {filteredTopics.map((t, i) => (
                <TopicChip
                  key={i}
                  topic={t}
                  onClick={() => setTopic(t.title)}
                  active={topic === t.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 手动输入 */}
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            主题（可直接输入或从上方选择）<span className="text-brand-500">*</span>
          </label>
          <input
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="如：500 学生签证 2026 新政解读"
            className="input-elegant"
          />
        </div>

        {/* 额外指示 */}
        <div>
          <label className="block text-sm font-medium text-ink-700 mb-1.5">
            额外要求（可选）
          </label>
          <textarea
            name="extraInstructions"
            rows={2}
            placeholder="如：要提到最近 QLD 配额翻倍 / 强调 2026 年 7 月的变化 / 举一个真实案例"
            className="input-elegant text-sm"
          />
        </div>

        {/* Web search 开关 */}
        <label className="flex items-start gap-2 cursor-pointer select-none bg-gold-50/50 p-3 rounded-xl border border-gold-200">
          <input type="checkbox" name="useWebSearch" className="mt-1" />
          <div>
            <div className="text-sm text-ink-700 font-medium">
              🔍 搜索网上最近的热门帖子作参考
            </div>
            <div className="text-xs text-ink-500 mt-0.5">
              AI 会先搜近期同主题的爆款内容，模仿其切入角度和用词。会多花 20-30 秒和额外 ~¥0.3。
            </div>
          </div>
        </label>
      </section>

      {/* 提交 */}
      <div className="elegant-card p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="text-xs text-ink-500">
          生成约需 30-90 秒，<strong>别关闭页面</strong>，按钮会显示"生成中..."
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

// ════════════════════════════════════════════
// 子组件
// ════════════════════════════════════════════

function CategoryChip({
  label,
  emoji,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition ${
        active
          ? "bg-gradient-rose-button text-white border-transparent shadow-soft"
          : "bg-white text-ink-600 border-cream-300 hover:border-brand-300"
      }`}
    >
      {emoji} {label}
    </button>
  );
}

function TopicChip({
  topic,
  active,
  onClick,
}: {
  topic: HotTopic;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left text-xs px-3 py-2 rounded-lg border transition ${
        active
          ? "bg-brand-50 border-brand-400 text-brand-800"
          : "bg-white border-cream-200 hover:border-brand-200 hover:bg-cream-50"
      }`}
    >
      <div className="flex items-start gap-1.5">
        {topic.trend && <span>{topic.trend}</span>}
        <span className="font-medium text-ink-800 leading-snug flex-1">
          {topic.title}
        </span>
      </div>
      {topic.hint && (
        <div className="text-[10px] text-ink-500 mt-0.5 leading-snug">
          {topic.hint}
        </div>
      )}
    </button>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-rose-button hover:bg-gradient-rose-button-hover disabled:opacity-70 disabled:cursor-wait text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2"
    >
      {pending ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
          生成中...（请等待）
        </>
      ) : (
        <>
          <span>✦</span> 生成帖子
        </>
      )}
    </button>
  );
}
