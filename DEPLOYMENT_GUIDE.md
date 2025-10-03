# 🚀 Vercel Deployment Guide

## Step 1: Set Up Production Database

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > Database and copy the connection string
3. Replace `[YOUR-PASSWORD]` with your actual password

### Option B: Neon (Alternative)
1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the connection string from the dashboard

## Step 2: Deploy to Vercel

### Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Navigate to your project
cd /Users/allendunn/Documents/ASDIR/consultants-directory

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? consultants-directory
# - In which directory is your code located? ./
```

### Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git (connect your GitHub repo)
4. Configure project settings

## Step 3: Configure Environment Variables

In your Vercel dashboard, go to Settings > Environment Variables and add:

```env
# Database (Required)
DATABASE_URL=your_postgresql_connection_string

# NextAuth.js (Required)
NEXTAUTH_SECRET=your-super-secret-key-here-at-least-32-chars
NEXTAUTH_URL=https://your-app-name.vercel.app

# Email (Optional - for notifications)
RESEND_API_KEY=re_your_api_key

# Stripe (Optional - for payments)
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## Step 4: Set Up Database Schema

### Using Vercel CLI
```bash
# Set your production DATABASE_URL locally for this step
echo 'DATABASE_URL="your_postgresql_connection_string"' > .env.production

# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push --accept-data-loss

# Seed production database
npx tsx prisma/seed-production.ts
```

### Alternative: Using Prisma Studio
```bash
# Open Prisma Studio connected to production
DATABASE_URL="your_postgresql_connection_string" npx prisma studio
```

## Step 5: Test Your Deployment

1. **Visit your app**: `https://your-app-name.vercel.app`
2. **Test authentication**:
   - Admin: `admin@consultantsdirectory.com` / `admin123!`
   - Consultant: `john@techconsult.com` / `consultant123!`
3. **Test key features**:
   - Browse consultant directory
   - View individual profiles
   - Contact forms
   - Admin dashboard

## Step 6: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` environment variable to your custom domain

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
DATABASE_URL="your_connection_string" npx prisma db push --accept-data-loss
```

### Environment Variable Issues
- Ensure all required variables are set in Vercel dashboard
- Redeploy after adding new environment variables

### Build Errors
```bash
# Test build locally
npm run build
```

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your deployed URL exactly
- Ensure `NEXTAUTH_SECRET` is set and at least 32 characters

## 🎉 Go Live Checklist

- [ ] Database is set up and seeded
- [ ] All environment variables are configured
- [ ] App deploys successfully
- [ ] Authentication works
- [ ] Consultant profiles load
- [ ] Contact forms work
- [ ] Admin dashboard accessible
- [ ] Custom domain configured (if applicable)

## 📊 Post-Deployment

### Analytics Setup
Consider adding:
- Vercel Analytics
- Google Analytics
- PostHog for user behavior

### Monitoring
- Set up error tracking (Sentry)
- Monitor database performance
- Set up uptime monitoring

### SEO
- Submit sitemap to Google
- Set up Google Search Console
- Add meta descriptions and og:images

---

**Your SaaS + AI Consultants Directory is now live!** 🎉

Share the URL with potential consultants to start building your community.
















