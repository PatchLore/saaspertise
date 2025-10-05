import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Users, BarChart3 } from 'lucide-react'
import Breadcrumbs, { breadcrumbSets } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: "Our Solutions",
  description: "Discover our powerful SaaS tools designed to help businesses grow. From QuoteFlow for instant plumbing quotes to future AI-powered solutions, explore our suite of web applications built for efficiency and customer success.",
  keywords: [
    "SaaS tools",
    "business software",
    "QuoteFlow",
    "plumbing quotes",
    "business automation",
    "web applications",
    "SaaS solutions",
    "business tools"
  ],
  openGraph: {
    title: "Saaspertise Solutions - Powerful SaaS Tools for Business",
    description: "Explore our growing suite of SaaS applications designed to save time, increase trust, and help you win more customers.",
    url: "https://www.saaspertise.com/solutions",
    images: [
      {
        url: "/og-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "Saaspertise Solutions - SaaS Tools",
      },
    ],
  },
  twitter: {
    title: "Saaspertise Solutions - Powerful SaaS Tools for Business",
    description: "Explore our growing suite of SaaS applications designed to save time, increase trust, and help you win more customers.",
  },
  alternates: {
    canonical: "/solutions",
  },
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs items={breadcrumbSets.solutions} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful SaaS Tools for{' '}
              <span className="text-blue-600">Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore our growing suite of web apps designed to save time, increase trust, 
              and help you win more customers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Our Solutions Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our suite of specialized web applications designed to streamline 
              your business processes and drive growth.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* QuoteFlow Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-blue-600 font-medium">QuoteFlow Screenshot</p>
                  <p className="text-sm text-blue-500 mt-1">Plumber Quote Calculator</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  QuoteFlow – Instant Plumbing Quotes
                </h3>
                <p className="text-gray-600 mb-6">
                  QuoteFlow helps plumbers win more jobs with instant, transparent quotes. 
                  Customers get 30-second estimates, plumbers save time, and every enquiry 
                  is captured as a lead.
                </p>
                <Link
                  href="/solutions/quoteflow"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Coming Soon Cards */}
            <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-200 overflow-hidden opacity-60">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-500 font-medium">Coming Soon</p>
                  <p className="text-sm text-gray-400 mt-1">New Solution</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-400 mb-3">
                  More Solutions Coming Soon
                </h3>
                <p className="text-gray-400 mb-6">
                  We&apos;re constantly developing new tools to help businesses grow and succeed. 
                  Stay tuned for more innovative solutions.
                </p>
                <span className="inline-flex items-center text-gray-400 font-medium">
                  Coming Soon
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-200 overflow-hidden opacity-60">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-500 font-medium">Coming Soon</p>
                  <p className="text-sm text-gray-400 mt-1">New Solution</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-400 mb-3">
                  More Solutions Coming Soon
                </h3>
                <p className="text-gray-400 mb-6">
                  We&apos;re constantly developing new tools to help businesses grow and succeed. 
                  Stay tuned for more innovative solutions.
                </p>
                <span className="inline-flex items-center text-gray-400 font-medium">
                  Coming Soon
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a personalized demo of our solutions and see how they can help your business grow.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Request a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
