import CanvasAnimation from "@/components/CanvasAnimation";
import ConversionSection from "@/components/ConversionSection";
import Navbar from "@/components/Navbar";
import Scene3D from "@/components/Scene3D";
import SkillsSection from "@/components/SkillsSection";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Scene3D />
      <CanvasAnimation variant="hero" />
      <SkillsSection />
      <WorkSection />
      <ConversionSection />
      <CanvasAnimation variant="resume" />
    </>
  );
}
