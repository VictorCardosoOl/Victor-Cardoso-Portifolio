import React, { createContext, useContext, useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

// Contexto para expor a instância do LocomotiveScroll globalmente
const ScrollContext = createContext<LocomotiveScroll | null>(null);

// Hook para acessar a instância do LocomotiveScroll.
export const useLocomotiveScroll = () => useContext(ScrollContext);

// Backwards compatibility alias
export const useLenis = useLocomotiveScroll;
export const useScroll = useLocomotiveScroll;

/**
 * Provider que envolve a aplicação para gerenciar o "Smooth Scroll".
 * Utiliza Locomotive Scroll v5.
 */
export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Inicialização do Locomotive Scroll
    // v5 é "native-friendly" e mais leve.
    const scrollInstance = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
        orientation: 'vertical',
        smoothWheel: true,
      }
    });

    setScroll(scrollInstance);

    // Cleanup
    return () => {
      scrollInstance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  );
};
