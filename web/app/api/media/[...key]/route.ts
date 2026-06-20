import { NextResponse } from "next/server";
import { getObject } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Прокси к приватному бакету: отдаёт изображение по ключу.
 * Бакет закрыт, поэтому объект читается на сервере (подписанный запрос)
 * и стримится клиенту с долгим кешем.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = (key ?? []).map(decodeURIComponent).join("/");
  if (!objectKey) {
    return new NextResponse("Not found", { status: 404 });
  }

  const obj = await getObject(objectKey);
  if (!obj) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(obj.body, {
    headers: {
      "Content-Type": obj.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(obj.contentLength
        ? { "Content-Length": String(obj.contentLength) }
        : {}),
    },
  });
}
