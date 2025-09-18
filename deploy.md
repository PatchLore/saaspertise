# 🚀 Production Deployment Guide

## Quick Deploy (5 minutes)

### 1. **Set up Database (Supabase)**
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to Settings > Database
4. Copy connection string (looks like: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`)

### 2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd consultants-directory
vercel --prod
```

### 3. **Set Environment Variables in Vercel**
In your Vercel dashboard, add these environment variables:

**Required:**
- `DATABASE_URL` = Your Supabase connection string
- `NEXTAUTH_URL` = Your Vercel domain (e.g., `https://consultants-directory.vercel.app`)
- `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
- `ADMIN_EMAIL` = Your email address

**Optional (for full functionality):**
- `RESEND_API_KEY` = From [resend.com](https://resend.com) for emails
- `STRIPE_PUBLISHABLE_KEY` = From Stripe dashboard
- `STRIPE_SECRET_KEY` = From Stripe dashboard

### 4. **Initialize Production Database**
```bash
# Generate Prisma client for production
npx prisma generate

# Push database schema
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 5. **Create Admin Account**
1. Go to your live site and sign up with your admin email
2. Run this SQL in Supabase SQL editor:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-admin@email.com';
```

## 🎯 **You're Live!**

Your platform will be available at: `https://your-domain.vercel.app`

### Test the Full Flow:
1. **Landing page** - Professional homepage
2. **Sign up** - Create consultant account  
3. **Onboarding** - Complete profile (will need admin approval)
4. **Admin panel** - Approve consultants at `/admin`
5. **Directory** - Browse approved consultants
6. **Contact forms** - Clients can reach consultants

## 📈 **Ready for Your First 50 Consultants!**

You now have:
- ✅ Professional platform
- ✅ Consultant onboarding
- ✅ Admin approval system  
- ✅ Lead capture system
- ✅ Production deployment

**Marketing Strategy:**
1. **LinkedIn outreach** - "Free premium listing for first 50 SaaS/AI consultants"
2. **Twitter announcement** - Show screenshots of the platform
3. **Communities** - Post in consultant/freelancer groups
4. **Direct outreach** - Email consultants you know

The platform is ready to handle real consultants and clients!




