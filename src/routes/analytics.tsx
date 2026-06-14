import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsWorkspace } from "@/components/analytics/AnalyticsWorkspace";
import { PaywallScreen } from "@/components/analytics/PaywallScreen";
import { checkSubscriberAccess } from "@/lib/analytics-terminal/analytics-fns";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Terminal — Voyyage" },
      { name: "description", content: "Live NSE market terminal and model portfolios for Voyyage subscribers." },
    ],
  }),
  loader: async () => {
    const access = await checkSubscriberAccess();
    return { access };
  },
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { access } = Route.useLoaderData();

  if (!access.ok) {
    return <PaywallScreen />;
  }

  return <AnalyticsWorkspace />;
}
