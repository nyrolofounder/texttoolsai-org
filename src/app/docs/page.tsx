"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  Key, 
  Cpu, 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Search, 
  Stethoscope, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function DocsPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "typescript" | "python">("curl");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyCode = async (code: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopiedEndpoint(id);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const codeSnippets = {
    humanize: {
      curl: `curl -X POST https://api.texttoolsai.org/v1/humanize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "It is crucial to note that utilizing advanced methodology optimizes systemic workflows.",
    "intensity": "high",
    "target_score": 99.0
  }'`,
      typescript: `import { TextToolsAI } from "@texttoolsai/sdk";

const client = new TextToolsAI({ apiKey: process.env.TEXTTOOLS_API_KEY });

const result = await client.humanize({
  text: "It is crucial to note that utilizing advanced methodology optimizes systemic workflows.",
  intensity: "high",
  targetScore: 99.0,
});

console.log(result.output);
console.log(\`Bypass Score: \${result.stats.humanScore}%\`);`,
      python: `import os
from texttoolsai import TextToolsClient

client = TextToolsClient(api_key=os.environ.get("TEXTTOOLS_API_KEY"))

response = client.humanize(
    text="It is crucial to note that utilizing advanced methodology optimizes systemic workflows.",
    intensity="high",
    target_score=99.0,
)

print(response.output)
print(f"Bypass Score: {response.stats.human_score}%")`,
    },
    summarize: {
      curl: `curl -X POST https://api.texttoolsai.org/v1/summarize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transcript": "Dave: Did we finish the migration? Alex: Yes, deployed to us-east at 3 AM with zero downtime.",
    "format": "jira_markdown",
    "extract_owners": true
  }'`,
      typescript: `const summary = await client.summarize({
  transcript: "Dave: Did we finish the migration? Alex: Yes, deployed to us-east with zero downtime.",
  format: "jira_markdown",
  extractOwners: true,
});

console.log(summary.executiveBrief);
console.log(summary.actionItems);`,
      python: `summary = client.summarize(
    transcript="Dave: Did we finish the migration? Alex: Yes, deployed to us-east with zero downtime.",
    format="jira_markdown",
    extract_owners=True,
)

print(summary.executive_brief)
print(summary.action_items)`,
    },
  };

  return (
    <main className="min-h-screen bg-[#05050a] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Developer Reference v1.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            TextToolsAI API Documentation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Programmatically transform, humanize, rewrite, and extract structured notes from text with sub-200ms edge inference and zero retention.
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <TiltCard glowColor="cyan" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#09081e]/80 border border-white/10 backdrop-blur-xl h-full shadow-lg">
              <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-mono font-bold uppercase mb-2">
                <Zap className="w-4 h-4" />
                <span>Base URL</span>
              </div>
              <div className="font-mono text-sm font-bold text-white bg-black/50 p-2.5 rounded-xl border border-white/5 truncate">
                https://api.texttoolsai.org/v1
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="violet" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#09081e]/80 border border-white/10 backdrop-blur-xl h-full shadow-lg">
              <div className="flex items-center gap-2.5 text-violet-400 text-xs font-mono font-bold uppercase mb-2">
                <Key className="w-4 h-4" />
                <span>Authentication</span>
              </div>
              <div className="font-mono text-sm font-bold text-white bg-black/50 p-2.5 rounded-xl border border-white/5 truncate">
                Authorization: Bearer &lt;KEY&gt;
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="emerald" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#09081e]/80 border border-white/10 backdrop-blur-xl h-full shadow-lg">
              <div className="flex items-center gap-2.5 text-[#00f5a0] text-xs font-mono font-bold uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Data Policy</span>
              </div>
              <div className="font-mono text-xs font-bold text-neutral-300 bg-black/50 p-2.5 rounded-xl border border-white/5">
                Volatile RAM only • Zero retention
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Endpoints & Documentation */}
          <div className="lg:col-span-8 space-y-12">
            {/* Language Selector Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                Client SDK Examples:
              </div>
              <div className="inline-flex items-center p-1 rounded-xl bg-[#08081a] border border-white/10">
                {(["curl", "typescript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      activeLang === lang
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint 1: Humanize */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#08081a]/90 border border-white/15 backdrop-blur-2xl shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold bg-emerald-500/20 text-[#00f5a0] border border-emerald-500/30">
                    POST
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white">
                    /v1/humanize
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Sub-200ms • 99.4% Bypass
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Rewrites synthetic AI text with organic perplexity and human sentence cadences that shatter Turnitin, GPTZero, and Copyleaks pattern detection.
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-[#03030a] border border-white/10 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => copyCode(codeSnippets.humanize[activeLang], "humanize")}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedEndpoint === "humanize" ? (
                    <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <pre className="text-neutral-300 whitespace-pre">
                  {codeSnippets.humanize[activeLang]}
                </pre>
              </div>

              {/* Response Preview */}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono uppercase text-neutral-500 mb-2 font-bold">
                  Expected 200 OK JSON Response
                </div>
                <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 font-mono text-xs text-neutral-300">
                  {`{
  "id": "gen_8f3a91bc",
  "output": "Companies pivot fast these days. What clicked last quarter easily falls flat tomorrow...",
  "stats": {
    "wordsIn": 21,
    "wordsOut": 19,
    "humanScore": 99.4,
    "readability": "Grade 8.2"
  },
  "latencyMs": 172
}`}
                </div>
              </div>
            </div>

            {/* Endpoint 2: Summarize */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#08081a]/90 border border-white/15 backdrop-blur-2xl shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    POST
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white">
                    /v1/summarize
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Jira Tasks & Decisions
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Ingests noisy conversational transcripts and outputs clean executive briefs, assigned Jira action tickets, and decision logs.
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-[#03030a] border border-white/10 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => copyCode(codeSnippets.summarize[activeLang], "summarize")}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedEndpoint === "summarize" ? (
                    <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <pre className="text-neutral-300 whitespace-pre">
                  {codeSnippets.summarize[activeLang]}
                </pre>
              </div>
            </div>

            {/* Endpoints 3, 4, 5 Summary Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#08081a]/90 border border-white/15 backdrop-blur-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white tracking-tight mb-4">
                Additional Core Endpoints
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/20 text-violet-300">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-white">/v1/tone</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Transforms voice between 8 brand tones (Executive, Viral X, Technical, Founder, etc.).
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">sub-180ms</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-white">/v1/seo</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Generates titles & meta descriptions with Google SERP pixel truncation width verification.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">sub-160ms</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-white">/v1/grammar</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Surgically removes fluffy fillers and converts passive voice to concise punchy active prose.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">sub-150ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: API Keys & Rate Limits Sticky Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Get API Key CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#120d2c] to-[#070518] border-2 border-violet-500/40 backdrop-blur-2xl shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mb-4 text-violet-300">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Developer API Keys
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Generate production API keys with sub-200ms priority routing and dedicated rate limits for your apps.
              </p>

              <Link
                href="/dashboard"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 shadow-md transition-all"
              >
                <span>Generate Key in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Rate Limits */}
            <div className="p-6 rounded-3xl bg-[#08081a]/90 border border-white/15 backdrop-blur-2xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Rate Limits & Quotas
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Free Community</span>
                    <span className="font-mono text-cyan-300">60 req/min</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">5,000 words per month</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Pro Creator</span>
                    <span className="font-mono text-[#00f5a0]">500 req/min</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Unlimited words per month</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Enterprise Cluster</span>
                    <span className="font-mono text-violet-300">Custom SLA</span>
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">Dedicated edge GPU instances</div>
                </div>
              </div>
            </div>

            {/* HTTP Status Codes */}
            <div className="p-6 rounded-3xl bg-[#08081a]/90 border border-white/15 backdrop-blur-2xl shadow-xl space-y-3 text-xs font-mono">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                HTTP Status Codes
              </h3>
              <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-[#00f5a0]">200 OK</span>
                <span className="text-neutral-400">Synthesis successful</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-amber-400">400 Bad Request</span>
                <span className="text-neutral-400">Missing payload or params</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                <span className="text-rose-400">401 Unauthorized</span>
                <span className="text-neutral-400">Invalid API key</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-pink-400">429 Rate Limited</span>
                <span className="text-neutral-400">Quota exceeded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
