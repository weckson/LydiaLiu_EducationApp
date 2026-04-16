// API Route：AI 标签推荐
// 客户端组件（EntryForm）调用这个 API 获取推荐

import { NextRequest, NextResponse } from "next/server";
import { suggestTagsAndCategory } from "@/lib/ai/auto-tagger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: "请先输入正文（至少 10 个字）" },
        { status: 400 }
      );
    }

    const suggestion = await suggestTagsAndCategory(
      title?.trim() ?? "",
      content.trim()
    );

    return NextResponse.json(suggestion);
  } catch (error: any) {
    console.error("[suggest-tags] 失败:", error);
    return NextResponse.json(
      { error: error?.message ?? "AI 推荐失败" },
      { status: 500 }
    );
  }
}
