import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(ScrollContext);
// Also export as useScroll for backwards compatibility if needed, but prefer useLenis
export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Locomotive-like feel: Heavy inertia, smooth stop
    const lenisInstance = new Lenis({
      duration: 1.5, // Increased duration for smoother/heavier feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
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