import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT ?? "";
const region = process.env.S3_REGION ?? "auto";
const bucket = process.env.S3_BUCKET ?? "";
const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? "";

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

export type StoredObject = {
  body: ReadableStream;
  contentType: string;
  contentLength?: number;
};

/** Читает объект из бакета по ключу. null - если хранилище не настроено или объекта нет. */
export async function getObject(key: string): Promise<StoredObject | null> {
  if (!endpoint || !bucket || !accessKeyId) return null;
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
