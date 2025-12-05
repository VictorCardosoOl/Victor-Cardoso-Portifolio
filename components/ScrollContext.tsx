import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(ScrollContext);
// Also export as useScroll for backwards compatibility if needed, but prefer useLenis
export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
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