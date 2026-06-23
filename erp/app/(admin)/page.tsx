import Link from "next/link";
import { Images, Mail, Users, type LucideIcon } from "lucide-react";
import { prisma } from "@istina/db";
import { rubricIcon } from "@/lib/rubric-icons";

function QuickLink({
  href,
  icon: Icon,
  title,
  subtitle,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-5 transition-all hover:border-clay-300 hover:shadow-sm"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-clay-600 transition-colors group-hover:bg-clay-100">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-sand-900">{title}</p>
        <p className="text-sm text-sand-600">{subtitle}</p>
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const [categories, employees, total, published, newMessages] =
    await Promise.all([
      prisma.category.findMany({
        orderBy: { position: "asc" },
        select: {
          id: true,
          slug: true,
          name: true,
          _count: { select: { articles: true } },
        },
      }),
      prisma.user.count(),
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.message.count({ where: { status: "NEW" } }),
    ]);

  const stats = [
    { label: "Материалы всего", value: total },
    { label: "Опубликовано", value: published },
    { label: "Новые письма", value: newMessages },
    { label: "Команда", value: employees },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-sand-900">Обзор</h1>
      <p className="mt-1 text-sand-600">
        Панель управления клубом «Истина».
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-sand-200 bg-white p-5"
          >
            <p className="text-sm text-sand-600">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-sand-900 sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-sand-900">
        Быстрые ссылки
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <QuickLink
            key={category.id}
            href={`/r/${category.slug}`}
            icon={rubricIcon(category.slug)}
            title={category.name}
            subtitle={`${category._count.articles} материалов`}
          />
        ))}
        <QuickLink
          href="/messages"
          icon={Mail}
          title="Письма"
          subtitle={
            newMessages > 0 ? `${newMessages} новых` : "Обращения с сайта"
          }
        />
        <QuickLink
          href="/media"
          icon={Images}
          title="Медиа"
          subtitle="Картинки и видео сайта"
        />
        <QuickLink
          href="/employees"
          icon={Users}
          title="Команда"
          subtitle={`${employees} в команде`}
        />
      </div>
    </div>
  );
}
