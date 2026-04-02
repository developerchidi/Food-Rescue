import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/Hero";
import FoodGallery from "@/components/features/FoodGallery";
import ProcessSteps from "@/components/features/ProcessSteps";
import MapSection from "@/components/features/MapSection";
import PartnerSection from "@/components/features/PartnerSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProcessSteps />
      <FoodGallery />
      <MapSection />
      <PartnerSection />
      <Footer />
    </main>
  );
}
