import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@istina/db";
import { EmployeeForm } from "@/components/employee-form";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/employees"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Команда
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Редактирование сотрудника
      </h1>
      <div className="mt-6">
        <EmployeeForm
          employee={{
            id: user.id,
            name: user.name ?? "",
            title: user.title ?? "",
            username: user.username,
            role: user.role,
          }}
        />
      </div>
    </div>
  );
}
