const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createReliableLogos() {
  console.log('🎨 Creating reliable logos using data URIs...');

  try {
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true }
    });

    for (const consultant of consultants) {
      let logoDataUri = null;

      if (consultant.email === 'john@techconsult.com') {
        // TechConsult Solutions - Blue TC logo
        logoDataUri = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjU2M0VCIiByeD0iMjAiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCI+VEM8L3RleHQ+Cjwvc3ZnPgo=';
      } else if (consultant.email === 'sarah@aisolutions.com') {
        // AI Solutions Pro - Purple AI logo
        logoDataUri = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjN0MzQUVEIiByeD0iMjAiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCI+QUk8L3RleHQ+Cjwvc3ZnPgo=';
      } else if (consultant.email === 'mike@saasexpert.com') {
        // SaaS Expert Consulting - Green SE logo
        logoDataUri = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDU5NjY5IiByeD0iMjAiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCI+U0U8L3RleHQ+Cjwvc3ZnPgo=';
      }

      if (logoDataUri) {
        await prisma.consultant.update({
          where: { id: consultant.id },
          data: { logo: logoDataUri }
        });

        console.log('✅ Created reliable logo for:', consultant.name);
      }
    }

    console.log('🎉 All logos updated with reliable data URIs!');
    console.log('');
    console.log('🎯 These logos will:');
    console.log('   ✅ Always load (embedded in the page)');
    console.log('   ✅ Display consistently across all browsers');
    console.log('   ✅ Work offline');
    console.log('   ✅ Look professional in screenshots');
    console.log('');
    console.log('🎨 Logo Colors:');
    console.log('   • TechConsult Solutions: Blue "TC"');
    console.log('   • AI Solutions Pro: Purple "AI"');
    console.log('   • SaaS Expert Consulting: Green "SE"');

  } catch (error) {
    console.error('❌ Error creating logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createReliableLogos();
