import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import DirectoryClient from '@/components/DirectoryClient'

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

async function getConsultants(searchParams: SearchParams) {
  const {
    search,
    service,
    industry,
    region,
    premium,
    page = '1'
  } = searchParams

  try {
    // Build where clause for database query
    const where: {
      isApproved: boolean
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        description?: { contains: string; mode: 'insensitive' }
        industries?: { has: string }
      }>
      services?: { hasSome: string[] }
      AND?: Array<{
        services: { hasSome: string[] }
      }>
      industries?: { has: string }
      region?: string | { in: string[] }
      isPremium?: boolean
    } = {
      isApproved: true
    }

    // Apply search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { industries: { has: search } }
      ]
    }

    // Apply service filter
    if (service && service !== 'ALL') {
      if (service === 'SAAS') {
        where.services = { hasSome: ['SaaS Development', 'SaaS', 'Cloud Migration'] }
      } else if (service === 'AI') {
        where.services = { hasSome: ['AI Implementation', 'Machine Learning', 'AI Strategy'] }
      } else if (service === 'BOTH') {
        where.AND = [
          { services: { hasSome: ['SaaS Development', 'SaaS', 'Cloud Migration'] } },
          { services: { hasSome: ['AI Implementation', 'Machine Learning', 'AI Strategy'] } }
        ]
      }
    }

    // Apply industry filter
    if (industry) {
      where.industries = { has: industry }
    }

    // Apply region filter
    if (region) {
      const regionMapping: { [key: string]: string[] } = {
        'greater london': ['London'],
        'south east england': ['London', 'Brighton', 'Oxford', 'Cambridge'],
        'greater manchester': ['Manchester'],
        'west midlands (birmingham)': ['Birmingham'],
        'central scotland (edinburgh/glasgow)': ['Edinburgh', 'Glasgow'],
        'leeds & yorkshire': ['Leeds', 'York', 'Sheffield'],
        'liverpool & merseyside': ['Liverpool'],
        'bristol & south west': ['Bristol', 'Bath', 'Plymouth'],
        'cardiff & south wales': ['Cardiff', 'Swansea'],
        'belfast & northern ireland': ['Belfast'],
        'newcastle & north east': ['Newcastle', 'Sunderland'],
        'sheffield & south yorkshire': ['Sheffield'],
        'north wales': ['Bangor', 'Wrexham'],
        'remote/uk-wide': ['Remote', 'UK-wide'],
        'channel islands': ['Jersey', 'Guernsey'],
        'europe': ['Europe'],
        'international': ['International']
      }
      
      const mappedRegions = regionMapping[region.toLowerCase()]
      if (mappedRegions) {
        where.region = { in: mappedRegions }
      } else {
        where.region = region
      }
    }

    // Apply premium filter
    if (premium === 'true') {
      where.isPremium = true
    }

    // Get all consultants with filters
    const consultants = await prisma.consultant.findMany({
      where,
      orderBy: [
        { isPremium: 'desc' },
        { createdAt: 'desc' }
      ]
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
  } catch (error) {
    // Log error for debugging but don't expose in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching consultants:', error)
    }
    return {
      consultants: [],
      total: 0,
      industries: [],
      regions: [],
      currentPage: 1,
      totalPages: 0
    }
  }
}

export default async function DirectoryPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams
  const data = await getConsultants(resolvedSearchParams)

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
