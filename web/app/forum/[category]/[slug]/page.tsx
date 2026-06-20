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
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
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
    <article className="mx-auto max-w-3xl">
      <Link
        href={`/forum/${rubric.slug}`}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 transition-colors hover:text-clay-700"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden
        />
        {rubric.title}
      </Link>

      {article.coverImage ? (
        <header className="relative mt-4 flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-sand-200 sm:min-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sand-950/90 via-sand-950/50 to-sand-950/10" />
          <div className="relative p-6 sm:p-10">
            <p className="text-sm font-medium text-white/80">{article.date}</p>
            <h1 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-3 max-w-2xl leading-relaxed text-white/85">
                {article.excerpt}
              </p>
            ) : null}
          </div>
        </header>
      ) : (
        <header className="mt-4 rounded-3xl border border-sand-200 bg-gradient-to-br from-sand-100 to-sand-50 p-6 sm:p-10">
          <p className="text-sm font-medium text-clay-600">{article.date}</p>
          <h1 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-3 max-w-2xl leading-relaxed text-sand-700">
              {article.excerpt}
            </p>
          ) : null}
        </header>
      )}

      <div className="mx-auto mt-8 max-w-2xl whitespace-pre-line leading-relaxed text-sand-800">
        {article.content}
      </div>
    </article>
  );
}
