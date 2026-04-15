// Prisma 种子脚本
//
// 运行方式：
//   npm run db:seed
//
// 幂等：已存在的同名条目会跳过，不会重复插入。
// 想更新某条内容，请在 app 里直接编辑，或手动删除后重跑本脚本。

import { PrismaClient } from "@prisma/client";
import { VISAS } from "./seed/visas";
import { UNIVERSITIES } from "./seed/universities";
import type { SeedEntry } from "./seed/types";

const prisma = new PrismaClient();

async function seedEntries(entries: SeedEntry[], label: string) {
  console.log(`\n▶ 开始导入 ${label}（${entries.length} 条）`);
  let created = 0;
  let skipped = 0;

  for (const e of entries) {
    // 以 title 作为唯一键判断是否已存在
    const existing = await prisma.knowledgeEntry.findFirst({
      where: { title: e.title },
    });
    if (existing) {
      console.log(`  ⏭  跳过（已存在）: ${e.title}`);
      skipped++;
      continue;
    }

    // 为每个 tag 做 upsert
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
    console.log(`  ✓ ${e.title}`);
    created++;
  }

  console.log(`◀ ${label} 完成：新增 ${created}，跳过 ${skipped}`);
  return { created, skipped };
}

async function main() {
  console.log("═════════════════════════════════════════");
  console.log(" Lydia 专属留学 App · 知识库种子数据导入");
  console.log("═════════════════════════════════════════");

  const visaResult = await seedEntries(VISAS, "签证知识");
  const uniResult = await seedEntries(UNIVERSITIES, "院校信息");

  const totalCreated = visaResult.created + uniResult.created;
  const totalSkipped = visaResult.skipped + uniResult.skipped;

  console.log("\n═════════════════════════════════════════");
  console.log(` 全部完成：新增 ${totalCreated} 条，跳过 ${totalSkipped} 条`);
  console.log(" 打开 http://localhost:3000/knowledge 查看");
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
