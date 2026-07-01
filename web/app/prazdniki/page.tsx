import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { cn } from "@vnls/ui";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getDailyCommemoration } from "@/lib/saints";

export const metadata: Metadata = {
  title: "Календарь",
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

/** Сегодняшняя дата в формате «7 января» (Ташкент) - чтобы подсветить праздник дня. */
function tashkentDayMonth(): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

export default async function PrazdnikiPage() {
  const today = await getDailyCommemoration();
  const todayDayMonth = tashkentDayMonth();

  return (
    <div>
      <PageHeader
        title="Календарь"
        description="Память святых на каждый день и великие праздники церковного года."
        className="mb-4"
      />

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="text-lg font-semibold text-sand-900">Память дня</h2>
          {today ? (
            <p className="mt-1 text-sm text-sand-600">
              {today.weekday ? `${today.weekday}, ` : ""}
              {today.dateLabel}
            </p>
          ) : null}

          {today && today.saints.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2 rounded-2xl border border-sand-200 bg-white p-5 sm:p-6">
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
            <div className="mt-4">
              <EmptyState
                icon={CalendarDays}
                title="Память дня временно недоступна"
                description="Не удалось загрузить календарь. Попробуйте обновить страницу позже."
              />
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-sand-900">Великие праздники</h2>
          <p className="mt-1 text-sm text-sand-600">
            Даты указаны по календарю Русской Православной Церкви.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {greatFeasts.map((feast) => {
              const isToday = feast.date === todayDayMonth;
              return (
                <li
                  key={feast.name}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border bg-white p-4",
                    isToday ? "border-clay-400 ring-1 ring-clay-200" : "border-sand-200",
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 rounded-lg px-3 py-1 text-sm font-medium",
                      isToday
                        ? "bg-clay-500 text-white"
                        : "bg-clay-100 text-clay-700",
                    )}
                  >
                    {feast.date}
                  </span>
                  <span className="font-medium text-sand-900">{feast.name}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
