
import React from "react";
import AnimatedElement from "@/components/ui/animated-element";

const Process = () => {
  const researchOptions = [
    {
      title: "Rapid Discovery",
      subtitle: "1-week Sprint",
      description: "Identify critical questions and validate ideas. Get actionable insights in one week."
    },
    {
      title: "Flexible Research",
      subtitle: "Custom Duration",
      description: "Research tailored to your schedule. Integrate insights into your development process."
    },
    {
      title: "Strategic Partnership",
      subtitle: "Long-term",
      description: "Dedicated support as you scale. Regular insights to inform key decisions."
    }
  ];

  return (
    <section className="py-24 bg-pattern" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-agency-navy mb-6 leading-tight">
              How We Work
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          {researchOptions.map((option, index) => (
            <AnimatedElement key={index} animation="animate-fade-up" delay={index * 150}>
              <div className="space-y-3">
                <div className="text-sm font-mono text-agency-gray uppercase tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-semibold text-agency-navy">
                  {option.title}
                </h3>
                <div className="text-base text-agency-gray font-medium">
                  {option.subtitle}
                </div>
                <p className="text-base text-agency-gray leading-relaxed">
                  {option.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
