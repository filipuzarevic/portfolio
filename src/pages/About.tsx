
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedElement from "@/components/ui/animated-element";

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-pattern">
      <Navbar />

      <main className="pt-24">
        {/* About Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-20">
          <AnimatedElement animation="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-agency-navy mb-16 max-w-3xl">
              Behind SIMPLI.FI
            </h1>
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

            <AnimatedElement animation="animate-fade-up" delay={200} className="w-full lg:w-3/5 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-agency-navy mb-6">
                  A Research-Driven Approach Built on Experience
                </h2>

                <div className="space-y-6 text-lg text-agency-gray leading-relaxed">
                  <p>
                    SIMPLI.FI was created to help companies move faster and smarter by understanding their users. Behind the scenes is a senior UX researcher with 15 years of experience turning complex behavior into business outcomes.
                  </p>

                  <p>
                    With a PhD in psychology and a track record in fast-paced tech, I've led everything from 5-day sprints to strategic, multi-quarter studies. My work has contributed to measurable revenue growth and faster product-market fit—by helping teams make better decisions, faster.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-agency-navy mb-6">
                  Why This Matters to You
                </h2>

                <div className="space-y-6 text-lg text-agency-gray leading-relaxed">
                  <p>
                    Startups rarely fail from lack of tech—they fail from building the wrong thing. My job is to make sure that doesn't happen to you.
                  </p>

                  <p>
                    Whether you're validating an idea or scaling a proven product, SIMPLI.FI gives you expert research strategy without the agency fluff.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-pattern-alt py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedElement animation="animate-fade-up">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-semibold text-agency-navy mb-8">
                  Curious if we're a fit? Schedule a consultation and let's talk.
                </h3>

                <Link to="/contact">
                  <button className="bg-agency-navy text-white hover:bg-opacity-90 font-bold text-lg md:text-xl px-10 py-5 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Let's connect
                  </button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
