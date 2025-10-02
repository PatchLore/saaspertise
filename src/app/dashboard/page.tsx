import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ConsultantDashboard from '@/components/ConsultantDashboard'

async function getConsultantData(userId: string) {
  try {
    const consultant = await prisma.consultant.findUnique({
      where: { userId },
      include: {
        leads: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        testimonials: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!consultant) {
      return null
    }

    // Parse JSON strings
    return {
      ...consultant,
      services: JSON.parse(consultant.services || '[]'),
      industries: JSON.parse(consultant.industries || '[]')
    }
  } catch (error) {
    console.error('Error fetching consultant data:', error)
    return null
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  if (!session.user.consultantId) {
    redirect('/onboarding')
  }

  const consultant = await getConsultantData(session.user.id)

  if (!consultant) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your consultant profile and view leads</p>
        </div>
        
        <ConsultantDashboard consultant={consultant} />
      </div>
    </div>
  )
}
















