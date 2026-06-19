import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmployeeForm } from "@/components/employee-form";

export default function NewEmployeePage() {
  return (
    <div>
      <Link
        href="/employees"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:text-clay-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Сотрудники
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-semibold text-sand-900">
        Новый сотрудник
      </h1>
      <div className="mt-6">
        <EmployeeForm />
      </div>
    </div>
  );
}
