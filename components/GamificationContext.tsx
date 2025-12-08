
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---

export type Rank = 'Bronze' | 'Prata' | 'Ouro';

export interface Quest {
  id: string;
  label: string;
  xp: number;
  completed: boolean;
  link?: string;
}

// Explicitly define as Record<string, number> to avoid TS arithmetic errors
export type SectionTime = Record<string, number>;

interface GamificationContextType {
  xp: number;
  level: number;
  rank: Rank;
  totalTime: number;
  sectionTimes: SectionTime;
  quests: Quest[];
  completeQuest: (id: string) => void;
  unlockAchievement: (label: string) => void; 
  notification: { message: string; visible: boolean; type?: Rank } | null;
  hideNotification: () => void;
  currentSection: string;
  // Modal Control
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within a GamificationProvider');
  return context;
};

// --- Initial Data ---

const INITIAL_QUESTS: Quest[] = [
  { id: 'scroll_hero', label: 'Primeiros Passos', xp: 10, completed: false },
  { id: 'scroll_deep', label: 'Explorador Profundo', xp: 20, completed: false, link: '#services' },
  { id: 'click_project', label: 'Analisar um Projeto', xp: 25, completed: false, link: '#projects' },
  { id: 'time_spent', label: 'Leitura Atenta (> 1min)', xp: 15, completed: false },
  { id: 'click_github', label: 'Auditoria Técnica (GitHub)', xp: 20, completed: false, link: '#lab' },
  { id: 'click_contact', label: 'Interesse em Contato', xp: 30, completed: false, link: '#contact' },
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State: Pure React State resets on reload (Session Only)
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [totalTime, setTotalTime] = useState(0);
  const [sectionTimes, setSectionTimes] = useState<SectionTime>({});
  const [currentSection, setCurrentSection] = useState('hero');
  const [notification, setNotification] = useState<{ message: string; visible: boolean; type?: Rank } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived State
  const xp = quests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
  
  // Level Calculation: Simple linear progression
  const level = Math.floor(xp / 25) + 1;

  // Rank Calculation based on Level
  const getRank = (lvl: number): Rank => {
    if (lvl >= 5) return 'Ouro';
    if (lvl >= 3) return 'Prata';
    return 'Bronze';
  };
  const rank = getRank(level);

  // --- Logic ---

  const completeQuest = (id: string) => {
    setQuests(prev => {
      const idx = prev.findIndex(q => q.id === id);
      if (idx === -1 || prev[idx].completed) return prev;

      const newQuests = [...prev];
      newQuests[idx] = { ...newQuests[idx], completed: true };
      
      // Calculate potential new rank for notification style
      const newXp = newQuests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
      const newLevel = Math.floor(newXp / 25) + 1;
      const newRank = getRank(newLevel);

      triggerNotification(`Conquista: ${newQuests[idx].label}`, newRank);
      return newQuests;
    });
  };

  const unlockAchievement = (message: string) => {
    triggerNotification(message, rank);
  };

  const triggerNotification = (message: string, rankType: Rank) => {
    setNotification({ message, visible: true, type: rankType });
    
    // Auto hide
    setTimeout(() => {
        setNotification(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const hideNotification = () => setNotification(null);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // --- Timers & Section Tracking ---

  useEffect(() => {
    // 1. Total Session Timer
    const globalTimer = setInterval(() => {
      setTotalTime(prev => {
        const newTime = prev + 1;
        if (newTime === 60) completeQuest('time_spent');
        return newTime;
      });
    }, 1000);

    // 2. Section Timer
    const sectionTimer = setInterval(() => {
      setSectionTimes(prev => ({
        ...prev,
        [currentSection]: (prev[currentSection] || 0) + 1
      }));
    }, 1000);

    return () => {
      clearInterval(globalTimer);
      clearInterval(sectionTimer);
    };
  }, [currentSection]);

  // 3. Section Detection (Intersection Observer)
  useEffect(() => {
    const sections = ['hero', 'projects', 'services', 'skills', 'about', 'education', 'lab', 'writing', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } 
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <GamificationContext.Provider value={{
      xp,
      level,
      rank,
      totalTime,
      sectionTimes,
      quests,
      completeQuest,
      unlockAchievement,
      notification,
      hideNotification,
      currentSection,
      isModalOpen,
      openModal,
      closeModal
    }}>
      {children}
    </GamificationContext.Provider>
  );
};
