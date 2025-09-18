'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader, Upload, X } from 'lucide-react'

const SERVICE_OPTIONS = [
  { value: 'SAAS', label: 'SaaS Development' },
  { value: 'AI', label: 'AI Implementation' },
  { value: 'BOTH', label: 'Both SaaS & AI' }
]

const REGION_OPTIONS = [
  'Greater London',
  'South East England',
  'Greater Manchester', 
  'West Midlands (Birmingham)',
  'Central Scotland (Edinburgh/Glasgow)',
  'Leeds & Yorkshire',
  'Liverpool & Merseyside',
  'Bristol & South West',
  'Cardiff & South Wales',
  'Belfast & Northern Ireland',
  'Newcastle & North East',
  'Sheffield & South Yorkshire',
  'North Wales',
  'Remote/UK-wide',
  'Channel Islands',
  'International'
]

const INDUSTRY_OPTIONS = [
  'Healthcare', 'Finance', 'E-commerce', 'Education', 'Manufacturing',
  'Real Estate', 'Marketing', 'HR', 'Legal', 'Logistics', 'Entertainment',
  'Gaming', 'Travel', 'Food & Beverage', 'Agriculture', 'Energy', 'Other'
]

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    website: '',
    email: '',
    phone: '',
    region: '',
    services: [] as string[],
    industries: [] as string[],
    logo: ''
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // If user already has a consultant profile, redirect to dashboard
    if (session.user.consultantId) {
      router.push('/dashboard')
      return
    }

    // Pre-fill with user data
    setFormData(prev => ({
      ...prev,
      name: session.user.name || '',
      email: session.user.email || ''
    }))
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/consultant/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create profile')
      }

      router.push('/dashboard?message=Profile created successfully! It will be reviewed by our team.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.description) {
        setError('Please fill in all required fields')
        return
      }
    }
    setError('')
    setStep(step + 1)
  }

  const prevStep = () => {
    setError('')
    setStep(step - 1)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Consultant Profile
            </h1>
            <p className="text-gray-600">
              Tell us about your expertise and services
            </p>
            
            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Basic Info</span>
                <span>Services</span>
                <span>Review</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Personal Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company or personal brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region/Location *
                  </label>
                  <select
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your region...</option>
                    {REGION_OPTIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description (for cards)
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    maxLength={150}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief one-liner about your services"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.shortDescription.length}/150 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your expertise, experience, and what makes you unique..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Services and Industries */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Services Offered * (Select all that apply)
                  </label>
                  <div className="space-y-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <label key={service.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service.value)}
                          onChange={() => handleServiceToggle(service.value)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Industries You Serve * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRY_OPTIONS.map((industry) => (
                      <label key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.industries.includes(industry)}
                          onChange={() => handleIndustryToggle(industry)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Review Your Profile</h3>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{formData.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{formData.region}</p>
                  
                  {formData.shortDescription && (
                    <p className="text-gray-700 text-sm mb-4">{formData.shortDescription}</p>
                  )}
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Services:</h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.services.map((service) => (
                        <span key={service} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {SERVICE_OPTIONS.find(s => s.value === service)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Industries:</h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.industries.slice(0, 5).map((industry) => (
                        <span key={industry} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {industry}
                        </span>
                      ))}
                      {formData.industries.length > 5 && (
                        <span className="text-xs text-gray-500">+{formData.industries.length - 5} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Your profile will be reviewed by our team before being published. 
                    You'll receive an email notification once it's approved.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || formData.services.length === 0 || formData.industries.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    'Create Profile'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
