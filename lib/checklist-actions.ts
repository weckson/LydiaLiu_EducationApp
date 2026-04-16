"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";

/**
 * 从模板创建一个客户清单
 */
export async function createChecklist(formData: FormData) {
  const visaType = String(formData.get("visaType") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim() || null;

  if (!visaType) return;

  // 找模板
  const template = await prisma.checklistTemplate.findUnique({
    where: { visaType },
  });

  if (!template) {
    throw new Error(`未找到签证类型 ${visaType} 的清单模板`);
  }

  // 解析模板 items，给每个加上 checked: false
  let items: any[] = [];
  try {
    items = JSON.parse(template.items).map((item: any) => ({
      ...item,
      checked: false,
    }));
  } catch {
    items = [];
  }

  const checklist = await prisma.clientChecklist.create({
    data: {
      clientName,
      visaType: template.visaType,
      visaName: template.visaName,
      items: JSON.stringify(items),
    },
  });

  revalidatePath("/checklist");
  redirect(`/checklist/${checklist.id}`);
}

/**
 * 更新清单项的打勾状态
 */
export async function updateChecklistItem(
  checklistId: string,
  itemIndex: number,
  checked: boolean
) {
  const checklist = await prisma.clientChecklist.findUnique({
    where: { id: checklistId },
  });
  if (!checklist) return;

  let items: any[] = [];
  try {
    items = JSON.parse(checklist.items);
  } catch {
    return;
  }

  if (itemIndex < 0 || itemIndex >= items.length) return;
  items[itemIndex].checked = checked;

  await prisma.clientChecklist.update({
    where: { id: checklistId },
    data: { items: JSON.stringify(items) },
  });
  revalidatePath(`/checklist/${checklistId}`);
}

/**
 * 删除清单
 */
export async function deleteChecklist(id: string) {
  await prisma.clientChecklist.delete({ where: { id } });
  revalidatePath("/checklist");
  redirect("/checklist");
}
