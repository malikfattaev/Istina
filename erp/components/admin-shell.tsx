"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@istina/ui";
import { signOut } from "@/lib/actions";
import { rubricIcon } from "@/lib/rubric-icons";

type Category = { id: string; slug: string; name: string };

type ShellUser = {
  username: string;
  name: string | null;
  title: string | null;
};

function SidebarLink({
  href,
  icon: Icon,
  label,
  onNavigate,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
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
      <span className="truncate">{label}</span>
    </Link>
  );
}

function NavGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {title ? (
        <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-sand-500">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function SidebarContent({
  user,
  categories,
  onNavigate,
}: {
  user: ShellUser;
  categories: Category[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-2 py-1"
      >
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-clay-500 font-serif text-lg text-white"
        >
          И
        </span>
        <span className="text-lg font-semibold tracking-tight text-sand-900">
          Истина ERP
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <NavGroup title="Основное">
          <SidebarLink
            href="/"
            icon={LayoutDashboard}
            label="Обзор"
            onNavigate={onNavigate}
          />
        </NavGroup>

        <NavGroup title="Разделы">
          {categories.map((category) => (
            <SidebarLink
              key={category.id}
              href={`/r/${category.slug}`}
              icon={rubricIcon(category.slug)}
              label={category.name}
              onNavigate={onNavigate}
            />
          ))}
        </NavGroup>

        <NavGroup title="Управление">
          <SidebarLink
            href="/employees"
            icon={Users}
            label="Сотрудники"
            onNavigate={onNavigate}
          />
        </NavGroup>
      </nav>

      <div className="border-t border-sand-200 pt-3">
        <p className="truncate px-3 text-sm font-medium text-sand-800">
          {user.name ?? user.username}
        </p>
        <p className="truncate px-3 text-xs text-sand-500">
          {user.title ?? `@${user.username}`}
        </p>
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
  );
}

export function AdminShell({
  user,
  categories,
  children,
}: {
  user: ShellUser;
  categories: Category[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="min-h-dvh">
      <aside className="hidden border-r border-sand-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent user={user} categories={categories} />
      </aside>

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-sand-200 bg-sand-50/90 px-4 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-500 font-serif text-white"
          >
            И
          </span>
          <span className="font-semibold text-sand-900">Истина ERP</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
          className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-100"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-sand-950/30" onClick={close} aria-hidden />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть меню"
                className="rounded-lg p-2 text-sand-700 transition-colors hover:bg-sand-100"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <SidebarContent user={user} categories={categories} onNavigate={close} />
          </div>
        </div>
      ) : null}

      <div className="flex min-h-dvh flex-col lg:pl-72">
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
