// API Route：文件上传 + 文本提取 + AI 推荐标签
//
// 接收 multipart/form-data，返回提取的文本 + AI 推荐

import { NextRequest, NextResponse } from "next/server";
import { extractText } from "@/lib/file-parser";
import { suggestTagsAndCategory } from "@/lib/ai/auto-tagger";

// 允许的最大文件大小（10MB）
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "未选择文件" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "文件过大（最大 10MB）" },
        { status: 400 }
      );
    }

    // 1. 提取文本
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await extractText(buffer, file.name);

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "文件内容太少或无法提取文本" },
        { status: 400 }
      );
    }

    // 2. AI 推荐标题、分类、标签
    const suggestion = await suggestTagsAndCategory("", text);

    return NextResponse.json({
      filename: file.name,
      textLength: text.length,
      extractedText: text,
      suggestedTitle: suggestion.title ?? file.name.replace(/\.[^.]+$/, ""),
      suggestedCategory: suggestion.category,
      suggestedTags: suggestion.tags,
    });
  } catch (error: any) {
    console.error("[upload] 失败:", error);
    return NextResponse.json(
      { error: error?.message ?? "上传处理失败" },
      { status: 500 }
    );
  }
}
