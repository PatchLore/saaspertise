import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import FeaturedConsultants from '@/components/FeaturedConsultants'

export const metadata: Metadata = {
  title: "Home",
  description: "Find top SaaS and AI consultants to grow your business. Browse verified consultants specializing in SaaS development, AI implementation, and digital transformation. Connect with experts who can help scale your business.",
  keywords: [
    "SaaS consultants",
    "AI consultants", 
    "business consultants",
    "digital transformation",
    "software development",
    "tech consultants",
    "consultant directory",
    "expert consultants"
  ],
  openGraph: {
    title: "Saaspertise - Find Top SaaS & AI Consultants",
    description: "Connect with verified SaaS and AI consultants to grow your business. Browse experts by location, expertise, and industry.",
    url: "https://www.saaspertise.com",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Saaspertise - SaaS & AI Consultants Directory Homepage",
      },
    ],
  },
  twitter: {
    title: "Saaspertise - Find Top SaaS & AI Consultants",
    description: "Connect with verified SaaS and AI consultants to grow your business. Browse experts by location, expertise, and industry.",
  },
  alternates: {
    canonical: "/",
  },
}

async function getFeaturedConsultantsData() {
  try {
    const consultants = await prisma.consultant.findMany({
      where: {
        isFeatured: true,
        isApproved: true
      },
      include: {
        user: true,
        testimonials: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        },
        portfolioItems: {
          where: { isPublic: true },
          orderBy: { displayOrder: 'asc' }
        }
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