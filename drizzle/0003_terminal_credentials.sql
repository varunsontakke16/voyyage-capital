-- Terminal login credentials: gate access to the /analytics terminal.
CREATE TABLE IF NOT EXISTS "terminal_credentials" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "password_hash" text NOT NULL,
  "tier" text NOT NULL DEFAULT 'voyyager',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Seed the initial terminal login.
-- email:    support@voyyageinvest.com
-- password: varunsontakke16  (stored as scrypt `salt:hash`, both hex)
INSERT INTO "terminal_credentials" ("id", "email", "password_hash", "tier")
VALUES (
  'tc_support',
  'support@voyyageinvest.com',
  '5c097646788967517dd38a3603b74f08:e15b33ebbf5110f278449140d30d7b968c5dfb3c8f4c7215dcdef4aff3ffea0d203e2705a77cc188321c7476f3e479983940c3ba65561ec76edcb6f17d5f9160',
  'voyyager'
)
ON CONFLICT ("email") DO UPDATE
  SET "password_hash" = EXCLUDED."password_hash",
      "tier" = EXCLUDED."tier",
      "updated_at" = now();
