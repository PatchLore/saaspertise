# SaaSpertise SEO-First & Ethical Directory Strategy

## 🎯 Goal

Build a large, high-authority SaaS and AI business directory by focusing on **SEO growth and ethical pre-listing**, instead of premium signups or outbound outreach. The objective is to create the most comprehensive, search-optimized directory in the niche, while maintaining transparency and GDPR compliance.

---

## 🧠 Strategy Overview

* **Phase 1 (Now):** Bulk add 500–1,000 legitimate SaaS and AI companies from public sources. Focus on SEO and credibility.
* **Phase 2 (3–6 months):** Grow listings to 5,000+ via automated CSV imports and user submissions.
* **Phase 3 (Later):** Introduce “Claim Listing” and paid upgrades once steady organic traffic is achieved.

---

## ⚙️ Ethical Data Collection

### ✅ What’s Allowed

* Use publicly available company information from sources like:

  * Crunchbase (public profiles)
  * LinkedIn company pages
  * Clutch / FutureTools / ProductHunt
  * Company websites

* Include factual data: name, logo, description, website, industry, and location.

### ⚠️ Rules to Stay Compliant

* Do **not** email or contact unregistered companies directly.
* Add a disclaimer on every unclaimed listing:

  > “This profile was created using publicly available business information. Contact us to edit, claim, or remove your profile.”

* Provide visible contact ([support@saaspertise.com](mailto:support@saaspertise.com)) for edits or removals.
* Only send contact messages to companies once they’ve **claimed** or **verified** their listing.

---

## 🧩 Supabase Schema (simplified)

### **companies**

| Column      | Type      | Notes                       |
| ----------- | --------- | --------------------------- |
| id          | uuid      | PK                          |
| name        | text      | Company name                |
| slug        | text      | /company/[slug]             |
| description | text      | SEO summary                 |
| category    | text      | e.g., SaaS, AI, Marketing   |
| website_url | text      | Public URL                  |
| logo_url    | text      | Optional image              |
| location    | text      | City, Country               |
| tags        | text[]    | For filters                 |
| is_claimed  | boolean   | default false               |
| email       | text      | optional (for claimed only) |
| created_at  | timestamp | default now()               |

### **messages** (contact form routing)

| Column       | Type      | Notes             |
| ------------ | --------- | ----------------- |
| id           | uuid      | PK                |
| company_id   | uuid      | FK → companies.id |
| sender_name  | text      | user input        |
| sender_email | text      | user input        |
| message      | text      | user input        |
| forwarded    | boolean   | default false     |
| created_at   | timestamp | default now()     |

---

## 💬 Contact Form Logic

### Current Phase (Unclaimed Listings)

* Keep contact form visible on all company profiles.
* When submitted:

  * Store in `messages` table.
  * Send notification **only** to SaaSpertise admin.
  * Show user confirmation:

    > “Your message has been received. We’ll forward it once this company claims their profile.”

### Later Phase (Claimed Profiles)

* Forward inquiries directly to company email.
* Include transparent footer:

  > “This message was sent via the SaaSpertise.com contact form.”

---

## 🧭 Disclaimers & Legal Text

**For unclaimed profiles:**

> “All company listings were created using publicly available business information. To edit, verify, or remove your company, please contact [support@saaspertise.com](mailto:support@saaspertise.com).”

**For claimed profiles:**

> “Verified company profile — contact messages will be sent directly to this business.”

**For contact form:**

> “By submitting, you agree that SaaSpertise may store this message for moderation before forwarding to the company.”

---

## 📊 SEO Plan

### Step 1 — Bulk Seeding

* Add 500–1,000 company profiles with SEO-friendly slugs and categories.
* Each listing = new indexed page (`/company/[slug]`).

### Step 2 — Metadata Automation

* Use GPT or AI scripts to generate:

  * SEO titles (e.g., “Best AI Automation Agency — London | SaaSpertise”)
  * Meta descriptions (120–160 chars)
  * Structured data (JSON-LD for LocalBusiness)

### Step 3 — Internal Linking

* Add category filters: `/category/ai-tools`, `/category/marketing`, `/category/devops`.
* Include “related companies” section on each page.
* Interlink to relevant SaaS tools or OnPointPrompt articles for authority transfer.

### Step 4 — Backlinking & Blogs

* Write roundup posts: “Top 50 SaaS Agencies in the UK”, “Best AI Automation Consultancies 2025.”
* Submit site to directories and use natural backlinks from OnPointPrompt & LinkedIn.

---

## 📈 Growth Benchmarks

| Timeframe | Listings | Monthly Visits | Notes                           |
| --------- | -------- | -------------- | ------------------------------- |
| Month 1   | 500      | 500–1,000      | Start indexing                  |
| Month 3   | 1,500    | 3K–5K          | Build backlinks                 |
| Month 6   | 5,000    | 10K–20K        | Start claim signups             |
| Month 12  | 7,000+   | 30K–50K        | Directory authority established |

---

## 💰 Monetisation Plan (Later)

| Feature              | Description                   | Price Range |
| -------------------- | ----------------------------- | ----------- |
| Claim Listing        | Verify company + edit profile | Free–£49/mo |
| Featured Listing     | Top placement + logo badge    | £99/mo      |
| Sponsored Categories | Banner for niche visibility   | £149/mo     |
| Lead Forwarding      | Unlock contact leads          | £29/mo      |

---

## ✅ Summary

* Ethically add 500–5,000 companies for SEO foundation.
* Keep contact form active but **route through SaaSpertise** until verified.
* Focus on metadata, internal links, and consistency.
* Introduce monetisation only after domain trust and traffic build.

**SaaSpertise = the authoritative, ethical SaaS directory built for discovery, not disruption.**


