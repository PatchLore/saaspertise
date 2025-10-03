import Link from 'next/link'
import { Crown, MapPin, ExternalLink } from 'lucide-react'

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
}

interface FeaturedConsultantsProps {
  consultants: Consultant[]
}

export default function FeaturedConsultants({ consultants }: FeaturedConsultantsProps) {
  if (consultants.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Consultants</h2>
            <p className="text-gray-600">No featured consultants available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Premium Consultants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top-rated consultants who have been verified and featured for their exceptional expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col min-h-[400px]"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                {/* Top Content Section */}
                <div className="flex-1 flex flex-col">
                  {/* Premium Badge - Fixed height */}
                  <div className="h-8 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    </div>
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

                  {/* Logo - Fixed size container */}
                  <div className="flex justify-center mb-6 h-20">
                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md border-2 border-gray-100">
                      {consultant.profilePhoto ? (
                        <img
                          src={consultant.profilePhoto}
                          alt={consultant.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : consultant.logo ? (
                        <img
                          src={consultant.logo}
                          alt={`${consultant.name} logo`}
                          className="w-full h-full object-contain p-3"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            {consultant.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company Name and Location - Fixed height */}
                  <div className="text-center mb-6 h-16 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{consultant.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{consultant.region}</span>
                    </div>
                  </div>

                  {/* Description - Fixed height */}
                  <div className="mb-6 h-12">
                    <p className="text-gray-600 text-sm line-clamp-2 text-center">
                      {consultant.shortDescription || consultant.description}
                    </p>
                  </div>

                  {/* Services - Fixed height */}
                  <div className="mb-6 h-16">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {consultant.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {consultant.services.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{consultant.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Industries - Fixed height */}
                  <div className="mb-0 h-12">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {consultant.industries.slice(0, 2).map((industry) => (
                        <span
                          key={industry}
                          className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                      {consultant.industries.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{consultant.industries.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* View Profile Button - Always at bottom */}
                <div className="mt-6">
                  <Link
                    href={`/consultant/${consultant.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            View All Consultants
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}




