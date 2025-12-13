
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const MotionDiv = motion.div as any;

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // in ms
  duration?: number;
  y?: number;
  className?: string;
  variant?: 'translate' | 'scale' | 'blur';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  duration = 0.8, // Aumentado levemente para dar tempo da física acontecer
  y = 40, // Aumentado para um movimento mais dramático
  className = "",
  variant = 'translate'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" }); // Margin ajustada para disparar um pouco depois
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Convert ms to s for framer-motion
  const delaySec = delay / 1000;

  if (prefersReducedMotion) {
    return <div className={className} style={{ width }}>{children}</div>;
  }

  // Animation Variants Strategy - REFINED PHYSICS
  const animationVariants: Record<string, any> = {
    translate: {
      hidden: { opacity: 0, y: y },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)", scale: 1.05 },
      visible: { opacity: 1, filter: "blur(0px)", scale: 1 }
    }
  };

  const selectedVariant = animationVariants[variant];

  return (
    <div ref={ref} style={{ width }} className={`relative ${className}`}>
      <MotionDiv
        variants={selectedVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          duration, 
          delay: delaySec, 
          // CURVA "LUXURY" - Saída suave e pesada.
          // Começa rápido e desacelera elegantemente.
          ease: [0.25, 1, 0.5, 1] 
        }}
      >
        {children}
      </MotionDiv>
    </div>
  );
};
