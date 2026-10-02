import CanvasAnimation from "@/components/CanvasAnimation";
import ConversionSection from "@/components/ConversionSection";
import Navbar from "@/components/Navbar";
import ProductsSection from "@/components/ProductsSection";
import ProofSection from "@/components/ProofSection";
import ResumeSection from "@/components/ResumeSection";
import ScrollExperience from "@/components/ScrollExperience";
import Scene3D from "@/components/Scene3D";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Scene3D />
      <ScrollExperience />
      <main className="site-flow" data-scroll-container>
        <CanvasAnimation />
        <ProductsSection />
        <ProofSection />
        <ConversionSection />
        <WorkSection />
        <ResumeSection />
      </main>
    </>
  );
}
