import CanvasAnimation from "@/components/CanvasAnimation";
import ConversionSection from "@/components/ConversionSection";
import Navbar from "@/components/Navbar";
import ResumeSection from "@/components/ResumeSection";
import ScrollExperience from "@/components/ScrollExperience";
import Scene3D from "@/components/Scene3D";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Scene3D />
      <ScrollExperience />
      <main className="site-flow" data-scroll-container>
        <CanvasAnimation />
        <SkillsSection />
        <WorkSection />
        <ServicesSection />
        <ConversionSection />
        <TestimonialsSection />
        <ResumeSection />
      </main>
    </>
  );
}
