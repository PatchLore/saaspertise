import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding real consultants...')

  // Create users for the consultants
  const worxwidePassword = await bcrypt.hash('worxwide123', 12)
  const thisisaiPassword = await bcrypt.hash('thisisai123', 12)

  // Create Worxwide user
  const worxwideUser = await prisma.user.upsert({
    where: { email: 'consult@worxwide.com' },
    update: {},
    create: {
      email: 'consult@worxwide.com',
      name: 'Mohit Singla',
      password: worxwidePassword,
      role: 'CONSULTANT'
    }
  })

  // Create This is AI Now user
  const thisisaiUser = await prisma.user.upsert({
    where: { email: 'hello@thisisainow.com' },
    update: {},
    create: {
      email: 'hello@thisisainow.com',
      name: 'This is AI Now Team',
      password: thisisaiPassword,
      role: 'CONSULTANT'
    }
  })

  // Create Worxwide consultant
  const worxwideConsultant = await prisma.consultant.upsert({
    where: { userId: worxwideUser.id },
    update: {},
    create: {
      userId: worxwideUser.id,
      name: 'Worxwide Consulting',
      logo: null,
      profilePhoto: null,
      description: 'Worxwide Consulting is a digital growth consulting firm specializing in AI-enabled sales transformation, UX-led experience design, and full-funnel automation. With over 60 experts across the U.S., U.K., and India, we help businesses across Manufacturing, Financial Services, Consumer Goods, Healthcare, and IT sectors transform their digital operations and drive growth.',
      shortDescription: 'AI-enabled sales transformation and UX-led experience design for digital growth',
      website: 'http://www.worxwide.com',
      email: 'consult@worxwide.com',
      phone: '+1-571-210-5955',
      region: 'London',
      industries: ['Manufacturing', 'Financial Services', 'Consumer Goods', 'Healthcare', 'IT'],
      services: ['AI Implementation', 'Sales Transformation', 'UX Design', 'Digital Automation', 'SaaS Development'],
      hourlyRate: 12000, // £120/hour
      projectRateMin: 180000, // £1,800
      projectRateMax: 600000, // £6,000
      showRates: true,
      isPremium: true,
      isApproved: true,
      isFeatured: true
    }
  })

  // Create This is AI Now consultant
  const thisisaiConsultant = await prisma.consultant.upsert({
    where: { userId: thisisaiUser.id },
    update: {},
    create: {
      userId: thisisaiUser.id,
      name: 'This is AI Now',
      logo: null,
      profilePhoto: null,
      description: 'This is AI Now specializes in implementing cutting-edge artificial intelligence solutions for businesses looking to stay ahead in the digital transformation era. We provide comprehensive AI strategy, implementation, and optimization services across various industries.',
      shortDescription: 'Cutting-edge AI solutions and automation for modern businesses',
      website: 'https://thisisainow.com',
      email: 'hello@thisisainow.com',
      phone: '+44 20 7123 4567',
      region: 'London',
      industries: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'],
      services: ['AI Implementation', 'Machine Learning', 'Automation', 'Data Analytics', 'AI Strategy'],
      hourlyRate: 14000, // £140/hour
      projectRateMin: 200000, // £2,000
      projectRateMax: 700000, // £7,000
      showRates: true,
      isPremium: true,
      isApproved: true,
      isFeatured: true
    }
  })

  // Add testimonials for Worxwide
  await prisma.testimonial.createMany({
    data: [
      {
        consultantId: worxwideConsultant.id,
        clientName: 'Sarah Mitchell',
        clientTitle: 'Digital Transformation Director',
        clientCompany: 'Global Manufacturing Corp',
        content: "Worxwide's AI-enabled sales transformation exceeded our expectations. Their innovative approach and global expertise made all the difference.",
        rating: 5,
        isApproved: true
      }
    ],
    skipDuplicates: true
  })

  // Add testimonials for This is AI Now
  await prisma.testimonial.createMany({
    data: [
      {
        consultantId: thisisaiConsultant.id,
        clientName: 'Lisa Thompson',
        clientTitle: 'CTO',
        clientCompany: 'TechForward Ltd',
        content: "This is AI Now transformed our operations with their innovative AI solutions. Their expertise and delivery exceeded all expectations.",
        rating: 5,
        isApproved: true
      }
    ],
    skipDuplicates: true
  })

  // Add portfolio items for Worxwide
  await prisma.portfolioItem.createMany({
    data: [
      {
        consultantId: worxwideConsultant.id,
        title: 'AI-Enabled Sales Transformation',
        description: 'Implemented AI-driven sales automation platform for a leading manufacturing company',
        metrics: 'Increased sales conversion rates by 45% and reduced sales cycle time by 30%',
        technologies: ['AI/ML', 'Sales Automation', 'CRM Integration', 'Analytics'],
        projectType: 'AI Implementation',
        clientType: 'Manufacturing Company',
        duration: '6 months',
        displayOrder: 1,
        isPublic: true
      },
      {
        consultantId: worxwideConsultant.id,
        title: 'UX-Led Digital Experience Platform',
        description: 'Designed and developed comprehensive UX platform for financial services client',
        metrics: 'Improved user engagement by 60% and increased customer satisfaction scores by 40%',
        technologies: ['UX/UI Design', 'React', 'Node.js', 'User Research'],
        projectType: 'UX Design',
        clientType: 'Financial Services',
        duration: '4 months',
        displayOrder: 2,
        isPublic: true
      }
    ],
    skipDuplicates: true
  })

  // Add portfolio items for This is AI Now
  await prisma.portfolioItem.createMany({
    data: [
      {
        consultantId: thisisaiConsultant.id,
        title: 'AI-Powered Customer Service Automation',
        description: 'Implemented intelligent chatbot system with natural language processing for customer service automation',
        metrics: 'Reduced customer service costs by 50% and improved response time by 80%',
        technologies: ['NLP', 'Machine Learning', 'Python', 'TensorFlow'],
        projectType: 'AI Implementation',
        clientType: 'E-commerce Platform',
        duration: '5 months',
        displayOrder: 1,
        isPublic: true
      },
      {
        consultantId: thisisaiConsultant.id,
        title: 'Predictive Analytics Platform',
        description: 'Developed comprehensive predictive analytics system for retail inventory management',
        metrics: 'Improved inventory accuracy by 35% and reduced waste by 25%',
        technologies: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn'],
        projectType: 'Data Analytics',
        clientType: 'Retail Chain',
        duration: '4 months',
        displayOrder: 2,
        isPublic: true
      }
    ],
    skipDuplicates: true
  })

  console.log('✅ Real consultants seeded successfully!')
  console.log('📋 Test accounts:')
  console.log('   Worxwide: consult@worxwide.com / worxwide123')
  console.log('   This is AI Now: hello@thisisainow.com / thisisai123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
