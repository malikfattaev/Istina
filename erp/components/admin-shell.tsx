"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@vnls/ui";
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
  badge,
  onNavigate,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
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
      {badge && badge > 0 ? (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1.5 text-xs font-semibold text-white">
          {badge}
        </span>
      ) : null}
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
  newMessages,
  onNavigate,
}: {
  user: ShellUser;
  categories: Category[];
  newMessages: number;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex min-h-full flex-col gap-6 p-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center px-2 py-1"
      >
        <span className="text-base font-semibold leading-snug tracking-tight text-sand-900">
          ПМК во имя святых мучениц Веры, Надежды, Любови и матери их Софии
        </span>
      </Link>

      <nav className="flex flex-col gap-6">
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
            href="/messages"
            icon={Mail}
            label="Письма"
            badge={newMessages}
            onNavigate={onNavigate}
          />
          <SidebarLink
            href="/media"
            icon={Images}
            label="Медиа"
            onNavigate={onNavigate}
          />
          <SidebarLink
            href="/employees"
            icon={Users}
            label="Команда"
            onNavigate={onNavigate}
          />
        </NavGroup>
      </nav>

      <div className="mt-auto border-t border-sand-200 pt-3">
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
  newMessages,
  children,
}: {
  user: ShellUser;
  categories: Category[];
  newMessages: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="min-h-dvh">
      <aside className="hidden border-r border-sand-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:overflow-y-auto">
        <SidebarContent
          user={user}
          categories={categories}
          newMessages={newMessages}
        />
      </aside>

      <div className="flex h-14 items-center justify-between border-b border-sand-200 bg-sand-50 px-4 lg:hidden">
        <Link href="/" className="flex min-w-0 items-center">
          <span className="truncate font-semibold text-sand-900">
            ПМК во имя святых мучениц Веры, Надежды, Любови и матери их Софии
          </span>
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
            <SidebarContent
              user={user}
              categories={categories}
              newMessages={newMessages}
              onNavigate={close}
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-dvh flex-col lg:pl-72">
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
