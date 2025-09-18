import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { consultantId, name, email, company, message } = await request.json()

    // Validate required fields
    if (!consultantId || !name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify consultant exists and is approved
    const consultant = await prisma.consultant.findUnique({
      where: { 
        id: consultantId,
        isApproved: true 
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!consultant) {
      return NextResponse.json(
        { message: 'Consultant not found or not approved' },
        { status: 404 }
      )
    }

    // Get user ID if logged in
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || null

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        consultantId,
        userId,
        name,
        email,
        company: company || null,
        message,
        status: 'NEW'
      }
    })

    // TODO: Send email notification to consultant
    // This would be implemented with Resend/SendGrid
    console.log(`New lead for ${consultant.name}: ${lead.id}`)

    return NextResponse.json(
      { 
        message: 'Lead created successfully',
        leadId: lead.id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create lead error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    // const consultantId = searchParams.get('consultantId') // Currently unused

    let leads

    if (session.user.role === 'ADMIN') {
      // Admin can see all leads
      leads = await prisma.lead.findMany({
        include: {
          consultant: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else if (session.user.consultantId) {
      // Consultant can see their own leads
      leads = await prisma.lead.findMany({
        where: {
          consultantId: session.user.consultantId
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      return NextResponse.json(
        { message: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.json({ leads })

  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}




