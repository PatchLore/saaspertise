import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createPaymentIntent } from '@/lib/stripe'

// POST /api/payments/create-intent - Create payment intent for premium features
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      consultantId, 
      paymentType, 
      amount 
    } = await request.json()

    // Validate input
    if (!consultantId || !paymentType || !amount) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['PREMIUM_LISTING', 'LEAD_ACCESS'].includes(paymentType)) {
      return NextResponse.json(
        { message: 'Invalid payment type' },
        { status: 400 }
      )
    }

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

    // Create payment intent
    const paymentIntent = await createPaymentIntent(
      amount,
      'usd',
      consultantId,
      paymentType
    )

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Create payment intent error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}



