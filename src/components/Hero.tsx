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
  Flame,
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
      case "SlidersHorizontal": return <SlidersHorizontal className="w-3.5 h-3.5 text-[#9d4edd]" />;
      case "FileText": return <FileText className="w-3.5 h-3.5 text-[#00f2fe]" />;
      case "Search": return <Search className="w-3.5 h-3.5 text-[#ffb703]" />;
      case "Stethoscope": return <Stethoscope className="w-3.5 h-3.5 text-[#ff0080]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#00f2fe]" />;
    }
  };

  const getToolGlow = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(0, 245, 160, 0.4)";
      case "tone-shifter": return "rgba(157, 78, 221, 0.45)";
      case "summarizer": return "rgba(0, 242, 254, 0.4)";
      case "seo-generator": return "rgba(255, 183, 3, 0.4)";
      case "grammar-doctor": return "rgba(255, 0, 128, 0.4)";
      default: return "rgba(0, 242, 254, 0.4)";
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-42 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* 3D Radiant Lighting Centerpiece */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[580px] bg-gradient-to-b from-[#00f2fe]/20 via-[#7928ca]/25 to-transparent blur-[140px] opacity-80 -z-10 mix-blend-screen"
      />
      
      {/* Floating 3D Accent Rings */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-28 left-1/2 -translate-x-1/2 w-[720px] h-[260px] border border-cyan-500/20 rounded-[100%] rotate-[-6deg] blur-[1px] -z-10 opacity-40 animate-pulse"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Live Usage Counter Badge with 3D Specular Rim */}
        <div className="flex justify-center mb-8">
          <LiveCounterBadge initialCount={1492810} />
        </div>

        {/* Main H1 Headline with Multi-Stop Neon Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          High-Velocity AI Text Engine for{" "}
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#a855f7] via-[#ec4899] to-[#ff0080] filter drop-shadow-[0_0_35px_rgba(121,40,202,0.45)]">
            Creators & Engineers
          </span>
        </motion.h1>

        {/* Subtitle / CRO Copy with Glass Polish */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Five specialized neural engines unified in one 3D glass studio.
          Transform robotic drafts into human prose, shift brand voices, summarize meetings, 
          and generate rank-ready SEO tags in under <span className="text-white font-semibold underline decoration-cyan-400/60 decoration-2 underline-offset-4">200 milliseconds</span>.
        </motion.p>

        {/* Quick Tool Switcher Pills with 3D Spring Physics & Neon Glow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto"
        >
          {TOOLS.map((tool) => {
            const isActive = activeToolId === tool.id;
            const glowColor = getToolGlow(tool.id);

            return (
              <motion.button
                key={tool.id}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 450, damping: 20 }}
                onClick={() => {
                  onSelectTool(tool.id);
                  const el = document.getElementById("workspace");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  boxShadow: isActive ? `0 0 25px -4px ${glowColor}` : "none",
                }}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-neutral-900/90 border-white/40 text-white shadow-xl"
                    : "bg-neutral-950/70 hover:bg-neutral-900/80 border-white/10 hover:border-white/25 text-neutral-300 hover:text-white backdrop-blur-xl"
                }`}
              >
                {/* Active Tool Background Shine */}
                {isActive && (
                  <span 
                    aria-hidden="true" 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent pointer-events-none" 
                  />
                )}
                
                <span className="relative z-10">{getToolIcon(tool.icon)}</span>
                <span className="relative z-10">{tool.name}</span>
                <span className={`relative z-10 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive 
                    ? "bg-white/20 text-white font-bold" 
                    : "bg-white/5 text-neutral-400 group-hover:text-cyan-300"
                }`}>
                  {tool.badge}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA Buttons with 3D Aura & Spring Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.4 }}
          className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Glowing Primary CTA */}
          <motion.a
            href="#workspace"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(121,40,202,0.45)] hover:shadow-[0_0_55px_rgba(0,242,254,0.65)] transition-all"
          >
            {/* Animated Gradient Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080] group-hover:opacity-100 opacity-90 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            
            <span className="relative z-10 flex items-center gap-2 tracking-tight">
              <span>Open 3D Studio Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Secondary 3D Glass CTA */}
          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800/80 border border-white/15 hover:border-white/30 rounded-2xl backdrop-blur-2xl shadow-lg transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Explore 5 Engines</span>
            <ChevronRight className="w-4 h-4 text-neutral-500" />
          </motion.a>
        </motion.div>

        {/* 3D Floating Security & Privacy Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-medium"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5a0]" />
            <span>No Signup Required to Start</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>Zero Data Logging & Retention</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>Instant Results (&lt; 200ms)</span>
          </div>
        </motion.div>

        {/* Social Proof Logos with 3D Depth Separator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.08]"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-medium mb-6">
            Empowering 45,000+ writers, founders, & teams worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-cyan-400 transition-colors cursor-default">
              STRIPE
            </span>
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-violet-400 transition-colors cursor-default">
              VERCEL
            </span>
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-fuchsia-400 transition-colors cursor-default">
              LINEAR
            </span>
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-cyan-400 transition-colors cursor-default">
              NOTION
            </span>
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-emerald-400 transition-colors cursor-default">
              SUPABASE
            </span>
            <span className="font-bold tracking-tight text-neutral-200 text-sm sm:text-base font-mono hover:text-amber-400 transition-colors cursor-default">
              RAYCAST
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
