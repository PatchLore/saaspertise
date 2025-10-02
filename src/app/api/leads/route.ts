import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send email notification to consultant
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: consultant.email,
          subject: `New Lead from Saaspertise - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Lead from Saaspertise</h2>
              <p>You have received a new lead inquiry:</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Contact Information:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
              </div>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p><strong>Lead ID:</strong> ${lead.id}</p>
                <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                This lead was generated through your Saaspertise profile. 
                Please respond directly to the client's email address.
              </p>
            </div>
          `
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
        // Don't fail the request if email fails
      }
    }

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




