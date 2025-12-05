import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out 
          ${isScrolled 
            ? 'top-4 w-[90%] md:w-auto md:min-w-[600px] glass-panel rounded-full shadow-lg border-white/50 py-3 px-6' 
            : 'top-6 w-full md:w-auto bg-transparent py-4 px-6 md:px-0'
          }`}
      >
        <div className={`flex justify-between items-center ${!isScrolled ? 'container mx-auto md:px-12' : 'w-full'}`}>
          
          <a href="#" className={`text-xl font-serif font-bold tracking-tight z-50 relative transition-colors ${isScrolled ? 'text-slate-800' : 'text-slate-900'} hover:opacity-70`}>
            V<span className="text-slate-400">.</span>DEV
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
             {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                    <a 
                    key={link.name} 
                    href={link.href}
                    className={`text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${
                        isActive 
                        ? 'bg-slate-800 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                    }`}
                    >
                    {link.name}
                    </a>
                );
             })}
            
             <a 
              href="#contact" 
              className={`ml-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300
                ${isScrolled 
                  ? 'bg-slate-200 text-slate-900 hover:bg-slate-300' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
            >
              Fale Comigo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-800 z-50 relative hover:bg-slate-100/50 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay with Glass Effect */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-xl z-40 flex flex-col justify-center items-center space-y-8 animate-in slide-in-from-top-10 duration-300">
            {NAV_LINKS.map((link) => {
               const isActive = activeSection === link.href.replace('#', '');
               return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-3xl font-serif font-medium transition-all ${
                    isActive ? 'text-slate-900 scale-110' : 'text-slate-400'
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