
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

  // Scroll Locking & Escape Key
  useEffect(() => {
    if (isOpen) {
      // 1. Stop main page scroll
      lenis?.stop();
      
      // 2. Lock body overflow to prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        // Cleanup: Resume main page scroll
        lenis?.start();
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [isOpen, lenis, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Darken background) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: window.innerWidth < 768 ? "0%" : "2%" }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300, 
              mass: 0.8 
            }}
            className="fixed inset-x-0 bottom-0 z-[100] h-[100vh] md:h-[98vh] bg-slate-50 rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-5 md:px-12 md:py-6 flex items-center justify-between border-b border-slate-200 bg-white/50 backdrop-blur-xl z-20 sticky top-0">
              <div className="flex flex-col">
                 {category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      {category}
                    </span>
                 )}
                 {title && (
                    <h2 className="text-xl md:text-2xl font-serif font-medium text-slate-900 leading-none">
                      {title}
                    </h2>
                 )}
              </div>
              
              <Magnetic strength={0.3}>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <X size={20} />
                </button>
              </Magnetic>
            </div>

            {/* Scrollable Content Body */}
            {/* data-lenis-prevent attribute ensures Lenis doesn't hijack scroll inside this container */}
            <div 
              className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50 overscroll-contain"
              data-lenis-prevent="true" 
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
