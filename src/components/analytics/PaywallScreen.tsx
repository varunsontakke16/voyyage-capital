"use client";

import { Link } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";

const voyyagerFeatures = [
  "Live NSE market terminal with real-time data",
  "Voyyage Vector Model portfolios (read-only)",
  "Rebalancing updates & sector alerts",
  "Industry & sectoral research reports",
  "WhatsApp community access",
];

export function PaywallScreen() {
  return (
    <div className="dark terminal-shell min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="font-display text-lg text-gold hover:opacity-90">
            Voyyage
          </Link>
          <span className="text-muted-foreground text-sm hidden sm:inline">Terminal</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-center gap-10 px-4 py-16 md:px-6">
        <div className="text-center max-w-lg">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card/40">
            <Lock className="h-8 w-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-light tracking-tight mb-4">
            Voyyager Access Required
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            The Voyyage Terminal is available exclusively to Voyyager subscribers. Get real-time NSE market data, model portfolios, and research-grade insights.
          </p>
        </div>

        <div className="w-full max-w-sm rounded-lg border border-gold/40 bg-card/30 p-7">
          <div className="text-[11px] uppercase tracking-widest text-gold mb-2">Voyyager Plan</div>
          <div className="font-display text-4xl font-light mb-1">₹15,000</div>
          <div className="text-xs text-muted-foreground mb-6">Billed annually</div>
          <ul className="space-y-3.5 mb-8">
            {voyyagerFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="mailto:support@voyyageinvest.com?subject=Voyyager%20Subscription%20Enquiry"
            className="block w-full bg-[#c9a96e] hover:bg-[#b8945c] transition-colors text-white font-bold py-3.5 px-4 text-center text-[13px] uppercase tracking-wider rounded-[4px]"
          >
            Get Started
          </a>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Contact us at{" "}
            <a href="mailto:support@voyyageinvest.com" className="text-gold hover:underline">
              support@voyyageinvest.com
            </a>
          </p>
        </div>

        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </main>
    </div>
  );
}
