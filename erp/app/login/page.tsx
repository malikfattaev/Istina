"use client";

import { useActionState } from "react";
import { Button } from "@istina/ui";
import { signInAction, type LoginState } from "./actions";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    signInAction,
    null,
  );

  return (
    <div className="flex min-h-dvh items-center justify-center bg-sand-100/60 p-4">
      <form
        action={action}
        className="w-full max-w-sm rounded-2xl border border-sand-200 bg-white p-8"
      >
        <div className="mb-6">
          <p className="text-lg font-semibold text-sand-900">Истина ERP</p>
          <p className="text-xs text-sand-500">Панель управления</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sand-800" htmlFor="login">
              Логин
            </label>
            <input
              id="login"
              name="login"
              type="text"
              required
              autoComplete="username"
              placeholder="admin"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sand-800" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={field}
            />
          </div>

          {state?.error ? (
            <p className="text-sm text-red-600">{state.error}</p>
          ) : null}

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Вход..." : "Войти"}
          </Button>
        </div>
      </form>
    </div>
  );
}
