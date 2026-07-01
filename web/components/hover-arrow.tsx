import { ArrowRight } from "lucide-react";
import { cn } from "@vnls/ui";

/**
 * Стрелка, которая выезжает и проявляется при наведении на родителя с классом
 * `group`. Единый акцент для всех ссылок-карточек и кнопок «читать дальше».
 */
export function HoverArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={cn(
        "h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
        className,
      )}
    />
  );
}
