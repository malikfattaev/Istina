import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Button } from "@istina/ui";
import { rubrics, usefulLinks, type NavLink } from "@/lib/navigation";
import { HoverArrow } from "@/components/hover-arrow";

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
          <HoverArrow className="text-clay-500" />
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
      {/* Приветствие - баннер с фото Свято-Успенского собора */}
      <section className="relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl border border-sand-200 sm:min-h-[440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banner.jpeg"
          alt="Свято-Успенский кафедральный собор в Ташкенте"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-950/85 via-sand-950/45 to-sand-950/10" />
        <div className="relative p-6 sm:p-10 lg:p-12">
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            Молодёжный православный форум «Истина»
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/85">
            Команда молодых христиан при Свято-Успенском кафедральном соборе в
            Ташкенте. Помогаем храму, ездим на выезды, занимаемся
            благотворительностью и добрыми делами - и рады каждому, кто хочет
            быть с нами.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about">
              <Button size="lg">О форуме</Button>
            </Link>
            <Link href="/forum/novosti">
              <Button
                size="lg"
                variant="outline"
                className="border-white/60 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Новости
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Section title="Рубрики" items={rubrics} />
      <Section title="Полезное" items={usefulLinks} />
    </div>
  );
}
