import Link from "next/link";
import { prisma } from "@istina/db";

export default async function DashboardPage() {
  const [admins, total, published, drafts] = await Promise.all([
    prisma.user.count(),
    prisma.article.count(),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.article.count({ where: { status: "DRAFT" } }),
  ]);

  const stats = [
    { label: "Статьи всего", value: total },
    { label: "Опубликовано", value: published },
    { label: "Черновики", value: drafts },
    { label: "Администраторы", value: admins },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-sand-900">Обзор</h1>
      <p className="mt-1 text-sand-600">Панель управления порталом «Истина».</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/articles/new"
          className="inline-flex items-center rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
        >
          Новая статья
        </Link>
        <Link
          href="/articles"
          className="inline-flex items-center rounded-xl border border-sand-300 px-5 py-2.5 text-sm font-medium text-sand-800 transition-colors hover:bg-sand-50"
        >
          Все статьи
        </Link>
      </div>
    </div>
  );
}
