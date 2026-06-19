export type DailyCommemoration = {
  dateLabel: string;
  weekday: string;
  saints: string[];
};

const TIME_ZONE = "Asia/Tashkent";

/** Текущая дата в часовом поясе Ташкента: ISO (YYYY-MM-DD) и человекочитаемая. */
function tashkentToday(): { iso: string; dateLabel: string } {
  const now = new Date();
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const dateLabel = new Intl.DateTimeFormat("ru-RU", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  return { iso, dateLabel };
}

type IspovednikResponse = {
  data: Record<
    string,
    {
      day_of_week?: string;
      saints?: { name?: string }[];
    }
  >;
};

/**
 * Память святых на сегодня (православный календарь РПЦ, русские имена).
 * Источник - api.ispovednik.org. Ответ кешируется на сутки; при ошибке
 * возвращается null, и страница показывает запасное состояние.
 */
export async function getDailyCommemoration(): Promise<DailyCommemoration | null> {
  const { iso, dateLabel } = tashkentToday();

  try {
    const response = await fetch(
      `https://api.ispovednik.org/api/v1/saints/day/${iso}?lang=ru`,
      { next: { revalidate: 86_400 }, signal: AbortSignal.timeout(6_000) },
    );
    if (!response.ok) {
      throw new Error(`ispovednik responded ${response.status}`);
    }

    const json = (await response.json()) as IspovednikResponse;
    const day = json.data?.[iso];
    const saints = (day?.saints ?? [])
      .map((saint) => saint.name?.trim() ?? "")
      .filter(Boolean);

    return { dateLabel, weekday: day?.day_of_week ?? "", saints };
  } catch {
    return null;
  }
}
