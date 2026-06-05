import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

export interface MonthlyComplaintRow {
  category: string;
  pendingLastMonth: string;
  received: string;
  resolved: string;
  totalPending: string;
  pendingOver3Months: string;
  avgResolutionTime: string;
}

export interface MonthlyTrendRow {
  month: string;
  carriedForward: string;
  received: string;
  resolved: string;
  pending: string;
}

export interface AnnualTrendRow {
  year: string;
  carriedForward: string;
  received: string;
  resolved: string;
  pending: string;
}

export interface GrievanceState {
  monthEnding: string;
  monthlyComplaints: MonthlyComplaintRow[];
  monthlyTrends: MonthlyTrendRow[];
  annualTrends: AnnualTrendRow[];
}

export const initialGrievanceState: GrievanceState = {
  monthEnding: "May 31, 2026",
  monthlyComplaints: [
    {
      category: "Directly from Investors",
      pendingLastMonth: "NIL",
      received: "0",
      resolved: "0",
      totalPending: "NIL",
      pendingOver3Months: "NIL",
      avgResolutionTime: "NIL"
    },
    {
      category: "SEBI (SCORES)",
      pendingLastMonth: "NIL",
      received: "0",
      resolved: "0",
      totalPending: "NIL",
      pendingOver3Months: "NIL",
      avgResolutionTime: "NIL"
    },
    {
      category: "Other Sources (if any)",
      pendingLastMonth: "NIL",
      received: "NIL",
      resolved: "NIL",
      totalPending: "NIL",
      pendingOver3Months: "NIL",
      avgResolutionTime: "NIL"
    }
  ],
  monthlyTrends: [
    {
      month: "March 2025 – Till Date",
      carriedForward: "0",
      received: "0",
      resolved: "0",
      pending: "0"
    }
  ],
  annualTrends: [
    {
      year: "2024–25",
      carriedForward: "0",
      received: "0",
      resolved: "0",
      pending: "0"
    }
  ]
};

let schemaChecked = false;

export async function ensureGrievanceTable(): Promise<void> {
  if (schemaChecked) return;
  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "grievance_data" (
      "key" text PRIMARY KEY,
      "value" text NOT NULL
    )
  `);
  schemaChecked = true;
}

export async function readGrievanceState(): Promise<GrievanceState> {
  await ensureGrievanceTable();
  const db = getDb();
  const res = await db.execute(sql`SELECT "value" FROM "grievance_data" WHERE "key" = 'complaints_state' LIMIT 1`);
  const rows = res.rows as Array<{ value: string }>;
  if (!rows || rows.length === 0) {
    await writeGrievanceState(initialGrievanceState);
    return initialGrievanceState;
  }
  try {
    return JSON.parse(rows[0].value) as GrievanceState;
  } catch {
    return initialGrievanceState;
  }
}

export async function writeGrievanceState(state: GrievanceState): Promise<void> {
  await ensureGrievanceTable();
  const db = getDb();
  const jsonStr = JSON.stringify(state);
  await db.execute(sql`
    INSERT INTO "grievance_data" ("key", "value")
    VALUES ('complaints_state', ${jsonStr})
    ON CONFLICT ("key") DO UPDATE SET "value" = EXCLUDED."value"
  `);
}
