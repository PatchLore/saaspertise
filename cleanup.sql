-- Cleanup script - Run this first to remove everything
-- This will drop all tables and start fresh

-- Drop all foreign keys first (drop tables in reverse dependency order)
DROP TABLE IF EXISTS "public"."ratings" CASCADE;
DROP TABLE IF EXISTS "public"."case_studies" CASCADE;
DROP TABLE IF EXISTS "public"."portfolio_items" CASCADE;
DROP TABLE IF EXISTS "public"."testimonials" CASCADE;
DROP TABLE IF EXISTS "public"."payments" CASCADE;
DROP TABLE IF EXISTS "public"."leads" CASCADE;
DROP TABLE IF EXISTS "public"."consultants" CASCADE;
DROP TABLE IF EXISTS "public"."sessions" CASCADE;
DROP TABLE IF EXISTS "public"."accounts" CASCADE;
DROP TABLE IF EXISTS "public"."verificationtokens" CASCADE;
DROP TABLE IF EXISTS "public"."users" CASCADE;

-- Drop all enums
DROP TYPE IF EXISTS "public"."PaymentType" CASCADE;
DROP TYPE IF EXISTS "public"."PaymentStatus" CASCADE;
DROP TYPE IF EXISTS "public"."LeadStatus" CASCADE;
DROP TYPE IF EXISTS "public"."ServiceType" CASCADE;
DROP TYPE IF EXISTS "public"."UserRole" CASCADE;

