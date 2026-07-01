import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Role, prisma } from "@vnls/db";
import { getSession } from "@/lib/auth";
import { deleteEmployee } from "@/lib/employee-actions";
import { avatarColor, initials } from "@/lib/avatar";
import { AddEmployeeModal } from "@/components/add-employee-modal";

const roleLabel: Record<Role, string> = {
  ADMIN: "Администратор",
  EDITOR: "Редактор",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function Avatar({ username, name }: { username: string; name: string | null }) {
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
        username,
      )}`}
    >
      {initials(name ?? username)}
    </span>
  );
}

function RowActions({ userId, isMe }: { userId: string; isMe: boolean }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/employees/${userId}`}
        aria-label="Редактировать"
        className="rounded-lg border border-sand-200 p-2 text-sand-600 transition-colors hover:border-clay-300 hover:text-clay-700"
      >
        <Pencil className="h-4 w-4" aria-hidden />
      </Link>
      {isMe ? null : (
        <form action={deleteEmployee}>
          <input type="hidden" name="id" value={userId} />
          <button
            type="submit"
            aria-label="Удалить"
            className="rounded-lg border border-sand-200 p-2 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
          </button>
        </form>
      )}
    </div>
  );
}

export default async function EmployeesPage() {
  const session = await getSession();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-semibold text-sand-900 sm:text-2xl">
            Команда
          </h1>
          <p className="mt-1 text-sm text-sand-600 sm:text-base">
            Учётные записи и доступ к ERP.
          </p>
        </div>
        <AddEmployeeModal />
      </div>

      {/* Мобильная версия - карточки */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {users.map((user) => {
          const isMe = session?.id === user.id;
          return (
            <div
              key={user.id}
              className="rounded-2xl border border-sand-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar username={user.username} name={user.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sand-900">
                    {user.name ?? user.username}
                  </p>
                  <p className="text-xs text-sand-500">{roleLabel[user.role]}</p>
                </div>
                <RowActions userId={user.id} isMe={isMe} />
              </div>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-sand-100 pt-3 text-sm">
                <dt className="text-sand-500">Должность</dt>
                <dd className="text-sand-700">{user.title ?? "-"}</dd>
                <dt className="text-sand-500">Логин</dt>
                <dd className="text-sand-600">{user.username}</dd>
                <dt className="text-sand-500">Добавлен</dt>
                <dd className="text-sand-600">{formatDate(user.createdAt)}</dd>
              </dl>
            </div>
          );
        })}
      </div>

      {/* Десктоп - таблица */}
      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-sand-200 bg-white md:block">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-sand-200 text-xs uppercase tracking-wide text-sand-500">
              <th className="px-5 py-3 font-semibold">Имя</th>
              <th className="px-5 py-3 font-semibold">Должность</th>
              <th className="px-5 py-3 font-semibold">Логин</th>
              <th className="px-5 py-3 font-semibold">Добавлен</th>
              <th className="px-5 py-3 text-right font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isMe = session?.id === user.id;
              return (
                <tr
                  key={user.id}
                  className="border-b border-sand-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar username={user.username} name={user.name} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-sand-900">
                          {user.name ?? user.username}
                        </p>
                        <p className="text-xs text-sand-500">
                          {roleLabel[user.role]}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-sand-700">
                    {user.title ?? "-"}
                  </td>
                  <td className="px-5 py-4 text-sm text-sand-600">
                    {user.username}
                  </td>
                  <td className="px-5 py-4 text-sm text-sand-600">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <RowActions userId={user.id} isMe={isMe} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
