
import React from "react";
import AnimatedElement from "@/components/ui/animated-element";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "15+ Years of Experience",
      description: "Deep expertise in user research methodologies and AI product challenges."
    },
    {
      title: "One-Week Sprints",
      description: "High-velocity research that keeps pace with your development cycles."
    },
    {
      title: "AI-Focused Expertise",
      description: "Understanding adoption barriers, trust issues, and user expectations for intelligent systems."
    },
    {
      title: "Actionable Results",
      description: "Clear, strategic recommendations that directly influence product success."
    }
  ];

  return (
    <section className="py-24 bg-pattern" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-agency-navy mb-6 leading-tight">
              Why Startups Choose Us
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mb-16">
          {features.map((feature, index) => (
            <AnimatedElement key={index} animation="animate-fade-up" delay={index * 100}>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-agency-navy">{feature.title}</h3>
                <p className="text-lg text-agency-gray leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="animate-fade-up" delay={400}>
          <div>
            <Link to="/contact">
              <button className="bg-agency-navy text-white hover:bg-opacity-90 font-bold text-lg md:text-xl px-10 py-5 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Let's connect
              </button>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Features;
