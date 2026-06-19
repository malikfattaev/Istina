import bcrypt from "bcryptjs";

const ROUNDS = 12;

/** Хеширует пароль для хранения в User.passwordHash. */
export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

/** Сверяет введённый пароль с хешем из базы. */
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
