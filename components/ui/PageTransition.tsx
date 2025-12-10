
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
    // FIX: Se for link interno (#), apenas scrolla suavemente sem cortina.
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { 
            duration: 1.5, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
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
      // Ajuste de Timing: 
      // A cortina leva ~0.7s para cobrir a tela (duration no AnimatePresence)
      // Esperamos 0.75s para garantir cobertura total antes de mover o scroll.
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
        
        // Mantém a tela coberta por mais 0.2s antes de revelar a nova seção
        setTimeout(() => {
           setIsAnimating(false);
           setTargetHref(null);
        }, 200);

      }, 750); // Sincronizado com a animação da cortina (0.7s + buffer)

      return () => clearTimeout(scrollTimer);
    }
  }, [isAnimating, targetHref, lenis]);

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
      <AnimatePresence mode="wait">
        {isAnimating && (
          <MotionDiv
            key="page-transition-curtain"
            initial={{ clipPath: "inset(100% 0 0 0)" }} // Começa invisível (em baixo)
            animate={{ clipPath: "inset(0% 0 0 0)" }}   // Cobre a tela
            exit={{ clipPath: "inset(0 0 100% 0)" }}    // Sai por cima
            transition={{ 
                duration: 0.7, // Duração de 0.7s conforme solicitado
                ease: [0.76, 0, 0.24, 1] // Ease suave (Expo)
            }}
            className="fixed inset-0 z-[99999] bg-slate-950 flex items-center justify-center pointer-events-none"
          >
            <MotionDiv
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ delay: 0.2, duration: 0.4 }}
            >
               <span className="text-white font-serif text-4xl font-bold tracking-tight">V.</span>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
