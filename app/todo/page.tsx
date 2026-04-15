import { prisma } from "@/lib/db";
import {
  createTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  updatePriority,
} from "@/lib/todo-actions";

export const dynamic = "force-dynamic";

export default async function TodoPage() {
  const [active, done] = await Promise.all([
    prisma.todo.findMany({
      where: { done: false },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    }),
    prisma.todo.findMany({
      where: { done: true },
      orderBy: { updatedAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 mb-1">
          Personal Todo
        </div>
        <h1 className="font-serif text-3xl text-ink-900 gold-underline">
          待办清单
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          写下你还要做的事情 · {active.length} 项待办 · {done.length} 项已完成
        </p>
      </div>

      {/* 新增表单 */}
      <form action={createTodo} className="elegant-card p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            name="content"
            required
            placeholder="新增一条待办..."
            className="input-elegant flex-1"
            autoComplete="off"
          />
          <select
            name="priority"
            defaultValue="NORMAL"
            className="input-elegant md:w-32 cursor-pointer appearance-none"
          >
            <option value="LOW">低优先</option>
            <option value="NORMAL">普通</option>
            <option value="HIGH">高优先</option>
          </select>
          <button type="submit" className="btn-primary whitespace-nowrap">
            + 添加
          </button>
        </div>
      </form>

      {/* 待办列表 */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-serif text-xl text-ink-900">待办</h2>
          {active.length === 0 && (
            <span className="text-xs text-gold-600 tracking-wide">
              ✨ All done
            </span>
          )}
        </div>

        {active.length === 0 ? (
          <div className="elegant-card p-12 text-center">
            <div className="text-4xl text-gold-400 mb-3">✦</div>
            <p className="text-ink-500">全部完成，辛苦啦 ~</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {active.map((t) => (
              <TodoItem key={t.id} todo={t} />
            ))}
          </ul>
        )}
      </section>

      {/* 已完成列表 */}
      {done.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-serif text-xl text-ink-700">已完成</h2>
            <form action={clearCompleted}>
              <button
                type="submit"
                className="text-xs text-brand-600 hover:text-brand-700 tracking-wide"
              >
                清空已完成
              </button>
            </form>
          </div>
          <ul className="space-y-2">
            {done.map((t) => (
              <TodoItem key={t.id} todo={t} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function TodoItem({
  todo,
}: {
  todo: {
    id: string;
    content: string;
    done: boolean;
    priority: string;
    createdAt: Date;
  };
}) {
  const toggleWithId = toggleTodo.bind(null, todo.id);
  const deleteWithId = deleteTodo.bind(null, todo.id);

  const priorityBadge = {
    HIGH: { label: "重要", color: "bg-brand-100 text-brand-700 border-brand-200" },
    NORMAL: { label: "普通", color: "bg-cream-100 text-ink-600 border-cream-300" },
    LOW: { label: "低", color: "bg-gold-100 text-gold-700 border-gold-200" },
  }[todo.priority] ?? {
    label: "普通",
    color: "bg-cream-100 text-ink-600 border-cream-300",
  };

  return (
    <li className="elegant-card p-4 flex items-center gap-3 group">
      <form action={toggleWithId} className="flex-shrink-0">
        <button
          type="submit"
          aria-label={todo.done ? "标记为未完成" : "标记为完成"}
          className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
            todo.done
              ? "bg-gradient-rose-button border-transparent shadow-soft"
              : "border-brand-300 hover:border-brand-500 hover:bg-brand-50"
          }`}
        >
          {todo.done && <span className="text-white text-xs">✓</span>}
        </button>
      </form>

      <div className="flex-1 min-w-0">
        <div
          className={`text-ink-800 ${
            todo.done ? "line-through text-ink-400" : ""
          }`}
        >
          {todo.content}
        </div>
      </div>

      {!todo.done && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${priorityBadge.color}`}
        >
          {priorityBadge.label}
        </span>
      )}

      <time className="text-[10px] text-ink-400 tracking-wide flex-shrink-0">
        {new Date(todo.createdAt).toLocaleDateString("zh-CN", {
          month: "short",
          day: "numeric",
        })}
      </time>

      <form action={deleteWithId} className="flex-shrink-0">
        <button
          type="submit"
          aria-label="删除"
          className="w-7 h-7 rounded-full text-ink-400 hover:bg-brand-50 hover:text-brand-600 transition opacity-0 group-hover:opacity-100"
        >
          ×
        </button>
      </form>
    </li>
  );
}
