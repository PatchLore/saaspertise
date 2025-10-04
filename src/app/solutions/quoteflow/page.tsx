import Link from 'next/link'
import { ArrowRight, Zap, Smartphone, Users, BarChart3, CheckCircle, Clock, DollarSign, Target } from 'lucide-react'

export default function QuoteFlowPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Quote Generation",
      description: "Generate accurate quotes in seconds with our intelligent pricing engine."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Pricing Logic",
      description: "Dynamic pricing based on job complexity, materials, and local market rates."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized Experience",
      description: "Works seamlessly on any device with a responsive, touch-friendly interface."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lead Capture Dashboard",
      description: "Track all enquiries, follow up on leads, and manage your customer pipeline."
    }
  ]

  const benefits = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Save 15+ minutes per quote"
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      text: "Increase quote conversion by 40%"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Capture 100% of enquiries as leads"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Professional, transparent pricing"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                QuoteFlow – The{' '}
                <span className="text-blue-600">Plumber Quote Calculator</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Instant, transparent quotes that save plumbers time and win more jobs. 
                Transform your quoting process with our intelligent pricing engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  Back to Solutions
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">QuoteFlow Demo</h3>
                  <p className="text-blue-500">Interactive Quote Calculator</p>
                  <div className="mt-4 text-sm text-blue-400">
                    <p>• Real-time pricing</p>
                    <p>• Mobile responsive</p>
                    <p>• Lead capture</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to streamline your quoting process and win more jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose QuoteFlow?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of plumbers who are already saving time and winning more jobs 
                with QuoteFlow&apos;s intelligent quoting system.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                      {benefit.icon}
                    </div>
                    <span className="text-lg text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                How It Works
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Enter Job Details</h4>
                    <p className="text-gray-600">Select job type, location, and requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Get Instant Quote</h4>
                    <p className="text-gray-600">Receive accurate pricing in seconds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Share with Customer</h4>
                    <p className="text-gray-600">Send professional quote via email or SMS</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Track & Follow Up</h4>
                    <p className="text-gray-600">Monitor leads and convert more jobs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Quoting Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            See how QuoteFlow can help you save time, increase conversions, and win more jobs.
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
