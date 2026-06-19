import {
  Calendar,
  FileText,
  FolderOpen,
  HeartHandshake,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  novosti: Newspaper,
  stati: FileText,
  sobytiya: Calendar,
  pomoshch: HeartHandshake,
};

export function rubricIcon(slug: string): LucideIcon {
  return icons[slug] ?? FolderOpen;
}
