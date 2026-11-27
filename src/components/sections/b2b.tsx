import { ArrowRight, FileSearch, LineChart } from "lucide-react";
import { FadeUp } from "../motion-primitives";

const CONTACT_EMAIL = "varun@voyyageinvest.in";

const capabilities = [
  {
    n: "01",
    icon: LineChart,
    title: "Quantitative Research & Models",
    blurb: "Systematic, data-driven research frameworks designed to identify opportunities and evaluate market trends.",
    items: [
      "Quantitative stock screening",
      "Momentum & relative strength models",
      "Multi-factor models",
      "Sector & industry strength analysis",
      "Market breadth & regime analysis",
      "Stock ranking & scoring frameworks",
      "Portfolio analytics & monitoring",
    ],
  },
  {
    n: "02",
    icon: FileSearch,
    title: "Fundamental & Technical Research",
    blurb:
      "In-depth company, financial and industry research to identify businesses with strong fundamentals and growth potential.",
    items: [
      "Company research & initiating coverage",
      "Quarterly earnings analysis & reports",
      "Industry & sector research reports",
      "Growth triggers & earnings inflection analysis",
      "Financial modelling & valuation",
      "Technical & price action research",
      "Competitive positioning & industry mapping",
    ],
  },
];

export function B2B() {
  return (
    <section id="b2b" data-section="light" className="bg-white py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* ------------------------------ Heading ------------------------------ */}
        <div className="text-center">
          <FadeUp>
            <div className="eyebrow-ink mb-6">Institutional Services</div>
            <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[60px] leading-[1.05] tracking-tight">
              Institutional Equity Research
            </h2>
            <p className="mt-6 font-display italic text-[22px] md:text-[26px] text-[var(--gold-ink)]">
              Research Capabilities. Institutional Partnerships.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-10 text-[17px] text-[#6B7280] max-w-[760px] mx-auto leading-[1.8]">
              We work with stockbroking firms, family offices, fund managers, AIFs, PMSs and other financial
              institutions, providing specialised quantitative and fundamental equity research to support their
              investment and research processes.
            </p>
          </FadeUp>
        </div>

        {/* ---------------------------- Capabilities ---------------------------- */}
        <div className="mt-20 md:mt-24 grid gap-6 md:grid-cols-2 text-left">
          {capabilities.map((c, i) => (
            <FadeUp key={c.title} delay={0.1 + i * 0.08} className="h-full">
              <div className="group h-full border border-t-2 border-[#E5E7EB] border-t-[var(--gold)] bg-[var(--snow)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <c.icon className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.4} aria-hidden="true" />
                  <span
                    className="font-display text-[56px] font-light leading-none text-[#E8E8E8] select-none"
                    aria-hidden="true"
                  >
                    {c.n}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[30px] md:text-[34px] font-light leading-tight text-[#1A1A1A]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-[#6B7280]">{c.blurb}</p>

                <ul className="mt-8 border-t border-[#E5E7EB]">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-b border-[#E5E7EB] py-3.5 text-[15px] text-[#1A1A1A]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ----------------------------- Speciality ----------------------------- */}
        <FadeUp>
          <div className="mt-24 md:mt-32 text-center">
            <div className="flex items-center justify-center gap-6">
              <span className="hidden sm:block h-px w-16 bg-[var(--gold)]/40" />
              <span className="eyebrow-ink">Our Research Speciality</span>
              <span className="hidden sm:block h-px w-16 bg-[var(--gold)]/40" />
            </div>
            <div className="mt-8 font-display font-light leading-[1.05] tracking-tight text-[56px] sm:text-[72px] md:text-[96px]">
              <span className="text-[#1A1A1A]">Small. Mid. </span>
              <span className="text-[var(--gold)]">Micro.</span>
            </div>
            <p className="mt-8 text-[17px] text-[#6B7280] max-w-[640px] mx-auto leading-[1.8]">
              Specialised research focused on identifying emerging opportunities across India&apos;s small-cap, mid-cap
              and micro-cap universe.
            </p>
          </div>
        </FadeUp>

        {/* -------------------------------- CTA --------------------------------- */}
        <FadeUp>
          <div className="mt-24 md:mt-32 border border-[var(--gold)]/40 bg-[var(--snow)] px-6 py-14 md:px-16 md:py-16 text-center">
            <h3 className="font-display font-light text-[32px] md:text-[44px] leading-tight text-[#1A1A1A]">
              Looking for a Research Partner?
            </h3>
            <p className="mt-5 text-[16px] text-[#6B7280] max-w-[560px] mx-auto leading-[1.8]">
              Get in touch with us to discuss your institutional research requirements and explore potential
              collaborations.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-gold mt-9">
              Contact Us <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
