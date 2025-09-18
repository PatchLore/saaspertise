// TODO: Re-enable DB integration for production
// import { prisma } from '../../lib/prisma'
// import { normalizeConsultants } from '../../lib/database-utils'
import { getFeaturedConsultants, MockConsultant } from '@/data/mockConsultants'
import HeroSection from '@/components/HeroSection'
import FeaturedConsultants from '@/components/FeaturedConsultants'

// For demo purposes, using mock data
function getFeaturedConsultantsData(): MockConsultant[] {
  return getFeaturedConsultants()
}

export default function Home() {
  // For demo purposes, using mock data (no async needed)
  const featuredConsultants = getFeaturedConsultantsData()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedConsultants consultants={featuredConsultants} />
    </div>
  )
}