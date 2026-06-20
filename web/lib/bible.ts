// АВТОГЕНЕРАЦИЯ из getbible.net (Синодальный перевод, версия synodal).
// Полная Библия: Ветхий и Новый Завет, включая неканонические книги.
// Номера книг и число глав взяты из источника. Перевод неизменен -> кеш надолго.

export type Testament = "ot" | "nt";

export type BibleBook = {
  slug: string;
  number: number; // нумерация getbible
  title: string;
  short: string;
  chapters: number;
  testament: Testament;
  group: string;
  apocryphal?: boolean; // неканоническая книга
};

export const bibleBooks: BibleBook[] = [
  { slug: "bytie", number: 1, title: "Бытие", short: "Быт.", chapters: 50, testament: "ot", group: "zakon" },
  { slug: "ishod", number: 2, title: "Исход", short: "Исх.", chapters: 40, testament: "ot", group: "zakon" },
  { slug: "levit", number: 3, title: "Левит", short: "Лев.", chapters: 27, testament: "ot", group: "zakon" },
  { slug: "chisla", number: 4, title: "Числа", short: "Чис.", chapters: 36, testament: "ot", group: "zakon" },
  { slug: "vtorozakonie", number: 5, title: "Второзаконие", short: "Втор.", chapters: 34, testament: "ot", group: "zakon" },
  { slug: "iisusa-navina", number: 6, title: "Книга Иисуса Навина", short: "Нав.", chapters: 24, testament: "ot", group: "istor" },
  { slug: "sudey", number: 7, title: "Книга Судей", short: "Суд.", chapters: 21, testament: "ot", group: "istor" },
  { slug: "ruf", number: 8, title: "Книга Руфи", short: "Руф.", chapters: 4, testament: "ot", group: "istor" },
  { slug: "1-tsarstv", number: 9, title: "1-я книга Царств", short: "1 Цар.", chapters: 31, testament: "ot", group: "istor" },
  { slug: "2-tsarstv", number: 10, title: "2-я книга Царств", short: "2 Цар.", chapters: 24, testament: "ot", group: "istor" },
  { slug: "3-tsarstv", number: 11, title: "3-я книга Царств", short: "3 Цар.", chapters: 22, testament: "ot", group: "istor" },
  { slug: "4-tsarstv", number: 12, title: "4-я книга Царств", short: "4 Цар.", chapters: 25, testament: "ot", group: "istor" },
  { slug: "1-paralipomenon", number: 13, title: "1-я Паралипоменон", short: "1 Пар.", chapters: 29, testament: "ot", group: "istor" },
  { slug: "2-paralipomenon", number: 14, title: "2-я Паралипоменон", short: "2 Пар.", chapters: 36, testament: "ot", group: "istor" },
  { slug: "molitva-manassii", number: 79, title: "Молитва Манассии", short: "Мол. Ман.", chapters: 1, testament: "ot", group: "istor", apocryphal: true },
  { slug: "1-ezdry", number: 15, title: "1-я книга Ездры", short: "1 Езд.", chapters: 10, testament: "ot", group: "istor" },
  { slug: "neemii", number: 16, title: "Книга Неемии", short: "Неем.", chapters: 13, testament: "ot", group: "istor" },
  { slug: "2-ezdry", number: 67, title: "2-я книга Ездры", short: "2 Езд.", chapters: 9, testament: "ot", group: "istor", apocryphal: true },
  { slug: "3-ezdry", number: 68, title: "3-я книга Ездры", short: "3 Езд.", chapters: 16, testament: "ot", group: "istor", apocryphal: true },
  { slug: "tovit", number: 69, title: "Книга Товита", short: "Тов.", chapters: 14, testament: "ot", group: "istor", apocryphal: true },
  { slug: "iudif", number: 70, title: "Книга Иудифи", short: "Иудиф.", chapters: 16, testament: "ot", group: "istor", apocryphal: true },
  { slug: "esfir", number: 17, title: "Книга Есфири", short: "Есф.", chapters: 10, testament: "ot", group: "istor" },
  { slug: "1-makkaveev", number: 80, title: "1-я Маккавейская", short: "1 Мак.", chapters: 16, testament: "ot", group: "istor", apocryphal: true },
  { slug: "2-makkaveev", number: 81, title: "2-я Маккавейская", short: "2 Мак.", chapters: 15, testament: "ot", group: "istor", apocryphal: true },
  { slug: "3-makkaveev", number: 82, title: "3-я Маккавейская", short: "3 Мак.", chapters: 7, testament: "ot", group: "istor", apocryphal: true },
  { slug: "iova", number: 18, title: "Книга Иова", short: "Иов", chapters: 42, testament: "ot", group: "uchit" },
  { slug: "psaltir", number: 19, title: "Псалтирь", short: "Пс.", chapters: 151, testament: "ot", group: "uchit" },
  { slug: "pritchi", number: 20, title: "Притчи Соломона", short: "Притч.", chapters: 31, testament: "ot", group: "uchit" },
  { slug: "ekklesiast", number: 21, title: "Екклесиаст", short: "Еккл.", chapters: 12, testament: "ot", group: "uchit" },
  { slug: "pesn-pesnei", number: 22, title: "Песнь Песней", short: "Песн.", chapters: 8, testament: "ot", group: "uchit" },
  { slug: "premudrost-solomona", number: 73, title: "Премудрость Соломона", short: "Прем.", chapters: 19, testament: "ot", group: "uchit", apocryphal: true },
  { slug: "sirah", number: 74, title: "Премудрость Иисуса, сына Сирахова", short: "Сир.", chapters: 51, testament: "ot", group: "uchit", apocryphal: true },
  { slug: "isaiya", number: 23, title: "Книга пророка Исаии", short: "Ис.", chapters: 66, testament: "ot", group: "prorok" },
  { slug: "ieremiya", number: 24, title: "Книга пророка Иеремии", short: "Иер.", chapters: 52, testament: "ot", group: "prorok" },
  { slug: "plach-ieremii", number: 25, title: "Плач Иеремии", short: "Плач", chapters: 6, testament: "ot", group: "prorok" },
  { slug: "varuh", number: 75, title: "Книга пророка Варуха", short: "Вар.", chapters: 5, testament: "ot", group: "prorok", apocryphal: true },
  { slug: "iezekiil", number: 26, title: "Книга пророка Иезекииля", short: "Иез.", chapters: 48, testament: "ot", group: "prorok" },
  { slug: "daniil", number: 27, title: "Книга пророка Даниила", short: "Дан.", chapters: 14, testament: "ot", group: "prorok" },
  { slug: "osiya", number: 28, title: "Осия", short: "Ос.", chapters: 14, testament: "ot", group: "prorok" },
  { slug: "ioil", number: 29, title: "Иоиль", short: "Иоил.", chapters: 3, testament: "ot", group: "prorok" },
  { slug: "amos", number: 30, title: "Амос", short: "Ам.", chapters: 9, testament: "ot", group: "prorok" },
  { slug: "avdiy", number: 31, title: "Авдий", short: "Авд.", chapters: 1, testament: "ot", group: "prorok" },
  { slug: "iona", number: 32, title: "Иона", short: "Ион.", chapters: 4, testament: "ot", group: "prorok" },
  { slug: "mihey", number: 33, title: "Михей", short: "Мих.", chapters: 7, testament: "ot", group: "prorok" },
  { slug: "naum", number: 34, title: "Наум", short: "Наум", chapters: 3, testament: "ot", group: "prorok" },
  { slug: "avvakum", number: 35, title: "Аввакум", short: "Авв.", chapters: 3, testament: "ot", group: "prorok" },
  { slug: "sofoniya", number: 36, title: "Софония", short: "Соф.", chapters: 3, testament: "ot", group: "prorok" },
  { slug: "aggey", number: 37, title: "Аггей", short: "Агг.", chapters: 2, testament: "ot", group: "prorok" },
  { slug: "zahariya", number: 38, title: "Захария", short: "Зах.", chapters: 14, testament: "ot", group: "prorok" },
  { slug: "malahiya", number: 39, title: "Малахия", short: "Мал.", chapters: 4, testament: "ot", group: "prorok" },
  { slug: "matfeya", number: 40, title: "Евангелие от Матфея", short: "Мф.", chapters: 28, testament: "nt", group: "evangelie" },
  { slug: "marka", number: 41, title: "Евангелие от Марка", short: "Мк.", chapters: 16, testament: "nt", group: "evangelie" },
  { slug: "luki", number: 42, title: "Евангелие от Луки", short: "Лк.", chapters: 24, testament: "nt", group: "evangelie" },
  { slug: "ioanna", number: 43, title: "Евангелие от Иоанна", short: "Ин.", chapters: 21, testament: "nt", group: "evangelie" },
  { slug: "deyaniya", number: 44, title: "Деяния апостолов", short: "Деян.", chapters: 28, testament: "nt", group: "deyaniya" },
  { slug: "iakova", number: 59, title: "Послание Иакова", short: "Иак.", chapters: 5, testament: "nt", group: "sobornye" },
  { slug: "1-petra", number: 60, title: "1-е послание Петра", short: "1 Пет.", chapters: 5, testament: "nt", group: "sobornye" },
  { slug: "2-petra", number: 61, title: "2-е послание Петра", short: "2 Пет.", chapters: 3, testament: "nt", group: "sobornye" },
  { slug: "1-ioanna", number: 62, title: "1-е послание Иоанна", short: "1 Ин.", chapters: 5, testament: "nt", group: "sobornye" },
  { slug: "2-ioanna", number: 63, title: "2-е послание Иоанна", short: "2 Ин.", chapters: 1, testament: "nt", group: "sobornye" },
  { slug: "3-ioanna", number: 64, title: "3-е послание Иоанна", short: "3 Ин.", chapters: 1, testament: "nt", group: "sobornye" },
  { slug: "iudy", number: 65, title: "Послание Иуды", short: "Иуд.", chapters: 1, testament: "nt", group: "sobornye" },
  { slug: "rimlyanam", number: 45, title: "Послание к Римлянам", short: "Рим.", chapters: 16, testament: "nt", group: "pavel" },
  { slug: "1-korinfyanam", number: 46, title: "1-е Коринфянам", short: "1 Кор.", chapters: 16, testament: "nt", group: "pavel" },
  { slug: "2-korinfyanam", number: 47, title: "2-е Коринфянам", short: "2 Кор.", chapters: 13, testament: "nt", group: "pavel" },
  { slug: "galatam", number: 48, title: "Послание к Галатам", short: "Гал.", chapters: 6, testament: "nt", group: "pavel" },
  { slug: "efesyanam", number: 49, title: "Послание к Ефесянам", short: "Еф.", chapters: 6, testament: "nt", group: "pavel" },
  { slug: "filippiytsam", number: 50, title: "Послание к Филиппийцам", short: "Флп.", chapters: 4, testament: "nt", group: "pavel" },
  { slug: "kolossyanam", number: 51, title: "Послание к Колоссянам", short: "Кол.", chapters: 4, testament: "nt", group: "pavel" },
  { slug: "1-fessalonikiytsam", number: 52, title: "1-е Фессалоникийцам", short: "1 Фес.", chapters: 5, testament: "nt", group: "pavel" },
  { slug: "2-fessalonikiytsam", number: 53, title: "2-е Фессалоникийцам", short: "2 Фес.", chapters: 3, testament: "nt", group: "pavel" },
  { slug: "1-timofeyu", number: 54, title: "1-е Тимофею", short: "1 Тим.", chapters: 6, testament: "nt", group: "pavel" },
  { slug: "2-timofeyu", number: 55, title: "2-е Тимофею", short: "2 Тим.", chapters: 4, testament: "nt", group: "pavel" },
  { slug: "titu", number: 56, title: "Послание к Титу", short: "Тит.", chapters: 3, testament: "nt", group: "pavel" },
  { slug: "filimonu", number: 57, title: "Послание к Филимону", short: "Флм.", chapters: 1, testament: "nt", group: "pavel" },
  { slug: "evreyam", number: 58, title: "Послание к Евреям", short: "Евр.", chapters: 13, testament: "nt", group: "pavel" },
  { slug: "otkrovenie", number: 66, title: "Откровение Иоанна Богослова", short: "Откр.", chapters: 22, testament: "nt", group: "otkrovenie" },
];

export type BibleGroup = { key: string; title: string };

export const otGroups: BibleGroup[] = [
  { key: "zakon", title: "Законоположительные" },
  { key: "istor", title: "Исторические" },
  { key: "uchit", title: "Учительные" },
  { key: "prorok", title: "Пророческие" },
];

export const ntGroups: BibleGroup[] = [
  { key: "evangelie", title: "Евангелия" },
  { key: "deyaniya", title: "Деяния" },
  { key: "sobornye", title: "Соборные послания" },
  { key: "pavel", title: "Послания апостола Павла" },
  { key: "otkrovenie", title: "Откровение" },
];

const bySlug = new Map(bibleBooks.map((book) => [book.slug, book]));

export function getBook(slug: string): BibleBook | undefined {
  return bySlug.get(slug);
}

/** Книги указанного раздела, в порядке следования. */
export function booksOfGroup(testament: Testament, group: string): BibleBook[] {
  return bibleBooks.filter((b) => b.testament === testament && b.group === group);
}

export type Verse = { verse: number; text: string };

type ChapterResponse = { verses?: { verse: number; text: string }[] };

/**
 * Текст главы в Синодальном переводе (getbible.net). Библейский текст неизменен,
 * поэтому ответ кешируется надолго. При ошибке возвращается null.
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
