// Prisma 种子脚本
//
// 运行：npm run db:seed
// 幂等：已存在的同名条目会跳过

import { PrismaClient } from "@prisma/client";
import { VISAS } from "./seed/visas";
import { VISAS_V2 } from "./seed/visas-v2";
import { UNIVERSITIES } from "./seed/universities";
import { SNACKS } from "./seed/snacks";
import { RESTAURANTS } from "./seed/restaurants";
import { RESTAURANTS_V2 } from "./seed/restaurants-v2";
import { DISHES } from "./seed/dishes";
import { DISHES_V2 } from "./seed/dishes-v2";
import type { SeedEntry } from "./seed/types";

const prisma = new PrismaClient();

// ═══════════════════════════════════════════
// 知识库种子
// ═══════════════════════════════════════════
async function seedKnowledgeEntries(entries: SeedEntry[], label: string) {
  console.log(`\n▶ 开始导入 ${label}（${entries.length} 条）`);
  let created = 0;
  let skipped = 0;

  for (const e of entries) {
    const existing = await prisma.knowledgeEntry.findFirst({
      where: { title: e.title },
    });
    if (existing) {
      skipped++;
      continue;
    }
    const tags = await Promise.all(
      e.tags.map((name) =>
        prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    );
    await prisma.knowledgeEntry.create({
      data: {
        title: e.title,
        contentMd: e.contentMd,
        category: e.category,
        visibility: e.visibility ?? "PRIVATE",
        sourceUrl: e.sourceUrl,
        tags: { connect: tags.map((t) => ({ id: t.id })) },
      },
    });
    created++;
  }

  console.log(`◀ ${label}：新增 ${created}，跳过 ${skipped}`);
  return { created, skipped };
}

// ═══════════════════════════════════════════
// 零食种子
// ═══════════════════════════════════════════
async function seedSnacks() {
  console.log(`\n▶ 开始导入 零食排行榜（${SNACKS.length} 条）`);
  let created = 0;
  let skipped = 0;

  for (const s of SNACKS) {
    const existing = await prisma.snackRanking.findUnique({
      where: {
        category_rank: {
          category: s.category,
          rank: s.rank,
        },
      },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.snackRanking.create({
      data: {
        category: s.category,
        rank: s.rank,
        name: s.name,
        nameEn: s.nameEn,
        emoji: s.emoji,
        description: s.description,
        priceRange: s.priceRange,
      },
    });
    created++;
  }
  console.log(`◀ 零食排行榜：新增 ${created}，跳过 ${skipped}`);
  return { created, skipped };
}

// ═══════════════════════════════════════════
// 餐厅种子
// ═══════════════════════════════════════════
async function seedRestaurants() {
  const allRestaurants = [...RESTAURANTS, ...RESTAURANTS_V2];
  console.log(`\n▶ 开始导入 悉尼餐厅（${allRestaurants.length} 条）`);
  let created = 0;
  let skipped = 0;

  for (const r of allRestaurants) {
    const existing = await prisma.restaurant.findFirst({
      where: { name: r.name },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.restaurant.create({
      data: {
        name: r.name,
        cuisine: r.cuisine,
        suburb: r.suburb,
        priceLevel: r.priceLevel,
        note: r.note,
        emoji: r.emoji,
      },
    });
    created++;
  }
  console.log(`◀ 悉尼餐厅：新增 ${created}，跳过 ${skipped}`);
  return { created, skipped };
}

// ═══════════════════════════════════════════
// 菜品种子
// ═══════════════════════════════════════════
async function seedDishes() {
  const allDishes = [...DISHES, ...DISHES_V2];
  console.log(`\n▶ 开始导入 家常菜（${allDishes.length} 道）`);
  let created = 0;
  let skipped = 0;

  for (const d of allDishes) {
    const existing = await prisma.dish.findFirst({
      where: { name: d.name },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.dish.create({
      data: {
        name: d.name,
        nameEn: d.nameEn,
        type: d.type,
        difficulty: d.difficulty,
        note: d.note,
        emoji: d.emoji,
      },
    });
    created++;
  }
  console.log(`◀ 家常菜：新增 ${created}，跳过 ${skipped}`);
  return { created, skipped };
}

async function main() {
  console.log("═════════════════════════════════════════");
  console.log(" Lydia 专属留学 App · 种子数据导入");
  console.log("═════════════════════════════════════════");

  const visa = await seedKnowledgeEntries(VISAS, "签证知识");
  const visaV2 = await seedKnowledgeEntries(VISAS_V2, "签证知识（深度扩充 v2）");
  const uni = await seedKnowledgeEntries(UNIVERSITIES, "院校信息");
  const snacks = await seedSnacks();
  const restaurants = await seedRestaurants();
  const dishes = await seedDishes();

  const totalCreated =
    visa.created +
    visaV2.created +
    uni.created +
    snacks.created +
    restaurants.created +
    dishes.created;
  const totalSkipped =
    visa.skipped +
    visaV2.skipped +
    uni.skipped +
    snacks.skipped +
    restaurants.skipped +
    dishes.skipped;

  console.log("\n═════════════════════════════════════════");
  console.log(` 全部完成：新增 ${totalCreated} 条，跳过 ${totalSkipped} 条`);
  console.log("═════════════════════════════════════════\n");
}

main()
  .catch((e) => {
    console.error("❌ 种子脚本失败：", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
