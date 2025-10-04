import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// GET /api/admin/consultants/[id] - Get specific consultant for admin
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const consultantId = resolvedParams.id

    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
          }
        },
        leads: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        testimonials: {
          orderBy: { createdAt: 'desc' }
        },
        portfolioItems: true,
        caseStudies: true,
        payments: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            leads: true,
            testimonials: true,
            portfolioItems: true,
            caseStudies: true,
            payments: true
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

    return NextResponse.json({ consultant })

  } catch (error) {
    console.error('Admin get consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/consultants/[id] - Update consultant status/visibility
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const consultantId = resolvedParams.id
    const { action, reason } = await request.json()

    // Verify consultant exists
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: {
        user: {
          select: {
            email: true,
            name: true
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

    let result

    switch (action) {
      case 'approve':
        result = await prisma.consultant.update({
          where: { id: consultantId },
          data: { 
            isApproved: true,
            updatedAt: new Date()
          }
        })

        // Send approval email
        if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
          try {
            await resend.emails.send({
              from: process.env.FROM_EMAIL,
              to: consultant.user.email,
              subject: 'Your Saaspertise Profile Has Been Approved!',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Congratulations!</h2>
                  <p>Your consultant profile on Saaspertise has been approved and is now live!</p>
                  
                  <p>You can now:</p>
                  <ul>
                    <li>Receive leads from potential clients</li>
                    <li>Manage your portfolio and case studies</li>
                    <li>View analytics on your profile performance</li>
                  </ul>
                  
                  <p>Visit your <a href="${process.env.NEXTAUTH_URL}/dashboard">dashboard</a> to get started.</p>
                  
                  <p>Best regards,<br>The Saaspertise Team</p>
                </div>
              `
            })
          } catch (emailError) {
            console.error('Failed to send approval email:', emailError)
          }
        }

        return NextResponse.json({
          message: 'Consultant approved successfully'
        })

      case 'reject':
        result = await prisma.consultant.update({
          where: { id: consultantId },
          data: { 
            isApproved: false,
            updatedAt: new Date()
          }
        })

        // Send rejection email
        if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
          try {
            await resend.emails.send({
              from: process.env.FROM_EMAIL,
              to: consultant.user.email,
              subject: 'Saaspertise Profile Review Update',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Profile Review Update</h2>
                  <p>Thank you for your interest in Saaspertise. After reviewing your profile, we're unable to approve it at this time.</p>
                  
                  ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                  
                  <p>You can update your profile and resubmit for review. Please ensure:</p>
                  <ul>
                    <li>All required fields are completed</li>
                    <li>Your bio clearly describes your expertise</li>
                    <li>Your portfolio showcases relevant work</li>
                  </ul>
                  
                  <p>If you have questions, please contact our support team.</p>
                  
                  <p>Best regards,<br>The Saaspertise Team</p>
                </div>
              `
            })
          } catch (emailError) {
            console.error('Failed to send rejection email:', emailError)
          }
        }

        return NextResponse.json({
          message: 'Consultant rejected successfully'
        })

      case 'feature':
        result = await prisma.consultant.update({
          where: { id: consultantId },
          data: { 
            isFeatured: true,
            updatedAt: new Date()
          }
        })

        return NextResponse.json({
          message: 'Consultant featured successfully'
        })

      case 'unfeature':
        result = await prisma.consultant.update({
          where: { id: consultantId },
          data: { 
            isFeatured: false,
            updatedAt: new Date()
          }
        })

        return NextResponse.json({
          message: 'Consultant unfeatured successfully'
        })

      case 'delete':
        await prisma.consultant.delete({
          where: { id: consultantId }
        })

        return NextResponse.json({
          message: 'Consultant deleted successfully'
        })

      default:
        return NextResponse.json(
          { message: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Admin consultant action error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}




