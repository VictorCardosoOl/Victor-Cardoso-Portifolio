import React from 'react';

const GrainBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      {/* Background Color Base */}
      <div className="absolute inset-0 bg-paper"></div>

      {/* Lightweight CSS Noise */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      {/* Subtle "Petrol" Atmospheric Glows (Fixed positions for performance) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#064E5E] rounded-full blur-[180px] opacity-[0.08]" /> 
      {/* Replaced Turquoise with Cool Silver/Mid Petrol */}
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#CBD5E1] rounded-full blur-[180px] opacity-[0.06]" />
    </div>
  );
};

export default GrainBackground;