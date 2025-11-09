# SaaS & AI Consultants Directory

A comprehensive web application for connecting businesses with expert SaaS and AI consultants. Built with Next.js 14, Tailwind CSS, Prisma, and Stripe.

## Features

### 🎯 Core Features
- **Landing Page** with hero section, search, and featured consultants
- **Consultant Directory** with advanced search and filtering
- **Consultant Profiles** with detailed information and contact forms
- **User Authentication** with secure sign-up/sign-in
- **Consultant Onboarding** with profile creation wizard
- **Premium Listings** with Stripe integration
- **Admin Dashboard** for managing consultants and leads
- **Lead Management** with email notifications

### 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Email**: Resend/SendGrid
- **Deployment**: Vercel + Supabase/Railway

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Email service (Resend or SendGrid)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd consultants-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/consultants_directory?schema=public"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
   STRIPE_SECRET_KEY="sk_test_your_secret_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
   STRIPE_PRO_PRICE_ID="price_pro_placeholder"
   
   # Email
   RESEND_API_KEY="re_your_resend_api_key"
   
   # Admin
   ADMIN_EMAIL="admin@yourdomain.com"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application uses the following main entities:

- **Users**: Authentication and user management
- **Consultants**: Consultant profiles and business information  
- **Leads**: Contact form submissions and lead tracking
- **Payments**: Stripe payment records for premium listings

## API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login (via NextAuth)

### Consultants
- `POST /api/consultant/create` - Create consultant profile
- `GET /api/consultant/[id]` - Get consultant details
- `PUT /api/consultant/[id]` - Update consultant profile

### Leads
- `POST /api/leads` - Submit contact form
- `GET /api/leads` - Get leads (admin/consultant)

### Payments
- `POST /api/stripe/create-checkout-session` - Create Stripe checkout
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `POST /api/stripe/subscription/checkout` - Create subscription checkout
- `POST /api/stripe/test` - Test subscription upgrade/downgrade

## Deployment

### Vercel Deployment

1. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Set up database**
   - Create a PostgreSQL database (Supabase, Railway, or PlanetScale)
   - Update `DATABASE_URL` in Vercel environment variables
   - Run `npx prisma db push` to create tables

3. **Configure environment variables**
   - Add all environment variables in Vercel dashboard
   - Update `NEXTAUTH_URL` to your production domain

4. **Set up Stripe webhooks**
   - Add webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Update `STRIPE_WEBHOOK_SECRET`

### Database Setup (Supabase)

1. Create a new Supabase project
2. Get your database URL from Settings > Database
3. Update `DATABASE_URL` in your environment variables
4. Run `npx prisma db push` to create tables

## Features Roadmap

### ✅ Completed
- [x] Landing page with hero and featured consultants
- [x] Consultant directory with search and filters
- [x] User authentication system
- [x] Consultant onboarding flow
- [x] Database schema and API routes

### 🚧 In Progress
- [ ] Individual consultant profile pages
- [ ] Contact/lead form with email notifications
- [ ] Admin dashboard

### ✅ Recently Completed
- [x] Subscription billing with Stripe
- [x] Pricing page with Free/Pro/Enterprise plans
- [x] Plan access control and feature gating
- [x] User dashboard with plan status

### 📋 Planned
- [ ] Advanced search with location-based filtering
- [ ] Consultant reviews and ratings
- [ ] Messaging system between clients and consultants
- [ ] Analytics dashboard for consultants
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Quick Data Quality Checks

After running the ingestion pipeline you can spot-check the dataset with:

```bash
grep -i "openai" data/companies_raw.csv | head -3
grep -i ".ai" data/companies_raw.csv | wc -l
grep -i "ycombinator.com/companies" data/companies_raw.csv | wc -l
head -5 data/companies_raw.csv
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@consultantsdirectory.com or join our Discord community.