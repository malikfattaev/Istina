export type DailyVerse = {
  reference: string;
  text: string;
};

type VerseRef = {
  book: number;
  chapter: number;
  verse: number;
};

/** Сокращённые названия Евангелий по номеру книги (нумерация getbible). */
const gospelAbbr: Record<number, string> = {
  40: "Мф.",
  41: "Мк.",
  42: "Лк.",
  43: "Ин.",
};

/**
 * Курированный список евангельских стихов. Каждый день показывается следующий
 * (детерминированно по дате), поэтому стих меняется ежедневно.
 */
const verses: VerseRef[] = [
  { book: 40, chapter: 5, verse: 3 },
  { book: 40, chapter: 5, verse: 9 },
  { book: 40, chapter: 5, verse: 16 },
  { book: 40, chapter: 5, verse: 44 },
  { book: 40, chapter: 6, verse: 21 },
  { book: 40, chapter: 6, verse: 33 },
  { book: 40, chapter: 7, verse: 7 },
  { book: 40, chapter: 7, verse: 12 },
  { book: 40, chapter: 11, verse: 28 },
  { book: 40, chapter: 28, verse: 20 },
  { book: 41, chapter: 9, verse: 23 },
  { book: 41, chapter: 10, verse: 27 },
  { book: 41, chapter: 11, verse: 24 },
  { book: 41, chapter: 12, verse: 31 },
  { book: 42, chapter: 6, verse: 31 },
  { book: 42, chapter: 6, verse: 36 },
  { book: 42, chapter: 6, verse: 37 },
  { book: 42, chapter: 12, verse: 34 },
  { book: 42, chapter: 21, verse: 33 },
  { book: 43, chapter: 3, verse: 16 },
  { book: 43, chapter: 8, verse: 12 },
  { book: 43, chapter: 8, verse: 32 },
  { book: 43, chapter: 13, verse: 34 },
  { book: 43, chapter: 14, verse: 6 },
  { book: 43, chapter: 14, verse: 27 },
  { book: 43, chapter: 15, verse: 12 },
  { book: 43, chapter: 16, verse: 33 },
];

/** Запасной стих на случай недоступности API. */
const fallback: DailyVerse = {
  reference: "Ин. 3:16",
  text: "Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного, дабы всякий верующий в Него, не погиб, но имел жизнь вечную.",
};

const TIME_ZONE = "Asia/Tashkent";

/**
 * Порядковый номер дня (от эпохи) в часовом поясе Ташкента. По нему выбирается
 * стих, поэтому он меняется в местную полночь - согласованно с памятью дня.
 */
function tashkentDayNumber(): number {
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);
}

function formatReference(ref: VerseRef): string {
  const abbr = gospelAbbr[ref.book] ?? "";
  return `${abbr} ${ref.chapter}:${ref.verse}`.trim();
}

type GetBibleResponse = {
  verses: { verse: number; text: string }[];
};

/**
 * Стих дня в Синодальном переводе. Источник - getbible.net (перевод synodal).
 * Ответ кешируется на сутки; при ошибке возвращается запасной стих.
 */
export async function getDailyVerse(): Promise<DailyVerse> {
  const dayIndex = tashkentDayNumber() % verses.length;
  const ref = verses[dayIndex] ?? verses[0]!;
  const reference = formatReference(ref);

  try {
    const response = await fetch(
      `https://api.getbible.net/v2/synodal/${ref.book}/${ref.chapter}.json`,
      { next: { revalidate: 86_400 }, signal: AbortSignal.timeout(5_000) },
    );
    if (!response.ok) {
      throw new Error(`getbible responded ${response.status}`);
    }

    const data = (await response.json()) as GetBibleResponse;
    const verse = data.verses.find((item) => item.verse === ref.verse);
    if (!verse?.text) {
      throw new Error("verse not found in response");
    }

    return { reference, text: verse.text.replace(/\s+/g, " ").trim() };
  } catch {
    return fallback;
  }
}
