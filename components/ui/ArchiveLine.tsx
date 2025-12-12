import React from 'react';
import { Reveal } from './Reveal';

interface ArchiveLineProps {
  index: string;
  label: string;
  className?: string;
}

export const ArchiveLine: React.FC<ArchiveLineProps> = ({ index, label, className = "" }) => {
  return (
    <Reveal width="100%">
      <div className={`w-full flex items-baseline gap-4 py-4 border-b border-[#0B232E]/10 ${className}`}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0B232E]/40 min-w-[3ch]">{index}</span>
        <div className="h-[1px] flex-1 bg-[#0B232E]/10"></div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0B232E]/60">{label}</span>
      </div>
    </Reveal>
  );
};