import { ArrowRight } from "lucide-react";
import { FadeUp } from "../motion-primitives";

export function Plans() {
  return (
    <section id="plans" data-section="light" className="bg-white py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <div className="eyebrow mb-6">Model Portfolios</div>
          <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[56px] leading-[1.05] tracking-tight">
            Coming Soon
          </h2>
          <p className="mt-6 text-[17px] text-[#6B7280] leading-[1.8] max-w-2xl mx-auto">
            Our data-driven model portfolios are currently under development. Get in touch with us to learn more or join the waitlist.
          </p>
          
          <div className="mt-12">
            <a href="mailto:hello@voyyage.in" className="btn-gold inline-flex items-center gap-2">
              Contact Voyyage <ArrowRight size={16} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
