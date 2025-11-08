import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let cachedServerClient: SupabaseClient | null = null

export function getSupabaseServerClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseServerClient must only be called on the server.')
  }

  if (!SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined in the environment.')
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in the environment.')
  }

  if (!cachedServerClient) {
    cachedServerClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
  }

  return cachedServerClient
}

export function createSupabaseBrowserClient(): SupabaseClient {
  if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Public Supabase environment variables are not configured.')
  }

  return createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
