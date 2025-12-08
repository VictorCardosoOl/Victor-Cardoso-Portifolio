import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

export type AchievementId = 'EXPLORER' | 'VISIONARY' | 'CONNECTOR' | 'ARCHITECT';

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    xpReward: number;
}

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
    EXPLORER: {
        id: 'EXPLORER',
        title: 'Explorador',
        description: 'Começou a jornada pelo portfólio.',
        xpReward: 100,
    },
    VISIONARY: {
        id: 'VISIONARY',
        title: 'Visionário',
        description: 'Analisou a seção de projetos.',
        xpReward: 150,
    },
    CONNECTOR: {
        id: 'CONNECTOR',
        title: 'Conector',
        description: 'Mostrou interesse em contato.',
        xpReward: 200,
    },
    ARCHITECT: {
        id: 'ARCHITECT',
        title: 'Arquiteto Curioso',
        description: 'Investigou os detalhes de um projeto.',
        xpReward: 300,
    },
};

interface GamificationContextType {
    xp: number;
    level: number;
    unlockedAchievements: AchievementId[];
    recentAchievement: Achievement | null;
    unlockAchievement: (id: AchievementId) => void;
    clearNotification: () => void;
    nextLevelXp: number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [unlockedAchievements, setUnlockedAchievements] = useState<AchievementId[]>([]);
    const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

    const calculateLevel = (currentXp: number) => Math.floor(currentXp / 500) + 1;
    const level = calculateLevel(xp);
    const nextLevelXp = (level) * 500;

    const unlockAchievement = useCallback((id: AchievementId) => {
        setUnlockedAchievements((prev) => {
            if (prev.includes(id)) return prev; // No change if already unlocked

            // Calculate new state only if redundant
            const achievement = ACHIEVEMENTS[id];

            // We must update XP and recentAchievement as side effects, but inside the callback is simpler
            // Using functional updates to be safe
            setXp((currXp) => currXp + achievement.xpReward);
            setRecentAchievement(achievement);

            return [...prev, id];
        });
    }, []);

    const clearNotification = useCallback(() => {
        setRecentAchievement(null);
    }, []);

    // Use Memo for the value to prevent consumer re-renders
    const contextValue = useMemo(() => ({
        xp,
        level,
        unlockedAchievements,
        recentAchievement,
        unlockAchievement,
        clearNotification,
        nextLevelXp
    }), [xp, level, unlockedAchievements, recentAchievement, unlockAchievement, clearNotification, nextLevelXp]);

    return (
        <GamificationContext.Provider value={contextValue}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};
