import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/consultants/[id] - Get specific consultant profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultantId = params.id

    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
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
        },
        _count: {
          select: {
            leads: true,
            testimonials: true
          }
        }
      }
    })

    if (!consultant) {
      return NextResponse.json(
        { message: 'Consultant not found' },
        { status: 404 }
      )
    }

    // Only show approved consultants to non-admin users
    const session = await getServerSession(authOptions)
    if (!consultant.isApproved && session?.user?.role !== 'ADMIN' && consultant.userId !== session?.user?.id) {
      return NextResponse.json(
        { message: 'Consultant profile is not yet approved' },
        { status: 403 }
      )
    }

    // Calculate average rating
    const avgRating = consultant.testimonials.length > 0
      ? consultant.testimonials.reduce((sum, t) => sum + t.rating, 0) / consultant.testimonials.length
      : 0

    return NextResponse.json({
      consultant: {
        ...consultant,
        averageRating: Math.round(avgRating * 10) / 10,
        testimonialCount: consultant.testimonials.length
      }
    })

  } catch (error) {
    console.error('Get consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/consultants/[id] - Update consultant profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const consultantId = params.id

    // Check if consultant exists
    const existingConsultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: { user: true }
    })

    if (!existingConsultant) {
      return NextResponse.json(
        { message: 'Consultant not found' },
        { status: 404 }
      )
    }

    // Check if user owns this consultant profile or is admin
    if (existingConsultant.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    const {
      name,
      description,
      shortDescription,
      website,
      email,
      phone,
      region,
      services,
      industries,
      logo,
      profilePhoto,
      hourlyRate,
      projectRateMin,
      projectRateMax,
      showRates,
      isApproved, // Only admins can modify this
      isFeatured   // Only admins can modify this
    } = await request.json()

    // Validate required fields
    if (!name || !description || !email || !region || !services || !industries) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { message: 'Please select at least one service' },
        { status: 400 }
      )
    }

    if (!Array.isArray(industries) || industries.length === 0) {
      return NextResponse.json(
        { message: 'Please select at least one industry' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      name,
      description,
      shortDescription: shortDescription || null,
      website: website || null,
      email,
      phone: phone || null,
      region,
      services,
      industries,
      logo: logo || null,
      profilePhoto: profilePhoto || null,
      hourlyRate: hourlyRate ? parseInt(hourlyRate) : null,
      projectRateMin: projectRateMin ? parseInt(projectRateMin) : null,
      projectRateMax: projectRateMax ? parseInt(projectRateMax) : null,
      showRates: showRates || false
    }

    // Only allow admins to modify approval/featured status
    if (session.user.role === 'ADMIN') {
      if (typeof isApproved === 'boolean') {
        updateData.isApproved = isApproved
      }
      if (typeof isFeatured === 'boolean') {
        updateData.isFeatured = isFeatured
      }
    }

    const updatedConsultant = await prisma.consultant.update({
      where: { id: consultantId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Consultant profile updated successfully',
        consultant: updatedConsultant
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Update consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/consultants/[id] - Delete consultant profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const consultantId = params.id

    // Check if consultant exists
    const existingConsultant = await prisma.consultant.findUnique({
      where: { id: consultantId }
    })

    if (!existingConsultant) {
      return NextResponse.json(
        { message: 'Consultant not found' },
        { status: 404 }
      )
    }

    // Check if user owns this consultant profile or is admin
    if (existingConsultant.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    // Delete consultant (cascade will handle related records)
    await prisma.consultant.delete({
      where: { id: consultantId }
    })

    return NextResponse.json(
      { message: 'Consultant profile deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}


