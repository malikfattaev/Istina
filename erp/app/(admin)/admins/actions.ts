"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Role, hashPassword, prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";

const adminSchema = z.object({
  email: z.string().trim().email("Некорректный email"),
  name: z.string().trim().optional(),
  password: z.string().min(6, "Пароль минимум 6 символов"),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export type AdminFormState = { error: string } | { ok: true } | null;

export async function createAdmin(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  const parsed = adminSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }
  const input = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    return { error: "Пользователь с таким email уже существует." };
  }

  const passwordHash = await hashPassword(input.password);
  await prisma.user.create({
    data: {
      email: input.email,
      name: input.name || null,
      passwordHash,
      role: input.role as Role,
    },
  });

  revalidatePath("/admins");
  return { ok: true };
}

export async function deleteAdmin(formData: FormData): Promise<void> {
  const current = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  // Нельзя удалить самого себя.
  if (id && id !== current.id) {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admins");
  }
}
