import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/dashboard - Get admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Get various statistics
    const [
      totalConsultants,
      pendingConsultants,
      approvedConsultants,
      featuredConsultants,
      totalUsers,
      totalLeads,
      recentLeads,
      totalTestimonials,
      totalPayments,
      monthlyRevenue,
      consultantRegistrations,
      leadTrends
    ] = await Promise.all([
      // Total consultants
      prisma.consultant.count(),
      
      // Pending approval
      prisma.consultant.count({
        where: { isApproved: false }
      }),
      
      // Approved consultants
      prisma.consultant.count({
        where: { isApproved: true }
      }),
      
      // Featured consultants
      prisma.consultant.count({
        where: { isFeatured: true }
      }),
      
      // Total users
      prisma.user.count(),
      
      // Total leads
      prisma.lead.count(),
      
      // Recent leads (last 7 days)
      prisma.lead.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        include: {
          consultant: {
            select: {
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      
      // Total testimonials
      prisma.testimonial.count(),
      
      // Total payments
      prisma.payment.count(),
      
      // Monthly revenue (this month)
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: {
          amount: true
        }
      }),
      
      // Consultant registrations (last 30 days)
      prisma.consultant.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        _count: {
          id: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      }),
      
      // Lead trends (last 30 days)
      prisma.lead.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        _count: {
          id: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })
    ])

    // Get top consultants by leads
    const topConsultantsByLeads = await prisma.consultant.findMany({
      include: {
        _count: {
          select: {
            leads: true,
            testimonials: true
          }
        }
      },
      orderBy: {
        leads: {
          _count: 'desc'
        }
      },
      take: 5
    })

    // Get consultant distribution by region
    const consultantRegions = await prisma.consultant.groupBy({
      by: ['region'],
      where: { isApproved: true },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })

    return NextResponse.json({
      overview: {
        totalConsultants,
        pendingConsultants,
        approvedConsultants,
        featuredConsultants,
        totalUsers,
        totalLeads,
        totalTestimonials,
        totalPayments,
        monthlyRevenue: monthlyRevenue._sum.amount || 0
      },
      recentActivity: {
        recentLeads,
        consultantRegistrations,
        leadTrends
      },
      analytics: {
        topConsultantsByLeads: topConsultantsByLeads.map(c => ({
          id: c.id,
          name: c.name,
          region: c.region,
          leadCount: c._count.leads,
          testimonialCount: c._count.testimonials,
          isFeatured: c.isFeatured
        })),
        consultantRegions
      }
    })

  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}



