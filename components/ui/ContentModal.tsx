import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenis } from '../ScrollContext';
import Lenis from 'lenis';
import Magnetic from './Magnetic';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  layoutId?: string;
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
  const mainLenis = useLenis();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs para o Scroll Dedicado do Modal
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const scopedLenisRef = useRef<Lenis | null>(null);

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

  // --- CORREÇÃO DO SCROLL ---
  useEffect(() => {
    if (isOpen) {
      // 1. Parar o scroll da página principal
      mainLenis?.stop();
      document.body.style.overflow = 'hidden';

      // 2. Iniciar Lenis Dedicado para o Modal
      // Pequeno timeout para garantir que o DOM foi renderizado pelo Framer Motion
      const timer = setTimeout(() => {
        if (modalContainerRef.current && modalContentRef.current) {
            
            const scopedLenis = new Lenis({
                wrapper: modalContainerRef.current, // Container com altura fixa e overflow
                content: modalContentRef.current,   // Conteúdo que rola
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            scopedLenisRef.current = scopedLenis;

            function raf(time: number) {
                scopedLenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
      }, 300); // Aguarda a animação de entrada

      return () => {
        clearTimeout(timer);
        scopedLenisRef.current?.destroy();
      };

    } else {
      // Retomar scroll principal
      mainLenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      mainLenis?.start();
      document.body.style.overflow = '';
      scopedLenisRef.current?.destroy();
    };
  }, [isOpen, mainLenis]);

  // Tecla ESC
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-[#0B232E]/90 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Sheet */}
          <motion.div
            layoutId={layoutId ? `modal-container-${layoutId}` : undefined}
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
              w-full bg-[#F2F4F6] shadow-2xl overflow-hidden flex flex-col
              ${isMobile ? 'h-[100dvh] rounded-none' : 'h-[98vh] rounded-t-[2rem] max-w-[96vw] mx-auto'}
            `}
          >
            {/* Header Flutuante */}
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex items-start justify-end pointer-events-none">
               <div className="pointer-events-auto">
                <Magnetic strength={0.3}>
                    <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#0B232E] flex items-center justify-center transition-all duration-300 shadow-lg group"
                    >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </Magnetic>
               </div>
            </div>

            {/* 
                WRAPPER DO SCROLL (Lenis) 
                - overflow-y-auto necessário para fallback
                - data-lenis-prevent impede conflito com scroll principal
            */}
            <div 
              ref={modalContainerRef}
              className="flex-grow h-full w-full overflow-y-auto relative bg-[#F2F4F6]"
              data-lenis-prevent 
            >
               {/* CONTEÚDO SCROLLÁVEL */}
               <div ref={modalContentRef} className="will-change-transform">
                   {/* Repassar layoutId para transições suaves */}
                   {React.Children.map(children, child => {
                      if (React.isValidElement(child)) {
                          return React.cloneElement(child as any, { layoutId });
                      }
                      return child;
                   })}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContentModal;