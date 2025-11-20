import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'
import { toSlug } from '@/lib/slug'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    const supabase = getSupabaseServerClient()
    
    const { data, error } = await supabase
      .from('companies')
      .select('name, slug')
      .limit(10)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const companiesWithSlugs = data?.map((c) => ({
      name: c.name,
      dbSlug: c.slug,
      generatedSlug: toSlug(c.name),
      match: c.slug === toSlug(c.name),
    }))

    return NextResponse.json({
      count: data?.length || 0,
      companies: companiesWithSlugs,
      sampleUrl: data?.[0] ? `/directory/${toSlug(data[0].name)}` : null,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

