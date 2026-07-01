import { cn } from "@vnls/ui";

export function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-8", className)}>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-sand-900 sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl leading-relaxed text-sand-700">
          {description}
        </p>
      ) : null}
    </header>
  );
}
