'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, MessageSquare, Eye, CheckCircle, Clock, Crown, Zap, Building } from 'lucide-react'
import Link from 'next/link'
import { getPlanDisplayName, getUpgradeSuggestion } from '@/lib/plan-access'

interface Testimonial {
  id: string
  clientName: string
  clientTitle?: string | null
  clientCompany?: string | null
  content: string
  rating: number
  isApproved: boolean
  createdAt: Date
}

interface Lead {
  id: string
  name: string
  email: string
  company?: string | null
  message: string
  status: string
  createdAt: Date
}

interface Consultant {
  id: string
  name: string
  description: string
  shortDescription?: string | null
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  isApproved: boolean
  isFeatured: boolean
  email: string
  phone?: string | null
  website?: string | null
  leads: Lead[]
  testimonials: Testimonial[]
}

interface User {
  id: string
  name?: string | null
  email: string
  plan: 'FREE' | 'PRO' | 'ENTERPRISE'
  subscription?: {
    status: string
    currentPeriodEnd: Date
    cancelAtPeriodEnd: boolean
  } | null
}

interface ConsultantDashboardProps {
  consultant: Consultant
  user: User
}

export default function ConsultantDashboard({ consultant, user }: ConsultantDashboardProps) {
  const [showAddTestimonial, setShowAddTestimonial] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    clientTitle: '',
    clientCompany: '',
    content: '',
    rating: 5
  })

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultantId: consultant.id,
          ...newTestimonial
        })
      })

      if (response.ok) {
        setShowAddTestimonial(false)
        setNewTestimonial({
          clientName: '',
          clientTitle: '',
          clientCompany: '',
          content: '',
          rating: 5
        })
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding testimonial:', error)
    }
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }: { icon: React.ComponentType<{ className?: string }>, title: string, value: string, subtitle: string, color?: string }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 font-medium">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Profile Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Status</h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                consultant.isApproved 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {consultant.isApproved ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                {consultant.isApproved ? 'Approved' : 'Pending Approval'}
              </div>
              
              {consultant.isPremium && (
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Crown className="h-4 w-4" />
                  Premium
                </div>
              )}
            </div>
          </div>
          
          <Link
            href={`/consultant/${consultant.id}`}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View Public Profile
          </Link>
        </div>
      </div>

      {/* Plan Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Subscription Plan</h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                user.plan === 'FREE' ? 'bg-gray-100 text-gray-800' :
                user.plan === 'PRO' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {user.plan === 'FREE' && <Zap className="h-4 w-4" />}
                {user.plan === 'PRO' && <Crown className="h-4 w-4" />}
                {user.plan === 'ENTERPRISE' && <Building className="h-4 w-4" />}
                {getPlanDisplayName(user.plan)}
              </div>
              
              {user.subscription && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {user.subscription.cancelAtPeriodEnd ? (
                    <span className="text-orange-600">Cancels at period end</span>
                  ) : (
                    <span>Renews {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            {user.plan === 'FREE' && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Link>
            )}
            {user.plan === 'PRO' && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Building className="h-4 w-4" />
                Upgrade to Enterprise
              </Link>
            )}
            {user.plan === 'ENTERPRISE' && (
              <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                <Building className="h-4 w-4" />
                Highest Plan
              </div>
            )}
          </div>
        </div>
        
        {getUpgradeSuggestion(user.plan) && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">{getUpgradeSuggestion(user.plan)}</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={MessageSquare}
          title="Total Leads"
          value={consultant.leads.length.toString()}
          subtitle="All time"
          color="blue"
        />
        <StatCard
          icon={Star}
          title="Testimonials"
          value={consultant.testimonials.length.toString()}
          subtitle="Client reviews"
          color="yellow"
        />
        <StatCard
          icon={Eye}
          title="Profile Views"
          value="127"
          subtitle="This month"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {consultant.leads.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No leads yet. Make sure your profile is complete and approved!
              </div>
            ) : (
              consultant.leads.map((lead) => (
                <div key={lead.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      {lead.company && (
                        <p className="text-sm text-gray-500">{lead.company}</p>
                      )}
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {lead.message}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Testimonials Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Testimonials</h2>
              <button
                onClick={() => setShowAddTestimonial(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Testimonial
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {consultant.testimonials.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Star className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p>No testimonials yet</p>
                <p className="text-sm">Add client testimonials to build trust</p>
              </div>
            ) : (
              consultant.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${
                            star <= testimonial.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    — {testimonial.clientName}
                    {testimonial.clientTitle && `, ${testimonial.clientTitle}`}
                    {testimonial.clientCompany && ` at ${testimonial.clientCompany}`}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {showAddTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Add Client Testimonial</h3>
              <p className="text-gray-600 text-sm mt-1">Add a review from a satisfied client</p>
            </div>
            
            <form onSubmit={handleAddTestimonial} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.clientName}
                    onChange={(e) => setNewTestimonial(prev => ({...prev, clientName: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newTestimonial.clientTitle}
                      onChange={(e) => setNewTestimonial(prev => ({...prev, clientTitle: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="CTO"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={newTestimonial.clientCompany}
                      onChange={(e) => setNewTestimonial(prev => ({...prev, clientCompany: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tech Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewTestimonial(prev => ({...prev, rating: star}))}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            star <= newTestimonial.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-400'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {newTestimonial.rating}/5 stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Content *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial(prev => ({...prev, content: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What did the client say about your work?"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddTestimonial(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}




