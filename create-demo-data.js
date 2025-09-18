const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createDemoData() {
  console.log('🌱 Creating fresh demo data...');

  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@saaspertise.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log('✅ Created admin user');

  // Consultant 1
  const password1 = await bcrypt.hash('consultant123', 12);
  const user1 = await prisma.user.create({
    data: {
      email: 'john@techconsult.com',
      name: 'John Smith',
      password: password1,
      role: 'CONSULTANT'
    }
  });

  await prisma.consultant.create({
    data: {
      userId: user1.id,
      name: 'TechConsult Solutions',
      description: 'Enterprise SaaS development experts with 10+ years of experience helping businesses modernize their operations through cutting-edge technology solutions.',
      shortDescription: 'Enterprise SaaS development and digital transformation experts',
      email: 'john@techconsult.com',
      region: 'San Francisco, CA',
      services: '["SAAS", "AI"]',
      industries: '["Healthcare", "Finance", "E-commerce"]',
      isPremium: true,
      isApproved: true,
      isFeatured: true
    }
  });
  console.log('✅ Created TechConsult Solutions');

  // Consultant 2
  const password2 = await bcrypt.hash('consultant123', 12);
  const user2 = await prisma.user.create({
    data: {
      email: 'sarah@aisolutions.com',
      name: 'Sarah Johnson',
      password: password2,
      role: 'CONSULTANT'
    }
  });

  await prisma.consultant.create({
    data: {
      userId: user2.id,
      name: 'AI Solutions Pro',
      description: 'Leading AI implementation consultant helping businesses integrate machine learning and artificial intelligence into their workflows. Expertise in computer vision, natural language processing, and predictive analytics.',
      shortDescription: 'AI implementation and machine learning specialist',
      email: 'sarah@aisolutions.com',
      region: 'New York, NY',
      services: '["AI"]',
      industries: '["Manufacturing", "Healthcare", "Marketing"]',
      isPremium: true,
      isApproved: true,
      isFeatured: true
    }
  });
  console.log('✅ Created AI Solutions Pro');

  // Consultant 3
  const password3 = await bcrypt.hash('consultant123', 12);
  const user3 = await prisma.user.create({
    data: {
      email: 'mike@saasexpert.com',
      name: 'Mike Chen',
      password: password3,
      role: 'CONSULTANT'
    }
  });

  await prisma.consultant.create({
    data: {
      userId: user3.id,
      name: 'SaaS Expert Consulting',
      description: 'Full-stack SaaS development consultant with expertise in React, Node.js, and cloud architecture. Helping startups and enterprises build scalable software-as-a-service platforms.',
      shortDescription: 'Full-stack SaaS development and cloud architecture expert',
      email: 'mike@saasexpert.com',
      region: 'Austin, TX',
      services: '["SAAS"]',
      industries: '["E-commerce", "Education", "Real Estate"]',
      isPremium: true,
      isApproved: true,
      isFeatured: true
    }
  });
  console.log('✅ Created SaaS Expert Consulting');

  console.log('🎉 Demo data created successfully!');
  console.log('📋 Test accounts:');
  console.log('   Admin: admin@saaspertise.com / admin123');
  console.log('   Consultant 1: john@techconsult.com / consultant123');
  console.log('   Consultant 2: sarah@aisolutions.com / consultant123');
  console.log('   Consultant 3: mike@saasexpert.com / consultant123');

  await prisma.$disconnect();
}

createDemoData().catch(console.error);
