
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lógica de Travamento de Scroll Robusta
  useEffect(() => {
    if (isOpen) {
      // 1. Parar Lenis
      lenis?.stop();
      
      // 2. Prevenir Scroll Nativo e Layout Shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; 
    } else {
      lenis?.start();
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      lenis?.start();
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen, lenis]);

  // Fechar com ESC
  useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  // Render via Portal no body para garantir z-index máximo
  return createPortal(
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
            className="fixed inset-0 z-[9998] bg-slate-950/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Painel do Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200, mass: 1 }}
            className="fixed inset-x-0 bottom-0 z-[9999] h-[95vh] md:h-[98vh] bg-slate-50 rounded-t-[2rem] md:rounded-t-[3rem] shadow-2xl overflow-hidden flex flex-col border-t border-white/10"
          >
            {/* Header Sticky dentro do Modal */}
            <div className="flex-shrink-0 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl z-20 sticky top-0">
              <div className="flex flex-col">
                 {category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      {category}
                    </span>
                 )}
                 <h2 className="text-lg md:text-2xl font-serif font-medium text-slate-900 leading-none truncate max-w-[200px] md:max-w-md">
                   {title || 'Detalhes do Projeto'}
                 </h2>
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

            {/* Corpo com Scroll Independente */}
            <div 
              className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50 pb-20"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()} 
              onTouchMove={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain' }}
            >
               {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContentModal;
