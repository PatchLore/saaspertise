'use client'

import { useState } from 'react'
import { Users, CheckCircle, Crown, MessageSquare, Clock, Eye, X, Check } from 'lucide-react'

interface Consultant {
  id: string
  name: string
  email: string
  region: string
  services: string[]
  industries: string[]
  description: string
  isPremium: boolean
  isApproved: boolean
  createdAt: Date
  user?: {
    name: string | null
    email: string
    createdAt: Date
  }
}

interface Lead {
  id: string
  name: string
  email: string
  company?: string | null
  message: string
  status: string
  createdAt: Date
  consultant: {
    name: string
  }
}

interface AdminDashboardProps {
  data: {
    pendingConsultants: Consultant[]
    approvedConsultants: Consultant[]
    recentLeads: Lead[]
    stats: {
      totalConsultants: number
      approvedConsultants: number
      premiumConsultants: number
      totalLeads: number
      recentLeads: number
    }
  }
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleConsultantAction = async (consultantId: string, action: 'approve' | 'reject') => {
    setActionLoading(consultantId)
    
    try {
      const response = await fetch(`/api/admin/consultants/${consultantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        // Refresh page to update data
        window.location.reload()
      } else {
        console.error('Failed to update consultant')
      }
    } catch (error) {
      console.error('Error updating consultant:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-gray-600">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Consultants"
          value={data.stats.totalConsultants}
          subtitle={`${data.stats.approvedConsultants} approved`}
          color="blue"
        />
        <StatCard
          icon={CheckCircle}
          title="Approved"
          value={data.stats.approvedConsultants}
          subtitle={`${data.pendingConsultants.length} pending`}
          color="green"
        />
        <StatCard
          icon={Crown}
          title="Premium"
          value={data.stats.premiumConsultants}
          color="yellow"
        />
        <StatCard
          icon={MessageSquare}
          title="Total Leads"
          value={data.stats.totalLeads}
          subtitle={`${data.stats.recentLeads} this month`}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Consultants */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Pending Approval ({data.pendingConsultants.length})
              </h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {data.pendingConsultants.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No pending consultants
              </div>
            ) : (
              data.pendingConsultants.map((consultant) => (
                <div key={consultant.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{consultant.name}</h3>
                      <p className="text-sm text-gray-600">{consultant.email}</p>
                      <p className="text-sm text-gray-500">{consultant.region}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {consultant.services.slice(0, 2).map((service) => (
                          <span
                            key={service}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedConsultant(consultant)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleConsultantAction(consultant.id, 'approve')}
                        disabled={actionLoading === consultant.id}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        title="Approve"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleConsultantAction(consultant.id, 'reject')}
                        disabled={actionLoading === consultant.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Reject"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Leads ({data.recentLeads.length})
              </h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {data.recentLeads.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No recent leads
              </div>
            ) : (
              data.recentLeads.map((lead) => (
                <div key={lead.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      {lead.company && (
                        <p className="text-sm text-gray-500">{lead.company}</p>
                      )}
                      <p className="text-sm text-blue-600 mt-1">
                        → {lead.consultant.name}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Consultant Detail Modal */}
      {selectedConsultant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedConsultant.name}
                </h2>
                <button
                  onClick={() => setSelectedConsultant(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <p className="text-gray-600">Email: {selectedConsultant.email}</p>
                  <p className="text-gray-600">Region: {selectedConsultant.region}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.services.map((service) => (
                      <span
                        key={service}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.industries.map((industry) => (
                      <span
                        key={industry}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedConsultant.description}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleConsultantAction(selectedConsultant.id, 'approve')
                    setSelectedConsultant(null)
                  }}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve Consultant
                </button>
                <button
                  onClick={() => {
                    handleConsultantAction(selectedConsultant.id, 'reject')
                    setSelectedConsultant(null)
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}




