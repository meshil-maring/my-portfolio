import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { DiscussProject } from "@/components/sections/DiscussProject";
import { Contact } from "@/components/sections/Contact";

// Process sits at the bottom of a long page — dynamic() keeps its client
// children (ProcessStepCurve's canvas text measuring, the animated pen icon)
// out of the initial hydration chunk so the hero paints sooner. Streaming
// fills the section in as soon as it's ready (usually before first scroll).
const Process = dynamic(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process })),
);

// design-system §07 §19: nav → hero → work → services → skills → about → process → discuss → contact → footer
export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Projects />
        <Services />
        <Skills />
        <About />
        <Process />
        <DiscussProject />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

