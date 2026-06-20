import { NextResponse } from "next/server";
import { imageSize } from "image-size";
import { prisma } from "@istina/db";
import { getSession } from "@/lib/auth";
import {
  buildKey,
  isStorageConfigured,
  publicPath,
  putObject,
} from "@/lib/storage";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 МБ
const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
  }
  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: "Хранилище не настроено" },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (!IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Только изображения (JPEG, PNG, WebP, GIF, AVIF, SVG)" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл больше 10 МБ" }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  let width: number | null = null;
  let height: number | null = null;
  if (file.type !== "image/svg+xml") {
    try {
      const dim = imageSize(bytes);
      width = dim.width ?? null;
      height = dim.height ?? null;
    } catch {
      // размеры не критичны - оставляем null
    }
  }

  const key = buildKey(file.name);
  try {
    await putObject(key, bytes, file.type);
    const media = await prisma.media.create({
      data: {
        key,
        filename: file.name,
        contentType: file.type,
        size: file.size,
        width,
        height,
        uploadedById: session.id,
      },
    });
    return NextResponse.json({
      id: media.id,
      path: publicPath(media.key),
      filename: media.filename,
      contentType: media.contentType,
      size: media.size,
      width: media.width,
      height: media.height,
      createdAt: media.createdAt.toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Не удалось загрузить файл" },
      { status: 500 },
    );
  }
}
