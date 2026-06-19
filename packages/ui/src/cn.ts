import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind, корректно разрешая конфликты
 * (последний выигрывает). Стандартная утилита для всех компонентов.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
