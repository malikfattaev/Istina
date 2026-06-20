"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@istina/ui";
import { createEmployee, type EmployeeFormState } from "@/lib/employee-actions";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const label = "mb-1.5 block text-sm font-medium text-sand-800";

export function AddEmployeeModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Добавить сотрудника
      </button>
      {open ? <Dialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function Dialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<EmployeeFormState, FormData>(
    createEmployee,
    null,
  );

  useEffect(() => {
    if (state && "ok" in state && state.ok) {
      onClose();
      router.refresh();
    }
  }, [state, onClose, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-sand-950/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-sand-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-sand-900">
            Новый сотрудник
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="rounded-lg p-1.5 text-sand-500 transition-colors hover:bg-sand-100"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form action={formAction} className="mt-5 flex flex-col gap-5">
          <div>
            <label className={label} htmlFor="m-name">
              Имя
            </label>
            <input
              id="m-name"
              name="name"
              required
              className={field}
              placeholder="Иван Петров"
            />
          </div>
          <div>
            <label className={label} htmlFor="m-title">
              Должность (по желанию)
            </label>
            <input
              id="m-title"
              name="title"
              className={field}
              placeholder="Редактор новостей"
            />
          </div>
          <div>
            <label className={label} htmlFor="m-username">
              Логин
            </label>
            <input
              id="m-username"
              name="username"
              required
              autoComplete="off"
              className={field}
              placeholder="ivan"
            />
          </div>
          <div>
            <label className={label} htmlFor="m-password">
              Пароль
            </label>
            <input
              id="m-password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className={field}
              placeholder="Минимум 6 символов"
            />
          </div>
          <div>
            <label className={label} htmlFor="m-role">
              Роль
            </label>
            <select id="m-role" name="role" defaultValue="EDITOR" className={field}>
              <option value="EDITOR">Редактор</option>
              <option value="ADMIN">Администратор</option>
            </select>
          </div>

          {state && "error" in state ? (
            <p className="text-sm text-red-600">{state.error}</p>
          ) : null}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-sand-300 px-5 py-2.5 text-sm font-medium text-sand-700 transition-colors hover:bg-sand-50"
            >
              Отмена
            </button>
            <Button type="submit" disabled={pending}>
              {pending ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
