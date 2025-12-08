import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

const AchievementNotification: React.FC = () => {
    const { recentAchievement, clearNotification } = useGamification();

    useEffect(() => {
        if (recentAchievement) {
            const timer = setTimeout(() => {
                clearNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [recentAchievement, clearNotification]);

    return (
        <AnimatePresence>
            {recentAchievement && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-8 right-8 z-[100] w-80 glass-panel border border-white/20 rounded-2xl p-4 shadow-2xl flex items-start gap-4 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 pointer-events-none" />

                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-500 flex items-center justify-center shrink-0 shadow-lg border border-white/40">
                        <Trophy size={20} className="text-yellow-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Conquista Desbloqueada</span>
                            <button onClick={clearNotification} className="text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={14} />
                            </button>
                        </div>

                        <h4 className="text-slate-900 font-serif font-bold text-lg leading-tight mb-1">
                            {recentAchievement.title}
                        </h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                            {recentAchievement.description}
                        </p>
                        <div className="mt-2 text-[10px] font-bold text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded inline-block">
                            +{recentAchievement.xpReward} XP
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementNotification;
