
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedElement from "@/components/ui/animated-element";

const ContactHeader = () => {
  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center text-agency-gray hover:text-agency-navy transition-colors duration-300 mb-6 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to home
      </Link>

      <AnimatedElement animation="animate-fade-up" delay={100}>
        <h1 className="text-3xl md:text-5xl font-bold text-agency-navy mb-6">
          Get in Touch
        </h1>

        <p className="text-lg text-agency-gray max-w-2xl">
          Fill out the form below and we'll respond to your inquiry within 24 hours.
        </p>
      </AnimatedElement>
    </div>
  );
};

export default ContactHeader;
