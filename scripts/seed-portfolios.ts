/**
 * Seed model portfolios from data/model-portfolios.json into PostgreSQL.
 * Usage: npm run db:seed
 */
import fs from "node:fs/promises";
import path from "node:path";
import { analyticsSessionDataSchema } from "../src/lib/analytics-terminal/portfolio-schema";
import { writeModelPortfolios } from "../src/lib/analytics-terminal/portfolio-store";

const DATA_FILE = path.join(process.cwd(), "data", "model-portfolios.json");

async function main() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = analyticsSessionDataSchema.parse(JSON.parse(raw));
  await writeModelPortfolios(parsed);
  console.log(`Seeded ${parsed.portfolios.length} portfolio(s) from ${DATA_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
