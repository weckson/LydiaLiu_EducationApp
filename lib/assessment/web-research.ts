// 移民方案智能评估器 - 政策新鲜度抓取
//
// 用 OpenAI 的 gpt-4o-mini-search-preview（内置 web 搜索）做少量精确查询。
// 结果缓存到 PolicyCache 表 24 小时，避免重复费用。
//
// 不污染现有 LLMProvider 接口——这个文件独立 new 一个 OpenAI 客户端。

import OpenAI from "openai";
import crypto from "node:crypto";
import { prisma } from "../db";
import type {
  AssessmentInput,
  RecommendedOccupation,
  WebResearchResult,
  PolicyUpdate,
  StateStatus,
} from "./types";

// ════════════════════════════════════════════
// OpenAI 客户端（独立实例）
// ════════════════════════════════════════════

function getSearchClient(): { client: OpenAI; model: string } {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY 未设置");
  }
  const client = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });
  // 专用搜索模型；失败时会 fallback 到普通模型
  const model =
    process.env.OPENAI_SEARCH_MODEL || "gpt-4o-mini-search-preview";
  return { client, model };
}

// ════════════════════════════════════════════
// 缓存工具
// ════════════════════════════════════════════

const CACHE_TTL_HOURS = 24;

function hashQuery(query: string): string {
  return crypto.createHash("sha256").update(query).digest("hex").slice(0, 32);
}

async function getFromCache(query: string): Promise<WebResearchResult | null> {
  const key = hashQuery(query);
  const entry = await prisma.policyCache.findUnique({ where: { cacheKey: key } });
  if (!entry) return null;
  if (entry.expiresAt < new Date()) return null; // 过期
  try {
    const parsed = JSON.parse(entry.content);
    return {
      query,
      content: parsed.content,
      sources: parsed.sources ?? [],
      fromCache: true,
      fetchedAt: entry.fetchedAt.toISOString(),
    };
  } catch {
    return null;
  }
}

async function saveToCache(
  query: string,
  content: string,
  sources: string[]
): Promise<void> {
  const key = hashQuery(query);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CACHE_TTL_HOURS * 3600 * 1000);
  const payload = JSON.stringify({ content, sources });
  await prisma.policyCache.upsert({
    where: { cacheKey: key },
    create: {
      cacheKey: key,
      query,
      content: payload,
      fetchedAt: now,
      expiresAt,
    },
    update: {
      query,
      content: payload,
      fetchedAt: now,
      expiresAt,
    },
  });
}

// ════════════════════════════════════════════
// 底层搜索调用
// ════════════════════════════════════════════

/**
 * 执行一次 web search 查询
 * 返回 LLM 的文本回答 + 引用来源 URL
 *
 * 失败时抛错；caller 可选择吞掉让整个评估降级到"无最新数据"模式
 */
async function searchWeb(query: string): Promise<WebResearchResult> {
  // 先查缓存
  const cached = await getFromCache(query);
  if (cached) {
    console.log(`[web-research] ✓ cache hit: ${query.slice(0, 50)}`);
    return cached;
  }

  console.log(`[web-research] → fetching: ${query.slice(0, 80)}`);
  const { client, model } = getSearchClient();

  const systemPrompt = `You are a research assistant for an Australian migration consultant.
Your task: answer the user's question using live web search.
Focus on OFFICIAL sources (immi.homeaffairs.gov.au, jobsandskills.gov.au, state government migration pages).
Cite specific numbers, dates, and policy statuses.
Respond in Chinese (简体中文) with clear factual statements.
Keep the response under 500 words but include all key numbers.`;

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
      max_tokens: 1500,
    } as any);

    const content = response.choices[0]?.message?.content ?? "";
    // gpt-4o-mini-search-preview 的引用信息在 annotations 字段
    const annotations = (response.choices[0]?.message as any)?.annotations ?? [];
    const sources: string[] = annotations
      .filter((a: any) => a.type === "url_citation")
      .map((a: any) => a.url_citation?.url)
      .filter(Boolean);

    // 去重
    const uniqueSources = Array.from(new Set(sources));

    const result: WebResearchResult = {
      query,
      content,
      sources: uniqueSources,
      fromCache: false,
      fetchedAt: new Date().toISOString(),
    };

    // 写缓存
    await saveToCache(query, content, uniqueSources);
    return result;
  } catch (err: any) {
    // Search model 不可用时 fallback 到普通 gpt-5-nano
    console.error(
      `[web-research] search 模型失败 (${model}): ${err?.message ?? err}`
    );

    const fallbackModel = process.env.OPENAI_CHAT_MODEL || "gpt-5-nano";
    console.log(`[web-research] fallback → ${fallbackModel}`);

    const isReasoning =
      fallbackModel.startsWith("gpt-5") ||
      fallbackModel.startsWith("o1") ||
      fallbackModel.startsWith("o3") ||
      fallbackModel.startsWith("o4");

    const fallbackParams: any = {
      model: fallbackModel,
      messages: [
        {
          role: "system",
          content: `你是澳洲移民顾问助手。请基于你训练数据内已知的澳洲移民政策回答问题。明确说明政策可能已过时，并建议查询 immi.homeaffairs.gov.au。`,
        },
        { role: "user", content: query },
      ],
    };
    if (isReasoning) {
      fallbackParams.max_completion_tokens = 2000;
      fallbackParams.reasoning_effort = "minimal";
    } else {
      fallbackParams.max_tokens = 1500;
      fallbackParams.temperature = 0.3;
    }

    const fallback = await client.chat.completions.create(fallbackParams);
    const content = fallback.choices[0]?.message?.content ?? "";

    const result: WebResearchResult = {
      query,
      content:
        "⚠️ 无法实时抓取（Search API 不可用，下列内容基于模型训练数据，可能已过时）\n\n" +
        content,
      sources: [],
      fromCache: false,
      fetchedAt: new Date().toISOString(),
    };

    await saveToCache(query, result.content, []);
    return result;
  }
}

// ════════════════════════════════════════════
// 高层查询策略
// ════════════════════════════════════════════

/**
 * 一次性完成所有查询，返回给 Path Recommender 消费
 */
export async function researchLatestPolicies(
  input: AssessmentInput,
  occupations: RecommendedOccupation[]
): Promise<{
  stateAllocations: WebResearchResult;
  recentInvitationRounds: WebResearchResult;
  targetStateDetail?: WebResearchResult;
}> {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const primaryOccupation = occupations[0];
  const primaryName = primaryOccupation
    ? `${primaryOccupation.code} ${primaryOccupation.name}`
    : "skilled migration";

  // 查询 1：州担保总体状态
  const q1 = `Australia state and territory nomination allocations 2025-26 ${ym}: which states are currently open for 190 and 491, and what are the remaining quotas? Focus on NSW, VIC, QLD, SA, WA, TAS, NT, ACT.`;

  // 查询 2：最近邀请轮次——精确到客户的职业
  const q2 = `SkillSelect invitation round ${ym} minimum points cutoff for occupation ${primaryName} subclass 189 190 491. What was the recent invitation score specifically for this ANZSCO occupation in each state?`;

  const stateAllocations = await searchWeb(q1);
  const recentInvitationRounds = await searchWeb(q2);

  // 查询 3：仅当客户指定了目标州时执行
  let targetStateDetail: WebResearchResult | undefined;
  if (input.targetState && input.targetState !== "ANY") {
    const q3 = `${input.targetState} state nomination 190 491 visa for occupation ${primaryName} in ${ym}: is it open? what are the specific requirements and recent cutoff scores?`;
    targetStateDetail = await searchWeb(q3);
  }

  return {
    stateAllocations,
    recentInvitationRounds,
    targetStateDetail,
  };
}

/**
 * 清理过期缓存
 * 可以在 cron 或手动调用
 */
export async function cleanExpiredCache(): Promise<number> {
  const result = await prisma.policyCache.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  return result.count;
}
