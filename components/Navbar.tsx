import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Magnetic from './ui/Magnetic';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Reading Progress Logic
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setReadingProgress(Number(scroll));
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
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[100] pointer-events-none">
        <div 
          className="h-full bg-slate-900 transition-all duration-100 ease-out"
          style={{ width: `${readingProgress * 100}%` }}
        />
      </div>

      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out 
          ${isScrolled 
            ? 'top-6 w-[85%] md:w-auto md:min-w-[650px] glass-panel rounded-full py-4 px-10' 
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
                    <Magnetic key={link.name} strength={0.2}>
                        <a 
                        href={link.href}
                        className={`text-xs font-medium uppercase tracking-widest relative group transition-all duration-300 px-2 py-1 ${
                            isActive 
                            ? 'text-slate-900 font-bold' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                        >
                        {link.name}
                        {/* Active/Hover Dot */}
                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-800 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                        </a>
                    </Magnetic>
                );
             })}
            
            <Magnetic strength={0.4}>
                 <a 
                  href="#contact" 
                  className={`ml-8 px-7 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full duration-300 inline-block
                    ${isScrolled 
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_5px_15px_rgba(15,23,42,0.2)]' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                    }`}
                >
                  Fale Comigo
                </a>
            </Magnetic>
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