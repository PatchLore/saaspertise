import Stripe from 'stripe'

// Initialize Stripe with your secret key (only if env var is set)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
    })
  : null

// Stripe webhook handler for payment events
export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

// Payment intent creation for consultant premium features
export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  consultantId: string,
  paymentType: 'PREMIUM_LISTING' | 'LEAD_ACCESS'
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        consultantId,
        paymentType
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

// Create checkout session for subscription-based features
export async function createCheckoutSession(
  consultantId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        consultantId,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create subscription checkout session for user plans
export async function createSubscriptionCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating subscription checkout session:', error)
    throw error
  }
}

// Create customer portal session for subscription management
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    throw error
  }
}

// Webhook event types for future implementation
export const STRIPE_WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  CHECKOUT_SESSION_COMPLETED: 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
} as const

// SaaS platform pricing tiers
export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Basic profile listing',
      'Up to 3 portfolio items',
      'Basic contact form',
      'Standard support'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 29, // $29/month
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
    features: [
      'Featured listing priority',
      'Unlimited portfolio items',
      'Advanced analytics',
      'Priority support',
      'Lead management tools',
      'Custom branding'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99, // $99/month
    features: [
      'Top-tier placement',
      'Custom branding',
      'API access',
      'White-label options',
      'Dedicated account manager'
    ]
  }
} as const


