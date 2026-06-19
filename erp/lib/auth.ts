import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { prisma, verifyPassword, type Role } from "@istina/db";

const COOKIE = "istina_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 дней
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "");

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

/** Подписывает JWT и кладёт его в httpOnly-cookie. Вызывается из server action. */
export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
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

/** Читает и проверяет сессию из cookie. Возвращает null, если её нет/невалидна. */
export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: payload.email as string,
      name: (payload.name as string | null) ?? null,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** Гарантирует наличие сессии; иначе редирект на /login. */
export async function requireAdmin(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Проверяет email + пароль по базе. */
export async function authenticate(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return { id: user.id, email: user.email, name: user.name, role: user.role };
}
