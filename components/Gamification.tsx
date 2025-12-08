
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle2, Circle, X, Map, Star, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

// --- Types & Constants ---

type QuestId = 'scroll_hero' | 'scroll_deep' | 'click_project' | 'click_github' | 'click_linkedin' | 'click_contact' | 'time_spent';

interface Quest {
  id: QuestId;
  label: string;
  xp: number;
  completed: boolean;
  link?: string; // Where to go if not completed
}

const INITIAL_QUESTS: Quest[] = [
  { id: 'scroll_hero', label: 'Primeiros Passos', xp: 10, completed: false },
  { id: 'scroll_deep', label: 'Explorador Profundo', xp: 20, completed: false, link: '#services' },
  { id: 'click_project', label: 'Analisar um Projeto', xp: 20, completed: false, link: '#projects' },
  { id: 'time_spent', label: 'Leitura Atenta (> 1min)', xp: 15, completed: false },
  { id: 'click_github', label: 'Auditoria de Código (GitHub)', xp: 15, completed: false, link: '#lab' },
  { id: 'click_contact', label: 'Interesse em Contato', xp: 20, completed: false, link: '#contact' },
];

const LEVEL_TITLES = [
  { threshold: 0, title: "Visitante" },
  { threshold: 30, title: "Observador" },
  { threshold: 60, title: "Analista" },
  { threshold: 90, title: "Recrutador Lead" },
  { threshold: 100, title: "Parceiro Ideal" }
];

// --- Component ---

const Gamification: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFooterPopup, setShowFooterPopup] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [notification, setNotification] = useState<{message: string, visible: boolean}>({ message: '', visible: false });
  
  // Computed State
  const totalXP = quests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
  const maxXP = INITIAL_QUESTS.reduce((acc, q) => acc + q.xp, 0);
  const progressPercent = Math.min(100, Math.round((totalXP / maxXP) * 100));
  const currentTitle = LEVEL_TITLES.slice().reverse().find(l => progressPercent >= l.threshold)?.title || "Visitante";
  const levelNumber = Math.floor(progressPercent / 20) + 1;

  // --- Persistence & Initialization ---

  useEffect(() => {
    // Load from LocalStorage
    const saved = localStorage.getItem('vc_portfolio_gamification');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge saved state with initial structure (in case we add new quests later)
        setQuests(prev => prev.map(q => {
          const savedQuest = parsed.quests.find((pq: any) => pq.id === q.id);
          return savedQuest ? { ...q, completed: savedQuest.completed } : q;
        }));
      } catch (e) {
        console.error("Error loading gamification state", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save to LocalStorage whenever quests change
    localStorage.setItem('vc_portfolio_gamification', JSON.stringify({ quests }));
  }, [quests]);

  // --- Logic: Trackers ---

  const completeQuest = (id: QuestId) => {
    setQuests(prev => {
      const questIndex = prev.findIndex(q => q.id === id);
      if (questIndex === -1 || prev[questIndex].completed) return prev;

      const newQuests = [...prev];
      newQuests[questIndex] = { ...newQuests[questIndex], completed: true };
      
      // Trigger Notification
      showNotification(`Conquista Desbloqueada: ${newQuests[questIndex].label}`);
      
      return newQuests;
    });
  };

  const showNotification = (msg: string) => {
    setNotification({ message: msg, visible: true });
    setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000);
  };

  // 1. Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => {
        const newTime = prev + 1;
        if (newTime === 60) completeQuest('time_spent'); // 60 seconds
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / docHeight;

      if (scrollY > 100) completeQuest('scroll_hero');
      if (scrollPercent > 0.5) completeQuest('scroll_deep');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Footer Intersection (The Trigger)
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // If not 100% complete, show suggestion popup
        if (progressPercent < 100) {
          setShowFooterPopup(true);
        }
      } else {
        setShowFooterPopup(false);
      }
    }, { threshold: 0.2 });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [progressPercent]);

  // 4. Global Click Listener (Event Delegation)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');

      // Check Links
      if (link) {
        const href = link.getAttribute('href') || '';
        if (href.includes('github.com')) completeQuest('click_github');
        if (href.includes('linkedin.com')) completeQuest('click_linkedin');
        if (href.includes('#contact') || href.includes('mailto:') || href.includes('wa.me')) completeQuest('click_contact');
        if (href.includes('#lab')) completeQuest('click_github');
      }

      // Check Specific Areas (using closest container IDs)
      if (target.closest('#projects') && (button || link)) {
         // Any interaction inside projects section counts
         completeQuest('click_project');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // --- UI Components ---

  const missingQuests = quests.filter(q => !q.completed);

  return (
    <>
      {/* 1. Level Indicator (Top Right) */}
      <div className="fixed top-24 right-4 md:right-8 z-40">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 pl-1 pr-4 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-slate-900 rounded-full text-white overflow-hidden">
             {/* Circular Progress (CSS Conic Gradient) */}
             <div 
               className="absolute inset-0 z-0 opacity-30" 
               style={{ 
                 background: `conic-gradient(#fff ${progressPercent}%, transparent 0)` 
               }} 
             />
             <span className="relative z-10 text-[10px] font-bold">Lvl {levelNumber}</span>
          </div>
          <div className="flex flex-col items-start">
             <span className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-0.5">Nível Atual</span>
             <span className="text-xs font-serif font-bold text-slate-900 leading-none">{currentTitle}</span>
          </div>
        </button>
      </div>

      {/* 2. Achievement Notification (Toast) */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[60] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 pointer-events-none"
          >
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Session Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-8 pb-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                 <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                   <X size={24} />
                 </button>
                 
                 <div className="relative z-10">
                   <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
                     Relatório de Sessão
                   </span>
                   <h2 className="text-3xl font-serif mb-2">
                     {progressPercent === 100 ? "Exploração Completa!" : "Continue Explorando"}
                   </h2>
                   <p className="text-slate-400 text-sm">
                     Você já viu {progressPercent}% do meu portfólio.
                   </p>
                 </div>
              </div>

              {/* Stats Bar */}
              <div className="flex bg-slate-50 border-b border-slate-100 px-8 py-4 gap-8 -mt-6 rounded-t-[2rem] relative z-20">
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Tempo</span>
                    <span className="text-lg font-bold text-slate-900">
                      {Math.floor(sessionTime / 60)}m {sessionTime % 60}s
                    </span>
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Conquistas</span>
                    <span className="text-lg font-bold text-slate-900">
                      {quests.filter(q => q.completed).length}/{quests.length}
                    </span>
                 </div>
              </div>

              {/* Quest List */}
              <div className="p-8 max-h-[40vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                   <Map size={14} /> Mapa de Exploração
                </h3>
                <div className="space-y-3">
                   {quests.map(quest => (
                     <div 
                       key={quest.id} 
                       className={`flex items-center justify-between p-3 rounded-xl transition-colors ${quest.completed ? 'bg-green-50 border border-green-100' : 'bg-slate-50 border border-slate-100'}`}
                     >
                       <div className="flex items-center gap-3">
                          {quest.completed 
                            ? <CheckCircle2 size={18} className="text-green-600" />
                            : <Circle size={18} className="text-slate-300" />
                          }
                          <span className={`text-sm font-medium ${quest.completed ? 'text-green-900' : 'text-slate-500'}`}>
                            {quest.label}
                          </span>
                       </div>
                       <span className="text-xs font-bold text-slate-400">+{quest.xp}xp</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Footer CTA */}
              {progressPercent < 100 && (
                <div className="p-6 pt-0">
                  <Button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-none border border-slate-200">
                    Continuar Navegando
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Footer Pop-up Trigger (The "Hey you missed this" moment) */}
      <AnimatePresence>
        {showFooterPopup && !isModalOpen && (
           <motion.div
             initial={{ y: 100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 100, opacity: 0 }}
             className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
           >
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 ring-1 ring-slate-900/5">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-slate-900">Quase lá!</h4>
                      <p className="text-xs text-slate-500">
                        Você completou {progressPercent}% da experiência.
                      </p>
                    </div>
                    <button onClick={() => setShowFooterPopup(false)} className="text-slate-400 hover:text-slate-900">
                       <X size={16} />
                    </button>
                 </div>

                 {missingQuests.length > 0 && (
                   <div className="space-y-2 mb-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Sugestão:</p>
                      {missingQuests.slice(0, 2).map(q => (
                        <a 
                          key={q.id} 
                          href={q.link || '#'} 
                          onClick={() => setShowFooterPopup(false)}
                          className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                           <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900">{q.label}</span>
                           <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900" />
                        </a>
                      ))}
                   </div>
                 )}
                 
                 <button 
                   onClick={() => setIsModalOpen(true)}
                   className="w-full py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                 >
                   Ver Meu Relatório Completo
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gamification;
