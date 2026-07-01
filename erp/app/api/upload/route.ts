import { NextResponse } from "next/server";
import { imageSize } from "image-size";
import { prisma } from "@vnls/db";
import { getSession } from "@/lib/auth";
import {
  buildKey,
  isStorageConfigured,
  publicPath,
  putObject,
} from "@/lib/storage";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 МБ
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 МБ
const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml",
];
const VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
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
  const isImage = IMAGE_TYPES.includes(file.type);
  const isVideo = VIDEO_TYPES.includes(file.type);
  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "Только изображения или видео (MP4, WebM, MOV)" },
      { status: 400 },
    );
  }
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `Файл больше ${Math.round(maxBytes / 1024 / 1024)} МБ` },
      { status: 400 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  let width: number | null = null;
  let height: number | null = null;
  if (isImage && file.type !== "image/svg+xml") {
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
