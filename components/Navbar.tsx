
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Magnetic from './ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';
import { GamificationBadge } from './Gamification';

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
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setReadingProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Using rootMargin to create a "sweet spot" in the middle of the screen.
    // The observer only triggers when an element intersects this narrow horizontal band.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-45% 0px -45% 0px" // Only trigger when element is in the vertical center 10% of the screen
      } 
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
      {/* Reading Progress Bar - Visível acima da Navbar com Track Glass */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/50 backdrop-blur-sm z-[100] pointer-events-none">
        <div 
          className="h-full bg-slate-900 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(15,23,42,0.3)]"
          style={{ width: `${readingProgress * 100}%` }}
        />
      </div>

      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out 
          ${isScrolled 
            ? 'top-6 w-[85%] md:w-auto md:min-w-[700px] glass-panel rounded-full py-4 px-10' 
            : 'top-8 w-full md:w-auto bg-transparent py-4 px-6 md:px-0'
          }`}
      >
        <div className={`flex justify-between items-center ${!isScrolled ? 'container mx-auto md:px-12' : 'w-full'}`}>
          
          <a href="#" className={`text-xl font-serif font-bold tracking-tight z-50 relative transition-colors ${isScrolled ? 'text-slate-800' : 'text-slate-900'} hover:opacity-70 mr-8 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg p-1`}>
            V<span className="text-slate-400">.</span>DEV
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
             {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                    <Magnetic key={link.name} strength={0.2}>
                        <a 
                        href={link.href}
                        className={`text-xs font-medium uppercase tracking-widest relative group transition-all duration-300 px-2 py-1 focus-visible:ring-2 focus-visible:ring-slate-900 ${
                            isActive 
                            ? 'text-slate-900 font-bold' 
                            : 'text-slate-700 hover:text-slate-900'
                        }`}
                        >
                        {link.name}
                        {/* Active/Hover Dot */}
                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-800 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                        </a>
                    </Magnetic>
                );
             })}
            
            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>

            {/* Gamification Badge Integrated */}
            <GamificationBadge />

            <Magnetic strength={0.4}>
                 <a 
                  href="#contact" 
                  className={`ml-4 px-7 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full duration-300 inline-block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900
                    ${isScrolled 
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_5px_15px_rgba(15,23,42,0.2)]' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                    }`}
                >
                  Fale Comigo
                </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Button & Badge */}
          <div className="flex items-center gap-4 md:hidden">
            <div className="scale-90 origin-right">
              <GamificationBadge />
            </div>

            <button 
              className="p-2 text-slate-800 z-50 relative hover:bg-slate-100/50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay with Framer Motion */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/95 z-40 flex flex-col justify-center items-center space-y-4"
            >
              {NAV_LINKS.map((link, index) => {
                 const isActive = activeSection === link.href.replace('#', '');
                 return (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05), type: "spring", stiffness: 300, damping: 30 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-64 text-center text-2xl font-serif font-medium py-4 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-slate-900 border ${
                      isActive 
                        ? 'bg-slate-50 text-slate-900 border-slate-200 shadow-sm' 
                        : 'text-slate-400 border-transparent hover:text-slate-800 hover:bg-slate-50 hover:border-slate-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* Active Indicator Dot for Mobile - Refined */}
                    {isActive && (
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-900 shadow-[0_0_10px_rgba(15,23,42,0.3)]" />
                    )}
                    {link.name}
                  </motion.a>
                 )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
