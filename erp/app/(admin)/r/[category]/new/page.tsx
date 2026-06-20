import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@istina/db";
import { ArticleForm } from "@/components/article-form";
import { listMedia } from "@/lib/media";

export default async function NewArticleInCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const rubric = await prisma.category.findUnique({
    where: { slug: category },
    select: { id: true, slug: true, name: true },
  });
  if (!rubric) {
    notFound();
  }

  const mediaItems = await listMedia();

  return (
    <div>
      <Link
        href={`/r/${rubric.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {rubric.name}
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Новая запись · {rubric.name}
      </h1>
      <div className="mt-6">
        <ArticleForm
          lockedCategory={{ id: rubric.id, name: rubric.name }}
          mediaItems={mediaItems}
        />
      </div>
    </div>
  );
}
