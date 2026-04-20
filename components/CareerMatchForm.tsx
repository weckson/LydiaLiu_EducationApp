"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

type WorkEntry = {
  jobTitle: string;
  company: string;
  country: string;
  durationYears: number;
  description: string;
  isInternship: boolean;
};

export function CareerMatchForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([
    {
      jobTitle: "",
      company: "",
      country: "CN",
      durationYears: 1,
      description: "",
      isInternship: false,
    },
  ]);

  const addWork = () =>
    setWorkEntries((prev) => [
      ...prev,
      {
        jobTitle: "",
        company: "",
        country: "CN",
        durationYears: 1,
        description: "",
        isInternship: false,
      },
    ]);

  const removeWork = (i: number) =>
    setWorkEntries((prev) => prev.filter((_, idx) => idx !== i));

  const updateWork = (i: number, patch: Partial<WorkEntry>) =>
    setWorkEntries((prev) =>
      prev.map((w, idx) => (idx === i ? { ...w, ...patch } : w))
    );

  return (
    <form action={action} className="space-y-6">
      <input
        type="hidden"
        name="workExperience"
        value={JSON.stringify(workEntries)}
      />

      {/* Section 1: 客户基础 */}
      <Section title="客户信息" subtitle="Client Info" icon="👤">
        <Field label="客户姓名（可选）">
          <input
            name="clientName"
            placeholder="如：张同学"
            className="input-elegant"
          />
        </Field>
      </Section>

      {/* Section 2: 学历 */}
      <Section title="学历背景" subtitle="Education" icon="🎓">
        <Grid cols={2}>
          <Field label="最高学历" required>
            <select
              name="highestDegree"
              defaultValue="BACHELOR"
              required
              className="input-elegant cursor-pointer"
            >
              <option value="DIPLOMA">Diploma 大专</option>
              <option value="BACHELOR">Bachelor 本科</option>
              <option value="MASTER">Master 硕士</option>
              <option value="PHD">PhD 博士</option>
            </select>
          </Field>
          <Field label="专业（详细）" required>
            <input
              name="fieldOfStudy"
              required
              placeholder="如：Biology / Computer Science / 化学工程"
              className="input-elegant"
            />
          </Field>
          <Field label="毕业院校国家">
            <select
              name="degreeCountry"
              defaultValue="CN"
              className="input-elegant cursor-pointer"
            >
              <option value="CN">中国大陆</option>
              <option value="AU">澳大利亚</option>
              <option value="HK">香港</option>
              <option value="TW">台湾</option>
              <option value="US">美国</option>
              <option value="UK">英国</option>
              <option value="CA">加拿大</option>
              <option value="OTHER">其他</option>
            </select>
          </Field>
          <Field label="毕业年份">
            <input
              name="graduationYear"
              type="number"
              min={1980}
              max={2035}
              placeholder="如 2020"
              className="input-elegant"
            />
          </Field>
        </Grid>
        <Checkbox
          name="australianStudy"
          label="有澳洲全日制学习经历（≥ 2 年）"
        />
      </Section>

      {/* Section 3: 工作 / 实习经验 */}
      <Section title="工作 / 实习经验" subtitle="Experience" icon="💼">
        <div className="text-xs text-ink-500 -mt-2 mb-4">
          请详细描述你做过的工作和实习。<strong>职责描述越详细，匹配越准</strong>。
          例如："实验室科研助理 - 负责 PCR 实验、细胞培养、数据分析"
        </div>

        <div className="space-y-4">
          {workEntries.map((w, i) => (
            <div
              key={i}
              className="bg-cream-50/60 border border-cream-300 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-ink-700">
                  经历 #{i + 1}
                </h4>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-ink-600 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={w.isInternship}
                      onChange={(e) =>
                        updateWork(i, { isInternship: e.target.checked })
                      }
                    />
                    实习
                  </label>
                  {workEntries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWork(i)}
                      className="text-xs text-brand-600 hover:text-brand-700"
                    >
                      删除
                    </button>
                  )}
                </div>
              </div>
              <Grid cols={2}>
                <Field label="职位">
                  <input
                    value={w.jobTitle}
                    onChange={(e) =>
                      updateWork(i, { jobTitle: e.target.value })
                    }
                    placeholder="如：实验室助理 / Software Engineer"
                    className="input-elegant"
                  />
                </Field>
                <Field label="公司 / 机构">
                  <input
                    value={w.company}
                    onChange={(e) =>
                      updateWork(i, { company: e.target.value })
                    }
                    placeholder="如：复旦大学生物实验室"
                    className="input-elegant"
                  />
                </Field>
                <Field label="国家">
                  <select
                    value={w.country}
                    onChange={(e) =>
                      updateWork(i, { country: e.target.value })
                    }
                    className="input-elegant cursor-pointer"
                  >
                    <option value="CN">中国大陆</option>
                    <option value="AU">澳大利亚</option>
                    <option value="HK">香港</option>
                    <option value="US">美国</option>
                    <option value="UK">英国</option>
                    <option value="OTHER">其他</option>
                  </select>
                </Field>
                <Field label="时长（年）">
                  <input
                    type="number"
                    min={0}
                    max={40}
                    step={0.5}
                    value={w.durationYears}
                    onChange={(e) =>
                      updateWork(i, {
                        durationYears: Number(e.target.value) || 0,
                      })
                    }
                    className="input-elegant"
                  />
                </Field>
              </Grid>
              <div className="mt-3">
                <label className="block">
                  <span className="block text-sm font-medium text-ink-700 mb-1.5">
                    职责描述（详细越好）
                  </span>
                  <textarea
                    rows={3}
                    value={w.description}
                    onChange={(e) =>
                      updateWork(i, { description: e.target.value })
                    }
                    placeholder="如：负责微生物培养、PCR 实验、数据分析，使用 Python 处理生物信息数据..."
                    className="input-elegant text-sm"
                  />
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addWork}
            className="btn-secondary text-sm"
          >
            + 添加经历
          </button>
        </div>
      </Section>

      {/* Section 4: 其他补充 */}
      <Section title="其他信息" subtitle="Additional Info" icon="📋">
        <Field label="证书 / 资格（可选）">
          <input
            name="certifications"
            placeholder="如：PMP / CFA / 护士执照 / NAATI CCL"
            className="input-elegant"
          />
        </Field>
        <Field label="补充说明（可选）">
          <textarea
            name="notes"
            rows={3}
            placeholder="任何你认为对职业匹配有帮助的信息，如发表论文、专利、获奖..."
            className="input-elegant"
          />
        </Field>
      </Section>

      {/* 提交 */}
      <div className="elegant-card p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="text-xs text-ink-500">
          AI 会分析所有可能的 ANZSCO 职业代码（包括各州接受情况），约需 60-120 秒
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

// ════════════════════════════════════════════
// 子组件
// ════════════════════════════════════════════

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="elegant-card p-6 space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-dashed border-gold-300/50">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600">
            {subtitle}
          </div>
          <h2 className="font-serif text-xl text-ink-900">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function Grid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  const cls = cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return <div className={`grid grid-cols-1 ${cls} gap-4`}>{children}</div>;
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
      <span className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" name={name} />
      <span className="text-sm text-ink-700">{label}</span>
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-rose-button hover:bg-gradient-rose-button-hover disabled:opacity-60 disabled:cursor-wait text-white px-8 py-3 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2"
    >
      {pending ? (
        <>
          <span className="inline-block w-3 h-3 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
          匹配中...
        </>
      ) : (
        <>
          <span className="text-sm">✦</span>
          开始职业匹配
        </>
      )}
    </button>
  );
}
