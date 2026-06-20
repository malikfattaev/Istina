import { prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";

// Все страницы админки рендерятся по запросу (используют сессию и БД),
// поэтому не пытаемся пререндерить их на этапе сборки.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  const [categories, newMessages] = await Promise.all([
    prisma.category.findMany({
      orderBy: { position: "asc" },
      select: { id: true, slug: true, name: true },
    }),
    prisma.message.count({ where: { status: "NEW" } }),
  ]);

  return (
    <AdminShell
      user={{ username: user.username, name: user.name, title: user.title }}
      categories={categories}
      newMessages={newMessages}
    >
      {children}
    </AdminShell>
  );
}
