import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.consultantId) {
      return NextResponse.json(
        { message: 'Unauthorized - Consultant access required' },
        { status: 401 }
      )
    }

    const { consultantId, clientName, clientTitle, clientCompany, content, rating } = await request.json()

    // Verify the consultant owns this profile
    if (consultantId !== session.user.consultantId) {
      return NextResponse.json(
        { message: 'Unauthorized - Can only add testimonials to your own profile' },
        { status: 403 }
      )
    }

    // Validate required fields
    if (!clientName || !content) {
      return NextResponse.json(
        { message: 'Client name and content are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        consultantId,
        clientName,
        clientTitle: clientTitle || null,
        clientCompany: clientCompany || null,
        content,
        rating,
        isApproved: true // Auto-approve for now, can add moderation later
      }
    })

    return NextResponse.json(
      { 
        message: 'Testimonial added successfully',
        testimonial: {
          id: testimonial.id,
          clientName: testimonial.clientName,
          rating: testimonial.rating
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Add testimonial error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.consultantId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const testimonialId = searchParams.get('id')

    if (!testimonialId) {
      return NextResponse.json(
        { message: 'Testimonial ID required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      include: { consultant: true }
    })

    if (!testimonial || testimonial.consultant.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Testimonial not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete testimonial
    await prisma.testimonial.delete({
      where: { id: testimonialId }
    })

    return NextResponse.json(
      { message: 'Testimonial deleted successfully' }
    )

  } catch (error) {
    console.error('Delete testimonial error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}






