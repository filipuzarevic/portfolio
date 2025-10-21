
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedElement from "@/components/ui/animated-element";
import AnimatedMetric from "@/components/AnimatedMetric";

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [startCounters, setStartCounters] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startCounters) {
            setStartCounters(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [startCounters]);
  const resultMetrics = [
    {
      metric: "+12%",
      title: "Revenue Lift",
      description: "From optimized product bundling"
    },
    {
      metric: "+6.8%",
      title: "Conversion Rate",
      description: "Identifying critical UX friction points"
    },
    {
      metric: "€3.5M",
      title: "Cost Savings",
      description: "Without impacting user satisfaction"
    }
  ];


  return (
    <section
      ref={sectionRef}
      className="py-24 bg-pattern"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-agency-navy mb-6 leading-tight">
              Impact
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          {resultMetrics.map((item, index) => (
            <AnimatedElement key={index} animation="animate-fade-up" delay={index * 100}>
              <div className="space-y-4">
                {startCounters ? (
                  <AnimatedMetric metric={item.metric} />
                ) : (
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-agency-navy font-mono">0</div>
                )}
                <h3 className="text-xl md:text-2xl font-semibold text-agency-navy">{item.title}</h3>
                <p className="text-base md:text-lg text-agency-gray">{item.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(Testimonials);
