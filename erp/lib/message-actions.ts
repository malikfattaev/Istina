"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@vnls/db";
import { requireAdmin } from "@/lib/auth";

/** Отмечает письмо прочитанным/непрочитанным. */
export async function setMessageStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status") === "READ" ? "READ" : "NEW";
  if (id) {
    await prisma.message.update({ where: { id }, data: { status } });
    revalidatePath("/messages");
    revalidatePath("/", "layout");
  }
}

/** Удаляет письмо. */
export async function deleteMessage(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.message.delete({ where: { id } });
    revalidatePath("/messages");
    revalidatePath("/", "layout");
  }
}
