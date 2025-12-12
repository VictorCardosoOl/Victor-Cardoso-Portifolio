import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionNav = motion.nav as any;
const MotionA = motion.a as any;

interface MenuItem {
  label: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  items: MenuItem[];
  socialItems: SocialItem[];
  onNavClick: (href: string) => void;
  activeSection?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ items, socialItems, onNavClick, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    onNavClick(href);
  };

  return (
    <div className={`staggered-menu-wrapper fixed-wrapper ${isOpen ? 'open' : ''}`}>
      
      {/* Fixed Header (Logo + Toggle) */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between p-6 md:p-12 z-[9995] pointer-events-none">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className={`pointer-events-auto text-xl font-serif font-bold tracking-tight relative transition-colors duration-500 ${isOpen ? 'text-white' : 'text-[#0B232E]'}`}
          >
              V<span className="text-[#2DD4BF]">.</span>
          </a>
          
          {/* Toggle Button */}
          <button 
            onClick={toggleMenu}
            className={`pointer-events-auto relative inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${
                isOpen 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-white/50 border-[#0B232E]/10 text-[#0B232E] hover:bg-[#0B232E] hover:text-white'
            }`}
          >
             <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">
                {isOpen ? 'Fechar' : 'Menu'}
             </span>
             {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Sliding Panels */}
      <AnimatePresence>
        {isOpen && (
           <>
             {/* Prelayer for visual stagger */}
             <MotionDiv 
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="sm-prelayers"
             >
                <div className="sm-prelayer"></div>
             </MotionDiv>

             {/* Main Menu Panel */}
             <MotionNav 
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="staggered-menu-panel"
             >
                <div className="flex-1 flex flex-col justify-center">
                   <ul className="sm-panel-list">
                      {items.map((item, i) => (
                         <li key={i} className="overflow-hidden">
                             <MotionA 
                               href={item.link}
                               onClick={(e: any) => { e.preventDefault(); handleLinkClick(item.link); }}
                               className={`sm-panel-item ${activeSection === item.link.replace('#', '') ? 'active' : ''}`}
                               initial={{ y: "100%" }}
                               animate={{ y: "0%" }}
                               transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                             >
                                {item.label}
                             </MotionA>
                         </li>
                      ))}
                   </ul>

                   <MotionDiv 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="mt-16 border-t border-white/10 pt-8"
                   >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 block">Social</span>
                      <div className="flex gap-6">
                         {socialItems.map((social, i) => (
                            <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                               {social.label}
                            </a>
                         ))}
                      </div>
                  </MotionDiv>
                </div>
             </MotionNav>
           </>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default StaggeredMenu;