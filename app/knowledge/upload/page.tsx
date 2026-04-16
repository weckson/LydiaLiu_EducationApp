"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    extractedText: string;
    suggestedTitle: string;
    suggestedCategory: string;
    suggestedTags: string[];
    filename: string;
  } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("请选择文件"); return; }

    setUploading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "上传失败");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError("网络错误：" + (e?.message ?? ""));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setSaving(true);

    const title = titleRef.current?.value ?? result.suggestedTitle;
    const category = categoryRef.current?.value ?? result.suggestedCategory;
    const tags = tagsRef.current?.value ?? result.suggestedTags.join(", ");
    const content = contentRef.current?.value ?? result.extractedText;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contentMd", content);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("visibility", "PRIVATE");

    // 调用现有的 createEntry action（通过 fetch）
    try {
      const res = await fetch("/api/create-entry", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/knowledge/${data.id}`);
      } else {
        setError("保存失败");
      }
    } catch {
      setError("保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/knowledge" className="hover:text-brand-600 transition">
          知识库
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">文件导入</span>
      </div>

      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Import from File
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          一键导入知识
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          上传 PDF / Word / TXT 文件，AI 自动提取内容并推荐分类和标签
        </p>
      </div>

      {/* 上传区 */}
      {!result && (
        <div className="elegant-card p-8 space-y-4">
          <div className="border-2 border-dashed border-brand-200 rounded-2xl p-12 text-center hover:border-brand-400 transition">
            <div className="text-4xl text-gold-400 mb-3">📄</div>
            <p className="text-ink-700 mb-3">拖拽文件到这里，或点击选择</p>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx,.txt,.md"
              className="block mx-auto text-sm text-ink-600"
            />
            <p className="text-xs text-ink-400 mt-2">
              支持 .pdf / .docx / .txt / .md（最大 10MB）
            </p>
          </div>

          {error && (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-sm text-brand-700">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-primary w-full"
          >
            {uploading ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                解析中...
              </>
            ) : (
              <>
                <span>✦</span> 上传并解析
              </>
            )}
          </button>
        </div>
      )}

      {/* 预览+编辑区 */}
      {result && (
        <div className="space-y-4">
          <div className="elegant-card p-4 bg-green-50/50 border-green-200">
            <div className="text-sm text-green-700 flex items-center gap-2">
              <span>✓</span>
              已从 <strong>{result.filename}</strong> 提取{" "}
              {result.extractedText.length} 字
            </div>
          </div>

          <div className="elegant-card p-6 space-y-4">
            <h2 className="font-serif text-xl text-ink-900">
              确认并保存
            </h2>

            <label className="block">
              <span className="text-sm font-medium text-ink-700 mb-1 block">
                标题
              </span>
              <input
                ref={titleRef}
                defaultValue={result.suggestedTitle}
                className="input-elegant"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-700 mb-1 block">
                分类（AI 推荐）
              </span>
              <input
                ref={categoryRef}
                defaultValue={result.suggestedCategory}
                className="input-elegant"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-700 mb-1 block">
                标签（AI 推荐）
              </span>
              <input
                ref={tagsRef}
                defaultValue={result.suggestedTags.join(", ")}
                className="input-elegant"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink-700 mb-1 block">
                正文（可编辑）
              </span>
              <textarea
                ref={contentRef}
                rows={12}
                defaultValue={result.extractedText.slice(0, 10000)}
                className="input-elegant font-mono text-xs leading-6"
              />
              {result.extractedText.length > 10000 && (
                <p className="text-xs text-ink-400 mt-1">
                  原文超过 10000 字，已截断。如需完整内容请分多次导入。
                </p>
              )}
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? "保存中..." : "✦ 保存到知识库"}
              </button>
              <button
                onClick={() => setResult(null)}
                className="btn-secondary"
              >
                重新上传
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
