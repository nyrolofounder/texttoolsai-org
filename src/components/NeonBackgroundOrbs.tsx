"use client";

import React from "react";

export default function NeonBackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden -z-20 select-none bg-[#f8fafc]"
    >
      {/* 1. Multi-Dimensional Radiant Clean Light Canvas Base */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#f1f5f9] opacity-95" 
      />
      
      {/* Radiant Indigo & Violet Ambient Header Glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.18),transparent_70%)]" 
      />

      {/* Soft Sky-Cyan Mid-Body Ambient Atmosphere */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(6,182,212,0.08),transparent_75%)]" 
      />

      {/* 2. Layered Animated Micro-Mesh Grid with Soft Radial Mask */}
      <div 
        className="absolute inset-0 bg-mesh-grid animate-mesh opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" 
      />

      {/* 3. Drifting Radiant Orb 1: Top-Left Electric Cyan & Luminous Indigo */}
      <div 
        className="absolute -top-28 -left-28 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-[#6366f1]/25 via-[#06b6d4]/18 to-transparent blur-[130px] opacity-80 animate-volumetric-1 mix-blend-multiply" 
      />

      {/* 4. Drifting Radiant Orb 2: Top-Right Vibrant Violet & Rose */}
      <div 
        className="absolute top-12 -right-28 w-[640px] h-[640px] rounded-full bg-gradient-to-bl from-[#a855f7]/22 via-[#ec4899]/16 to-transparent blur-[140px] opacity-75 animate-volumetric-2 mix-blend-multiply" 
      />

      {/* 5. Drifting Radiant Orb 3: Center Studio Cockpit Ambient Spotlight */}
      <div 
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[980px] h-[580px] rounded-full bg-gradient-to-r from-[#818cf8]/15 via-[#38bdf8]/12 to-[#c084fc]/15 blur-[160px] opacity-70 animate-volumetric-3 mix-blend-multiply" 
      />

      {/* 6. Drifting Radiant Orb 4: Mid-Lower Indigo & Electric Cyan */}
      <div 
        className="absolute top-[62%] -left-32 w-[660px] h-[660px] rounded-full bg-gradient-to-tr from-[#06b6d4]/14 via-[#6366f1]/18 to-transparent blur-[140px] opacity-65 animate-volumetric-1 mix-blend-multiply" 
      />

      {/* 7. Drifting Radiant Orb 5: Bottom Violet & Soft Amber Tone */}
      <div 
        className="absolute -bottom-44 right-2 w-[720px] h-[560px] rounded-full bg-gradient-to-t from-[#8b5cf6]/16 via-[#f59e0b]/10 to-transparent blur-[150px] opacity-70 animate-volumetric-2 mix-blend-multiply" 
      />

      {/* 8. Pristine Outer Edge Feathering */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.3)_70%,#f8fafc_100%)] pointer-events-none" 
      />
    </div>
  );
}
