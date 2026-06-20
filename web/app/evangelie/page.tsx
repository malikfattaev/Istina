import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { gospels } from "@/lib/gospel";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "Евангелие",
  description: "Четвероевангелие в Синодальном переводе - читать онлайн.",
};

export default function EvangeliePage() {
  return (
    <div>
      <PageHeader
        title="Евангелие"
        description="Четвероевангелие в Синодальном переводе. Выберите книгу для чтения."
        className="mb-6"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {gospels.map((gospel) => (
          <Link
            key={gospel.slug}
            href={`/evangelie/${gospel.slug}/1`}
            className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600 transition-colors group-hover:bg-clay-100">
              <BookOpen className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="flex items-center gap-1 font-semibold text-sand-900">
                {gospel.title}
                <HoverArrow className="text-clay-500" />
              </h2>
              <p className="text-sm text-sand-600">{gospel.chapters} глав</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
