import { Metadata } from 'next'
import Link from 'next/link'
import { QuoteFlowServiceSchema } from '@/components/StructuredData'
import Breadcrumbs, { breadcrumbSets } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: "QuoteFlow - Instant Plumbing Quote Calculator",
  description: "QuoteFlow helps plumbers win more jobs with instant, transparent quotes. Generate accurate plumbing quotes in 30 seconds, capture leads automatically, and boost your conversion rates with professional quoting software.",
  keywords: [
    "plumbing quotes",
    "quote calculator",
    "plumber software",
    "instant quotes",
    "plumbing business",
    "QuoteFlow",
    "plumbing tools",
    "quote generation",
    "lead capture",
    "plumbing automation"
  ],
  openGraph: {
    title: "QuoteFlow - The Plumber Quote Calculator",
    description: "Instant, transparent quotes that save plumbers time and win more jobs. Generate accurate quotes in 30 seconds with QuoteFlow.",
    url: "https://www.saaspertise.com/solutions/quoteflow",
    images: [
      {
        url: "/og-quoteflow.jpg",
        width: 1200,
        height: 630,
        alt: "QuoteFlow - Plumbing Quote Calculator",
      },
    ],
  },
  twitter: {
    title: "QuoteFlow - The Plumber Quote Calculator",
    description: "Instant, transparent quotes that save plumbers time and win more jobs. Generate accurate quotes in 30 seconds with QuoteFlow.",
  },
  alternates: {
    canonical: "/solutions/quoteflow",
  },
}

export default function QuoteFlowPage() {
  const features = [
    {
      emoji: "⚡",
      title: "Instant Quote Generation",
      description: "Generate accurate quotes in seconds with our intelligent pricing engine."
    },
    {
      emoji: "🧠",
      title: "Smart Pricing Logic",
      description: "Dynamic pricing based on job complexity, materials, and local market rates."
    },
    {
      emoji: "📱",
      title: "Mobile Optimized Experience",
      description: "Works seamlessly on any device with a responsive, touch-friendly interface."
    },
    {
      emoji: "📊",
      title: "Lead Capture Dashboard",
      description: "Track all enquiries, follow up on leads, and manage your customer pipeline."
    }
  ]

  const steps = [
    {
      number: 1,
      title: "Enter Job Details",
      description: "Select job type, location, and requirements"
    },
    {
      number: 2,
      title: "Get Instant Quote",
      description: "Receive accurate pricing in seconds"
    },
    {
      number: 3,
      title: "Share with Customer",
      description: "Send professional quote via email or SMS"
    },
    {
      number: 4,
      title: "Track & Follow Up",
      description: "Monitor leads and convert more jobs"
    }
  ]

  return (
    <>
      <QuoteFlowServiceSchema />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              QuoteFlow – The Plumber Quote Calculator
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-95 max-w-4xl mx-auto leading-relaxed">
              Instant, transparent quotes that save plumbers time and win more jobs. Transform your quoting process with our intelligent pricing engine.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5 mt-10">
              <div className="hero-feature flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-md">
                <span className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-sm font-bold">✓</span>
                <span className="text-base md:text-lg">Real-time pricing</span>
              </div>
              <div className="hero-feature flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-md">
                <span className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-sm font-bold">✓</span>
                <span className="text-base md:text-lg">Mobile responsive</span>
              </div>
              <div className="hero-feature flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-md">
                <span className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-sm font-bold">✓</span>
                <span className="text-base md:text-lg">Lead capture</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 text-blue-900">
              Key Features
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Everything you need to streamline your quoting process and win more jobs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card relative bg-white p-10 rounded-2xl shadow-md border-2 border-transparent overflow-hidden"
                >
                  <div className="feature-icon w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center text-3xl mb-5 transition-all duration-300">
                    {feature.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20 text-center">
          <div className="max-w-4xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why Choose QuoteFlow?
            </h2>
            <p className="text-lg md:text-xl opacity-95 leading-relaxed">
              Join hundreds of plumbers who are already saving time and winning more jobs with QuoteFlow&apos;s intelligent quoting system.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 text-blue-900">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Four simple steps to transform your quoting process
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="step-card text-center p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="step-number w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5 transition-all duration-300">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-white py-20 text-center">
          <div className="max-w-4xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-blue-900">
              Ready to Transform Your Quoting Process?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              See how QuoteFlow can help you save time, increase conversions, and win more jobs.
            </p>
            <Link
              href="/contact"
              className="cta-button inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-900 text-white text-lg md:text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span>Request a Demo</span>
            </Link>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbSets.quoteFlow} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8" />
      </div>
    </>
  )
}
