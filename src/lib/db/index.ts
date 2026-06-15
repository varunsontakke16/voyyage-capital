import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Uses Neon's HTTP transport instead of WebSockets so this module works in
// both Vercel Node.js functions AND Vercel Edge functions (no `ws` package
// required; `ws` binds to Node.js `net`/`tls` and breaks in Edge runtimes).
export function getDb() {
  const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. In Neon: Project → Connect → copy the connection string.",
    );
  }
  const client = neon(url);
  return drizzle({ client, schema });
}

export type Db = ReturnType<typeof getDb>;
