import { NextResponse } from "next/server";
import { prisma } from "@istina/db";

// ВРЕМЕННЫЙ диагностический эндпоинт - проверяет доступ к модели Message в проде.
// Удалить после диагностики формы контактов.
export const dynamic = "force-dynamic";

export async function GET() {
  const out: Record<string, unknown> = {};
  try {
    out.hasMessageDelegate = typeof (prisma as { message?: unknown }).message;
    out.messageCount = await prisma.message.count();
    out.ok = true;
  } catch (e) {
    const err = e as { name?: string; message?: string; code?: string };
    out.ok = false;
    out.errorName = err.name;
    out.errorMessage = err.message;
    out.errorCode = err.code;
  }
  return NextResponse.json(out);
}
