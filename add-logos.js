const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Add your logos here - put logo files in public/logos/ folder first
const logoMappings = {
  'Worxwide Consulting': '/logos/worxwide-logo.png',
  'This is AI Now': '/logos/thisisainow-logo.png',
  'Foresight Mobile': '/logos/foresight-mobile-logo.png',
  'Coreblue': '/logos/coreblue-logo.png',
  'Pulsion Technology': '/logos/pulsion-logo.png',
  'Op-tec Systems': '/logos/op-tec-logo.png',
  'Iicon': '/logos/iicon-logo.png',
  'The Business Catalyst': '/logos/business-catalyst-logo.png',
  'CloudTech24': '/logos/cloudtech24-logo.png',
  'Cyber-Duck': '/logos/cyber-duck-logo.png',
  'Deeper Insights': '/logos/deeper-insights-logo.png',
  'Faculty': '/logos/faculty-logo.png',
  'Magora': '/logos/magora-logo.png',
  'Waracle': '/logos/waracle-logo.png',
  'Netsells': '/logos/netsells-logo.png',
  'Hedgehog Lab': '/logos/hedgehog-lab-logo.png',
  '3 Sided Cube': '/logos/3sidedcube-logo.png',
  'Brightec': '/logos/brightec-logo.png',
  'Sonin': '/logos/sonin-logo.png',
  'The Distance': '/logos/thedistance-logo.png',
  'Apadmi': '/logos/apadmi-logo.png',
  'Corporation Pop': '/logos/corporation-pop-logo.png',
  'Komodo Digital': '/logos/komodo-logo.png',
  'Chelsea Apps': '/logos/chelsea-apps-logo.png',
  'Rantmedia': '/logos/rantmedia-logo.png',
  'Zudu': '/logos/zudu-logo.png',
  'Calvium': '/logos/calvium-logo.png',
  'Intelivita': '/logos/intelivita-logo.png',
  'Afiniti': '/logos/afiniti-logo.png',
  'Altis Consulting': '/logos/altis-logo.png'
};

async function addLogos() {
  console.log('🎨 Adding logos to consultant profiles...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [companyName, logoPath] of Object.entries(logoMappings)) {
    try {
      const result = await prisma.consultant.updateMany({
        where: { name: companyName },
        data: { logo: logoPath }
      });
      
      if (result.count > 0) {
        console.log(`✅ Added logo for: ${companyName}`);
        successCount++;
      } else {
        console.log(`❌ Company not found: ${companyName}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ Error updating ${companyName}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Errors/not found: ${errorCount}`);
  
  await prisma.$disconnect();
}

addLogos();
