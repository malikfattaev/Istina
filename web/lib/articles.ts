import { prisma } from "@istina/db";

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string | null;
};

export type ArticleDetail = {
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  date: string;
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Опубликованные статьи рубрики (свежие сверху). */
export async function getPublishedArticles(
  categorySlug: string,
): Promise<ArticleSummary[]> {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED", category: { slug: categorySlug } },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? "",
    date: formatDate(article.publishedAt ?? article.createdAt),
    coverImage: article.coverImage,
  }));
}

/** Одна опубликованная статья по рубрике и slug. */
export async function getArticle(
  categorySlug: string,
  slug: string,
): Promise<ArticleDetail | null> {
  const article = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED", category: { slug: categorySlug } },
    select: {
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  if (!article) return null;

  return {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    coverImage: article.coverImage,
    date: formatDate(article.publishedAt ?? article.createdAt),
  };
}
