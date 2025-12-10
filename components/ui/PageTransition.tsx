
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
    // UX FIX: If it's an anchor link on the same page, just scroll nicely.
    // Don't use the curtain effect as it disorients the user.
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { 
            duration: 1.5, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Match main lenis easing
          });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    if (isAnimating) return;
    setTargetHref(href);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating && targetHref) {
      // Duração aumentada para sincronizar com a animação da cortina
      // O timeout espera o 'enter' (cortina cobrir a tela) terminar
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
        
        // Pequeno atraso extra antes de iniciar a saída para garantir que o scroll completou visualmente
        setTimeout(() => {
           setIsAnimating(false);
           setTargetHref(null);
        }, 100);

      }, 750); // ~0.75s para cobrir a tela antes de mudar o scroll

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
            transition={{ 
                duration: 0.9, // Mais lento e suave
                ease: [0.76, 0, 0.24, 1] // Quart ease
            }}
            className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center pointer-events-none"
          >
            <MotionDiv
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -30 }}
               transition={{ delay: 0.3, duration: 0.5 }}
            >
               <span className="text-white font-serif text-4xl font-bold tracking-tight">V.</span>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
