import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "@istina/ui";
import { rubrics, usefulLinks, type NavLink } from "@/lib/navigation";

function QuickLink({ item }: { item: NavLink }) {
  const Icon: LucideIcon = item.icon;
  return (
    <Link
      href={item.href}
      className="group flex h-full items-start gap-4 rounded-2xl border border-sand-200 bg-white p-4 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600 transition-colors group-hover:bg-clay-100">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <h3 className="flex items-center gap-1 font-semibold text-sand-900">
          {item.label}
          <ArrowRight
            className="h-4 w-4 -translate-x-1 text-clay-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-sand-600">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function Section({ title, items }: { title: string; items: NavLink[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-sand-900">{title}</h2>
      <div className="mt-4 grid auto-rows-fr gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <QuickLink key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Приветствие */}
      <section className="rounded-3xl border border-sand-200 bg-gradient-to-br from-sand-100 to-sand-50 p-8 sm:p-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
          Добро пожаловать на «Истину»
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-sand-700">
          Православный портал Узбекистана. Здесь собраны новости приходов,
          богословие, жития святых и расписание богослужений. Выберите раздел,
          чтобы начать чтение.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/forum/novosti">
            <Button size="lg">Читать новости</Button>
          </Link>
          <Link href="/forum/stati">
            <Button size="lg" variant="outline">
              Статьи
            </Button>
          </Link>
        </div>
      </section>

      <Section title="Рубрики" items={rubrics} />
      <Section title="Полезное" items={usefulLinks} />
    </div>
  );
}
