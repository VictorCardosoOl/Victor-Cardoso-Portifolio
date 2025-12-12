import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Target, ArrowUpRight } from 'lucide-react';
import { useGamification } from './GamificationContext';

const MotionDiv = motion.div as any;

const Gamification: React.FC = () => {
  const { 
    quests, 
    completeQuest, 
    sectionTimes, 
    totalTime,
  } = useGamification();

  const [showManifest, setShowManifest] = useState(false);
  const [hasShownManifest, setHasShownManifest] = useState(false);

  // --- Silent Tracking Logic ---
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');

      if (link) {
        const href = link.getAttribute('href') || '';
        if (href.includes('github.com') || href.includes('#lab')) completeQuest('click_github');
        if (href.includes('#contact') || href.includes('mailto:') || href.includes('wa.me')) completeQuest('click_contact');
      }
      if (target.closest('#projects') && (button || link)) completeQuest('click_project');
    };

    const handleScroll = () => {
       if (window.scrollY > 150) completeQuest('scroll_hero');
       const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
       if (scrollPercent > 0.6) completeQuest('scroll_deep');
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [completeQuest]);

  // --- Strict Footer Trigger for "Manifest" ---
  // Fix: Increased threshold buffer and added Math.ceil for better detection
  useEffect(() => {
    const handleScrollCheck = () => {
        if (hasShownManifest) return;

        const windowHeight = window.innerHeight;
        const scrollY = Math.ceil(window.scrollY); // Round up to avoid fractional pixel issues
        const totalHeight = document.documentElement.scrollHeight;
        
        // Threshold buffer (100px) allows for mobile address bars or minor layout shifts
        const isAtBottom = (windowHeight + scrollY) >= (totalHeight - 100);

        if (isAtBottom) {
             // Only show if session has been going on for a bit (e.g. 5 seconds) to avoid instant popups on refresh
             if (totalTime > 5) {
                 setShowManifest(true);
                 setHasShownManifest(true);
             }
        }
    };

    window.addEventListener('scroll', handleScrollCheck);
    return () => window.removeEventListener('scroll', handleScrollCheck);
  }, [hasShownManifest, totalTime]);


  // Data for Manifest
  const missingQuests = quests.filter(q => !q.completed && q.link);
  const topSection = Object.entries(sectionTimes).sort(([,a], [,b]) => (b as number) - (a as number))[0];

  return (
    <AnimatePresence>
      {showManifest && (
        <MotionDiv
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 right-0 md:right-8 z-50 w-full md:w-[380px] pointer-events-none"
        >
          {/* Manifest Card (Looks like a receipt) - Updated Colors to Paper/Petrol */}
          <div className="pointer-events-auto bg-[#F2F4F6] text-[#0B232E] rounded-t-xl md:rounded-t-xl border-t border-x border-petrol-base/10 shadow-[-10px_-10px_30px_rgba(11,35,46,0.15)] p-6 md:p-8 font-mono text-xs relative before:content-[''] before:absolute before:top-[-6px] before:left-0 before:w-full before:h-[6px] before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgMTIgNiI+PHBhdGggZD0iTTAgNmw2LTYgNiA2SCB6IiBmaWxsPSIjRjJGNEY2Ii8+PC9zdmc+')] before:repeat-x">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b border-petrol-base/10 pb-4 border-dashed">
                <div className="flex flex-col">
                    <span className="uppercase font-bold tracking-widest text-[10px] text-petrol-base/40">Sessão Finalizada</span>
                    <span className="text-lg font-bold mt-1">Manifesto de Visita</span>
                </div>
                <button 
                    onClick={() => setShowManifest(false)}
                    className="w-6 h-6 flex items-center justify-center hover:bg-petrol-base/5 rounded-full transition-colors"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <span className="block text-[9px] uppercase tracking-wider text-petrol-base/40 mb-1">Duração</span>
                    <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span className="font-bold">{Math.floor(totalTime / 60)}m {totalTime % 60}s</span>
                    </div>
                </div>
                <div>
                    <span className="block text-[9px] uppercase tracking-wider text-petrol-base/40 mb-1">Maior Interesse</span>
                    <div className="flex items-center gap-2">
                        <Target size={12} />
                        <span className="font-bold capitalize">{topSection ? topSection[0] : 'Geral'}</span>
                    </div>
                </div>
            </div>

            {/* "What you missed" section */}
            {missingQuests.length > 0 && (
                <div className="bg-white p-4 rounded-lg border border-petrol-base/5 mb-6">
                    <p className="text-[10px] uppercase tracking-wider text-petrol-base/40 mb-3">Você ainda não viu:</p>
                    <ul className="space-y-3">
                        {missingQuests.slice(0, 2).map(q => (
                            <li key={q.id}>
                                <a href={q.link} className="flex justify-between items-center group hover:bg-petrol-base/5 p-1 rounded transition-colors -mx-1">
                                    <span className="font-bold border-b border-petrol-base/20 group-hover:border-petrol-base transition-colors">{q.label}</span>
                                    <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* CTA */}
            <div className="text-center pt-2">
                <p className="italic text-petrol-base/50 mb-4">"O design é a inteligência tornada visível."</p>
                <a 
                    href="#contact" 
                    className="block w-full py-3 bg-[#0B232E] text-[#F2F4F6] text-center font-bold uppercase tracking-widest hover:bg-[#153A48] transition-colors"
                >
                    Iniciar Conversa
                </a>
                <div className="mt-4 flex justify-center">
                    <div className="w-32 h-8 overflow-hidden">
                       {/* Fake Barcode */}
                       <svg className="w-full h-full" preserveAspectRatio="none">
                           <pattern id="barcode" width="4" height="100%" patternUnits="userSpaceOnUse">
                               <rect width="2" height="100%" fill="#0B232E" />
                           </pattern>
                           <rect width="100%" height="100%" fill="url(#barcode)" />
                       </svg>
                    </div>
                </div>
            </div>

          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default Gamification;