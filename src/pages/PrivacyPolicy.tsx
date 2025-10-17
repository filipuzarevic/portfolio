
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedElement from "@/components/ui/animated-element";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28">
          <AnimatedElement animation="animate-fade-up">
            <Link
              to="/"
              className="inline-flex items-center text-agency-navy hover:text-agency-gray transition-colors duration-300 mb-6 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-agency-navy mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8">
                Welcome to Simplifi. At Simplifi, we are committed to protecting your privacy and ensuring that your personal data is handled in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR).
              </p>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">1. Data Controller</h2>
              <p>
                Simplifi<br/>
                Brezovička cesta 21L/1, 10020 Zagreb, Croatia<br/>
                Email: filip@rapid-research.org
              </p>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">2. What Information We Collect</h2>
              <p>
                We may collect the following categories of personal information:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Technical data (IP address, browser type, and operating system)</li>
                <li>Cookies and usage data (see our Cookies Policy for more details)</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">3. How We Use Your Data</h2>
              <p>
                We use your personal data to:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Provide and maintain our Services</li>
                <li>Communicate with you, including responding to inquiries and providing updates</li>
                <li>Analyze usage patterns to improve our website</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">4. Sharing Your Information</h2>
              <p>
                We do not share your personal data with third parties except in the following cases:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>To comply with legal obligations</li>
                <li>With your consent for a specific purpose</li>
                <li>To service providers who help us operate our website (e.g., hosting providers)</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">5. Your Rights</h2>
              <p>
                Under the GDPR, you have the right to:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>Access, correct, or delete your personal data</li>
                <li>Restrict or object to the processing of your data</li>
                <li>Withdraw consent where it was previously provided</li>
                <li>Request a copy of your data in a structured, machine-readable format</li>
              </ul>
              <p className="mt-2">
                You can exercise your rights by contacting us at filip@rapid-research.org.
              </p>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">6. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary for the purposes described in this Privacy Policy. When data is no longer required, we will securely delete or anonymize it.
              </p>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">7. Security Measures</h2>
              <p>
                We use appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, or destruction.
              </p>
              
              <h2 className="text-2xl font-bold text-agency-navy mt-8 mb-4">8. Changes to the Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and you are encouraged to review the policy periodically.
              </p>
              
              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-6">Last updated: {currentYear}</p>
                <Link to="/">
                  <button className="inline-flex items-center border-2 border-agency-navy text-agency-navy hover:bg-agency-navy hover:text-white font-semibold px-6 py-3 transition-all duration-200">
                    Return to Home
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
