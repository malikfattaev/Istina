import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { prisma, verifyPassword, type Role } from "@vnls/db";

const COOKIE = "istina_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 дней
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "");

export type SessionUser = {
  id: string;
  username: string;
  name: string | null;
  title: string | null;
  role: Role;
};

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({
    username: user.username,
    name: user.name,
    title: user.title,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      username: payload.username as string,
      name: (payload.name as string | null) ?? null,
      title: (payload.title as string | null) ?? null,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Проверяет логин + пароль по базе. */
export async function authenticate(
  username: string,
  password: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user?.passwordHash) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    title: user.title,
    role: user.role,
  };
}
