import {
  BookOpen,
  CalendarDays,
  Home,
  Info,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { articleRubrics, rubricHref, type Rubric } from "./rubrics";

export type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

function rubricLink(rubric: Rubric): NavLink {
  return {
    label: rubric.title,
    href: rubricHref(rubric.slug),
    icon: rubric.icon,
    description: rubric.description,
  };
}

function rubricBySlug(slug: string): NavLink {
  const rubric = articleRubrics.find((item) => item.slug === slug);
  if (!rubric) {
    throw new Error(`Неизвестная рубрика: ${slug}`);
  }
  return rubricLink(rubric);
}

/** Основная навигация. */
export const primaryNav: NavLink[] = [
  {
    label: "Главная",
    href: "/",
    icon: Home,
    description: "Быстрые ссылки и последние публикации",
  },
  {
    label: "Евангелие",
    href: "/evangelie",
    icon: BookOpen,
    description: "Четвероевангелие в Синодальном переводе",
  },
];

/** Рубрики - тематические разделы с материалами. */
export const rubrics: NavLink[] = [
  rubricBySlug("novosti"),
  rubricBySlug("sobytiya"),
  rubricBySlug("stati"),
  rubricBySlug("hramy"),
];

/** Полезные разделы. */
export const usefulLinks: NavLink[] = [
  rubricBySlug("pomoshch"),
  {
    label: "Праздники",
    href: "/prazdniki",
    icon: CalendarDays,
    description: "Православный календарь праздников",
  },
  {
    label: "Контакты",
    href: "/contacts",
    icon: Mail,
    description: "Как с нами связаться",
  },
  {
    label: "О форуме",
    href: "/about",
    icon: Info,
    description: "Кто мы и чем занимаемся",
  },
];
