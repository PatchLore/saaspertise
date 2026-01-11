import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export function AffiliateLink({ href, children }: Props) {
  // Don't render if href is missing, empty, or placeholder
  if (!href || href === "#" || href.trim() === "") {
    return null;
  }

  // Avoid client-side refreshes / internal navigation due to malformed URLs
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
    >
      {children}
    </a>
  );
}

