import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

    const { action, plan } = await request.json()

    if (!action || !['upgrade', 'downgrade'].includes(action)) {
      return NextResponse.json(
        { message: 'Invalid action. Must be upgrade or downgrade' },
        { status: 400 }
      )
    }

    if (action === 'upgrade' && !plan) {
      return NextResponse.json(
        { message: 'Plan required for upgrade action' },
        { status: 400 }
      )
    }

    const userId = session.user.id

    if (action === 'upgrade') {
      // Simulate successful subscription upgrade
      const userPlan = plan === 'PRO' ? 'PRO' : 'ENTERPRISE'
      
      // Update user plan
      await prisma.user.update({
        where: { id: userId },
        data: { plan: userPlan }
      })

      // Create subscription record
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          status: 'active',
          plan: userPlan,
          stripeSubscriptionId: `test_sub_${Date.now()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
        create: {
          userId,
          status: 'active',
          plan: userPlan,
          stripeSubscriptionId: `test_sub_${Date.now()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }
      })

      return NextResponse.json({
        message: `Successfully upgraded to ${userPlan} plan`,
        plan: userPlan
      })

    } else if (action === 'downgrade') {
      // Simulate subscription cancellation/downgrade
      await prisma.user.update({
        where: { id: userId },
        data: { plan: 'FREE' }
      })

      // Update subscription status
      await prisma.subscription.updateMany({
        where: { userId },
        data: { 
          status: 'canceled',
          cancelAtPeriodEnd: true 
        }
      })

      return NextResponse.json({
        message: 'Successfully downgraded to FREE plan',
        plan: 'FREE'
      })
    }

  } catch (error) {
    console.error('Test subscription error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}


