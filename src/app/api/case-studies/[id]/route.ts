import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/case-studies/[id] - Get specific case study
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudyId = params.id

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: caseStudyId },
      include: {
        consultant: {
          select: {
            id: true,
            name: true,
            email: true,
            userId: true
          }
        }
      }
    })

    if (!caseStudy) {
      return NextResponse.json(
        { message: 'Case study not found' },
        { status: 404 }
      )
    }

    const session = await getServerSession(authOptions)
    const isOwner = session?.user?.id === caseStudy.consultant.userId
    const isAdmin = session?.user?.role === 'ADMIN'

    // Only show public case studies to non-owners/non-admins
    if (!caseStudy.isPublic && !isOwner && !isAdmin) {
      return NextResponse.json(
        { message: 'Case study is not public' },
        { status: 403 }
      )
    }

    return NextResponse.json({ caseStudy })

  } catch (error) {
    console.error('Get case study error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/case-studies/[id] - Update case study
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

    const caseStudyId = params.id

    // Check if case study exists
    const existingCaseStudy = await prisma.caseStudy.findUnique({
      where: { id: caseStudyId },
      include: {
        consultant: {
          select: {
            userId: true
          }
        }
      }
    })

    if (!existingCaseStudy) {
      return NextResponse.json(
        { message: 'Case study not found' },
        { status: 404 }
      )
    }

    // Check if user owns this case study or is admin
    if (existingCaseStudy.consultant.userId !== session.user.id && session.user.role !== 'ADMIN') {
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

    const updatedCaseStudy = await prisma.caseStudy.update({
      where: { id: caseStudyId },
      data: {
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
        isPublic: isPublic !== false
      }
    })

    return NextResponse.json(
      { 
        message: 'Case study updated successfully',
        caseStudy: updatedCaseStudy
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Update case study error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/case-studies/[id] - Delete case study
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

    const caseStudyId = params.id

    // Check if case study exists
    const existingCaseStudy = await prisma.caseStudy.findUnique({
      where: { id: caseStudyId },
      include: {
        consultant: {
          select: {
            userId: true
          }
        }
      }
    })

    if (!existingCaseStudy) {
      return NextResponse.json(
        { message: 'Case study not found' },
        { status: 404 }
      )
    }

    // Check if user owns this case study or is admin
    if (existingCaseStudy.consultant.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    // Delete case study
    await prisma.caseStudy.delete({
      where: { id: caseStudyId }
    })

    return NextResponse.json(
      { message: 'Case study deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete case study error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}



