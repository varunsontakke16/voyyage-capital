import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { FadeUp } from "../motion-primitives";

const dummyPortfolios = [
  { 
    name: "EXPLORER", 
    price: "Free", 
    billed: "",
    features: [
      { text: "3 Research reports", active: true },
      { text: "The Voyyage Vector Model", active: false },
      { text: "Rebalancing updates", active: false },
      { text: "Industry research reports", active: false },
      { text: "Sectoral updates", active: false },
      { text: "Access to whatsapp community", active: false },
    ],
    popular: false,
    buttonStyle: "outline"
  },
  { 
    name: "NAVIGATOR", 
    price: "₹12,000", 
    billed: "Billed annually",
    features: [
      { text: "The Voyyage Vector Model", active: true },
      { text: "Rebalancing updates", active: true },
      { text: "Industry research reports", active: false },
      { text: "Sectoral updates", active: false },
      { text: "Access to whatsapp community", active: false },
    ],
    popular: true,
    buttonStyle: "filled"
  },
  { 
    name: "VOYAGER", 
    price: "₹15,000", 
    billed: "Billed annually",
    features: [
      { text: "The Voyyage Vector Model", active: true },
      { text: "Rebalancing updates", active: true },
      { text: "Industry research reports", active: true },
      { text: "Sectoral updates", active: true },
      { text: "Access to whatsapp community", active: true },
    ],
    popular: false,
    buttonStyle: "outline"
  },
];

export function Plans() {
  return (
    <section id="plans" data-section="light" className="bg-white py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto relative rounded-[32px] overflow-hidden">
        
        {/* Blurred Background Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 blur-md select-none pointer-events-none p-4 md:p-8 opacity-90 pt-8">
          {dummyPortfolios.map((portfolio, idx) => (
            <div key={idx} className={`relative bg-white border ${portfolio.popular ? 'border-[#C19D68] shadow-lg' : 'border-gray-200'} p-8 flex flex-col min-h-[540px] rounded-[4px] ${idx > 0 ? 'hidden md:flex' : 'flex'}`}>
              {portfolio.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C19D68] text-white text-[11px] font-bold px-4 py-1.5 tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <div className="text-[13px] font-medium text-[#C19D68] mb-4 tracking-widest uppercase">{portfolio.name}</div>
                <h3 className="text-[44px] font-display text-gray-900 mb-2">{portfolio.price}</h3>
                <div className="text-[13px] text-gray-500 h-5">{portfolio.billed}</div>
              </div>
              
              <div className="border-t border-gray-100 mb-8"></div>

              <div className="flex-1 space-y-4 mb-10">
                {portfolio.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {feature.active ? (
                      <CheckCircle2 size={18} className="text-[#C19D68] flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                      <Circle size={18} className="text-gray-200 flex-shrink-0" strokeWidth={1.5} />
                    )}
                    <span className={`text-[14px] ${feature.active ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                {portfolio.buttonStyle === "filled" ? (
                  <div className="w-full bg-[#C19D68] text-white font-bold py-3.5 px-4 flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-[4px]">
                    Get Started <ArrowRight size={16} />
                  </div>
                ) : (
                  <div className="w-full bg-white border border-gray-300 text-gray-900 font-bold py-3.5 px-4 flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-[4px]">
                    Get Started <ArrowRight size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 bg-white/40">
          <FadeUp>
            <div className="eyebrow mb-6">Model Portfolios</div>
            <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[56px] leading-[1.05] tracking-tight">
              Coming Soon
            </h2>
            <p className="mt-6 text-[17px] text-[#6B7280] leading-[1.8] max-w-2xl mx-auto font-medium bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50">
              Our data-driven model portfolios are currently under development. Get in touch with us to learn more or join the waitlist.
            </p>
            
            <div className="mt-12">
              <a href="mailto:hello@voyyage.in" className="btn-gold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                Contact Voyyage <ArrowRight size={16} />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
