"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Cpu } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 md:py-32 relative border-t border-white/[0.08] bg-gradient-to-b from-[#030303] via-[#080808] to-[#020202] overflow-hidden">
      {/* 3D Multi-Layer Ambient Neon Lighting Vortex */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 mix-blend-screen"
      >
        <div className="w-[850px] h-[400px] bg-gradient-to-r from-[#00f2fe]/20 via-[#7928ca]/25 to-[#ff0080]/20 blur-[150px] rounded-full animate-orb-2" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(0,242,254,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Friction • Immediate Access</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Supercharge Your Writing Workflow Today.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            No credit cards, no signups, no bloat. Experience high-velocity neural text rewriting directly in your browser.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#workspace"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-white rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(121,40,202,0.45)] hover:shadow-[0_0_55px_rgba(0,242,254,0.65)] transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080]" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Launch 3D Studio Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800/90 border border-white/15 hover:border-white/30 rounded-2xl backdrop-blur-2xl transition-all shadow-md"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Compare Pro Plans</span>
            </motion.a>
          </div>

          {/* Micro guarantees */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-mono">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ffb703]" />
              180ms p95 Latency
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00f5a0]" />
              Zero-Retention Privacy
            </span>
            <span className="text-neutral-700">•</span>
            <span className="text-cyan-300 font-semibold">99.4% Detection Bypass</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
