import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ArticleStatus, prisma } from "@istina/db";
import { deleteArticle } from "@/lib/article-actions";

const statusLabel: Record<ArticleStatus, string> = {
  DRAFT: "Черновик",
  PUBLISHED: "Опубликовано",
};

export default async function CategoryArticlesPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const rubric = await prisma.category.findUnique({
    where: { slug: category },
  });
  if (!rubric) {
    notFound();
  }

  const articles = await prisma.article.findMany({
    where: { categoryId: rubric.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-sand-900">
          {rubric.name}
        </h1>
        <Link
          href={`/r/${rubric.slug}/new`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Добавить
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-300 bg-white/60 p-12 text-center text-sand-600">
          Пока нет материалов в этом разделе.
        </div>
      ) : (
        <div className="mt-6 divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-sand-900">
                  {article.title}
                </p>
                <p className="mt-0.5 text-sm">
                  <span
                    className={
                      article.status === "PUBLISHED"
                        ? "text-clay-600"
                        : "text-sand-500"
                    }
                  >
                    {statusLabel[article.status]}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/articles/${article.id}`}
                  aria-label="Редактировать"
                  className="rounded-lg border border-sand-200 p-2 text-sand-600 transition-colors hover:border-clay-300 hover:text-clay-700"
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                </Link>
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={article.id} />
                  <button
                    type="submit"
                    aria-label="Удалить"
                    className="rounded-lg border border-sand-200 p-2 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
