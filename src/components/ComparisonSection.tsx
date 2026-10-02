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
      textTools: "< 180ms instant edge execution",
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
    <section id="features" className="py-20 md:py-32 relative border-t border-slate-200/80 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 text-violet-700 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-violet-600" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-fluid-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Precision, Not Conversation
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600">
            Generic chatbots are designed to chit-chat. TextToolsAI is built for high-output professionals who need surgical text results without prompt wrangling.
          </p>
        </div>

        {/* Comparison Matrix Table with Chamfered Glass */}
        <div 
          style={{
            boxShadow: "0 20px 50px -15px rgba(99, 102, 241, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
          }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 overflow-hidden shadow-xl backdrop-blur-2xl"
        >
          {/* Top specular reflection line */}
          <div className="h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 via-violet-500/40 to-transparent" />

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/90">
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-bold text-slate-700 w-1/3">
                    Capability & Architecture
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-extrabold text-slate-900 bg-indigo-50/80 border-x border-indigo-200/70 w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                      <span className="text-indigo-900 font-mono text-sm sm:text-base">TextToolsAI.org</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold hidden sm:inline">
                        Purpose-Built
                      </span>
                    </div>
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-semibold text-slate-500 w-1/6">
                    Generic Chatbots (ChatGPT / Claude)
                  </th>
                  <th className="py-4 px-4 sm:py-5 sm:px-6 text-xs sm:text-sm font-semibold text-slate-500 w-1/6">
                    Legacy Paraphrasers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-slate-800 font-medium">
                      {item.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-indigo-950 bg-indigo-50/20 border-x border-indigo-100 font-semibold">
                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item.textTools}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-slate-500">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item.chatGpt}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:py-4.5 sm:px-6 text-slate-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
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
            boxShadow: "0 15px 40px -10px rgba(99, 102, 241, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
          }}
          className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-lg"
        >
          <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Ready to cut hours of tedious prompt engineering?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Launch the interactive studio and start processing text immediately.
              </p>
            </div>
          </div>

          <motion.a
            href="#workspace"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] min-h-[46px] shrink-0 cursor-pointer"
          >
            <span>Launch Studio Free</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
