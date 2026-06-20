import { NextResponse } from "next/server";
import { submitMessage } from "@/lib/message-actions";

// ВРЕМЕННЫЙ диагностический эндпоинт - вызывает РОВНО код формы (submitMessage)
// с donate-payload, чтобы воспроизвести путь отправки. Удалить после диагностики.
export const dynamic = "force-dynamic";

export async function GET() {
  const result = await submitMessage({
    category: "donate",
    name: "__dbcheck__",
    contact: "+998000000000",
    prayerType: null,
    baptized: null,
    names: null,
    body: "diagnostic donate via submitMessage",
  });
  return NextResponse.json({ viaAction: result });
}
