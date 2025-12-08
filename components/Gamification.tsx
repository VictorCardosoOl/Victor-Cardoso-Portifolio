
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, CheckCircle2, Lock, Clock, Trophy, Target, Star, Medal } from 'lucide-react';
import { useGamification, Rank } from './GamificationContext';

// --- Visual Components ---

const Laurels = ({ rank, className }: { rank: Rank; className?: string }) => {
  const colors = {
    Bronze: '#b45309', // Darker Bronze (amber-700)
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
       {/* Rank Icon Element */}
       <motion.circle 
          cx="50" cy="20" r="8" 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.5, type: 'spring' }}
          fill={colors[rank]} 
          stroke="none" 
          opacity="0.2"
       />
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
  const rankColor = rank === 'Ouro' ? 'text-yellow-600' : rank === 'Prata' ? 'text-slate-500' : 'text-amber-700';

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
  
  // Cast values safely for Heatmap
  const timeValues = Object.values(sectionTimes) as number[];
  const maxSectionTime = Math.max(...timeValues, 1);

  // Determine styles for notification based on rank type
  const getNotificationStyles = () => {
     // Default / Generic Style
     let styles = {
         border: 'border-white/10',
         iconBg: 'bg-white/10',
         iconColor: 'text-white',
         gradient: 'from-white/5',
         titleColor: 'text-slate-200'
     };

     const type = notification?.type || rank; // Fallback to current rank if type not sent

     switch(type) {
        case 'Ouro': 
            styles = { 
                border: 'border-yellow-500/30', 
                iconBg: 'bg-yellow-500/20', 
                iconColor: 'text-yellow-400', 
                gradient: 'from-yellow-500/10',
                titleColor: 'text-yellow-400'
            };
            break;
        case 'Prata': 
            styles = { 
                border: 'border-slate-300/30', 
                iconBg: 'bg-slate-400/20', 
                iconColor: 'text-slate-200', 
                gradient: 'from-slate-400/10',
                titleColor: 'text-slate-300'
            };
            break;
        case 'Bronze': 
            styles = { 
                border: 'border-amber-700/30', 
                iconBg: 'bg-amber-700/20', 
                iconColor: 'text-amber-500', 
                gradient: 'from-amber-700/10',
                titleColor: 'text-amber-500'
            };
            break;
     }
     return styles;
  };
  
  const notifStyles = getNotificationStyles();

  return (
    <>
      {/* 2. Notification (Refined Glass Gold + Laurel Integrated) */}
      <AnimatePresence>
        {notification && notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-24 right-4 md:right-8 z-[120] pointer-events-none"
          >
            <div className={`relative overflow-hidden rounded-2xl border ${notifStyles.border} bg-slate-950/90 backdrop-blur-xl p-4 pr-10 shadow-2xl shadow-black/40 min-w-[320px] flex items-center gap-4 group`}>
               {/* Subtle Rank Gradient Background (Corner) */}
               <div className={`absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r ${notifStyles.gradient} to-transparent opacity-100 pointer-events-none`} />
               
               {/* Icon Wrapper with Laurels */}
               <div className="relative flex-shrink-0 z-10">
                   <div className={`w-10 h-10 rounded-full ${notifStyles.iconBg} ring-1 ring-white/10 flex items-center justify-center relative overflow-hidden`}>
                      {/* Rank Icon */}
                      {notification.type === 'Ouro' ? <Sparkles size={16} className={notifStyles.iconColor} /> : 
                       notification.type === 'Prata' ? <Star size={16} className={notifStyles.iconColor} /> : 
                       <Medal size={16} className={notifStyles.iconColor} />}
                   </div>
               </div>

               {/* Content */}
               <div className="relative z-10 flex-grow">
                 <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${notifStyles.titleColor}`}>
                       {notification.type || 'Conquista'} • Nível {level}
                    </span>
                 </div>
                 <p className="font-serif text-sm font-medium text-white leading-tight tracking-wide drop-shadow-sm">
                   {notification.message}
                 </p>
               </div>

               {/* Discrete Close / Decoration Icon */}
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal (Sidebar + Content Layout) */}
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
              className="relative bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 grid grid-cols-1 md:grid-cols-12 max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Close Button */}
               <button 
                  onClick={closeModal} 
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors backdrop-blur-sm"
               >
                  <X size={20} />
               </button>

               {/* --- Left Column: Sidebar Profile (4 Cols) --- */}
               <div className="md:col-span-4 bg-slate-50 border-r border-slate-100 p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-200/40 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center mb-8 mt-4">
                     {/* Big Laurels */}
                     <div className="w-32 h-32 mb-4 relative">
                        <Laurels rank={rank} className="absolute inset-0 scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                           <span className="text-5xl font-serif font-bold text-slate-900 leading-none">{level}</span>
                           <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-1">Nível</span>
                        </div>
                     </div>
                     
                     <div className="mb-2">
                        <h2 className={`text-2xl font-serif font-medium ${rank === 'Ouro' ? 'text-yellow-600' : rank === 'Prata' ? 'text-slate-600' : 'text-amber-700'}`}>
                            Rank {rank}
                        </h2>
                     </div>
                     
                     <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[200px]">
                        {rank === 'Ouro' ? 'Exploração de elite. Você não deixa nenhum detalhe passar.' : rank === 'Prata' ? 'Curiosidade em alta. Você está mergulhando fundo.' : 'Iniciando a descoberta.'}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mt-auto w-full">
                     <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tempo</span>
                        </div>
                        <span className="font-serif font-medium text-slate-900">{Math.floor(Number(totalTime) / 60)}m {Number(totalTime) % 60}s</span>
                     </div>
                     <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trophy size={14} className="text-slate-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">XP</span>
                        </div>
                        <span className="font-serif font-medium text-slate-900">{xp}</span>
                     </div>
                  </div>
               </div>

               {/* --- Right Column: Quests & Analytics (8 Cols) --- */}
               <div className="md:col-span-8 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-white">
                  
                  {/* Progress Header */}
                  <div className="mb-8">
                     <div className="flex justify-between items-end mb-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                           <Target size={14} className="text-slate-400" /> Progresso da Sessão
                        </h3>
                        <span className="text-xs font-mono font-bold text-slate-500">{progressPercent}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progressPercent}%` }}
                           transition={{ duration: 1, ease: "easeOut" }}
                           className={`h-full rounded-full ${rank === 'Ouro' ? 'bg-yellow-500' : 'bg-slate-800'}`}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                     {/* Quests Section */}
                     <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Lista de Conquistas</h4>
                        <div className="space-y-2">
                           {quests.map((quest) => (
                              <div 
                                 key={quest.id} 
                                 className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                                    quest.completed 
                                    ? 'bg-slate-50 border-slate-200 opacity-100' 
                                    : 'bg-white border-dashed border-slate-200 opacity-60 hover:opacity-100'
                                 }`}
                              >
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                                    quest.completed ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-400'
                                 }`}>
                                    {quest.completed ? <CheckCircle2 size={12} /> : <Lock size={12} />}
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <p className={`text-xs font-medium truncate ${quest.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                                       {quest.label}
                                    </p>
                                 </div>
                                 <span className="text-[9px] font-mono font-bold text-slate-400">+{quest.xp}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Analytics Section */}
                     <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Seções Mais Visitadas</h4>
                        <div className="space-y-4 pt-1">
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
                              <div className="py-8 text-center text-slate-400 text-xs italic bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                 Navegue para gerar dados...
                              </div>
                           )}
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
