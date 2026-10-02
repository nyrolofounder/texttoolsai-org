"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Search, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle,
  Zap
} from "lucide-react";
import { TOOLS } from "@/data/tools";

interface ToolShowcaseProps {
  onSelectTool: (toolId: string) => void;
}

export default function ToolShowcase({ onSelectTool }: ToolShowcaseProps) {
  const [activeTab, setActiveTab] = useState(TOOLS[0].id);

  const selectedTool = TOOLS.find((t) => t.id === activeTab) || TOOLS[0];

  const getToolIcon = (name: string) => {
    switch (name) {
      case "Sparkles": return <Sparkles className="w-5 h-5 text-[#00f5a0]" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-5 h-5 text-[#c084fc]" />;
      case "FileText": return <FileText className="w-5 h-5 text-[#00f2fe]" />;
      case "Search": return <Search className="w-5 h-5 text-[#ffb703]" />;
      case "Stethoscope": return <Stethoscope className="w-5 h-5 text-[#db2777]" />;
      default: return <Sparkles className="w-5 h-5 text-[#00f2fe]" />;
    }
  };

  const getToolGlow = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(0, 245, 160, 0.35)";
      case "tone-shifter": return "rgba(121, 40, 202, 0.4)";
      case "summarizer": return "rgba(0, 242, 254, 0.35)";
      case "seo-generator": return "rgba(255, 183, 3, 0.35)";
      case "grammar-doctor": return "rgba(219, 39, 119, 0.38)";
      default: return "rgba(0, 242, 254, 0.35)";
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-32 relative border-t border-white/[0.08] bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Chromatic Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engine Architecture</span>
          </div>
          <h2 className="text-fluid-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for Extreme Precision, Not Generic Chat
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300">
            Unlike general-purpose LLMs that waffle with polite apologies, each TextTools engine is tuned for a distinct production outcome with verifiable metrics.
          </p>
        </div>

        {/* 5 Tool Nav Tabs with Chamfered Glass & Mobile Horizontal Scroll */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none pb-3 sm:pb-0 mb-8 sm:mb-12 touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {TOOLS.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <motion.button
                key={tool.id}
                type="button"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                onClick={() => setActiveTab(tool.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shrink-0 min-h-[44px] transition-all ${
                  isActive
                    ? "bg-[#0b0f19] border border-cyan-500/40 text-white shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                    : "bg-[#0b0f19]/60 text-neutral-400 hover:text-white hover:bg-[#0b0f19]/90 border border-white/10"
                }`}
              >
                {getToolIcon(tool.icon)}
                <span>{tool.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Tool Showcase 3D Chamfered Glass Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              boxShadow: `0 35px 90px -20px ${getToolGlow(selectedTool.id)}, 0 0 50px -15px ${getToolGlow(selectedTool.id)}, inset 0 1px 0 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 0 rgba(0, 0, 0, 0.5)`,
            }}
            className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0b0f19]/90 p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
          >
            {/* Top specular reflection line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 via-violet-400/50 via-pink-400/50 to-transparent" />

            {/* Ambient neon backdrop orb */}
            <div
              className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${selectedTool.gradient} blur-3xl pointer-events-none opacity-50 mix-blend-screen`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Tool Details & Value Prop */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#12102e] border border-white/15 shadow-inner">
                    {getToolIcon(selectedTool.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/15 font-medium">
                      {selectedTool.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                      {selectedTool.name}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-neutral-200 font-semibold leading-relaxed">
                  {selectedTool.tagline}
                </p>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {selectedTool.shortDesc}
                </p>

                {/* Key Benefits with neon checkmarks */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle className="w-4 h-4 text-[#00f5a0] shrink-0" />
                    <span>Real-time metric telemetry & audit diffing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle className="w-4 h-4 text-[#00f5a0] shrink-0" />
                    <span>Eliminates robotic phrasing & hallucinations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-200">
                    <CheckCircle className="w-4 h-4 text-[#00f5a0] shrink-0" />
                    <span>Instant copy to clipboard with keyboard shortcuts</span>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    onClick={() => {
                      onSelectTool(selectedTool.id);
                      const el = document.getElementById("workspace");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden shadow-[0_10px_35px_rgba(0,242,254,0.35)] min-h-[46px] transition-all"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777]" />
                    <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Launch {selectedTool.name} in Studio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Right Column: 3D Before / After Comparison */}
              <div className="lg:col-span-7 space-y-4">
                {/* Before Box */}
                <div className="rounded-2xl border border-rose-900/40 bg-rose-950/20 p-5 relative shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 font-bold">
                    <span>Input (Raw / Generic Draft)</span>
                    <span className="text-[11px] text-neutral-400">Before</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans line-clamp-4">
                    {selectedTool.defaultInput}
                  </p>
                </div>

                {/* After Box with Neon Emerald Border */}
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 relative shadow-[0_0_30px_rgba(0,245,160,0.18)] backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-[#00f5a0] uppercase tracking-wider mb-2 font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
                      Synthesized Output ({selectedTool.name})
                    </span>
                    <span className="text-[11px] text-[#00f5a0]">Result</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed font-sans whitespace-pre-wrap line-clamp-5">
                    {selectedTool.defaultOutput}
                  </p>
                </div>

                {/* Micro Metric Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between shadow-inner backdrop-blur-xl">
                    <span className="text-xs text-neutral-400 font-mono">
                      {selectedTool.metricsSummary.primaryMetric}
                    </span>
                    <span className="text-sm font-mono font-bold text-[#00f5a0]">
                      {selectedTool.metricsSummary.primaryValue}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between shadow-inner backdrop-blur-xl">
                    <span className="text-xs text-neutral-400 font-mono">
                      {selectedTool.metricsSummary.secondaryMetric}
                    </span>
                    <span className="text-sm font-mono font-bold text-cyan-300">
                      {selectedTool.metricsSummary.secondaryValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
