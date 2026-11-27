import { FadeUp } from "../motion-primitives";

/**
 * Portraits for the right-hand column. `label` is the vertical name set beside
 * each photo (as in the reference style); `name` and `role` form the caption.
 */
const people = [
  { src: "/team/person-1.webp", alt: "Mr. Rajesh, Mentor", label: "Mr. Rajesh", name: "Mr. Rajesh", role: "Mentor" },
  { src: "/team/person-2.webp", alt: "Mr. Varun, CIO", label: "Mr. Varun", name: "Mr. Varun", role: "CIO" },
];

const stats = [
  { value: "1%", label: "Max loss per position" },
  { value: "Monthly", label: "Full-universe scan" },
  { value: "25 yrs", label: "In Indian markets" },
];

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <span className="h-px w-10 bg-[var(--gold)]" aria-hidden="true" />
      <h3 className="eyebrow-ink">{children}</h3>
    </div>
  );
}

function Portrait({ src, alt, label, name, role }: { src: string; alt: string; label: string; name: string; role: string }) {
  return (
    <div className="relative">
      {label ? (
        <span
          aria-hidden="true"
          className="absolute left-2 top-2 hidden select-none font-sans text-[26px] font-light uppercase tracking-[0.4em] text-[#1A1A1A]/20 [writing-mode:vertical-rl] rotate-180 lg:block"
        >
          {label}
        </span>
      ) : null}
      <div className="relative mx-auto w-[90%] max-w-[452px]">
        {/* Golden halo: a many-stop radial falloff that reaches fully transparent
            well inside its box, so there is no visible edge or arc. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[22%] -top-[4%] bottom-[6%]"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(201,169,110,0.60) 0%, rgba(201,169,110,0.48) 14%, rgba(201,169,110,0.34) 30%, rgba(201,169,110,0.20) 46%, rgba(201,169,110,0.10) 60%, rgba(201,169,110,0.04) 74%, rgba(201,169,110,0.01) 88%, rgba(201,169,110,0) 100%)",
          }}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="relative block h-auto w-full [mask-image:linear-gradient(to_bottom,black_58%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_58%,transparent_100%)]"
        />
        {/* Citation: role sits clear of the photo's faded edge. The name is shown
            here only on small screens, where the vertical name is hidden. */}
        <div className="relative mt-5 text-center md:mt-6">
          <div className="font-display text-[34px] font-light leading-none tracking-tight text-[#1A1A1A] lg:hidden">
            {name}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 lg:mt-0">
            <span className="h-px w-8 bg-[var(--gold)]" aria-hidden="true" />
            <span className="eyebrow-ink">{role}</span>
            <span className="h-px w-8 bg-[var(--gold)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" data-section="light" className="overflow-x-clip bg-[var(--snow)] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
          {/* ------------------------------ Write-up ------------------------------ */}
          <div>
            <FadeUp>
              <div className="eyebrow-ink mb-6">Who We Are</div>
              <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[60px] leading-[1.05] tracking-tight">
                Investing, run like a<br className="hidden md:block" /> professional desk.
              </h2>
            </FadeUp>

            <div className="mt-12 space-y-7 text-[17px] text-[#4B5563] leading-[1.85]">
              <FadeUp>
                <p className="font-display text-[26px] md:text-[30px] leading-[1.3] text-[#1A1A1A]">
                  Professional investors don&apos;t pick stocks on tips, headlines or hunches.
                </p>
              </FadeUp>
              <FadeUp>
                <p>
                  They have data teams that scan thousands of numbers, quant models that rank every opportunity, and
                  risk desks that decide how much to put in each stock before a single rupee is invested. For decades,
                  that edge belonged to institutions. Most retail investors have been left with stories and guesswork.
                </p>
              </FadeUp>
              <FadeUp>
                <p>
                  <strong className="font-semibold text-[#1A1A1A]">Voyyage exists to close that gap.</strong> We bring
                  data-driven, rules-based investing to individual investors through model portfolios built the way
                  professional desks build theirs.
                </p>
              </FadeUp>

              <FadeUp>
                <SubHead>The model</SubHead>
              </FadeUp>
              <FadeUp>
                <p>
                  Every month, our model scans listed companies across price, volume, earnings growth, margins, market
                  share and relative strength. It tracks which sectors have many stocks making new highs together,
                  which is often where large investors are putting money. Every stock is scored.
                </p>
              </FadeUp>
              <FadeUp>
                <p className="border-l-2 border-[var(--gold)] pl-6 font-display text-[22px] md:text-[24px] italic leading-[1.4] text-[var(--navy)]">
                  Only companies that lead their segment, grow faster than their peers and are already in a confirmed
                  uptrend make it into the portfolio.
                </p>
              </FadeUp>

              <FadeUp>
                <SubHead>Risk, managed</SubHead>
              </FadeUp>
              <FadeUp>
                <p>
                  Then we manage risk the way institutions do. Each position is sized so that a wrong call costs no more
                  than <strong className="font-semibold text-[#1A1A1A]">1% of the portfolio</strong>. Holdings are
                  re-scored on a fixed schedule. When a stock weakens, the model replaces it and moves the capital to a
                  stronger opportunity, with no emotion and no delay.
                </p>
              </FadeUp>

              <FadeUp>
                <SubHead>The result</SubHead>
              </FadeUp>
              <FadeUp>
                <p>
                  The result is a complete strategy. It tells you{" "}
                  <strong className="font-semibold text-[#1A1A1A]">what to own</strong>,{" "}
                  <strong className="font-semibold text-[#1A1A1A]">how much to own</strong> and{" "}
                  <strong className="font-semibold text-[#1A1A1A]">when to exit</strong>, so you can invest with the
                  same discipline as the professionals.
                </p>
              </FadeUp>

              <FadeUp>
                <div className="grid grid-cols-1 gap-px bg-[var(--border)] sm:grid-cols-3">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-[var(--snow)] px-0 py-6 sm:px-6 sm:py-7 sm:first:pl-0">
                      <div className="font-display text-[var(--gold)] text-[40px] leading-tight font-light">
                        {s.value}
                      </div>
                      <div className="mt-2 text-[12px] uppercase tracking-[0.08em] text-[#6B7280]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp>
                <p>
                  Behind the model are <strong className="font-semibold text-[#1A1A1A]">25 years of investing in Indian markets</strong>.
                  That experience shaped what we measure. The data decides when we act.
                </p>
              </FadeUp>
              <FadeUp>
                <p>
                  Indian investors deserve better than stories. They deserve research that treats their money with the
                  rigour of a professional quantitative desk, where every allocation, every entry and every exit is
                  governed by rules and data, and nothing else.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* ------------------------------ Portraits ----------------------------- */}
          <div className="space-y-12 lg:space-y-24 lg:pt-4">
            {people.map((p, i) => (
              <FadeUp key={p.src} delay={i * 0.12}>
                <Portrait {...p} />
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp>
          <blockquote className="mx-auto mt-24 max-w-3xl border-t border-[var(--gold)]/40 pt-12 text-center font-display italic text-[28px] md:text-[34px] leading-snug text-[var(--navy)] md:mt-32">
            &ldquo;We are here to build a process that aims to beat the market over full cycles.&rdquo;
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
