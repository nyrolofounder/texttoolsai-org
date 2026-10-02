"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the AI Humanizer bypass Turnitin, GPTZero, and Copyleaks?",
      a: "Commercial AI detectors look for two statistical markers: low perplexity (monotonously predictable word choices) and low burstiness (uniform sentence structures and lengths). Our AI Humanizer introduces organic rhythmic variations, human sentence cadences, and nuanced phrasing that shatter robotic statistical patterns while preserving 100% of your original meaning and intent.",
    },
    {
      q: "Is my text saved, logged, or used to train future AI models?",
      a: "Never. We enforce a strict zero-retention architecture. Your inputs and outputs exist only in volatile server memory for the duration of the HTTP inference request (typically ~180 milliseconds) and are immediately purged. We never store, log, sell, or train foundational models on your proprietary text.",
    },
    {
      q: "Can I use the generated content for client work and commercial publishing?",
      a: "Yes. You retain 100% full copyright and commercial ownership of all text synthesized or rewritten through TextToolsAI. There are no royalty claims, attribution requirements, or usage restrictions.",
    },
    {
      q: "How does the Transcript Summarizer handle messy spoken audio?",
      a: "Our engine is trained on conversational audio transcripts filled with filler words, false starts, speaker cross-talk, and stuttering. It ignores spoken noise and parses out clear executive briefs, action items with assigned owners, and concrete milestone decisions in standard Markdown.",
    },
    {
      q: "Why use SEO Meta Generator instead of writing titles manually?",
      a: "Google doesn't measure search titles by character count alone—it cuts off titles strictly by pixel width (typically 600px desktop, 540px mobile). Our SEO engine calculates precise font pixel rendering to ensure your title never gets truncated mid-phrase, while optimizing psychological CTR triggers.",
    },
    {
      q: "Can I cancel my Pro subscription at any time?",
      a: "Yes. You can manage or cancel your subscription at any time with a single click inside your billing portal. There are no lock-in contracts or cancellation penalties.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative border-t border-white/[0.08] bg-[#05050a]/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            Everything you need to know about the engine, privacy, bypass safety, and billing.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  boxShadow: isOpen
                    ? "0 20px 45px -10px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)"
                    : "0 10px 25px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-2xl ${
                  isOpen
                    ? "border-cyan-500/40 bg-[#0c0a24]/90"
                    : "border-white/10 bg-[#080718]/70 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  <span className="tracking-tight">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06] pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
