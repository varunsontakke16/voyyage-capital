import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  FileText,
  Shield,
  AlertTriangle,
  Scale,
  Settings,
  Link2,
  Trash2,
  Lock,
  Cookie,
  User,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  EyeOff,
  Briefcase,
  ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions, Voyyage" },
      { name: "description", content: "Terms of Service and Privacy Policy for Voyyage Capital. Learn about our website usage license, regulatory disclaimers, and cookies policy." },
      { property: "og:title", content: "Terms and Conditions, Voyyage" },
      { property: "og:description", content: "Terms of Service and Privacy Policy for Voyyage Capital." },
    ],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  const sections = [
    { id: "terms-intro", label: "1. Terms of Access" },
    { id: "license", label: "2. Use License" },
    { id: "disclaimers", label: "3. Disclaimers & Disclosures" },
    { id: "limitations", label: "4. Liability Limitations" },
    { id: "revisions", label: "5. Revisions & Errata" },
    { id: "links", label: "6. Links & Third Parties" },
    { id: "modifications", label: "7. Terms Modifications" },
    { id: "removal", label: "8. Removal of Links" },
    { id: "reservation", label: "9. Reservation of Rights" },
    { id: "governing-law", label: "10. Governing Law" },
    { id: "privacy", label: "Privacy Policy", groupHeader: true },
    { id: "privacy-general", label: "• General Privacy" },
    { id: "privacy-protection", label: "• Info Protection" },
    { id: "privacy-cookies", label: "• Cookies Policy" },
    { id: "privacy-changes", label: "• Policy Changes" },
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
          <div className="eyebrow mb-4">Legal Agreements</div>
          <h1 className="font-display font-light text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-4xl leading-tight">
            Terms & Privacy
          </h1>
          <p className="mt-4 text-md text-gray-500 max-w-2xl font-sans">
            Please read these Terms & Conditions and Privacy Policy carefully before using the Voyyage Capital website.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sticky Table of Contents Sidebar (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 self-start bg-white p-6 rounded-lg border border-[var(--gold)]/10 shadow-sm max-h-[75vh] overflow-y-auto">
              <h3 className="font-display text-lg text-[var(--navy)] font-medium mb-4 pb-2 border-b border-[var(--gold)]/10">
                Navigation
              </h3>
              <ul className="space-y-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    {sec.groupHeader ? (
                      <div className="text-xs font-semibold text-[var(--navy)] uppercase tracking-wider mt-4 mb-2">
                        {sec.label}
                      </div>
                    ) : (
                      <a
                        href={`#${sec.id}`}
                        className="group flex items-center gap-1.5 text-xs text-gray-600 hover:text-[var(--gold)] transition-colors font-medium"
                      >
                        <ChevronRight size={10} className="text-gray-400 group-hover:text-[var(--gold)] shrink-0" />
                        <span className="truncate">{sec.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content Areas */}
          <div className="lg:col-span-3 space-y-20">
            
            {/* Terms and Conditions Section */}
            <div className="space-y-16">
              
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-bold">
                  Terms and Conditions
                </h2>
                <p className="text-xs text-gray-400 mt-1">These terms outline the rules and regulations for the use of this website.</p>
              </div>

              {/* 1. Terms */}
              <section id="terms-intro" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <FileText size={18} className="text-[var(--gold)]" />
                  1. Terms
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  By accessing this website you are agreeing to be bound by these terms and conditions. Do not continue to use if you do not agree to take all of the terms and conditions stated on this page.
                </p>
              </section>

              {/* 2. Use License */}
              <section id="license" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Shield size={18} className="text-[var(--gold)]" />
                  2. Use License
                </h3>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials (information) on Varun Rajesh Sontakke&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  
                  <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-gray-500 list-none pl-1 mt-3">
                    {[
                      "Modify or copy the materials.",
                      "Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).",
                      "Attempt to decompile or reverse engineer any software contained on the website.",
                      "Remove any copyright or other proprietary notations from the materials.",
                      "Transfer the materials to another person or 'mirror' the materials on any other server."
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="font-mono text-[var(--gold)] font-bold">i{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 3. Disclaimers and Disclosures */}
              <section id="disclaimers" className="scroll-mt-28 space-y-6">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[var(--gold)]" />
                  3. Disclaimers and Disclosures
                </h3>
                
                <div className="bg-amber-50/50 border border-amber-200 p-6 sm:p-8 rounded-lg space-y-6">
                  <div className="border-b border-amber-200 pb-3 flex items-center gap-2 text-amber-900 font-display text-xl font-medium">
                    <AlertTriangle className="text-amber-600" size={20} />
                    <span>Important Financial Disclaimers</span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6 text-xs text-amber-950 leading-relaxed">
                    
                    <div className="space-y-3">
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>Market Risk:</strong> Investment in securities market is subject to market risks. Read all the related documents carefully before investing. Market Risks refer to partial or permanent loss on your investments in certain market conditions.
                        </p>
                      </div>
                      
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>No Guarantee:</strong> Registration granted by SEBI and certification from NISM in no way guarantees the performance of the intermediary or provide any assurance of returns to investors. We do not promise any guaranteed returns.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2 items-start">
                        <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>Subscription Policy:</strong> The fees paid towards the subscription is non-refundable. Risk management and position sizing should be carried out by the investor himself.
                        </p>
                      </div>

                      <div className="flex gap-2 items-start">
                        <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>RA Registration:</strong> Varun Rajesh Sontakke is a SEBI registered &apos;Research Analyst&apos; not &apos;Investment advisor&apos;. Registered as an RA vide registration number <strong>INH000026053</strong> on <strong>13th April 2026</strong>. Recommendations are provided via Telegram or WhatsApp.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* 4. Limitations */}
              <section id="limitations" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Scale size={18} className="text-[var(--gold)]" />
                  4. Limitations
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  In no event shall Varun Rajesh Sontakke or its suppliers be liable for any damages (including, without limitation, damages for loss of profit, monetary and/or non monetary) arising out of the use or inability to use the materials communicated by Varun Rajesh Sontakke and its Employees.
                </p>
              </section>

              {/* 5. Revisions and Errata */}
              <section id="revisions" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <RefreshCw size={18} className="text-[var(--gold)]" />
                  5. Revisions and Errata
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The materials appearing on Varun Rajesh Sontakke website could include technical, typographical, or photographic errors. Varun Rajesh Sontakke does not warrant that any of the materials on its website are accurate, complete, or current. Varun Rajesh Sontakke may make changes to the materials contained on its website at any time without notice. Varun Rajesh Sontakke does not, however, make any commitment to update the materials.
                </p>
              </section>

              {/* 6. Links */}
              <section id="links" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Link2 size={18} className="text-[var(--gold)]" />
                  6. Links
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Varun Rajesh Sontakke has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Varun Rajesh Sontakke of the site. Use of any such linked website is at the user&apos;s own risk.
                </p>
              </section>

              {/* 7. Site Terms of Use Modifications */}
              <section id="modifications" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Settings size={18} className="text-[var(--gold)]" />
                  7. Site Terms of Use Modifications
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Varun Rajesh Sontakke may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Use.
                </p>
              </section>

              {/* 8. Removal of Links */}
              <section id="removal" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Trash2 size={18} className="text-[var(--gold)]" />
                  8. Removal of Links from Our Website
                </h3>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    If you find any link on our website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                  </p>
                </div>
              </section>

              {/* 9. Reservation of Rights */}
              <section id="reservation" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Lock size={18} className="text-[var(--gold)]" />
                  9. Reservation of Rights
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                </p>
              </section>

              {/* 10. Governing Law */}
              <section id="governing-law" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Briefcase size={18} className="text-[var(--gold)]" />
                  10. Governing Law
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Any claim relating to Varun Rajesh Sontakke&apos;s website shall be governed by the Indian laws, without regard to its conflict of law provisions.
                </p>
              </section>

            </div>

            {/* Privacy Policy Section */}
            <div id="privacy" className="space-y-16 pt-10 border-t border-gray-200">
              
              <div className="pb-4">
                <h2 className="font-display text-3xl text-[var(--navy)] font-bold">
                  Privacy Policy
                </h2>
                <p className="text-xs text-gray-400 mt-1">Your privacy is very important to us. Learn about our personal information policies.</p>
              </div>

              {/* General Privacy */}
              <section id="privacy-general" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <User size={18} className="text-[var(--gold)]" />
                  General Privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Like most websites, Varun Rajesh Sontakke collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Varun Rajesh Sontakke also collects potentially personally-identifying information like Internet Protocol (IP) addresses for security reasons.
                </p>
              </section>

              {/* Protection of Certain Info */}
              <section id="privacy-protection" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <EyeOff size={18} className="text-[var(--gold)]" />
                  Protection of Personally-Identifying Information
                </h3>
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Varun Rajesh Sontakke discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that need to know that information in order to process it on Varun Rajesh Sontakke&apos;s behalf or to provide services available at Varun Rajesh Sontakke&apos;s websites, and that have agreed not to disclose it to others. Varun Rajesh Sontakke will not rent or sell potentially personally-identifying and personally-identifying information to anyone.
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    If you are a registered user and have supplied your email address, we may occasionally send you email, WhatsApp, or Telegram messages to tell you about new features, solicit feedback, or keep you up to date. We take all measures reasonably necessary to protect against unauthorized access, use, alteration, or destruction of this info.
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section id="privacy-cookies" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <Cookie size={18} className="text-[var(--gold)]" />
                  Cookies Policy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A cookie is a string of information that a website stores on a visitor&apos;s computer, and that the visitor&apos;s browser provides to the website each time the visitor returns. Varun Rajesh Sontakke uses cookies to help identify and track visitors, their usage of the website, and their website access preferences. Visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using the website, with the drawback that certain features may not function properly without the aid of cookies.
                </p>
              </section>

              {/* Privacy Policy Changes */}
              <section id="privacy-changes" className="scroll-mt-28 space-y-4">
                <h3 className="text-lg font-semibold text-[var(--navy)] flex items-center gap-2">
                  <RefreshCw size={18} className="text-[var(--gold)]" />
                  Privacy Policy Changes
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Although most changes are likely to be minor, Varun Rajesh Sontakke may change its Privacy Policy from time to time in his sole discretion. Varun Rajesh Sontakke encourages visitors to frequently check this page for any changes. Your continued use of this site after any change will constitute your acceptance of such change.
                </p>
              </section>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
