import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Cross,
  FileText,
  Flame,
  HeartHandshake,
  LifeBuoy,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { HoverArrow } from "@/components/hover-arrow";

export const metadata: Metadata = {
  title: "О клубе",
  description:
    "«Истина» - православный молодёжный клуб при Свято-Успенском кафедральном соборе в Ташкенте. Библия, молитвы, основы веры и статьи - всё в одном месте.",
};

const resources: {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
}[] = [
  {
    icon: BookOpen,
    title: "Библия",
    text: "Ветхий и Новый Завет в Синодальном переводе - читать онлайн в любое время.",
    href: "/bibliya",
  },
  {
    icon: Flame,
    title: "Молитвы",
    text: "Утренние и вечерние молитвы, на каждый день и правило ко Святому Причащению.",
    href: "/molitvy",
  },
  {
    icon: Cross,
    title: "Основы веры",
    text: "Кратко и по канонам: вера, Святая Троица, Церковь, Таинства и заповеди.",
    href: "/osnovy",
  },
  {
    icon: FileText,
    title: "Статьи",
    text: "Богословие, жития святых и ответы на вопросы о вере и жизни христианина.",
    href: "/club/stati",
  },
  {
    icon: CalendarDays,
    title: "Календарь",
    text: "Православный календарь: праздники, посты и память святых на каждый день.",
    href: "/prazdniki",
  },
  {
    icon: HeartHandshake,
    title: "Помощь",
    text: "Тем, кому нужна поддержка, и тем, кто готов помочь, - материалы и просьбы.",
    href: "/club/pomoshch",
  },
];

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
            О клубе
          </h1>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/85">
            Православный молодёжный клуб «Истина».
          </p>
        </div>
      </section>

      <div className="space-y-4 leading-relaxed text-sand-700">
        <p>
          «Истина» - православный молодёжный клуб при Свято-Успенском
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

      {/* Цель клуба */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-sand-900">
          Зачем мы вместе
        </h2>
        <p className="mt-2 leading-relaxed text-sand-700">
          Главное в нашем клубе - люди. Мы собираемся, чтобы вместе расти в
          вере, становиться ближе к Церкви и друг к другу, помогать друг другу
          развиваться и поддерживать в трудных ситуациях - чтобы рядом всегда
          были те, на кого можно положиться.
        </p>
        <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex h-full items-start gap-4 rounded-2xl border border-sand-200 bg-white p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sand-900">{value.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-sand-600">
                    {value.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Чем полезен сайт */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-sand-900">
          Что есть на сайте
        </h2>
        <p className="mt-2 leading-relaxed text-sand-700">
          ПМК «Истина» - это не только встречи и выезды. Наш сайт сам по себе
          помощник в вере: здесь под рукой Священное Писание, молитвы на каждый
          день, основы православия простыми словами и статьи о вере. Всё в одном
          месте, бесплатно и без регистрации - пользуйтесь и делитесь с
          близкими.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand-100 text-clay-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 flex items-center gap-1 font-semibold text-sand-900">
                  {item.title}
                  <HoverArrow className="text-clay-500" />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-sand-600">
                  {item.text}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
