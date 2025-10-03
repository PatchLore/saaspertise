import { Suspense } from 'react'
// TODO: Re-enable Prisma + DATABASE_URL for production
// import { prisma } from '@/lib/prisma'
// import { normalizeConsultants, parseArrayField } from '@/lib/database-utils'
import { getAllConsultants, MockConsultant } from '@/data/mockConsultants'
import DirectoryClient from '@/components/DirectoryClient'
// import { ServiceType } from '@prisma/client'

// Import Consultant type from DirectoryClient
type Consultant = {
  id: string
  name: string
  logo?: string | null
  shortDescription?: string | null
  description: string
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  website?: string | null
}

interface SearchParams {
  search?: string
  service?: string
  industry?: string
  region?: string
  premium?: string
  page?: string
  [key: string]: string | string[] | undefined
}

function getConsultants(searchParams: SearchParams) {
  const {
    search,
    service,
    industry,
    region,
    premium,
    page = '1'
  } = searchParams

  // For demo purposes, using mock data (no database calls)
  let consultants = getAllConsultants()

  // Apply filters
  if (search) {
    const searchLower = search.toLowerCase()
    consultants = consultants.filter(c => 
      c.name.toLowerCase().includes(searchLower) ||
      c.description.toLowerCase().includes(searchLower) ||
      c.industries.some(i => i.toLowerCase().includes(searchLower))
    )
  }

  if (service && service !== 'ALL') {
    consultants = consultants.filter(c => {
      if (service === 'SAAS') {
        return c.services.some(s => s.toLowerCase().includes('saas'))
      } else if (service === 'AI') {
        return c.services.some(s => s.toLowerCase().includes('ai') || s.toLowerCase().includes('machine learning'))
      } else if (service === 'BOTH') {
        const hasSaaS = c.services.some(s => s.toLowerCase().includes('saas'))
        const hasAI = c.services.some(s => s.toLowerCase().includes('ai') || s.toLowerCase().includes('machine learning'))
        return hasSaaS && hasAI
      }
      return false
    })
  }

  if (industry) {
    consultants = consultants.filter(c => c.industries.includes(industry))
  }

  if (region) {
    consultants = consultants.filter(c => c.region.toLowerCase() === region.toLowerCase())
  }

  if (premium === 'true') {
    consultants = consultants.filter(c => c.isPremium)
  }

  // Sort consultants
  consultants.sort((a, b) => {
    if (a.isPremium !== b.isPremium) return b.isPremium ? 1 : -1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const total = consultants.length
  const pageSize = 12
  const currentPage = parseInt(page)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedConsultants = consultants.slice(startIndex, endIndex)

  // Get unique industries and regions for filters
  const allIndustries = [...new Set(consultants.flatMap(c => c.industries))].sort()
  const allRegions = [...new Set(consultants.map(c => c.region))].sort()

  return {
    consultants: paginatedConsultants as Consultant[],
    total,
    industries: allIndustries,
    regions: allRegions,
    currentPage,
    totalPages: Math.ceil(total / pageSize)
  }
}

export default async function DirectoryPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams
  const data = getConsultants(resolvedSearchParams)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultant Directory
          </h1>
          <p className="text-gray-600">
            Discover expert consultants specializing in SaaS and AI solutions
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center items-center py-20">Loading...</div>}>
        <DirectoryClient 
          initialData={data}
          searchParams={resolvedSearchParams}
        />
      </Suspense>
    </div>
  )
}
