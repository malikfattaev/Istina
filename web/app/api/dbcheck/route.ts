import { NextResponse } from "next/server";
import { MessageCategory, prisma } from "@istina/db";

// ВРЕМЕННЫЙ диагностический эндпоинт - проверяет ЗАПИСЬ модели Message в проде.
// Удалить после диагностики формы контактов.
export const dynamic = "force-dynamic";

export async function GET() {
  const out: Record<string, unknown> = {};
  try {
    out.messageCount = await prisma.message.count();
    // Пробуем записать (и сразу удалить) - проверка прав на запись.
    const created = await prisma.message.create({
      data: {
        category: MessageCategory.OTHER,
        name: "__dbcheck__",
        contact: "__dbcheck__",
        body: "diagnostic",
      },
    });
    await prisma.message.delete({ where: { id: created.id } });
    out.write = "ok";
    out.ok = true;
  } catch (e) {
    const err = e as { name?: string; message?: string; code?: string };
    out.ok = false;
    out.write = "FAILED";
    out.errorName = err.name;
    out.errorMessage = err.message;
    out.errorCode = err.code;
  }
  return NextResponse.json(out);
}
