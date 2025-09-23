import React from "react";
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

function App() {
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
    </div>
  );
}

export default App;
