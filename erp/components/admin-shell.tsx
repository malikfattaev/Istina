"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@istina/ui";
import { signOut } from "@/lib/actions";

const nav: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Обзор", href: "/", icon: LayoutDashboard },
  { label: "Статьи", href: "/articles", icon: Newspaper },
  { label: "Администраторы", href: "/admins", icon: Users },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function AdminShell({
  user,
  children,
}: {
  user: { email: string; name: string | null };
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh">
      {/* Десктопный сайдбар */}
      <aside className="hidden border-r border-sand-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-full flex-col gap-6 p-4">
          <div className="flex items-center gap-2.5 px-2 py-1">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay-500 font-serif text-lg text-white"
            >
              И
            </span>
            <span className="font-semibold text-sand-900">Истина · Админ</span>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-clay-100 text-clay-800"
                      : "text-sand-700 hover:bg-sand-100",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-sand-200 pt-3">
            <p className="truncate px-3 text-sm font-medium text-sand-800">
              {user.name ?? user.email}
            </p>
            <p className="truncate px-3 text-xs text-sand-500">{user.email}</p>
            <form action={signOut} className="mt-2">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-sand-700 transition-colors hover:bg-sand-100"
              >
                <LogOut className="h-[18px] w-[18px]" aria-hidden />
                Выйти
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Мобильная навигация */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-sand-200 bg-white px-4 py-2 lg:hidden">
        <div className="flex gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium",
                isActive(pathname, item.href)
                  ? "bg-clay-100 text-clay-800"
                  : "text-sand-700",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <form action={signOut}>
          <button type="submit" className="ml-2 text-sm text-sand-600">
            Выйти
          </button>
        </form>
      </div>

      {/* Контент */}
      <div className="lg:pl-64">
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
