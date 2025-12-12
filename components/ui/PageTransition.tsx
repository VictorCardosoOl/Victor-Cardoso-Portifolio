import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../ScrollContext';

const MotionDiv = motion.div as any;

interface PageTransitionContextType {
  transitionTo: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    return { 
      transitionTo: (href: string) => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
  return context;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const lenis = useLenis();

  const transitionTo = (href: string) => {
    if (isAnimating || href === targetHref) return;
    setTargetHref(href);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating && targetHref) {
      
      const scrollTimer = setTimeout(() => {
        const targetId = targetHref.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { immediate: true, force: true, offset: 0 });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }, 350); 

      const endTimer = setTimeout(() => {
        setIsAnimating(false);
        setTargetHref(null);
      }, 750); 

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isAnimating, targetHref, lenis]);

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
      <AnimatePresence mode="wait">
        {isAnimating && (
          <MotionDiv
            key="page-transition-curtain"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{ originY: isAnimating ? 0 : 1 }} 
            transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1] 
            }}
            className="fixed inset-0 z-[99999] bg-[#0F2A36] flex items-center justify-center pointer-events-none origin-top"
          >
             {/* Optional Logo during transition */}
             <div className="text-white font-serif text-3xl font-bold opacity-20">V.</div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};