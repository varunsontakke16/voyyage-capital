"use client";

import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import { terminalLogin } from "@/lib/analytics-terminal/analytics-fns";
import { Footer } from "@/components/footer";

const INSIGHTPIER_URL =
  "https://insightpier.com/analyst/varunsontakke/subscription/The%20Voyyage%20Vector%20Model";

const voyyagerFeatures = [
  "Live NSE market terminal with real-time data",
  "Voyyage Vector Model portfolios (read-only)",
  "Rebalancing updates & sector alerts",
  "Industry & sectoral research reports",
  "WhatsApp community access",
];

function TerminalLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await terminalLogin({ data: { email, password } });
      if (!res.ok) {
        setError(
          res.reason === "not_configured"
            ? "Login is not available right now. Please contact support."
            : "Invalid email or password.",
        );
        return;
      }
      // Re-run the route loader so access is re-checked and the terminal renders.
      await router.invalidate();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-card/30 p-7">
      <div className="text-[11px] uppercase tracking-widest text-gold mb-2">Subscriber Login</div>
      <h2 className="font-display text-2xl font-light mb-1">Access the Terminal</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Already a Voyyager? Sign in to open the live terminal.
      </p>
      <form onSubmit={(e) => void submit(e)} className="space-y-4">
        <div>
          <label htmlFor="terminal-email" className="text-xs text-muted-foreground">
            Email
          </label>
          <input
            id="terminal-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1.5 w-full rounded-[4px] border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="terminal-password" className="text-xs text-muted-foreground">
            Password
          </label>
          <input
            id="terminal-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1.5 w-full rounded-[4px] border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#c9a96e] px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#b8945c] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export function PaywallScreen() {
  return (
    <div className="dark terminal-shell flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="font-display text-lg text-gold hover:opacity-90">
            Voyyage
          </Link>
          <span className="text-muted-foreground text-sm hidden sm:inline">Terminal</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center gap-8 px-4 py-10 md:px-6">
        <div className="text-center">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/40">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-light tracking-tight">
            If not yet, subscribe to the Voyyager plan
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mt-3 max-w-xl mx-auto">
            The Voyyage Terminal is available exclusively to Voyyager subscribers. Sign in below, or
            subscribe to get real-time NSE market data, model portfolios, and research-grade
            insights.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:max-w-3xl">
          <div className="flex justify-center">
            <TerminalLogin />
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-lg border border-gold/40 bg-card/30 p-7">
              <div className="text-[11px] uppercase tracking-widest text-gold mb-2">
                Voyyager Plan
              </div>
              <div className="font-display text-4xl font-light mb-1">₹15,000</div>
              <div className="text-xs text-muted-foreground mb-6">Billed annually</div>
              <ul className="space-y-3 mb-7">
                {voyyagerFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={INSIGHTPIER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#c9a96e] px-4 py-3.5 text-center text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#b8945c]"
              >
                Get Started <ArrowRight size={16} />
              </a>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Contact us at{" "}
                <a href="mailto:support@voyyageinvest.com" className="text-gold hover:underline">
                  support@voyyageinvest.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
