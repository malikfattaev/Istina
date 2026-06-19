"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession } from "@/lib/auth";

export type LoginState = { error: string } | null;

export async function signInAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Введите логин и пароль." };
  }

  const user = await authenticate(username, password);
  if (!user) {
    return { error: "Неверный логин или пароль." };
  }

  await createSession(user);
  redirect("/");
}
