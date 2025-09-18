const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
  console.log('🔍 Debugging consultant profiles...');
  
  const consultants = await prisma.consultant.findMany({
    select: {
      id: true,
      name: true,
      isApproved: true,
      userId: true
    }
  });
  
  console.log('\n📋 All consultants:');
  consultants.forEach(c => {
    console.log(`- ${c.name} (ID: ${c.id}) - Approved: ${c.isApproved}`);
    console.log(`  URL: http://localhost:3000/consultant/${c.id}`);
  });
  
  await prisma.$disconnect();
}

debug().catch(console.error);
