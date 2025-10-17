
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [showSimpli, setShowSimpli] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [showFi, setShowFi] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sequential reveal animation: SIMPLI, dot, FI, tagline, CTA
    const simpliTimer = setTimeout(() => setShowSimpli(true), 300);
    const dotTimer = setTimeout(() => setShowDot(true), 900);
    const fiTimer = setTimeout(() => setShowFi(true), 1500);
    const taglineTimer = setTimeout(() => setShowTagline(true), 2100);
    const ctaTimer = setTimeout(() => setShowCTA(true), 2700);

    return () => {
      clearTimeout(simpliTimer);
      clearTimeout(dotTimer);
      clearTimeout(fiTimer);
      clearTimeout(taglineTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    // Track scroll to reposition content when header appears
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    // Check scroll position periodically as fallback for mobile browsers
    const intervalId = setInterval(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative bg-agency-navy min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Nebula Background - Layer 1: Deep space clouds */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 40%, rgba(88, 50, 150, 0.4) 0%, rgba(88, 50, 150, 0.2) 30%, transparent 70%)',
          animation: 'nebula-drift-1 20s ease-in-out infinite',
          filter: 'blur(80px)',
        }}
      />

      {/* Animated Nebula Background - Layer 2: Cyan mist */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 120% 120% at 20% 60%, rgba(20, 184, 166, 0.35) 0%, rgba(20, 184, 166, 0.15) 30%, transparent 65%)',
          animation: 'nebula-drift-2 18s ease-in-out infinite',
          filter: 'blur(100px)',
        }}
      />

      {/* Animated Nebula Background - Layer 3: Deep blue fog */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 130% 140% at 80% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 70%)',
          animation: 'nebula-drift-3 22s ease-in-out infinite',
          filter: 'blur(120px)',
        }}
      />

      {/* Animated Nebula Background - Layer 4: Purple accent */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 100% 160% at 60% 70%, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 65%)',
          animation: 'nebula-drift-4 25s ease-in-out infinite',
          filter: 'blur(110px)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className={`relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center transition-all duration-500 ${scrolled ? 'mt-0' : '-mt-12 sm:mt-0'}`}>
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-10">
          <h1 className="font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.15]">
            <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem]">
              <span
                className={`transition-opacity duration-700 ${
                  showSimpli ? 'opacity-100' : 'opacity-0'
                }`}
              >
                SIMPLI
              </span>
              <span
                className={`transition-opacity duration-700 ${
                  showDot ? 'opacity-100' : 'opacity-0'
                }`}
              >
                .
              </span>
              <span
                className={`transition-opacity duration-700 ${
                  showFi ? 'opacity-100' : 'opacity-0'
                }`}
              >
                FI
              </span>
            </div>
          </h1>

          <p
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-agency-lightGray leading-relaxed max-w-4xl px-4 transition-opacity duration-700 ${
              showTagline ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Product Research & Strategy for High-Stakes Decisions
          </p>

          <div
            className={`pt-2 sm:pt-4 flex items-center justify-center transition-opacity duration-700 ${
              showCTA ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link to="/contact">
              <button className="group inline-flex items-center bg-white text-agency-navy font-semibold text-base sm:text-lg md:text-xl px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-transparent hover:text-white transition-all duration-200">
                Schedule Call
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
