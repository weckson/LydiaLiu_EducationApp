"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { runCareerMatch } from "./career-match/matcher";
import type { CareerMatchInput, WorkExperienceEntry } from "./career-match/types";

/**
 * 创建并执行职业匹配评估
 */
export async function createCareerMatch(formData: FormData) {
  // 1. 解析表单
  const input = parseInput(formData);

  // 2. 写入数据库（PROCESSING 状态）
  const record = await prisma.careerMatch.create({
    data: {
      clientName: input.clientName,
      highestDegree: input.highestDegree,
      fieldOfStudy: input.fieldOfStudy,
      degreeCountry: input.degreeCountry,
      graduationYear: input.graduationYear,
      workExperience: JSON.stringify(input.workExperience),
      certifications: input.certifications,
      australianStudy: input.australianStudy,
      notes: input.notes,
      status: "PROCESSING",
    },
  });

  // 3. 跑匹配
  try {
    const result = await runCareerMatch(input);

    // 4. 写入结果
    await prisma.careerMatch.update({
      where: { id: record.id },
      data: {
        status: result.matched ? "DONE" : "UNMATCHED",
        matchedOccupations: JSON.stringify(result.occupations),
        unmatchedReason: result.unmatchedReason ?? null,
        summary: result.summary,
        tokensUsed: result.tokensUsed,
      },
    });
  } catch (err: any) {
    console.error("[career-match] 失败:", err);
    await prisma.careerMatch.update({
      where: { id: record.id },
      data: {
        status: "FAILED",
        errorMessage: err?.message ?? String(err),
      },
    });
  }

  revalidatePath("/career-match");
  revalidatePath(`/career-match/${record.id}`);
  redirect(`/career-match/${record.id}`);
}

/**
 * 删除评估
 */
export async function deleteCareerMatch(id: string) {
  await prisma.careerMatch.delete({ where: { id } });
  revalidatePath("/career-match");
  redirect("/career-match");
}

// ════════════════════════════════════════════
// 表单解析
// ════════════════════════════════════════════

function getStr(fd: FormData, name: string, def = ""): string {
  const v = fd.get(name);
  return typeof v === "string" ? v.trim() : def;
}

function getNumber(fd: FormData, name: string, def = 0): number {
  const v = fd.get(name);
  if (typeof v !== "string" || !v) return def;
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

function getBoolean(fd: FormData, name: string): boolean {
  const v = fd.get(name);
  return v === "on" || v === "true" || v === "1";
}

function parseInput(fd: FormData): CareerMatchInput {
  // 工作经验：客户端组件序列化为 JSON 字符串
  const workRaw = getStr(fd, "workExperience", "[]");
  let workExperience: WorkExperienceEntry[] = [];
  try {
    const parsed = JSON.parse(workRaw);
    if (Array.isArray(parsed)) workExperience = parsed;
  } catch {}

  return {
    clientName: getStr(fd, "clientName") || undefined,
    highestDegree: (getStr(fd, "highestDegree") || "BACHELOR") as any,
    fieldOfStudy: getStr(fd, "fieldOfStudy"),
    degreeCountry: getStr(fd, "degreeCountry") || undefined,
    graduationYear: getStr(fd, "graduationYear")
      ? getNumber(fd, "graduationYear")
      : undefined,
    workExperience,
    certifications: getStr(fd, "certifications") || undefined,
    australianStudy: getBoolean(fd, "australianStudy"),
    notes: getStr(fd, "notes") || undefined,
  };
}
