import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// GET /api/admin/consultants - Get all consultants for admin management
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'pending', 'approved', 'rejected'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.ConsultantWhereInput = {}

    if (status === 'pending') {
      where.isApproved = false
    } else if (status === 'approved') {
      where.isApproved = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { region: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [consultants, total] = await Promise.all([
      prisma.consultant.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true
            }
          },
          _count: {
            select: {
              leads: true,
              testimonials: true,
              portfolioItems: true,
              caseStudies: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.consultant.count({ where })
    ])

    return NextResponse.json({
      consultants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Admin get consultants error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/consultants - Bulk operations
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { action, consultantIds, data } = await request.json()

    if (!action || !consultantIds || !Array.isArray(consultantIds)) {
      return NextResponse.json(
        { message: 'Invalid request parameters' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'approve':
        result = await prisma.consultant.updateMany({
          where: { id: { in: consultantIds } },
          data: { isApproved: true }
        })
        break

      case 'reject':
        result = await prisma.consultant.updateMany({
          where: { id: { in: consultantIds } },
          data: { isApproved: false }
        })
        break

      case 'feature':
        result = await prisma.consultant.updateMany({
          where: { id: { in: consultantIds } },
          data: { isFeatured: true }
        })
        break

      case 'unfeature':
        result = await prisma.consultant.updateMany({
          where: { id: { in: consultantIds } },
          data: { isFeatured: false }
        })
        break

      case 'delete':
        result = await prisma.consultant.deleteMany({
          where: { id: { in: consultantIds } }
        })
        break

      default:
        return NextResponse.json(
          { message: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      message: `Bulk ${action} completed successfully`,
      affectedCount: result.count
    })

  } catch (error) {
    console.error('Admin bulk operation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}


