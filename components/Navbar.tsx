
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Magnetic from './ui/Magnetic';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from './ui/PageTransition';
import { FlipLink } from './ui/FlipLink';

const MotionDiv = motion.div as any;
const MotionA = motion.a as any;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  
  const { transitionTo } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
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
      { 
        rootMargin: "-45% 0px -45% 0px" 
      } 
    );

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    transitionTo(href);
  };

  return (
    <>
      <div className={`fixed left-0 w-full h-[2px] bg-slate-900 transition-all duration-300 z-[100] origin-left ${isScrolled ? 'top-[72px] opacity-0' : 'top-0 opacity-100'}`} style={{ transform: `scaleX(${readingProgress})` }} />

      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] 
          ${isScrolled 
            ? 'top-6 w-auto min-w-[300px] glass-panel rounded-full py-3 px-8' 
            : 'top-8 w-full md:w-auto bg-transparent py-4 px-6 md:px-0'
          }`}
      >
        <div className={`flex justify-between items-center ${!isScrolled ? 'container mx-auto md:px-12' : 'gap-8'}`}>
          
          <Magnetic strength={0.2}>
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')}
              className={`text-xl font-serif font-bold tracking-tight z-50 relative transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'} hover:opacity-70`}
            >
                V<span className="text-slate-400">.</span>
            </a>
          </Magnetic>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
             {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                    <Magnetic key={link.name} strength={0.2}>
                        <div className="py-2"> {/* Wrapper for hit area */}
                          <FlipLink
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            isActive={isActive}
                            className={`text-[10px] font-bold tracking-[0.2em] ${isActive ? 'text-slate-900' : 'text-slate-500'}`}
                          >
                            {link.name}
                          </FlipLink>
                        </div>
                    </Magnetic>
                );
             })}
            
            <Magnetic strength={0.4}>
                 <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className={`ml-4 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full duration-300 inline-block border ${
                      isScrolled
                      ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                      : 'bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  Contato
                </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              className="p-2 text-slate-900 z-50 relative hover:bg-slate-100/50 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-slate-50 z-40 flex flex-col justify-center items-center space-y-6"
            >
              {NAV_LINKS.map((link, index) => {
                 const isActive = activeSection === link.href.replace('#', '');
                 return (
                  <MotionA 
                    key={link.name} 
                    href={link.href}
                    onClick={(e: any) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-300 hover:text-slate-500'
                    }`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                    <span className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                      {link.name}
                    </span>
                  </MotionA>
                 )
              })}
            </MotionDiv>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
