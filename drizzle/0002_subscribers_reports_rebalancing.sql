-- New enums for subscriber management
DO $$ BEGIN
  CREATE TYPE "plan_tier" AS ENUM('beginner', 'voyyager');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "payment_status" AS ENUM('pending', 'active', 'expired', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Subscribers: tracks who has access and at what plan tier
CREATE TABLE IF NOT EXISTS "subscribers" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "plan_tier" "plan_tier" NOT NULL DEFAULT 'beginner',
  "subscription_start" timestamp with time zone,
  "subscription_end" timestamp with time zone,
  "payment_status" "payment_status" NOT NULL DEFAULT 'pending',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Research reports (is_free = true for Beginner tier access)
CREATE TABLE IF NOT EXISTS "research_reports" (
  "id" text PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "summary" text,
  "content_url" text,
  "published_at" timestamp with time zone DEFAULT now() NOT NULL,
  "is_free" boolean NOT NULL DEFAULT false,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Rebalancing updates tied to a model portfolio
CREATE TABLE IF NOT EXISTS "rebalancing_updates" (
  "id" text PRIMARY KEY NOT NULL,
  "portfolio_id" text,
  "title" text NOT NULL,
  "content" text,
  "published_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "rebalancing_updates_portfolio_id_fk"
    FOREIGN KEY ("portfolio_id") REFERENCES "model_portfolios"("id") ON DELETE SET NULL
);
