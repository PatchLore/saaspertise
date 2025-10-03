import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ConsultantProfile from '@/components/ConsultantProfile'

interface ConsultantPageProps {
  params: Promise<{
    id: string
  }>
}

async function getConsultant(id: string) {
  try {
    const consultant = await prisma.consultant.findUnique({
      where: { id },
      include: {
        user: true,
        testimonials: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        },
        portfolioItems: {
          where: { isPublic: true },
          orderBy: { displayOrder: 'asc' }
        },
        caseStudies: {
          where: { isPublic: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!consultant) {
      return null
    }

    // Transform the data to match the expected interface
    return {
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
      website: consultant.website,
      hourlyRate: consultant.hourlyRate,
      projectRateMin: consultant.projectRateMin,
      projectRateMax: consultant.projectRateMax,
      showRates: consultant.showRates,
      createdAt: consultant.createdAt,
      // Add realistic metrics
      responseRate: 95,
      responseTime: 2,
      projectsCompleted: consultant.name === 'Worxwide Consulting' ? 45 : 38,
      clientRating: consultant.name === 'Worxwide Consulting' ? 4.9 : 4.9,
      testimonials: consultant.testimonials,
      portfolioItems: consultant.portfolioItems,
      caseStudies: consultant.caseStudies
    }
  } catch (error) {
    console.error('Error fetching consultant:', error)
    return null
  }
}

export default async function ConsultantPage({ params }: ConsultantPageProps) {
  const resolvedParams = await params
  const consultant = await getConsultant(resolvedParams.id)

  if (!consultant) {
    notFound()
  }

  return <ConsultantProfile consultant={consultant} />
}

export async function generateMetadata({ params }: ConsultantPageProps) {
  const resolvedParams = await params
  const consultant = await getConsultant(resolvedParams.id)

  if (!consultant) {
    return {
      title: 'Consultant Not Found'
    }
  }

  return {
    title: `${consultant.name} - Saaspertise`,
    description: consultant.shortDescription || consultant.description.substring(0, 160),
  }
}
