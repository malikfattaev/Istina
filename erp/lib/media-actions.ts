"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@vnls/db";
import { requireAdmin } from "@/lib/auth";
import { deleteObject } from "@/lib/storage";

export type DeleteMediaResult = { ok: true } | { error: string };

/** Удаляет файл из бакета и из БД. */
export async function deleteMedia(id: string): Promise<DeleteMediaResult> {
  await requireAdmin();

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return { error: "Файл не найден" };

  try {
    await deleteObject(media.key);
  } catch {
    // объект мог быть уже удалён в бакете - продолжаем чистку БД
  }
  await prisma.media.delete({ where: { id } });

  revalidatePath("/media");
  return { ok: true };
}
