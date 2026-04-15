// 知识条目的新增/编辑共用表单

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
    <form action={action} className="space-y-6 elegant-card p-8">
      <Field label="标题" required>
        <input
          name="title"
          required
          defaultValue={entry?.title ?? ""}
          placeholder="例：500 学生签证 2026 新政要点"
          className="input-elegant"
        />
      </Field>

      <Field label="正文（支持 Markdown）" required>
        <textarea
          name="contentMd"
          required
          rows={16}
          defaultValue={entry?.contentMd ?? ""}
          placeholder={`# 要点\n\n- 第一点...\n- 第二点...\n\n## 详细说明\n\n这里写详细内容，可以用 **加粗**、*斜体*、\`代码\`。`}
          className="input-elegant font-mono text-sm leading-7"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="分类">
          <input
            name="category"
            defaultValue={entry?.category ?? ""}
            placeholder="例：签证政策 / 院校信息"
            className="input-elegant"
          />
        </Field>

        <Field label="标签（逗号或空格分隔）">
          <input
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
