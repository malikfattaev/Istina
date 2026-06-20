import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О форуме",
  description:
    "«Истина» - молодёжный православный форум при Свято-Успенском кафедральном соборе в Ташкенте.",
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
        <p>
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
    </div>
  );
}
