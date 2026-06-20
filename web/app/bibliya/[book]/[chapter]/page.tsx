import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@istina/ui";
import { bibleBooks, getBook, getChapter, type BibleBook } from "@/lib/bible";

type PageProps = {
  params: Promise<{ book: string; chapter: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const found = getBook(book);
  if (!found) {
    return {};
  }
  return { title: `${found.title}, глава ${chapter}` };
}

type ChapterRef = { book: BibleBook; chapter: number; sameBook: boolean };

/** Соседняя глава с переходом между книгами по общему порядку Библии. */
function neighbour(book: BibleBook, chapter: number, dir: -1 | 1): ChapterRef | null {
  const target = chapter + dir;
  if (target >= 1 && target <= book.chapters) {
    return { book, chapter: target, sameBook: true };
  }
  const index = bibleBooks.findIndex((b) => b.slug === book.slug);
  const adjacent = bibleBooks[index + dir];
  if (!adjacent) return null;
  return {
    book: adjacent,
    chapter: dir === 1 ? 1 : adjacent.chapters,
    sameBook: false,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { book, chapter } = await params;
  const found = getBook(book);
  const chapterNumber = Number(chapter);

  if (
    !found ||
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > found.chapters
  ) {
    notFound();
  }

  const verses = await getChapter(found.number, chapterNumber);
  const prev = neighbour(found, chapterNumber, -1);
  const next = neighbour(found, chapterNumber, 1);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/bibliya"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Библия
      </Link>

      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-sand-900 sm:text-3xl">
          {found.title}
        </h1>
        <p className="mt-1 text-sm text-sand-600">
          Глава {chapterNumber} · Синодальный перевод
        </p>
      </div>

      {/* Выбор главы */}
      {found.chapters > 1 ? (
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: found.chapters }, (_, index) => index + 1).map(
            (number) => (
              <Link
                key={number}
                href={`/bibliya/${found.slug}/${number}`}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  number === chapterNumber
                    ? "bg-clay-500 text-white"
                    : "border border-sand-200 bg-white text-sand-700 hover:border-clay-300",
                )}
              >
                {number}
              </Link>
            ),
          )}
        </div>
      ) : null}

      {/* Текст главы */}
      <div className="rounded-2xl border border-sand-200 bg-white p-6 sm:p-8">
        {verses && verses.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-sand-800">
            {verses.map((verse) => (
              <p key={verse.verse}>
                <sup className="mr-1 align-super text-xs font-semibold text-clay-500">
                  {verse.verse}
                </sup>
                {verse.text}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sand-600">
            Не удалось загрузить главу. Попробуйте обновить страницу позже.
          </p>
        )}
      </div>

      {/* Навигация по главам (с переходом между книгами) */}
      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/bibliya/${prev.book.slug}/${prev.chapter}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {prev.sameBook
              ? `Глава ${prev.chapter}`
              : `${prev.book.short} ${prev.chapter}`}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/bibliya/${next.book.slug}/${next.chapter}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            {next.sameBook
              ? `Глава ${next.chapter}`
              : `${next.book.short} ${next.chapter}`}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
