"use client";

import React from "react";

export default function NeonBackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden -z-20 select-none bg-[#05050a]"
    >
      {/* 1. Deep Space Ambient Lighting Gradients (Obsidian, Indigo & Deep Violet) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#05050a] via-[#09071a] to-[#05050a] opacity-90" 
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(76,29,149,0.22),transparent_70%)]" 
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgba(15,10,35,0.8),transparent_80%)]" 
      />

      {/* 2. Layered Animated Mesh Grid with Radial Vignette */}
      <div 
        className="absolute inset-0 bg-mesh-grid animate-mesh opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" 
      />

      {/* 3. Drifting Volumetric Radial Glow 1: Top-Left Deep Violet & Electric Cyan */}
      <div 
        className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#4c1d95]/35 via-[#00f2fe]/20 to-transparent blur-[160px] opacity-80 animate-volumetric-1 mix-blend-screen" 
      />

      {/* 4. Drifting Volumetric Radial Glow 2: Top-Right Vibrant Magenta & Violet */}
      <div 
        className="absolute top-16 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#db2777]/25 via-[#4c1d95]/30 to-transparent blur-[150px] opacity-75 animate-volumetric-2 mix-blend-screen" 
      />

      {/* 5. Drifting Volumetric Radial Glow 3: Center-Studio Cockpit Volumetric Spotlight */}
      <div 
        className="absolute top-[32%] left-1/2 -translate-x-1/2 w-[980px] h-[600px] rounded-full bg-gradient-to-r from-[#4c1d95]/22 via-[#00f2fe]/16 to-[#db2777]/20 blur-[180px] opacity-70 animate-volumetric-3 mix-blend-screen" 
      />

      {/* 6. Drifting Volumetric Radial Glow 4: Mid-Lower Cyan & Deep Indigo Drift */}
      <div 
        className="absolute top-[62%] -left-40 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#00f2fe]/20 via-[#4c1d95]/25 to-transparent blur-[160px] opacity-65 animate-volumetric-1 mix-blend-screen" 
      />

      {/* 7. Drifting Volumetric Radial Glow 5: Bottom Vibrant Magenta & Deep Violet */}
      <div 
        className="absolute -bottom-48 right-4 w-[750px] h-[600px] rounded-full bg-gradient-to-t from-[#db2777]/25 via-[#4c1d95]/28 to-transparent blur-[170px] opacity-75 animate-volumetric-2 mix-blend-screen" 
      />

      {/* 8. Specular Star Field & High-Contrast Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,10,0.4)_70%,#05050a_100%)] pointer-events-none" 
      />
    </div>
  );
}
