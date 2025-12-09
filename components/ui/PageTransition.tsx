
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
    // Fallback allows navigation even without provider
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
    if (isAnimating) return;
    setTargetHref(href);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating && targetHref) {
      // 1. Wait for curtain to fully cover screen (0.8s enter duration)
      const scrollTimer = setTimeout(() => {
        const targetId = targetHref.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          // 2. Scroll instantly while hidden behind the curtain
          if (lenis) {
            lenis.scrollTo(element, { immediate: true, force: true, offset: 0 });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
        
        // 3. Trigger exit animation (reveal) by resetting state
        setIsAnimating(false);
        setTargetHref(null);
      }, 900); // Slightly longer than animation to ensure coverage

      return () => clearTimeout(scrollTimer);
    }
  }, [isAnimating, targetHref, lenis]);

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
      <AnimatePresence>
        {isAnimating && (
          <MotionDiv
            key="page-transition-curtain"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }} // Heavy cinematic easing
            className="fixed inset-0 z-[10000] bg-slate-950 flex items-center justify-center pointer-events-none"
          >
            {/* Brand Mark centered during transition */}
            <MotionDiv
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               transition={{ delay: 0.3, duration: 0.5 }}
            >
               <span className="text-white font-serif text-5xl font-bold tracking-tighter">V<span className="text-indigo-500">.</span></span>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
