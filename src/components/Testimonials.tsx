"use client";

import { Star, Sparkles } from "lucide-react";
import TiltCard from "./TiltCard";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "VP of Growth at ScaleMetrics",
      company: "scale-metrics.io",
      tool: "SEO Meta Generator",
      quote: "Our organic click-through rate jumped 32% across 140 landing pages after we ran our titles and descriptions through TextToolsAI. The pixel preview prevents Google truncating text mid-sentence.",
      metrics: "+32% Organic CTR",
      avatar: "MV",
      glowColor: "amber" as const,
      avatarGradient: "from-amber-500 to-orange-600",
    },
    {
      name: "Elena Rostova",
      role: "Staff Engineer & Tech Lead",
      company: "CloudNative Labs",
      tool: "Transcript Summarizer",
      quote: "Our team records 4 to 5 architecture syncs daily on Zoom. We drop raw transcripts into TextToolsAI and get Jira-ready tickets, owners, and technical decisions in 10 seconds. Saved us 5 hours a week.",
      metrics: "5 hrs/week saved",
      avatar: "ER",
      glowColor: "cyan" as const,
      avatarGradient: "from-cyan-500 to-blue-600",
    },
    {
      name: "Julian Thorne",
      role: "Founder & Creative Director",
      company: "Apex Media Agency",
      tool: "AI Humanizer",
      quote: "Turnitin and GPTZero used to flag our first drafts because standard LLM outputs are full of predictable words like 'delve' and 'seamlessly'. TextToolsAI produces truly natural human burstiness that passes every detector.",
      metrics: "100% Detector Pass Rate",
      avatar: "JT",
      glowColor: "emerald" as const,
      avatarGradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "Priya Sharma",
      role: "Principal Technical Writer",
      company: "FinStack Global",
      tool: "Grammar Doctor",
      quote: "Grammarly is annoying with basic stylistic quirks. Grammar Doctor surgically targets passive voice and cuts 35% of fluffy words from our documentation without losing technical meaning.",
      metrics: "-35% Fluff Cut",
      avatar: "PS",
      glowColor: "magenta" as const,
      avatarGradient: "from-pink-500 to-rose-600",
    },
    {
      name: "Liam O'Connor",
      role: "Content Director",
      company: "VenturePulse",
      tool: "Tone Shifter",
      quote: "Turning dense technical release notes into engaging X/Twitter threads used to take our social team 2 hours. With Tone Shifter, we shift tone in one click. Our impressions are up 4x.",
      metrics: "4x Impression Growth",
      avatar: "LO",
      glowColor: "violet" as const,
      avatarGradient: "from-violet-500 to-purple-600",
    },
    {
      name: "Chloe Becker",
      role: "Freelance Copywriter & Strategist",
      company: "Self-Employed",
      tool: "AI Humanizer + Tone Shifter",
      quote: "The privacy aspect is what sold me. Most AI platforms train on your inputs, which violates my client NDAs. TextToolsAI operates in-memory with zero retention. It's a non-negotiable part of my stack.",
      metrics: "Zero Data Retention",
      avatar: "CB",
      glowColor: "cyan" as const,
      avatarGradient: "from-blue-500 to-cyan-600",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative border-t border-slate-200/80 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Wall of Proof</span>
          </div>
          <h2 className="text-fluid-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by 45,000+ Creators, Writers & Builders
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600">
            See how high-output teams use our 5 core text tools to publish better content, bypass false AI flags, and reclaim their workdays.
          </p>
        </div>

        {/* 6-Card Grid Wrapped with Chamfered TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, idx) => (
            <TiltCard
              key={idx}
              glowColor={t.glowColor}
              maxTilt={5}
              scaleOnHover={1.02}
            >
              <div 
                style={{
                  boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
                }}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200/90 hover:border-indigo-300 transition-all flex flex-col justify-between h-full backdrop-blur-2xl shadow-md"
              >
                <div>
                  {/* Rating & Tool Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-xs" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                      {t.tool}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed font-sans mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info & Metric */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-xs font-bold text-white shadow-xs`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 tracking-tight">{t.name}</div>
                      <div className="text-[11px] text-slate-500">{t.role}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 shadow-xs">
                      {t.metrics}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
