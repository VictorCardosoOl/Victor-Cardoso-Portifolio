import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { motion } from 'framer-motion';

const XPBar: React.FC = () => {
    const { xp, level, nextLevelXp } = useGamification();

    // Calculate progress within current level (assuming simplified linearly increasing or fixed steps for visual)
    const prevLevelXp = (level - 1) * 500;
    const levelProgress = Math.min(100, Math.max(0, ((xp - prevLevelXp) / (500)) * 100));

    return (
        <div className="fixed top-0 left-0 w-full z-[100] flex flex-col items-center pointer-events-none">
            {/* Background Track */}
            <div className="w-full h-[2px] bg-slate-200/20 backdrop-blur-sm">
                {/* Progress Fill */}
                <motion.div
                    className="h-full bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                />
            </div>

            {/* Level Indicator (Optional - triggers on change) */}
            <div className="absolute top-4 right-4 md:right-8 opacity-40 hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-white/10 pointer-events-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Lvl {level}</span>
                <div className="w-px h-3 bg-slate-300/30"></div>
                <span className="text-[10px] font-mono text-slate-400">{xp} XP</span>
            </div>
        </div>
    );
};

export default XPBar;
