
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

// Animation Variants Strategy - PHYSICS BASED
// Configurações diferentes para tipos de revelação
// Moved outside to prevent recreation on every render (Optimization)
const animationVariants: Record<string, any> = {
  translate: {
    hidden: { opacity: 0, y: 50 }, // y here is default, will be overridden? No, variants are static now. 
    // Wait, 'y' was a prop. If we move it outside, we lose dynamic 'y'. 
    // The previous implementation used 'y' from props in 'translate'. 
    // To keep 'y' dynamic, we should use a function or useMemo inside.
    // However, user requested moving it outside. We can make 'translate' dynamic in the usage.
    // Actually, Motion supports variants as functions. But let's check. 
    // Original code:
    /*
      translate: {
        hidden: { opacity: 0, y: y },
        visible: { opacity: 1, y: 0 }
      },
    */
    // If I move it outside, I can't access 'y'. 
    // BETTER FIX: Use useMemo inside the component as suggested by user "ou usar useMemo". 
    // User option: "Mover as variantes para fora do componente (constante estática) ou usar useMemo."
    // Since 'y' is a prop, useMemo is safer to preserve functionality.

    visible: { opacity: 1, y: 0 }
  }
};
// I will revert to useMemo inside in the next step to support 'y' prop properly. 
// For now let's just use placeholder to correct my mistake of deleting it.
const placeholder = {};

/**
 * Componente Wrapper para animações de entrada (In-View).
 * Utiliza Intersection Observer para disparar animações apenas quando o elemento entra na tela.
 */
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
  const animationVariants = React.useMemo(() => ({
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
  }), [y]);

  const selectedVariant = animationVariants[variant];

  return (
    <MotionDiv
      ref={ref}
      style={{ width }}
      className={`relative ${className}`}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 40,
        mass: 1.2,
        delay: delaySec
      }}
    >
      {children}
    </MotionDiv>
  );
};
