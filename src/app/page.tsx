import { prisma } from '../../lib/prisma'
import { normalizeConsultants } from '../../lib/database-utils'
import HeroSection from '@/components/HeroSection'
import FeaturedConsultants from '@/components/FeaturedConsultants'

type Consultant = {
  id: string
  name: string
  logo?: string | null
  profilePhoto?: string | null
  shortDescription?: string | null
  description: string
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  website?: string | null
}

async function getFeaturedConsultants() {
  try {
    const consultants = await prisma.consultant.findMany({
      where: {
        isApproved: true,
        isFeatured: true,
        isPremium: true,
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Normalize consultants for both PostgreSQL arrays and SQLite JSON
    return normalizeConsultants(consultants) as unknown as Consultant[]
  } catch (error) {
    console.error('Error fetching featured consultants:', error)
    return []
  }
}

export default async function Home() {
  const featuredConsultants = await getFeaturedConsultants()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedConsultants consultants={featuredConsultants} />
    </div>
  )
}