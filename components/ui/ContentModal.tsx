
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from '../ScrollContext';
import Magnetic from './Magnetic';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  children: React.ReactNode;
}

const ContentModal: React.FC<ContentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  category, 
  children 
}) => {
  const lenis = useLenis();

  // Scroll Locking Logic (Robust)
  useEffect(() => {
    if (isOpen) {
      // 1. Pause Lenis (Global Smooth Scroll)
      lenis?.stop();
      // 2. Lock Body to prevent native scroll leakage
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  // Close on Escape
  useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[9990] bg-slate-950/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200, mass: 1 }}
            className="fixed inset-x-0 bottom-0 z-[9999] h-[100dvh] md:h-[98vh] bg-slate-50 md:rounded-t-[3rem] shadow-2xl overflow-hidden flex flex-col border-t border-white/10"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-5 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl z-20">
              <div className="flex flex-col">
                 {category && (
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      {category}
                    </span>
                 )}
                 <h2 className="text-base md:text-2xl font-serif font-medium text-slate-900 leading-none truncate max-w-[200px] md:max-w-md">
                   {title || 'Detalhes do Projeto'}
                 </h2>
              </div>
              
              <Magnetic strength={0.3}>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </Magnetic>
            </div>

            {/* Scrollable Body - ISOLATED SCROLL CONTEXT */}
            <div 
              className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50"
              data-lenis-prevent="true" // Lenis ignores wheel events here
              onWheel={(e) => e.stopPropagation()} // Stop propagation to parent
              onTouchMove={(e) => e.stopPropagation()} // Stop touch propagation
              style={{ overscrollBehavior: 'contain' }} // CSS property to prevent chain scrolling
            >
               {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
