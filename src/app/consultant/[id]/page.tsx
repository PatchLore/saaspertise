import { notFound } from 'next/navigation'
import { prisma } from '../../../../lib/prisma'
import { normalizeConsultant } from '../../../../lib/database-utils'
import ConsultantProfile from '@/components/ConsultantProfile'

interface ConsultantPageProps {
  params: Promise<{
    id: string
  }>
}

async function getConsultant(id: string) {
  try {
    const consultant = await prisma.consultant.findUnique({
      where: {
        id: id,
        isApproved: true
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        portfolioItems: {
          where: { isPublic: true },
          orderBy: { displayOrder: 'asc' }
        }
      }
    })

    if (!consultant) {
      return null
    }

    // Normalize consultant for both PostgreSQL arrays and SQLite JSON
    return normalizeConsultant(consultant)
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
