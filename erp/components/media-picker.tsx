"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Loader2, X } from "lucide-react";
import { cn } from "@istina/ui";
import type { MediaItem } from "@/lib/media";
import { uploadFile } from "@/lib/upload-client";

const btn =
  "inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm font-medium text-sand-800 transition-colors hover:bg-sand-50";

export function MediaPicker({
  value,
  onChange,
  mediaItems,
}: {
  value: string;
  onChange: (path: string) => void;
  mediaItems: MediaItem[];
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(mediaItems);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const media = await uploadFile(file);
      setItems((prev) => [media, ...prev]);
      onChange(media.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <div className="mb-3 overflow-hidden rounded-xl border border-sand-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Обложка" className="h-44 w-full object-cover" />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <label className={btn}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Загрузка...
            </>
          ) : (
            "Загрузить с компа"
          )}
        </label>
        <button type="button" onClick={() => setOpen(true)} className={btn}>
          Выбрать из медиа
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
          >
            Убрать
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-sand-950/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col rounded-2xl border border-sand-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-sand-200 p-4">
              <h3 className="font-serif text-lg font-semibold text-sand-900">
                Медиатека
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="rounded-lg p-1.5 text-sand-500 transition-colors hover:bg-sand-100"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="py-8 text-center text-sand-500">
                  В медиатеке пока пусто. Загрузите файл кнопкой выше.
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(item.path);
                          setOpen(false);
                        }}
                        className={cn(
                          "block w-full overflow-hidden rounded-xl border transition-colors",
                          value === item.path
                            ? "border-clay-400 ring-2 ring-clay-200"
                            : "border-sand-200 hover:border-clay-300",
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.path}
                          alt={item.filename}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
