-- CreateEnum
CREATE TYPE "MessageCategory" AS ENUM ('PRAYER', 'HELP', 'DONATE', 'QUESTION', 'OTHER');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('NEW', 'READ');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "category" "MessageCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "prayerType" TEXT,
    "baptized" BOOLEAN,
    "names" TEXT,
    "body" TEXT,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_status_createdAt_idx" ON "Message"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");
