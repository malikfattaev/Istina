import { listMedia, mediaStats } from "@/lib/media";
import { MediaLibrary } from "@/components/media-library";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const [items, stats] = await Promise.all([listMedia(), mediaStats()]);
  return <MediaLibrary initialItems={items} initialStats={stats} />;
}
