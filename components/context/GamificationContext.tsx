import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const unlockAchievement = (id: AchievementId) => {
        if (unlockedAchievements.includes(id)) return;

        const achievement = ACHIEVEMENTS[id];
        setUnlockedAchievements((prev) => [...prev, id]);
        setXp((prev) => prev + achievement.xpReward);
        setRecentAchievement(achievement);

        // Play subtle sound if desired (omitted for now)
    };

    const clearNotification = () => {
        setRecentAchievement(null);
    };

    return (
        <GamificationContext.Provider value={{
            xp,
            level,
            unlockedAchievements,
            recentAchievement,
            unlockAchievement,
            clearNotification,
            nextLevelXp
        }}>
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
