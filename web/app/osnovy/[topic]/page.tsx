import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { faithTopics, getFaithTopic, type FaithBlock } from "@/lib/faith";

type PageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return faithTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const found = getFaithTopic(topic);
  if (!found) {
    return {};
  }
  return { title: found.title, description: found.subtitle };
}

/** Соседние блоки одного типа "item" собираются в один маркированный список. */
function renderBlocks(blocks: FaithBlock[]) {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i]!;
    if (block.type === "item") {
      const items: string[] = [];
      let next = blocks[i];
      while (next && next.type === "item") {
        items.push(next.content);
        i += 1;
        next = blocks[i];
      }
      nodes.push(
        <ul key={`list-${i}`} className="ml-1 flex list-disc flex-col gap-1.5 pl-5">
          {items.map((text, n) => (
            <li key={n}>{text}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (block.type === "heading") {
      nodes.push(
        <h2
          key={i}
          className="mt-2 font-serif text-lg font-semibold text-clay-700 first:mt-0"
        >
          {block.content}
        </h2>,
      );
    } else {
      nodes.push(<p key={i}>{block.content}</p>);
    }
    i += 1;
  }
  return nodes;
}

export default async function FaithTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const found = getFaithTopic(topic);

  if (!found) {
    notFound();
  }

  const index = faithTopics.findIndex((item) => item.slug === found.slug);
  const prev = faithTopics[index - 1];
  const next = faithTopics[index + 1];

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/osnovy"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Основы веры
      </Link>

      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-sand-900 sm:text-3xl">
          {found.title}
        </h1>
        <p className="mt-1 leading-relaxed text-sand-600">{found.subtitle}</p>
      </div>

      <div className="rounded-2xl border border-sand-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-4 leading-relaxed text-sand-800">
          {renderBlocks(found.blocks)}
        </div>
      </div>

      <p className="text-xs text-sand-500">Источник: {found.source}</p>

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/osnovy/${prev.slug}`}
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
            href={`/osnovy/${next.slug}`}
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
