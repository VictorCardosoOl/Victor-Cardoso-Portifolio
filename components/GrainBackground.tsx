import React from 'react';

const GrainBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden">
      {/* Otimização: Substituído SVG Filter por CSS Background Image (Noise).
        Isso evita recálculos pesados de GPU/CPU.
      */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Mantivemos os Gradients suaves pois são performáticos via CSS puro */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-slate-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-60 will-change-transform" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-[120px] mix-blend-multiply opacity-60 will-change-transform" />

      <div className="absolute inset-0 bg-slate-50/60" />
    </div>
  );
};

export default GrainBackground;