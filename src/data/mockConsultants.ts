// Mock consultant data for demo purposes
// TODO: Re-enable DB integration for production

export interface MockConsultant {
  id: string
  name: string
  logo?: string | null
  profilePhoto?: string | null
  shortDescription?: string | null
  description: string
  region: string
  services: string[]
  industries: string[]
  isPremium: boolean
  website?: string | null
  email: string
  phone?: string | null
  hourlyRate?: number | null
  projectRateMin?: number | null
  projectRateMax?: number | null
  showRates: boolean
  createdAt: Date
  portfolioItems?: MockPortfolioItem[]
  testimonials?: MockTestimonial[]
  certifications?: string[]
  stats?: {
    projectsCompleted: number
    avgResponseTime: string
    clientRating: number
  }
}

export interface MockPortfolioItem {
  id: string
  title: string
  description: string
  metrics?: string | null
  technologies: string[]
  projectType?: string | null
  clientType?: string | null
  duration?: string | null
  imageUrl?: string | null
  projectUrl?: string | null
  caseStudyUrl?: string | null
  displayOrder: number
}

export interface MockTestimonial {
  id: string
  clientName: string
  clientTitle?: string | null
  clientCompany?: string | null
  content: string
  rating: number
  createdAt: Date
}

export const mockConsultants: MockConsultant[] = [
  {
    id: "cmfnn7l200003r33lacraeimd",
    name: "TechConsult Solutions",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDIwSDQ0VjQ0SDIwVjIwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI2IDI2SDM4VjM4SDI2VjI2WiIgZmlsbD0iIzYzNjZGMTIiLz4KPC9zdmc+",
    profilePhoto: null,
    shortDescription: "Expert SaaS development and AI implementation for growing businesses",
    description: "TechConsult Solutions specializes in building scalable SaaS platforms and implementing AI solutions for businesses looking to modernize their operations. With over 8 years of experience, we've helped 50+ companies transform their digital infrastructure.",
    region: "London",
    services: ["SaaS Development", "AI Implementation", "Cloud Migration", "API Development"],
    industries: ["Healthcare", "FinTech", "E-commerce", "Education"],
    isPremium: true,
    website: "https://techconsultsolutions.com",
    email: "hello@techconsultsolutions.com",
    phone: "+44 20 7123 4567",
    hourlyRate: 12500, // £125/hour
    projectRateMin: 150000, // £1,500
    projectRateMax: 500000, // £5,000
    showRates: true,
    createdAt: new Date("2024-01-15"),
    portfolioItems: [
      {
        id: "portfolio-1",
        title: "Healthcare Management Platform",
        description: "Built a comprehensive patient management system for a growing healthcare network",
        metrics: "Reduced administrative costs by 40% and improved patient satisfaction scores by 25%",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
        projectType: "SaaS Platform",
        clientType: "Healthcare Network",
        duration: "6 months",
        displayOrder: 1
      },
      {
        id: "portfolio-2",
        title: "AI-Powered Financial Risk Assessment",
        description: "Developed machine learning pipeline for real-time financial risk assessment",
        metrics: "Processed 10M+ transactions daily with 99.9% accuracy",
        technologies: ["Python", "TensorFlow", "Docker", "Kubernetes"],
        projectType: "AI Implementation",
        clientType: "FinTech Startup",
        duration: "4 months",
        displayOrder: 2
      }
    ],
    testimonials: [
      {
        id: "testimonial-1",
        clientName: "Sarah Chen",
        clientTitle: "Tech Director",
        clientCompany: "FinTech Innovations",
        content: "Exceptional AI implementation expertise. Delivered our machine learning project ahead of schedule and provided excellent ongoing support.",
        rating: 5,
        createdAt: new Date("2024-02-15")
      }
    ],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional", "Certified Scrum Master"],
    stats: {
      projectsCompleted: 47,
      avgResponseTime: "2h",
      clientRating: 4.9
    }
  },
  {
    id: "cmfnn7lek0006r33lma2knlyy",
    name: "AI Solutions Pro",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiNFRjQ0NDQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjAiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yOCAyOEgzNlYzNkgyOFYyOFoiIGZpbGw9IiNFRjQ0NDQiLz4KPC9zdmc+",
    profilePhoto: null,
    shortDescription: "Cutting-edge AI and machine learning solutions for enterprise clients",
    description: "AI Solutions Pro is a leading provider of artificial intelligence and machine learning solutions. We help enterprises leverage AI to automate processes, gain insights from data, and create intelligent applications that drive business growth.",
    region: "Manchester",
    services: ["AI Implementation", "Machine Learning", "Data Science", "Computer Vision"],
    industries: ["Manufacturing", "Healthcare", "Finance", "Retail"],
    isPremium: true,
    website: "https://aisolutionspro.co.uk",
    email: "contact@aisolutionspro.co.uk",
    phone: "+44 161 123 4567",
    hourlyRate: 15000, // £150/hour
    projectRateMin: 200000, // £2,000
    projectRateMax: 800000, // £8,000
    showRates: true,
    createdAt: new Date("2024-01-20"),
    portfolioItems: [
      {
        id: "portfolio-3",
        title: "Computer Vision Quality Control",
        description: "Implemented computer vision system for automated defect detection on production lines",
        metrics: "Reduced defect rates by 60% and increased throughput by 35%",
        technologies: ["Python", "OpenCV", "PyTorch", "Docker"],
        projectType: "AI Implementation",
        clientType: "Manufacturing Company",
        duration: "3 months",
        displayOrder: 1
      },
      {
        id: "portfolio-4",
        title: "Medical Diagnosis AI Assistant",
        description: "Developed NLP system to analyze medical records and suggest diagnoses",
        metrics: "Improved diagnostic accuracy by 28% and reduced analysis time by 70%",
        technologies: ["Python", "spaCy", "BERT", "FastAPI"],
        projectType: "AI Implementation",
        clientType: "Hospital Network",
        duration: "5 months",
        displayOrder: 2
      }
    ],
    testimonials: [
      {
        id: "testimonial-2",
        clientName: "Dr. Michael Thompson",
        clientTitle: "Chief Medical Officer",
        clientCompany: "Manchester General Hospital",
        content: "The AI diagnosis system has revolutionized our workflow. Accuracy improvements have been remarkable.",
        rating: 5,
        createdAt: new Date("2024-03-01")
      }
    ],
    certifications: ["TensorFlow Developer Certificate", "AWS Machine Learning Specialty", "Deep Learning Specialization"],
    stats: {
      projectsCompleted: 32,
      avgResponseTime: "1h",
      clientRating: 4.8
    }
  },
  {
    id: "cmfnn7lzf0009r33lzoijnk93",
    name: "SaaS Expert Consulting",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM4QjVDQjYiLz4KPHBhdGggZD0iTTIwIDIwSDQ0VjQ0SDIwVjIwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI2IDI2SDM4VjM4SDI2VjI2WiIgZmlsbD0iIzg2QzVCNiIvPgo8L3N2Zz4=",
    profilePhoto: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI0OCIgeT0iNDgiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTE2IDhMMTAgMTZIMjJMMTYgOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNiAyNEwxMCAxNkgyMkwxNiAyNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K",
    shortDescription: "Specialized SaaS architecture and scaling solutions for high-growth companies",
    description: "SaaS Expert Consulting helps companies build, scale, and optimize their SaaS platforms. We specialize in microservices architecture, performance optimization, and scaling strategies that support rapid business growth.",
    region: "Birmingham",
    services: ["SaaS Development", "Microservices", "Performance Optimization", "DevOps"],
    industries: ["E-commerce", "Education", "Real Estate", "Professional Services"],
    isPremium: true,
    website: "https://saasexpertconsulting.com",
    email: "hello@saasexpertconsulting.com",
    phone: "+44 121 123 4567",
    hourlyRate: 10000, // £100/hour
    projectRateMin: 100000, // £1,000
    projectRateMax: 400000, // £4,000
    showRates: true,
    createdAt: new Date("2024-01-25"),
    portfolioItems: [
      {
        id: "portfolio-5",
        title: "E-commerce SaaS Platform",
        description: "Built scalable SaaS platform serving 500+ online stores with real-time inventory management",
        metrics: "Scaled to handle 10k concurrent users with 99.9% uptime",
        technologies: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
        projectType: "SaaS Platform",
        clientType: "E-commerce Startup",
        duration: "8 months",
        displayOrder: 1
      },
      {
        id: "portfolio-6",
        title: "Learning Management System",
        description: "Developed comprehensive LMS with video streaming, assignment tracking, and analytics",
        metrics: "Deployed to 50+ schools serving 25,000+ students",
        technologies: ["Next.js", "PostgreSQL", "Stripe", "WebRTC"],
        projectType: "SaaS Platform",
        clientType: "Education Technology",
        duration: "6 months",
        displayOrder: 2
      }
    ],
    testimonials: [
      {
        id: "testimonial-3",
        clientName: "James Wilson",
        clientTitle: "CTO",
        clientCompany: "Healthcare Solutions Ltd",
        content: "Outstanding communication and technical skills. Transformed our entire SaaS architecture. Would definitely work with again.",
        rating: 5,
        createdAt: new Date("2024-02-28")
      }
    ],
    certifications: ["Kubernetes Administrator", "AWS Solutions Architect", "MongoDB Certified Developer"],
    stats: {
      projectsCompleted: 41,
      avgResponseTime: "3h",
      clientRating: 4.7
    }
  },
  {
    id: "cmfnn7lzf0009r33lzoijnk94",
    name: "DataFlow Analytics",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM5QzQwQkEiLz4KPHBhdGggZD0iTTIwIDIwSDQ0VjQ0SDIwVjIwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI2IDI2SDM4VjM4SDI2VjI2WiIgZmlsbD0iIzlDNDBCQSIvPgo8L3N2Zz4K",
    profilePhoto: null,
    shortDescription: "Advanced data analytics and business intelligence solutions",
    description: "DataFlow Analytics specializes in transforming raw data into actionable business insights. We help companies make data-driven decisions through advanced analytics, visualization, and machine learning.",
    region: "Edinburgh",
    services: ["Data Analytics", "Business Intelligence", "Data Visualization", "Machine Learning"],
    industries: ["Finance", "Healthcare", "Retail", "Government"],
    isPremium: false,
    website: "https://dataflowanalytics.co.uk",
    email: "info@dataflowanalytics.co.uk",
    phone: "+44 131 123 4567",
    hourlyRate: 9000, // £90/hour
    projectRateMin: 80000, // £800
    projectRateMax: 300000, // £3,000
    showRates: true,
    createdAt: new Date("2024-02-01"),
    portfolioItems: [
      {
        id: "portfolio-7",
        title: "Financial Risk Dashboard",
        description: "Created real-time dashboard for financial risk monitoring and reporting",
        metrics: "Reduced risk assessment time by 75% and improved accuracy by 45%",
        technologies: ["Python", "Tableau", "PostgreSQL", "Apache Kafka"],
        projectType: "Data Analytics",
        clientType: "Investment Bank",
        duration: "4 months",
        displayOrder: 1
      }
    ],
    testimonials: [
      {
        id: "testimonial-4",
        clientName: "Emma Roberts",
        clientTitle: "Head of Analytics",
        clientCompany: "Scottish Investment Bank",
        content: "DataFlow Analytics transformed our data strategy. The insights they provided were invaluable for our decision-making process.",
        rating: 5,
        createdAt: new Date("2024-03-10")
      }
    ],
    certifications: ["Tableau Desktop Specialist", "Microsoft Certified: Azure Data Scientist"],
    stats: {
      projectsCompleted: 28,
      avgResponseTime: "4h",
      clientRating: 4.6
    }
  },
  {
    id: "cmfnn7lzf0009r33lzoijnk95",
    name: "CloudScale Solutions",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiMxMEE5ODQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTYiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjgiIGZpbGw9IiMxMEE5ODQiLz4KPC9zdmc+",
    profilePhoto: null,
    shortDescription: "Enterprise cloud migration and infrastructure optimization specialists",
    description: "CloudScale Solutions helps enterprises migrate to the cloud and optimize their infrastructure for scalability, security, and cost-efficiency. We specialize in AWS, Azure, and Google Cloud Platform implementations.",
    region: "Bristol",
    services: ["Cloud Migration", "Infrastructure Optimization", "DevOps", "Security"],
    industries: ["Enterprise", "Government", "Healthcare", "Financial Services"],
    isPremium: false,
    website: "https://cloudscalesolutions.co.uk",
    email: "hello@cloudscalesolutions.co.uk",
    phone: "+44 117 123 4567",
    hourlyRate: 11000, // £110/hour
    projectRateMin: 120000, // £1,200
    projectRateMax: 450000, // £4,500
    showRates: true,
    createdAt: new Date("2024-02-10"),
    portfolioItems: [
      {
        id: "portfolio-8",
        title: "Enterprise Cloud Migration",
        description: "Migrated legacy on-premise systems to AWS for a Fortune 500 company",
        metrics: "Reduced infrastructure costs by 60% and improved system reliability by 40%",
        technologies: ["AWS", "Terraform", "Docker", "Kubernetes"],
        projectType: "Cloud Migration",
        clientType: "Fortune 500 Company",
        duration: "12 months",
        displayOrder: 1
      }
    ],
    testimonials: [
      {
        id: "testimonial-5",
        clientName: "David Chen",
        clientTitle: "IT Director",
        clientCompany: "Global Manufacturing Corp",
        content: "CloudScale Solutions made our cloud migration seamless. Their expertise saved us months of work and significant costs.",
        rating: 5,
        createdAt: new Date("2024-03-15")
      }
    ],
    certifications: ["AWS Solutions Architect Professional", "Google Cloud Professional Architect", "Azure Solutions Architect Expert"],
    stats: {
      projectsCompleted: 35,
      avgResponseTime: "2h",
      clientRating: 4.8
    }
  },
  {
    id: "worxwide-consulting-001",
    name: "Worxwide Consulting",
    logo: null,
    profilePhoto: null,
    shortDescription: "AI-enabled sales transformation and UX-led experience design for digital growth",
    description: "Worxwide Consulting is a digital growth consulting firm specializing in AI-enabled sales transformation, UX-led experience design, and full-funnel automation. With over 60 experts across the U.S., U.K., and India, we help businesses across Manufacturing, Financial Services, Consumer Goods, Healthcare, and IT sectors transform their digital operations and drive growth.",
    region: "London",
    services: ["AI Implementation", "Sales Transformation", "UX Design", "Digital Automation", "SaaS Development"],
    industries: ["Manufacturing", "Financial Services", "Consumer Goods", "Healthcare", "IT"],
    isPremium: true,
    website: "http://www.worxwide.com",
    email: "consult@worxwide.com",
    phone: "+1-571-210-5955",
    hourlyRate: 12000, // £120/hour
    projectRateMin: 180000, // £1,800
    projectRateMax: 600000, // £6,000
    showRates: true,
    createdAt: new Date("2024-02-15"),
    portfolioItems: [
      {
        id: "portfolio-worxwide-1",
        title: "AI-Enabled Sales Transformation",
        description: "Implemented AI-driven sales automation platform for a leading manufacturing company",
        metrics: "Increased sales conversion rates by 45% and reduced sales cycle time by 30%",
        technologies: ["AI/ML", "Sales Automation", "CRM Integration", "Analytics"],
        projectType: "AI Implementation",
        clientType: "Manufacturing Company",
        duration: "6 months",
        displayOrder: 1
      },
      {
        id: "portfolio-worxwide-2",
        title: "UX-Led Digital Experience Platform",
        description: "Designed and developed comprehensive UX platform for financial services client",
        metrics: "Improved user engagement by 60% and increased customer satisfaction scores by 40%",
        technologies: ["UX/UI Design", "React", "Node.js", "User Research"],
        projectType: "UX Design",
        clientType: "Financial Services",
        duration: "4 months",
        displayOrder: 2
      }
    ],
    testimonials: [
      {
        id: "testimonial-worxwide-1",
        clientName: "Sarah Mitchell",
        clientTitle: "Digital Transformation Director",
        clientCompany: "Global Manufacturing Corp",
        content: "Worxwide's AI-enabled sales transformation exceeded our expectations. Their innovative approach and global expertise made all the difference.",
        rating: 5,
        createdAt: new Date("2024-03-20")
      }
    ],
    certifications: ["AI/ML Specialization", "UX Design Certification", "Sales Automation Expert"],
    stats: {
      projectsCompleted: 45,
      avgResponseTime: "2h",
      clientRating: 4.9
    }
  },
  {
    id: "this-is-ai-now-001",
    name: "This is AI Now",
    logo: null,
    profilePhoto: null,
    shortDescription: "Cutting-edge AI solutions and automation for modern businesses",
    description: "This is AI Now specializes in implementing cutting-edge artificial intelligence solutions for businesses looking to stay ahead in the digital transformation era. We provide comprehensive AI strategy, implementation, and optimization services across various industries.",
    region: "London",
    services: ["AI Implementation", "Machine Learning", "Automation", "Data Analytics", "AI Strategy"],
    industries: ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing"],
    isPremium: true,
    website: "https://thisisainow.com",
    email: "hello@thisisainow.com",
    phone: "+44 20 7123 4567",
    hourlyRate: 14000, // £140/hour
    projectRateMin: 200000, // £2,000
    projectRateMax: 700000, // £7,000
    showRates: true,
    createdAt: new Date("2024-02-20"),
    portfolioItems: [
      {
        id: "portfolio-thisisai-1",
        title: "AI-Powered Customer Service Automation",
        description: "Implemented intelligent chatbot system with natural language processing for customer service automation",
        metrics: "Reduced customer service costs by 50% and improved response time by 80%",
        technologies: ["NLP", "Machine Learning", "Python", "TensorFlow"],
        projectType: "AI Implementation",
        clientType: "E-commerce Platform",
        duration: "5 months",
        displayOrder: 1
      },
      {
        id: "portfolio-thisisai-2",
        title: "Predictive Analytics Platform",
        description: "Developed comprehensive predictive analytics system for retail inventory management",
        metrics: "Improved inventory accuracy by 35% and reduced waste by 25%",
        technologies: ["Machine Learning", "Python", "Pandas", "Scikit-learn"],
        projectType: "Data Analytics",
        clientType: "Retail Chain",
        duration: "4 months",
        displayOrder: 2
      }
    ],
    testimonials: [
      {
        id: "testimonial-thisisai-1",
        clientName: "Lisa Thompson",
        clientTitle: "CTO",
        clientCompany: "TechForward Ltd",
        content: "This is AI Now transformed our operations with their innovative AI solutions. Their expertise and delivery exceeded all expectations.",
        rating: 5,
        createdAt: new Date("2024-03-25")
      }
    ],
    certifications: ["AI/ML Specialization", "Data Science Certification", "Cloud AI Engineer"],
    stats: {
      projectsCompleted: 38,
      avgResponseTime: "1h",
      clientRating: 4.9
    }
  }
]

// Helper function to get featured consultants (premium + first 6)
export function getFeaturedConsultants(): MockConsultant[] {
  return mockConsultants.filter(c => c.isPremium).slice(0, 6)
}

// Helper function to get all consultants
export function getAllConsultants(): MockConsultant[] {
  return mockConsultants
}

// Helper function to get consultant by ID
export function getConsultantById(id: string): MockConsultant | null {
  return mockConsultants.find(c => c.id === id) || null
}


