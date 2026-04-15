"use server";

// Todo 待办 Server Actions

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export async function createTodo(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  const priority = String(formData.get("priority") ?? "NORMAL");
  if (!content) return;

  await prisma.todo.create({
    data: {
      content,
      priority: ["LOW", "NORMAL", "HIGH"].includes(priority)
        ? priority
        : "NORMAL",
    },
  });
  revalidatePath("/todo");
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) return;
  await prisma.todo.update({
    where: { id },
    data: { done: !todo.done },
  });
  revalidatePath("/todo");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todo");
}

export async function updatePriority(id: string, priority: string) {
  if (!["LOW", "NORMAL", "HIGH"].includes(priority)) return;
  await prisma.todo.update({
    where: { id },
    data: { priority },
  });
  revalidatePath("/todo");
}

export async function clearCompleted() {
  await prisma.todo.deleteMany({ where: { done: true } });
  revalidatePath("/todo");
}
