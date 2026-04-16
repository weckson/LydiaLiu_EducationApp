"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

/**
 * 移民评估表单（单页长表单）
 * - 五个分组区域
 * - 工作经验用年限下拉（简化版）
 * - 评分参考弹窗
 */
export function AssessmentForm({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [showScoreRef, setShowScoreRef] = useState(false);

  return (
    <>
      <form action={action} className="space-y-8">
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
          <Field label="配偶技能水平（影响 EOI 加分）">
            <select
              name="partnerSkillLevel"
              defaultValue="NONE"
              className="input-elegant cursor-pointer"
            >
              <option value="NONE">
                配偶无 Competent 英语也无职业评估（+0 分）
              </option>
              <option value="ENGLISH_ONLY">
                配偶只有 Competent 英语（无职业评估）（+5 分）
              </option>
              <option value="SKILLED_ENGLISH">
                配偶有职业评估 + Competent 英语（+10 分）
              </option>
              <option value="AU_CITIZEN_PR">
                配偶是澳洲公民或 PR（+10 分）
              </option>
            </select>
            <div className="text-xs text-ink-400 mt-1">
              单身自动 +10 分；如果选了单身，此项不影响计算
            </div>
          </Field>
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
                <option value="DIPLOMA">Diploma 大专（+10 分）</option>
                <option value="BACHELOR">Bachelor 本科（+15 分）</option>
                <option value="MASTER">Master 硕士（+15 分）</option>
                <option value="PHD">PhD 博士（+20 分）</option>
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

        {/* ═══ Section 3: 工作经验（简化下拉版）═══ */}
        <Section title="工作经验" subtitle="Work Experience" icon="💼">
          <div className="text-xs text-ink-500 -mt-2 mb-4">
            境内工作经验必须是与提名职业（ANZSCO）相关的 skilled employment。兼职按 50% 折算。
          </div>
          <Grid cols={2}>
            <Field label="最近的职位名称">
              <input
                name="jobTitle"
                placeholder="如 Software Engineer"
                className="input-elegant"
              />
            </Field>
            <Field label="最近的公司">
              <input
                name="company"
                placeholder="如 ABC Tech Co."
                className="input-elegant"
              />
            </Field>
            <Field label="境内工作经验（须与提名职业相关）" required>
              <select
                name="auWorkYears"
                defaultValue="0"
                required
                className="input-elegant cursor-pointer"
              >
                <option value="0">无（+0 分）</option>
                <option value="1">1-2 年（+5 分）</option>
                <option value="3">3-4 年（+10 分）</option>
                <option value="5">5-7 年（+15 分）</option>
                <option value="8">8 年及以上（+20 分）</option>
              </select>
            </Field>
            <Field label="境外工作经验" required>
              <select
                name="overseasWorkYears"
                defaultValue="0"
                required
                className="input-elegant cursor-pointer"
              >
                <option value="0">无或不足 3 年（+0 分）</option>
                <option value="3">3-4 年（+5 分）</option>
                <option value="5">5-7 年（+10 分）</option>
                <option value="8">8 年及以上（+15 分）</option>
              </select>
            </Field>
          </Grid>
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

        {/* 提交 + 评分参考按钮 */}
        <div className="elegant-card p-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowScoreRef(true)}
              className="btn-secondary text-sm"
            >
              📋 评分参考表
            </button>
            <span className="text-xs text-ink-500">
              提交后约 30-90 秒生成报告
            </span>
          </div>
          <SubmitButton />
        </div>
      </form>

      {/* ═══ 评分参考弹窗 ═══ */}
      {showScoreRef && (
        <ScoreReferenceModal onClose={() => setShowScoreRef(false)} />
      )}
    </>
  );
}

// ════════════════════════════════════════════
// 评分参考弹窗
// ════════════════════════════════════════════
function ScoreReferenceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" />

      {/* 弹窗 */}
      <div
        className="relative bg-white rounded-3xl shadow-soft-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
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

        {/* 年龄 */}
        <RefSection title="年龄 Age">
          <RefRow label="18-24 岁" value="25" />
          <RefRow label="25-32 岁" value="30" highlight />
          <RefRow label="33-39 岁" value="25" />
          <RefRow label="40-44 岁" value="15" />
          <RefRow label="45 岁以上" value="0" warn />
        </RefSection>

        {/* 英语 */}
        <RefSection title="英语 English">
          <RefRow label="Superior（IELTS 8 / PTE 79+）" value="20" highlight />
          <RefRow label="Proficient（IELTS 7 / PTE 65+）" value="10" />
          <RefRow label="Competent（IELTS 6 / PTE 50+）" value="0" note="基本门槛" />
          <RefRow label="低于 Competent" value="不合格" warn />
        </RefSection>

        {/* 境外工作 */}
        <RefSection title="境外工作经验 Overseas Work">
          <RefRow label="不足 3 年" value="0" />
          <RefRow label="3-4 年" value="5" />
          <RefRow label="5-7 年" value="10" />
          <RefRow label="8 年及以上" value="15" highlight />
        </RefSection>

        {/* 境内工作 */}
        <RefSection title="境内工作经验 Australian Work（须与提名职业相关）">
          <RefRow label="不足 1 年" value="0" />
          <RefRow label="1-2 年" value="5" />
          <RefRow label="3-4 年" value="10" />
          <RefRow label="5-7 年" value="15" />
          <RefRow label="8 年及以上" value="20" highlight />
        </RefSection>

        {/* 学历 */}
        <RefSection title="学历 Education">
          <RefRow label="博士 PhD" value="20" highlight />
          <RefRow label="本科 / 硕士 Bachelor / Master" value="15" />
          <RefRow label="大专 Diploma" value="10" />
        </RefSection>

        {/* 配偶 */}
        <RefSection title="配偶 Partner">
          <RefRow label="单身 / 无配偶" value="10" highlight />
          <RefRow label="配偶是澳洲公民或 PR" value="10" highlight />
          <RefRow label="配偶有职业评估 + Competent 英语" value="10" highlight />
          <RefRow label="配偶只有 Competent 英语" value="5" />
          <RefRow label="配偶无英语无职业评估" value="0" warn />
        </RefSection>

        {/* 其他 */}
        <RefSection title="其他 Other Bonuses">
          <RefRow label="澳洲 2+ 年学习" value="5" />
          <RefRow label="偏远地区学习" value="5" />
          <RefRow label="NAATI CCL" value="5" />
          <RefRow label="Professional Year" value="5" />
        </RefSection>

        {/* 州担保 */}
        <RefSection title="州担保 State Nomination" noBorder>
          <RefRow label="190 州担保" value="+5" />
          <RefRow label="491 偏远地区担保" value="+15" highlight />
        </RefSection>

        {/* 底部最低线提示 */}
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
    <div
      className={`py-4 ${noBorder ? "" : "border-b border-cream-200"}`}
    >
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

// ════════════════════════════════════════════
// 通用子组件
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
