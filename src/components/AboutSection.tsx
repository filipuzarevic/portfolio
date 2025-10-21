import React from "react";
import { Link } from "react-router-dom";
import AnimatedElement from "@/components/ui/animated-element";

const AboutSection = () => {
  return (
    <section className="py-24 bg-pattern" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement animation="animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-agency-navy mb-16">
            Behind SIMPLI.FI
          </h2>
        </AnimatedElement>

        <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
          <AnimatedElement animation="animate-fade-up" delay={100} className="w-full lg:w-2/5">
            <div className="overflow-hidden">
              <img
                src="/founder-photo.jpeg"
                alt="SIMPLI.FI Founder"
                className="w-full h-auto object-cover"
              />
            </div>
          </AnimatedElement>

          <AnimatedElement animation="animate-fade-up" delay={200} className="w-full lg:w-3/5">
            <div className="space-y-6 text-lg text-agency-gray leading-relaxed">
              <p>
                SIMPLI.FI was created to help companies move faster and smarter by understanding their users. Behind the scenes is a senior UX researcher with 15 years of experience turning complex behavior into business outcomes.
              </p>

              <p>
                A PhD in psychology and a track record in fast-paced tech have enabled me to lead everything from 5-day sprints to strategic, multi-quarter studies. My work has contributed to measurable revenue growth and faster product-market fit—by helping teams make better decisions, faster.
              </p>

              <p>
                Startups rarely fail from lack of tech—they fail from building the wrong thing. My job is to make sure that doesn't happen to you.
              </p>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="animate-fade-up" delay={300} className="mt-12 flex justify-center lg:justify-start">
          <Link to="/contact">
            <button className="bg-agency-navy text-white hover:bg-opacity-90 font-bold text-lg md:text-xl px-10 py-5 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Let's connect
            </button>
          </Link>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default AboutSection;
