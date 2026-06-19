"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Role, hashPassword, prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";

const fields = {
  name: z.string().trim().min(1, "Введите имя"),
  title: z.string().trim().optional(),
  username: z
    .string()
    .trim()
    .min(3, "Логин минимум 3 символа")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Логин: латиница, цифры, _ . -"),
  role: z.enum(["ADMIN", "EDITOR"]),
};

const createSchema = z.object({
  ...fields,
  password: z.string().min(6, "Пароль минимум 6 символов"),
});

const updateSchema = z.object({
  ...fields,
  id: z.string().min(1),
  password: z.string().optional(),
});

export type EmployeeFormState = { error: string } | null;

export async function createEmployee(
  _prev: EmployeeFormState,
  formData: FormData,
): Promise<EmployeeFormState> {
  await requireAdmin();

  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }
  const input = parsed.data;

  const exists = await prisma.user.findUnique({
    where: { username: input.username },
  });
  if (exists) {
    return { error: "Такой логин уже занят." };
  }

  await prisma.user.create({
    data: {
      username: input.username,
      name: input.name,
      title: input.title || null,
      role: input.role as Role,
      passwordHash: await hashPassword(input.password),
    },
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function updateEmployee(
  _prev: EmployeeFormState,
  formData: FormData,
): Promise<EmployeeFormState> {
  await requireAdmin();

  const parsed = updateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }
  const input = parsed.data;

  const sameUsername = await prisma.user.findUnique({
    where: { username: input.username },
  });
  if (sameUsername && sameUsername.id !== input.id) {
    return { error: "Такой логин уже занят." };
  }

  const data: {
    username: string;
    name: string;
    title: string | null;
    role: Role;
    passwordHash?: string;
  } = {
    username: input.username,
    name: input.name,
    title: input.title || null,
    role: input.role as Role,
  };

  if (input.password && input.password.length > 0) {
    if (input.password.length < 6) {
      return { error: "Пароль минимум 6 символов." };
    }
    data.passwordHash = await hashPassword(input.password);
  }

  await prisma.user.update({ where: { id: input.id }, data });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployee(formData: FormData): Promise<void> {
  const current = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id && id !== current.id) {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/employees");
  }
}
