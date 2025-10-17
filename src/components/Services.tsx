
import React from "react";
import AnimatedElement from "@/components/ui/animated-element";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "User Interviews",
      description: "In-depth conversations to uncover needs and expectations."
    },
    {
      title: "Usability Testing",
      description: "Observe real users to identify friction and optimization opportunities."
    },
    {
      title: "Survey Design",
      description: "Quantitative insights from larger user samples."
    },
    {
      title: "Data Analysis",
      description: "Translate research data into actionable recommendations."
    },
    {
      title: "Competitive Analysis",
      description: "Understand user perception and identify differentiation opportunities."
    },
    {
      title: "AI Interaction Research",
      description: "Specialized research on user interactions with AI-driven features."
    }
  ];

  return (
    <section className="py-24 bg-pattern" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-agency-navy mb-6 leading-tight">
              Research Services
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl">
          {services.map((service, index) => (
            <AnimatedElement key={index} animation="animate-fade-up" delay={index * 80}>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-agency-navy">{service.title}</h3>
                <p className="text-base text-agency-gray leading-relaxed">{service.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
