"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Cpu } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 md:py-32 relative border-t border-slate-200/80 bg-gradient-to-b from-[#f8fafc] via-indigo-50/40 to-[#f8fafc] overflow-hidden">
      {/* 3D Multi-Layer Volumetric Ambient Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
      >
        <div className="w-[850px] h-[400px] bg-gradient-to-r from-indigo-200/40 via-violet-200/30 to-pink-200/30 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Zero Friction • Immediate Access</span>
          </div>

          <h2 className="text-fluid-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Supercharge Your Writing Workflow Today.
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No credit cards, no signups, no bloat. Experience high-velocity neural text rewriting directly in your browser.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <motion.a
              href="#workspace"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto min-h-[48px] relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-bold text-white rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-[0_15px_35px_-5px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Launch 3D Studio Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="/#pricing"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl backdrop-blur-xl transition-all shadow-sm cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>Compare Pro Plans</span>
            </motion.a>
          </div>

          {/* Micro guarantees */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              180ms p95 Latency
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              Zero-Retention Privacy
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-600 font-bold">99.4% Detection Bypass</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
