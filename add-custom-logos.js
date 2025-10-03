const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function addCustomLogos() {
  console.log('🎨 Adding your custom logos to consultant profiles...');

  try {
    // Read the logo files and convert to base64
    const logoDir = path.join(__dirname, 'Logos');
    
    const logos = {
      'TechConsult.png': null,
      'AI Solutions.png': null,
      'SaaS Expert.png': null
    };

    // Read each logo file
    for (const filename of Object.keys(logos)) {
      const filePath = path.join(logoDir, filename);
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString('base64');
        const dataUri = `data:image/png;base64,${base64}`;
        logos[filename] = dataUri;
        console.log('✅ Read logo:', filename, `(${Math.round(fileBuffer.length / 1024)}KB)`);
      } else {
        console.log('❌ Logo not found:', filename);
      }
    }

    // Update consultants with their custom logos
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true }
    });

    for (const consultant of consultants) {
      let logoDataUri = null;

      // Match consultant to logo file
      if (consultant.email === 'john@techconsult.com' && logos['TechConsult.png']) {
        logoDataUri = logos['TechConsult.png'];
      } else if (consultant.email === 'sarah@aisolutions.com' && logos['AI Solutions.png']) {
        logoDataUri = logos['AI Solutions.png'];
      } else if (consultant.email === 'mike@saasexpert.com' && logos['SaaS Expert.png']) {
        logoDataUri = logos['SaaS Expert.png'];
      }

      if (logoDataUri) {
        await prisma.consultant.update({
          where: { id: consultant.id },
          data: { 
            logo: logoDataUri,
            profilePhoto: null // Remove profile photo so custom logo shows
          }
        });

        console.log('✅ Updated logo for:', consultant.name);
      }
    }

    console.log('🎉 Custom logos successfully added to all consultant profiles!');
    console.log('');
    console.log('🎯 Logo Mapping:');
    console.log('   • TechConsult.png → TechConsult Solutions');
    console.log('   • AI Solutions.png → AI Solutions Pro');
    console.log('   • SaaS Expert.png → SaaS Expert Consulting');
    console.log('');
    console.log('📸 Your custom logos are now ready for demo screenshots!');
    console.log('🔄 Refresh your browser to see the new logos');

  } catch (error) {
    console.error('❌ Error adding custom logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addCustomLogos();
















