import Link from "next/link";
import { prisma } from "@/lib/db";
import { addDish, deleteDish } from "@/lib/fun-actions";
import { DishPicker } from "@/components/DishPicker";

export const dynamic = "force-dynamic";

export default async function DishesPage() {
  const dishes = await prisma.dish.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });

  const meatCount = dishes.filter((d) => d.type === "MEAT").length;
  const veggieCount = dishes.filter((d) => d.type === "VEGGIE").length;

  return (
    <div className="space-y-10">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun" className="hover:text-brand-600 transition">
          小工具
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">今晚做什么菜</span>
      </div>

      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Cook Tonight
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-ink-900 gold-underline">
          今晚做什么菜
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          一荤 {meatCount} 道 · 一素 {veggieCount} 道 · 随机抽选
        </p>
      </div>

      {/* 抽奖组件 */}
      <DishPicker dishes={dishes} />

      {/* 菜品管理 */}
      <section>
        <div className="mb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Manage
          </div>
          <h2 className="font-serif text-2xl text-ink-900">菜品管理</h2>
        </div>

        {/* 新增表单 */}
        <form action={addDish} className="elegant-card p-5 mb-6">
          <div className="text-sm font-medium text-ink-700 mb-3">
            添加新菜品
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="name"
              required
              placeholder="菜名（如：红烧肉）"
              className="input-elegant"
            />
            <select
              name="type"
              defaultValue="MEAT"
              className="input-elegant cursor-pointer"
            >
              <option value="MEAT">荤菜</option>
              <option value="VEGGIE">素菜</option>
            </select>
            <select
              name="difficulty"
              defaultValue="EASY"
              className="input-elegant cursor-pointer"
            >
              <option value="EASY">简单</option>
              <option value="MEDIUM">中等</option>
              <option value="HARD">进阶</option>
            </select>
            <input
              name="emoji"
              placeholder="表情符号（可选）"
              maxLength={2}
              className="input-elegant"
            />
            <input
              name="note"
              placeholder="备注（如：食材/做法）"
              className="input-elegant md:col-span-2"
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn-primary">
              + 添加菜品
            </button>
          </div>
        </form>

        {/* 列表 - 双栏 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DishColumn
            title="荤菜"
            subtitle="Meat"
            dishes={dishes.filter((d) => d.type === "MEAT")}
          />
          <DishColumn
            title="素菜"
            subtitle="Veggie"
            dishes={dishes.filter((d) => d.type === "VEGGIE")}
          />
        </div>
      </section>
    </div>
  );
}

function DishColumn({
  title,
  subtitle,
  dishes,
}: {
  title: string;
  subtitle: string;
  dishes: Array<{
    id: string;
    name: string;
    nameEn: string | null;
    difficulty: string;
    note: string | null;
    emoji: string | null;
  }>;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2">
        <h3 className="font-serif text-lg text-ink-900">{title}</h3>
        <span className="text-[10px] tracking-[0.2em] uppercase text-gold-600">
          {subtitle} · {dishes.length}
        </span>
      </div>
      <ul className="space-y-2">
        {dishes.map((d) => {
          const deleteWithId = deleteDish.bind(null, d.id);
          return (
            <li
              key={d.id}
              className="elegant-card p-3 flex items-center gap-3 group"
            >
              <div className="text-xl flex-shrink-0">{d.emoji ?? "🍽️"}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-ink-800 truncate">{d.name}</div>
                {d.nameEn && (
                  <div className="text-[10px] text-ink-400 italic truncate">
                    {d.nameEn}
                  </div>
                )}
              </div>
              <form action={deleteWithId} className="flex-shrink-0">
                <button
                  type="submit"
                  aria-label="删除"
                  className="w-6 h-6 rounded-full text-ink-400 hover:bg-brand-50 hover:text-brand-600 transition opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
