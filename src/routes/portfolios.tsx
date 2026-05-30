import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  plan: z.enum(["explorer", "navigator", "voyager"]).optional(),
});

export const Route = createFileRoute("/portfolios")({
  validateSearch: searchSchema,
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
