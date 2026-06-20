import type { MediaItem } from "./media";

// Растровые изображения, которые конвертируем в WebP ради экономии места.
// GIF (анимация), SVG (вектор) и уже-WebP не трогаем.
const CONVERTIBLE = ["image/jpeg", "image/png", "image/bmp", "image/avif"];

/**
 * Конвертирует изображение в WebP прямо в браузере (через canvas).
 * Если формат неподходящий или браузер не умеет webp-экспорт - возвращает исходный файл.
 */
async function toWebp(file: File): Promise<File> {
  if (!CONVERTIBLE.includes(file.type) || typeof document === "undefined") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.85),
    );
    // Браузер без webp-экспорта вернёт png - тогда оставляем оригинал.
    if (!blob || blob.type !== "image/webp") return file;

    const name = file.name.replace(/\.[^./\\]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

/** Загружает один файл в медиатеку (через /api/upload). Изображения - в WebP. */
export async function uploadFile(file: File): Promise<MediaItem> {
  const prepared = await toWebp(file);
  const data = new FormData();
  data.append("file", prepared);
  const res = await fetch("/api/upload", { method: "POST", body: data });
  const json = (await res.json()) as MediaItem & { error?: string };
  if (!res.ok) {
    throw new Error(json.error ?? "Не удалось загрузить файл");
  }
  return json;
}
