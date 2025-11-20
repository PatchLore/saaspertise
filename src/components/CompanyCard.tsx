"use client";

import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

interface CompanyCardProps {
  name: string;
  description: string;
  category: string;
  logoUrl?: string | null;
  website?: string | null;
  href: string;
  fallbackLogo?: string;
}

const DEFAULT_LOGO = "https://saaspertise.com/default-logo.png";

function getClearbitLogo(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const url = new URL(website);
    return `https://logo.clearbit.com/${url.hostname}`;
  } catch {
    return null;
  }
}

export function CompanyCard({
  name,
  description,
  category,
  logoUrl,
  website,
  href,
  fallbackLogo = DEFAULT_LOGO,
}: CompanyCardProps) {
  const clearbitLogo = !logoUrl && website ? getClearbitLogo(website) : null;

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl h-[80px] mb-3 overflow-hidden">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={name}
            width={80}
            height={80}
            className="h-full w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (clearbitLogo) {
                target.src = clearbitLogo;
              } else {
                target.style.display = "none";
              }
            }}
          />
        ) : clearbitLogo ? (
          <Image
            src={clearbitLogo}
            alt={name}
            width={80}
            height={80}
            className="h-full w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        ) : (
          <ImageIcon className="h-10 w-10 text-gray-300" />
        )}
      </div>

      <div className="min-w-0">
        <Link
          href={href}
          className="truncate text-base font-semibold text-gray-900 hover:text-blue-600"
        >
          {name}
        </Link>
        <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
          {category}
        </span>
      </div>

      <p className="flex-1 text-sm text-gray-600 line-clamp-3">{description}</p>

      <div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}
