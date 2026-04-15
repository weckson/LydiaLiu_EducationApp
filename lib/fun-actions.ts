"use server";

// 小工具（餐厅 / 菜品 / 零食）Server Actions

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

// ════════════════════════════════════════
// 餐厅
// ════════════════════════════════════════
export async function addRestaurant(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const cuisine = String(formData.get("cuisine") ?? "").trim();
  const suburb = String(formData.get("suburb") ?? "").trim();
  const priceLevel = Number(formData.get("priceLevel") ?? 2);
  const note = String(formData.get("note") ?? "").trim() || null;
  const emoji = String(formData.get("emoji") ?? "").trim() || null;

  if (!name || !cuisine || !suburb) return;

  await prisma.restaurant.create({
    data: {
      name,
      cuisine,
      suburb,
      priceLevel: Math.max(1, Math.min(4, priceLevel)),
      note,
      emoji,
    },
  });
  revalidatePath("/fun/restaurants");
}

export async function deleteRestaurant(id: string) {
  await prisma.restaurant.delete({ where: { id } });
  revalidatePath("/fun/restaurants");
}

// ════════════════════════════════════════
// 菜品
// ════════════════════════════════════════
export async function addDish(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "MEAT");
  const difficulty = String(formData.get("difficulty") ?? "EASY");
  const note = String(formData.get("note") ?? "").trim() || null;
  const emoji = String(formData.get("emoji") ?? "").trim() || null;

  if (!name) return;

  await prisma.dish.create({
    data: {
      name,
      type: type === "VEGGIE" ? "VEGGIE" : "MEAT",
      difficulty: ["EASY", "MEDIUM", "HARD"].includes(difficulty)
        ? difficulty
        : "EASY",
      note,
      emoji,
    },
  });
  revalidatePath("/fun/dishes");
}

export async function deleteDish(id: string) {
  await prisma.dish.delete({ where: { id } });
  revalidatePath("/fun/dishes");
}

// ════════════════════════════════════════
// 零食
// ════════════════════════════════════════
export async function updateSnack(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const nameEn = String(formData.get("nameEn") ?? "").trim() || null;
  const emoji = String(formData.get("emoji") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const priceRange = String(formData.get("priceRange") ?? "").trim() || null;

  if (!name) return;

  await prisma.snackRanking.update({
    where: { id },
    data: { name, nameEn, emoji, description, priceRange },
  });
  revalidatePath("/fun/snacks");
}

export async function deleteSnack(id: string) {
  await prisma.snackRanking.delete({ where: { id } });
  revalidatePath("/fun/snacks");
}

export async function addSnack(formData: FormData) {
  const category = String(formData.get("category") ?? "AU");
  const name = String(formData.get("name") ?? "").trim();
  const nameEn = String(formData.get("nameEn") ?? "").trim() || null;
  const emoji = String(formData.get("emoji") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const priceRange = String(formData.get("priceRange") ?? "").trim() || null;

  if (!name) return;

  // 自动分配下一个 rank
  const last = await prisma.snackRanking.findFirst({
    where: { category: category === "ZH" ? "ZH" : "AU" },
    orderBy: { rank: "desc" },
  });
  const nextRank = (last?.rank ?? 0) + 1;

  await prisma.snackRanking.create({
    data: {
      category: category === "ZH" ? "ZH" : "AU",
      rank: nextRank,
      name,
      nameEn,
      emoji,
      description,
      priceRange,
    },
  });
  revalidatePath("/fun/snacks");
}
