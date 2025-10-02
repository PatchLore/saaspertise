# Saaspertise Backend Setup Guide

This guide will help you set up the backend for Saaspertise, your SaaS consultant directory.

## 🏗️ Architecture Overview

- **Framework**: Next.js 15 with API Routes
- **Database**: PostgreSQL via Supabase
- **Authentication**: NextAuth.js with JWT
- **Email**: Resend for transactional emails
- **Payments**: Stripe (scaffolded for future use)
- **ORM**: Prisma

## 🚀 Quick Start

### 1. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your database connection string from Settings > Database
3. Update your `.env.local`:

```env
# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Optional - for direct Supabase client usage
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

## 📧 Email Configuration (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key and add to `.env.local`:

```env
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"
```

## 💳 Stripe Setup (Future Payments)

1. Create account at [stripe.com](https://stripe.com)
2. Get your keys and add to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

3. Set up webhook endpoint in Stripe dashboard:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`

## 🔐 Authentication Setup

NextAuth.js is configured with JWT strategy. The authentication system includes:

- **Signup**: `/api/auth/signup`
- **Login**: `/api/auth/signin` (handled by NextAuth)
- **Logout**: `/api/auth/logout`

### User Roles

- `CONSULTANT`: Default role for signed up users
- `ADMIN`: Can manage all consultants and view admin dashboard

## 📊 Database Schema

### Core Models

- **User**: Authentication and user management
- **Consultant**: Consultant profiles with expertise, rates, and approval status
- **Lead**: Contact form submissions from potential clients
- **Testimonial**: Client reviews and ratings
- **PortfolioItem**: Consultant portfolio projects
- **CaseStudy**: Detailed case studies with challenges, solutions, and results
- **Rating**: Star ratings with category breakdowns
- **Payment**: Stripe payment records

### Key Features

- **PostgreSQL Arrays**: For services, industries, and technologies
- **JSON Fields**: For flexible data storage (rating categories)
- **Cascading Deletes**: Proper cleanup when consultants are removed
- **Audit Fields**: Created/updated timestamps on all models

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- NextAuth handles login via `/api/auth/signin`

### Consultants
- `GET /api/consultants` - List consultants with search/filters
- `POST /api/consultants` - Create consultant profile
- `GET /api/consultants/[id]` - Get specific consultant
- `PUT /api/consultants/[id]` - Update consultant profile
- `DELETE /api/consultants/[id]` - Delete consultant profile

### Case Studies
- `GET /api/consultants/[id]/case-studies` - Get consultant's case studies
- `POST /api/consultants/[id]/case-studies` - Create case study
- `GET /api/case-studies/[id]` - Get specific case study
- `PUT /api/case-studies/[id]` - Update case study
- `DELETE /api/case-studies/[id]` - Delete case study

### Leads & Contact
- `POST /api/leads` - Submit contact form (sends email notification)
- `GET /api/leads` - Get leads (consultants/admins only)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard statistics
- `GET /api/admin/consultants` - List all consultants for admin
- `POST /api/admin/consultants` - Bulk operations
- `GET /api/admin/consultants/[id]` - Get consultant for admin review
- `PATCH /api/admin/consultants/[id]` - Approve/reject/feature consultants

### Payments (Future)
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 🔍 Search & Filtering

The consultant directory supports advanced search:

### Query Parameters
- `search`: Text search across name, description, services, industries
- `region`: Filter by geographic region
- `expertise`: Filter by specific expertise/service
- `featured`: Show only featured consultants
- `page`: Pagination (default: 1)
- `limit`: Results per page (default: 20)

### Example
```
GET /api/consultants?search=AI&region=North America&featured=true&page=1&limit=10
```

## 📧 Email Notifications

The system sends automated emails for:

### Contact Form Submissions
- Notifies consultants when they receive new leads
- Includes client contact info and message
- Professional HTML formatting

### Admin Actions
- **Approval**: Welcome email with dashboard link
- **Rejection**: Polite rejection with improvement suggestions

## 🛡️ Security Features

- **Authentication**: Required for all profile management
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive validation on all endpoints
- **Rate Limiting**: Built-in Next.js API route protection
- **CORS**: Configured for production domains
- **Environment Variables**: Sensitive data properly secured

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Environment Variables for Production

```env
# Database
DATABASE_URL="your-production-database-url"
DIRECT_URL="your-production-direct-url"

# Authentication
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"

# Email
RESEND_API_KEY="your-production-resend-key"
FROM_EMAIL="noreply@yourdomain.com"

# Stripe (when ready)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📈 Future Enhancements

The backend is architected to support:

1. **Advanced Analytics**: Track consultant performance and lead conversion
2. **Subscription Management**: Stripe subscriptions for premium features
3. **File Uploads**: Case study attachments via UploadThing
4. **Real-time Notifications**: WebSocket support for live updates
5. **API Rate Limiting**: Advanced rate limiting per user/consultant
6. **Audit Logging**: Track all admin actions and profile changes

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Verify Supabase credentials and network access
2. **Email Not Sending**: Check Resend API key and FROM_EMAIL domain
3. **Authentication Issues**: Ensure NEXTAUTH_SECRET is set and consistent
4. **Stripe Webhooks**: Verify webhook URL and secret in Stripe dashboard

### Logs

Check your deployment platform's logs for detailed error messages. All API routes include comprehensive error logging.

## 📞 Support

For technical support or questions about the backend implementation, refer to the codebase documentation or create an issue in the repository.

---

**Note**: This backend is production-ready but includes scaffolding for future payment features. The Stripe integration is set up but not activated until you're ready to enable payments.



