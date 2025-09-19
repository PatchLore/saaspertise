const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateRegions() {
  console.log('🔄 Updating consultant regions to UK locations...');

  // Update existing consultants with UK regions
  await prisma.consultant.update({
    where: { name: 'TechConsult Solutions' },
    data: { region: 'Greater London' }
  });

  await prisma.consultant.update({
    where: { name: 'AI Solutions Pro' },
    data: { region: 'Greater Manchester' }
  });

  await prisma.consultant.update({
    where: { name: 'SaaS Expert Consulting' },
    data: { region: 'Central Scotland (Edinburgh/Glasgow)' }
  });

  console.log('✅ Updated all consultant regions to UK locations');

  // Show updated consultants
  const consultants = await prisma.consultant.findMany({
    select: { name: true, region: true }
  });

  console.log('\n📍 Updated consultant locations:');
  consultants.forEach(c => {
    console.log(`- ${c.name}: ${c.region}`);
  });

  await prisma.$disconnect();
}

updateRegions().catch(console.error);






