import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getPublishedArticles } from "@/lib/articles";
import { getRubric } from "@/lib/rubrics";
import { HoverArrow } from "@/components/hover-arrow";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const rubric = getRubric(category);
  if (!rubric) {
    return {};
  }
  return { title: rubric.title, description: rubric.description };
}

export default async function RubricPage({ params }: PageProps) {
  const { category } = await params;
  const rubric = getRubric(category);
  if (!rubric) {
    notFound();
  }

  const articles = await getPublishedArticles(rubric.slug);

  return (
    <div>
      <PageHeader title={rubric.title} description={rubric.description} />

      {articles.length === 0 ? (
        <EmptyState
          icon={rubric.icon}
          title="Здесь пока нет публикаций"
          description="Материалы этой рубрики появятся в ближайшее время."
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/forum/${rubric.slug}/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-md sm:flex-row"
              >
                {article.coverImage ? (
                  <div className="shrink-0 overflow-hidden sm:w-60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-full"
                    />
                  </div>
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-clay-600">
                    {article.date}
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold text-sand-900 transition-colors group-hover:text-clay-700">
                    {article.title}
                  </h2>
                  {article.excerpt ? (
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sand-600">
                      {article.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-clay-600">
                    Читать
                    <HoverArrow />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
