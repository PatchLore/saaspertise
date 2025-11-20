import { MetadataRoute } from 'next'

import { getSupabaseServerClient } from '@/lib/supabase'
import { toSlug } from '@/lib/slug'

const LIMIT = 5000
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.saaspertise.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Basic sitemap entries that don't require database
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/directory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Only fetch companies if Supabase is configured
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return baseEntries
  }

  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from('companies')
      .select('name, created_at')
      .order('created_at', { ascending: false })
      .limit(LIMIT)

    if (error || !data) {
      return baseEntries
    }

    const companyEntries = data
      .filter((company) => company.name)
      .map((company) => ({
        url: `${BASE_URL}/directory/${toSlug(company.name)}`,
        lastModified: company.created_at ? new Date(company.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    return [...baseEntries, ...companyEntries]
  } catch (error) {
    // If Supabase fails, return at least the base entries
    console.error('Sitemap generation error:', error)
    return baseEntries
  }
}
