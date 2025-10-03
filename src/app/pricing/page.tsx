'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Check, Crown, Zap, Building } from 'lucide-react'
import { PRICING_TIERS } from '@/lib/stripe'

export default function PricingPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpgrade = async (plan: string) => {
    if (!session?.user) {
      setMessage('Please sign in to upgrade your plan')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/stripe/subscription/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (response.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        setMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestUpgrade = async (plan: string) => {
    if (!session?.user) {
      setMessage('Please sign in to test upgrade')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/stripe/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'upgrade', plan }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        // Refresh the page to show updated plan
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const plans = [
    {
      name: 'Free',
      icon: <Zap className="w-6 h-6" />,
      price: PRICING_TIERS.FREE.price,
      period: '',
      description: 'Perfect for getting started',
      features: PRICING_TIERS.FREE.features,
      cta: 'Current Plan',
      ctaDisabled: true,
      highlight: session?.user?.plan === 'FREE',
      popular: false,
    },
    {
      name: 'Pro',
      icon: <Crown className="w-6 h-6" />,
      price: PRICING_TIERS.PRO.price,
      period: '/month',
      description: 'Best for growing consultants',
      features: PRICING_TIERS.PRO.features,
      cta: 'Upgrade to Pro',
      ctaDisabled: false,
      highlight: session?.user?.plan === 'PRO',
      popular: true,
      testCta: 'Test Pro Upgrade',
    },
    {
      name: 'Enterprise',
      icon: <Building className="w-6 h-6" />,
      price: PRICING_TIERS.ENTERPRISE.price,
      period: '/month',
      description: 'For large organizations',
      features: PRICING_TIERS.ENTERPRISE.features,
      cta: 'Coming Soon',
      ctaDisabled: true,
      highlight: session?.user?.plan === 'ENTERPRISE',
      popular: false,
      testCta: 'Test Enterprise',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your consulting business. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className={`px-4 py-3 rounded-md text-sm ${
              message.includes('Successfully') 
                ? 'bg-green-50 border border-green-200 text-green-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message}
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.highlight ? 'ring-2 ring-blue-500' : ''
              } ${plan.popular ? 'scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.name === 'Free' ? 'bg-gray-100 text-gray-600' :
                    plan.name === 'Pro' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleUpgrade(plan.name.toUpperCase())}
                  disabled={plan.ctaDisabled || isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.ctaDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  {isLoading ? 'Processing...' : plan.cta}
                </button>

                {/* Test Button for Development */}
                {plan.testCta && process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={() => handleTestUpgrade(plan.name.toUpperCase())}
                    disabled={isLoading}
                    className="w-full py-2 px-4 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  >
                    {isLoading ? 'Processing...' : plan.testCta}
                  </button>
                )}
              </div>

              {/* Coming Soon Tooltip */}
              {plan.name === 'Enterprise' && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Enterprise features coming soon! Contact us for early access.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards through Stripe&apos;s secure payment processing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Our Free plan is always available with no time limits. Try Pro risk-free with our 30-day money-back guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                You can cancel anytime from your dashboard. Your subscription will remain active until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
