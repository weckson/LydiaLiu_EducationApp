"use client";

import { useState } from "react";

/**
 * 评分参考弹窗
 * 用法：<ScoreReferenceButton /> 放在任意位置，点击弹出
 */
export function ScoreReferenceButton({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "btn-secondary text-sm"
        }
      >
        📋 评分参考表
      </button>
      {open && <ScoreReferenceModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ScoreReferenceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-soft-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 text-ink-600 hover:bg-cream-200 flex items-center justify-center transition"
        >
          ×
        </button>

        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Points Reference
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mb-6">
          EOI 评分参考表
        </h2>

        <RefSection title="年龄 Age">
          <RefRow label="18-24 岁" value="25" />
          <RefRow label="25-32 岁" value="30" highlight />
          <RefRow label="33-39 岁" value="25" />
          <RefRow label="40-44 岁" value="15" />
          <RefRow label="45 岁以上" value="0" warn />
        </RefSection>

        <RefSection title="英语 English">
          <RefRow label="Superior（IELTS 8 / PTE 79+）" value="20" highlight />
          <RefRow label="Proficient（IELTS 7 / PTE 65+）" value="10" />
          <RefRow label="Competent（IELTS 6 / PTE 50+）" value="0" note="基本门槛" />
          <RefRow label="低于 Competent" value="不合格" warn />
        </RefSection>

        <RefSection title="境外工作经验 Overseas Work">
          <RefRow label="不足 3 年" value="0" />
          <RefRow label="3-4 年" value="5" />
          <RefRow label="5-7 年" value="10" />
          <RefRow label="8 年及以上" value="15" highlight />
        </RefSection>

        <RefSection title="境内工作经验 Australian Work（须与提名职业相关）">
          <RefRow label="不足 1 年" value="0" />
          <RefRow label="1-2 年" value="5" />
          <RefRow label="3-4 年" value="10" />
          <RefRow label="5-7 年" value="15" />
          <RefRow label="8 年及以上" value="20" highlight />
        </RefSection>

        <RefSection title="学历 Education">
          <RefRow label="博士 PhD" value="20" highlight />
          <RefRow label="本科 / 硕士 Bachelor / Master" value="15" />
          <RefRow label="大专 Diploma" value="10" />
        </RefSection>

        <RefSection title="配偶 Partner">
          <RefRow label="单身 / 无配偶" value="10" highlight />
          <RefRow label="配偶是澳洲公民或 PR" value="10" highlight />
          <RefRow label="配偶有职业评估 + Competent 英语" value="10" highlight />
          <RefRow label="配偶只有 Competent 英语" value="5" />
          <RefRow label="配偶无英语无职业评估" value="0" warn note="比单身少 10 分" />
        </RefSection>

        <RefSection title="其他 Other Bonuses">
          <RefRow label="澳洲 2+ 年学习" value="5" />
          <RefRow label="偏远地区学习" value="5" />
          <RefRow label="NAATI CCL" value="5" />
          <RefRow label="Professional Year" value="5" />
        </RefSection>

        <RefSection title="州担保 State Nomination" noBorder>
          <RefRow label="190 州担保" value="+5" />
          <RefRow label="491 偏远地区担保" value="+15" highlight />
        </RefSection>

        <div className="mt-6 bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-ink-700">
          <strong>最低获邀线参考（2025）：</strong>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="font-serif text-brand-700 text-lg">65</div>
              <div className="text-ink-500">491 最低线</div>
            </div>
            <div>
              <div className="font-serif text-brand-700 text-lg">85+</div>
              <div className="text-ink-500">189 实际获邀</div>
            </div>
            <div>
              <div className="font-serif text-brand-700 text-lg">70-85</div>
              <div className="text-ink-500">190 各州参考</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button onClick={onClose} className="btn-primary">
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}

function RefSection({
  title,
  children,
  noBorder,
}: {
  title: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div className={`py-4 ${noBorder ? "" : "border-b border-cream-200"}`}>
      <h3 className="text-sm font-semibold text-ink-900 mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function RefRow({
  label,
  value,
  highlight,
  warn,
  note,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  warn?: boolean;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-cream-50/60">
      <span className="text-sm text-ink-700">
        {label}
        {note && (
          <span className="text-xs text-ink-400 ml-1">({note})</span>
        )}
      </span>
      <span
        className={`font-serif text-base min-w-[3rem] text-right ${
          warn
            ? "text-brand-600"
            : highlight
              ? "text-gold-600 font-semibold"
              : "text-ink-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
