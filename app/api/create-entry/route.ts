// API Route：创建知识条目（供文件导入页面客户端组件调用）

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { tryEmbedEntry } from "@/lib/ai/embeddings";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") ?? "").trim();
    const contentMd = String(formData.get("contentMd") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim() || null;
    const visibility = String(formData.get("visibility") ?? "PRIVATE");
    const tagsRaw = String(formData.get("tags") ?? "");

    if (!title || !contentMd) {
      return NextResponse.json(
        { error: "标题和正文不能为空" },
        { status: 400 }
      );
    }

    // 解析标签
    const tagNames = tagsRaw
      .split(/[,，\s]+/)
      .map((t) => t.replace(/^#/, "").trim())
      .filter((t) => t.length > 0);

    // Upsert 标签
    const tags = await Promise.all(
      tagNames.map((name) =>
        prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    );

    const entry = await prisma.knowledgeEntry.create({
      data: {
        title,
        contentMd,
        category,
        visibility,
        tags: { connect: tags.map((t) => ({ id: t.id })) },
      },
    });

    // 生成 embedding（异步，不阻断）
    tryEmbedEntry(entry.id);

    return NextResponse.json({ id: entry.id, title: entry.title });
  } catch (error: any) {
    console.error("[create-entry] 失败:", error);
    return NextResponse.json(
      { error: error?.message ?? "创建失败" },
      { status: 500 }
    );
  }
}
