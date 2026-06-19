-- Логин (username) и должность (title); email становится необязательным.

-- 1. username: добавляем как nullable, бэкфиллим из email, затем делаем обязательным.
ALTER TABLE "User" ADD COLUMN "username" TEXT;
UPDATE "User" SET "username" = split_part("email", '@', 1) WHERE "username" IS NULL;
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- 2. Должность.
ALTER TABLE "User" ADD COLUMN "title" TEXT;

-- 3. email больше не обязателен (вход теперь по логину).
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;

-- 4. Уникальный логин.
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
