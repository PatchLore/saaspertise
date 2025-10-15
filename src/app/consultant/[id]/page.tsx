import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ConsultantProfile from '@/components/ConsultantProfile'
import { ConsultantSchema } from '@/components/StructuredData'
import Breadcrumbs, { breadcrumbSets } from '@/components/Breadcrumbs'

interface ConsultantPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ConsultantPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const consultant = await getConsultant(resolvedParams.id)
  
  if (!consultant) {
    return {
      title: 'Consultant Not Found',
      description: 'The requested consultant profile could not be found.',
    }
  }

  const title = `${consultant.name} - ${consultant.services.join(', ')} Consultant`
  const description = `${consultant.shortDescription || consultant.description.substring(0, 150)}... Located in ${consultant.region}. Specializes in ${consultant.services.join(', ')} for ${consultant.industries.join(', ')} industries.`

  return {
    title,
    description,
    keywords: [
      consultant.name,
      ...consultant.services,
      ...consultant.industries,
      'consultant',
      'SaaS consultant',
      'AI consultant',
      consultant.region,
      'business consultant',
      'digital transformation'
    ],
    openGraph: {
      title: `${consultant.name} - Expert Consultant`,
      description,
      url: `https://www.saaspertise.com/consultant/${consultant.id}`,
      images: consultant.profilePhoto ? [
        {
          url: consultant.profilePhoto,
          width: 400,
          height: 400,
          alt: `${consultant.name} - Consultant Profile`,
        }
      ] : [],
    },
    twitter: {
      title: `${consultant.name} - Expert Consultant`,
      description,
    },
    alternates: {
      canonical: `/consultant/${consultant.id}`,
    },
  }
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
      // Performance metrics - set to null since not in database yet
      responseRate: null,
      responseTime: null,
      projectsCompleted: null,
      clientRating: null,
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

  return (
    <>
      <ConsultantSchema consultant={consultant} />
      <Breadcrumbs items={breadcrumbSets.consultant(consultant.name)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" />
      <ConsultantProfile consultant={consultant} />
    </>
  )
}
