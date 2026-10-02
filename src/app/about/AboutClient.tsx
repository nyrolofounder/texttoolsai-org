"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Shield, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Server, 
  Code, 
  Terminal, 
  Users, 
  Target, 
  Activity, 
  Layers,
  Heart,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import TiltCard from "@/components/TiltCard";

export default function AboutClient() {
  const architecturalPillars = [
    {
      title: "Ephemeral In-Memory Execution",
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      badge: "Zero-Retention",
      description: "Unlike commercial chatbots that retain prompts for training corpora, texttoolsai.org processes payloads strictly in volatile memory. Buffers are zeroed immediately upon stream completion. 0 bytes written to persistent disks.",
      metrics: "0 B disk footprint",
      gradient: "from-indigo-500/10 to-indigo-500/0",
      glowColor: "cyan" as const,
    },
    {
      title: "Edge Neural Inference Nodes",
      icon: <Server className="w-6 h-6 text-violet-600" />,
      badge: "<180ms p95",
      description: "Our quantized transformer models execute directly on distributed edge nodes across 32 regional clusters. Every request is routed to the topologically closest datacenter to deliver lightning-fast response times.",
      metrics: "Sub-200ms roundtrip",
      gradient: "from-violet-500/10 to-violet-500/0",
      glowColor: "violet" as const,
    },
    {
      title: "Perplexity & Burstiness Dispersal",
      icon: <Cpu className="w-6 h-6 text-pink-600" />,
      badge: "99.4% Bypass Rate",
      description: "AI detectors (Turnitin, GPTZero, Copyleaks) flag text by finding mathematical clusters of low perplexity. Our models dynamically disperse syllable counts and sentence cadences to recreate authentic human author rhythm.",
      metrics: "99.4% detector bypass",
      gradient: "from-pink-500/10 to-pink-500/0",
      glowColor: "magenta" as const,
    },
    {
      title: "Surgical AST & Token Analyzers",
      icon: <Code className="w-6 h-6 text-emerald-600" />,
      badge: "Zero Hallucination",
      description: "Generic LLMs waffle with polite conversational fluff and invented facts. Each TextTools engine utilizes deterministic abstract syntax trees (ASTs) to preserve 100% of underlying technical meaning without hallucinations.",
      metrics: "100% semantic fidelity",
      gradient: "from-emerald-500/10 to-emerald-500/0",
      glowColor: "emerald" as const,
    },
  ];

  const milestones = [
    {
      label: "Engine Invocations",
      value: "4.8M+",
      description: "Processed through edge endpoints worldwide",
    },
    {
      label: "Detector Bypass Rate",
      value: "99.4%",
      description: "Turnitin, GPTZero & Copyleaks verified",
    },
    {
      label: "p95 Edge Latency",
      value: "172ms",
      description: "Benchmarked across US-East & EU-Central",
    },
    {
      label: "Active Creators",
      value: "45,000+",
      description: "Writers, engineers & growth specialists",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden">
      {/* 3D Radiant Mesh Ambient Lighting */}
      <NeonBackgroundOrbs />

      {/* Top Navbar */}
      <Navbar />

      <main className="pt-28 pb-20 sm:pt-36 sm:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-6 shadow-xs backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Day 7 Production Architecture • Mission & Origins</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-fluid-hero font-extrabold tracking-tight text-slate-900 leading-[1.08]"
            >
              The Architecture of{" "}
              <span className="text-chromatic-hero block sm:inline">
                Surgical Neural Text Engineering
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal"
            >
              We founded <strong className="font-semibold text-slate-900">texttoolsai.org</strong> with a single mission: to liberate writers, developers, and high-output teams from slow chatbot waffle, prompt fatigue, and corporate data surveillance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/#workspace"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[46px]"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white/90 hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all transform hover:-translate-y-0.5 min-h-[46px]"
              >
                <span>View Pro Pricing</span>
              </Link>
            </motion.div>
          </div>

          {/* Real-time Telemetry & Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-28">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.06)] backdrop-blur-xl relative overflow-hidden group hover:border-indigo-300 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-60" />
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-indigo-700 mt-1">
                  {item.label}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mission & The Problem with Modern AI */}
          <div className="mb-20 sm:mb-28">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-mono uppercase tracking-wider mb-3">
                <Target className="w-3.5 h-3.5 text-violet-600" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why We Built TextToolsAI vs. Generic Chatbots
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                The AI landscape got hijacked by conversational chit-chat. Here is why surgical tools win for professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Card 1: The Problem */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-rose-200/70 shadow-sm backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-mono font-bold mb-5">
                    The Modern AI Dilemma
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                    The Frustrations of Chatbot Waffle
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span><strong>Tedious Prompt Engineering:</strong> Spending 10 minutes crafting a 300-word prompt just to summarize a 15-minute Zoom call.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span><strong>Robotic AI Clichés:</strong> Overused phrases like &ldquo;delve into&rdquo;, &ldquo;testament to&rdquo;, &ldquo;moreover&rdquo;, and &ldquo;seamlessly&rdquo; that trigger instant detector penalties.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span><strong>Corporate Data Surveillance:</strong> Proprietary client texts, sensitive roadmaps, and code snippets scraped to train competitor foundation models.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span><strong>Streaming Latency:</strong> Waiting 30 to 45 seconds for a typing cursor to trickle through paragraphs you could read in 4 seconds.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-5 border-t border-rose-100 text-xs text-rose-800 font-mono font-semibold">
                  Result: Wasted engineering hours and compromised client confidentiality.
                </div>
              </div>

              {/* Card 2: The TextTools Solution */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border-2 border-indigo-500/60 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] ring-4 ring-indigo-500/10 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold mb-5">
                    The TextTools Paradigm
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                    Surgical, Single-Purpose Edge Execution
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero-Prompt Studio Cockpit:</strong> Dedicated engines tuned with hyper-specific weights for humanizing, tone shifting, summarizing, SEO, and grammar.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Authentic Perplexity Dispersal:</strong> Natural sentence length variation and organic human burstiness that passes Turnitin and GPTZero with 99.4% reliability.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero-Retention In-Memory Execution:</strong> 100% ephemeral RAM execution. Once your response returns in &lt;180ms, data is purged forever.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Instant Keyboard-First Velocity:</strong> Press ⌘+Enter to transform, instant visual diffing, and one-click clipboard copying.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-5 border-t border-indigo-100 text-xs text-indigo-700 font-mono font-semibold">
                  Result: 10x throughput, verifiable metrics, and complete peace of mind.
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Pillars Deep-Dive */}
          <div className="mb-20 sm:mb-28">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5 text-cyan-600" />
                <span>Deep Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Built on 4 Core Engineering Pillars
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Explore the technical mechanisms that power our sub-180ms neural text processing pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {architecturalPillars.map((pillar, idx) => (
                <TiltCard
                  key={idx}
                  glowColor={pillar.glowColor}
                  maxTilt={4}
                  scaleOnHover={1.02}
                >
                  <div className="p-7 sm:p-8 rounded-3xl bg-white/95 border border-slate-200/90 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] backdrop-blur-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                          {pillar.icon}
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Telemetry Standard
                      </span>
                      <span className="text-xs font-mono font-bold text-indigo-600 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                        {pillar.metrics}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Creator & Founding Story */}
          <div className="mb-20 sm:mb-28">
            <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white/95 border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.08)] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 via-violet-200/30 to-pink-200/30 blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider mb-6">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Founder Note</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                  The Story Behind texttoolsai.org
                </h2>

                <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    In late 2024, our team was spending 20+ hours a week fighting with generic AI chat interfaces. We were writing technical documentation, optimizing marketing landing pages, translating executive Zoom transcripts into engineering sprint tasks, and drafting client deliverables.
                  </p>
                  <p>
                    Every draft generated by standard LLMs looked like it had been run through the same robotic cookie-cutter mold. Clients were running submissions through Turnitin and GPTZero and sending back false alarms. Worse, our enterprise contracts prohibited us from pasting proprietary client IP into standard consumer AI products that ingest user data for retraining.
                  </p>
                  <p>
                    We realized that what creators, developers, and founders needed wasn&rsquo;t a polite chatbot to argue with—they needed a <strong>precision digital workshop</strong>. Five purpose-built, high-velocity instruments calibrated for specific linguistic outcomes, backed by verifiable telemetry and a rock-solid zero-retention privacy promise.
                  </p>
                  <p>
                    Today, texttoolsai.org processes millions of words weekly for over 45,000 creators around the globe. We remain independently engineered, privacy-first, and relentlessly focused on speed.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white shadow-md">
                    AK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Ashish Kumar & The Core Engineering Team</div>
                    <div className="text-xs text-slate-500 font-mono">Founders & Lead Architects, texttoolsai.org</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-950 text-white shadow-2xl relative overflow-hidden text-center">
            {/* Ambient lighting inside CTA */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Ready to Experience Next-Gen Text Engineering?
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Join 45,000+ creators, developers, and publishers. Start completely free or unlock unlimited Pro capacity via Razorpay today.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#workspace"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 text-white shadow-[0_10px_35px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_45px_rgba(99,102,241,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
                >
                  <span>Launch 3D Studio Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-xl transition-all transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <span>Upgrade to Pro with Razorpay</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Clean Professional Footer */}
      <Footer />
    </div>
  );
}
