import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createSubscriptionCheckoutSession, PRICING_TIERS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const { plan } = await request.json()

    // Validate plan
    if (!plan || !['PRO', 'ENTERPRISE'].includes(plan)) {
      return NextResponse.json(
        { message: 'Invalid plan. Must be PRO or ENTERPRISE' },
        { status: 400 }
      )
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id }
    })

    if (existingSubscription && existingSubscription.status === 'active') {
      return NextResponse.json(
        { message: 'User already has an active subscription' },
        { status: 400 }
      )
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // For Enterprise plan, show coming soon message
    if (plan === 'ENTERPRISE') {
      return NextResponse.json(
        { message: 'Enterprise plan coming soon!' },
        { status: 400 }
      )
    }

    // Create Stripe customer if doesn't exist
    const customerId = user.stripeCustomerId
    
    if (!customerId) {
      // This would typically create a Stripe customer, but for now we'll use a placeholder
      // In production, you'd create the customer here
      return NextResponse.json(
        { message: 'Stripe customer setup required' },
        { status: 400 }
      )
    }

    // Create checkout session
    const priceId = PRICING_TIERS[plan as keyof typeof PRICING_TIERS]?.priceId
    
    if (!priceId) {
      return NextResponse.json(
        { message: 'Price ID not configured for this plan' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/dashboard?subscription=success`
    const cancelUrl = `${baseUrl}/pricing?subscription=cancelled`

    const checkoutSession = await createSubscriptionCheckoutSession(
      session.user.id,
      priceId,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({
      checkoutUrl: checkoutSession.url
    })

  } catch (error) {
    console.error('Subscription checkout error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
