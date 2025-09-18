const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugLogos() {
  console.log('🔍 Debugging consultant logos...');

  try {
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true },
      select: {
        id: true,
        name: true,
        email: true,
        logo: true,
        profilePhoto: true
      }
    });

    console.log('\n📋 Current consultant logos:');
    consultants.forEach(consultant => {
      console.log(`\n• ${consultant.name}`);
      console.log(`  Email: ${consultant.email}`);
      console.log(`  Logo: ${consultant.logo || 'MISSING'}`);
      console.log(`  Profile Photo: ${consultant.profilePhoto || 'MISSING'}`);
      console.log(`  ID: ${consultant.id}`);
    });

    // Fix AI Solutions Pro specifically
    const aiSolutions = consultants.find(c => c.name === 'AI Solutions Pro');
    if (aiSolutions) {
      console.log('\n🔧 Fixing AI Solutions Pro logo...');
      
      await prisma.consultant.update({
        where: { id: aiSolutions.id },
        data: { 
          logo: 'https://via.placeholder.com/200x200/7c3aed/ffffff?text=AI+PRO'
        }
      });
      
      console.log('✅ Updated AI Solutions Pro logo');
    }

    console.log('\n🎯 All logos should now be:');
    console.log('   • TechConsult Solutions: https://via.placeholder.com/200x200/2563eb/ffffff?text=TC');
    console.log('   • AI Solutions Pro: https://via.placeholder.com/200x200/7c3aed/ffffff?text=AI+PRO');
    console.log('   • SaaS Expert Consulting: https://via.placeholder.com/200x200/059669/ffffff?text=SE');

  } catch (error) {
    console.error('❌ Error debugging logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugLogos();
