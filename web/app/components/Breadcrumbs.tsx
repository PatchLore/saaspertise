import Link from "next/link";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  current?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  includeSchema?: boolean;
};

export function Breadcrumbs({ items, includeSchema = true }: BreadcrumbsProps) {
  const schemaItems = items
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: typeof item.label === "string" ? item.label : undefined,
      item: item.href ? item.href : undefined,
    }))
    .filter((item) => item.name);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !item.current ? (
                <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  {item.label}
                </Link>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-100">{item.label}</span>
              )}
              {index < items.length - 1 && <span aria-hidden>/</span>}
            </li>
          ))}
        </ol>
      </nav>
      {includeSchema && schemaItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: schemaItems,
            }),
          }}
        />
      )}
    </>
  );
}
