import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { DiscussProject } from "@/components/sections/DiscussProject";
import { RecruitmentInquiry } from "@/components/sections/RecruitmentInquiry";
import { Contact } from "@/components/sections/Contact";

// design-system section 07: nav -> hero -> work -> services -> skills -> about -> process -> discuss -> recruitment -> contact -> footer
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
        <RecruitmentInquiry />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
