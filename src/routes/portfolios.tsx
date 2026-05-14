import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FadeUp } from "@/components/motion-primitives";

const searchSchema = z.object({
  plan: z.enum(["explorer", "navigator", "voyager"]).optional(),
});

const planLabel: Record<NonNullable<z.infer<typeof searchSchema>["plan"]>, string> = {
  explorer: "Explorer (Free)",
  navigator: "Navigator (₹12,000 / year)",
  voyager: "Voyager (₹15,000 / year)",
};

export const Route = createFileRoute("/portfolios")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Portfolio Strategies — Voyyage" },
      { name: "description", content: "Curated model portfolios built on the Voyyage Vector Framework." },
      { property: "og:title", content: "Portfolio Strategies — Voyyage" },
      { property: "og:description", content: "Curated model portfolios built on the Voyyage Vector Framework." },
    ],
  }),
  component: PortfoliosPage,
});

const portfolios = [
  { name: "Momentum Core", cagr: "28.4%", oneY: "+34.2%", risk: "Medium", points: [10, 14, 12, 18, 22, 19, 26, 30, 28, 36, 40, 44] },
  { name: "Dividend Compounders", cagr: "16.8%", oneY: "+19.5%", risk: "Low", points: [10, 12, 11, 13, 14, 15, 16, 17, 18, 20, 21, 23] },
  { name: "Balanced Alpha", cagr: "22.1%", oneY: "+27.8%", risk: "High", points: [10, 16, 13, 20, 17, 24, 21, 28, 26, 32, 30, 38] },
];

const riskColor: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-rose-50 text-rose-700 border-rose-200",
};

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 240, h = 56;
  const d = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
      <path d={d} fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PortfoliosPage() {
  const { plan } = Route.useSearch();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <Link to="/" className="text-[12px] uppercase tracking-[0.15em] text-[var(--gold)]">← Back</Link>
            <h1 className="mt-6 font-display font-light text-[var(--navy)] text-[44px] md:text-[64px] leading-[1.05] tracking-tight">
              Portfolio Strategies
            </h1>
            <p className="mt-6 text-[17px] text-[#6B7280] max-w-2xl leading-[1.8]">
              Your selected plan{" "}
              {plan ? (
                <span className="text-[var(--navy)] font-medium">({planLabel[plan]})</span>
              ) : null}{" "}
              unlocks access to these curated model portfolios. Built on the Voyyage Vector Framework.
            </p>
          </FadeUp>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {portfolios.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.08}>
                <div className="border border-[var(--border)] rounded-md p-8 bg-white hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-display text-[28px] text-[var(--navy)] font-light leading-tight">{p.name}</div>
                    <span className={`text-[11px] uppercase tracking-[0.1em] px-2.5 py-1 border rounded-sm ${riskColor[p.risk]}`}>{p.risk}</span>
                  </div>

                  <div className="mt-8">
                    <Sparkline points={p.points} />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">CAGR</div>
                      <div className="mt-1 font-display text-[28px] text-[var(--gold)] font-light">{p.cagr}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">1Y Return</div>
                      <div className="mt-1 font-display text-[28px] text-[var(--navy)] font-light">{p.oneY}</div>
                    </div>
                  </div>

                  <button className="mt-10 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] font-medium text-[var(--navy)] border border-[var(--navy)] px-6 py-3 rounded-md hover:bg-[var(--navy)] hover:text-white transition-colors self-start">
                    View Portfolio <ArrowRight size={14} />
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-24 border-t border-[var(--border)] pt-8 text-center">
            <p className="text-xs text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
              SEBI Disclaimer: Investments in securities markets are subject to market risks. Past performance is not indicative of future returns. Please read all related documents carefully before investing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
