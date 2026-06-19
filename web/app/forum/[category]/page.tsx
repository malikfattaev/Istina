import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getPublishedArticles } from "@/lib/articles";
import { articleRubrics, getRubric } from "@/lib/rubrics";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return articleRubrics.map((rubric) => ({ category: rubric.slug }));
}

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
            <li
              key={article.slug}
              className="rounded-2xl border border-sand-200 bg-white p-5"
            >
              <p className="text-xs text-sand-500">{article.publishedAt}</p>
              <h2 className="mt-1 text-lg font-semibold text-sand-900">
                {article.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-sand-600">
                {article.excerpt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
