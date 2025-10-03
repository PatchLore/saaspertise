const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixLogos() {
  console.log('🔧 Fixing consultant logos with reliable URLs...');

  try {
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true }
    });

    for (const consultant of consultants) {
      let logoUrl = null;

      // Use more reliable logo URLs
      if (consultant.email === 'john@techconsult.com') {
        // TechConsult Solutions - Modern tech logo
        logoUrl = 'https://via.placeholder.com/200x200/2563eb/ffffff?text=TC';
      } else if (consultant.email === 'sarah@aisolutions.com') {
        // AI Solutions Pro - AI themed logo
        logoUrl = 'https://via.placeholder.com/200x200/7c3aed/ffffff?text=AI';
      } else if (consultant.email === 'mike@saasexpert.com') {
        // SaaS Expert Consulting - Clean SaaS logo
        logoUrl = 'https://via.placeholder.com/200x200/059669/ffffff?text=SE';
      }

      if (logoUrl) {
        await prisma.consultant.update({
          where: { id: consultant.id },
          data: { logo: logoUrl }
        });

        console.log('✅ Updated logo for:', consultant.name);
      }
    }

    console.log('🎉 Logos updated with reliable placeholder images!');
    console.log('');
    console.log('🎨 Logo Design:');
    console.log('   • TechConsult Solutions: Blue "TC" logo');
    console.log('   • AI Solutions Pro: Purple "AI" logo');
    console.log('   • SaaS Expert Consulting: Green "SE" logo');
    console.log('');
    console.log('💡 These are clean, professional placeholder logos that:');
    console.log('   - Load reliably');
    console.log('   - Match brand colors');
    console.log('   - Look professional in screenshots');
    console.log('   - Work as temporary branding for demo');

  } catch (error) {
    console.error('❌ Error fixing logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixLogos();
















