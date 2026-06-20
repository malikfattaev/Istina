import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Role, prisma } from "@istina/db";
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

export default async function EmployeesPage() {
  const session = await getSession();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-sand-900">
            Сотрудники
          </h1>
          <p className="mt-1 text-sand-600">Учётные записи и доступ к ERP.</p>
        </div>
        <AddEmployeeModal />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sand-200 bg-white">
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
              const displayName = user.name ?? user.username;
              return (
                <tr
                  key={user.id}
                  className="border-b border-sand-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
                          user.username,
                        )}`}
                      >
                        {initials(displayName)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-sand-900">
                          {displayName}
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
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/employees/${user.id}`}
                        aria-label="Редактировать"
                        className="rounded-lg border border-sand-200 p-2 text-sand-600 transition-colors hover:border-clay-300 hover:text-clay-700"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </Link>
                      {isMe ? null : (
                        <form action={deleteEmployee}>
                          <input type="hidden" name="id" value={user.id} />
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
