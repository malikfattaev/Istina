import type { Metadata } from "next";
import Link from "next/link";
import { prayerSets, type PrayerSet } from "@/lib/prayers";
import { PageHeader } from "@/components/page-header";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "Молитвы",
  description:
    "Православный молитвослов: утренние и вечерние молитвы, молитвы на каждый день - читать онлайн.",
};

function countPrayers(set: PrayerSet): number {
  return set.blocks.filter((block) => block.type === "heading").length;
}

function SetCard({ set }: { set: PrayerSet }) {
  return (
    <Link
      href={`/molitvy/${set.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <h2 className="flex items-center gap-1 font-serif text-xl font-semibold tracking-tight text-sand-900">
        {set.title}
        <HoverArrow className="text-clay-500" />
      </h2>
      <p className="mt-2 flex-1 leading-relaxed text-sand-600">{set.subtitle}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-clay-600">
        {countPrayers(set)} молитв
      </p>
    </Link>
  );
}

export default function MolitvyPage() {
  return (
    <div>
      <PageHeader
        title="Молитвы"
        description="Православный молитвослов. Выберите молитвенное правило для чтения."
        className="mb-6"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prayerSets.map((set) => (
          <SetCard key={set.slug} set={set} />
        ))}
      </div>
    </div>
  );
}
