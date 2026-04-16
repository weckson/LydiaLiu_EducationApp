"use client";

// 知识条目的新增/编辑共用表单
// 带 AI 自动标签推荐功能

import { useState, useRef } from "react";
import Link from "next/link";

type Entry = {
  id?: string;
  title?: string;
  contentMd?: string;
  category?: string | null;
  visibility?: string;
  sourceUrl?: string | null;
  tags?: { name: string }[];
};

export function EntryForm({
  action,
  entry,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  entry?: Entry;
  submitLabel: string;
}) {
  const tagsString = entry?.tags?.map((t) => t.name).join(", ") ?? "";
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const categoryRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleAiSuggest = async () => {
    const title = titleRef.current?.value ?? "";
    const content = contentRef.current?.value ?? "";

    if (content.trim().length < 10) {
      setAiMessage("请先输入正文（至少 10 个字）");
      return;
    }

    setAiLoading(true);
    setAiMessage("");

    try {
      const res = await fetch("/api/suggest-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const err = await res.json();
        setAiMessage(err.error ?? "推荐失败");
        return;
      }

      const data = await res.json();

      // 填入推荐的分类和标签
      if (data.category && categoryRef.current) {
        categoryRef.current.value = data.category;
      }
      if (data.tags?.length > 0 && tagsRef.current) {
        tagsRef.current.value = data.tags.join(", ");
      }
      if (data.title && titleRef.current && !titleRef.current.value.trim()) {
        titleRef.current.value = data.title;
      }

      setAiMessage(`✓ 推荐了 ${data.tags?.length ?? 0} 个标签`);
    } catch (e: any) {
      setAiMessage("网络错误：" + (e?.message ?? ""));
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <form action={action} className="space-y-6 elegant-card p-8">
      <Field label="标题" required>
        <input
          ref={titleRef}
          name="title"
          required
          defaultValue={entry?.title ?? ""}
          placeholder="例：500 学生签证 2026 新政要点"
          className="input-elegant"
        />
      </Field>

      <Field label="正文（支持 Markdown）" required>
        <textarea
          ref={contentRef}
          name="contentMd"
          required
          rows={16}
          defaultValue={entry?.contentMd ?? ""}
          placeholder={`# 要点\n\n- 第一点...\n- 第二点...\n\n## 详细说明\n\n这里写详细内容，可以用 **加粗**、*斜体*。`}
          className="input-elegant font-mono text-sm leading-7"
        />
      </Field>

      {/* AI 推荐按钮 */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={handleAiSuggest}
          disabled={aiLoading}
          className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 disabled:opacity-50 text-white px-5 py-2 rounded-full text-sm font-medium shadow-soft transition-all duration-300 flex items-center gap-2"
        >
          {aiLoading ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
              推荐中...
            </>
          ) : (
            <>
              <span>✦</span> AI 推荐分类和标签
            </>
          )}
        </button>
        {aiMessage && (
          <span
            className={`text-xs ${
              aiMessage.startsWith("✓")
                ? "text-green-600"
                : "text-brand-600"
            }`}
          >
            {aiMessage}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="分类">
          <input
            ref={categoryRef}
            name="category"
            defaultValue={entry?.category ?? ""}
            placeholder="例：签证政策 / 院校信息"
            className="input-elegant"
          />
        </Field>

        <Field label="标签（逗号或空格分隔）">
          <input
            ref={tagsRef}
            name="tags"
            defaultValue={tagsString}
            placeholder="500签证, 墨尔本大学, 2026"
            className="input-elegant"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="可见性">
          <select
            name="visibility"
            defaultValue={entry?.visibility ?? "PRIVATE"}
            className="input-elegant appearance-none cursor-pointer"
          >
            <option value="PRIVATE">仅自己</option>
            <option value="STUDENT_VISIBLE">学生可见</option>
          </select>
        </Field>

        <Field label="来源链接（可选）">
          <input
            name="sourceUrl"
            type="url"
            defaultValue={entry?.sourceUrl ?? ""}
            placeholder="https://immi.homeaffairs.gov.au/..."
            className="input-elegant"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        <Link
          href={entry?.id ? `/knowledge/${entry.id}` : "/knowledge"}
          className="btn-ghost"
        >
          取消
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-2">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
