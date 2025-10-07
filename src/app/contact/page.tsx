import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Saaspertise. Request a demo of our SaaS solutions, inquire about consultant services, or ask questions about our platform. We're here to help your business grow.",
  keywords: [
    "contact saaspertise",
    "request demo",
    "consultant inquiry",
    "get in touch",
    "business contact",
    "support"
  ],
  openGraph: {
    title: "Contact Saaspertise - Request a Demo",
    description: "Get in touch with Saaspertise for demos, consultant inquiries, or platform questions.",
    url: "https://www.saaspertise.com/contact",
  },
  twitter: {
    title: "Contact Saaspertise - Request a Demo",
    description: "Get in touch with Saaspertise for demos, consultant inquiries, or platform questions.",
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our solutions or want to request a demo? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <a
                        href="mailto:info@saaspertise.com"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        info@saaspertise.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <a
                        href="tel:+447925990923"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        07925 990923
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">
                        United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    href="/solutions"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    → Explore Our Solutions
                  </Link>
                  <Link
                    href="/directory"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    → Browse Consultants
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    → View Pricing Plans
                  </Link>
                  <Link
                    href="/about"
                    className="block text-blue-600 hover:text-blue-700 font-medium"
                  >
                    → Learn About Us
                  </Link>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ or Additional Info */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our platform and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I request a demo?</h3>
              <p className="text-gray-600">
                Simply fill out the contact form above selecting &quot;Request a Demo&quot; as the subject. 
                We&apos;ll reach out within 24 hours to schedule a personalized demonstration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! We offer a FREE plan for consultants to get started. You can upgrade to 
                PRO or ENTERPRISE plans anytime as your business grows.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I become a listed consultant?</h3>
              <p className="text-gray-600">
                Sign up for a free account, complete your profile, and our team will review your 
                application. Approved consultants appear in our directory within 48 hours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What support do you offer?</h3>
              <p className="text-gray-600">
                All users receive email support. PRO users get priority support, and ENTERPRISE 
                users receive dedicated account management and 24/7 support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
