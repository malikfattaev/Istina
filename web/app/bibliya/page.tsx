import type { Metadata } from "next";
import Link from "next/link";
import {
  booksOfGroup,
  ntGroups,
  otGroups,
  type BibleBook,
  type BibleGroup,
  type Testament,
} from "@/lib/bible";
import { PageHeader } from "@/components/page-header";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "Библия",
  description:
    "Библия в Синодальном переводе - Ветхий и Новый Завет, читать онлайн по главам.",
};

function BookCard({ book }: { book: BibleBook }) {
  return (
    <Link
      href={`/bibliya/${book.slug}/1`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-sand-200 bg-white px-4 py-3 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <div className="min-w-0">
        <p className="flex items-center gap-1 font-medium text-sand-900">
          <span className="truncate">{book.title}</span>
          {book.apocryphal ? (
            <span
              className="text-clay-400"
              title="Неканоническая книга"
              aria-label="неканоническая книга"
            >
              *
            </span>
          ) : null}
          <HoverArrow className="shrink-0 text-clay-500" />
        </p>
        <p className="text-xs text-sand-500">{book.chapters} глав</p>
      </div>
    </Link>
  );
}

function Group({
  testament,
  group,
}: {
  testament: Testament;
  group: BibleGroup;
}) {
  const books = booksOfGroup(testament, group.key);
  if (books.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-sand-500">
        {group.title}
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}

function TestamentSection({
  testament,
  title,
  groups,
}: {
  testament: Testament;
  title: string;
  groups: BibleGroup[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-sand-900">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-8">
        {groups.map((group) => (
          <Group key={group.key} testament={testament} group={group} />
        ))}
      </div>
    </section>
  );
}

export default function BibliaPage() {
  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Библия"
        description="Священное Писание в Синодальном переводе. Выберите книгу для чтения."
      />

      <TestamentSection
        testament="ot"
        title="Ветхий Завет"
        groups={otGroups}
      />
      <TestamentSection
        testament="nt"
        title="Новый Завет"
        groups={ntGroups}
      />

      <p className="text-xs leading-relaxed text-sand-500">
        * Неканонические книги - входят в состав православной Библии, но не
        включены в число канонических.
      </p>
    </div>
  );
}
