"use client";

import { Check, X, Zap, Cpu, Sparkles } from "lucide-react";

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
    <section id="features" className="py-24 md:py-32 relative border-t border-white/[0.08] bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(121,40,202,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Precision, Not Conversation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Generic chatbots are designed to chit-chat. TextToolsAI is built for high-output professionals who need surgical text results without prompt wrangling.
          </p>
        </div>

        {/* Comparison Matrix Table with 3D Glass Surface */}
        <div className="rounded-3xl border border-white/15 bg-[#080808]/90 overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-neutral-950/90">
                  <th className="py-5 px-6 text-sm font-bold text-neutral-300 w-1/3">
                    Capability & Architecture
                  </th>
                  <th className="py-5 px-6 text-sm font-extrabold text-white bg-cyan-500/[0.08] border-x border-cyan-500/30 w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-cyan-300 font-mono text-base">TextToolsAI.org</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-medium">
                        Purpose-Built
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-neutral-400 w-1/6">
                    Generic Chatbots (ChatGPT / Claude)
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-neutral-400 w-1/6">
                    Legacy Paraphrasers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4.5 px-6 text-neutral-200 font-medium">
                      {item.feature}
                    </td>
                    <td className="py-4.5 px-6 text-emerald-300 bg-cyan-500/[0.03] border-x border-cyan-500/25 font-semibold">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#00f5a0] shrink-0 mt-0.5" />
                        <span>{item.textTools}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-neutral-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item.chatGpt}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-neutral-500">
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

        {/* 3D Glass Callout Card Underneath */}
        <div className="mt-10 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/25 via-violet-950/25 to-pink-950/25 border border-white/15 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,242,254,0.1)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <Zap className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">
                Ready to cut 8 hours of writing and editing every week?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Join 45,000+ teams who use TextToolsAI for daily publishing, code docs, and client deliverables.
              </p>
            </div>
          </div>

          <a
            href="#workspace"
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 hover:brightness-110 transition-all shrink-0 shadow-[0_0_25px_rgba(0,242,254,0.35)]"
          >
            Launch Free Studio
          </a>
        </div>
      </div>
    </section>
  );
}
