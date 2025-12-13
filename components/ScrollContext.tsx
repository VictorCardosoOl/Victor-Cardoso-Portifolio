
import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(ScrollContext);
// Also export as useScroll for backwards compatibility if needed, but prefer useLenis
export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Configuração "Heavy Luxury / Cinematic"
    // O objetivo é criar uma sensação de massa e inércia.
    const lenisInstance = new Lenis({
      duration: 1.8, // Aumentado significativamente para criar inércia longa (drift)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out: Arrancada suave, parada muito lenta.
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduzido para dar sensação de "peso" (precisa girar mais para mover a massa)
      touchMultiplier: 1.5,
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
