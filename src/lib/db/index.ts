import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;

/** Neon pooled connection — supports reads, writes, and transactions. */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. In Neon: Project → Connect → copy the pooled connection string.",
    );
  }
  if (!pool) {
    pool = new Pool({ connectionString: url });
  }
  return drizzle(pool, { schema });
}

export type Db = ReturnType<typeof getDb>;
