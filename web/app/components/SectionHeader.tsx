import type { ReactNode } from "react";

type SectionHeaderProps = {
  icon: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({
  icon,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/[.08] bg-white/70 px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm dark:border-white/[.12] dark:bg-white/5 dark:text-zinc-200">
          <span aria-hidden>{icon}</span>
          <span>{title}</span>
        </div>
        {description && (
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
