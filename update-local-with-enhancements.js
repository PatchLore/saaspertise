const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateLocalData() {
  console.log('🔄 Updating local database with enhanced profile features...');

  try {
    // Clear existing portfolio items and update consultants
    await prisma.portfolioItem.deleteMany();
    
    const consultants = await prisma.consultant.findMany({
      where: { isApproved: true }
    });

    for (const consultant of consultants) {
      let updateData = {};
      let portfolioItems = [];

      // Update based on consultant name/email
      if (consultant.email === 'john@techconsult.com') {
        updateData = {
          profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          hourlyRate: 12500, // £125/hr
          projectRateMin: 500000, // £5,000
          projectRateMax: 5000000, // £50,000
          showRates: true
        };
        portfolioItems = [
          {
            title: 'Healthcare SaaS Platform',
            description: 'Built a comprehensive patient management system for a growing healthcare network',
            metrics: 'Reduced administrative costs by 40% and improved patient satisfaction scores by 25%',
            technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS']),
            projectType: 'SaaS Platform',
            clientType: 'Healthcare Network',
            duration: '6 months',
            displayOrder: 0
          },
          {
            title: 'AI-Powered Analytics Dashboard',
            description: 'Developed machine learning pipeline for real-time financial risk assessment',
            metrics: 'Processed 10M+ transactions daily with 99.9% accuracy',
            technologies: JSON.stringify(['Python', 'TensorFlow', 'Docker', 'Kubernetes']),
            projectType: 'AI Implementation',
            clientType: 'FinTech Startup',
            duration: '4 months',
            displayOrder: 1
          }
        ];
      } else if (consultant.email === 'sarah@aisolutions.com') {
        updateData = {
          profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face',
          hourlyRate: 15000, // £150/hr
          projectRateMin: 1000000, // £10,000
          projectRateMax: 10000000, // £100,000
          showRates: true
        };
        portfolioItems = [
          {
            title: 'Manufacturing Quality Control AI',
            description: 'Implemented computer vision system for automated defect detection on production lines',
            metrics: 'Reduced defect rates by 60% and increased throughput by 35%',
            technologies: JSON.stringify(['Python', 'OpenCV', 'PyTorch', 'Docker']),
            projectType: 'AI Implementation',
            clientType: 'Manufacturing Company',
            duration: '8 months',
            displayOrder: 0
          },
          {
            title: 'Healthcare Diagnostic Assistant',
            description: 'Developed NLP system to analyze medical records and suggest diagnoses',
            metrics: 'Improved diagnostic accuracy by 28% and reduced analysis time by 70%',
            technologies: JSON.stringify(['Python', 'spaCy', 'BERT', 'FastAPI']),
            projectType: 'AI Implementation',
            clientType: 'Hospital Network',
            duration: '5 months',
            displayOrder: 1
          }
        ];
      } else if (consultant.email === 'mike@saasexpert.com') {
        updateData = {
          profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          hourlyRate: 10000, // £100/hr
          projectRateMin: 200000, // £2,000
          projectRateMax: 2500000, // £25,000
          showRates: false // Contact for rates
        };
        portfolioItems = [
          {
            title: 'E-commerce Multi-tenant Platform',
            description: 'Built scalable SaaS platform serving 500+ online stores with real-time inventory management',
            metrics: 'Scaled to handle 10k concurrent users with 99.9% uptime',
            technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Redis', 'AWS']),
            projectType: 'SaaS Platform',
            clientType: 'E-commerce Startup',
            duration: '10 months',
            displayOrder: 0
          },
          {
            title: 'Education Management System',
            description: 'Developed comprehensive LMS with video streaming, assignment tracking, and analytics',
            metrics: 'Deployed to 50+ schools serving 25,000+ students',
            technologies: JSON.stringify(['Next.js', 'PostgreSQL', 'Stripe', 'WebRTC']),
            projectType: 'SaaS Platform',
            clientType: 'Education Technology',
            duration: '7 months',
            displayOrder: 1
          }
        ];
      }

      // Update consultant
      await prisma.consultant.update({
        where: { id: consultant.id },
        data: updateData
      });

      // Add portfolio items
      for (const item of portfolioItems) {
        await prisma.portfolioItem.create({
          data: {
            ...item,
            consultantId: consultant.id,
            isPublic: true
          }
        });
      }

      console.log('✅ Updated:', consultant.name);
    }

    console.log('🎉 Local database updated with enhanced profiles!');
    console.log('');
    console.log('🎯 New Features Added:');
    console.log('   📸 Profile photos for all consultants');
    console.log('   💰 Pricing information (hourly rates and project ranges)');
    console.log('   📂 Portfolio items with case studies and metrics');
    console.log('   🏆 Technology stacks and project outcomes');
    console.log('');
    console.log('🚀 Your demo screenshots will now show:');
    console.log('   • Professional profile photos');
    console.log('   • Clear pricing (some show rates, others "Contact for rates")');
    console.log('   • Impressive portfolio sections with real metrics');
    console.log('   • Technology expertise displayed');

  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLocalData();
