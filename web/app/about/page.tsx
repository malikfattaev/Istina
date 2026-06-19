import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Что такое «Истина» - православный портал Узбекистана.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="О проекте"
        description="«Истина» - православный портал Узбекистана."
      />

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
