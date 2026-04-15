"use server";

// Server Actions —— 顾问端知识库的增删改查
// Phase 2：保存条目后异步生成 embedding，不阻断保存流程

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { tryEmbedEntry } from "./ai/embeddings";

function parseTags(raw: string): string[] {
  // 支持 "标签1, 标签2, 标签3" 或 "#标签1 #标签2"
  return raw
    .split(/[,,\s]+/)
    .map((t) => t.replace(/^#/, "").trim())
    .filter((t) => t.length > 0);
}

async function upsertTags(names: string[]) {
  return Promise.all(
    names.map((name) =>
      prisma.tag.upsert({
        where: { name },
        create: { name },
        update: {},
      })
    )
  );
}

export async function createEntry(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const contentMd = String(formData.get("contentMd") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const visibility =
    String(formData.get("visibility") ?? "PRIVATE") === "STUDENT_VISIBLE"
      ? "STUDENT_VISIBLE"
      : "PRIVATE";
  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim() || null;
  const tagNames = parseTags(String(formData.get("tags") ?? ""));

  if (!title || !contentMd) {
    throw new Error("标题和内容不能为空");
  }

  const tags = await upsertTags(tagNames);

  const entry = await prisma.knowledgeEntry.create({
    data: {
      title,
      contentMd,
      category,
      visibility,
      sourceUrl,
      tags: { connect: tags.map((t) => ({ id: t.id })) },
    },
  });

  // 生成 embedding（失败不阻断，用户仍能保存成功）
  await tryEmbedEntry(entry.id);

  revalidatePath("/knowledge");
  revalidatePath("/");
  redirect(`/knowledge/${entry.id}`);
}

export async function updateEntry(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const contentMd = String(formData.get("contentMd") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || null;
  const visibility =
    String(formData.get("visibility") ?? "PRIVATE") === "STUDENT_VISIBLE"
      ? "STUDENT_VISIBLE"
      : "PRIVATE";
  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim() || null;
  const tagNames = parseTags(String(formData.get("tags") ?? ""));

  if (!title || !contentMd) {
    throw new Error("标题和内容不能为空");
  }

  const tags = await upsertTags(tagNames);

  await prisma.knowledgeEntry.update({
    where: { id },
    data: {
      title,
      contentMd,
      category,
      visibility,
      sourceUrl,
      tags: {
        set: [],
        connect: tags.map((t) => ({ id: t.id })),
      },
    },
  });

  // 内容变化后重算 embedding
  await tryEmbedEntry(id);

  revalidatePath("/knowledge");
  revalidatePath(`/knowledge/${id}`);
  revalidatePath("/");
  redirect(`/knowledge/${id}`);
}

export async function deleteEntry(id: string) {
  await prisma.knowledgeEntry.delete({ where: { id } });
  revalidatePath("/knowledge");
  revalidatePath("/");
  redirect("/knowledge");
}
