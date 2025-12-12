import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  socialItems: SocialItem[];
  onNavClick: (href: string) => void;
  activeSection?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  socialItems, 
  onNavClick, 
  activeSection 
}) => {

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    onNavClick(href);
  };

  return (
    <div className={`staggered-menu-wrapper fixed top-0 left-0 w-full h-full pointer-events-none z-[9990] ${isOpen ? 'pointer-events-auto' : ''}`}>
      
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 cursor-pointer"
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
                className="absolute top-0 right-0 h-full w-full md:w-[600px] bg-[#153A48] z-35 pointer-events-none"
             />

             {/* Main Menu Panel */}
             <MotionNav 
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 right-0 h-full w-full md:w-[600px] bg-[#0B232E] flex flex-col z-40 shadow-2xl border-l border-white/10"
             >
                {/* Content Container - Flex column to handle height gracefully */}
                <div className="flex flex-col h-full pt-32 pb-12 px-8 md:px-16 overflow-y-auto custom-scrollbar">
                   
                   <div className="flex-1 flex flex-col justify-center min-h-max">
                       <ul className="flex flex-col gap-2 md:gap-4 counter-reset-list" style={{ counterReset: 'smItem' }}>
                          {items.map((item, i) => (
                             <li key={i} className="overflow-hidden relative group">
                                 <MotionA 
                                   href={item.link}
                                   onClick={(e: any) => { e.preventDefault(); handleLinkClick(item.link); }}
                                   className={`block relative font-serif font-medium leading-[1.0] transition-colors duration-300 no-underline ${activeSection === item.link.replace('#', '') ? 'text-white' : 'text-white/40 hover:text-white'}`}
                                   // Giant fonts logic
                                   style={{ fontSize: 'clamp(3rem, 6vh, 5rem)' }}
                                   initial={{ y: "100%" }}
                                   animate={{ y: "0%" }}
                                   transition={{ delay: 0.3 + (i * 0.1), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                 >
                                    <span className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 text-sm font-mono text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                       {(i + 1).toString().padStart(2, '0')}
                                    </span>
                                    {item.label}
                                 </MotionA>
                             </li>
                          ))}
                       </ul>

                       <MotionDiv 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="mt-12 border-t border-white/10 pt-8 shrink-0"
                       >
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 block">Social</span>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                             {socialItems.map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                                >
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