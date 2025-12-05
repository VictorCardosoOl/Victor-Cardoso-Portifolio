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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out 
          ${isScrolled 
            ? 'top-6 w-[85%] md:w-auto md:min-w-[650px] glass-panel rounded-full py-4 px-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' 
            : 'top-8 w-full md:w-auto bg-transparent py-4 px-6 md:px-0'
          }`}
      >
        <div className={`flex justify-between items-center ${!isScrolled ? 'container mx-auto md:px-12' : 'w-full'}`}>
          
          <a href="#" className={`text-xl font-serif font-bold tracking-tight z-50 relative transition-colors ${isScrolled ? 'text-slate-800' : 'text-slate-900'} hover:opacity-70 mr-12`}>
            V<span className="text-slate-400">.</span>DEV
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
             {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                    <a 
                    key={link.name} 
                    href={link.href}
                    className={`text-xs font-medium uppercase tracking-widest relative group transition-all duration-300 ${
                        isActive 
                        ? 'text-slate-900 font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    >
                    {link.name}
                    {/* Active/Hover Dot */}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-800 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                    </a>
                );
             })}
            
             <a 
              href="#contact" 
              className={`ml-8 px-7 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full hover:-translate-y-0.5 duration-300
                ${isScrolled 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
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
          <div className="fixed inset-0 bg-white/60 backdrop-blur-2xl z-40 flex flex-col justify-center items-center space-y-10 animate-in fade-in duration-300">
            {NAV_LINKS.map((link) => {
               const isActive = activeSection === link.href.replace('#', '');
               return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-4xl font-serif font-medium transition-all ${
                    isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
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