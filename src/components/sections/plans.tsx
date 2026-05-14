import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp } from "../motion-primitives";

type PlanRow = { label: string; included: boolean };

const plans: Array<{
  tierName: string;
  price: string;
  priceNote: string;
  features: PlanRow[];
  slug: "explorer" | "navigator" | "voyager";
  featured: boolean;
}> = [
  {
    tierName: "Explorer",
    price: "Free",
    priceNote: "",
    features: [
      { label: "3 Research reports", included: true },
      { label: "The Voyyage Vector Model", included: false },
      { label: "Rebalancing updates", included: false },
      { label: "Industry research reports", included: false },
      { label: "Sectoral updates", included: false },
      { label: "Access to whatsapp community", included: false },
    ],
    slug: "explorer",
    featured: false,
  },
  {
    tierName: "Navigator",
    price: "₹12,000",
    priceNote: "Billed annually",
    features: [
      { label: "The Voyyage Vector Model", included: true },
      { label: "Rebalancing updates", included: true },
      { label: "Industry research reports", included: false },
      { label: "Sectoral updates", included: false },
      { label: "Access to whatsapp community", included: false },
    ],
    slug: "navigator",
    featured: true,
  },
  {
    tierName: "Voyager",
    price: "₹15,000",
    priceNote: "Billed annually",
    features: [
      { label: "The Voyyage Vector Model", included: true },
      { label: "Rebalancing updates", included: true },
      { label: "Industry research reports", included: true },
      { label: "Sectoral updates", included: true },
      { label: "Access to whatsapp community", included: true },
    ],
    slug: "voyager",
    featured: false,
  },
];

export function Plans() {
  return (
    <section id="plans" data-section="light" className="bg-white py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <FadeUp>
            <div className="eyebrow mb-6">Access Voyyage</div>
            <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[56px] leading-[1.05] tracking-tight">
              Choose your portfolio.
            </h2>
            <p className="mt-6 text-[17px] text-[#6B7280] leading-[1.8]">
              Start with free research reports or unlock the full Voyyage Vector experience with an annual subscription.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <div
                className={`relative h-full bg-white p-10 transition-all duration-300 hover:-translate-y-1.5 ${
                  p.featured
                    ? "border-t-2 border-[var(--gold)] shadow-[0_30px_60px_-30px_rgba(13,27,42,0.25)] border-x border-b border-[var(--border)]"
                    : "border border-[var(--border)] rounded-md"
                }`}
                style={p.featured ? { borderRadius: "0 0 6px 6px" } : {}}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--navy)] text-[11px] uppercase tracking-[0.15em] px-3 py-1 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-[12px] uppercase tracking-[0.15em] text-[var(--gold)]">{p.tierName}</div>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-[56px] font-light text-[#1A1A1A] leading-none">{p.price}</span>
                </div>
                {p.priceNote ? (
                  <p className="mt-2 text-[13px] text-[#6B7280]">{p.priceNote}</p>
                ) : null}

                <div className="my-8 h-px bg-[var(--border)]" />

                <ul className="space-y-4">
                  {p.features.map((f) => (
                    <li
                      key={`${p.slug}-${f.label}`}
                      className={`flex gap-3 text-[15px] ${f.included ? "text-[#1A1A1A]" : "text-[#9CA3AF]"}`}
                    >
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border text-[10px] leading-none ${
                          f.included
                            ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                            : "border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]"
                        }`}
                        aria-hidden
                      >
                        {f.included ? <Check size={11} strokeWidth={3} /> : null}
                      </span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/portfolios"
                  search={{ plan: p.slug }}
                  className={`mt-10 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] font-medium ${
                    p.featured ? "btn-gold" : "text-[var(--navy)] border border-[var(--navy)] px-7 py-3.5 rounded-md hover:bg-[var(--navy)] hover:text-white transition-colors"
                  }`}
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
