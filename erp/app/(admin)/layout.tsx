import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <AdminShell user={{ email: user.email, name: user.name }}>
      {children}
    </AdminShell>
  );
}
