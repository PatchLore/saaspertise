#!/usr/bin/env ts-node

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

interface CompanyRecord {
  id: string
  name: string
  slug?: string | null
}

const PAGE_SIZE = 1000
const UPDATE_BATCH_SIZE = 500
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000
const COURTESY_DELAY_MS = 500

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function loadEnv() {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }

  return { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY }
}

function createSupabase() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = loadEnv()
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}

async function fetchAllCompanies(client: ReturnType<typeof createSupabase>) {
  let offset = 0
  const records: CompanyRecord[] = []

  for (;;) {
    const { data, error, count } = await client
      .from('companies')
      .select('id, name, slug', { count: 'exact' })
      .order('id')
      .range(offset, offset + PAGE_SIZE - 1)

    if (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`)
    }

    if (!data || data.length === 0) {
      break
    }

    records.push(...(data as CompanyRecord[]))
    offset += data.length

    if (count !== null && offset >= count) {
      break
    }
  }

  return records
}

async function upsertBatch(client: ReturnType<typeof createSupabase>, batch: Array<{ id: string; slug: string }>) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const { error } = await client.from('companies').upsert(batch, { onConflict: 'id' })

    if (!error) {
      return
    }

    if (attempt === MAX_RETRIES) {
      throw new Error(`Failed to upsert batch after ${MAX_RETRIES} attempts: ${error.message}`)
    }

    console.warn(`Batch upsert failed (attempt ${attempt}/${MAX_RETRIES}): ${error.message}`)
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt))
  }
}

async function main() {
  const client = createSupabase()
  console.log('Fetching companies...')
  const companies = await fetchAllCompanies(client)
  console.log(`Fetched ${companies.length} companies.`)

  const updates = companies
    .map((company) => ({ id: company.id, slug: toSlug(company.name) }))
    .filter((update, idx) => update.slug && update.slug !== (companies[idx].slug ?? ''))

  if (updates.length === 0) {
    console.log('No slug updates required.')
    return
  }

  console.log(`Updating ${updates.length} records...`)

  for (let i = 0; i < updates.length; i += UPDATE_BATCH_SIZE) {
    const batch = updates.slice(i, i + UPDATE_BATCH_SIZE)
    await upsertBatch(client, batch)
    console.log(`Processed batch ${Math.floor(i / UPDATE_BATCH_SIZE) + 1} (${batch.length} records)`)
    await new Promise((resolve) => setTimeout(resolve, COURTESY_DELAY_MS))
  }

  console.log('✅ Slug backfill complete.')
}

main().catch((error) => {
  console.error('Slug backfill failed:', error)
  process.exit(1)
})
