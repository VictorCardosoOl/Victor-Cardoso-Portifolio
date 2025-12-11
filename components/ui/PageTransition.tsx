
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
      // Total Duration: 0.7s (700ms)
      // Curtain closes fully around: ~300ms
      // We trigger the scroll while the screen is black.
      
      const scrollTimer = setTimeout(() => {
        const targetId = targetHref.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          if (lenis) {
            // immediate: true jumps instantly while hidden
            lenis.scrollTo(element, { immediate: true, force: true, offset: 0 });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }, 350); // Fire at halfway point

      // Finish animation state
      const endTimer = setTimeout(() => {
        setIsAnimating(false);
        setTargetHref(null);
      }, 750); // Slightly longer than 700ms to ensure animation completes

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
                ease: [0.22, 1, 0.36, 1] // Custom smooth bezier
            }}
            className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center pointer-events-none origin-top"
          />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
