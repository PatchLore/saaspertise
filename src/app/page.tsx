import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import FeaturedConsultants from '@/components/FeaturedConsultants'

async function getFeaturedConsultantsData() {
  try {
    const consultants = await prisma.consultant.findMany({
      where: {
        isFeatured: true,
        isApproved: true
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the data to match the expected interface
    return consultants.map(consultant => ({
      id: consultant.id,
      name: consultant.name,
      logo: consultant.logo,
      profilePhoto: consultant.profilePhoto,
      shortDescription: consultant.shortDescription,
      description: consultant.description,
      region: consultant.region,
      services: consultant.services,
      industries: consultant.industries,
      isPremium: consultant.isPremium,
      isApproved: consultant.isApproved,
      isFeatured: consultant.isFeatured,
      email: consultant.email,
      phone: consultant.phone,
      website: consultant.website
    }))
  } catch (error) {
    console.error('Error fetching featured consultants:', error)
    return []
  }
}

export default async function Home() {
  // Fetch real data from database
  const featuredConsultants = await getFeaturedConsultantsData()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedConsultants consultants={featuredConsultants} />
    </div>
  )
}