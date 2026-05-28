ALTER TABLE "model_portfolios" ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "model_portfolios" ADD COLUMN IF NOT EXISTS "initial_capital" double precision;
ALTER TABLE "model_positions" ADD COLUMN IF NOT EXISTS "target_weight_pct" double precision;
