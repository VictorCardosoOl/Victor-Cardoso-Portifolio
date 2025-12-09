
import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionContextType {
  transitionTo: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    // Fallback allows navigation even without provider (e.g. testing)
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

  const transitionTo = (href: string) => {
    if (isAnimating || href === '#') return;
    setTargetHref(href);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating && targetHref) {
      // 1. Wait for curtain to fully cover screen (matches duration of enter animation)
      const scrollTimer = setTimeout(() => {
        const targetId = targetHref.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          // 2. Scroll instantly while hidden
          element.scrollIntoView({ behavior: 'auto' });
        }
        
        // 3. Trigger exit animation (reveal)
        setIsAnimating(false);
        setTargetHref(null);
      }, 800); // 0.8s matches the animation duration

      return () => clearTimeout(scrollTimer);
    }
  }, [isAnimating, targetHref]);

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="page-transition-curtain"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center pointer-events-none"
          >
            {/* Optional: Branding or Loader during transition */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ delay: 0.2, duration: 0.4 }}
            >
               <span className="text-white font-serif text-2xl tracking-tight">V.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
