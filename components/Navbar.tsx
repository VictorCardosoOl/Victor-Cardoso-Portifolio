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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg border-gray-100 py-4 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-xl md:text-2xl font-serif font-bold tracking-tight z-50 relative text-offblack hover:opacity-70 transition-opacity">
            VICTOR<span className="text-gray-400">.</span>DEV
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-gray-50/50 rounded-full px-2 p-1 border border-transparent hover:border-gray-200 transition-colors mr-4 backdrop-blur-sm">
                {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                    <a 
                    key={link.name} 
                    href={link.href}
                    className={`text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${
                        isActive 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-500 hover:text-black hover:bg-gray-100/50'
                    }`}
                    >
                    {link.name}
                    </a>
                );
                })}
            </div>
            
             <a 
              href="#contact" 
              className="px-6 py-3 bg-offblack text-white text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
            >
              Fale Comigo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-black z-50 relative hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center space-y-8 animate-in slide-in-from-top-10 duration-300">
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