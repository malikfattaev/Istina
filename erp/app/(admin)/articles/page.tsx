import Link from "next/link";
import { ArticleStatus, prisma } from "@istina/db";
import { deleteArticle } from "./actions";

const statusLabel: Record<ArticleStatus, string> = {
  DRAFT: "Черновик",
  PUBLISHED: "Опубликовано",
};

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-sand-900">
          Статьи
        </h1>
        <Link
          href="/articles/new"
          className="inline-flex items-center rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
        >
          Новая статья
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-300 bg-white/60 p-12 text-center text-sand-600">
          Пока нет ни одной статьи. Создайте первую.
        </div>
      ) : (
        <div className="mt-6 divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <Link
                  href={`/articles/${article.id}`}
                  className="font-medium text-sand-900 hover:text-clay-700"
                >
                  {article.title}
                </Link>
                <p className="mt-0.5 text-sm text-sand-500">
                  {article.category.name}
                  <span className="mx-1.5">·</span>
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
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-sm font-medium text-sand-700 hover:text-clay-700"
                >
                  Редактировать
                </Link>
                <form action={deleteArticle}>
                  <input type="hidden" name="id" value={article.id} />
                  <button
                    type="submit"
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Удалить
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
