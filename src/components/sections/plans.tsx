import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { FadeUp } from "../motion-primitives";

const portfolios = [
  { 
    name: "BEGINNER", 
    price: "Free", 
    billed: "",
    features: [
      { text: "3 Research reports for free", active: true },
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
    name: "VOYYAGER", 
    price: "₹15,000", 
    billed: "Billed annually",
    features: [
      { text: "The Voyyage Vector Model", active: true },
      { text: "Rebalancing updates", active: true },
      { text: "Industry research reports", active: true },
      { text: "Sectoral updates", active: true },
      { text: "Access to whatsapp community", active: true },
    ],
    popular: true,
    buttonStyle: "filled"
  },
];

export function Plans() {
  return (
    <section id="plans" data-section="light" className="bg-white py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-5xl mx-auto relative rounded-[32px] overflow-hidden">
        
        <FadeUp>
          <div className="text-center mb-16">
            <div className="eyebrow mb-6">Pricing Plans</div>
            <h2 className="font-display font-light text-[#1A1A1A] text-[44px] md:text-[56px] leading-[1.05] tracking-tight">
              Choose your plan
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-4 md:p-8 pt-8">
          {portfolios.map((portfolio, idx) => (
            <FadeUp key={idx}>
              <div className={`relative bg-white border ${portfolio.popular ? 'border-[#C19D68] shadow-lg' : 'border-gray-200'} p-8 flex flex-col min-h-[540px] rounded-[4px] h-full`}>
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
                    <a
                      href="https://insightpier.com/analyst/varunsontakke/subscription/The%20Voyyage%20Vector%20Model"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#C19D68] hover:bg-[#a8885a] transition-colors text-white font-bold py-3.5 px-4 flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-[4px]"
                    >
                      Get Started <ArrowRight size={16} />
                    </a>
                  ) : (
                    <a
                      href="mailto:support@voyyageinvest.com?subject=Free%20Research%20Reports%20Enquiry"
                      className="w-full bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-900 font-bold py-3.5 px-4 flex items-center justify-center gap-2 text-[13px] uppercase tracking-wider rounded-[4px]"
                    >
                      Get Started <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
