
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, ArrowRight, Clock, Trophy } from 'lucide-react';
import Button from './ui/Button';
import { useGamification, Rank } from './GamificationContext';

// --- Laurel Wreath SVG Component ---
const Laurels = ({ rank, className }: { rank: Rank; className?: string }) => {
  const colors = {
    Bronze: '#cd7f32', // Bronze
    Prata: '#94a3b8', // Slate-400 equivalent for silver
    Ouro: '#fbbf24',  // Amber-400
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      stroke={colors[rank]} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
       <motion.path 
         initial={{ pathLength: 0 }} 
         animate={{ pathLength: 1 }} 
         transition={{ duration: 1.5, ease: "easeOut" }}
         d="M 50 85 C 30 85 10 65 10 40 C 10 25 20 10 35 5" 
       />
       <motion.path 
         initial={{ pathLength: 0 }} 
         animate={{ pathLength: 1 }} 
         transition={{ duration: 1.5, ease: "easeOut" }}
         d="M 50 85 C 70 85 90 65 90 40 C 90 25 80 10 65 5" 
       />
       {/* Center Star/Gem based on rank */}
       {rank === 'Ouro' && (
         <motion.circle 
           initial={{ scale: 0 }} 
           animate={{ scale: 1 }} 
           transition={{ delay: 1 }} 
           cx="50" cy="20" r="4" fill={colors[rank]} stroke="none" 
         />
       )}
    </svg>
  );
};

const Gamification: React.FC = () => {
  const { 
    level, 
    rank, 
    xp, 
    quests, 
    notification, 
    completeQuest, 
    sectionTimes, 
    totalTime 
  } = useGamification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFooterPopup, setShowFooterPopup] = useState(false);

  // --- Global Event Listeners (Triggers) ---
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

      if (target.closest('#projects') && (button || link)) {
         completeQuest('click_project');
      }
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

  // Footer Trigger
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const completedCount = quests.filter(q => q.completed).length;
        if (completedCount < quests.length) {
          setShowFooterPopup(true);
        }
      } else {
        setShowFooterPopup(false);
      }
    }, { threshold: 0.2 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [quests]);

  // --- Visual Helpers ---
  const rankColors = {
    Bronze: 'border-amber-700/50 text-amber-600 bg-amber-50',
    Prata: 'border-slate-300 text-slate-500 bg-slate-50',
    Ouro: 'border-yellow-400 text-yellow-600 bg-yellow-50',
  };

  const missingQuests = quests.filter(q => !q.completed);
  const progressPercent = Math.round((quests.filter(q => q.completed).length / quests.length) * 100);

  return (
    <>
      {/* 1. The Badge (Top Right) */}
      <div className="fixed top-24 right-4 md:right-12 z-40">
        <button 
          onClick={() => setIsModalOpen(true)}
          className={`group relative flex items-center gap-3 pl-2 pr-5 py-2 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-500 hover:scale-105 border ${
             rank === 'Ouro' ? 'bg-slate-900/90 border-yellow-500/50' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
             <Laurels rank={rank} className="absolute inset-0 w-full h-full scale-125" />
             <span className={`text-xs font-serif font-bold ${rank === 'Ouro' ? 'text-yellow-400' : 'text-slate-700'}`}>
               {level}
             </span>
          </div>
          <div className="flex flex-col items-start">
             <span className={`text-[10px] uppercase font-bold tracking-widest leading-none mb-1 ${rank === 'Ouro' ? 'text-slate-400' : 'text-slate-400'}`}>
               Rank Atual
             </span>
             <span className={`text-sm font-serif font-bold leading-none ${rank === 'Ouro' ? 'text-white' : 'text-slate-900'}`}>
               {rank}
             </span>
          </div>
        </button>
      </div>

      {/* 2. Notification (Elegant Card) */}
      <AnimatePresence>
        {notification && notification.visible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-40 right-4 md:right-12 z-[60] w-72 pointer-events-none"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl text-white p-4 rounded-xl shadow-2xl border border-yellow-500/40 relative overflow-hidden">
               {/* Shine Effect */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
               
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-400">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-yellow-500/80 mb-0.5">Nova Conquista</span>
                    <p className="text-sm font-serif font-medium leading-tight">{notification.message}</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal (Session Certificate) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
            >
               {/* Header Area */}
               <div className="bg-slate-50 p-8 text-center border-b border-slate-100 relative">
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
                     <X size={24} />
                  </button>
                  
                  <div className="mb-4 inline-block relative">
                     <Laurels rank={rank} className="w-24 h-24 mx-auto" />
                     <div className="absolute inset-0 flex items-center justify-center pt-2">
                        <span className="text-3xl font-serif font-bold text-slate-900">{level}</span>
                     </div>
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">Status: {rank}</h2>
                  <p className="text-slate-500 text-sm font-light">
                     Sessão Atual • {Math.floor(Number(totalTime) / 60)}m {Number(totalTime) % 60}s
                  </p>
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                  <div className="p-4 text-center">
                     <span className="block text-2xl font-bold text-slate-900">{xp}</span>
                     <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Total XP</span>
                  </div>
                  <div className="p-4 text-center">
                     <span className="block text-2xl font-bold text-slate-900">{progressPercent}%</span>
                     <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Progresso</span>
                  </div>
               </div>

               {/* Content */}
               <div className="p-8 max-h-[300px] overflow-y-auto">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Map size={14} /> Jornada da Sessão
                  </h3>
                  
                  <div className="space-y-3">
                     {quests.map(quest => (
                        <div key={quest.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                           quest.completed ? 'bg-green-50/50 border-green-100 opacity-100' : 'bg-white border-slate-100 opacity-60'
                        }`}>
                           <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                 quest.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'
                              }`}>
                                 {quest.completed && <Trophy size={10} />}
                              </div>
                              <span className={`text-sm font-medium ${quest.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                                 {quest.label}
                              </span>
                           </div>
                           <span className="text-xs font-bold text-slate-300">+{quest.xp}</span>
                        </div>
                     ))}
                  </div>

                  {/* Most Visited Section Info (Debug/Fun Info) */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                       <Clock size={14} /> Foco de Atenção
                     </h3>
                     <div className="flex flex-wrap gap-2">
                        {Object.entries(sectionTimes)
                           .sort(([,a], [,b]) => (b as number) - (a as number)) // Sort by time desc
                           .slice(0, 3)
                           .map(([section, time]) => (
                              <span key={section} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                                 {section}: {time}s
                              </span>
                           ))}
                     </div>
                  </div>
               </div>

               {progressPercent < 100 && (
                  <div className="p-6 pt-0">
                     <Button onClick={() => setIsModalOpen(false)} className="w-full justify-center">Continuar Explorando</Button>
                  </div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Footer Pop-up */}
      <AnimatePresence>
         {showFooterPopup && !isModalOpen && (
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 50, opacity: 0 }}
               className="fixed bottom-8 right-8 z-50 w-80"
            >
               <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-200 ring-4 ring-slate-100">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sugestão</span>
                        <h4 className="font-serif text-lg font-bold text-slate-900">Não vá ainda!</h4>
                     </div>
                     <button onClick={() => setShowFooterPopup(false)} className="text-slate-400 hover:text-slate-900">
                        <X size={16} />
                     </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 mb-4">
                     Faltam apenas {missingQuests.length} itens para o Rank Ouro. Veja o que você perdeu:
                  </p>

                  <div className="space-y-2">
                     {missingQuests.slice(0, 2).map(q => (
                        <a 
                           key={q.id}
                           href={q.link || '#'}
                           onClick={() => setShowFooterPopup(false)}
                           className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                        >
                           <span className="text-xs font-bold text-slate-700">{q.label}</span>
                           <ArrowRight size={12} className="text-slate-400 group-hover:text-slate-900" />
                        </a>
                     ))}
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
};

export default Gamification;
