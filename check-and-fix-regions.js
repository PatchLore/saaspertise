const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAndFixRegions() {
  console.log('🔍 Checking current consultant regions...');

  // First, let's see what regions we currently have
  const consultants = await prisma.consultant.findMany({
    select: { id: true, name: true, region: true }
  });

  console.log('\n📍 Current consultant regions:');
  consultants.forEach(c => {
    console.log(`- ${c.name}: ${c.region}`);
  });

  // Update each consultant individually
  console.log('\n🔄 Updating to UK regions...');

  for (const consultant of consultants) {
    let newRegion;
    
    if (consultant.name.includes('TechConsult')) {
      newRegion = 'Greater London';
    } else if (consultant.name.includes('AI Solutions')) {
      newRegion = 'Greater Manchester';
    } else if (consultant.name.includes('SaaS Expert')) {
      newRegion = 'Central Scotland (Edinburgh/Glasgow)';
    } else {
      newRegion = 'Greater London'; // default
    }

    await prisma.consultant.update({
      where: { id: consultant.id },
      data: { region: newRegion }
    });

    console.log(`✅ Updated ${consultant.name} to ${newRegion}`);
  }

  console.log('\n🎉 All regions updated! Refresh your browser to see the changes.');
  await prisma.$disconnect();
}

checkAndFixRegions().catch(console.error);




















