import React from 'react';

const GrainBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden transform-gpu bg-white">
      {/* Soft Gradients for Depth - Cool Blue/Petrol Tones */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#E0F2FE] rounded-full blur-[140px] opacity-60" /> {/* Sky 100 */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#CFFAFE] rounded-full blur-[140px] opacity-50" /> {/* Cyan 100 */}
      
      {/* Noise Texture - Very Subtle */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay will-change-transform">
        <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence 
              type='fractalNoise' 
              baseFrequency='0.8' 
              numOctaves='3' 
              stitchTiles='stitch'
            />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>
    </div>
  );
};

export default GrainBackground;