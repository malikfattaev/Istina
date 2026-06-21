import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getPrayerSet, prayerSets } from "@/lib/prayers";

type PageProps = {
  params: Promise<{ set: string }>;
};

export function generateStaticParams() {
  return prayerSets.map((set) => ({ set: set.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { set } = await params;
  const found = getPrayerSet(set);
  if (!found) {
    return {};
  }
  return { title: found.title, description: found.subtitle };
}

export default async function PrayerSetPage({ params }: PageProps) {
  const { set } = await params;
  const found = getPrayerSet(set);

  if (!found) {
    notFound();
  }

  const index = prayerSets.findIndex((item) => item.slug === found.slug);
  const prev = prayerSets[index - 1];
  const next = prayerSets[index + 1];

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/molitvy"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Молитвы
      </Link>

      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-sand-900 sm:text-3xl">
          {found.title}
        </h1>
        <p className="mt-1 leading-relaxed text-sand-600">{found.subtitle}</p>
      </div>

      {/* Текст молитвенного правила */}
      <div className="rounded-2xl border border-sand-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-4 leading-relaxed text-sand-800">
          {found.blocks.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="mt-2 font-serif text-lg font-semibold text-clay-700 first:mt-0"
                >
                  {block.content}
                </h2>
              );
            }
            if (block.type === "rubric") {
              return (
                <p key={i} className="text-sm italic text-sand-500">
                  {block.content}
                </p>
              );
            }
            return <p key={i}>{block.content}</p>;
          })}
        </div>
      </div>

      <p className="text-xs text-sand-500">Источник: {found.source}</p>

      {/* Переход между молитвенными правилами */}
      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/molitvy/${prev.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {prev.short}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/molitvy/${next.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-sand-800 transition-colors hover:border-clay-300"
          >
            {next.short}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
