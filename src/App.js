import React, { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedPropertiesSection from "./components/FeaturedPropertiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import RecruitmentSection from "./components/RecruitmentSection";
import OfficeGallerySection from "./components/OfficeGallerySection";
import ContactForm from "./components/ContactForm";
import BrokerSection from "./components/BrokerSection";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import BottomNav from "./components/BottomNav";

function App() {
  useEffect(() => {
    // Señal mínima para coordinar fade del loader sin flashes
    const fire = () => window.dispatchEvent(new Event('app:ready'));
    // next frame + micro demora para asegurar estilos aplicados
    requestAnimationFrame(() => setTimeout(fire, 50));
  }, []);

  return (
    <div className="App">
      <Header />
      <HeroSection />
      {/* Sección Nosotros reemplazada por OfficeGallerySection */}
      <OfficeGallerySection />
      <RecruitmentSection />
      <TestimonialsSection />
      <FeaturedPropertiesSection />
      <BrokerSection />
      <Footer />
      <FloatingWhatsAppButton />
      <BottomNav />
    </div>
  );
}

export default App;
