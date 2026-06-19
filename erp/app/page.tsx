import { Container } from "@istina/ui";

const stats = [
  { label: "Статьи", value: "-" },
  { label: "Опубликовано", value: "-" },
  { label: "Черновики", value: "-" },
  { label: "Администраторы", value: "-" },
] as const;

const sections = [
  { title: "Статьи", description: "Создание, редактирование и публикация материалов." },
  { title: "Рубрики", description: "Разделы сайта и их порядок." },
  { title: "Администраторы", description: "Доступ сотрудников, роли и приглашения." },
] as const;

export default function DashboardPage() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-sand-200 bg-white">
        <Container className="flex h-16 items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-500 font-serif text-white"
          >
            И
          </span>
          <span className="font-semibold text-sand-900">
            Истина · Админ-панель
          </span>
        </Container>
      </header>

      <Container className="py-10">
        <h1 className="font-serif text-2xl font-semibold text-sand-900">Обзор</h1>
        <p className="mt-1 text-sand-700">
          Панель управления порталом. Метрики подключаются на этапе интеграции с
          базой данных.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-sand-200 bg-white p-5"
            >
              <p className="text-sm text-sand-600">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-sand-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-sand-200 bg-white p-6"
            >
              <h2 className="font-semibold text-sand-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-sand-700">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
