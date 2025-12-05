import React from 'react';

const GrainBackground = () => {
  return (
    <>
      {/* Soft Gradients for Depth */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-slate-200/50 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-50/40 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
      </div>
      
      {/* Optimized CSS Noise */}
      <div className="noise-bg mix-blend-overlay" />
    </>
  );
};

export default GrainBackground;