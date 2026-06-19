import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getDailyCommemoration } from "@/lib/saints";

export const metadata: Metadata = {
  title: "Праздники",
  description: "Память святых на каждый день и великие праздники церковного года.",
};

const greatFeasts = [
  { date: "7 января", name: "Рождество Христово" },
  { date: "19 января", name: "Крещение Господне (Богоявление)" },
  { date: "15 февраля", name: "Сретение Господне" },
  { date: "7 апреля", name: "Благовещение Пресвятой Богородицы" },
  { date: "19 августа", name: "Преображение Господне" },
  { date: "28 августа", name: "Успение Пресвятой Богородицы" },
  { date: "21 сентября", name: "Рождество Пресвятой Богородицы" },
  { date: "27 сентября", name: "Воздвижение Креста Господня" },
  { date: "4 декабря", name: "Введение во храм Пресвятой Богородицы" },
];

export default async function PrazdnikiPage() {
  const today = await getDailyCommemoration();

  return (
    <div>
      <PageHeader
        title="Праздники"
        description="Память святых на каждый день и великие праздники церковного года."
        className="mb-4"
      />

      <div className="flex flex-col gap-10">
        {today && today.saints.length > 0 ? (
          <ul className="flex flex-col gap-2 rounded-2xl border border-sand-200 bg-white p-5 sm:p-6">
            {today.saints.map((name, index) => (
              <li key={`${name}-${index}`} className="flex gap-3 text-sand-800">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400"
                />
                <span className="leading-relaxed">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="Память дня временно недоступна"
            description="Не удалось загрузить календарь. Попробуйте обновить страницу позже."
          />
        )}

        <section>
          <h2 className="text-lg font-semibold text-sand-900">Великие праздники</h2>
          <p className="mt-1 text-sm text-sand-600">
            Даты указаны по календарю Русской Православной Церкви.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {greatFeasts.map((feast) => (
              <li
                key={feast.name}
                className="flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-4"
              >
                <span className="shrink-0 rounded-lg bg-clay-100 px-3 py-1 text-sm font-medium text-clay-700">
                  {feast.date}
                </span>
                <span className="font-medium text-sand-900">{feast.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
