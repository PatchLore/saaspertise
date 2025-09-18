import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@consultantsdirectory.com' },
    update: {},
    create: {
      email: 'admin@consultantsdirectory.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // Create sample consultant users
  const consultantPassword = await bcrypt.hash('consultant123', 12)
  
  const consultant1 = await prisma.user.upsert({
    where: { email: 'john@techconsult.com' },
    update: {},
    create: {
      email: 'john@techconsult.com',
      name: 'John Smith',
      password: consultantPassword,
      role: 'CONSULTANT',
    },
  })

  const consultant2 = await prisma.user.upsert({
    where: { email: 'sarah@aisolutions.com' },
    update: {},
    create: {
      email: 'sarah@aisolutions.com',
      name: 'Sarah Johnson',
      password: consultantPassword,
      role: 'CONSULTANT',
    },
  })

  const consultant3 = await prisma.user.upsert({
    where: { email: 'mike@saasexpert.com' },
    update: {},
    create: {
      email: 'mike@saasexpert.com',
      name: 'Mike Chen',
      password: consultantPassword,
      role: 'CONSULTANT',
    },
  })

  console.log('✅ Consultant users created')

  // Create consultant profiles
  const profile1 = await prisma.consultant.upsert({
    where: { userId: consultant1.id },
    update: {},
    create: {
      userId: consultant1.id,
      name: 'TechConsult Solutions',
      description: 'Specialized in enterprise SaaS development and digital transformation. With over 10 years of experience, we help businesses modernize their operations through cutting-edge technology solutions. Our team has successfully delivered 200+ projects across various industries.',
      shortDescription: 'Enterprise SaaS development and digital transformation experts',
      website: 'https://techconsult.com',
      email: 'john@techconsult.com',
      phone: '+1 (555) 123-4567',
      region: 'San Francisco, CA',
      services: JSON.stringify(['SAAS', 'AI']),
      industries: JSON.stringify(['Healthcare', 'Finance', 'E-commerce']),
      isPremium: true,
      isApproved: true,
      isFeatured: true,
    },
  })

  const profile2 = await prisma.consultant.upsert({
    where: { userId: consultant2.id },
    update: {},
    create: {
      userId: consultant2.id,
      name: 'AI Solutions Pro',
      description: 'Leading AI implementation consultant helping businesses integrate machine learning and artificial intelligence into their workflows. Expertise in computer vision, natural language processing, and predictive analytics.',
      shortDescription: 'AI implementation and machine learning specialist',
      website: 'https://aisolutions.com',
      email: 'sarah@aisolutions.com',
      phone: '+1 (555) 234-5678',
      region: 'New York, NY',
      services: JSON.stringify(['AI']),
      industries: JSON.stringify(['Manufacturing', 'Healthcare', 'Marketing']),
      isPremium: true,
      isApproved: true,
      isFeatured: true,
    },
  })

  const profile3 = await prisma.consultant.upsert({
    where: { userId: consultant3.id },
    update: {},
    create: {
      userId: consultant3.id,
      name: 'SaaS Expert Consulting',
      description: 'Full-stack SaaS development consultant with expertise in React, Node.js, and cloud architecture. Helping startups and enterprises build scalable software-as-a-service platforms.',
      shortDescription: 'Full-stack SaaS development and cloud architecture',
      website: 'https://saasexpert.com',
      email: 'mike@saasexpert.com',
      region: 'Austin, TX',
      services: JSON.stringify(['SAAS']),
      industries: JSON.stringify(['E-commerce', 'Education', 'Real Estate']),
      isPremium: false,
      isApproved: true,
      isFeatured: false,
    },
  })

  console.log('✅ Consultant profiles created')

  // Create sample leads
  await prisma.lead.create({
    data: {
      consultantId: profile1.id,
      name: 'Alice Brown',
      email: 'alice@company.com',
      company: 'Tech Startup Inc',
      message: 'We are looking for help with our SaaS platform development. Can you assist with architecture and implementation?',
      status: 'NEW',
    },
  })

  await prisma.lead.create({
    data: {
      consultantId: profile2.id,
      name: 'Bob Wilson',
      email: 'bob@manufacturing.com',
      company: 'Manufacturing Corp',
      message: 'Interested in implementing AI for predictive maintenance in our factory operations.',
      status: 'CONTACTED',
    },
  })

  console.log('✅ Sample leads created')

  console.log('🎉 Seed completed successfully!')
  console.log('\n📝 Test Accounts:')
  console.log('Admin: admin@consultantsdirectory.com / admin123')
  console.log('Consultant 1: john@techconsult.com / consultant123')
  console.log('Consultant 2: sarah@aisolutions.com / consultant123')
  console.log('Consultant 3: mike@saasexpert.com / consultant123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
