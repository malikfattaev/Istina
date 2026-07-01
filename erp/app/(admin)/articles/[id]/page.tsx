import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@vnls/db";
import { ArticleForm } from "@/components/article-form";
import { listMedia } from "@/lib/media";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, categories, mediaItems] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
      include: { category: { select: { slug: true, name: true } } },
    }),
    prisma.category.findMany({
      orderBy: { position: "asc" },
      select: { id: true, name: true },
    }),
    listMedia(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <Link
        href={`/r/${article.category.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {article.category.name}
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Редактирование записи
      </h1>
      <div className="mt-6">
        <ArticleForm
          mediaItems={mediaItems}
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
