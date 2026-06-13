import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  FileText,
  User,
  GraduationCap,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  Scale,
  DollarSign,
  BriefcaseBusiness,
  Users,
  Compass,
  ChevronRight,
  MapPin,
  Check,
  Mail,
  Phone,
  Info,
  ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/disclosures")({
  head: () => ({
    meta: [
      { title: "Standard Disclosures — Voyyage" },
      { name: "description", content: "Standard disclosures of Varun Rajesh Sontakke, SEBI Registered Research Analyst. Learn about our qualifications, business activities, and conflict policies." },
      { property: "og:title", content: "Standard Disclosures — Voyyage" },
      { property: "og:description", content: "Standard disclosures of Varun Rajesh Sontakke, SEBI Registered Research Analyst." },
    ],
  }),
  component: DisclosuresPage,
});

function DisclosuresPage() {
  const sections = [
    { id: "about", label: "1. About the Research Analyst" },
    { id: "education", label: "2. Education & Qualifications" },
    { id: "business", label: "3. Details of Business Activities" },
    { id: "disciplinary", label: "4. Disciplinary History" },
    { id: "terms", label: "5. Terms & Conditions" },
    { id: "interests", label: "6. Financial Interests & Conflicts" },
    { id: "affiliation", label: "7. Affiliation & Compensation" },
    { id: "covered-comp", label: "8. Covered Companies Compensation" },
    { id: "public-offering", label: "9. Public Offering Management" },
    { id: "employment", label: "10. Employment & Market-Making" },
    { id: "advisory", label: "11. Investor Advisory" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Nav />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[var(--snow)] to-white pt-36 pb-20 border-b border-[var(--gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[var(--gold)] transition-colors mb-6 font-medium group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="eyebrow mb-4">SEBI Compliance</div>
          <h1 className="font-display font-light text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-4xl leading-tight">
            Standard Disclosures
          </h1>
          <p className="mt-4 text-md text-gray-500 max-w-2xl font-sans">
            Regulatory disclosures in accordance with the SEBI (Research Analysts) Regulations, 2014.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sticky Table of Contents Sidebar (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 self-start bg-white p-6 rounded-lg border border-[var(--gold)]/10 shadow-sm">
              <h3 className="font-display text-lg text-[var(--navy)] font-medium mb-4 pb-2 border-b border-[var(--gold)]/10">
                Sections
              </h3>
              <ul className="space-y-3">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="group flex items-center gap-2 text-xs text-gray-600 hover:text-[var(--gold)] transition-colors font-medium"
                    >
                      <ChevronRight size={12} className="text-gray-400 group-hover:text-[var(--gold)] transition-transform group-hover:translate-x-0.5 shrink-0" />
                      <span className="truncate">{sec.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content Areas */}
          <div className="lg:col-span-3 space-y-20">
            
            {/* 1. About the Research Analyst */}
            <section id="about" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  1. About the Research Analyst
                </h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-[var(--navy)] flex items-center gap-2">
                      <User className="text-[var(--gold)]" size={20} />
                      Varun Rajesh Sontakke
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                      Registered with SEBI as an Individual Research Analyst vide Registration Number{" "}
                      <strong>INH000026053</strong> on <strong>13th April 2026</strong>, pursuant to which he provides Research Analyst services to clients.
                    </p>
                  </div>
                  
                  <div className="bg-[var(--snow)] p-4 rounded-lg border border-[var(--gold)]/20 shrink-0 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">SEBI Registration</span>
                    <p className="text-sm font-mono font-bold text-[var(--navy)] mt-1">INH000026053</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Granted: 13-Apr-2026</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-6 items-start text-xs text-gray-600">
                  <div className="flex gap-2 items-start">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-medium">Registered Office Address</strong>
                      F-201, Konark Indrayu Enclave - 2,<br />
                      NIBM Undri Road, Kondhwa, Pune – 411048
                    </div>
                  </div>
                  <div className="flex gap-2 items-start md:border-l md:border-gray-100 md:pl-6">
                    <Mail size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-medium">Email</strong>
                      varunsontakke18@gmail.com
                    </div>
                  </div>
                  <div className="flex gap-2 items-start md:border-l md:border-gray-100 md:pl-6">
                    <Phone size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-medium">Contact</strong>
                      +91 9552609280
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Education and Qualifications */}
            <section id="education" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  2. Education and Qualifications
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mr. Varun Rajesh Sontakke meets all standard educational and certification qualifications required by SEBI to offer quantitative and data-driven equity research:
                </p>

                {/* Badges Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-[var(--gold)]/20 p-4 rounded-lg bg-[var(--snow)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-3">
                      <GraduationCap size={16} />
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--navy)]">MBA (Finance)</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Master&apos;s Degree in Business Administration</p>
                  </div>
                  
                  <div className="border border-[var(--gold)]/20 p-4 rounded-lg bg-[var(--snow)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--navy)]/10 text-[var(--navy)] flex items-center justify-center mb-3">
                      <ShieldCheck size={16} />
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--navy)]">NISM XV Certified</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Research Analyst Certification</p>
                  </div>

                  <div className="border border-[var(--gold)]/20 p-4 rounded-lg bg-[var(--snow)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-3">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--navy)]">CFA Level I Cleared</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Chartered Financial Analyst</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--navy)]">Investment Framework</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Possesses a strong analytical and data-driven approach to investing, with expertise in identifying investment opportunities and designing structured portfolio strategies. His investment framework integrates:
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Fundamental Analysis", "Technical Analysis", "Behavioral Analysis"].map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Details of Business Activities */}
            <section id="business" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  3. Details of Business Activities
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mr. Varun Rajesh Sontakke provides investment recommendations based on thorough Quantitative, Fundamental, Technical, and Behavioral Analysis.
                </p>

                <div className="bg-[var(--snow)] p-6 rounded-lg border border-gray-100">
                  <h4 className="text-xs font-semibold text-[var(--navy)] uppercase tracking-wider mb-3">Dissemination Channels</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Research calls and reports may be shared through platforms such as Telegram, WhatsApp, and Instagram for free subscribers, if any.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Subscribers who wish to access paid premium services may do so by subscribing and paying the applicable subscription fees.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Disciplinary History */}
            <section id="disciplinary" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  4. Disciplinary History
                </h2>
              </div>

              <div className="bg-emerald-50/30 border border-emerald-500/20 p-6 rounded-lg flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900">Clean Regulatory Record</h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    There are <strong>no outstanding litigations</strong> or <strong>disciplinary actions</strong> against Varun Rajesh Sontakke.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Terms and Conditions */}
            <section id="terms" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  5. Terms and Conditions Under Which Research Reports Are Issued
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-4 text-xs text-gray-600 leading-relaxed">
                <p>
                  Varun Rajesh Sontakke has exercised due diligence in verifying the correctness and authenticity of the information contained herein, insofar as it relates to current and historical information.
                </p>
                
                <ul className="space-y-3 list-disc pl-5 text-gray-500">
                  <li>No guarantee is provided regarding the accuracy or completeness of the information.</li>
                  <li>Opinions expressed are based on research available as of the publication date and may change without prior notice.</li>
                  <li>Varun Rajesh Sontakke does not accept any liability arising from the use of research documents or the information contained therein.</li>
                  <li>Recipients of reports should exercise their own independent judgment and seek professional advice before acting on any information.</li>
                  <li>Varun Rajesh Sontakke shall not be responsible for any loss or damage arising from inadvertent errors in the information provided or views/opinions expressed in the publication.</li>
                </ul>
              </div>
            </section>

            {/* 6. Financial Interests and Conflict of Interest Disclosures */}
            <section id="interests" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  6. Financial Interests and Conflict of Interest Disclosures
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  To ensure complete transparency and objectivity, Varun Rajesh Sontakke explicitly discloses that he and/or associates, including relatives:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Do NOT hold any financial interest in the company covered.",
                    "Do NOT have actual/beneficial ownership exceeding 1% in the company.",
                    "Do NOT have any other material conflict of interest."
                  ].map((disc, idx) => (
                    <div key={idx} className="bg-[var(--snow)] border border-gray-100 p-4 rounded-lg flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-[var(--gold)]/15 text-[var(--navy)] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs text-gray-700 leading-relaxed">{disc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Affiliation and Compensation Disclosure */}
            <section id="affiliation" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  7. Affiliation and Compensation Disclosure
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Varun Rajesh Sontakke operates as an independent research analyst to maintain unbiased recommendations:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-100 p-5 rounded-lg space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
                      <Users size={14} className="text-[var(--gold)]" />
                      Affiliation
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Varun Rajesh Sontakke and/or associates are <strong>not affiliated</strong> with any other intermediaries.
                    </p>
                  </div>

                  <div className="border border-gray-100 p-5 rounded-lg space-y-2">
                    <h4 className="text-xs font-semibold text-[var(--navy)] flex items-center gap-2">
                      <DollarSign size={14} className="text-[var(--gold)]" />
                      Third-Party Compensation
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Varun Rajesh Sontakke and/or associates have <strong>not received any brokerage or commission</strong> from any third party.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Compensation from Covered Companies */}
            <section id="covered-comp" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  8. Compensation from Covered Companies
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--navy)]/10 text-[var(--navy)] flex items-center justify-center shrink-0">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--navy)]">Twelve-Month Compensation Disclosure</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Varun Rajesh Sontakke and/or associates have <strong>not received any compensation</strong> from the company covered by the Research Analyst during the preceding twelve months.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Public Offering Management Disclosure */}
            <section id="public-offering" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  9. Public Offering Management Disclosure
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--navy)]/10 text-[var(--navy)] flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--navy)]">Public Issue Underwriting & Management</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Varun Rajesh Sontakke and/or associates have <strong>not managed or co-managed any public offering of securities</strong> of the company during the preceding twelve months.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Employment and Market-Making Disclosure */}
            <section id="employment" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  10. Employment and Market-Making Disclosure
                </h2>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Relationships and trading activities concerning covered companies are strictly regulated to avoid conflicts of interest:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[var(--snow)] p-5 rounded-lg border border-gray-100 space-y-1">
                    <h4 className="text-xs font-semibold text-[var(--navy)]">Employment Status</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Varun Rajesh Sontakke and/or associates have <strong>not served as an officer, director, or employee</strong> of the company.
                    </p>
                  </div>
                  
                  <div className="bg-[var(--snow)] p-5 rounded-lg border border-gray-100 space-y-1">
                    <h4 className="text-xs font-semibold text-[var(--navy)]">Market-Making Activities</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Varun Rajesh Sontakke and/or associates have <strong>not engaged in any market-making activities</strong> related to the company.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. Investor Advisory */}
            <section id="advisory" className="scroll-mt-28 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-semibold">
                  11. Investor Advisory
                </h2>
              </div>

              <div className="bg-amber-50/50 border border-amber-200 p-8 rounded-lg space-y-4">
                <div className="flex gap-3 items-center text-amber-900 pb-2 border-b border-amber-200">
                  <Compass className="text-amber-600 shrink-0" size={24} />
                  <h3 className="font-display text-xl font-medium">Important Advisory Notice</h3>
                </div>
                
                <p className="text-xs text-amber-950 leading-relaxed">
                  Varun Rajesh Sontakke has ensured that the facts mentioned in the research report are derived from sources considered reliable.
                </p>
                
                <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                  However, investors are strongly advised to:
                </p>

                <ul className="space-y-2 text-xs text-amber-950 leading-relaxed list-disc pl-5">
                  <li>Independently evaluate market conditions.</li>
                  <li>Carefully assess associated risks.</li>
                  <li>Conduct their own due diligence before making any investment decision.</li>
                </ul>

                <p className="text-xs text-amber-900 leading-relaxed italic pt-2 border-t border-amber-200">
                  Investment decisions should be based on an investor&apos;s own analysis, financial situation, investment objectives, and risk tolerance.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
