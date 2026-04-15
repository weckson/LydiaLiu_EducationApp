import Link from "next/link";
import { prisma } from "@/lib/db";
import { addRestaurant, deleteRestaurant } from "@/lib/fun-actions";
import { RestaurantPicker } from "@/components/RestaurantPicker";

export const dynamic = "force-dynamic";

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Link href="/fun" className="hover:text-brand-600 transition">
          小工具
        </Link>
        <span className="text-gold-400">/</span>
        <span className="text-ink-700">今晚吃什么</span>
      </div>

      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Dine Tonight
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-ink-900 gold-underline">
          今晚吃什么
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          悉尼餐厅随机选择 · 收录 {restaurants.length} 家
        </p>
      </div>

      {/* 抽奖组件 */}
      <RestaurantPicker restaurants={restaurants} />

      {/* 餐厅管理 */}
      <section>
        <div className="mb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
            Manage
          </div>
          <h2 className="font-serif text-2xl text-ink-900">餐厅管理</h2>
        </div>

        {/* 新增表单 */}
        <form action={addRestaurant} className="elegant-card p-5 mb-6">
          <div className="text-sm font-medium text-ink-700 mb-3">
            添加新餐厅
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="name"
              required
              placeholder="餐厅名称"
              className="input-elegant"
            />
            <input
              name="cuisine"
              required
              placeholder="菜系（粤菜/川菜/日料...）"
              className="input-elegant"
            />
            <input
              name="suburb"
              required
              placeholder="所在区（CBD/Chatswood...）"
              className="input-elegant"
            />
            <select
              name="priceLevel"
              defaultValue="2"
              className="input-elegant cursor-pointer"
            >
              <option value="1">$ 经济</option>
              <option value="2">$$ 普通</option>
              <option value="3">$$$ 精致</option>
              <option value="4">$$$$ 高端</option>
            </select>
            <input
              name="emoji"
              placeholder="表情符号（可选）"
              maxLength={2}
              className="input-elegant"
            />
            <input
              name="note"
              placeholder="备注（可选）"
              className="input-elegant"
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn-primary">
              + 添加餐厅
            </button>
          </div>
        </form>

        {/* 列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {restaurants.map((r) => {
            const deleteWithId = deleteRestaurant.bind(null, r.id);
            return (
              <div
                key={r.id}
                className="elegant-card p-4 flex items-start gap-3 group"
              >
                <div className="text-2xl flex-shrink-0">{r.emoji ?? "🍽️"}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base text-ink-900 truncate">
                    {r.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
                    <span className="tag-chip-gold">{r.cuisine}</span>
                    <span className="tag-chip">📍 {r.suburb}</span>
                    <span className="tag-chip">
                      {"$".repeat(r.priceLevel)}
                    </span>
                  </div>
                  {r.note && (
                    <p className="mt-1.5 text-xs text-ink-500 italic truncate">
                      {r.note}
                    </p>
                  )}
                </div>
                <form action={deleteWithId} className="flex-shrink-0">
                  <button
                    type="submit"
                    aria-label="删除"
                    className="w-7 h-7 rounded-full text-ink-400 hover:bg-brand-50 hover:text-brand-600 transition opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
