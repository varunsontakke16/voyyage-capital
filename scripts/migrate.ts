/**
 * Apply SQL migrations in ./drizzle (ordered by filename).
 * Usage: npm run db:migrate
 */
import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const MIGRATIONS_DIR = path.join(process.cwd(), "drizzle");

async function main() {
  // Neon: use *direct* (unpooled) connection for migrations when available.
  const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const sql = postgres(url, { max: 1, ssl: "require" });
  await sql`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id serial PRIMARY KEY,
      name text NOT NULL UNIQUE,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  const files = (await fs.readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const name = file;
    const existing = await sql`SELECT 1 FROM "__drizzle_migrations" WHERE name = ${name} LIMIT 1`;
    if (existing.length > 0) {
      console.log(`skip ${name}`);
      continue;
    }
    const body = await fs.readFile(path.join(MIGRATIONS_DIR, file), "utf8");
    await sql.unsafe(body);
    await sql`INSERT INTO "__drizzle_migrations" (name) VALUES (${name})`;
    console.log(`applied ${name}`);
  }

  await sql.end();
  console.log("Migrations complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
