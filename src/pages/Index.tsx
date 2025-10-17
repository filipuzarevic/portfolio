
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import Footer from "@/components/Footer";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu and scroll to top when navigating to this page
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  // Share menu state with Navbar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Hero />
      <Testimonials />
      <Process />
      <Services />
      <Features />
      <TrustedBy />
      <Footer />
    </div>
  );
};

export default Index;
