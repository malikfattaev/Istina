import type { MediaItem } from "./media";

/** Загружает один файл в медиатеку (через /api/upload). Бросает с текстом ошибки. */
export async function uploadFile(file: File): Promise<MediaItem> {
  const data = new FormData();
  data.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: data });
  const json = (await res.json()) as MediaItem & { error?: string };
  if (!res.ok) {
    throw new Error(json.error ?? "Не удалось загрузить файл");
  }
  return json;
}
