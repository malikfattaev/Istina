import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/password";

const prisma = new PrismaClient();

/**
 * Создаёт или обновляет администратора (вход по логину).
 * Запуск:
 *   ADMIN_USERNAME=admin ADMIN_PASSWORD=secret \
 *     pnpm --filter @vnls/db run create-admin
 */
async function main() {
  const username = process.env.ADMIN_USERNAME ?? process.argv[2];
  const password = process.env.ADMIN_PASSWORD ?? process.argv[3];
  const name = process.env.ADMIN_NAME ?? "Администратор";
  const title = process.env.ADMIN_TITLE ?? "Администратор";

  if (!username || !password) {
    console.error("Нужны ADMIN_USERNAME и ADMIN_PASSWORD.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { username },
    update: { passwordHash, role: Role.ADMIN, name, title },
    create: { username, passwordHash, role: Role.ADMIN, name, title },
  });

  console.info(`Администратор готов: ${user.username} (${user.role}).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
