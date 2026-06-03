import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '../components/nav'
import { Footer } from '../components/footer'

export const Route = createFileRoute('/grievances')({
  component: Grievances,
})

function Grievances() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Nav />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h1 className="font-display text-4xl md:text-5xl mb-12 text-[#1A1A1A]">Redressal of Grievance</h1>
          
          <div className="prose prose-slate max-w-none space-y-8 text-[#1A1A1A]">
            <p className="text-lg">Here are the steps as a client you can follow in case of a grievance or feedback:</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Contact Your Assigned Representative</h2>
              <p>If you are not satisfied with our services and would like to lodge a complaint, we request that you first contact the representative or consultant from the Research Analyst Department who is your designated point of contact.</p>
              <p>You may discuss your concerns with them, and we will make our best efforts to resolve the complaint within <strong>1 to 7 working days</strong>.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Contact via Telephone</h2>
              <p>You may also communicate your grievance by calling:</p>
              <p><strong>Phone:</strong> +91 9552609280</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Submit a Complaint via Email or Written Communication</h2>
              <p>Alternatively, you may send your complaint in writing or via email:</p>
              <p><strong>Email:</strong> varunsontakke18@gmail.com</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Complaint Resolution Process</h2>
              <p>We will endeavor to resolve your complaint within <strong>1 to 7 working days</strong>.</p>
              <p>The first step is to understand the nature of your complaint and identify appropriate actions to address the issue. Once our investigation is complete, we will contact you with a detailed response regarding the outcome of your complaint.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Escalation to Varun Rajesh Sontakke</h2>
              <p>If you are not satisfied with the response or handling of your complaint by our representative or consultant, you may escalate the matter by emailing:</p>
              <p>
                <strong>Varun Rajesh Sontakke</strong><br />
                <strong>Email:</strong> varunsontakke18@gmail.com
              </p>
              <p>Please provide complete details of your complaint. Varun Rajesh Sontakke will review the matter, contact you at the earliest opportunity, and make every effort to resolve your grievance as soon as possible.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Escalation to SEBI</h2>
              <p>If your complaint remains unresolved for a period of <strong>one month</strong>, you may refer the matter to the regulator:</p>
              <h3 className="text-xl font-medium mt-4">Securities and Exchange Board of India (SEBI)</h3>
              <p>SEBI has launched a centralized web-based complaints redressal system called <strong>SCORES</strong>.</p>
              <p>
                <strong>SCORES Portal:</strong><br />
                <a href="https://scores.gov.in/scores/complaintRegister.html#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://scores.gov.in/scores/complaintRegister.html#
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Online Dispute Resolution (ODR)</h2>
              <p>If your complaint is not resolved through the SCORES portal, you may initiate the dispute resolution process through the <strong>ODR Portal</strong>.</p>
              <p>
                <strong>ODR Portal:</strong><br />
                <a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://smartodr.in/login
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
