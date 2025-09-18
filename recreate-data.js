const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function recreateData() {
  console.log('🌱 Recreating demo data...');

  // Clear existing data
  await prisma.consultant.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@consultantsdirectory.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log('✅ Created admin user');

  // Create consultants
  const consultants = [
    {
      email: 'john@techconsult.com',
      name: 'John Smith',
      consultantName: 'TechConsult Solutions',
      description: 'Enterprise SaaS development experts with 10+ years of experience.',
      shortDescription: 'Enterprise SaaS development and digital transformation experts',
      region: 'Greater London',
      services: '["SAAS", "AI"]',
      industries: '["Healthcare", "Finance", "E-commerce"]'
    },
    {
      email: 'sarah@aisolutions.com',
      name: 'Sarah Johnson',
      consultantName: 'AI Solutions Pro',
      description: 'Leading AI implementation consultant helping businesses integrate machine learning.',
      shortDescription: 'AI implementation and machine learning specialist',
      region: 'Greater Manchester',
      services: '["AI"]',
      industries: '["Manufacturing", "Healthcare", "Marketing"]'
    },
    {
      email: 'mike@saasexpert.com',
      name: 'Mike Chen',
      consultantName: 'SaaS Expert Consulting',
      description: 'Full-stack SaaS development consultant with expertise in React, Node.js, and cloud architecture.',
      shortDescription: 'Full-stack SaaS development and cloud architecture expert',
      region: 'Central Scotland (Edinburgh/Glasgow)',
      services: '["SAAS"]',
      industries: '["E-commerce", "Education", "Real Estate"]'
    }
  ];

  for (const consultantData of consultants) {
    const password = await bcrypt.hash('consultant123', 12);
    const user = await prisma.user.create({
      data: {
        email: consultantData.email,
        name: consultantData.name,
        password: password,
        role: 'CONSULTANT'
      }
    });

    const consultant = await prisma.consultant.create({
      data: {
        userId: user.id,
        name: consultantData.consultantName,
        description: consultantData.description,
        shortDescription: consultantData.shortDescription,
        email: consultantData.email,
        region: consultantData.region,
        services: consultantData.services,
        industries: consultantData.industries,
        isPremium: true,
        isApproved: true,
        isFeatured: true
      }
    });

    console.log('✅ Created:', consultant.name, '(ID:', consultant.id + ')');
  }

  console.log('\n🎉 Demo data recreated with new IDs!');
  await prisma.$disconnect();
}

recreateData().catch(console.error);
