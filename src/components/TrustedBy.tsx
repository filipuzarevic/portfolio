
import React, { useState, useEffect } from "react";
import AnimatedElement from "@/components/ui/animated-element";

const TrustedBy = () => {
  const companies = [
    {
      name: "Kiwi.com",
      logo: "/lovable-uploads/c9d1df73-0b48-47e6-99ae-c91819f42333.png",
      url: "https://www.kiwi.com"
    },
    {
      name: "Playsaurus",
      logo: "/playsaurus-logo.png",
      url: "https://www.playsaurus.com"
    },
    {
      name: "Loop UX",
      logo: "/loop-ux-logo.png",
      url: "https://loop-ux.com"
    },
    {
      name: "Polling.com",
      logo: "/lovable-uploads/2faea0e5-f3cf-467a-9f64-74d62cb7a42d.png",
      url: "https://www.polling.com"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companies.length);
    }, 2500); // Change logo every 2.5 seconds

    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <section className="py-20 bg-pattern-alt" id="trusted-by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-agency-navy md:border-l-0 md:pl-0">
            Trusted By
          </h2>
        </AnimatedElement>

        <div className="relative flex justify-center items-center h-[100px] overflow-hidden">
          <div className="relative w-full max-w-[250px] md:max-w-[300px] flex justify-center items-center">
            {companies.map((company, index) => {
              // Calculate position relative to current index
              const position = (index - currentIndex + companies.length) % companies.length;

              let translateX = '0%';
              let opacity = 0;
              let zIndex = 0;

              if (position === 0) {
                // Current item - center
                translateX = '0%';
                opacity = 1;
                zIndex = 10;
              } else if (position === 1) {
                // Next item - coming from right
                translateX = '150%';
                opacity = 0;
                zIndex = 5;
              } else {
                // Previous items - going to left
                translateX = '-150%';
                opacity = 0;
                zIndex = 5;
              }

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateX(${translateX})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-h-16 md:max-h-20 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
