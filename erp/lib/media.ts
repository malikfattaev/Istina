import { prisma } from "@vnls/db";

export type MediaItem = {
  id: string;
  path: string;
  filename: string;
  contentType: string;
  size: number;
  width: number | null;
  height: number | null;
  createdAt: string; // ISO
};

export type MediaStats = {
  total: number;
  images: number;
  documents: number;
  bytes: number;
};

/** Последние файлы медиатеки (метаданные из БД). */
export async function listMedia(limit = 300): Promise<MediaItem[]> {
  const rows = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map((m) => ({
    id: m.id,
    path: `/api/media/${m.key}`,
    filename: m.filename,
    contentType: m.contentType,
    size: m.size,
    width: m.width,
    height: m.height,
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function mediaStats(): Promise<MediaStats> {
  const [total, images, agg] = await Promise.all([
    prisma.media.count(),
    prisma.media.count({ where: { contentType: { startsWith: "image/" } } }),
    prisma.media.aggregate({ _sum: { size: true } }),
  ]);
  return {
    total,
    images,
    documents: total - images,
    bytes: agg._sum.size ?? 0,
  };
}
