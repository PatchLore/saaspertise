import Image from 'next/image'
import Link from 'next/link'

interface CompanyCardProps {
  name: string
  description: string
  category: string
  logoUrl?: string | null
  href: string
  fallbackLogo?: string
}

const DEFAULT_LOGO = 'https://saaspertise.com/default-logo.png'

export function CompanyCard({
  name,
  description,
  category,
  logoUrl,
  href,
  fallbackLogo = DEFAULT_LOGO,
}: CompanyCardProps) {
  const imageSrc = logoUrl || fallbackLogo

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
          <Image
            src={imageSrc}
            alt={`${name} logo`}
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <Link href={href} className="truncate text-base font-semibold text-gray-900 hover:text-blue-600">
            {name}
          </Link>
          <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            {category}
          </span>
        </div>
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
  )
}
