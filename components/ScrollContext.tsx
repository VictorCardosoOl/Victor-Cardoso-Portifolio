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
      duration: 1.0, // Reduced from 1.5 to 1.0 for more direct control
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for finer control
      touchMultiplier: 1.5, // Less sensitive on touch
    });

    setLenis(lenisInstance);

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenis}>
      {children}
    </ScrollContext.Provider>
  );
};