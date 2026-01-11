import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export function AffiliateLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
    >
      {children}
    </Link>
  );
}

