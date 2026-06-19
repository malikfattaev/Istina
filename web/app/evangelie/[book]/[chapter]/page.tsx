import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@istina/ui";
import { getChapter, getGospel, gospels } from "@/lib/gospel";

type PageProps = {
  params: Promise<{ book: string; chapter: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { book, chapter } = await params;
  const gospel = getGospel(book);
  if (!gospel) {
    return {};
  }
  return { title: `${gospel.title}, глава ${chapter}` };
}

export default async function ChapterPage({ params }: PageProps) {
  const { book, chapter } = await params;
  const gospel = getGospel(book);
  const chapterNumber = Number(chapter);

  if (
    !gospel ||
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > gospel.chapters
  ) {
    notFound();
  }

  const verses = await getChapter(gospel.number, chapterNumber);
  const prev = chapterNumber > 1 ? chapterNumber - 1 : null;
  const next = chapterNumber < gospel.chapters ? chapterNumber + 1 : null;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/evangelie"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Евангелие
      </Link>

      {/* Выбор книги */}
      <div className="flex flex-wrap gap-2">
        {gospels.map((item) => (
          <Link
            key={item.slug}
            href={`/evangelie/${item.slug}/1`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              item.slug === gospel.slug
                ? "bg-clay-100 text-clay-800"
                : "text-sand-700 hover:bg-sand-100",
            )}
          >
            {item.short}
          </Link>
        ))}
      </div>

      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-sand-900 sm:text-3xl">
          {gospel.title}
        </h1>
        <p className="mt-1 text-sm text-sand-600">
          Глава {chapterNumber} · Синодальный перевод
        </p>
      </div>

      {/* Выбор главы */}
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: gospel.chapters }, (_, index) => index + 1).map(
          (number) => (
            <Link
              key={number}
              href={`/evangelie/${gospel.slug}/${number}`}
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

      {/* Навигация по главам */}
      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/evangelie/${gospel.slug}/${prev}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Глава {prev}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/evangelie/${gospel.slug}/${next}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            Глава {next}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
