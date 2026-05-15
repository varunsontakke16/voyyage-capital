DO $$ BEGIN
  CREATE TYPE "transaction_side" AS ENUM('buy', 'sell', 'dividend');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "model_portfolios" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "model_positions" (
  "portfolio_id" text NOT NULL,
  "symbol" text NOT NULL,
  "qty" double precision NOT NULL,
  "avg_cost" double precision NOT NULL,
  "opened_at" text,
  CONSTRAINT "model_positions_portfolio_id_model_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "model_portfolios"("id") ON DELETE cascade
);

CREATE UNIQUE INDEX IF NOT EXISTS "model_positions_portfolio_symbol_idx" ON "model_positions" ("portfolio_id","symbol");

CREATE TABLE IF NOT EXISTS "model_transactions" (
  "id" text PRIMARY KEY NOT NULL,
  "portfolio_id" text NOT NULL,
  "symbol" text NOT NULL,
  "side" "transaction_side" NOT NULL,
  "qty" double precision,
  "price" double precision,
  "amount" double precision,
  "at" text NOT NULL,
  "note" text,
  CONSTRAINT "model_transactions_portfolio_id_model_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "model_portfolios"("id") ON DELETE cascade
);
