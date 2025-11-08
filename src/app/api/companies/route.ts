import { NextRequest, NextResponse } from 'next/server'

import { getSupabaseServerClient } from '@/lib/supabase'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 50
const MAX_PAGE_SIZE = 200

function parsePositiveInt(value: string | null, fallback: number, max?: number): number {
  if (!value) return fallback
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback
  const finalValue = Math.floor(parsed)
  return max ? Math.min(finalValue, max) : finalValue
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')?.trim() || undefined
  const category = searchParams.get('category')?.trim() || undefined
  const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE)
  const pageSize = parsePositiveInt(searchParams.get('pageSize'), DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)

  const offset = (page - 1) * pageSize
  const rangeEnd = offset + pageSize - 1

  const supabase = getSupabaseServerClient()

  let query = supabase
    .from('companies')
    .select('name, website, category, description, logo_url', { count: 'exact' })
    .order('name')

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }
  if (category) {
    query = query.eq('category', category)
  }

  const { data, count, error } = await query.range(offset, rangeEnd)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  return NextResponse.json(
    {
      data: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  )
}
