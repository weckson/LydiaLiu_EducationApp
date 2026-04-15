import Link from "next/link";
import { createAssessment } from "@/lib/assessment-actions";
import { AssessmentForm } from "@/components/AssessmentForm";

export default function NewAssessmentPage() {
  return (
    <div className="space-y-6">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/assess" className="hover:text-brand-600 transition">
          移民评估
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">新建评估</span>
      </div>

      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          New Assessment
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          新建移民评估
        </h1>
        <p className="mt-3 text-sm text-ink-500 max-w-2xl">
          填写客户的完整背景信息。系统会自动计算 EOI 分数（本地）、推荐 Top 3
          职业代码（LLM + 知识库）、实时抓取最新政策（web search）、最后生成
          Plan A/B/C 三套方案。
        </p>
      </div>

      {/* 警示提示 */}
      <div className="elegant-card p-4 bg-gold-50/50 border-gold-300/60">
        <div className="flex items-start gap-3 text-sm">
          <span className="text-gold-500 text-lg">✦</span>
          <div className="text-ink-700">
            <strong>提示</strong>：提交后会调用 OpenAI 生成报告，约需
            30-90 秒。生成期间不要关闭页面。单次成本约 ¥0.4。
          </div>
        </div>
      </div>

      {/* 表单 */}
      <AssessmentForm action={createAssessment} />
    </div>
  );
}
