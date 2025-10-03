import { NextRequest, NextResponse } from 'next/server'
import { stripe, stripeWebhookSecret, STRIPE_WEBHOOK_EVENTS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  // Return early if Stripe is not configured
  if (!stripe || !stripeWebhookSecret) {
    return NextResponse.json(
      { message: 'Stripe is not configured' },
      { status: 503 }
    )
  }

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { message: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_SUCCEEDED:
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_PAYMENT_FAILED:
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case STRIPE_WEBHOOK_EVENTS.CHECKOUT_SESSION_COMPLETED:
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case STRIPE_WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_CREATED:
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case STRIPE_WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_UPDATED:
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case STRIPE_WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_DELETED:
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { message: 'Webhook handler error' },
      { status: 500 }
    )
  }
}

// Payment intent succeeded
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { consultantId, paymentType } = paymentIntent.metadata

    if (!consultantId || !paymentType) {
      console.error('Missing metadata in payment intent:', paymentIntent.id)
      return
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        consultantId,
        stripePaymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: 'COMPLETED',
        type: paymentType as 'PREMIUM_LISTING' | 'LEAD_ACCESS'
      }
    })

    // Update consultant based on payment type
    if (paymentType === 'PREMIUM_LISTING') {
      await prisma.consultant.update({
        where: { id: consultantId },
        data: { 
          isPremium: true,
          stripeCustomerId: paymentIntent.customer as string
        }
      })
    }

    console.log(`Payment succeeded for consultant ${consultantId}: ${paymentIntent.id}`)

  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

// Payment intent failed
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { consultantId } = paymentIntent.metadata

    if (consultantId) {
      // Create payment record with failed status
      await prisma.payment.create({
        data: {
          consultantId,
          stripePaymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: 'FAILED',
          type: paymentIntent.metadata.paymentType as 'PREMIUM_LISTING' | 'LEAD_ACCESS'
        }
      })
    }

    console.log(`Payment failed for consultant ${consultantId}: ${paymentIntent.id}`)

  } catch (error) {
    console.error('Error handling payment intent failed:', error)
  }
}

// Checkout session completed
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const { consultantId } = session.metadata || {}

    if (consultantId && session.customer) {
      // Update consultant with Stripe customer ID
      await prisma.consultant.update({
        where: { id: consultantId },
        data: { 
          stripeCustomerId: session.customer as string
        }
      })
    }

    console.log(`Checkout session completed: ${session.id}`)

  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

// Subscription created
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId
    
    if (!userId) {
      console.error('Missing userId in subscription metadata:', subscription.id)
      return
    }

    // Update user plan to PRO
    await prisma.user.update({
      where: { id: userId },
      data: { 
        plan: 'PRO',
        stripeCustomerId: subscription.customer as string
      }
    })

    // Create subscription record
    await prisma.subscription.upsert({
      where: { userId },
      update: {
        status: subscription.status,
        plan: 'PRO',
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      create: {
        userId,
        status: subscription.status,
        plan: 'PRO',
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      }
    })

    console.log(`Subscription created for user ${userId}: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

// Subscription updated
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId
    
    if (!userId) {
      console.error('Missing userId in subscription metadata:', subscription.id)
      return
    }

    // Update subscription record
    await prisma.subscription.updateMany({
      where: { userId },
      data: {
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      }
    })

    console.log(`Subscription updated for user ${userId}: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

// Subscription deleted
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId
    
    if (!userId) {
      console.error('Missing userId in subscription metadata:', subscription.id)
      return
    }

    // Downgrade user to FREE plan
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

    console.log(`Subscription canceled for user ${userId}: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}


