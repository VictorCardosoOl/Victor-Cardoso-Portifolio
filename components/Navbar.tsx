import React, { useState } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const MotionHeader = motion.header as any;

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // States for Scroll Logic
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // Scroll Aware Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // 1. Detect Glass State (Top vs Scrolled)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // 2. Detect Direction (Hide on Down, Show on Up)
    // Only hide if we are past the initial hero section (> 150px) to avoid flickering at top
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    transitionTo(href);
  };

  const menuItems = NAV_LINKS.map(link => ({ label: link.name, link: link.href }));
  const socialItems = CONTACT_INFO.socials.map(social => ({ label: social.name, link: social.url }));

  // Animation Variants
  const navVariants = {
    top: {
        y: 0,
        backgroundColor: 'rgba(242, 244, 246, 0)',
        backdropFilter: 'blur(0px)',
        borderBottom: '1px solid transparent',
    },
    scrolled: {
        y: 0,
        backgroundColor: 'rgba(242, 244, 246, 0.85)', // High opacity for readability
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(11, 35, 46, 0.08)',
    },
    hidden: {
        y: "-100%",
        backgroundColor: 'rgba(242, 244, 246, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(11, 35, 46, 0.08)',
    }
  };

  // Determine current state
  // If Menu is OPEN, force it to be visible ('scrolled' or 'top' doesn't matter much for visibility, but 'scrolled' ensures contrast if needed)
  // Otherwise, check if Hidden -> check if Scrolled -> else Top
  const currentVariant = isMenuOpen 
    ? (isScrolled ? "scrolled" : "top") 
    : isHidden 
        ? "hidden" 
        : isScrolled 
            ? "scrolled" 
            : "top";

  return (
    <>
      <MotionHeader
        initial="top"
        animate={currentVariant}
        variants={navVariants}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[9995] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center"
      >
        {/* Logo - Elegant & Minimal */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className={`text-2xl font-serif font-bold tracking-tighter relative z-[9999] transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-petrol-base'}`}
        >
            V<span className="text-petrol-electric">.</span>
        </a>

        {/* Hamburger Trigger - Refined Pill Shape */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative z-[9999] group flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border transition-all duration-500 backdrop-blur-md ${
             isMenuOpen 
             ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
             : 'bg-petrol-base/5 border-petrol-base/5 text-petrol-base hover:bg-petrol-base hover:text-white hover:border-petrol-base'
          }`}
        >
          <span className="text-[9px] font-mono uppercase tracking-widest hidden md:inline-block opacity-70 group-hover:opacity-100 transition-opacity">
             {isMenuOpen ? 'Fechar' : 'Menu'}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isMenuOpen ? 'bg-white text-petrol-base' : 'bg-white/50 text-petrol-base group-hover:bg-white/20 group-hover:text-white'}`}>
             {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </div>
        </button>
      </MotionHeader>

      <StaggeredMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems} 
        socialItems={socialItems} 
        onNavClick={handleNavClick} 
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;