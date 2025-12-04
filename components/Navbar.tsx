import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle Scroll Appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Active Section (Wayfinding)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } 
    );

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-gray-100 py-4 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-xl md:text-2xl font-serif font-bold tracking-tight z-50 relative mix-blend-difference text-offblack">
            DEV<span className="text-gray-400">.</span>PORTFOLIO
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:text-black relative group ${
                    isActive ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              );
            })}
            
             <a 
              href="#contact" 
              className="px-6 py-2.5 bg-offblack text-white text-xs font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-md shadow-lg hover:shadow-xl transform duration-300"
            >
              Fale Comigo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-black z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-offwhite z-40 flex flex-col justify-center items-center space-y-8 animate-in slide-in-from-top-10 duration-300">
            {NAV_LINKS.map((link) => {
               const isActive = activeSection === link.href.replace('#', '');
               return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-3xl font-serif font-medium transition-all ${
                    isActive ? 'text-offblack scale-110' : 'text-gray-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
               )
            })}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;