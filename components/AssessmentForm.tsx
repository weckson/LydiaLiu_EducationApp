"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

// 工作经历单元
type WorkEntry = {
  jobTitle: string;
  company: string;
  country: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM or "NOW"
  hoursPerWeek: number;
};

/**
 * 移民评估表单（单页长表单）
 * - 五个分组区域
 * - 工作经验支持动态增删
 * - 工作经验序列化成隐藏字段 workExperience 传到 Server Action
 */
export function AssessmentForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([
    {
      jobTitle: "",
      company: "",
      country: "CN",
      startDate: "",
      endDate: "NOW",
      hoursPerWeek: 40,
    },
  ]);

  const addWork = () =>
    setWorkEntries((prev) => [
      ...prev,
      {
        jobTitle: "",
        company: "",
        country: "CN",
        startDate: "",
        endDate: "NOW",
        hoursPerWeek: 40,
      },
    ]);

  const removeWork = (i: number) =>
    setWorkEntries((prev) => prev.filter((_, idx) => idx !== i));

  const updateWork = (i: number, patch: Partial<WorkEntry>) =>
    setWorkEntries((prev) =>
      prev.map((w, idx) => (idx === i ? { ...w, ...patch } : w))
    );

  return (
    <form action={action} className="space-y-8">
      {/* 隐藏字段：序列化的工作经验 */}
      <input
        type="hidden"
        name="workExperience"
        value={JSON.stringify(workEntries)}
      />

      {/* ═══ Section 1: 个人基础 ═══ */}
      <Section title="客户基础" subtitle="Client Basics" icon="👤">
        <Grid cols={2}>
          <Field label="客户姓名（可选）">
            <input
              name="clientName"
              placeholder="张同学"
              className="input-elegant"
            />
          </Field>
          <Field label="年龄" required>
            <input
              name="age"
              type="number"
              min={16}
              max={80}
              required
              className="input-elegant"
            />
          </Field>
          <Field label="邮箱（可选）">
            <input
              name="clientEmail"
              type="email"
              className="input-elegant"
            />
          </Field>
          <Field label="手机（可选）">
            <input name="clientPhone" className="input-elegant" />
          </Field>
          <Field label="国籍">
            <input
              name="nationality"
              defaultValue="中国"
              className="input-elegant"
            />
          </Field>
          <Field label="婚姻状况" required>
            <select
              name="maritalStatus"
              defaultValue="SINGLE"
              required
              className="input-elegant cursor-pointer"
            >
              <option value="SINGLE">单身</option>
              <option value="MARRIED">已婚</option>
              <option value="DE_FACTO">事实婚姻</option>
            </select>
          </Field>
        </Grid>
        <Checkbox
          name="partnerEligible"
          label="配偶职业评估 + 英语达 Competent（可加 10 分）"
          hint="单身自动 +10 分；已婚配偶无这两项只 +5 分"
        />
      </Section>

      {/* ═══ Section 2: 学历 ═══ */}
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
          <Field label="专业" required>
            <input
              name="fieldOfStudy"
              required
              placeholder="如：Computer Science / Civil Engineering"
              className="input-elegant"
            />
          </Field>
          <Field label="毕业院校国家" required>
            <select
              name="degreeCountry"
              defaultValue="CN"
              required
              className="input-elegant cursor-pointer"
            >
              <option value="CN">中国大陆</option>
              <option value="AU">澳大利亚</option>
              <option value="HK">香港</option>
              <option value="TW">台湾</option>
              <option value="US">美国</option>
              <option value="UK">英国</option>
              <option value="CA">加拿大</option>
              <option value="SG">新加坡</option>
              <option value="NZ">新西兰</option>
              <option value="OTHER">其他</option>
            </select>
          </Field>
          <Field label="毕业年份" required>
            <input
              name="graduationYear"
              type="number"
              min={1980}
              max={2035}
              required
              className="input-elegant"
            />
          </Field>
          <Field label="GPA（可选）">
            <input
              name="gpa"
              type="number"
              step="0.01"
              min={0}
              max={100}
              placeholder="80 或 3.5"
              className="input-elegant"
            />
          </Field>
        </Grid>
        <Checkbox
          name="australianStudy"
          label="有澳洲 2 年以上全日制学习经历（+5 分）"
        />
        <Checkbox
          name="regionalStudy"
          label="在偏远地区校区学习（+5 分，可叠加）"
        />
      </Section>

      {/* ═══ Section 3: 工作经验（动态）═══ */}
      <Section title="工作经验" subtitle="Work Experience" icon="💼">
        <div className="space-y-4">
          {workEntries.map((w, i) => (
            <div
              key={i}
              className="bg-cream-50/60 border border-cream-300 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-ink-700">
                  工作经历 #{i + 1}
                </h4>
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
              <Grid cols={2}>
                <Field label="职位">
                  <input
                    value={w.jobTitle}
                    onChange={(e) =>
                      updateWork(i, { jobTitle: e.target.value })
                    }
                    placeholder="Software Engineer"
                    className="input-elegant"
                  />
                </Field>
                <Field label="公司">
                  <input
                    value={w.company}
                    onChange={(e) =>
                      updateWork(i, { company: e.target.value })
                    }
                    placeholder="ABC Tech Co."
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
                <Field label="每周工作小时">
                  <input
                    type="number"
                    min={0}
                    max={80}
                    value={w.hoursPerWeek}
                    onChange={(e) =>
                      updateWork(i, {
                        hoursPerWeek: Number(e.target.value) || 0,
                      })
                    }
                    className="input-elegant"
                  />
                </Field>
                <Field label="开始日期 YYYY-MM">
                  <input
                    type="month"
                    value={w.startDate}
                    onChange={(e) =>
                      updateWork(i, { startDate: e.target.value })
                    }
                    className="input-elegant"
                  />
                </Field>
                <Field label="结束日期">
                  <div className="flex gap-2">
                    <input
                      type="month"
                      value={w.endDate === "NOW" ? "" : w.endDate}
                      onChange={(e) =>
                        updateWork(i, { endDate: e.target.value })
                      }
                      disabled={w.endDate === "NOW"}
                      className="input-elegant flex-1 disabled:opacity-50"
                    />
                    <label className="flex items-center gap-1 text-xs text-ink-600">
                      <input
                        type="checkbox"
                        checked={w.endDate === "NOW"}
                        onChange={(e) =>
                          updateWork(i, {
                            endDate: e.target.checked ? "NOW" : "",
                          })
                        }
                      />
                      至今
                    </label>
                  </div>
                </Field>
              </Grid>
            </div>
          ))}

          <button
            type="button"
            onClick={addWork}
            className="btn-secondary text-sm"
          >
            + 添加工作经历
          </button>
        </div>
      </Section>

      {/* ═══ Section 4: 英语 ═══ */}
      <Section title="英语考试" subtitle="English Test" icon="📖">
        <Grid cols={2}>
          <Field label="考试类型">
            <select
              name="englishTest"
              defaultValue="IELTS"
              className="input-elegant cursor-pointer"
            >
              <option value="IELTS">IELTS 雅思</option>
              <option value="PTE">PTE</option>
              <option value="TOEFL">TOEFL iBT</option>
              <option value="OET">OET（医护）</option>
            </select>
          </Field>
          <Field label="考试日期">
            <input
              name="englishTestDate"
              type="date"
              className="input-elegant"
            />
          </Field>
          <Field label="总分 Overall">
            <input
              name="englishOverall"
              type="number"
              step="0.5"
              min={0}
              placeholder="如雅思 7.0 / PTE 65"
              className="input-elegant"
            />
          </Field>
          <Field label="听力 Listening">
            <input
              name="englishListening"
              type="number"
              step="0.5"
              min={0}
              className="input-elegant"
            />
          </Field>
          <Field label="阅读 Reading">
            <input
              name="englishReading"
              type="number"
              step="0.5"
              min={0}
              className="input-elegant"
            />
          </Field>
          <Field label="写作 Writing">
            <input
              name="englishWriting"
              type="number"
              step="0.5"
              min={0}
              className="input-elegant"
            />
          </Field>
          <Field label="口语 Speaking">
            <input
              name="englishSpeaking"
              type="number"
              step="0.5"
              min={0}
              className="input-elegant"
            />
          </Field>
        </Grid>
        <Checkbox name="hasNAATI" label="持有 NAATI CCL 证书（+5 分）" />
        <Checkbox
          name="hasProfessionalYear"
          label="完成 Professional Year（IT/会计/工程，+5 分）"
        />
      </Section>

      {/* ═══ Section 5: 偏好 ═══ */}
      <Section title="移民偏好" subtitle="Preferences" icon="🎯">
        <Grid cols={2}>
          <Field label="目标州">
            <select
              name="targetState"
              defaultValue="ANY"
              className="input-elegant cursor-pointer"
            >
              <option value="ANY">任意（让 AI 推荐）</option>
              <option value="NSW">NSW 新南威尔士</option>
              <option value="VIC">VIC 维多利亚</option>
              <option value="QLD">QLD 昆士兰</option>
              <option value="SA">SA 南澳</option>
              <option value="WA">WA 西澳</option>
              <option value="TAS">TAS 塔斯马尼亚</option>
              <option value="NT">NT 北领地</option>
              <option value="ACT">ACT 首都领地</option>
            </select>
          </Field>
          <Field label="预算档位">
            <select
              name="budgetTier"
              defaultValue="MEDIUM"
              className="input-elegant cursor-pointer"
            >
              <option value="LOW">紧张（省钱为主）</option>
              <option value="MEDIUM">一般</option>
              <option value="HIGH">充足（优先效率）</option>
            </select>
          </Field>
          <Field label="紧迫程度">
            <select
              name="urgency"
              defaultValue="NORMAL"
              className="input-elegant cursor-pointer"
            >
              <option value="LOW">不急，5 年以上都行</option>
              <option value="NORMAL">希望 2-3 年内拿到</option>
              <option value="HIGH">紧急，1 年内</option>
            </select>
          </Field>
        </Grid>
        <Checkbox
          name="willingRegional"
          label="接受偏远地区（Adelaide / Hobart / Perth / Canberra 等）"
          defaultChecked
        />
      </Section>

      {/* 提交 */}
      <div className="elegant-card p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="text-xs text-ink-500">
          提交后系统会调用 AI 生成评估报告，约需 30-90 秒。
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

function Grid({
  cols,
  children,
}: {
  cols: 2 | 3;
  children: React.ReactNode;
}) {
  const cls = cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${cls} gap-4`}>{children}</div>
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
      <span className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function Checkbox({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1"
      />
      <div>
        <div className="text-sm text-ink-700">{label}</div>
        {hint && <div className="text-xs text-ink-400 mt-0.5">{hint}</div>}
      </div>
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
          生成评估中...
        </>
      ) : (
        <>
          <span className="text-sm">✦</span>
          生成评估报告
        </>
      )}
    </button>
  );
}
