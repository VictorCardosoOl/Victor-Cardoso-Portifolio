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
      <div className={`w-full flex items-center gap-4 py-4 border-b border-doc ${className}`}>
        <span className="text-micro text-petrol-base opacity-40">{index}</span>
        <div className="h-[1px] flex-1 bg-petrol-base/10"></div>
        <span className="text-micro text-petrol-base opacity-60">{label}</span>
      </div>
    </Reveal>
  );
};