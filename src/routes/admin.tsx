import { createFileRoute } from "@tanstack/react-router";
import { AdminPortfolioWorkspace } from "@/components/admin/AdminPortfolioWorkspace";

export const Route = createFileRoute("/admin")({
  component: AdminPortfolioWorkspace,
});
