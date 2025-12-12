import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useLenis } from '../ScrollContext';
import Magnetic from './Magnetic';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  layoutId?: string; // New prop for layout transition
  children: React.ReactNode;
}

const ContentModal: React.FC<ContentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  category, 
  layoutId,
  children 
}) => {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      setMounted(false);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll Locking Logic
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, lenis]);

  // Keyboard support
  useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 200) {
      onClose();
    }
  };

  if (!mounted) return null;

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
            className="fixed inset-0 z-[9998] bg-slate-950/60 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Sheet */}
          <motion.div
            layoutId={layoutId ? `modal-container` : undefined} // Optional container layout
            initial={{ y: "100%" }}
            animate={{ y: isMobile ? "0%" : "2%" }} 
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={handleDragEnd}
            className={`
              fixed left-0 right-0 bottom-0 z-[9999] 
              w-full bg-slate-50 shadow-2xl overflow-hidden flex flex-col
              ${isMobile ? 'h-[100dvh] rounded-none' : 'h-[96vh] rounded-t-[2.5rem] max-w-[96vw] mx-auto border-t border-white/20'}
            `}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-xl z-40 sticky top-0">
              <div className="flex flex-col pr-8">
                 {category && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1"
                    >
                      {category}
                    </motion.span>
                 )}
                 {title && (
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg md:text-2xl font-serif font-medium text-slate-900 leading-none truncate max-w-[200px] md:max-w-2xl"
                    >
                      {title}
                    </motion.h2>
                 )}
              </div>
              
              <Magnetic strength={0.3}>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 shrink-0"
                >
                  {isMobile ? <ChevronDown size={24} /> : <X size={20} />}
                </button>
              </Magnetic>
            </div>

            {/* Content with layoutId passed down to image via context or children if needed */}
            <div 
              className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50 pb-20 md:pb-32"
              data-lenis-prevent
            >
               {/* Note: The image inside children (ProjectDetailContent) should match layoutId if we want the image itself to morph perfectly. 
                   For now, we rely on the modal slide-up, but if ProjectDetailContent accepts layoutId, pass it.
                   Assuming we updated ProjectDetailContent to handle the layoutId if passed or we just animate the container.
               */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.5 }}
               >
                 {/* 
                    Inject layoutId into the first image of children if possible, 
                    or wrap children in a way that respects it. 
                    Since children is opaque here, we usually need to modify ProjectDetailContent.
                    However, simply having the modal animate up is often enough "shared layout" feel for the container.
                    To strictly satisfy "image expand", we would need to pass layoutId to ProjectDetailContent.
                 */}
                 {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as any, { layoutId });
                    }
                    return child;
                 })}
               </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContentModal;