import { Suspense } from 'react'
import { prisma } from '../../../lib/prisma'
import { normalizeConsultants, parseArrayField } from '../../../lib/database-utils'
import DirectoryClient from '@/components/DirectoryClient'
import { ServiceType } from '@prisma/client'

interface SearchParams {
  search?: string
  service?: string
  industry?: string
  region?: string
  premium?: string
  page?: string
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

  const pageSize = 12
  const skip = (parseInt(page) - 1) * pageSize

  // Build where clause
  const where: any = {
    isApproved: true
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { industries: { has: search } }
    ]
  }

  if (service && service !== 'ALL') {
    where.services = {
      has: service as ServiceType
    }
  }

  if (industry) {
    where.industries = {
      has: industry
    }
  }

  if (region) {
    where.region = {
      contains: region,
      mode: 'insensitive'
    }
  }

  if (premium === 'true') {
    where.isPremium = true
  }

  try {
    const [consultants, total] = await Promise.all([
      prisma.consultant.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [
          { isPremium: 'desc' },
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.consultant.count({ where })
    ])

    // Normalize consultants for both PostgreSQL arrays and SQLite JSON
    const parsedConsultants = normalizeConsultants(consultants)

    // Get unique industries and regions for filters
    const [industries, regions] = await Promise.all([
      prisma.consultant.findMany({
        where: { isApproved: true },
        select: { industries: true }
      }).then(results => {
        const allIndustries = results.flatMap(r => parseArrayField(r.industries))
        return [...new Set(allIndustries)].sort()
      }),
      prisma.consultant.findMany({
        where: { isApproved: true },
        select: { region: true }
      }).then(results => {
        const allRegions = results.map(r => r.region)
        return [...new Set(allRegions)].sort()
      })
    ])

    return {
      consultants: parsedConsultants,
      total,
      industries,
      regions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / pageSize)
    }
  } catch (error) {
    console.error('Error fetching consultants:', error)
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
