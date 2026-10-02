"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Cpu } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-20 md:py-32 relative border-t border-white/[0.08] bg-gradient-to-b from-[#05050a] via-[#0b0822] to-[#05050a] overflow-hidden">
      {/* 3D Multi-Layer Volumetric Ambient Lighting Vortex */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10 mix-blend-screen"
      >
        <div className="w-[900px] h-[450px] bg-gradient-to-r from-[#4c1d95]/30 via-[#00f2fe]/20 to-[#db2777]/25 blur-[160px] rounded-full animate-volumetric-2" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(0,242,254,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Friction • Immediate Access</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight sm:tracking-tighter leading-tight">
            Supercharge Your Writing Workflow Today.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            No credit cards, no signups, no bloat. Experience high-velocity neural text rewriting directly in your browser.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#workspace"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-white rounded-2xl overflow-hidden shadow-[0_15px_45px_-10px_rgba(76,29,149,0.7),0_0_55px_rgba(0,242,254,0.45)] hover:shadow-[0_20px_55px_-10px_rgba(0,242,254,0.7),0_0_65px_rgba(219,39,119,0.5)] transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777]" />
              <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span className="relative z-10 flex items-center gap-2">
                <span>Launch 3D Studio Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-neutral-200 bg-[#09081d]/80 hover:bg-[#12102e]/85 border border-white/15 hover:border-white/35 rounded-2xl backdrop-blur-2xl transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.18)]"
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
