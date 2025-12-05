import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      );
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

  // Hide custom cursor on mobile/touch devices via CSS media query check in JS
  const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  };

  if (isTouchDevice()) return null;

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)` 
      }}
    >
      <div 
        className={`bg-white rounded-full transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? 'w-8 h-8 opacity-50' : 'w-4 h-4 opacity-100'
        }`}
      />
    </div>
  );
};

export default Cursor;