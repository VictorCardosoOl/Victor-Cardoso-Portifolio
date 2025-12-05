import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, width = "fit-content" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  const transitionDelay = `${delay}ms`;

  return (
    <div ref={ref} style={{ width }} className="relative">
      <div 
        className={`transition-all duration-1000 ease-out-expo transform ${
          isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-sm'
        }`}
        style={{ transitionDelay }}
      >
        {children}
      </div>
    </div>
  );
};