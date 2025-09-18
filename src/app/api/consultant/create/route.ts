import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'
import { ServiceType } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user already has a consultant profile
    const existingConsultant = await prisma.consultant.findUnique({
      where: { userId: session.user.id }
    })

    if (existingConsultant) {
      return NextResponse.json(
        { message: 'Consultant profile already exists' },
        { status: 400 }
      )
    }

    const {
      name,
      description,
      shortDescription,
      website,
      email,
      phone,
      region,
      services,
      industries,
      logo
    } = await request.json()

    // Validate required fields
    if (!name || !description || !email || !region || !services || !industries) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (services.length === 0 || industries.length === 0) {
      return NextResponse.json(
        { message: 'Please select at least one service and one industry' },
        { status: 400 }
      )
    }

    // Validate service types
    const validServices = ['SAAS', 'AI', 'BOTH']
    const invalidServices = services.filter((s: string) => !validServices.includes(s))
    if (invalidServices.length > 0) {
      return NextResponse.json(
        { message: 'Invalid service types' },
        { status: 400 }
      )
    }

    // Create consultant profile
    const consultant = await prisma.consultant.create({
      data: {
        userId: session.user.id,
        name,
        description,
        shortDescription: shortDescription || null,
        website: website || null,
        email,
        phone: phone || null,
        region,
        services: JSON.stringify(services),
        industries: JSON.stringify(industries),
        logo: logo || null,
        isPremium: false,
        isApproved: false,
        isFeatured: false
      }
    })

    return NextResponse.json(
      { 
        message: 'Consultant profile created successfully',
        consultant: {
          id: consultant.id,
          name: consultant.name,
          isApproved: consultant.isApproved
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create consultant error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
