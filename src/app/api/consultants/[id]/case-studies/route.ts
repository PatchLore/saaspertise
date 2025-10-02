import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/consultants/[id]/case-studies - Get case studies for a consultant
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultantId = params.id
    const { searchParams } = new URL(request.url)
    const publicOnly = searchParams.get('public') !== 'false'

    // Verify consultant exists
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId }
    })

    if (!consultant) {
      return NextResponse.json(
        { message: 'Consultant not found' },
        { status: 404 }
      )
    }

    const session = await getServerSession(authOptions)
    const isOwner = session?.user?.id === consultant.userId
    const isAdmin = session?.user?.role === 'ADMIN'

    // Build where clause
    const where: { consultantId: string; isPublic?: boolean } = {
      consultantId
    }

    // Only show public case studies to non-owners/non-admins
    if (publicOnly && !isOwner && !isAdmin) {
      where.isPublic = true
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ caseStudies })

  } catch (error) {
    console.error('Get case studies error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/consultants/[id]/case-studies - Create a new case study
export async function POST(
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

    // Verify consultant exists and user owns it
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId }
    })

    if (!consultant) {
      return NextResponse.json(
        { message: 'Consultant not found' },
        { status: 404 }
      )
    }

    if (consultant.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    const {
      title,
      description,
      challenge,
      solution,
      results,
      technologies,
      industry,
      clientSize,
      duration,
      budget,
      attachments,
      isPublic
    } = await request.json()

    // Validate required fields
    if (!title || !description || !challenge || !solution || !results) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!Array.isArray(technologies)) {
      return NextResponse.json(
        { message: 'Technologies must be an array' },
        { status: 400 }
      )
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        consultantId,
        title,
        description,
        challenge,
        solution,
        results,
        technologies,
        industry: industry || null,
        clientSize: clientSize || null,
        duration: duration || null,
        budget: budget || null,
        attachments: Array.isArray(attachments) ? attachments : [],
        isPublic: isPublic !== false // Default to true
      }
    })

    return NextResponse.json(
      { 
        message: 'Case study created successfully',
        caseStudy
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create case study error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}


