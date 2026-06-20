import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  LifeBuoy,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "О форуме",
  description:
    "«Истина» - молодёжный православный форум при Свято-Успенском кафедральном соборе в Ташкенте.",
};

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Users,
    title: "Найти друзей",
    text: "Знакомиться с близкими по духу ребятами и обретать настоящих друзей.",
  },
  {
    icon: Sparkles,
    title: "Расти в вере",
    text: "Развиваться духовно и становиться ближе к Церкви - вместе это легче.",
  },
  {
    icon: HeartHandshake,
    title: "Помогать друг другу",
    text: "Поддерживать друг друга в делах, учёбе и на пути веры.",
  },
  {
    icon: LifeBuoy,
    title: "Быть рядом",
    text: "В трудную минуту всегда есть на кого положиться и к кому прийти.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Баннер-герой с фото православного собора */}
      <section className="relative mb-8 flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl border border-sand-200 sm:min-h-[340px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/street.jpg"
          alt="Православный собор в Ташкенте"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-950/85 via-sand-950/40 to-sand-950/10" />
        <div className="relative p-6 sm:p-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl">
            О форуме
          </h1>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/85">
            Молодёжный православный форум «Истина».
          </p>
        </div>
      </section>

      <div className="space-y-4 leading-relaxed text-sand-700">
        <p>
          «Истина» - молодёжный православный форум при Свято-Успенском
          кафедральном соборе (Собор Успения Божией Матери) в Ташкенте. Это
          команда молодых ребят, которые живут верой и хотят быть полезными
          храму и людям.
        </p>
        <p>
          Мы помогаем по храму, ездим на выезды и в паломничества, занимаемся
          благотворительностью и добрыми делами, а ещё просто собираемся вместе
          - общаемся, дружим и растём в вере.
        </p>
      </div>

      {/* Цель форума */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-sand-900">
          Зачем мы вместе
        </h2>
        <p className="mt-2 leading-relaxed text-sand-700">
          Главное в нашем форуме - люди. Мы собираемся, чтобы вместе расти в
          вере, становиться ближе к Церкви и друг к другу, помогать друг другу
          развиваться и поддерживать в трудных ситуациях - чтобы рядом всегда
          были те, на кого можно положиться.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex items-start gap-4 rounded-2xl border border-sand-200 bg-white p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sand-900">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sand-600">
                    {value.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-10 leading-relaxed text-sand-700">
        Форум открыт для каждого, кто хочет участвовать. Если хочешь
        присоединиться к нам или помочь общему делу - напиши на странице{" "}
        <Link
          href="/contacts"
          className="font-medium text-clay-600 underline-offset-2 hover:underline"
        >
          «Контакты»
        </Link>
        .
      </p>
    </div>
  );
}
