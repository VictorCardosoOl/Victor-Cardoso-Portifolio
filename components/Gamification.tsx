
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronRight, Lock, Unlock } from 'lucide-react';
import Button from './ui/Button';

// --- Assets & Icons ---

const Laurels = ({ className = "", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15C50 15 55 25 65 25C75 25 85 15 85 30C85 45 70 55 60 70C55 77.5 52 85 50 90" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M50 15C50 15 45 25 35 25C25 25 15 15 15 30C15 45 30 55 40 70C45 77.5 48 85 50 90" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M65 25C65 25 70 30 75 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M35 25C35 25 30 30 25 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M60 70C60 70 65 65 75 60" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M40 70C40 70 35 65 25 60" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MedalIcon = ({ rank }: { rank: RankTier }) => {
  const colors = {
    bronze: "text-amber-700 bg-amber-100 border-amber-200",
    silver: "text-slate-400 bg-slate-100 border-slate-300",
    gold: "text-yellow-600 bg-yellow-50 border-yellow-200",
    locked: "text-slate-300 bg-slate-50 border-slate-100"
  };

  const current = rank === 'none' ? colors.locked : colors[rank];

  return (
    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-sm ${current}`}>
      <Laurels className="w-8 h-8" />
    </div>
  );
};

// --- Types & Config ---

type QuestId = 'scroll_hero' | 'scroll_deep' | 'click_project' | 'click_github' | 'click_contact' | 'time_spent';
type RankTier = 'none' | 'bronze' | 'silver' | 'gold';

interface Quest {
  id: QuestId;
  label: string;
  description: string;
  xp: number;
  completed: boolean;
  link?: string;
}

const QUESTS_DATA: Quest[] = [
  { id: 'scroll_hero', label: 'Primeira Impressão', description: 'Comece a explorar a página.', xp: 10, completed: false },
  { id: 'scroll_deep', label: 'Explorador Curioso', description: 'Visualize mais de 50% do conteúdo.', xp: 25, completed: false, link: '#services' },
  { id: 'click_project', label: 'Olhar Crítico', description: 'Abra ou interaja com um projeto.', xp: 25, completed: false, link: '#projects' },
  { id: 'time_spent', label: 'Leitor Atento', description: 'Permaneça por mais de 60 segundos.', xp: 15, completed: false },
  { id: 'click_github', label: 'Auditoria Técnica', description: 'Visite meu GitHub ou repositórios.', xp: 15, completed: false, link: '#lab' },
  { id: 'click_contact', label: 'Próximo Passo', description: 'Considere entrar em contato.', xp: 20, completed: false, link: '#contact' }, // Total 110 XP (Bonus included)
];

const getRank = (xp: number): { tier: RankTier; label: string; color: string; nextThreshold: number } => {
  if (xp >= 90) return { tier: 'gold', label: 'Ouro - Visionário', color: 'text-yellow-500', nextThreshold: 110 };
  if (xp >= 50) return { tier: 'silver', label: 'Prata - Analista', color: 'text-slate-400', nextThreshold: 90 };
  if (xp >= 10) return { tier: 'bronze', label: 'Bronze - Visitante', color: 'text-amber-600', nextThreshold: 50 };
  return { tier: 'none', label: 'Visitante', color: 'text-slate-300', nextThreshold: 10 };
};

// --- Main Component ---

const Gamification: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>(QUESTS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFooterPopup, setShowFooterPopup] = useState(false);
  const [notification, setNotification] = useState<{message: string, rankUp?: boolean, visible: boolean}>({ message: '', visible: false });
  
  // Computed State
  const totalXP = quests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
  const rank = getRank(totalXP);
  const progressToNext = Math.min(100, (totalXP / rank.nextThreshold) * 100);

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('vc_portfolio_gamification_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuests(prev => prev.map(q => {
          const savedQuest = parsed.quests.find((pq: any) => pq.id === q.id);
          return savedQuest ? { ...q, completed: savedQuest.completed } : q;
        }));
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vc_portfolio_gamification_v2', JSON.stringify({ quests }));
  }, [quests]);

  // --- Logic ---
  const completeQuest = (id: QuestId) => {
    setQuests(prev => {
      const idx = prev.findIndex(q => q.id === id);
      if (idx === -1 || prev[idx].completed) return prev;

      const newQuests = [...prev];
      newQuests[idx] = { ...newQuests[idx], completed: true };
      
      // Calculate if Rank Up happened
      const oldXP = prev.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
      const newXP = newQuests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
      const oldRank = getRank(oldXP);
      const newRank = getRank(newXP);

      const isRankUp = newRank.tier !== oldRank.tier;
      
      showNotification(
        isRankUp ? `Novo Rank: ${newRank.label}!` : `Conquista: ${newQuests[idx].label}`,
        isRankUp
      );
      
      return newQuests;
    });
  };

  const showNotification = (msg: string, rankUp = false) => {
    setNotification({ message: msg, rankUp, visible: true });
    setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 4000);
  };

  // Trackers
  useEffect(() => {
    const timer = setInterval(() => completeQuest('time_spent'), 60000);
    
    const handleScroll = () => {
      if (window.scrollY > 100) completeQuest('scroll_hero');
      if ((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) > 0.5) completeQuest('scroll_deep');
    };
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const href = link?.getAttribute('href') || '';
      
      if (href.includes('github') || href.includes('linkedin') || href.includes('#lab')) completeQuest('click_github');
      if (href.includes('mailto') || href.includes('wa.me') || href.includes('#contact')) completeQuest('click_contact');
      if (target.closest('#projects')) completeQuest('click_project');
    };

    const footerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && totalXP < 90) setShowFooterPopup(true);
        else setShowFooterPopup(false);
    }, { threshold: 0.2 });
    
    const footer = document.getElementById('site-footer');
    if (footer) footerObserver.observe(footer);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      footerObserver.disconnect();
    };
  }, [totalXP]); // Re-run effect if XP changes to check footer condition

  // --- Styles ---
  
  // Dynamic border color based on rank for notification
  const notificationBorder = 
    rank.tier === 'gold' ? 'border-yellow-400/50 shadow-yellow-900/20' :
    rank.tier === 'silver' ? 'border-slate-300/50 shadow-slate-900/20' :
    'border-amber-600/50 shadow-amber-900/20';

  const notificationIconColor = 
    rank.tier === 'gold' ? '#EAB308' : // yellow-500
    rank.tier === 'silver' ? '#94A3B8' : // slate-400
    '#D97706'; // amber-600

  return (
    <>
      {/* 1. Badge Trigger (Top Right) */}
      <div className="fixed top-28 right-4 md:right-8 z-40">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className={`group flex items-center gap-0 pr-4 pl-1 py-1 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-full shadow-lg transition-all duration-300 ${totalXP > 0 ? 'opacity-100' : 'opacity-0 translate-x-10'}`}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
             <Laurels className={`w-8 h-8 ${rank.color}`} color="currentColor" />
             {/* Simple Dot for notification attention if unread quests? Optional. */}
          </div>
          <div className="flex flex-col items-start -ml-1">
             <span className="text-[9px] uppercase font-bold text-slate-400 leading-none mb-0.5">Rank</span>
             <span className={`text-xs font-serif font-bold leading-none ${rank.color}`}>{rank.tier === 'none' ? 'Iniciando' : rank.tier}</span>
          </div>
        </motion.button>
      </div>

      {/* 2. Elegant Notification (Top Right - Discreet) */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed top-28 right-20 md:right-40 z-[60] bg-slate-900/95 text-white pl-4 pr-6 py-3 rounded-lg shadow-2xl backdrop-blur-md border ${notificationBorder} flex items-center gap-4`}
          >
            <div className="relative">
               <Laurels className="w-8 h-8" color={notificationIconColor} />
               {notification.rankUp && (
                 <motion.div 
                   initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} 
                   className="absolute inset-0 bg-white rounded-full"
                 />
               )}
            </div>
            <div>
              <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${rank.color}`}>
                {notification.rankUp ? 'Rank Elevado' : 'Conquista'}
              </h4>
              <p className="text-sm font-serif font-medium text-slate-100">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal "Hall of Fame" */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Header: The Ceremony */}
              <div className="bg-slate-950 text-white p-8 md:p-10 relative overflow-hidden text-center">
                 {/* Decorative background lights */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-30 pointer-events-none
                    ${rank.tier === 'gold' ? 'bg-yellow-500' : rank.tier === 'silver' ? 'bg-slate-400' : 'bg-amber-600'}`} 
                 />
                 
                 <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
                   <X size={24} />
                 </button>

                 <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2, type: "spring" }}
                   className="relative z-10 flex justify-center mb-6"
                 >
                    <Laurels className={`w-32 h-32 ${rank.color}`} color="currentColor" />
                    <div className="absolute inset-0 flex items-center justify-center pt-2">
                       <span className="text-4xl font-serif font-bold">{Math.floor(totalXP)}</span>
                    </div>
                 </motion.div>

                 <div className="relative z-10">
                   <h2 className="text-3xl font-serif mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                     {rank.label}
                   </h2>
                   <p className="text-slate-400 text-sm font-light uppercase tracking-widest">
                     Nível de Engajamento
                   </p>
                 </div>
              </div>

              {/* Progress Bar */}
              {rank.tier !== 'gold' && (
                <div className="bg-slate-50 px-10 py-4 border-b border-slate-100">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      <span>Progresso para {rank.tier === 'bronze' ? 'Prata' : 'Ouro'}</span>
                      <span>{Math.round(rank.nextThreshold - totalXP)} XP restante</span>
                   </div>
                   <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full ${rank.tier === 'bronze' ? 'bg-slate-400' : 'bg-yellow-500'}`}
                      />
                   </div>
                </div>
              )}

              {/* Quests List */}
              <div className="p-8 bg-white max-h-[35vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                   {quests.map(quest => (
                     <div key={quest.id} className="flex items-start gap-4 group">
                       <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                         ${quest.completed ? 'bg-slate-900 border-slate-900 text-white' : 'bg-transparent border-slate-200 text-transparent'}`}>
                          {quest.completed && <Unlock size={10} />}
                       </div>
                       
                       <div className="flex-grow">
                          <h4 className={`text-sm font-bold transition-colors ${quest.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                             {quest.label}
                          </h4>
                          <p className="text-xs text-slate-500 font-light">{quest.description}</p>
                       </div>
                       
                       <div className="text-right">
                          <span className={`text-xs font-bold ${quest.completed ? 'text-slate-900' : 'text-slate-300'}`}>+{quest.xp}</span>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
              
              {rank.tier !== 'gold' && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500 mb-3">Explore mais para desbloquear o ranking Ouro.</p>
                  </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Footer "Lost Items" Prompt */}
      <AnimatePresence>
        {showFooterPopup && !isModalOpen && (
           <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 50, opacity: 0 }}
             className="fixed bottom-6 right-6 z-50 w-full max-w-xs"
           >
              <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 ring-1 ring-slate-900/5">
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                       <h4 className="font-serif font-bold text-slate-900">Jornada Incompleta</h4>
                    </div>
                    <button onClick={() => setShowFooterPopup(false)} className="text-slate-400 hover:text-slate-900">
                       <X size={14} />
                    </button>
                 </div>
                 
                 <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Você ainda não atingiu o ranking máximo. Dê uma olhada no que falta:
                 </p>

                 <div className="space-y-2 mb-4">
                    {quests.filter(q => !q.completed).slice(0, 2).map(q => (
                       <a key={q.id} href={q.link || '#'} className="block px-3 py-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex justify-between items-center group">
                          {q.label}
                          <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-600" />
                       </a>
                    ))}
                 </div>
                 
                 <Button onClick={() => setIsModalOpen(true)} variant="secondary" size="sm" className="w-full text-[10px] py-2 h-auto">
                    Ver Progresso
                 </Button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gamification;
