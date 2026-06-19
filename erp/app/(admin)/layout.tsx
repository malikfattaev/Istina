import { prisma } from "@istina/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
    select: { id: true, slug: true, name: true },
  });

  return (
    <AdminShell
      user={{ username: user.username, name: user.name, title: user.title }}
      categories={categories}
    >
      {children}
    </AdminShell>
  );
}
