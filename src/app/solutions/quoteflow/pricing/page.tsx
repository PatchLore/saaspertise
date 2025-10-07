import { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Rocket, Crown, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "QuoteFlow Pricing - Choose Your Plan",
  description: "Get QuoteFlow for your plumbing business. Choose from One-Page Website, Full Standalone Website, or Lifetime Access with no monthly fees. Instant quotes, professional design, lead capture included.",
  keywords: [
    "QuoteFlow pricing",
    "plumber website",
    "quote calculator pricing",
    "plumbing software pricing",
    "website for plumbers",
    "quote calculator cost"
  ],
  openGraph: {
    title: "QuoteFlow Pricing - Choose Your Plan",
    description: "Get QuoteFlow for your plumbing business. From £249.99 one-time setup. Professional quote calculator with lead management.",
    url: "https://www.saaspertise.com/solutions/quoteflow/pricing",
  },
  alternates: {
    canonical: "/solutions/quoteflow/pricing",
  },
}

export default function QuoteFlowPricingPage() {
  const pricingOptions = [
    {
      name: "One-Page Website",
      icon: <Zap className="w-6 h-6" />,
      setupFee: "249.99",
      monthlyFee: "20",
      description: "Perfect for getting started quickly",
      features: [
        "QuoteFlow calculator integrated",
        "Professional one-page design",
        "Lead capture & notifications",
        "Mobile optimized",
        "Basic branding customization",
        "Hosting & SSL included",
        "Monthly updates & support",
        "Lead management dashboard"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Full Standalone Website",
      icon: <Rocket className="w-6 h-6" />,
      setupFee: "449.99",
      monthlyFee: "30",
      description: "Complete website with multiple pages",
      features: [
        "Everything in One-Page plan",
        "Multi-page professional website",
        "About, Services, Contact pages",
        "SEO optimization",
        "Google Analytics integration",
        "Custom branding & design",
        "Blog/News section",
        "Priority support",
        "Advanced lead management"
      ],
      popular: true,
      color: "blue"
    },
    {
      name: "Lifetime Access",
      icon: <Crown className="w-6 h-6" />,
      setupFee: "559.99",
      monthlyFee: null,
      description: "One payment, no monthly fees",
      features: [
        "Everything in Full Website plan",
        "No monthly subscription fees",
        "12 months hosting & support included",
        "Lifetime software updates",
        "Own your website outright",
        "Transfer to your own hosting anytime",
        "Priority implementation",
        "Dedicated onboarding",
        "Best long-term value"
      ],
      popular: false,
      color: "purple",
      badge: "Best Value"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your QuoteFlow Plan
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
            Select the perfect package for your plumbing business. All plans include QuoteFlow&apos;s powerful quote calculator, lead capture, and professional design.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-16 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Grid container with equal height columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                  option.popular ? 'ring-4 ring-blue-500 md:scale-105' : ''
                }`}
              >
                {/* Badge Container - Fixed Height */}
                <div className="h-4 mb-2">
                  {/* Popular Badge */}
                  {option.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Best Value Badge */}
                  {option.badge && (
                    <div className="absolute -top-4 right-4">
                      <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                        {option.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content - Flex Column */}
                <div className="flex flex-col h-full p-8">
                  {/* Icon - Fixed Height */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl ${
                      option.color === 'purple' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {option.icon}
                    </div>
                  </div>

                  {/* Plan Name - Fixed Height */}
                  <h3 className="text-2xl font-bold text-center mb-2 text-gray-900 min-h-[4rem] flex items-center justify-center">
                    {option.name}
                  </h3>
                  
                  {/* Description - Fixed Height */}
                  <p className="text-center text-gray-600 mb-6 min-h-[3rem] flex items-center justify-center">
                    {option.description}
                  </p>

                  {/* Pricing Section - Fixed Height */}
                  <div className="text-center mb-8 min-h-[10rem] flex flex-col justify-center">
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center min-h-[3rem]">
                        <span className="text-4xl font-bold text-gray-900">
                          £{option.setupFee}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        One-time setup fee
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 min-h-[4.5rem]">
                      {option.monthlyFee ? (
                        <>
                          <div className="flex items-baseline justify-center">
                            <span className="text-2xl font-bold text-gray-900">
                              £{option.monthlyFee}
                            </span>
                            <span className="text-gray-600 ml-1">/month</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Hosting & support
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-green-600">
                            No monthly fees!
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            12 months hosting included
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features List - Flex Grow to Fill Space */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button - Pinned to Bottom */}
                  <div className="mt-auto">
                    <Link
                      href={`/contact?plan=${option.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                        option.color === 'purple'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl'
                          : option.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="inline-block ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            What&apos;s Included in Every Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Quotes</h3>
              <p className="text-gray-600 text-sm">
                Smart quote calculator with real-time pricing
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lead Capture</h3>
              <p className="text-gray-600 text-sm">
                Automatic lead notifications via email
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-gray-600 text-sm">
                Perfect on phones, tablets, and desktops
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Branding</h3>
              <p className="text-gray-600 text-sm">
                Your logo, colors, and business details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How quickly can I get started?
              </h3>
              <p className="text-gray-600">
                Once you place your order, we&apos;ll have your QuoteFlow website set up within 5-7 business days. The Lifetime Access plan gets priority implementation within 3-5 days.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I customize the quote calculator for my services?
              </h3>
              <p className="text-gray-600">
                Absolutely! We&apos;ll work with you to configure the calculator with your specific services, pricing structure, and service areas during setup.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens after the 12 months on the Lifetime plan?
              </h3>
              <p className="text-gray-600">
                After 12 months, you can either transfer to your own hosting (we&apos;ll help you), or continue with our hosting at just £10/month. You own the software forever regardless.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade my plan later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade from One-Page to Full Website or Lifetime at any time. We&apos;ll credit your initial payment toward the upgrade.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I need technical knowledge?
              </h3>
              <p className="text-gray-600">
                Not at all! We handle all the technical setup. You&apos;ll get a simple dashboard to view your leads and we&apos;ll train you on any features you need.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit/debit cards via secure Stripe payment processing. For the Lifetime plan, we can also arrange bank transfer for UK customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Win More Plumbing Jobs?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95">
            Join plumbers across the UK who are using QuoteFlow to generate instant quotes and capture more leads.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?plan=full-standalone-website"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </Link>
            <Link
              href="/solutions/quoteflow"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Learn More About QuoteFlow
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

