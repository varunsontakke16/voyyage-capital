import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Philosophy } from "@/components/sections/philosophy";
import { Plans } from "@/components/sections/plans";
import { GetStarted } from "@/components/sections/get-started";
import { FAQ } from "@/components/sections/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voyyage, Smart money runs on data" },
      { name: "description", content: "Data-driven quantitative research for the modern Indian investor. SEBI registered." },
      { property: "og:title", content: "Voyyage, Smart money runs on data" },
      { property: "og:description", content: "Data-driven quantitative research for the modern Indian investor." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Plans />
        <GetStarted />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
