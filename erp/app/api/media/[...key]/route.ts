import { NextResponse } from "next/server";
import { getObject } from "@/lib/storage";

export const runtime = "nodejs";

/** Прокси к приватному бакету: отдаёт файл по ключу (для превью в админке). */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = (key ?? []).map(decodeURIComponent).join("/");
  if (!objectKey) {
    return new NextResponse("Not found", { status: 404 });
  }

  const range = request.headers.get("range") ?? undefined;
  const obj = await getObject(objectKey, range);
  if (!obj) {
    return new NextResponse("Not found", { status: 404 });
  }

  const headers: Record<string, string> = {
    "Content-Type": obj.contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
  };
  if (obj.contentLength) headers["Content-Length"] = String(obj.contentLength);
  if (obj.contentRange) headers["Content-Range"] = obj.contentRange;

  return new NextResponse(obj.body, {
    status: obj.contentRange ? 206 : 200,
    headers,
  });
}
