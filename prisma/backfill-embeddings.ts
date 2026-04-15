// 为所有没有 embedding 的知识条目批量生成向量
//
// 运行：
//   npm run db:embed
//
// 场景：
// - 跑完 db:seed 后首次给种子数据批量生成向量
// - 更换了 embedding 模型后重算所有条目
// - 某些条目保存时 embedding 失败，事后补算
//
// 批量调用 OpenAI 的 embeddings 接口（比逐条快很多，成本也低）

import { PrismaClient } from "@prisma/client";
import { getProvider } from "../lib/ai/provider";
import { buildEmbeddingText } from "../lib/ai/embeddings";
import { serializeEmbedding } from "../lib/ai/similarity";

const prisma = new PrismaClient();

async function main() {
  const forceAll = process.argv.includes("--all");

  console.log("═══════════════════════════════════════════");
  console.log(" 知识库 embedding 批量生成脚本");
  console.log(forceAll ? " 模式：全量重算" : " 模式：仅为缺失的条目生成");
  console.log("═══════════════════════════════════════════\n");

  const where = forceAll ? {} : { embedding: null };
  const entries = await prisma.knowledgeEntry.findMany({
    where,
    include: { tags: true },
  });

  if (entries.length === 0) {
    console.log("✓ 没有需要生成 embedding 的条目");
    return;
  }

  console.log(`找到 ${entries.length} 条待处理...`);

  const provider = await getProvider();
  console.log(`使用模型：${provider.embeddingModel}\n`);

  // 准备文本
  const texts = entries.map((e) =>
    buildEmbeddingText({
      title: e.title,
      category: e.category,
      tags: e.tags.map((t) => t.name),
      contentMd: e.contentMd,
    })
  );

  console.log("▶ 批量生成向量中...");
  const start = Date.now();
  const vectors = await provider.embedBatch(texts);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`✓ 生成完成，用时 ${elapsed}s\n`);

  console.log("▶ 写入数据库...");
  let saved = 0;
  for (let i = 0; i < entries.length; i++) {
    await prisma.knowledgeEntry.update({
      where: { id: entries[i].id },
      data: {
        embedding: serializeEmbedding(vectors[i]),
        embeddingModel: provider.embeddingModel,
        embeddingUpdatedAt: new Date(),
      },
    });
    saved++;
    if (saved % 10 === 0 || saved === entries.length) {
      console.log(`  ${saved}/${entries.length}`);
    }
  }

  console.log(`\n✓ 全部完成：${saved} 条`);
}

main()
  .catch((e) => {
    console.error("❌ 失败：", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
