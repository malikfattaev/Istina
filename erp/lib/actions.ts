"use server";

import { redirect } from "next/navigation";
import { destroySession } from "./auth";

export async function signOut(): Promise<void> {
  await destroySession();
  redirect("/login");
}
