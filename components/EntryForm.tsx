// 知识条目的新增/编辑共用表单
// 用 Server Action 作为 action prop，既能创建也能更新

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

  return (
    <form action={action} className="space-y-5">
      <Field label="标题" required>
        <input
          name="title"
          required
          defaultValue={entry?.title ?? ""}
          placeholder="例：500 学生签证 2026 新政要点"
          className="input"
        />
      </Field>

      <Field label="正文（支持 Markdown）" required>
        <textarea
          name="contentMd"
          required
          rows={16}
          defaultValue={entry?.contentMd ?? ""}
          placeholder={`# 要点

- 第一点...
- 第二点...

## 详细说明

这里写详细内容，可以用 **加粗**、*斜体*、\`代码\`。`}
          className="input font-mono text-sm leading-6"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="分类">
          <input
            name="category"
            defaultValue={entry?.category ?? ""}
            placeholder="例：签证政策 / 院校信息 / 案例经验"
            className="input"
          />
        </Field>

        <Field label="标签（逗号或空格分隔）">
          <input
            name="tags"
            defaultValue={tagsString}
            placeholder="500签证, 墨尔本大学, 2026"
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="可见性">
          <select
            name="visibility"
            defaultValue={entry?.visibility ?? "PRIVATE"}
            className="input"
          >
            <option value="PRIVATE">仅自己（PRIVATE）</option>
            <option value="STUDENT_VISIBLE">学生可见（STUDENT_VISIBLE）</option>
          </select>
        </Field>

        <Field label="来源链接（可选）">
          <input
            name="sourceUrl"
            type="url"
            defaultValue={entry?.sourceUrl ?? ""}
            placeholder="https://immi.homeaffairs.gov.au/..."
            className="input"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-brand-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-brand-700 transition"
        >
          {submitLabel}
        </button>
        <Link
          href={entry?.id ? `/knowledge/${entry.id}` : "/knowledge"}
          className="px-5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
        >
          取消
        </Link>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid rgb(203 213 225);
          border-radius: 0.5rem;
          background: white;
          outline: none;
          transition: border-color 0.15s;
        }
        .input:focus {
          border-color: rgb(59 130 246);
          box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
      `}</style>
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
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
