import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/consultants - List consultants with search and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const region = searchParams.get('region') || ''
    const expertise = searchParams.get('expertise') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const featured = searchParams.get('featured') === 'true'
    const approved = searchParams.get('approved') !== 'false' // Default to true

    const skip = (page - 1) * limit

    // Build where clause
    const where: { isApproved?: boolean; isFeatured?: boolean; OR?: unknown[] } = {}
    
    if (approved) {
      where.isApproved = true
    }
    
    if (featured) {
      where.isFeatured = true
    }

    if (region) {
      where.region = {
        contains: region,
        mode: 'insensitive'
      }
    }

    if (expertise) {
      where.OR = [
        { services: { has: expertise } },
        { industries: { has: expertise } }
      ]
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
        { services: { has: search } },
        { industries: { has: search } }
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
              email: true
            }
          },
          testimonials: {
            where: { isApproved: true },
            select: {
              rating: true
            }
          },
          portfolioItems: {
            where: { isPublic: true },
            orderBy: { displayOrder: 'asc' },
            take: 3
          },
          caseStudies: {
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
            take: 2
          },
          _count: {
            select: {
              leads: true,
              testimonials: true
            }
          }
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.consultant.count({ where })
    ])

    // Calculate average ratings
    const consultantsWithRatings = consultants.map(consultant => {
      const avgRating = consultant.testimonials.length > 0
        ? consultant.testimonials.reduce((sum, t) => sum + t.rating, 0) / consultant.testimonials.length
        : 0

      return {
        ...consultant,
        averageRating: Math.round(avgRating * 10) / 10,
        testimonialCount: consultant.testimonials.length
      }
    })

    return NextResponse.json({
      consultants: consultantsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get consultants error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/consultants - Create consultant profile (authenticated)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user already has a consultant profile
    const existingConsultant = await prisma.consultant.findUnique({
      where: { userId: session.user.id }
    })

    if (existingConsultant) {
      return NextResponse.json(
        { message: 'Consultant profile already exists' },
        { status: 400 }
      )
    }

    const requestData = await request.json()
    console.log('Received data:', JSON.stringify(requestData, null, 2))
    
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
      showRates
    } = requestData

    // Validate required fields
    if (!name || !description || !email || !region || !services || !industries) {
      console.log('Missing fields:', { name: !!name, description: !!description, email: !!email, region: !!region, services: !!services, industries: !!industries })
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

    // Create consultant profile
    const consultant = await prisma.consultant.create({
      data: {
        userId: session.user.id,
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
        showRates: showRates || false,
        isPremium: false,
        isApproved: false,
        isFeatured: false
      },
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
        message: 'Consultant profile created successfully',
        consultant: {
          id: consultant.id,
          name: consultant.name,
          isApproved: consultant.isApproved,
          email: consultant.email
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
