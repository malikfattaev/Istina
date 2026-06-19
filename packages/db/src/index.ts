import { PrismaClient } from "@prisma/client";

/**
 * Единственный экземпляр PrismaClient на процесс.
 * В dev-режиме клиент кешируется в globalThis, чтобы hot-reload Next.js
 * не плодил новые подключения к базе.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export * from "@prisma/client";
export { hashPassword, verifyPassword } from "./password";
