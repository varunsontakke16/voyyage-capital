import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "../motion-primitives";

const faqs = [
  {
    q: "What is your quantitative strategy, and how is it different from stock tips?",
    a: "A stock tip tells you what to buy. Our strategy tells you what to buy, how much to invest in each stock, and how to manage it over time. It is a complete, ready-to-follow investment plan built on research and data, not a one-line message with no context. With Voyyage, you do not just get a stock name. You get a strategy.",
  },
  {
    q: "How do your research strategies work?",
    a: "We maintain research strategies built on the Voyyage Vector Framework. Each stock is scored on trend, catalyst, and entry point before being recommended. We also rebalance regularly based on live data, so the strategy always reflects the strongest opportunities available at any given time.",
  },
  {
    q: "How do I know how much to invest in each stock?",
    a: "Every stock in our strategy comes with a clearly defined weightage. To make it even simpler, our investment calculator does the math for you. Just enter your total capital and it instantly tells you exactly how much goes into each stock.",
  },
  {
    q: "How often are the strategies updated?",
    a: "Strategies are reviewed and rebalanced every quarter as a baseline. But markets do not wait for quarters, and neither do we. When conditions change, you will receive monthly updates and real-time alerts so your investments always stay aligned with where the data is pointing.",
  },
  {
    q: "Can I use your research with my existing broker or app?",
    a: "Yes, completely. You do not need to switch anything. We give you the stock names, buy zones, and weightages. You simply place the orders on whichever platform you already use, whether that is Zerodha, Groww, Angel One, or anything else. We do the research. You stay in control.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-section="light" className="bg-[#F8F9FA] py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <FadeUp>
            <div className="eyebrow mb-6">Questions</div>
            <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[56px] leading-[1.05] tracking-tight">
              Things investors ask us.
            </h2>
          </FadeUp>
        </div>

        <div className="border-t border-[#E5E7EB]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={i} delay={i * 0.04}>
                <div className="border-b border-[#E5E7EB]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full py-7 flex items-center justify-between gap-6 text-left"
                  >
                    <span className="font-medium text-[16px] md:text-[17px] text-[#1A1A1A]">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[24px] text-[var(--gold)] font-light flex-shrink-0 leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-12 text-[15px] text-[#6B7280] leading-[1.8]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
