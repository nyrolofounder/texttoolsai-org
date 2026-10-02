"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Search, 
  Stethoscope, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Cpu
} from "lucide-react";
import LiveCounterBadge from "./LiveCounterBadge";
import { TOOLS } from "@/data/tools";

interface HeroProps {
  activeToolId: string;
  onSelectTool: (toolId: string) => void;
}

export default function Hero({ activeToolId, onSelectTool }: HeroProps) {
  const getToolIcon = (name: string) => {
    switch (name) {
      case "Sparkles": return <Sparkles className="w-3.5 h-3.5 text-[#00f5a0]" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-3.5 h-3.5 text-[#c084fc]" />;
      case "FileText": return <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />;
      case "Search": return <Search className="w-3.5 h-3.5 text-[#fbbf24]" />;
      case "Stethoscope": return <Stethoscope className="w-3.5 h-3.5 text-[#f43f5e]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />;
    }
  };

  const getToolGlow = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(0, 245, 160, 0.4)";
      case "tone-shifter": return "rgba(192, 132, 252, 0.4)";
      case "summarizer": return "rgba(6, 182, 212, 0.4)";
      case "seo-generator": return "rgba(251, 191, 36, 0.4)";
      case "grammar-doctor": return "rgba(244, 63, 94, 0.4)";
      default: return "rgba(6, 182, 212, 0.4)";
    }
  };

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* 3D Volumetric Radiant Lighting Centerpiece */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[550px] bg-gradient-to-b from-[#1e1b4b]/30 via-[#06b6d4]/15 to-transparent blur-[150px] opacity-80 -z-10 mix-blend-screen"
      />
      
      {/* Floating 3D Specular Accent Ring */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-[650px] max-w-[90vw] h-[260px] border border-cyan-400/20 rounded-[100%] rotate-[-4deg] blur-[1px] -z-10 opacity-30 animate-pulse"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Live Usage Counter Badge with 3D Specular Rim */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <LiveCounterBadge initialCount={1492810} />
        </div>

        {/* Main H1 Headline with Fluid Typography & Chromatic Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
          className="text-fluid-hero font-extrabold tracking-tight sm:tracking-tighter text-white"
        >
          <span className="text-chromatic-hero block">
            High-Velocity AI Text Engine
          </span>
          <span className="block mt-1.5 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] via-[#8b5cf6] via-[#ec4899] to-[#f43f5e] filter drop-shadow-[0_0_30px_rgba(109,40,217,0.35)]">
            for Creators & Engineers
          </span>
        </motion.h1>

        {/* High-Contrast Subtitle with Luminous Highlights */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
          className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal px-1 sm:px-0"
        >
          Five specialized neural engines unified in a 3D glass studio cockpit.
          Transform robotic drafts into human prose, shift brand voices, extract executive summaries, 
          and generate rank-ready SEO tags in under <span className="text-cyan-300 font-semibold underline decoration-cyan-400/60 decoration-2 underline-offset-4">200 milliseconds</span>.
        </motion.p>

        {/* Quick Tool Switcher Pills with Chamfered Glass & Spring Physics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto px-1 sm:px-0"
        >
          {TOOLS.map((tool) => {
            const isActive = activeToolId === tool.id;
            const glowColor = getToolGlow(tool.id);

            return (
              <motion.button
                key={tool.id}
                type="button"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                onClick={() => {
                  onSelectTool(tool.id);
                  const el = document.getElementById("workspace");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  boxShadow: isActive 
                    ? `0 0 24px -2px ${glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.3)` 
                    : "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                }}
                className={`group relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-[#0b0f19] border-white/30 text-white shadow-xl"
                    : "bg-[#0b0f19]/70 hover:bg-[#111625]/80 border-white/10 hover:border-white/25 text-white/80 hover:text-white backdrop-blur-xl"
                }`}
              >
                {/* Active Tool Background Shine */}
                {isActive && (
                  <span 
                    aria-hidden="true" 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white/15 via-white/5 to-transparent pointer-events-none" 
                  />
                )}
                
                <span className="relative z-10">{getToolIcon(tool.icon)}</span>
                <span className="relative z-10">{tool.name}</span>
                <span className={`relative z-10 text-[10px] font-mono px-2 py-0.5 rounded-full hidden sm:inline-block ${
                  isActive 
                    ? "bg-white/20 text-white font-bold" 
                    : "bg-white/5 text-white/50 group-hover:text-cyan-300"
                }`}>
                  {tool.badge}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA Buttons with Mobile Touch Target Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.4 }}
          className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Glowing Primary CTA */}
          <motion.a
            href="#workspace"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="w-full sm:w-auto min-h-[48px] relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-white rounded-xl overflow-hidden shadow-[0_10px_35px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_45px_-5px_rgba(6,182,212,0.6)] transition-all"
          >
            {/* Multi-Stop Gradient Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-[#6366f1] to-[#a855f7] group-hover:opacity-100 opacity-95 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-[#6366f1] to-[#a855f7] blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
            
            {/* Top specular highlight edge */}
            <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <span className="relative z-10 flex items-center gap-2 tracking-tight">
              <span>Open 3D Studio Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Secondary Glass CTA */}
          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white/90 bg-[#0b0f19]/80 hover:bg-[#111625]/90 border border-white/10 hover:border-white/25 rounded-xl backdrop-blur-xl shadow-sm transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Explore 5 Engines</span>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </motion.a>
        </motion.div>

        {/* Floating Security & Privacy Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-white/70 font-medium px-2"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5a0]" />
            <span>No Signup Required</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>Zero Data Logging Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Sub-200ms Edge Inference</span>
          </div>
        </motion.div>

        {/* Social Proof Logos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.08]"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-white/50 font-mono font-medium mb-6">
            Trusted by 45,000+ writers, founders, & teams worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-cyan-400 transition-colors cursor-default">
              STRIPE
            </span>
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-violet-400 transition-colors cursor-default">
              VERCEL
            </span>
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-fuchsia-400 transition-colors cursor-default">
              LINEAR
            </span>
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-cyan-400 transition-colors cursor-default">
              NOTION
            </span>
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-emerald-400 transition-colors cursor-default">
              SUPABASE
            </span>
            <span className="font-bold tracking-tight text-white/80 text-xs sm:text-sm font-mono hover:text-amber-400 transition-colors cursor-default">
              RAYCAST
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
