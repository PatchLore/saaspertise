'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Filter, Crown, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface Consultant {
  id: string
  name: string
  logo?: string | null
  shortDescription?: string | null
  description: string
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  website?: string | null
}

interface DirectoryData {
  consultants: Consultant[]
  total: number
  industries: string[]
  regions: string[]
  currentPage: number
  totalPages: number
}

interface DirectoryClientProps {
  initialData: DirectoryData
  searchParams: any
}

export default function DirectoryClient({ initialData, searchParams }: DirectoryClientProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    search: searchParams.search || '',
    service: searchParams.service || 'ALL',
    industry: searchParams.industry || '',
    region: searchParams.region || '',
    premium: searchParams.premium === 'true'
  })

  const handleFilterChange = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== 'ALL' && v !== '') {
        params.set(k, v.toString())
      }
    })
    
    router.push(`/directory?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(urlSearchParams)
    params.set('page', page.toString())
    router.push(`/directory?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      service: 'ALL',
      industry: '',
      region: '',
      premium: false
    })
    router.push('/directory')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search consultants..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={filters.service}
                  onChange={(e) => handleFilterChange('service', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">All Services</option>
                  <option value="SAAS">SaaS Only</option>
                  <option value="AI">AI Only</option>
                  <option value="BOTH">SaaS & AI</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Industries</option>
                  {initialData.industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Regions</option>
                  <option value="Greater London">Greater London</option>
                  <option value="South East England">South East England</option>
                  <option value="Greater Manchester">Greater Manchester</option>
                  <option value="West Midlands (Birmingham)">West Midlands (Birmingham)</option>
                  <option value="Central Scotland (Edinburgh/Glasgow)">Central Scotland (Edinburgh/Glasgow)</option>
                  <option value="Leeds & Yorkshire">Leeds & Yorkshire</option>
                  <option value="Liverpool & Merseyside">Liverpool & Merseyside</option>
                  <option value="Bristol & South West">Bristol & South West</option>
                  <option value="Cardiff & South Wales">Cardiff & South Wales</option>
                  <option value="Belfast & Northern Ireland">Belfast & Northern Ireland</option>
                  <option value="Newcastle & North East">Newcastle & North East</option>
                  <option value="Sheffield & South Yorkshire">Sheffield & South Yorkshire</option>
                  <option value="North Wales">North Wales</option>
                  <option value="Remote/UK-wide">Remote/UK-wide</option>
                  <option value="Channel Islands">Channel Islands</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Premium Only */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.premium}
                    onChange={(e) => handleFilterChange('premium', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Premium Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {initialData.consultants.length} of {initialData.total} consultants
            </p>
          </div>

          {/* Consultants Grid */}
          {initialData.consultants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No consultants found</p>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {initialData.consultants.map((consultant) => (
                <div
                  key={consultant.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Premium Badge */}
                    {consultant.isPremium && (
                      <div className="flex items-center gap-2 mb-4">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          Premium
                        </span>
                      </div>
                    )}

                    {/* Logo and Name */}
                    <div className="flex items-center gap-3 mb-4">
                      {consultant.logo ? (
                        <img
                          src={consultant.logo}
                          alt={`${consultant.name} logo`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {consultant.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{consultant.region}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {consultant.shortDescription || consultant.description}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {consultant.services.slice(0, 2).map((service) => (
                        <span
                          key={service}
                          className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {consultant.services.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{consultant.services.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/consultant/${consultant.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </Link>
                      {consultant.website && (
                        <a
                          href={consultant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {initialData.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(initialData.currentPage - 1)}
                disabled={initialData.currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              
              {Array.from({ length: initialData.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === initialData.currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(initialData.currentPage + 1)}
                disabled={initialData.currentPage === initialData.totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
