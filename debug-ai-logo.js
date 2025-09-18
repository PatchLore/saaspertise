const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugAILogo() {
  console.log('🔍 Deep debugging AI Solutions Pro logo issue...');

  try {
    // Get the specific AI Solutions Pro consultant
    const aiConsultant = await prisma.consultant.findFirst({
      where: { 
        name: 'AI Solutions Pro'
      },
      select: {
        id: true,
        name: true,
        email: true,
        logo: true,
        profilePhoto: true
      }
    });

    if (!aiConsultant) {
      console.log('❌ AI Solutions Pro not found!');
      return;
    }

    console.log('\n📋 AI Solutions Pro Details:');
    console.log('ID:', aiConsultant.id);
    console.log('Name:', aiConsultant.name);
    console.log('Email:', aiConsultant.email);
    console.log('Profile Photo:', aiConsultant.profilePhoto ? 'SET' : 'MISSING');
    console.log('Logo Length:', aiConsultant.logo ? aiConsultant.logo.length : 'MISSING');
    console.log('Logo Preview:', aiConsultant.logo ? aiConsultant.logo.substring(0, 100) + '...' : 'MISSING');

    // Try setting a simple, different logo
    console.log('\n🔧 Setting a simple test logo...');
    
    const simpleTestLogo = 'data:image/svg+xml;charset=UTF-8,%3csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100" height="100" fill="%237c3aed"/%3e%3ctext x="50" y="55" font-family="Arial" font-size="24" fill="white" text-anchor="middle"%3eAI%3c/text%3e%3c/svg%3e';
    
    await prisma.consultant.update({
      where: { id: aiConsultant.id },
      data: { 
        logo: simpleTestLogo
      }
    });

    console.log('✅ Updated with simple test logo');
    console.log('🎯 New logo URL:', simpleTestLogo);

    // Verify the update
    const updated = await prisma.consultant.findUnique({
      where: { id: aiConsultant.id },
      select: { logo: true }
    });

    console.log('\n✅ Verification - Logo saved:', updated.logo ? 'YES' : 'NO');
    console.log('📏 Logo length:', updated.logo ? updated.logo.length : 0);

  } catch (error) {
    console.error('❌ Error debugging AI logo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugAILogo();
