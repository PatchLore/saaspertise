import Link from 'next/link'
import { CheckCircle, Users, Target, Award, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Consultants Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The UK&apos;s premier platform connecting businesses with expert SaaS and AI consultants. 
            We&apos;re building the future of digital transformation, one connection at a time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Mission */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to empower SaaS and AI consultants by giving them greater visibility, credibility, and opportunities to work with ambitious businesses. We believe every company deserves access to world-class expertise, and every consultant deserves a platform to showcase their skills and grow their practice.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vetted Experts</h3>
              <p className="text-gray-600">
                Every consultant is thoroughly reviewed and approved by our team. 
                We verify credentials, experience, and track record.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">UK-Focused</h3>
              <p className="text-gray-600">
                Specialising in the UK market with consultants who understand 
                local business culture, regulations, and opportunities.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Specialist Expertise</h3>
              <p className="text-gray-600">
                Focused exclusively on SaaS development and AI implementation – 
                the technologies driving tomorrow&apos;s businesses.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Seamless Matching</h3>
              <p className="text-gray-600">
                Advanced filtering by industry, region, and expertise ensures 
                you find the perfect consultant for your specific needs.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Founded in 2025, Consultants Directory was born from a simple observation: 
              businesses across the UK were struggling to find qualified SaaS and AI consultants, 
              while talented experts were finding it difficult to connect with the right clients.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We set out to solve this problem by creating a premium platform that prioritises 
              quality over quantity. Every consultant on our platform is carefully vetted, 
              and every business gets access to detailed profiles, verified credentials, 
              and direct contact with the experts they need.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we&apos;re proud to be the go-to platform for SaaS and AI expertise across 
              the UK, from the innovation hubs of London and Manchester to the emerging 
              tech scenes in Bristol, Edinburgh, and beyond.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Expert Consultants</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Industries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses who have found their perfect consultant match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/directory"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Find a Consultant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/signup"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                List Your Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




