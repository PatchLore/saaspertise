# Deployment Guide

This guide will help you deploy the SaaS & AI Consultants Directory to production.

## Quick Start

### 1. Database Setup (Supabase - Recommended)

1. **Create a Supabase account** at [supabase.com](https://supabase.com)
2. **Create a new project**
3. **Get your database URL**:
   - Go to Settings > Database
   - Copy the connection string under "Connection parameters"
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### 2. Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy the application**:
   ```bash
   cd consultants-directory
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard:
   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-super-secret-key-here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   RESEND_API_KEY=re_your_key
   ADMIN_EMAIL=admin@yourdomain.com
   ```

4. **Initialize the database**:
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

## Environment Variables Setup

### Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase/Railway/PlanetScale |
| `NEXTAUTH_URL` | Your production URL | Your Vercel domain |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | Generate with `openssl rand -base64 32` |

### Optional Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | Stripe Dashboard |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Stripe Dashboard |
| `RESEND_API_KEY` | Email service API key | Resend.com |
| `ADMIN_EMAIL` | Admin email address | Your email |

## Database Providers

### Option 1: Supabase (Recommended)
- ✅ Free tier available
- ✅ Easy to set up
- ✅ Built-in auth (not used here but available)
- ✅ Good performance

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings > Database
3. Use the connection string as `DATABASE_URL`

### Option 2: Railway
- ✅ Simple deployment
- ✅ Good free tier
- ✅ Auto-scaling

1. Create account at [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy connection string

### Option 3: PlanetScale
- ✅ Serverless MySQL
- ✅ Branching for schema changes
- ❌ Requires schema changes for foreign keys

## Stripe Setup (Optional)

1. **Create Stripe account** at [stripe.com](https://stripe.com)
2. **Get API keys** from Dashboard > Developers > API keys
3. **Set up webhook** (for production):
   - Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to listen for: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook secret

## Email Setup (Optional)

### Resend (Recommended)
1. Create account at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Verify your domain (for production)

### SendGrid Alternative
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Update email service in code if needed

## Post-Deployment Steps

### 1. Create Admin Account
1. Sign up through the app with your admin email
2. Manually update the user role in database:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-admin@email.com';
   ```

### 2. Test the Application
- [ ] Landing page loads
- [ ] User registration works
- [ ] Consultant onboarding works
- [ ] Directory search works
- [ ] Admin can access admin panel

### 3. Configure Domain (Optional)
1. Add custom domain in Vercel dashboard
2. Update `NEXTAUTH_URL` environment variable
3. Update Stripe webhook URL if using payments

## Monitoring and Maintenance

### Database Monitoring
- Monitor database usage in Supabase/Railway dashboard
- Set up alerts for high usage
- Regular backups (usually automatic)

### Application Monitoring
- Use Vercel Analytics
- Set up error tracking (Sentry recommended)
- Monitor API usage and performance

### Security Checklist
- [ ] Strong `NEXTAUTH_SECRET` set
- [ ] Database credentials secure
- [ ] Stripe webhook secret configured
- [ ] Admin email configured
- [ ] HTTPS enabled (automatic with Vercel)

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check DATABASE_URL format
   - Ensure database is accessible from Vercel
   - Verify credentials

2. **NextAuth errors**
   - Check NEXTAUTH_URL matches your domain
   - Ensure NEXTAUTH_SECRET is set
   - Clear browser cookies

3. **Build failures**
   - Check TypeScript errors
   - Ensure all dependencies are installed
   - Verify Prisma schema is valid

### Getting Help

- Check Vercel deployment logs
- Review database logs in Supabase/Railway
- Use `prisma studio` for database debugging
- Check browser console for client-side errors

## Scaling Considerations

### Database
- Monitor query performance
- Add indexes for frequently searched fields
- Consider read replicas for high traffic

### Application
- Vercel handles auto-scaling
- Monitor function execution time
- Consider caching for expensive operations

### CDN and Assets
- Vercel provides global CDN
- Optimize images with Next.js Image component
- Consider separate CDN for user uploads





