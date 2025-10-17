
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavigate = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-agency-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              {/* Circle-dot logo mark */}
              <div className="relative w-6 h-6 rounded-full border-2 border-white/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white transition-colors duration-300"></div>
              </div>

              <h2 className="text-xl font-bold">
                SIMPLI<span className="text-agency-lightGray">.FI</span>
              </h2>
            </div>
            <p className="text-agency-lightGray max-w-md">
              Product Research & Strategy for High-Stakes Decisions
            </p>
          </div>
        </div>

        <div className="border-t border-agency-slate/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-agency-gray text-sm">© {currentYear} SIMPLI.FI. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0 justify-center">
            <Link to="/terms" onClick={handleNavigate} className="text-agency-gray hover:text-white transition-colors text-sm">Terms & Conditions</Link>
            <Link to="/privacy" onClick={handleNavigate} className="text-agency-gray hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/cookies" onClick={handleNavigate} className="text-agency-gray hover:text-white transition-colors text-sm">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
