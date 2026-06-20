import {
  Calendar,
  Church,
  FileText,
  HeartHandshake,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

/**
 * Тематическая рубрика со статьями. Единый источник правды:
 * используется и в навигации, и на страницах рубрик.
 */
export type Rubric = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const articleRubrics: Rubric[] = [
  {
    slug: "novosti",
    title: "Новости",
    description: "Жизнь форума и новости собора.",
    icon: Newspaper,
  },
  {
    slug: "stati",
    title: "Статьи",
    description: "Богословие, жития святых, ответы пастырей.",
    icon: FileText,
  },
  {
    slug: "sobytiya",
    title: "События",
    description: "Анонсы встреч и мероприятий.",
    icon: Calendar,
  },
  {
    slug: "pomoshch",
    title: "Помощь",
    description: "Статьи о тех, кому нужна помощь.",
    icon: HeartHandshake,
  },
  {
    slug: "hramy",
    title: "Храмы",
    description: "Храмы, при которых действуют молодёжные православные форумы.",
    icon: Church,
  },
];

const bySlug = new Map(articleRubrics.map((rubric) => [rubric.slug, rubric]));

export function getRubric(slug: string): Rubric | undefined {
  return bySlug.get(slug);
}

export function rubricHref(slug: string): string {
  return `/forum/${slug}`;
}
