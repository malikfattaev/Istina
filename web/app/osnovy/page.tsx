import type { Metadata } from "next";
import Link from "next/link";
import { faithTopics, type FaithTopic } from "@/lib/faith";
import { PageHeader } from "@/components/page-header";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "Основы веры",
  description:
    "Основы православной веры для начинающих: вера, Святая Троица, Церковь, Таинства, заповеди - кратко и по канонам.",
};

function TopicCard({ topic }: { topic: FaithTopic }) {
  return (
    <Link
      href={`/osnovy/${topic.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <h2 className="flex items-center gap-1 font-serif text-xl font-semibold tracking-tight text-sand-900">
        {topic.title}
        <HoverArrow className="text-clay-500" />
      </h2>
      <p className="mt-2 flex-1 leading-relaxed text-sand-600">
        {topic.subtitle}
      </p>
    </Link>
  );
}

export default function OsnovyPage() {
  return (
    <div>
      <PageHeader
        title="Основы веры"
        description="Кратко о главном в православной вере. Выберите тему."
        className="mb-6"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faithTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
