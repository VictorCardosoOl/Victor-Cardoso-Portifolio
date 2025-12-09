import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position logic
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    
    // Add logic to detect clickable elements dynamically
    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, .cursor-hover');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return clickables;
    };

    const clickables = addListeners();

    // Re-run listener attachment on DOM mutations (for client-side routing/dynamic content)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide on mobile/touch devices via CSS media query usually, 
  // but returning null here if needed can be handled by hooks.
  // We'll rely on global CSS to hide default cursor and show this one only on pointer:fine.

  return (
    <>
      {/* Main Dot */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-slate-900 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ 
          x, 
          y, 
          translateX: '-50%', 
          translateY: '-50%',
          scale: isHovered ? 3.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
    </>
  );
};

export default Cursor;