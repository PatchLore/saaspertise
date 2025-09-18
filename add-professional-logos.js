const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addProfessionalLogos() {
  console.log('🎨 Adding professional logos to consultant profiles...');

  try {
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true }
    });

    for (const consultant of consultants) {
      let logoUrl = null;

      // Add professional logos based on consultant type
      if (consultant.email === 'john@techconsult.com') {
        // TechConsult Solutions - Tech/SaaS focused logo
        logoUrl = 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop&crop=center';
      } else if (consultant.email === 'sarah@aisolutions.com') {
        // AI Solutions Pro - AI/Neural network inspired logo
        logoUrl = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop&crop=center';
      } else if (consultant.email === 'mike@saasexpert.com') {
        // SaaS Expert Consulting - Clean, modern SaaS logo
        logoUrl = 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=200&fit=crop&crop=center';
      }

      if (logoUrl) {
        await prisma.consultant.update({
          where: { id: consultant.id },
          data: { logo: logoUrl }
        });

        console.log('✅ Added logo to:', consultant.name);
      }
    }

    console.log('🎉 Professional logos added successfully!');
    console.log('');
    console.log('🎯 Logo Strategy:');
    console.log('   • TechConsult Solutions: Modern tech/circuit design');
    console.log('   • AI Solutions Pro: Neural network/AI themed');
    console.log('   • SaaS Expert Consulting: Clean, professional SaaS branding');
    console.log('');
    console.log('📸 Your demo profiles now have:');
    console.log('   • Professional profile photos (human faces)');
    console.log('   • Company logos (brand identity)');
    console.log('   • Pricing information');
    console.log('   • Impressive portfolios with metrics');
    console.log('');
    console.log('💡 This creates the perfect balance of:');
    console.log('   - Personal connection (profile photos)');
    console.log('   - Professional branding (company logos)');
    console.log('   - Credibility (portfolios & pricing)');

  } catch (error) {
    console.error('❌ Error adding logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProfessionalLogos();
