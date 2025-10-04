'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crown, MapPin, ExternalLink, Mail, Phone, Calendar, Star, Send, ArrowLeft, Linkedin, Twitter, Github, CheckCircle, Briefcase, DollarSign, Award, Clock } from 'lucide-react'
import ContactConsultantForm from './ContactConsultantForm'
import { getPricingDisplay } from '@/lib/pricing-utils'


interface PortfolioItem {
  id: string
  title: string
  description: string
  metrics?: string | null
  technologies: string[] | string
  projectType?: string | null
  clientType?: string | null
  duration?: string | null
  imageUrl?: string | null
  projectUrl?: string | null
  caseStudyUrl?: string | null
  displayOrder: number
}

interface Consultant {
  id: string
  name: string
  logo?: string | null
  profilePhoto?: string | null
  shortDescription?: string | null
  description: string
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  website?: string | null
  email: string
  phone?: string | null
  hourlyRate?: number | null
  projectRateMin?: number | null
  projectRateMax?: number | null
  showRates: boolean
  createdAt: Date
  responseRate?: number | null
  responseTime?: number | null
  projectsCompleted?: number | null
  clientRating?: number | null
  portfolioItems?: PortfolioItem[]
  user?: {
    name: string | null
    email: string
  }
}

interface ConsultantProfileProps {
  consultant: Consultant
}

export default function ConsultantProfile({ consultant }: ConsultantProfileProps) {
  const [showContactForm, setShowContactForm] = useState(false)

  const memberSince = new Date(consultant.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/directory"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left: Profile Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {consultant.profilePhoto ? (
                    <Image
                      src={consultant.profilePhoto}
                      alt={consultant.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    />
                  ) : consultant.logo ? (
                    <Image
                      src={consultant.logo}
                      alt={`${consultant.name} logo`}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {consultant.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{consultant.name}</h1>
                    {consultant.isPremium && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        <Crown className="h-4 w-4" />
                        Premium
                      </div>
                    )}
                  </div>

                  <p className="text-xl text-gray-600 mb-4">
                    {consultant.shortDescription}
                  </p>

                  <div className="flex items-center gap-6 text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{consultant.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {memberSince}</span>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2">
                    {consultant.services.map((service) => (
                      <span
                        key={service}
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {service === 'SAAS' ? 'SaaS Development' : 
                         service === 'AI' ? 'AI Implementation' : 
                         'SaaS & AI Expert'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full lg:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <Send className="h-5 w-5" />
                Contact Consultant
              </button>
              
              {consultant.website && (
                <a
                  href={consultant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full lg:w-auto border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-medium hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">About</span>
                </div>
                About
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {consultant.description}
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                Services
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {consultant.services.map((service) => (
                  <div key={service} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {service === 'SAAS' ? 'SaaS' : service === 'AI' ? 'AI' : 'Full'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {service === 'SAAS' ? 'SaaS Development' : 
                         service === 'AI' ? 'AI Implementation' : 
                         'SaaS & AI Integration'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service === 'SAAS' ? 'Custom software-as-a-service solutions' : 
                         service === 'AI' ? 'Machine learning and artificial intelligence' : 
                         'Complete digital transformation services'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs">IND</span>
                </div>
                Industries Served
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {consultant.industries.map((industry) => (
                  <div
                    key={industry}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm font-medium text-center hover:from-blue-50 hover:to-blue-100 hover:text-blue-800 transition-colors"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                Client Testimonials
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">5.0</span>
                  </div>
                  <p className="text-gray-800 font-medium mb-3 leading-relaxed">
                    &ldquo;Exceptional AI implementation expertise. Delivered our machine learning project ahead of schedule and provided excellent ongoing support.&rdquo;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    — Sarah Chen, Tech Director at FinTech Innovations
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">5.0</span>
                  </div>
                  <p className="text-gray-800 font-medium mb-3 leading-relaxed">
                    &ldquo;Outstanding communication and technical skills. Transformed our entire SaaS architecture. Would definitely work with again.&rdquo;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    — James Wilson, CTO at Healthcare Solutions Ltd
                  </p>
                </div>
              </div>
            </div>

            {/* Portfolio Section */}
            {consultant.portfolioItems && consultant.portfolioItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                  </div>
                  Portfolio & Case Studies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {consultant.portfolioItems
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((item) => (
                      <div key={item.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                            {item.projectType && (
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {item.projectType}
                              </span>
                            )}
                          </div>
                          {item.duration && (
                            <span className="text-sm text-gray-500 font-medium">{item.duration}</span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>

                        {item.metrics && (
                          <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-4">
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-green-600 mr-2" />
                              <p className="text-green-800 font-medium text-sm">{item.metrics}</p>
                            </div>
                          </div>
                        )}

                        {item.clientType && (
                          <p className="text-sm text-gray-600 mb-3">
                            <strong>Client:</strong> {item.clientType}
                          </p>
                        )}

                        {item.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {(typeof item.technologies === 'string' 
                              ? JSON.parse(item.technologies) 
                              : item.technologies
                            ).map((tech: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Stats</h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Response Rate</span>
                  <span className="font-bold text-green-600 text-lg">{consultant.responseRate || 95}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Response Time</span>
                  <span className="font-bold text-gray-900">{consultant.responseTime || 2} hours</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Projects</span>
                  <span className="font-bold text-gray-900">{consultant.projectsCompleted || 25}+</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Client Rating</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{consultant.clientRating || 4.8}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements & Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Achievements & Stats</h3>
              
              {/* Badges Row */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Verified Consultant
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    Top Rated
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    Fast Responder
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div>
                <h4 className="text-sm font-semibold text-gray-600 mb-3">Quick Stats</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Projects Completed</span>
                    </div>
                    <span className="font-bold text-gray-900">{consultant.projectsCompleted || 25}+</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Avg. Response Time</span>
                    </div>
                    <span className="font-bold text-gray-900">{consultant.responseTime || 2}h</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Client Rating</span>
                    </div>
                    <span className="font-bold text-gray-900">{consultant.clientRating || 4.8}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Pricing
              </h3>
              
              <div className="text-center py-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {getPricingDisplay(consultant)}
                </div>
                {consultant.showRates && (
                  <p className="text-sm text-gray-600">
                    Rates shown are indicative. Final pricing depends on project scope and requirements.
                  </p>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <a 
                    href={`mailto:${consultant.email}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    {consultant.email}
                  </a>
                </div>
                
                {consultant.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <a 
                      href={`tel:${consultant.phone}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                    >
                      {consultant.phone}
                    </a>
                  </div>
                )}

                {consultant.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-purple-600" />
                    </div>
                    <a 
                      href={consultant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium truncate"
                    >
                      {consultant.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Connect</h4>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                    title="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Certifications</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">AWS Solutions Architect</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">Google Cloud Professional</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">Microsoft Azure Expert</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">Certified Scrum Master</span>
                </div>
              </div>
            </div>

            {/* Strong CTA Box */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get in touch to discuss your project requirements
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Contact Consultant Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactConsultantForm
          consultant={consultant}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  )
}