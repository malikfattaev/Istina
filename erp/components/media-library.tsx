"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
} from "react";
import {
  ChevronDown,
  ImageOff,
  Loader2,
  Search,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { cn } from "@vnls/ui";
import type { MediaItem, MediaStats } from "@/lib/media";
import { deleteMedia } from "@/lib/media-actions";
import { formatBytes, formatDate } from "@/lib/format";
import { uploadFile } from "@/lib/upload-client";

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-sand-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-sand-900">{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-sand-500">{hint}</p> : null}
    </div>
  );
}

export function MediaLibrary({
  initialItems,
  initialStats,
}: {
  initialItems: MediaItem[];
  initialStats: MediaStats;
}) {
  const [items, setItems] = useState(initialItems);
  const [stats, setStats] = useState(initialStats);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const bump = (m: MediaItem, dir: 1 | -1) =>
    setStats((s) => {
      const isImg = m.contentType.startsWith("image/");
      return {
        total: s.total + dir,
        images: s.images + (isImg ? dir : 0),
        documents: s.documents + (isImg ? 0 : dir),
        bytes: s.bytes + dir * m.size,
      };
    });

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;
    setError("");
    for (const file of list) {
      setUploading((n) => n + 1);
      try {
        const media = await uploadFile(file);
        setItems((prev) => [media, ...prev]);
        bump(media, 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки");
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }, []);

  // Вставка из буфера (Cmd/Ctrl+V).
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) handleFiles(files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFiles]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  async function handleDelete(item: MediaItem) {
    if (!window.confirm(`Удалить «${item.filename}»? Действие необратимо.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    bump(item, -1);
    const res = await deleteMedia(item.id);
    if ("error" in res) setError(res.error);
  }

  const filtered = items
    .filter((i) => i.filename.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) =>
      sort === "new"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt),
    );

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-semibold text-sand-900">
          Медиа
        </h1>
        <p className="mt-1 text-sand-600">
          Картинки, видео и файлы сайта. Перетащи файл сюда, вставь из буфера
          (Cmd/Ctrl+V) или нажми кнопку.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Всего" value={String(stats.total)} />
        <StatCard label="Картинки" value={String(stats.images)} />
        <StatCard label="Видео и др." value={String(stats.documents)} />
        <StatCard label="Объём" value={formatBytes(stats.bytes)} />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-5 text-center transition-colors sm:p-8",
          dragOver ? "border-clay-400 bg-clay-50" : "border-sand-300 bg-white",
        )}
      >
        <UploadCloud className="h-7 w-7 text-clay-500" aria-hidden />
        <div>
          <p className="font-medium text-sand-800">
            Перетащи файлы сюда, вставь из буфера или нажми кнопку
          </p>
          <p className="mt-1 text-sm text-sand-500">
            Картинки до 10 МБ и видео до 50 МБ. Картинки сохраняются в WebP.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl bg-clay-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-600"
        >
          {uploading > 0 ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Загрузка ({uploading})
            </>
          ) : (
            "Выбрать файлы"
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по имени файла..."
            className="w-full rounded-xl border border-sand-300 bg-white py-2.5 pl-9 pr-4 text-sm text-sand-900 placeholder:text-sand-400 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30"
          />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "new" | "old")}
            className="w-full appearance-none rounded-xl border border-sand-300 bg-white py-2.5 pl-4 pr-10 text-sm text-sand-900 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-500/30"
          >
            <option value="new">Сначала новые</option>
            <option value="old">Сначала старые</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400"
            aria-hidden
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-sand-500">{filtered.length} файлов</p>

      {filtered.length === 0 ? (
        <div className="mt-3 flex flex-col items-center gap-2 rounded-2xl border border-sand-200 bg-white p-10 text-center text-sand-500">
          <ImageOff className="h-7 w-7" aria-hidden />
          <p>Файлов пока нет. Загрузите первый.</p>
        </div>
      ) : (
        <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-sand-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-sand-100">
                {item.contentType.startsWith("video/") ? (
                  <video
                    src={`${item.path}#t=0.1`}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full bg-sand-900 object-contain"
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.path}
                    alt={item.filename}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  aria-label="Удалить"
                  className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-600 opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-sand-900" title={item.filename}>
                  {item.filename}
                </p>
                <p className="mt-0.5 text-xs text-sand-500">
                  {formatBytes(item.size)}
                  {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
                </p>
                <p className="text-xs text-sand-400">{formatDate(item.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
