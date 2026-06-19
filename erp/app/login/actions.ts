"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession } from "@/lib/auth";

export type LoginState = { error: string } | null;

export async function signInAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Введите email и пароль." };
  }

  const user = await authenticate(email, password);
  if (!user) {
    return { error: "Неверный email или пароль." };
  }

  await createSession(user);
  redirect("/");
}
