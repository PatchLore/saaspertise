import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.saaspertise.com${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        <Link
          href="/"
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

// Predefined breadcrumb sets for common pages
export const breadcrumbSets = {
  directory: [
    { label: 'Browse Consultants', href: '/directory' },
  ],
  solutions: [
    { label: 'Solutions', href: '/solutions' },
  ],
  quoteFlow: [
    { label: 'Solutions', href: '/solutions' },
    { label: 'QuoteFlow', href: '/solutions/quoteflow' },
  ],
  consultant: (consultantName: string) => [
    { label: 'Browse Consultants', href: '/directory' },
    { label: consultantName },
  ],
}






