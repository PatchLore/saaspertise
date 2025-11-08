import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getSupabaseServerClient } from '@/lib/supabase'
import { toSlug } from '@/lib/slug'

export const dynamic = 'force-dynamic'

const FALLBACK_LOGO = 'https://saaspertise.com/default-logo.png'

interface Company {
  name: string
  website: string
  category: string
  description: string
  logo_url?: string | null
  created_at?: string | null
}

interface PageParams {
  slug: string
}

async function loadCompany(slug: string): Promise<Company | null> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('companies')
    .select('name, website, category, description, logo_url, created_at')

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to load company.')
  }

  return (
    data.find((company) => toSlug(company.name) === slug) ??
    data.find((company) => company.name === slug) ??
    null
  )
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const company = await loadCompany(params.slug)
  if (!company) {
    return {}
  }

  return {
    title: `${company.name} | SaaSpertise Directory`,
    description: company.description,
    openGraph: {
      title: `${company.name} | SaaSpertise Directory`,
      description: company.description,
      url: company.website,
      images: company.logo_url ? [company.logo_url] : undefined,
    },
  }
}

function buildOrganizationJsonLd(company: Company) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.website,
    description: company.description,
    logo: company.logo_url || FALLBACK_LOGO,
    category: company.category,
  }
}

export default async function CompanyPage({ params }: { params: PageParams }) {
  const company = await loadCompany(params.slug)
  if (!company) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: company.name,
            url: company.website,
            logo: company.logo_url || FALLBACK_LOGO,
          }),
        }}
      />

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
            <Image
              src={company.logo_url || FALLBACK_LOGO}
              alt={`${company.name} logo`}
              fill
              sizes="80px"
              className="object-contain"
              onError={(event) => {
                const target = event.currentTarget as HTMLImageElement
                target.src = FALLBACK_LOGO
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-sm text-blue-600">{company.category}</p>
          </div>
        </div>

        <p className="mb-6 text-gray-700">{company.description}</p>

        <Link
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Visit Website
        </Link>
      </section>
    </main>
  )
}
