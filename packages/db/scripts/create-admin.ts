import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/password";

const prisma = new PrismaClient();

/**
 * Создаёт или обновляет администратора.
 * Запуск:
 *   ADMIN_EMAIL=mail@istina.uz ADMIN_PASSWORD=secret \
 *     pnpm --filter @istina/db run create-admin
 */
async function main() {
  const email = process.env.ADMIN_EMAIL ?? process.argv[2];
  const password = process.env.ADMIN_PASSWORD ?? process.argv[3];
  const name = process.env.ADMIN_NAME ?? process.argv[4] ?? "Администратор";

  if (!email || !password) {
    console.error(
      "Нужны ADMIN_EMAIL и ADMIN_PASSWORD (через env или аргументы).",
    );
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: Role.ADMIN, name },
    create: { email, passwordHash, role: Role.ADMIN, name },
  });

  console.info(`Администратор готов: ${user.email} (${user.role}).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
