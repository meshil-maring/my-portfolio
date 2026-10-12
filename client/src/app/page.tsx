import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

// design-system §07 §19: nav → hero → work → services → skills → about → contact → footer
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

