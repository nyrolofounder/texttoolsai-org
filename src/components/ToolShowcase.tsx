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
      case "Sparkles": return <Sparkles className="w-5 h-5 text-emerald-600" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-5 h-5 text-violet-600" />;
      case "FileText": return <FileText className="w-5 h-5 text-cyan-600" />;
      case "Search": return <Search className="w-5 h-5 text-amber-600" />;
      case "Stethoscope": return <Stethoscope className="w-5 h-5 text-rose-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getToolGlow = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(16, 185, 129, 0.16)";
      case "tone-shifter": return "rgba(139, 92, 246, 0.16)";
      case "summarizer": return "rgba(6, 182, 212, 0.16)";
      case "seo-generator": return "rgba(245, 158, 11, 0.16)";
      case "grammar-doctor": return "rgba(244, 63, 94, 0.16)";
      default: return "rgba(99, 102, 241, 0.16)";
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-32 relative border-t border-slate-200/80 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Chromatic Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Engine Architecture</span>
          </div>
          <h2 className="text-fluid-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Built for Extreme Precision, Not Generic Chat
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600">
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
                className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shrink-0 min-h-[44px] transition-all cursor-pointer ${
                  isActive
                    ? "bg-white border-2 border-indigo-500/60 text-indigo-700 shadow-md ring-2 ring-indigo-500/10"
                    : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/90 shadow-xs"
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
              boxShadow: `0 25px 60px -15px ${getToolGlow(selectedTool.id)}, 0 0 35px -10px ${getToolGlow(selectedTool.id)}, inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`,
            }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
          >
            {/* Top specular reflection line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 via-violet-500/40 to-transparent" />

            {/* Ambient neon backdrop orb */}
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/50 via-violet-100/40 to-pink-100/40 blur-3xl pointer-events-none opacity-60"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Tool Details & Value Prop */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 shadow-xs">
                    {getToolIcon(selectedTool.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-medium">
                      {selectedTool.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                      {selectedTool.name}
                    </h3>
                  </div>
                </div>

                <p className="text-base text-slate-800 font-semibold leading-relaxed">
                  {selectedTool.tagline}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedTool.shortDesc}
                </p>

                {/* Key Benefits with checkmarks */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time metric telemetry & audit diffing</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Eliminates robotic phrasing & hallucinations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
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
                    className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] min-h-[46px] transition-all cursor-pointer"
                  >
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
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 relative shadow-xs backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-800 uppercase tracking-wider mb-2 font-bold">
                    <span>Input (Raw / Generic Draft)</span>
                    <span className="text-[11px] text-amber-600">Before</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans line-clamp-4">
                    {selectedTool.defaultInput}
                  </p>
                </div>

                {/* After Box with Emerald Border */}
                <div className="rounded-2xl border border-emerald-300/80 bg-emerald-50/50 p-5 relative shadow-[0_0_25px_rgba(16,185,129,0.12)] backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-800 uppercase tracking-wider mb-2 font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      Synthesized Output ({selectedTool.name})
                    </span>
                    <span className="text-[11px] text-emerald-700">Result</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap line-clamp-5">
                    {selectedTool.defaultOutput}
                  </p>
                </div>

                {/* Micro Metric Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-xs backdrop-blur-xl">
                    <span className="text-xs text-slate-500 font-mono">
                      {selectedTool.metricsSummary.primaryMetric}
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-600">
                      {selectedTool.metricsSummary.primaryValue}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-xs backdrop-blur-xl">
                    <span className="text-xs text-slate-500 font-mono">
                      {selectedTool.metricsSummary.secondaryMetric}
                    </span>
                    <span className="text-sm font-mono font-bold text-indigo-600">
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
