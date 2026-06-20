import { NextResponse } from "next/server";
import { createMessage } from "@/lib/messages";

// Приём обращений с формы «Контакты». Обычный API-роут (без слоя Server Actions),
// чтобы надёжно работать за прокси.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  const result = await createMessage((input ?? {}) as Record<string, never>);
  return NextResponse.json(result, { status: "ok" in result ? 200 : 400 });
}
