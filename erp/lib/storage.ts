import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT ?? "";
const region = process.env.S3_REGION ?? "auto";
const bucket = process.env.S3_BUCKET ?? "";
const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? "";

/** Настроено ли S3-хранилище (есть ли все переменные окружения). */
export function isStorageConfigured(): boolean {
  return Boolean(endpoint && bucket && accessKeyId && secretAccessKey);
}

let client: S3Client | null = null;
function s3(): S3Client {
  if (!client) {
    client = new S3Client({
      region,
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: false,
    });
  }
  return client;
}

/** Строит уникальный ключ объекта в папке media из имени файла. */
export function buildKey(filename: string): string {
  const safe =
    filename
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(-60) || "file";
  const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return `media/${unique}-${safe}`;
}

/** Относительный путь, по которому объект отдаёт прокси `/api/media/[...key]`. */
export function publicPath(key: string): string {
  return `/api/media/${key}`;
}

export async function putObject(
  key: string,
  body: Uint8Array,
  contentType: string,
): Promise<void> {
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
}

export type StoredObject = {
  body: ReadableStream;
  contentType: string;
  contentLength?: number;
};

export async function getObject(key: string): Promise<StoredObject | null> {
  if (!isStorageConfigured()) return null;
  try {
    const res = await s3().send(
      new GetObjectCommand({ Bucket: bucket, Key: key }),
    );
    if (!res.Body) return null;
    return {
      body: res.Body.transformToWebStream(),
      contentType: res.ContentType ?? "application/octet-stream",
      contentLength: res.ContentLength,
    };
  } catch {
    return null;
  }
}

export async function deleteObject(key: string): Promise<void> {
  await s3().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
