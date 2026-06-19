export type GospelBook = {
  slug: string;
  number: number;
  title: string;
  short: string;
  chapters: number;
};

/** Четвероевангелие. Номера книг - нумерация getbible (40-43). */
export const gospels: GospelBook[] = [
  { slug: "matfeya", number: 40, title: "Евангелие от Матфея", short: "Мф.", chapters: 28 },
  { slug: "marka", number: 41, title: "Евангелие от Марка", short: "Мк.", chapters: 16 },
  { slug: "luki", number: 42, title: "Евангелие от Луки", short: "Лк.", chapters: 24 },
  { slug: "ioanna", number: 43, title: "Евангелие от Иоанна", short: "Ин.", chapters: 21 },
];

const bySlug = new Map(gospels.map((gospel) => [gospel.slug, gospel]));

export function getGospel(slug: string): GospelBook | undefined {
  return bySlug.get(slug);
}

export type Verse = {
  verse: number;
  text: string;
};

type ChapterResponse = {
  verses?: { verse: number; text: string }[];
};

/**
 * Текст главы Евангелия в Синодальном переводе (getbible.net).
 * Библейский текст неизменен, поэтому ответ кешируется надолго.
 * При ошибке возвращается null.
 */
export async function getChapter(
  bookNumber: number,
  chapter: number,
): Promise<Verse[] | null> {
  try {
    const response = await fetch(
      `https://api.getbible.net/v2/synodal/${bookNumber}/${chapter}.json`,
      { next: { revalidate: 2_592_000 }, signal: AbortSignal.timeout(8_000) },
    );
    if (!response.ok) {
      throw new Error(`getbible responded ${response.status}`);
    }

    const data = (await response.json()) as ChapterResponse;
    return (data.verses ?? []).map((item) => ({
      verse: item.verse,
      text: item.text.replace(/\s+/g, " ").trim(),
    }));
  } catch {
    return null;
  }
}
