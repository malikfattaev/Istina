import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Начальные рубрики портала. Скрипт идемпотентен - повторный запуск
 * не создаёт дубликатов (upsert по уникальному slug).
 */
const categories = [
  {
    slug: "novosti",
    name: "Новости",
    description: "Жизнь приходов, события епархии, важные объявления.",
    position: 1,
  },
  {
    slug: "sobytiya",
    name: "События",
    description: "Анонсы встреч, паломничеств и мероприятий.",
    position: 2,
  },
  {
    slug: "stati",
    name: "Статьи",
    description: "Богословие, жития святых, ответы пастырей.",
    position: 3,
  },
  {
    slug: "pomoshch",
    name: "Помощь",
    description: "Статьи о людях, которым нужна помощь и поддержка.",
    position: 4,
  },
  {
    slug: "hramy",
    name: "Храмы",
    description: "Православные храмы Ташкента: список и краткая история.",
    position: 5,
  },
] as const;

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        position: category.position,
      },
      create: category,
    });
  }

  console.info(`Сидинг завершён: рубрик - ${categories.length}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
