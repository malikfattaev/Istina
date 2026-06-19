import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticle } from "@/lib/articles";
import { getRubric } from "@/lib/rubrics";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);
  if (!article) {
    return {};
  }
  return { title: article.title };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const rubric = getRubric(category);
  if (!rubric) {
    notFound();
  }

  const article = await getArticle(category, slug);
  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href={`/forum/${rubric.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {rubric.title}
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-2 text-sm text-sand-500">{article.date}</p>

      {article.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverImage}
          alt={article.title}
          className="mt-6 w-full rounded-2xl border border-sand-200 object-cover"
        />
      ) : null}

      <div className="mt-6 whitespace-pre-line leading-relaxed text-sand-800">
        {article.content}
      </div>
    </article>
  );
}
