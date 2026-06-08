import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth";
import { readGrievanceState, writeGrievanceState } from "./grievance-store";

export const getGrievanceData = createServerFn({ method: "GET" }).handler(async () => {
  return await readGrievanceState();
});

const monthlyComplaintSchema = z.object({
  category: z.string(),
  pendingLastMonth: z.string(),
  received: z.string(),
  resolved: z.string(),
  totalPending: z.string(),
  pendingOver3Months: z.string(),
  avgResolutionTime: z.string(),
});

const monthlyTrendSchema = z.object({
  month: z.string(),
  carriedForward: z.string(),
  received: z.string(),
  resolved: z.string(),
  pending: z.string(),
});

const annualTrendSchema = z.object({
  year: z.string(),
  carriedForward: z.string(),
  received: z.string(),
  resolved: z.string(),
  pending: z.string(),
});

const saveGrievanceInput = z.object({
  monthEnding: z.string(),
  monthlyComplaints: z.array(monthlyComplaintSchema),
  monthlyTrends: z.array(monthlyTrendSchema),
  annualTrends: z.array(annualTrendSchema),
});

export const saveGrievanceData = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => saveGrievanceInput.parse(d))
  .handler(async ({ data }) => {
    requireAdmin();
    await writeGrievanceState(data);
    return { ok: true as const };
  });
