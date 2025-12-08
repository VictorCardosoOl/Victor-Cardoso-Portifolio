
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, ChevronRight, Sparkles, CheckCircle2, Lock, Flame, Clock, Trophy, Target } from 'lucide-react';
import Button from './ui/Button';
import { useGamification, Rank } from './GamificationContext';

// --- Visual Components ---

const Laurels = ({ rank, className }: { rank: Rank; className?: string }) => {
  const colors = {
    Bronze: '#cd7f32', // Bronze
    Prata: '#94a3b8', // Slate-400
    Ouro: '#eab308',  // Yellow-500
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      stroke={colors[rank]} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
       <motion.path 
         initial={{ pathLength: 0, opacity: 0 }} 
         animate={{ pathLength: 1, opacity: 1 }} 
         transition={{ duration: 1.5, ease: "easeOut" }}
         d="M 50 85 C 25 85 5 60 5 35 C 5 20 15 5 35 5" 
       />
       <motion.path 
         initial={{ pathLength: 0, opacity: 0 }} 
         animate={{ pathLength: 1, opacity: 1 }} 
         transition={{ duration: 1.5, ease: "easeOut" }}
         d="M 50 85 C 75 85 95 60 95 35 C 95 20 85 5 65 5" 
       />
       {/* Center Star for Gold */}
       {rank === 'Ouro' && (
         <motion.path
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            d="M 50 15 L 53 25 L 63 25 L 55 32 L 58 42 L 50 35 L 42 42 L 45 32 L 37 25 L 47 25 Z"
            fill={colors[rank]}
            stroke="none"
         />
       )}
    </svg>
  );
};

const HeatmapBar: React.FC<{ section: string; time: number; maxTime: number }> = ({ section, time, maxTime }) => {
    const percent = maxTime > 0 ? Math.min((time / maxTime) * 100, 100) : 0;
    
    return (
        <div className="w-full mb-3 last:mb-0 group">
            <div className="flex justify-between items-end mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-800 transition-colors">{section}</span>
                <span className="text-[10px] font-mono text-slate-400">{time}s</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="h-full bg-slate-800 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
            </div>
        </div>
    );
};

// --- Exportable Badge Component for Navbar ---

export const GamificationBadge: React.FC = () => {
  const { rank, level, quests, openModal } = useGamification();
  const completedQuests = quests.filter(q => q.completed);
  const progressPercent = Math.round((completedQuests.length / quests.length) * 100);

  // Styles based on rank
  const rankColor = rank === 'Ouro' ? 'text-yellow-600' : rank === 'Prata' ? 'text-slate-600' : 'text-amber-700';

  return (
      <button 
        onClick={openModal}
        className="group flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 outline-none"
        aria-label="Ver progresso de gamificação"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Minimal Laurels */}
            <Laurels rank={rank} className="absolute inset-0 scale-125" />
            
            {/* Level Number */}
            <span className={`text-[10px] font-serif font-bold ${rankColor} relative z-10`}>
              {level}
            </span>

            {/* Subtle Progress Ring indicator behind number */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-20" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" className={rankColor} />
            </svg>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 32 32">
                 <circle 
                   cx="16" cy="16" r="14" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="2" 
                   strokeDasharray={`${progressPercent} 100`}
                   className={rankColor} 
                   pathLength={100}
                 />
            </svg>
        </div>
        
        <div className="hidden sm:flex flex-col items-start leading-none">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Rank</span>
            <div className="flex items-center gap-1">
               <span className={`text-xs font-serif font-bold ${rankColor}`}>
                 {rank}
               </span>
               {rank === 'Ouro' && <Sparkles size={8} className="text-yellow-500" />}
            </div>
        </div>
      </button>
  );
};


// --- Main Layout Component (Modal & Notifications) ---

const Gamification: React.FC = () => {
  const { 
    level, 
    rank, 
    xp, 
    quests, 
    notification, 
    completeQuest, 
    sectionTimes, 
    totalTime,
    isModalOpen,
    closeModal
  } = useGamification();

  const [showFooterPopup, setShowFooterPopup] = useState(false);

  // --- Global Event Listeners ---
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

  // Footer Trigger
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const completedCount = quests.filter(q => q.completed).length;
        if (completedCount < quests.length) setShowFooterPopup(true);
      } else {
        setShowFooterPopup(false);
      }
    }, { threshold: 0.2 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [quests]);

  const missingQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);
  const progressPercent = Math.round((completedQuests.length / quests.length) * 100);
  const maxSectionTime = Math.max(...(Object.values(sectionTimes) as number[]), 1);

  return (
    <>
      {/* 2. Notification (Refined Glass Gold) */}
      <AnimatePresence>
        {notification && notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-24 right-4 md:right-8 z-[120] pointer-events-none"
          >
            <div className="relative overflow-hidden rounded-xl border border-yellow-500/20 bg-slate-950/90 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] pr-12 min-w-[280px]">
               {/* Subtle Gold Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
               
               <div className="relative flex items-center gap-4">
                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                   <Sparkles size={18} fill="currentColor" fillOpacity={0.4} />
                 </div>
                 
                 <div>
                   <span className="block text-[9px] font-bold uppercase tracking-widest text-yellow-500/80 mb-0.5">Conquista Desbloqueada</span>
                   <p className="font-serif text-base font-medium text-white tracking-wide">{notification.message}</p>
                 </div>
               </div>
               
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none mix-blend-screen" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal (Premium Dashboard Layout) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Close Button (Absolute Top Right) */}
               <button 
                  onClick={closeModal} 
                  className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors backdrop-blur-sm"
               >
                  <X size={20} />
               </button>

               {/* --- Left Column: Sidebar / Profile (4 Cols) --- */}
               <div className="md:col-span-4 bg-slate-50 border-r border-slate-100 p-8 flex flex-col relative overflow-hidden">
                  {/* Decorative BG */}
                  <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-200/30 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center mb-10">
                     <div className="w-28 h-28 mb-6 relative">
                        <Laurels rank={rank} className="absolute inset-0 scale-125" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                           <span className="text-4xl font-serif font-bold text-slate-900">{level}</span>
                           <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Nível</span>
                        </div>
                     </div>
                     
                     <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 shadow-sm">
                           Visitante
                        </span>
                        <h2 className="text-3xl font-serif font-medium text-slate-900">{rank}</h2>
                     </div>
                     
                     <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[200px]">
                        {rank === 'Ouro' ? 'Exploração de elite. Você não deixa nenhum detalhe passar.' : rank === 'Prata' ? 'Curiosidade em alta. Você está mergulhando fundo.' : 'Iniciando a descoberta.'}
                     </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                     <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <Clock size={16} className="text-slate-400 mb-2" />
                        <span className="block text-xl font-serif font-medium text-slate-900">
                           {Math.floor(Number(totalTime) / 60)}<span className="text-sm text-slate-400">m</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Sessão</span>
                     </div>
                     <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <Trophy size={16} className="text-slate-400 mb-2" />
                        <span className="block text-xl font-serif font-medium text-slate-900">{xp}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">XP Total</span>
                     </div>
                  </div>
               </div>

               {/* --- Right Column: Dashboard Content (8 Cols) --- */}
               <div className="md:col-span-8 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-white">
                  
                  {/* Progress Header */}
                  <div className="mb-10">
                     <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                           <Target size={16} className="text-slate-400" /> Progresso da Jornada
                        </h3>
                        <span className="text-xs font-mono font-bold text-slate-500">{progressPercent}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progressPercent}%` }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           className={`h-full rounded-full ${rank === 'Ouro' ? 'bg-yellow-500' : 'bg-slate-800'}`}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     {/* Quests Section */}
                     <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Conquistas</h4>
                        <div className="space-y-3">
                           {quests.map((quest) => (
                              <div 
                                 key={quest.id} 
                                 className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                                    quest.completed 
                                    ? 'bg-slate-50 border-slate-200' 
                                    : 'bg-white border-transparent opacity-60 hover:opacity-100'
                                 }`}
                              >
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    quest.completed ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-400'
                                 }`}>
                                    {quest.completed ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <p className={`text-sm font-medium truncate ${quest.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                                       {quest.label}
                                    </p>
                                 </div>
                                 <span className="text-[10px] font-mono font-bold text-slate-400">+{quest.xp}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Analytics Section */}
                     <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Interesse (Heatmap)</h4>
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                           <div className="space-y-4">
                              {Object.entries(sectionTimes)
                                 .sort(([,a], [,b]) => (b as number) - (a as number))
                                 .slice(0, 5)
                                 .map(([section, time]) => (
                                     <HeatmapBar 
                                         key={section} 
                                         section={section} 
                                         time={time as number} 
                                         maxTime={maxSectionTime} 
                                     />
                                 ))
                              }
                              {Object.keys(sectionTimes).length === 0 && (
                                 <div className="py-8 text-center text-slate-400 text-xs italic">
                                    Navegue para gerar dados...
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Footer Suggestion Popup (Subtle Reminder) */}
      <AnimatePresence>
         {showFooterPopup && !isModalOpen && missingQuests.length > 0 && (
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 20, opacity: 0 }}
               className="fixed bottom-8 right-4 md:right-8 z-50 w-80 pointer-events-none"
            >
               <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden group hover:bg-white transition-colors">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sugestão</span>
                     </div>
                     <button onClick={() => setShowFooterPopup(false)} className="text-slate-300 hover:text-slate-900 transition-colors">
                        <X size={14} />
                     </button>
                  </div>
                  
                  <h4 className="font-serif text-lg font-bold text-slate-900 mb-1">Complete sua jornada</h4>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                     Falta pouco para o nível Ouro. Que tal ver isto:
                  </p>

                  <a 
                     href={missingQuests[0].link || '#'}
                     onClick={() => setShowFooterPopup(false)}
                     className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/item border border-slate-100"
                  >
                     <span className="text-xs font-bold text-slate-700 group-hover/item:text-slate-900">{missingQuests[0].label}</span>
                     <ChevronRight size={14} className="text-slate-300 group-hover/item:text-slate-900 transition-colors" />
                  </a>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
};

export default Gamification;
