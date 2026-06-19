import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getPublishedArticles } from "@/lib/articles";
import { getRubric } from "@/lib/rubrics";

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
                className="block rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
              >
                <p className="text-xs text-sand-500">{article.date}</p>
                <h2 className="mt-1 text-lg font-semibold text-sand-900">
                  {article.title}
                </h2>
                {article.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-sand-600">
                    {article.excerpt}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
