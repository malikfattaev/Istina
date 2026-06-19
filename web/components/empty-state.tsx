import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sand-100 text-clay-600">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 font-semibold text-sand-900">{title}</h2>
      {description ? (
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-sand-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
