"use client";

import React from "react";

export default function NeonBackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden -z-20 select-none"
    >
      {/* Top Left: Electric Cyan & Neon Violet Fusion */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#00f2fe]/20 via-[#7928ca]/20 to-transparent blur-[140px] opacity-75 animate-orb-1" />

      {/* Top Right: Hot Magenta & Pink Aura */}
      <div className="absolute top-10 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#ff0080]/18 via-[#7928ca]/15 to-transparent blur-[130px] opacity-70 animate-orb-2" />

      {/* Middle Center (Behind Workspace): Neon Violet & Emerald Spotlight */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-gradient-to-r from-[#7928ca]/15 via-[#00f2fe]/10 to-[#00f5a0]/15 blur-[160px] opacity-65 animate-orb-3" />

      {/* Lower Section (Behind Pricing/Features): Hot Neon Cyan & Violet Glow */}
      <div className="absolute top-[65%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00f5a0]/12 via-[#00f2fe]/15 to-[#7928ca]/10 blur-[150px] opacity-60 animate-orb-1" />

      {/* Bottom Center (Above Footer): Hot Magenta & Neon Violet Spotlight */}
      <div className="absolute -bottom-40 right-10 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-[#ff0080]/20 via-[#7928ca]/15 to-transparent blur-[150px] opacity-70 animate-orb-2" />

      {/* Fine radial overlay vignette for rich contrast */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030303]/40 to-[#030303] pointer-events-none" />
    </div>
  );
}
