interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Person' | 'Service'
  data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

// Organization schema for the main site
export function OrganizationSchema() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: 'Saaspertise',
        url: 'https://www.saaspertise.com',
        logo: 'https://www.saaspertise.com/logo.png',
        description: 'Find top SaaS and AI consultants to grow your business. Connect with expert consultants specializing in SaaS development, AI implementation, and digital transformation.',
        foundingDate: '2024',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'info@saaspertise.com',
        },
        sameAs: [
          'https://twitter.com/saaspertise',
          'https://linkedin.com/company/saaspertise',
        ],
      }}
    />
  )
}

// Website schema with search functionality
export function WebSiteSchema() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: 'Saaspertise',
        url: 'https://www.saaspertise.com',
        description: 'SaaS and AI consultants directory',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.saaspertise.com/directory?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}

// Person schema for individual consultants
export function ConsultantSchema({ consultant }: {
  consultant: {
    id: string
    name: string
    description: string
    region: string
    services: string[]
    industries: string[]
    email?: string | null
    phone?: string | null
    website?: string | null
    isPremium: boolean
  }
}) {
  return (
    <StructuredData
      type="Person"
      data={{
        name: consultant.name,
        description: consultant.description,
        jobTitle: 'Consultant',
        worksFor: {
          '@type': 'Organization',
          name: consultant.name,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: consultant.region,
          addressCountry: 'GB',
        },
        knowsAbout: [...consultant.services, ...consultant.industries],
        email: consultant.email,
        telephone: consultant.phone,
        url: consultant.website,
        sameAs: consultant.website ? [consultant.website] : [],
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Services',
            value: consultant.services.join(', '),
          },
          {
            '@type': 'PropertyValue',
            name: 'Industries',
            value: consultant.industries.join(', '),
          },
          {
            '@type': 'PropertyValue',
            name: 'Premium',
            value: consultant.isPremium ? 'Yes' : 'No',
          },
        ],
      }}
    />
  )
}

// Service schema for QuoteFlow
export function QuoteFlowServiceSchema() {
  return (
    <StructuredData
      type="Service"
      data={{
        name: 'QuoteFlow - Plumbing Quote Calculator',
        description: 'Instant plumbing quote generation software for plumbers. Generate accurate quotes in 30 seconds, capture leads automatically, and boost conversion rates.',
        provider: {
          '@type': 'Organization',
          name: 'Saaspertise',
          url: 'https://www.saaspertise.com',
        },
        category: 'Software',
        serviceType: 'SaaS Application',
        areaServed: 'GB',
        audience: {
          '@type': 'Audience',
          audienceType: 'Plumbers and Plumbing Businesses',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          category: 'Software as a Service',
        },
        featureList: [
          'Instant Quote Generation',
          'Smart Pricing Logic',
          'Mobile Optimized Experience',
          'Lead Capture Dashboard',
        ],
      }}
    />
  )
}
