"use client";

import { useFormStatus } from "react-dom";
import { useRef, useEffect } from "react";

/**
 * 聊天输入框 + 提交按钮
 * 使用 useFormStatus 显示 pending 状态（加载动画）
 * Enter 发送，Shift+Enter 换行
 */
export function ChatInput() {
  return (
    <div className="elegant-card p-3 shadow-soft-xl backdrop-blur-xl bg-white/90">
      <div className="flex items-end gap-2">
        <ChatTextarea />
        <ChatSubmitButton />
      </div>
      <PendingHint />
    </div>
  );
}

function ChatTextarea() {
  const { pending } = useFormStatus();
  const ref = useRef<HTMLTextAreaElement>(null);

  // 发送完成后清空输入框并聚焦
  useEffect(() => {
    if (!pending && ref.current) {
      ref.current.value = "";
      ref.current.focus();
    }
  }, [pending]);

  return (
    <textarea
      ref={ref}
      name="content"
      required
      rows={2}
      disabled={pending}
      placeholder={pending ? "AI 正在思考..." : "输入问题，Enter 发送，Shift+Enter 换行..."}
      className="flex-1 resize-none outline-none p-2 text-sm leading-6 bg-transparent placeholder:text-ink-400 disabled:opacity-50"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          // 触发表单提交
          const form = e.currentTarget.closest("form");
          form?.requestSubmit();
        }
      }}
    />
  );
}

function ChatSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-rose-button hover:bg-gradient-rose-button-hover disabled:opacity-70 disabled:cursor-wait text-white px-5 py-2.5 rounded-full font-medium shadow-soft transition-all duration-300 flex-shrink-0 flex items-center gap-1.5 min-w-[90px] justify-center"
    >
      {pending ? (
        <>
          <span className="inline-block w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
          思考中
        </>
      ) : (
        <>
          发送 <span className="text-xs">✦</span>
        </>
      )}
    </button>
  );
}

function PendingHint() {
  const { pending } = useFormStatus();

  return (
    <p className="text-[11px] text-ink-400 mt-1 px-2 flex items-center gap-1">
      {pending ? (
        <>
          <span className="inline-block w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
          <span className="text-brand-600">正在检索知识库并生成回答...</span>
        </>
      ) : (
        <>
          AI 可能会犯错。涉及签证政策、费用的关键信息请以 Home Affairs 官网为准。
        </>
      )}
    </p>
  );
}
