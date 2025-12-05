import React from 'react';

const GrainBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Soft Gradients for Depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-slate-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-100/30 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay">
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence 
              type='fractalNoise' 
              baseFrequency='0.7' 
              numOctaves='3' 
              stitchTiles='stitch'
            />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>
      
      {/* Light Overlay to soften */}
      <div className="absolute inset-0 bg-slate-50/60" />
    </div>
  );
};

export default GrainBackground;