import { Role, prisma } from "@istina/db";
import { AddAdminForm } from "./admin-form";
import { deleteAdmin } from "./actions";

const roleLabel: Record<Role, string> = {
  ADMIN: "Администратор",
  EDITOR: "Редактор",
};

export default async function AdminsPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-sand-900">
        Администраторы
      </h1>
      <p className="mt-1 text-sand-600">
        Сотрудники с доступом к панели управления.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-sand-900">
                  {user.name ?? user.email}
                </p>
                <p className="truncate text-sm text-sand-500">
                  {user.email}
                  <span className="mx-1.5">·</span>
                  {roleLabel[user.role]}
                </p>
              </div>
              <form action={deleteAdmin}>
                <input type="hidden" name="id" value={user.id} />
                <button
                  type="submit"
                  className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Удалить
                </button>
              </form>
            </div>
          ))}
        </div>

        <AddAdminForm />
      </div>
    </div>
  );
}
