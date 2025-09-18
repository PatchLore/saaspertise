const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function showAILogo() {
  console.log('🎯 Making AI Solutions Pro logo visible...');

  try {
    // Option 1: Temporarily remove profile photo to show logo
    await prisma.consultant.update({
      where: { 
        id: 'cmfnudukj0006r3tlh0snhavj'
      },
      data: { 
        profilePhoto: null  // Remove profile photo so logo shows
      }
    });

    console.log('✅ Removed profile photo from AI Solutions Pro');
    console.log('🎨 Now the logo should be visible!');
    console.log('');
    console.log('💡 Component Logic:');
    console.log('   1. If profilePhoto exists → show profile photo');
    console.log('   2. Else if logo exists → show logo');
    console.log('   3. Else → show initials');
    console.log('');
    console.log('🔄 Since we removed the profile photo, the purple "AI" logo should now display');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showAILogo();
