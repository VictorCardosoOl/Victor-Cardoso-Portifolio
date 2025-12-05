import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      const target = e.target as HTMLElement;
      // Check deeper in tree for links/buttons
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
        
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  };

  if (isTouchDevice()) return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      animate={{ 
        x: position.x - (isPointer ? 32 : 12),
        y: position.y - (isPointer ? 32 : 12),
        scale: isHidden ? 0 : 1,
        opacity: isHidden ? 0 : 1
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      <motion.div 
        className="bg-white rounded-full"
        animate={{ 
          width: isPointer ? 64 : 24, 
          height: isPointer ? 64 : 24,
          opacity: isPointer ? 0.3 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};

export default Cursor;