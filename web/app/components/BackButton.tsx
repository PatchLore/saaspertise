import Link from "next/link";
import type { ReactNode } from "react";

type BackButtonProps = {
  href: string;
  children?: ReactNode;
};

export function BackButton({ href, children }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="mb-8 inline-block text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      {children ?? "← Back to home"}
    </Link>
  );
}
