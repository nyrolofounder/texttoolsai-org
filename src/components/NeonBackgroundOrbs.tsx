"use client";

import React from "react";

export default function NeonBackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden -z-20 select-none bg-[#030712]"
    >
      {/* 1. Multi-Dimensional Obsidian-Indigo & Slate-Blue Base Ambient Canvas */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712] opacity-95" 
      />
      
      {/* Warm Midnight Violet Ambient Header Glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(46,16,101,0.22),transparent_70%)]" 
      />

      {/* Subtle Slate-Blue Mid-Body Atmosphere */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(30,41,59,0.35),transparent_75%)]" 
      />

      {/* 2. Layered Animated Micro-Mesh Grid with Subtle Radial Vignette */}
      <div 
        className="absolute inset-0 bg-mesh-grid animate-mesh opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" 
      />

      {/* 3. Drifting Soft Ambient Radial 1: Top-Left Refined Electric Cyan & Violet */}
      <div 
        className="absolute -top-32 -left-32 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-[#1e1b4b]/30 via-[#06b6d4]/14 to-transparent blur-[150px] opacity-70 animate-volumetric-1 mix-blend-screen" 
      />

      {/* 4. Drifting Soft Ambient Radial 2: Top-Right Warm Midnight Violet & Rose */}
      <div 
        className="absolute top-16 -right-32 w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-[#4c1d95]/25 via-[#be185d]/12 to-transparent blur-[140px] opacity-65 animate-volumetric-2 mix-blend-screen" 
      />

      {/* 5. Drifting Soft Ambient Radial 3: Center-Studio Cockpit Ambient Spotlight */}
      <div 
        className="absolute top-[32%] left-1/2 -translate-x-1/2 w-[920px] h-[540px] rounded-full bg-gradient-to-r from-[#1e293b]/25 via-[#06b6d4]/12 to-[#3b0764]/18 blur-[160px] opacity-60 animate-volumetric-3 mix-blend-screen" 
      />

      {/* 6. Drifting Soft Ambient Radial 4: Mid-Lower Slate-Blue & Midnight Indigo */}
      <div 
        className="absolute top-[64%] -left-36 w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-[#06b6d4]/12 via-[#1e1b4b]/20 to-transparent blur-[150px] opacity-55 animate-volumetric-1 mix-blend-screen" 
      />

      {/* 7. Drifting Soft Ambient Radial 5: Bottom Warm Violet & Soft Amber Tone */}
      <div 
        className="absolute -bottom-48 right-4 w-[700px] h-[550px] rounded-full bg-gradient-to-t from-[#3b0764]/20 via-[#1e293b]/25 to-transparent blur-[150px] opacity-65 animate-volumetric-2 mix-blend-screen" 
      />

      {/* 8. Atmospheric Edge Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.4)_70%,#030712_100%)] pointer-events-none" 
      />
    </div>
  );
}
