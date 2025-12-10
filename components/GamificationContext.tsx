
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

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
  // Getters for non-reactive data (Performance optimization)
  getSessionDuration: () => number;
  getSectionTime: (section: string) => number;
  getAllSectionTimes: () => SectionTime;
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
  // UI State (Triggers Renders)
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [currentSection, setCurrentSection] = useState('hero');
  const [notification, setNotification] = useState<{ message: string; visible: boolean; type?: Rank } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Silent Refs (No Re-renders)
  const startTimeRef = useRef<number>(Date.now());
  const sectionTimesRef = useRef<SectionTime>({});
  const lastSectionUpdateRef = useRef<number>(Date.now());

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

  const completeQuest = useCallback((id: string) => {
    setQuests(prev => {
      const idx = prev.findIndex(q => q.id === id);
      if (idx === -1 || prev[idx].completed) return prev;

      const newQuests = [...prev];
      newQuests[idx] = { ...newQuests[idx], completed: true };
      
      const newXp = newQuests.reduce((acc, q) => acc + (q.completed ? q.xp : 0), 0);
      const newLevel = Math.floor(newXp / 25) + 1;
      const newRank = getRank(newLevel);

      // Trigger notification inside the setState callback to ensure we have fresh data
      // Note: In a real app we might use a separate effect, but this works for simple sync logic
      setTimeout(() => triggerNotification(`Conquista: ${newQuests[idx].label}`, newRank), 0);
      
      return newQuests;
    });
  }, []); // Empty dependency array as it uses functional update

  const unlockAchievement = (message: string) => {
    triggerNotification(message, rank);
  };

  const triggerNotification = (message: string, rankType: Rank) => {
    setNotification({ message, visible: true, type: rankType });
    setTimeout(() => {
        setNotification(prev => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const hideNotification = () => setNotification(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // --- Getters (Performance Optimized) ---
  
  const getSessionDuration = useCallback(() => {
    return Math.floor((Date.now() - startTimeRef.current) / 1000);
  }, []);

  const getSectionTime = useCallback((section: string) => {
    return sectionTimesRef.current[section] || 0;
  }, []);
  
  const getAllSectionTimes = useCallback(() => {
     // Force update the current section time before returning
     const now = Date.now();
     const delta = Math.floor((now - lastSectionUpdateRef.current) / 1000);
     if (delta > 0) {
        sectionTimesRef.current[currentSection] = (sectionTimesRef.current[currentSection] || 0) + delta;
        lastSectionUpdateRef.current = now; // Reset reference
     }
     return { ...sectionTimesRef.current };
  }, [currentSection]);

  // --- Timers Logic (Silent) ---

  // Check achievements without re-rendering
  useEffect(() => {
    const checkInterval = setInterval(() => {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        
        // Quest: Time Spent
        if (duration > 60) {
            // This is safe because completeQuest checks if already completed internally
            completeQuest('time_spent');
        }
    }, 2000); // Check every 2s is enough

    return () => clearInterval(checkInterval);
  }, [completeQuest]);

  // Track Section Time silently
  useEffect(() => {
      // When section changes, update the previous section's accumulator
      lastSectionUpdateRef.current = Date.now();
      
      const interval = setInterval(() => {
         // We just update the ref, no re-render
         const now = Date.now();
         const delta = Math.floor((now - lastSectionUpdateRef.current) / 1000);
         
         if (delta >= 1) {
            sectionTimesRef.current[currentSection] = (sectionTimesRef.current[currentSection] || 0) + delta;
            lastSectionUpdateRef.current = now;
         }
      }, 1000);

      return () => clearInterval(interval);
  }, [currentSection]);

  // Section Detection (Intersection Observer)
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
      quests,
      completeQuest,
      unlockAchievement,
      notification,
      hideNotification,
      currentSection,
      isModalOpen,
      openModal,
      closeModal,
      getSessionDuration,
      getSectionTime,
      getAllSectionTimes
    }}>
      {children}
    </GamificationContext.Provider>
  );
};
