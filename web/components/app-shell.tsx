"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@istina/ui";
import { primaryNav, rubrics, usefulLinks, type NavLink } from "@/lib/navigation";
import type { DailyVerse } from "@/lib/daily-verse";

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex flex-col px-2 py-1 leading-tight"
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-clay-600">
        Молодёжный православный форум
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight text-sand-900">
        «Истина»
      </span>
    </Link>
  );
}

function SidebarLink({
  item,
  onNavigate,
}: {
  item: NavLink;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const Icon: LucideIcon = item.icon;
  const active =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-clay-100 text-clay-800"
          : "text-sand-700 hover:bg-sand-100 hover:text-sand-900",
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function NavGroup({
  title,
  items,
  onNavigate,
}: {
  title?: string;
  items: NavLink[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {title ? (
        <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-sand-500">
          {title}
        </p>
      ) : null}
      {items.map((item) => (
        <SidebarLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function SidebarContent({
  dailyVerse,
  onNavigate,
}: {
  dailyVerse: DailyVerse;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col gap-6 p-4">
      <Brand onNavigate={onNavigate} />
      <nav className="flex flex-col gap-6">
        <NavGroup title="Основное" items={primaryNav} onNavigate={onNavigate} />
        <NavGroup title="Рубрики" items={rubrics} onNavigate={onNavigate} />
        <NavGroup title="Полезное" items={usefulLinks} onNavigate={onNavigate} />
      </nav>
      <div className="mt-auto border-t border-sand-200 pt-4">
        <p className="px-1 text-xs font-semibold uppercase tracking-wide text-sand-500">
          Стих дня
        </p>
        <figure className="mt-2 border-l-2 border-clay-300 pl-3">
          <blockquote className="text-sm leading-relaxed text-sand-700">
            {dailyVerse.text}
          </blockquote>
          <figcaption className="mt-1.5 text-xs font-medium text-clay-600">
            {dailyVerse.reference}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  dailyVerse,
}: {
  children: ReactNode;
  dailyVerse: DailyVerse;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="min-h-dvh">
      {/* Десктопный сайдбар */}
      <aside className="hidden border-r border-sand-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:overflow-y-auto">
        <SidebarContent dailyVerse={dailyVerse} />
      </aside>

      {/* Мобильная верхняя панель - не sticky, прокручивается вместе со страницей */}
      <div className="flex h-14 items-center justify-between border-b border-sand-200 bg-sand-50 px-4 lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
          className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-100"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {/* Мобильное выезжающее меню - плавно выезжает слева */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          aria-hidden
          className={cn(
            "absolute inset-0 bg-sand-950/30 transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex shrink-0 justify-end p-2">
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть меню"
              className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-100"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <SidebarContent dailyVerse={dailyVerse} onNavigate={close} />
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="lg:pl-72">
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
