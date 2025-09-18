import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../lib/auth'
import { prisma } from '../../../../../../lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action } = await request.json()
    const consultantId = params.id

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      await prisma.consultant.update({
        where: { id: consultantId },
        data: { 
          isApproved: true,
          updatedAt: new Date()
        }
      })

      // TODO: Send approval email to consultant
      console.log(`Consultant ${consultantId} approved`)

      return NextResponse.json({
        message: 'Consultant approved successfully'
      })
    } else {
      // For reject, we could either delete or mark as rejected
      // For now, let's just delete the consultant record
      await prisma.consultant.delete({
        where: { id: consultantId }
      })

      // TODO: Send rejection email to consultant
      console.log(`Consultant ${consultantId} rejected and deleted`)

      return NextResponse.json({
        message: 'Consultant rejected successfully'
      })
    }

  } catch (error) {
    console.error('Admin consultant action error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}




