import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Terminal — Voyyage" },
      { name: "description", content: "Live NSE market terminal and model portfolios for Voyyage subscribers." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center mt-20">
        <div className="text-center">
          <h1 className="text-5xl font-display text-[var(--navy)] mb-4">Coming Soon</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The Voyyage Terminal is currently under development. Get in touch with us to learn more.
          </p>
          <div className="mt-8">
            <a href="mailto:hello@voyyage.in" className="btn-gold inline-flex items-center gap-2">
              Contact Voyyage
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
