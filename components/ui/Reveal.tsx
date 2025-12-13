
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const MotionDiv = motion.div as any;

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // in ms
  duration?: number; // Ignorado se usar Spring, mantido para retrocompatibilidade
  y?: number;
  className?: string;
  variant?: 'translate' | 'scale' | 'blur';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  y = 50,
  className = "",
  variant = 'translate'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" }); 
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const delaySec = delay / 1000;

  if (prefersReducedMotion) {
    return <div className={className} style={{ width }}>{children}</div>;
  }

  // Animation Variants Strategy - PHYSICS BASED
  const animationVariants: Record<string, any> = {
    translate: {
      hidden: { opacity: 0, y: y },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.94, filter: "blur(4px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)", scale: 1.05 },
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
          // PHYSICS CONFIG
          // type: "spring" simula física real.
          // stiffness: quão rígida é a "mola" (menor = mais lento/pesado).
          // damping: fricção (maior = para mais suavemente sem quicar).
          // mass: peso do objeto (maior = mais inércia).
          type: "spring",
          stiffness: 90, 
          damping: 40,   
          mass: 1.2,
          delay: delaySec 
        }}
      >
        {children}
      </MotionDiv>
    </div>
  );
};
