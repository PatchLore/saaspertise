import { MetadataRoute } from 'next'

import { getSupabaseServerClient } from '@/lib/supabase'
import { toSlug } from '@/lib/slug'

const LIMIT = 5000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('companies')
    .select('name, created_at')
    .order('created_at', { ascending: false })
    .limit(LIMIT)

  if (error || !data) {
    return []
  }

  return data
    .filter((company) => company.name)
    .map((company) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.saaspertise.com'}/directory/${toSlug(company.name)}`,
      lastModified: company.created_at ? new Date(company.created_at) : new Date(),
    }))
}
