import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface FilterBarProps {
  uniqueTags: string[];
  activeFilters: string[];
  toggleFilter: (tag: string) => void;
  clearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ uniqueTags, activeFilters, toggleFilter, clearFilters }) => {
  return (
    <div className="flex flex-col items-center gap-6 mb-16">
      <Reveal width="100%">
        <div className="flex flex-wrap gap-2 justify-center">
          {uniqueTags.map((tag) => {
            const isActive = activeFilters.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`px-5 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full flex items-center gap-2 border ${
                  isActive 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105' 
                    : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.span 
                    layoutId="active-dot" 
                    className="w-1.5 h-1.5 rounded-full bg-green-400" 
                  />
                )}
                {tag}
              </button>
            );
          })}
        </div>
      </Reveal>
      
      {/* Clear Filters Button */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: activeFilters.length > 0 ? 'auto' : 0, 
          opacity: activeFilters.length > 0 ? 1 : 0 
        }}
        className="overflow-hidden"
      >
         <button 
          onClick={clearFilters}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors px-4 py-2"
        >
          <RotateCcw size={12} /> Limpar Filtros
        </button>
      </motion.div>
    </div>
  );
};