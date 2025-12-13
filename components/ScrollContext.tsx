import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(ScrollContext);
// Also export as useScroll for backwards compatibility if needed, but prefer useLenis
export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Configuração "Cinematic/Premium"
    // Mudamos de Exponential para Quartic Out para uma desaceleração mais natural e física.
    const lenisInstance = new Lenis({
      duration: 1.2, // Um pouco mais rápido que 1.5s para não parecer "laggy", mas ainda suave.
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // Easing Quartic Out: Arrancada rápida, parada muito suave.
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // Reduzido levemente para dar "peso" ao scroll (sensação de luxo).
      touchMultiplier: 1.5, // Ajustado para evitar scroll excessivo em mobile.
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  );
};