"use client";

import { useState, useTransition } from "react";

type ChecklistItem = {
  category: string;
  name: string;
  nameEn?: string;
  required: boolean;
  checked: boolean;
  note?: string;
};

export function ChecklistView({
  checklistId,
  initialItems,
  updateAction,
}: {
  checklistId: string;
  initialItems: ChecklistItem[];
  updateAction: (
    checklistId: string,
    itemIndex: number,
    checked: boolean
  ) => Promise<void>;
}) {
  const [items, setItems] = useState(initialItems);
  const [isPending, startTransition] = useTransition();

  const toggle = (index: number) => {
    const newChecked = !items[index].checked;
    // Optimistic update
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: newChecked } : item
      )
    );
    // Sync to server
    startTransition(() => {
      updateAction(checklistId, index, newChecked);
    });
  };

  // Group by category
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const total = items.length;
  const checked = items.filter((i) => i.checked).length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 进度条 */}
      <div className="elegant-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-ink-700">
            准备进度：<strong className="font-serif text-brand-600">{checked}</strong> / {total}
          </span>
          <span className="font-serif text-2xl text-brand-600">{percent}%</span>
        </div>
        <div className="bg-cream-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-rose-button h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        {percent === 100 && (
          <div className="mt-2 text-center text-sm text-green-700">
            🎉 所有材料准备完毕！
          </div>
        )}
      </div>

      {/* 按分类显示 */}
      {categories.map((cat) => {
        const catItems = items
          .map((item, index) => ({ ...item, index }))
          .filter((i) => i.category === cat);
        const catChecked = catItems.filter((i) => i.checked).length;

        return (
          <section key={cat} className="elegant-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-ink-900">{cat}</h3>
              <span className="text-xs text-ink-400">
                {catChecked}/{catItems.length}
              </span>
            </div>
            <ul className="space-y-2">
              {catItems.map((item) => (
                <li
                  key={item.index}
                  className="flex items-start gap-3 group cursor-pointer"
                  onClick={() => toggle(item.index)}
                >
                  <button
                    type="button"
                    className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      item.checked
                        ? "bg-gradient-rose-button border-transparent shadow-soft"
                        : "border-brand-300 hover:border-brand-500 hover:bg-brand-50"
                    }`}
                  >
                    {item.checked && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm ${
                        item.checked
                          ? "text-ink-400 line-through"
                          : "text-ink-800"
                      }`}
                    >
                      {item.name}
                      {item.required && !item.checked && (
                        <span className="text-brand-500 ml-1 text-xs">
                          *必需
                        </span>
                      )}
                      {!item.required && (
                        <span className="text-ink-400 ml-1 text-xs">
                          (可选)
                        </span>
                      )}
                    </div>
                    {item.nameEn && (
                      <div className="text-xs text-ink-400 italic">
                        {item.nameEn}
                      </div>
                    )}
                    {item.note && (
                      <div className="text-xs text-ink-500 mt-0.5">
                        💡 {item.note}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
