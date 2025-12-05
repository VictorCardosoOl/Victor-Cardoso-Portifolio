import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  project: any;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, project, currentIndex, onClose, onNext, onPrev 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
             <span className="text-slate-900 text-xs uppercase tracking-widest font-bold ml-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {currentIndex + 1} / {project.gallery.length}
             </span>
             <button 
                onClick={onClose} 
                className="pointer-events-auto bg-white hover:bg-slate-50 text-slate-900 p-3 rounded-full border border-slate-200 shadow-sm transition-transform hover:rotate-90"
             > 
                <X size={20} /> 
             </button>
          </div>

          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="hidden md:flex absolute left-8 bg-white hover:bg-slate-50 text-slate-900 p-6 rounded-full border border-slate-100 shadow-xl z-50 transition-transform hover:scale-110"> 
             <ChevronLeft size={24} strokeWidth={1.5} /> 
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="hidden md:flex absolute right-8 bg-white hover:bg-slate-50 text-slate-900 p-6 rounded-full border border-slate-100 shadow-xl z-50 transition-transform hover:scale-110"> 
             <ChevronRight size={24} strokeWidth={1.5} /> 
          </button>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full h-full p-4 md:p-12 flex items-center justify-center pointer-events-none"
          >
             <img 
                src={project.gallery[currentIndex]} 
                alt="" 
                className="pointer-events-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none" 
                onClick={(e) => e.stopPropagation()} 
             />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};