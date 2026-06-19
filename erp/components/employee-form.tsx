"use client";

import { useActionState } from "react";
import { Button } from "@istina/ui";
import {
  createEmployee,
  updateEmployee,
  type EmployeeFormState,
} from "@/lib/employee-actions";

export type EmployeeData = {
  id: string;
  name: string;
  title: string;
  username: string;
  role: "ADMIN" | "EDITOR";
};

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const label = "mb-1.5 block text-sm font-medium text-sand-800";

export function EmployeeForm({ employee }: { employee?: EmployeeData }) {
  const action = employee ? updateEmployee : createEmployee;
  const [state, formAction, pending] = useActionState<EmployeeFormState, FormData>(
    action,
    null,
  );

  return (
    <form
      action={formAction}
      className="max-w-lg rounded-2xl border border-sand-200 bg-white p-6 sm:p-8"
    >
      {employee ? <input type="hidden" name="id" value={employee.id} /> : null}

      <div className="flex flex-col gap-5">
        <div>
          <label className={label} htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={employee?.name ?? ""}
            className={field}
            placeholder="Иван Петров"
          />
        </div>

        <div>
          <label className={label} htmlFor="title">
            Должность (по желанию)
          </label>
          <input
            id="title"
            name="title"
            defaultValue={employee?.title ?? ""}
            className={field}
            placeholder="Редактор новостей"
          />
        </div>

        <div>
          <label className={label} htmlFor="username">
            Логин
          </label>
          <input
            id="username"
            name="username"
            required
            defaultValue={employee?.username ?? ""}
            className={field}
            placeholder="ivan"
            autoComplete="off"
          />
        </div>

        <div>
          <label className={label} htmlFor="password">
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required={!employee}
            minLength={6}
            className={field}
            placeholder={
              employee ? "Оставьте пустым, чтобы не менять" : "Минимум 6 символов"
            }
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className={label} htmlFor="role">
            Роль
          </label>
          <select
            id="role"
            name="role"
            defaultValue={employee?.role ?? "EDITOR"}
            className={field}
          >
            <option value="EDITOR">Редактор</option>
            <option value="ADMIN">Администратор</option>
          </select>
        </div>

        {state?.error ? (
          <p className="text-sm text-red-600">{state.error}</p>
        ) : null}

        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </form>
  );
}
