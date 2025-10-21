
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu }) => {
  // If props aren't provided, use internal state
  const [internalIsMenuOpen, setInternalIsMenuOpen] = useState(false);
  const location = useLocation();

  const isOpen = isMenuOpen !== undefined ? isMenuOpen : internalIsMenuOpen;
  const handleToggle = toggleMenu || (() => setInternalIsMenuOpen(!internalIsMenuOpen));

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  // Create navigation links based on current page
  const getNavLink = (section: string, label: string) => {
    if (isHomePage) {
      // If on home page, use anchor links
      return (
        <a
          href={`#${section}`}
          className="text-gray-700 hover:text-agency-navy font-medium transition-colors"
        >
          {label}
        </a>
      );
    } else {
      // If on any other page, navigate to home page with anchor
      return (
        <Link
          to={`/#${section}`}
          className="text-gray-700 hover:text-agency-navy font-medium transition-colors"
        >
          {label}
        </Link>
      );
    }
  };

  // Always show the navbar on all pages
  const navbarClasses = "fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-agency-slate/10 transition-all duration-300";

  // Always use navy colors since navbar is always visible
  const logoClasses = "text-xl font-bold text-agency-navy transition-colors duration-300";
  const accentClasses = "text-agency-navy transition-colors duration-300";
  const logoMarkClasses = "border-agency-navy/40";
  const logoDotClasses = "bg-agency-navy";
  const menuIconColor = "text-gray-700";

  return (
    <nav className={navbarClasses}>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Circle-dot logo mark */}
              <div className={`relative w-6 h-6 rounded-full border-2 ${logoMarkClasses} transition-colors duration-300 flex items-center justify-center`}>
                <div className={`w-1.5 h-1.5 rounded-full ${logoDotClasses} transition-colors duration-300`}></div>
              </div>

              <div className={logoClasses}>
                <span className="font-bold">SIMPLI</span><span className={accentClasses}>.FI</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {getNavLink("services", "Services")}
            {getNavLink("process", "Our Process")}
            {getNavLink("testimonials", "Results")}
            <Link to="/about" className="text-gray-700 hover:text-agency-navy font-medium transition-colors">
              About
            </Link>
            <Link to="/contact">
              <button className="inline-flex items-center bg-agency-navy text-white border-2 border-agency-navy hover:bg-white hover:text-agency-navy font-semibold px-4 py-2 text-sm transition-all duration-200">
                Schedule Call
              </button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className={`inline-flex items-center justify-center p-2 rounded-md ${menuIconColor} hover:text-agency-blue focus:outline-none transition-colors duration-300`}
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {isHomePage ? (
              <>
                <a
                  href="#services"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Services
                </a>
                <a
                  href="#process"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Our Process
                </a>
                <a
                  href="#testimonials"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Results
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/#services"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Services
                </Link>
                <Link
                  to="/#process"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Our Process
                </Link>
                <Link
                  to="/#testimonials"
                  className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
                  onClick={handleToggle}
                >
                  Results
                </Link>
              </>
            )}
            <Link
              to="/about"
              className="block py-2 text-base font-medium text-gray-600 hover:text-agency-blue"
              onClick={handleToggle}
            >
              About
            </Link>
            <div className="pt-2 pb-3">
              <Link to="/contact" onClick={handleToggle}>
                <button className="w-full inline-flex items-center justify-center bg-agency-navy text-white border-2 border-agency-navy hover:bg-white hover:text-agency-navy font-semibold px-4 py-2 transition-all duration-200">
                  Schedule Call
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
