"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import TiltCard from "@/components/TiltCard";
import { 
  Terminal, 
  Key, 
  Code, 
  Copy, 
  Check, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function DocsPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "typescript" | "python">("curl");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const codeSnippets = {
    humanize: {
      curl: `curl -X POST https://api.texttoolsai.org/v1/humanize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Furthermore, it is imperative to acknowledge that artificial intelligence facilitates...",
    "mode": "aggressive",
    "targetAudience": "academic"
  }'`,
      typescript: `import { TextToolsClient } from "@texttoolsai/sdk";

const client = new TextToolsClient({
  apiKey: process.env.TEXTTOOLS_API_KEY,
});

const response = await client.humanize({
  text: "Furthermore, it is imperative to acknowledge that artificial intelligence facilitates...",
  mode: "aggressive",
  targetAudience: "academic",
});

console.log(response.output);
console.log("Human score:", response.stats.humanScore); // 99.4%`,
      python: `from texttools import TextToolsClient
import os

client = TextToolsClient(api_key=os.environ["TEXTTOOLS_API_KEY"])

response = client.humanize(
    text="Furthermore, it is imperative to acknowledge that artificial intelligence facilitates...",
    mode="aggressive",
    target_audience="academic"
)

print(response.output)
print(f"Human score: {response.stats.human_score}%")`,
    },
    summarize: {
      curl: `curl -X POST https://api.texttoolsai.org/v1/summarize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transcript": "Alex: We need to ship the migration by Friday. Bob: I will handle the DB schema...",
    "format": "jira_and_decisions"
  }'`,
      typescript: `const summary = await client.summarize({
  transcript: "Alex: We need to ship the migration by Friday. Bob: I will handle the DB schema...",
  format: "jira_and_decisions",
});

console.log(summary.executiveBrief);
console.log(summary.actionItems); // [{ task: "DB schema", owner: "Bob", deadline: "Friday" }]`,
      python: `summary = client.summarize(
    transcript="Alex: We need to ship the migration by Friday. Bob: I will handle the DB schema...",
    format="jira_and_decisions"
)

print(summary.executive_brief)
print(summary.action_items)`,
    },
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Terminal className="w-3.5 h-3.5 text-indigo-600" />
            <span>Developer Reference v1.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight sm:tracking-tighter">
            TextToolsAI API Documentation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Programmatically transform, humanize, rewrite, and extract structured notes from text with sub-200ms edge inference and zero retention.
          </p>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          <TiltCard glowColor="cyan" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl h-full shadow-sm">
              <div className="flex items-center gap-2.5 text-indigo-600 text-xs font-mono font-bold uppercase mb-2">
                <Zap className="w-4 h-4" />
                <span>Base URL</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 truncate">
                https://api.texttoolsai.org/v1
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="violet" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl h-full shadow-sm">
              <div className="flex items-center gap-2.5 text-violet-600 text-xs font-mono font-bold uppercase mb-2">
                <Key className="w-4 h-4" />
                <span>Authentication</span>
              </div>
              <div className="font-mono text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 truncate">
                Authorization: Bearer &lt;KEY&gt;
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="emerald" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-xl h-full shadow-sm">
              <div className="flex items-center gap-2.5 text-emerald-600 text-xs font-mono font-bold uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Data Policy</span>
              </div>
              <div className="font-mono text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                Volatile RAM only • Zero retention
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Endpoints & Documentation */}
          <div className="lg:col-span-8 space-y-10">
            {/* Language Selector Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                Client SDK Examples:
              </div>
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                {(["curl", "typescript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLang(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      activeLang === lang
                        ? "bg-white text-indigo-700 shadow-sm border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint 1: Humanize */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    POST
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-slate-900">
                    /v1/humanize
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Sub-200ms • 99.4% Bypass
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Rewrites synthetic AI text with organic perplexity and human sentence cadences that shatter Turnitin, GPTZero, and Copyleaks pattern detection.
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => copyCode(codeSnippets.humanize[activeLang], "humanize")}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEndpoint === "humanize" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <pre className="text-slate-200 whitespace-pre">
                  {codeSnippets.humanize[activeLang]}
                </pre>
              </div>

              {/* Response Preview */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-mono uppercase text-slate-400 mb-2 font-bold">
                  Expected 200 OK JSON Response
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 font-mono text-xs text-slate-800">
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    POST
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-slate-900">
                    /v1/summarize
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  Jira Tasks & Decisions
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Ingests noisy conversational transcripts and outputs clean executive briefs, assigned Jira action tickets, and decision logs.
              </p>

              {/* Code Snippet Box */}
              <div className="relative rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => copyCode(codeSnippets.summarize[activeLang], "summarize")}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEndpoint === "summarize" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <pre className="text-slate-200 whitespace-pre">
                  {codeSnippets.summarize[activeLang]}
                </pre>
              </div>
            </div>

            {/* Endpoints 3, 4, 5 Summary Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
                Additional Core Endpoints
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-100 text-violet-700">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">/v1/tone</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Transforms voice between 8 brand tones (Executive, Viral X, Technical, Founder, etc.).
                    </p>
                  </div>
                  <span className="text-xs font-mono text-indigo-600 font-semibold">sub-180ms</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">/v1/seo</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Generates titles & meta descriptions with Google SERP pixel truncation width verification.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-indigo-600 font-semibold">sub-160ms</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-100 text-pink-700">
                        POST
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">/v1/grammar</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Surgically removes fluffy fillers and converts passive voice to concise punchy active prose.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-indigo-600 font-semibold">sub-150ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: API Keys & Rate Limits Sticky Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Get API Key CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50 to-white border-2 border-indigo-200/80 backdrop-blur-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center mb-4 text-indigo-700">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Developer API Keys
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Generate production API keys with sub-200ms priority routing and dedicated rate limits for your apps.
              </p>

              <Link
                href="/dashboard"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-sm transition-all hover:from-indigo-700 hover:to-violet-700"
              >
                <span>Generate Key in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Rate Limits */}
            <div className="p-6 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                Rate Limits & Quotas
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Free Community</span>
                    <span className="font-mono text-indigo-600">60 req/min</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">5,000 words per month</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Pro Creator</span>
                    <span className="font-mono text-emerald-600">500 req/min</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Unlimited words per month</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Enterprise Cluster</span>
                    <span className="font-mono text-violet-600">Custom SLA</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Dedicated edge GPU instances</div>
                </div>
              </div>
            </div>

            {/* HTTP Status Codes */}
            <div className="p-6 rounded-3xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm space-y-3 text-xs font-mono">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                HTTP Status Codes
              </h3>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-emerald-600 font-bold">200 OK</span>
                <span className="text-slate-500">Synthesis successful</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-amber-600 font-bold">400 Bad Request</span>
                <span className="text-slate-500">Missing payload or params</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-rose-600 font-bold">401 Unauthorized</span>
                <span className="text-slate-500">Invalid API key</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-pink-600 font-bold">429 Rate Limited</span>
                <span className="text-slate-500">Quota exceeded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
