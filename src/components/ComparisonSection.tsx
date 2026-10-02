"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Cpu, Sparkles } from "lucide-react";

export default function ComparisonSection() {
  const comparisonItems = [
    {
      feature: "Bypass AI Detectors (Turnitin, GPTZero, Copyleaks)",
      textTools: "99.4% Pass Rate (Organic rhythm & natural burstiness)",
      chatGpt: "Fails (High perplexity clusters, flagged as 95%+ AI)",
      legacy: "Partial (Clunky synonym swapping triggers flags)",
    },
    {
      feature: "Workflow Latency & Speed",
      textTools: "< 200ms instant edge execution",
      chatGpt: "15 - 45s slow streaming queue",
      legacy: "2 - 5s with page reloads",
    },
    {
      feature: "Data Privacy & Training",
      textTools: "100% Zero-Retention. In-memory execution only",
      chatGpt: "Used to train future model iterations by default",
      legacy: "Stored in proprietary databases",
    },
    {
      feature: "Meeting Transcript Summarization",
      textTools: "Auto-extracts JIRA items, owners, and decisions",
      chatGpt: "Requires writing complex 200-word prompt recipes",
      legacy: "Not supported or expensive add-on",
    },
    {
      feature: "Search Engine SERP Pixel Preview",
      textTools: "Pixel-perfect Google desktop/mobile truncation test",
      chatGpt: "No pixel calculation; character count guessing",
      legacy: "Separate standalone tool required",
    },
    {
      feature: "Keyboard-First Productivity",
      textTools: "⌘+Enter instant synthesis, one-click copy & diff",
      chatGpt: "Multi-click chat history and scrolling",
      legacy: "Cluttered ad-heavy interfaces",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative border-t border-white/[0.08] bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(121,40,202,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-fluid-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Precision, Not Conversation
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300">
            Generic chatbots are designed to chit-chat. TextToolsAI is built for high-output professionals who need surgical text results without prompt wrangling.
          </p>
        </div>

        {/* Comparison Matrix Table with Chamfered Glass */}
        <div 
          style={{
            boxShadow: "0 35px 90px -25px rgba(0, 0, 0, 0.95), 0 0 50px -15px rgba(76, 29, 149, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)",
          }}
          className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0b0f19]/80 overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* Top specular reflection line */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 via-violet-400/50 to-transparent" />

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#0e1424]/90">
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-bold text-neutral-300 w-1/3">
                    Capability & Architecture
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-extrabold text-white bg-cyan-500/[0.08] border-x border-cyan-500/30 w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-cyan-300 font-mono text-sm sm:text-base">TextToolsAI.org</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-medium hidden sm:inline">
                        Purpose-Built
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-400 w-1/6">
                    Generic Chatbots (ChatGPT / Claude)
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-semibold text-neutral-400 w-1/6">
                    Legacy Paraphrasers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.025] transition-colors">
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-neutral-200 font-medium">
                      {item.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-emerald-300 bg-cyan-500/[0.03] border-x border-cyan-500/25 font-semibold">
                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <Check className="w-4 h-4 text-[#00f5a0] shrink-0 mt-0.5" />
                        <span>{item.textTools}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-neutral-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item.chatGpt}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-neutral-500">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                        <span>{item.legacy}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3D Chamfered Glass Callout Card Underneath */}
        <div 
          style={{
            boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 254, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)",
          }}
          className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0b0f19]/90 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Ready to cut hours of tedious prompt engineering?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                Launch the interactive studio and start processing text immediately.
              </p>
            </div>
          </div>

          <motion.a
            href="#workspace"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777] shadow-[0_0_30px_rgba(0,242,254,0.35)] min-h-[46px] shrink-0"
          >
            <span>Launch Studio Free</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
