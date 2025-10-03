import HeroSection from '@/components/HeroSection'
import FeaturedConsultants from '@/components/FeaturedConsultants'
import { getFeaturedConsultants } from '@/data/mockConsultants'

export default async function Home() {
  // Use mock data for featured consultants
  const featuredConsultants = getFeaturedConsultants()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedConsultants consultants={featuredConsultants} />
    </div>
  )
}