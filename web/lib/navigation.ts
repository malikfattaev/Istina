import {
  BookOpen,
  CalendarDays,
  Cross,
  Flame,
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
    label: "Библия",
    href: "/bibliya",
    icon: BookOpen,
    description: "Ветхий и Новый Завет в Синодальном переводе",
  },
  {
    label: "Молитвы",
    href: "/molitvy",
    icon: Flame,
    description: "Утренние, вечерние и молитвы на каждый день",
  },
  {
    label: "Основы веры",
    href: "/osnovy",
    icon: Cross,
    description: "Кратко о главном: вера, Троица, Церковь, заповеди",
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
    label: "Календарь",
    href: "/prazdniki",
    icon: CalendarDays,
    description: "Православный календарь: праздники и память дня",
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
