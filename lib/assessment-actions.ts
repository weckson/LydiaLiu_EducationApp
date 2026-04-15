"use server";

// 移民方案智能评估器 - Server Actions
//
// 负责表单提交、触发 runAssessment、保存结果、删除

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { runAssessment } from "./assessment/path-recommender";
import type {
  AssessmentInput,
  WorkExperience,
  HighestDegree,
  MaritalStatus,
  EnglishTestType,
  TargetState,
  BudgetTier,
  Urgency,
} from "./assessment/types";

// ════════════════════════════════════════════
// 创建评估（表单入口）
// ════════════════════════════════════════════

export async function createAssessment(formData: FormData) {
  // 1. 解析 + 校验表单输入
  const input = parseFormDataToInput(formData);

  // 2. 写入数据库（DRAFT 状态）
  const record = await prisma.assessment.create({
    data: {
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      clientPhone: input.clientPhone,
      age: input.age,
      nationality: input.nationality,
      maritalStatus: input.maritalStatus,
      partnerEligible: input.partnerEligible,
      highestDegree: input.highestDegree,
      fieldOfStudy: input.fieldOfStudy,
      degreeCountry: input.degreeCountry,
      graduationYear: input.graduationYear,
      gpa: input.gpa,
      australianStudy: input.australianStudy,
      regionalStudy: input.regionalStudy,
      workExperience: JSON.stringify(input.workExperience),
      englishTest: input.englishTest,
      englishOverall: input.englishOverall,
      englishListening: input.englishListening,
      englishReading: input.englishReading,
      englishWriting: input.englishWriting,
      englishSpeaking: input.englishSpeaking,
      englishTestDate: input.englishTestDate ? new Date(input.englishTestDate) : null,
      hasNAATI: input.hasNAATI,
      hasProfessionalYear: input.hasProfessionalYear,
      targetState: input.targetState,
      willingRegional: input.willingRegional,
      budgetTier: input.budgetTier,
      urgency: input.urgency,
      status: "PROCESSING",
    },
  });

  // 3. 触发评估管线（同步）
  try {
    const { report, tokensUsed } = await runAssessment(record.id, input);

    // 4. 写入计算结果
    await prisma.assessment.update({
      where: { id: record.id },
      data: {
        status: "DONE",
        calculatedPoints189: report.pointsBreakdown.total189,
        calculatedPoints190: report.pointsBreakdown.total190,
        calculatedPoints491: report.pointsBreakdown.total491,
        pointsBreakdown: JSON.stringify(report.pointsBreakdown),
        recommendedOccupations: JSON.stringify(report.recommendedOccupations),
        pathA: JSON.stringify(report.pathA),
        pathB: JSON.stringify(report.pathB),
        pathC: JSON.stringify(report.pathC),
        stateComparison: JSON.stringify(report.stateComparison),
        recentPolicyUpdates: JSON.stringify(report.recentPolicyUpdates),
        citedKnowledgeIds: JSON.stringify(report.citedKnowledgeIds),
        tokensUsed,
        dataFreshness: new Date(report.dataFreshness),
      },
    });
  } catch (err: any) {
    console.error("[createAssessment] 评估失败:", err);
    await prisma.assessment.update({
      where: { id: record.id },
      data: {
        status: "FAILED",
        errorMessage: err?.message ?? String(err),
      },
    });
  }

  revalidatePath("/assess");
  revalidatePath(`/assess/${record.id}`);
  redirect(`/assess/${record.id}`);
}

// ════════════════════════════════════════════
// 删除评估
// ════════════════════════════════════════════

export async function deleteAssessment(id: string) {
  await prisma.assessment.delete({ where: { id } });
  revalidatePath("/assess");
  redirect("/assess");
}

// ════════════════════════════════════════════
// 更新备注（Phase 2 预留，暂不暴露到 UI）
// ════════════════════════════════════════════

export async function updateNotes(id: string, notes: string) {
  await prisma.assessment.update({
    where: { id },
    data: { consultantNotes: notes },
  });
  revalidatePath(`/assess/${id}`);
}

// ════════════════════════════════════════════
// 表单解析辅助
// ════════════════════════════════════════════

function getStr(fd: FormData, name: string, def = ""): string {
  const v = fd.get(name);
  return typeof v === "string" ? v.trim() : def;
}

function getNumber(fd: FormData, name: string, def = 0): number {
  const v = fd.get(name);
  if (typeof v !== "string") return def;
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function getBoolean(fd: FormData, name: string): boolean {
  const v = fd.get(name);
  return v === "on" || v === "true" || v === "1";
}

function parseFormDataToInput(fd: FormData): AssessmentInput {
  // 工作经验字段：前端把多段工作序列化成 JSON 字符串
  const workRaw = getStr(fd, "workExperience", "[]");
  let workExperience: WorkExperience[] = [];
  try {
    const parsed = JSON.parse(workRaw);
    if (Array.isArray(parsed)) workExperience = parsed;
  } catch {
    workExperience = [];
  }

  return {
    clientName: getStr(fd, "clientName") || undefined,
    clientEmail: getStr(fd, "clientEmail") || undefined,
    clientPhone: getStr(fd, "clientPhone") || undefined,
    age: getNumber(fd, "age"),
    nationality: getStr(fd, "nationality") || undefined,
    maritalStatus: (getStr(fd, "maritalStatus") || "SINGLE") as MaritalStatus,
    partnerEligible: getBoolean(fd, "partnerEligible"),

    highestDegree: (getStr(fd, "highestDegree") || "BACHELOR") as HighestDegree,
    fieldOfStudy: getStr(fd, "fieldOfStudy"),
    degreeCountry: getStr(fd, "degreeCountry") || "CN",
    graduationYear: getNumber(fd, "graduationYear", new Date().getFullYear()),
    gpa: getStr(fd, "gpa") ? getNumber(fd, "gpa") : undefined,
    australianStudy: getBoolean(fd, "australianStudy"),
    regionalStudy: getBoolean(fd, "regionalStudy"),

    workExperience,

    englishTest: (getStr(fd, "englishTest") || "IELTS") as EnglishTestType,
    englishOverall: getStr(fd, "englishOverall")
      ? getNumber(fd, "englishOverall")
      : undefined,
    englishListening: getStr(fd, "englishListening")
      ? getNumber(fd, "englishListening")
      : undefined,
    englishReading: getStr(fd, "englishReading")
      ? getNumber(fd, "englishReading")
      : undefined,
    englishWriting: getStr(fd, "englishWriting")
      ? getNumber(fd, "englishWriting")
      : undefined,
    englishSpeaking: getStr(fd, "englishSpeaking")
      ? getNumber(fd, "englishSpeaking")
      : undefined,
    englishTestDate: getStr(fd, "englishTestDate") || undefined,

    hasNAATI: getBoolean(fd, "hasNAATI"),
    hasProfessionalYear: getBoolean(fd, "hasProfessionalYear"),

    targetState: (getStr(fd, "targetState") || "ANY") as TargetState,
    willingRegional: getBoolean(fd, "willingRegional"),
    budgetTier: (getStr(fd, "budgetTier") || "MEDIUM") as BudgetTier,
    urgency: (getStr(fd, "urgency") || "NORMAL") as Urgency,
  };
}
