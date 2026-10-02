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
  const getToolIcon = (name: string, isActive: boolean) => {
    switch (name) {
      case "Sparkles": return <Sparkles className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-600"}`} />;
      case "SlidersHorizontal": return <SlidersHorizontal className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-violet-600"}`} />;
      case "FileText": return <FileText className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-cyan-600"}`} />;
      case "Search": return <Search className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-amber-600"}`} />;
      case "Stethoscope": return <Stethoscope className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-rose-600"}`} />;
      default: return <Sparkles className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-indigo-600"}`} />;
    }
  };

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* 3D Volumetric Radiant Lighting Centerpiece */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[550px] bg-gradient-to-b from-indigo-500/15 via-violet-400/12 to-transparent blur-[140px] opacity-80 -z-10 mix-blend-multiply"
      />
      
      {/* Floating 3D Specular Accent Ring */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[260px] border border-indigo-300/40 rounded-[100%] rotate-[-4deg] blur-[1px] -z-10 opacity-40 animate-pulse"
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
          className="text-fluid-hero font-extrabold tracking-tight sm:tracking-tighter text-slate-900"
        >
          <span className="block text-slate-900 tracking-tight">
            High-Velocity AI Text Engine
          </span>
          <span className="block mt-1.5 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 via-pink-600 to-cyan-600 filter drop-shadow-[0_2px_15px_rgba(99,102,241,0.2)]">
            for Creators & Engineers
          </span>
        </motion.h1>

        {/* High-Contrast Subtitle with Crisp Readability */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.2 }}
          className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-normal px-1 sm:px-0"
        >
          Five specialized neural engines unified in a 3D glass studio cockpit.
          Transform robotic drafts into human prose, shift brand voices, extract executive summaries, 
          and generate rank-ready SEO tags in under <span className="text-indigo-600 font-bold underline decoration-indigo-400/60 decoration-2 underline-offset-4">200 milliseconds</span>.
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
                className={`group relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-[0_8px_20px_-3px_rgba(79,70,229,0.45)] border border-indigo-600"
                    : "bg-white/85 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/90 hover:border-indigo-300 shadow-xs backdrop-blur-xl"
                }`}
              >
                <span className="relative z-10">{getToolIcon(tool.icon, isActive)}</span>
                <span className="relative z-10">{tool.name}</span>
                <span className={`relative z-10 text-[10px] font-mono px-2 py-0.5 rounded-full hidden sm:inline-block ${
                  isActive 
                    ? "bg-white/20 text-white font-bold" 
                    : "bg-slate-100 text-slate-500 group-hover:text-indigo-600"
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
            className="w-full sm:w-auto min-h-[48px] relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-white rounded-xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(79,70,229,0.55)] transition-all bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400"
          >
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
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-800 bg-white/90 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-xl backdrop-blur-xl shadow-xs hover:shadow-md transition-all"
          >
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Explore 5 Engines</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.a>
        </motion.div>

        {/* Floating Security & Privacy Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-slate-600 font-medium px-2"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 backdrop-blur-md shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>No Signup Required</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 backdrop-blur-md shadow-xs">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Zero Data Logging Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 backdrop-blur-md shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Sub-200ms Edge Inference</span>
          </div>
        </motion.div>

        {/* Social Proof Logos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-400 font-mono font-bold mb-6">
            Trusted by 45,000+ writers, founders, & teams worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-indigo-600 transition-colors cursor-default">
              STRIPE
            </span>
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-violet-600 transition-colors cursor-default">
              VERCEL
            </span>
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-pink-600 transition-colors cursor-default">
              LINEAR
            </span>
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-cyan-600 transition-colors cursor-default">
              NOTION
            </span>
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-emerald-600 transition-colors cursor-default">
              SUPABASE
            </span>
            <span className="font-extrabold tracking-tight text-slate-700 text-xs sm:text-sm font-mono hover:text-amber-600 transition-colors cursor-default">
              RAYCAST
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
