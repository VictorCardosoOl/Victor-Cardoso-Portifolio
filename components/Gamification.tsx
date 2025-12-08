
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, ArrowRight, Clock, Trophy, Sparkles, CheckCircle2, Lock, Flame, ChevronRight } from 'lucide-react';
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
      strokeWidth="2" 
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

const ProgressBar = ({ percent, rank }: { percent: number; rank: Rank }) => {
    const getColor = () => {
        if (rank === 'Ouro') return 'bg-yellow-500';
        if (rank === 'Prata') return 'bg-slate-400';
        return 'bg-amber-600';
    };

    return (
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
            <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute top-0 left-0 h-full rounded-full ${getColor()}`}
            />
        </div>
    );
};

const HeatmapBar: React.FC<{ section: string; time: number; maxTime: number }> = ({ section, time, maxTime }) => {
    const percent = maxTime > 0 ? Math.min((time / maxTime) * 100, 100) : 0;
    
    return (
        <div className="w-full mb-3">
            <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{section}</span>
                <span className="text-[10px] font-mono text-slate-400">{time}s</span>
            </div>
            <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="h-full bg-slate-800 rounded-full opacity-60"
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
  const ringColor = rank === 'Ouro' ? 'border-yellow-400' : rank === 'Prata' ? 'border-slate-300' : 'border-amber-600';

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
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Nível</span>
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
      {/* 2. Notification (Elegant Card with Golden Gradient) */}
      <AnimatePresence>
        {notification && notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-24 right-4 md:right-8 z-[120] pointer-events-none"
          >
            <div className="relative overflow-hidden rounded-xl border border-yellow-500/30 bg-slate-950/90 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(234,179,8,0.15)] pr-10">
               {/* Subtle Gold Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
               
               <div className="relative flex items-center gap-4">
                 {/* Icon with Ring */}
                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/40">
                   <Sparkles size={18} fill="currentColor" fillOpacity={0.2} />
                 </div>
                 
                 {/* Text Content */}
                 <div>
                   <span className="block text-[10px] font-bold uppercase tracking-widest text-yellow-500/90 mb-0.5">Conquista</span>
                   <p className="font-serif text-sm font-medium tracking-wide text-white drop-shadow-sm">{notification.message}</p>
                 </div>
               </div>
               
               {/* Shine Effect */}
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-500/20 blur-2xl rounded-full pointer-events-none mix-blend-screen" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal (Premium Passport) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 flex flex-col max-h-[90vh]"
            >
               {/* --- Header: The ID Card --- */}
               <div className="bg-slate-50 px-8 pt-8 pb-0 border-b border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-slate-200/50 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                  
                  <div className="flex justify-between items-start relative z-10 mb-8">
                     <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center relative">
                           <Laurels rank={rank} className="absolute inset-0 scale-110 m-1" />
                           <div className="flex flex-col items-center">
                              <span className="text-3xl font-serif font-bold text-slate-900 leading-none">{level}</span>
                              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-1">Nível</span>
                           </div>
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-2">
                              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Visitante {rank}</h2>
                              {rank === 'Ouro' && <div className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold uppercase tracking-widest rounded-full border border-yellow-200">VIP</div>}
                           </div>
                           <p className="text-sm text-slate-500 font-light max-w-xs leading-relaxed">
                              {rank === 'Ouro' ? 'Você explorou cada detalhe. Um verdadeiro visionário.' : rank === 'Prata' ? 'Um explorador curioso em busca de excelência.' : 'Iniciando a jornada de descoberta.'}
                           </p>
                        </div>
                     </div>

                     <button onClick={closeModal} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-colors">
                        <X size={20} />
                     </button>
                  </div>

                  {/* Tabs/Stats Bar */}
                  <div className="flex gap-8 border-b border-transparent">
                      <div className="pb-6 border-b-2 border-slate-900">
                          <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">XP Total</span>
                          <span className="text-xl font-serif text-slate-900">{xp}</span>
                      </div>
                      <div className="pb-6">
                          <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">Sessão</span>
                          <span className="text-xl font-serif text-slate-900">{Math.floor(Number(totalTime) / 60)}m {Number(totalTime) % 60}s</span>
                      </div>
                      <div className="pb-6 ml-auto w-1/3 flex flex-col justify-center">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                              <span>Progresso</span>
                              <span>{progressPercent}%</span>
                           </div>
                           <ProgressBar percent={progressPercent} rank={rank} />
                      </div>
                  </div>
               </div>

               {/* --- Content Body --- */}
               <div className="flex-grow overflow-y-auto custom-scrollbar bg-white">
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                     
                     {/* Left: Quests List */}
                     <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                           <Map size={14} className="text-slate-400" /> Roadmap
                        </h3>
                        <div className="space-y-3">
                           {quests.map((quest) => (
                              <div 
                                 key={quest.id} 
                                 className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                                    quest.completed 
                                    ? 'bg-white border-slate-200 shadow-sm' 
                                    : 'bg-slate-50 border-transparent opacity-60 grayscale'
                                 }`}
                              >
                                 <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                        quest.completed ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'
                                    }`}>
                                        {quest.completed ? <CheckCircle2 size={12} /> : <Lock size={10} />}
                                    </div>
                                    <span className={`text-sm font-medium ${quest.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {quest.label}
                                    </span>
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                    {quest.xp} XP
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Right: Heatmap & Analysis */}
                     <div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 h-full">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                                <Flame size={14} className="text-slate-400" /> Foco de Atenção
                            </h3>
                            
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
                                    <p className="text-sm text-slate-400 italic text-center py-8">
                                        Navegue pelo site para gerar dados...
                                    </p>
                                )}
                            </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Footer Action */}
               <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                     {missingQuests.length > 0 ? `${missingQuests.length} conquistas restantes` : 'Todas as conquistas desbloqueadas!'}
                  </p>
                  <Button 
                    onClick={closeModal} 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-slate-900 hover:text-white hover:border-slate-900"
                  >
                     Continuar Jornada
                  </Button>
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
               <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden group hover:bg-white transition-colors">
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
