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
      case "SlidersHorizontal": return <SlidersHorizontal className="w-3.5 h-3.5 text-[#9d4edd]" />;
      case "FileText": return <FileText className="w-3.5 h-3.5 text-[#00f2fe]" />;
      case "Search": return <Search className="w-3.5 h-3.5 text-[#ffb703]" />;
      case "Stethoscope": return <Stethoscope className="w-3.5 h-3.5 text-[#ff0080]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#00f2fe]" />;
    }
  };

  const getToolGlow = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(0, 245, 160, 0.45)";
      case "tone-shifter": return "rgba(157, 78, 221, 0.5)";
      case "summarizer": return "rgba(0, 242, 254, 0.45)";
      case "seo-generator": return "rgba(255, 183, 3, 0.45)";
      case "grammar-doctor": return "rgba(255, 0, 128, 0.45)";
      default: return "rgba(0, 242, 254, 0.45)";
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      {/* 3D Volumetric Radiant Lighting Centerpiece */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[980px] h-[600px] bg-gradient-to-b from-[#4c1d95]/30 via-[#00f2fe]/20 to-transparent blur-[160px] opacity-85 -z-10 mix-blend-screen"
      />
      
      {/* Floating 3D Specular Accent Ring */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-28 left-1/2 -translate-x-1/2 w-[780px] h-[300px] border border-cyan-400/25 rounded-[100%] rotate-[-5deg] blur-[1px] -z-10 opacity-35 animate-pulse"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Live Usage Counter Badge with 3D Specular Rim */}
        <div className="flex justify-center mb-8">
          <LiveCounterBadge initialCount={1492810} />
        </div>

        {/* Main H1 Headline with Multi-Stop Chromatic Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight sm:tracking-tighter text-white leading-[1.08]"
        >
          <span className="text-chromatic-hero block">
            High-Velocity AI Text Engine
          </span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#a855f7] via-[#ec4899] to-[#ff0080] filter drop-shadow-[0_0_35px_rgba(121,40,202,0.45)]">
            for Creators & Engineers
          </span>
        </motion.h1>

        {/* High-Contrast Subtitle with Luminous Highlights */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal"
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
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto"
        >
          {TOOLS.map((tool) => {
            const isActive = activeToolId === tool.id;
            const glowColor = getToolGlow(tool.id);

            return (
              <motion.button
                key={tool.id}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                onClick={() => {
                  onSelectTool(tool.id);
                  const el = document.getElementById("workspace");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  boxShadow: isActive 
                    ? `0 0 28px -2px ${glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.35)` 
                    : "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
                }}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-[#0f0e26]/95 border-white/40 text-white shadow-xl"
                    : "bg-[#09081a]/75 hover:bg-[#12102e]/85 border-white/10 hover:border-white/30 text-neutral-300 hover:text-white backdrop-blur-2xl"
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

        {/* CTA Buttons with 3D Physical Depth & Framer Spring Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.4 }}
          className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Glowing Primary CTA */}
          <motion.a
            href="#workspace"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(76,29,149,0.7),0_0_50px_rgba(0,242,254,0.4)] hover:shadow-[0_20px_55px_-10px_rgba(0,242,254,0.7),0_0_65px_rgba(219,39,119,0.5)] transition-all"
          >
            {/* Multi-Stop Gradient Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777] group-hover:opacity-100 opacity-95 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777] blur-lg opacity-40 group-hover:opacity-75 transition-opacity" />
            
            {/* Top specular highlight edge */}
            <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <span className="relative z-10 flex items-center gap-2 tracking-tight">
              <span>Open 3D Studio Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Secondary 3D Specular Glass CTA */}
          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-200 bg-[#09081a]/80 hover:bg-[#12102e]/85 border border-white/15 hover:border-white/35 rounded-2xl backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all"
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
          className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-neutral-300 font-medium"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5a0]" />
            <span>No Signup Required</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>Zero Data Logging Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>Sub-200ms Edge Inference</span>
          </div>
        </motion.div>

        {/* Social Proof Logos with Chamfered Glass Separator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/[0.08]"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-medium mb-6">
            Trusted by 45,000+ writers, founders, & teams worldwide
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
