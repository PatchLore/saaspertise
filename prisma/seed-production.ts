import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding production database...')

  // Clear existing data
  await prisma.testimonial.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.consultant.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!', 12)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@consultantsdirectory.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })
  console.log('✅ Created admin user')

  // Create consultants with PostgreSQL arrays
  const consultantsData = [
    {
      email: 'john@techconsult.com',
      name: 'John Smith',
      consultantName: 'TechConsult Solutions',
      description: 'Enterprise SaaS development experts with 10+ years of experience helping businesses modernize their operations through cutting-edge technology solutions. We specialize in cloud-native applications, microservices architecture, and AI-powered automation systems.',
      shortDescription: 'Enterprise SaaS development and digital transformation experts',
      region: 'Greater London',
      services: ['SAAS', 'AI'],
      industries: ['Healthcare', 'Finance', 'E-commerce'],
      website: 'https://techconsult.com',
      phone: '+44 20 7123 4567',
      profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      hourlyRate: 12500, // £125/hr
      projectRateMin: 500000, // £5,000
      projectRateMax: 5000000, // £50,000
      showRates: true,
      portfolioItems: [
        {
          title: 'Healthcare SaaS Platform',
          description: 'Built a comprehensive patient management system for a growing healthcare network',
          metrics: 'Reduced administrative costs by 40% and improved patient satisfaction scores by 25%',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
          projectType: 'SaaS Platform',
          clientType: 'Healthcare Network',
          duration: '6 months'
        },
        {
          title: 'AI-Powered Analytics Dashboard',
          description: 'Developed machine learning pipeline for real-time financial risk assessment',
          metrics: 'Processed 10M+ transactions daily with 99.9% accuracy',
          technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
          projectType: 'AI Implementation',
          clientType: 'FinTech Startup',
          duration: '4 months'
        }
      ]
    },
    {
      email: 'sarah@aisolutions.com',
      name: 'Sarah Johnson',
      consultantName: 'AI Solutions Pro',
      description: 'Leading AI implementation consultant helping businesses integrate machine learning and artificial intelligence into their workflows. Expertise in computer vision, natural language processing, predictive analytics, and automated decision-making systems.',
      shortDescription: 'AI implementation and machine learning specialist',
      region: 'Greater Manchester',
      services: ['AI'],
      industries: ['Manufacturing', 'Healthcare', 'Marketing'],
      website: 'https://aisolutions.pro',
      phone: '+44 161 123 4567',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face',
      hourlyRate: 15000, // £150/hr
      projectRateMin: 1000000, // £10,000
      projectRateMax: 10000000, // £100,000
      showRates: true,
      portfolioItems: [
        {
          title: 'Manufacturing Quality Control AI',
          description: 'Implemented computer vision system for automated defect detection on production lines',
          metrics: 'Reduced defect rates by 60% and increased throughput by 35%',
          technologies: ['Python', 'OpenCV', 'PyTorch', 'Docker'],
          projectType: 'AI Implementation',
          clientType: 'Manufacturing Company',
          duration: '8 months'
        },
        {
          title: 'Healthcare Diagnostic Assistant',
          description: 'Developed NLP system to analyze medical records and suggest diagnoses',
          metrics: 'Improved diagnostic accuracy by 28% and reduced analysis time by 70%',
          technologies: ['Python', 'spaCy', 'BERT', 'FastAPI'],
          projectType: 'AI Implementation',
          clientType: 'Hospital Network',
          duration: '5 months'
        }
      ]
    },
    {
      email: 'mike@saasexpert.com',
      name: 'Mike Chen',
      consultantName: 'SaaS Expert Consulting',
      description: 'Full-stack SaaS development consultant with expertise in React, Node.js, and cloud architecture. Helping startups and enterprises build scalable software-as-a-service platforms with modern development practices and DevOps integration.',
      shortDescription: 'Full-stack SaaS development and cloud architecture expert',
      region: 'Central Scotland (Edinburgh/Glasgow)',
      services: ['SAAS'],
      industries: ['E-commerce', 'Education', 'Real Estate'],
      website: 'https://saasexpert.com',
      phone: '+44 131 123 4567',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      hourlyRate: 10000, // £100/hr
      projectRateMin: 200000, // £2,000
      projectRateMax: 2500000, // £25,000
      showRates: false, // Contact for rates
      portfolioItems: [
        {
          title: 'E-commerce Multi-tenant Platform',
          description: 'Built scalable SaaS platform serving 500+ online stores with real-time inventory management',
          metrics: 'Scaled to handle 10k concurrent users with 99.9% uptime',
          technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
          projectType: 'SaaS Platform',
          clientType: 'E-commerce Startup',
          duration: '10 months'
        },
        {
          title: 'Education Management System',
          description: 'Developed comprehensive LMS with video streaming, assignment tracking, and analytics',
          metrics: 'Deployed to 50+ schools serving 25,000+ students',
          technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'WebRTC'],
          projectType: 'SaaS Platform',
          clientType: 'Education Technology',
          duration: '7 months'
        }
      ]
    }
  ]

  for (const consultantData of consultantsData) {
    const password = await bcrypt.hash('consultant123!', 12)
    const user = await prisma.user.create({
      data: {
        email: consultantData.email,
        name: consultantData.name,
        password: password,
        role: 'CONSULTANT'
      }
    })

    const consultant = await prisma.consultant.create({
      data: {
        userId: user.id,
        name: consultantData.consultantName,
        description: consultantData.description,
        shortDescription: consultantData.shortDescription,
        email: consultantData.email,
        website: consultantData.website,
        phone: consultantData.phone,
        profilePhoto: consultantData.profilePhoto,
        region: consultantData.region,
        services: consultantData.services, // PostgreSQL array
        industries: consultantData.industries, // PostgreSQL array
        hourlyRate: consultantData.hourlyRate,
        projectRateMin: consultantData.projectRateMin,
        projectRateMax: consultantData.projectRateMax,
        showRates: consultantData.showRates,
        isPremium: true,
        isApproved: true,
        isFeatured: true
      }
    })

    // Add portfolio items
    if (consultantData.portfolioItems) {
      for (let i = 0; i < consultantData.portfolioItems.length; i++) {
        const portfolioItem = consultantData.portfolioItems[i]
        await prisma.portfolioItem.create({
          data: {
            consultantId: consultant.id,
            title: portfolioItem.title,
            description: portfolioItem.description,
            metrics: portfolioItem.metrics,
            technologies: portfolioItem.technologies,
            projectType: portfolioItem.projectType,
            clientType: portfolioItem.clientType,
            duration: portfolioItem.duration,
            displayOrder: i,
            isPublic: true
          }
        })
      }
    }

    // Add sample testimonials
    await prisma.testimonial.createMany({
      data: [
        {
          consultantId: consultant.id,
          clientName: 'Sarah Chen',
          clientTitle: 'Tech Director',
          clientCompany: 'FinTech Innovations',
          content: 'Exceptional AI implementation expertise. Delivered our machine learning project ahead of schedule and provided excellent ongoing support.',
          rating: 5,
          isApproved: true
        },
        {
          consultantId: consultant.id,
          clientName: 'James Wilson',
          clientTitle: 'CTO',
          clientCompany: 'Healthcare Solutions Ltd',
          content: 'Outstanding communication and technical skills. Transformed our entire SaaS architecture. Would definitely work with again.',
          rating: 5,
          isApproved: true
        }
      ]
    })

    console.log('✅ Created:', consultant.name, '(ID:', consultant.id + ')')
  }

  console.log('🎉 Production database seeded successfully!')
  console.log('📋 Test accounts:')
  console.log('   Admin: admin@consultantsdirectory.com / admin123!')
  console.log('   Consultant 1: john@techconsult.com / consultant123!')
  console.log('   Consultant 2: sarah@aisolutions.com / consultant123!')
  console.log('   Consultant 3: mike@saasexpert.com / consultant123!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
