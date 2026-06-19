import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@istina/db";
import { ArticleForm } from "../article-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { position: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/articles"
        className="text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        ← К статьям
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Редактирование статьи
      </h1>
      <div className="mt-6">
        <ArticleForm
          categories={categories}
          article={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? "",
            content: article.content,
            coverImage: article.coverImage ?? "",
            categoryId: article.categoryId,
            status: article.status,
          }}
        />
      </div>
    </div>
  );
}
