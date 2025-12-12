import React from 'react';

const GrainBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
      {/* Base Paper Color */}
      <div className="absolute inset-0 bg-[#F2F4F6]"></div>

      {/* Lightweight Static Noise (Base64 PNG) - Zero GPU Impact */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAA5OTkAAABMTExERERmZmYzMzMyMjJ4Fk26AAAACHRSTlMAMwAqzMzM/wO31HQAAABWSURBVDjLZ2AYBaNg2AJGJiBpCqSNAUiTIBgMICkMIIUBIDGQBEhlAElgAElgAElhAElhAElhAElgAElgAElgAElgAElgAElhAElhAElhAElhAElgAFAAAJvtC/k5258hAAAAAElFTkSuQmCC")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      {/* Atmospheric Glows - Fixed positions with will-change for compositor promotion */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#064E5E] rounded-full blur-[120px] opacity-[0.06] will-change-transform" /> 
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#2DD4BF] rounded-full blur-[140px] opacity-[0.04] will-change-transform" />
    </div>
  );
};

export default GrainBackground;