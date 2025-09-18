import { notFound } from 'next/navigation'
// TODO: Re-enable Prisma + DATABASE_URL for production
// import { prisma } from '../../../../lib/prisma'
// import { normalizeConsultant } from '../../../../lib/database-utils'
import { getConsultantById, MockConsultant } from '@/data/mockConsultants'
import ConsultantProfile from '@/components/ConsultantProfile'

interface ConsultantPageProps {
  params: Promise<{
    id: string
  }>
}

function getConsultant(id: string): MockConsultant | null {
  // For demo purposes, using mock data (no database calls)
  return getConsultantById(id)
}

export default function ConsultantPage({ params }: ConsultantPageProps) {
  // For demo purposes, using mock data (no async needed)
  const resolvedParams = params as unknown as { id: string }
  const consultant = getConsultant(resolvedParams.id)

  if (!consultant) {
    notFound()
  }

  return <ConsultantProfile consultant={consultant} />
}

export function generateMetadata({ params }: ConsultantPageProps) {
  // For demo purposes, using mock data (no async needed)
  const resolvedParams = params as unknown as { id: string }
  const consultant = getConsultant(resolvedParams.id)

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
