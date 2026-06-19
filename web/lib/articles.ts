export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

/**
 * Опубликованные статьи рубрики.
 *
 * Заглушка: пока возвращает пустой список. После подключения PostgreSQL
 * здесь будет запрос к @istina/db - только статьи со статусом PUBLISHED,
 * отсортированные по дате публикации.
 */
export async function getPublishedArticles(
  categorySlug: string,
): Promise<ArticleSummary[]> {
  void categorySlug;
  return [];
}
