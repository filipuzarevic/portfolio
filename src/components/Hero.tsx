
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showSimpli, setShowSimpli] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const [showFi, setShowFi] = useState(false);
  const [showTagline1, setShowTagline1] = useState(false);
  const [showTagline2, setShowTagline2] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Only start animations after video loads
    if (!videoLoaded) return;

    // Sequential reveal animation: SIMPLI, dot, FI, tagline1, tagline2, CTA
    const simpliTimer = setTimeout(() => setShowSimpli(true), 300);
    const dotTimer = setTimeout(() => setShowDot(true), 900);
    const fiTimer = setTimeout(() => setShowFi(true), 1500);
    const tagline1Timer = setTimeout(() => setShowTagline1(true), 2100);
    const tagline2Timer = setTimeout(() => setShowTagline2(true), 2700);
    const ctaTimer = setTimeout(() => setShowCTA(true), 3300);

    return () => {
      clearTimeout(simpliTimer);
      clearTimeout(dotTimer);
      clearTimeout(fiTimer);
      clearTimeout(tagline1Timer);
      clearTimeout(tagline2Timer);
      clearTimeout(ctaTimer);
    };
  }, [videoLoaded]);

  return (
    <div className="relative bg-agency-navy min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/vid_2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-agency-navy/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
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

          <div className="space-y-3 sm:space-y-4 max-w-4xl px-4">
            <p
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed transition-opacity duration-700 ${
                showTagline1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              90% of startups fail from building the wrong thing.
            </p>

            <p
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed transition-opacity duration-700 ${
                showTagline2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Our job is to make sure that doesn't happen to you.
            </p>
          </div>

          <div
            className={`pt-2 sm:pt-4 flex items-center justify-center transition-opacity duration-700 ${
              showCTA ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link to="/contact">
              <button className="group bg-white text-agency-navy font-bold text-xl md:text-2xl px-12 py-6 border-2 border-white hover:bg-transparent hover:text-white hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
                Let's connect
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
