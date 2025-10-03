# Subscription Billing Setup Guide

This guide will help you set up subscription billing for the SaaS platform using Stripe.

## 🎯 Overview

The subscription billing system includes:
- **Free Plan**: Always available, no payment required
- **Pro Plan**: $29/month subscription with enhanced features
- **Enterprise Plan**: Coming soon (greyed out, disabled)

## 🛠 Setup Steps

### 1. Stripe Configuration

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Complete account verification

2. **Create Products and Prices**
   ```bash
   # In Stripe Dashboard > Products
   # Create a new product:
   # Name: "Pro Plan"
   # Description: "Monthly subscription for Pro features"
   # Price: $29.00 USD (monthly)
   # Copy the Price ID (starts with price_)
   ```

3. **Set Environment Variables**
   ```env
   STRIPE_SECRET_KEY="sk_test_..." # or sk_live_ for production
   STRIPE_PUBLISHABLE_KEY="pk_test_..." # or pk_live_ for production
   STRIPE_WEBHOOK_SECRET="whsec_..."
   STRIPE_PRO_PRICE_ID="price_..." # Copy from Stripe Dashboard
   ```

### 2. Database Setup

1. **Run Database Migration**
   ```bash
   npx prisma db push
   ```

2. **Verify Schema Changes**
   - User table now has `plan` column (default: FREE)
   - New Subscription table for tracking subscriptions
   - Payment table updated for subscription payments

### 3. Webhook Configuration

1. **Set up Stripe Webhook**
   - In Stripe Dashboard > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `checkout.session.completed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 4. Testing

1. **Development Testing**
   - Use test route: `POST /api/stripe/test`
   - Body: `{ "action": "upgrade", "plan": "PRO" }`
   - This simulates subscription without Stripe charges

2. **Stripe Test Cards**
   - Use Stripe test cards for checkout testing
   - Card: `4242 4242 4242 4242`
   - Any future expiry date and CVC

## 📋 Features Implemented

### ✅ Backend
- [x] User plan column in database (FREE, PRO, ENTERPRISE)
- [x] Stripe subscription checkout API
- [x] Webhook handlers for subscription events
- [x] Plan access control helpers
- [x] Test route for development

### ✅ Frontend
- [x] Pricing page with plan comparison
- [x] Dashboard plan status display
- [x] Navigation links to pricing
- [x] Upgrade/downgrade buttons
- [x] Plan-based UI indicators

### ✅ Database
- [x] User.plan column with enum
- [x] Subscription model for tracking
- [x] Payment model updated for subscriptions
- [x] Default plan set to FREE

## 🎨 UI Components

### Pricing Page (`/pricing`)
- Three plan cards: Free, Pro, Enterprise
- Free plan highlighted if user is on free
- Pro plan shows "Upgrade" button
- Enterprise shows "Coming Soon" (disabled)
- Test buttons for development

### Dashboard Plan Status
- Shows current plan with colored badge
- Subscription renewal/cancellation info
- Upgrade buttons based on current plan
- Upgrade suggestions

### Navigation
- Pricing link in main navigation
- Mobile navigation support

## 🔧 API Endpoints

### Subscription Checkout
```bash
POST /api/stripe/subscription/checkout
Content-Type: application/json

{
  "plan": "PRO"
}
```

### Test Subscription (Development)
```bash
POST /api/stripe/test
Content-Type: application/json

{
  "action": "upgrade",  // or "downgrade"
  "plan": "PRO"         // required for upgrade
}
```

### Webhook Handler
```bash
POST /api/stripe/webhook
# Handles Stripe subscription events
```

## 🎯 Plan Features

### Free Plan
- Basic profile listing
- Up to 3 portfolio items
- Basic contact form
- Standard support

### Pro Plan ($29/month)
- Featured listing priority
- Unlimited portfolio items
- Advanced analytics
- Priority support
- Lead management tools
- Custom branding

### Enterprise Plan (Coming Soon)
- Top-tier placement
- Custom branding
- API access
- White-label options
- Dedicated account manager

## 🚀 Deployment Checklist

### Production Setup
1. [ ] Create Stripe live account
2. [ ] Set up live webhook endpoint
3. [ ] Update environment variables for production
4. [ ] Test subscription flow end-to-end
5. [ ] Set up monitoring for webhook failures

### Environment Variables (Production)
```env
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

## 🔍 Monitoring

### Key Metrics to Track
- Subscription conversion rate
- Monthly recurring revenue (MRR)
- Churn rate
- Webhook success rate
- Payment failures

### Logging
- All subscription events are logged
- Webhook failures are logged with details
- Test upgrades are logged for debugging

## 🆘 Troubleshooting

### Common Issues

1. **Webhook Not Receiving Events**
   - Check webhook URL is correct
   - Verify webhook secret matches
   - Check Stripe Dashboard for failed events

2. **Subscription Not Updating**
   - Check database connection
   - Verify Prisma client is generated
   - Check webhook event handling

3. **Test Route Not Working**
   - Ensure user is authenticated
   - Check database permissions
   - Verify Prisma schema is up to date

### Support
- Check Stripe Dashboard logs
- Review application logs
- Test with Stripe test cards
- Use test route for development

## 📈 Next Steps

### Future Enhancements
- [ ] Customer portal for subscription management
- [ ] Prorated billing for upgrades
- [ ] Annual subscription discounts
- [ ] Enterprise custom pricing
- [ ] Usage-based billing features
- [ ] Subscription analytics dashboard

### Integration Points
- [ ] Email notifications for subscription events
- [ ] Admin dashboard for subscription management
- [ ] Analytics integration
- [ ] Customer support tools



