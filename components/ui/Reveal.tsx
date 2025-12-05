import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, width = "fit-content" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // A11y: Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    // Fallback: If observer fails or takes too long, show content after 500ms
    const timeout = setTimeout(() => setIsVisible(true), 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // If reduced motion is requested, render without animation styles
  if (prefersReducedMotion) {
    return <div style={{ width }}>{children}</div>;
  }

  const transitionDelay = `${delay}ms`;

  return (
    <div ref={ref} style={{ width }} className="relative overflow-hidden">
      <div 
        className={`transition-all duration-1000 ease-out-expo transform will-change-transform ${
          isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-sm'
        }`}
        style={{ transitionDelay }}
      >
        {children}
      </div>
    </div>
  );
};