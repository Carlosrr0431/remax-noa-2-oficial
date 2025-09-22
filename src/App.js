import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturedPropertiesSection from "./components/FeaturedPropertiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import RecruitmentSection from "./components/RecruitmentSection";
import OfficeGallerySection from "./components/OfficeGallerySection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturedPropertiesSection />
      <TestimonialsSection />
      <RecruitmentSection />
      <OfficeGallerySection />
      <Footer />
    </div>
  );
}

export default App;