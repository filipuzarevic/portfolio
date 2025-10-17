
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/ContactHeader";
import ContactForm from "@/components/ContactForm";
import AnimatedElement from "@/components/ui/animated-element";

const Contact = () => {
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
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedElement animation="animate-fade-down" delay={100}>
            <ContactHeader />
          </AnimatedElement>

          <AnimatedElement animation="animate-fade-up" delay={200}>
            <div className="bg-white p-6 md:p-8">
              <ContactForm />
            </div>
          </AnimatedElement>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
