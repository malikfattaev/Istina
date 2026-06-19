"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@istina/ui";
import { createAdmin, type AdminFormState } from "./actions";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";
const label = "mb-1.5 block text-sm font-medium text-sand-800";

export function AddAdminForm() {
  const [state, action, pending] = useActionState<AdminFormState, FormData>(
    createAdmin,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-2xl border border-sand-200 bg-white p-6"
    >
      <h2 className="font-semibold text-sand-900">Добавить сотрудника</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className={label} htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="editor@istina.uz"
          />
        </div>
        <div>
          <label className={label} htmlFor="admin-name">
            Имя (по желанию)
          </label>
          <input id="admin-name" name="name" className={field} placeholder="Имя" />
        </div>
        <div>
          <label className={label} htmlFor="admin-password">
            Пароль
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            minLength={6}
            className={field}
            placeholder="Минимум 6 символов"
          />
        </div>
        <div>
          <label className={label} htmlFor="admin-role">
            Роль
          </label>
          <select id="admin-role" name="role" defaultValue="EDITOR" className={field}>
            <option value="EDITOR">Редактор</option>
            <option value="ADMIN">Администратор</option>
          </select>
        </div>

        {state && "error" in state ? (
          <p className="text-sm text-red-600">{state.error}</p>
        ) : null}
        {state && "ok" in state ? (
          <p className="text-sm text-clay-600">Сотрудник добавлен.</p>
        ) : null}

        <div>
          <Button type="submit" disabled={pending}>
            {pending ? "Добавление..." : "Добавить"}
          </Button>
        </div>
      </div>
    </form>
  );
}
