import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Что такое «Истина» - православный портал Узбекистана.",
};

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
            О проекте
          </h1>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/85">
            «Истина» - православный портал Узбекистана.
          </p>
        </div>
      </section>

      <div className="max-w-2xl space-y-4 leading-relaxed text-sand-700">
        <p>
          «Истина» собирает в одном удобном месте новости приходов, духовные
          статьи, жития святых и сведения о том, как получить или оказать
          помощь. Наша цель - чтобы православные христиане Узбекистана и все
          интересующиеся верой могли легко находить нужное.
        </p>
        <p>
          Все материалы готовит и публикует редакция - духовенство и
          администрация портала. Сайт открыт для чтения всем, регистрация не
          требуется.
        </p>
        <p>
          Проект базируется в Ташкенте. По вопросам публикаций и сотрудничества
          напишите нам на странице{" "}
          <Link
            href="/contacts"
            className="font-medium text-clay-600 underline-offset-2 hover:underline"
          >
            «Контакты»
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
