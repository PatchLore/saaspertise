import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import AdminDashboard from '@/components/AdminDashboard'

async function getAdminData() {
  try {
    const [
      pendingConsultants,
      approvedConsultants,
      recentLeads,
      stats
    ] = await Promise.all([
      // Pending consultants
      prisma.consultant.findMany({
        where: { isApproved: false },
        include: {
          user: {
            select: { name: true, email: true, createdAt: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      
      // Recently approved consultants
      prisma.consultant.findMany({
        where: { isApproved: true },
        include: {
          user: {
            select: { name: true, email: true }
          }
        },
        orderBy: { updatedAt: 'desc' },
        take: 10
      }),
      
      // Recent leads
      prisma.lead.findMany({
        include: {
          consultant: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      
      // Stats
      prisma.$transaction([
        prisma.consultant.count(),
        prisma.consultant.count({ where: { isApproved: true } }),
        prisma.consultant.count({ where: { isPremium: true } }),
        prisma.lead.count(),
        prisma.lead.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        })
      ])
    ])

    // Parse JSON strings for consultants
    const parsedPendingConsultants = pendingConsultants.map(consultant => ({
      ...consultant,
      services: JSON.parse(consultant.services || '[]'),
      industries: JSON.parse(consultant.industries || '[]')
    }))

    const parsedApprovedConsultants = approvedConsultants.map(consultant => ({
      ...consultant,
      services: JSON.parse(consultant.services || '[]'),
      industries: JSON.parse(consultant.industries || '[]')
    }))

    const [totalConsultants, approvedCount, premiumCount, totalLeads, recentLeadsCount] = stats

    return {
      pendingConsultants: parsedPendingConsultants,
      approvedConsultants: parsedApprovedConsultants,
      recentLeads,
      stats: {
        totalConsultants,
        approvedConsultants: approvedCount,
        premiumConsultants: premiumCount,
        totalLeads,
        recentLeads: recentLeadsCount
      }
    }
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return {
      pendingConsultants: [],
      approvedConsultants: [],
      recentLeads: [],
      stats: {
        totalConsultants: 0,
        approvedConsultants: 0,
        premiumConsultants: 0,
        totalLeads: 0,
        recentLeads: 0
      }
    }
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  const data = await getAdminData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage consultants, leads, and platform statistics</p>
        </div>
        
        <AdminDashboard data={data} />
      </div>
    </div>
  )
}




