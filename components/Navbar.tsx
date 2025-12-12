import React, { useState, useEffect } from 'react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { usePageTransition } from './ui/PageTransition';
import StaggeredMenu from './ui/StaggeredMenu';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const MotionHeader = motion.header as any;

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { transitionTo } = usePageTransition();

  // Scroll Aware Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Don't hide if menu is open
    if (isMenuOpen) {
      setHidden(false);
      return;
    }

    // Determine direction and threshold
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling down & past top
    } else {
      setHidden(false); // Scrolling up
    }
  });

  // Intersection Observer for Active Section
  useEffect(() => {
    const options = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);

    const sections = ['hero', ...NAV_LINKS.map(link => link.href.replace('#', ''))];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    transitionTo(href);
  };

  const menuItems = NAV_LINKS.map(link => ({ label: link.name, link: link.href }));
  const socialItems = CONTACT_INFO.socials.map(social => ({ label: social.name, link: social.url }));

  return (
    <>
      <MotionHeader
        variants={{
          visible: { y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
          hidden: { y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        className={`fixed top-0 left-0 w-full z-[9995] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center transition-colors duration-300 ${isMenuOpen ? '' : 'bg-transparent'}`}
      >
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className={`text-2xl font-serif font-bold tracking-tight relative z-[9999] transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-petrol-base'}`}
        >
            V<span className="text-petrol-accent">.</span>
        </a>

        {/* Hamburger Trigger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative z-[9999] group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md ${
             isMenuOpen 
             ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
             : 'bg-white/60 border-petrol-base/10 text-petrol-base shadow-sm hover:bg-petrol-base hover:text-white hover:border-petrol-base'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">
             {isMenuOpen ? 'Fechar' : 'Menu'}
          </span>
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
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