
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const isOpen = isMenuOpen !== undefined ? isMenuOpen : internalIsMenuOpen;
  const handleToggle = toggleMenu || (() => setInternalIsMenuOpen(!internalIsMenuOpen));

  // Check if we are on the home page
  const isHomePage = location.pathname === "/";

  // Add scroll event listener to track scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // For homepage, consider scrolled state after 50px of scroll
      // For other pages, consider scrolled immediately (they have light backgrounds)
      const scrollThreshold = isHomePage ? 50 : 0;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(scrollY > scrollThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    // For homepage, start with scrolled as false (header hidden)
    // For other pages, initialize based on scroll position
    if (!isHomePage) {
      handleScroll();
    }

    // Check scroll position periodically as fallback for mobile browsers
    const intervalId = setInterval(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearInterval(intervalId);
    };
  }, [isHomePage]);

  // Create navigation links based on current page
  const getNavLink = (section: string, label: string) => {
    if (isHomePage) {
      // If on home page, use anchor links
      return (
        <a 
          href={`#${section}`} 
          className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-agency-navy' : 'text-gray-100 hover:text-white'}`}
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

  // For homepage, hide navbar initially and fade in when scrolled
  // For other pages, always show the navbar
  const navbarClasses = isHomePage
    ? `fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-sm border-b border-agency-slate/10 opacity-100 translate-y-0' : 'bg-transparent opacity-0 -translate-y-full pointer-events-none'}`
    : "fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-agency-slate/10";

  // Text colors based on homepage scroll position or other pages
  const logoClasses = isHomePage && !scrolled
    ? "text-xl font-bold text-white transition-colors duration-300"
    : "text-xl font-bold text-agency-navy transition-colors duration-300";

  const accentClasses = isHomePage && !scrolled
    ? "text-white transition-colors duration-300"
    : "text-agency-navy transition-colors duration-300";

  // Logo mark colors (circle and dot)
  const logoMarkClasses = isHomePage && !scrolled
    ? "border-white/40"
    : "border-agency-navy/40";

  const logoDotClasses = isHomePage && !scrolled
    ? "bg-white"
    : "bg-agency-navy";

  // Icon color for mobile menu toggle
  const menuIconColor = isHomePage && !scrolled ? "text-white" : "text-gray-700";

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Circle-dot logo mark */}
              <div className={`relative w-6 h-6 rounded-full border-2 ${logoMarkClasses} transition-colors duration-300 flex items-center justify-center`}>
                <div className={`w-1.5 h-1.5 rounded-full ${logoDotClasses} transition-colors duration-300`}></div>
              </div>

              <div className={logoClasses}>
                <span className="font-bold">Rapid</span> <span className={accentClasses}>Research</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {getNavLink("services", "Services")}
            {getNavLink("process", "Our Process")}
            {getNavLink("testimonials", "Results")}
            <Link to="/about" className={isHomePage && !scrolled ? "text-gray-100 hover:text-white font-medium transition-colors" : "text-gray-700 hover:text-agency-navy font-medium transition-colors"}>
              About
            </Link>
            <Link to="/contact">
              <button
                className={isHomePage && !scrolled
                  ? "inline-flex items-center bg-white text-agency-navy border-2 border-white hover:bg-transparent hover:text-white font-semibold px-4 py-2 text-sm transition-all duration-200"
                  : "inline-flex items-center bg-agency-navy text-white border-2 border-agency-navy hover:bg-white hover:text-agency-navy font-semibold px-4 py-2 text-sm transition-all duration-200"
                }
              >
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
