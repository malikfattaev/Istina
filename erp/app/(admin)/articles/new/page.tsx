import Link from "next/link";
import { prisma } from "@istina/db";
import { ArticleForm } from "../article-form";

export default async function NewArticlePage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <Link
        href="/articles"
        className="text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        ← К статьям
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Новая статья
      </h1>
      <div className="mt-6">
        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}
