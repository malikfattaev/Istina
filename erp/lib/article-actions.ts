"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ArticleStatus, prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Заголовок слишком короткий"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/, "Slug: только латиница, цифры и дефис"),
  categoryId: z.string().min(1, "Выберите рубрику"),
  excerpt: z.string().trim().optional(),
  content: z.string().trim().min(1, "Добавьте текст"),
  coverImage: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || v.startsWith("/api/media/") || /^https?:\/\//.test(v),
      "Некорректная обложка",
    )
    .optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type ArticleFormState = { error: string } | null;

export async function saveArticle(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireAdmin();

  const parsed = articleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }
  const input = parsed.data;

  let publishedAt: Date | null = null;
  if (input.status === "PUBLISHED") {
    const existing = input.id
      ? await prisma.article.findUnique({
          where: { id: input.id },
          select: { publishedAt: true },
        })
      : null;
    publishedAt = existing?.publishedAt ?? new Date();
  }

  const data = {
    title: input.title,
    slug: input.slug,
    categoryId: input.categoryId,
    excerpt: input.excerpt || null,
    content: input.content,
    coverImage: input.coverImage || null,
    status: input.status as ArticleStatus,
    publishedAt,
  };

  let categorySlug = "";
  try {
    if (input.id) {
      await prisma.article.update({ where: { id: input.id }, data });
    } else {
      await prisma.article.create({ data: { ...data, authorId: user.id } });
    }
    const category = await prisma.category.findUnique({
      where: { id: input.categoryId },
      select: { slug: true },
    });
    categorySlug = category?.slug ?? "";
  } catch {
    return { error: "Не удалось сохранить - возможно, такой slug уже занят." };
  }

  revalidatePath("/", "layout");
  redirect(categorySlug ? `/r/${categorySlug}` : "/");
}

export async function deleteArticle(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/", "layout");
  }
}
