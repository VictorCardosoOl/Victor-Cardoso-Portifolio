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

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    onNavClick(href);
  };

  return (
    <div className={`staggered-menu-wrapper fixed-wrapper`} data-open={isOpen}>
      
      {/* Header (Logo + Toggle) */}
      <header className="staggered-menu-header">
        <div className="sm-logo">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
              className="logo-text text-xl font-serif font-bold tracking-tight relative z-50 text-petrol-base transition-colors duration-300"
            >
                V<span className="text-petrol-accent">.</span>
            </a>
        </div>
        
        <button className="sm-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <div className="sm-toggle-textWrap hidden md:block">
             <div className="sm-toggle-textInner">
                <span className="sm-toggle-line">Menu</span>
                <span className="sm-toggle-line">Fechar</span>
             </div>
          </div>
          <div className="sm-icon">
             {isOpen ? <X size={18} /> : <Menu size={18} />}
          </div>
        </button>
      </header>

      {/* Backdrop (Darkens the rest of the site) */}
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
             {/* Decorative Prelayer */}
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
                <div className="sm-panel-inner">
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

                   <div className="sm-socials">
                      <MotionDiv 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.6, duration: 0.5 }}
                      >
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2 block">Conecte-se</span>
                          <div className="sm-socials-list">
                             {socialItems.map((social, i) => (
                                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                                   {social.label}
                                </a>
                             ))}
                          </div>
                      </MotionDiv>
                   </div>
                </div>
             </MotionNav>
           </>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default StaggeredMenu;