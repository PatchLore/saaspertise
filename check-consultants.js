const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkConsultants() {
  console.log('🔍 Checking all consultants...');
  
  const consultants = await prisma.consultant.findMany({
    select: {
      id: true,
      name: true,
      isApproved: true,
      region: true
    }
  });
  
  console.log('\n📋 All consultants in database:');
  consultants.forEach(c => {
    console.log(`- ${c.name} (${c.region})`);
    console.log(`  ID: ${c.id}`);
    console.log(`  Approved: ${c.isApproved}`);
    console.log(`  URL: http://localhost:3000/consultant/${c.id}`);
    console.log('');
  });
  
  await prisma.$disconnect();
}

checkConsultants().catch(console.error);
