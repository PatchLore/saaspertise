import { notFound } from 'next/navigation'
import { prisma } from '../../../../lib/prisma'

interface ConsultantPageProps {
  params: Promise<{
    id: string
  }>
}

async function getConsultant(id: string) {
  try {
    const consultant = await prisma.consultant.findUnique({
      where: {
        id: id,
        isApproved: true
      }
    })

    if (!consultant) {
      return null
    }

    // Parse JSON strings for services and industries
    return {
      ...consultant,
      services: JSON.parse(consultant.services || '[]'),
      industries: JSON.parse(consultant.industries || '[]')
    }
  } catch (error) {
    console.error('Error fetching consultant:', error)
    return null
  }
}

export default async function ConsultantPage({ params }: ConsultantPageProps) {
  const resolvedParams = await params
  const consultant = await getConsultant(resolvedParams.id)

  if (!consultant) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">{consultant.name}</h1>
      <p className="text-gray-600 mb-4">{consultant.region}</p>
      <p className="text-gray-700 mb-6">{consultant.description}</p>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <div className="flex gap-2">
          {consultant.services.map((service: string) => (
            <span key={service} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}




