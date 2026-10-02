import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import { ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Zero-Retention Privacy Policy | TextToolsAI",
  description:
    "Our ironclad zero-retention privacy policy. We process AI text transformations exclusively in volatile memory without logging, saving, or training on user data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00f5a0] text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,245,160,0.2)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00f5a0]" />
            <span>Zero-Retention Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-mono">
            Effective Date: October 2, 2026 • Last Audited: Q4 2026
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div 
          style={{
            boxShadow: "0 25px 60px -20px rgba(0, 245, 160, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
          }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-cyan-950/20 to-[#0a0920] border border-emerald-500/40 backdrop-blur-2xl mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00f5a0]/15 border border-[#00f5a0]/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
              <Lock className="w-6 h-6 text-[#00f5a0]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Our Non-Negotiable Core Guarantee: Zero Data Retention
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                When you submit text to any TextToolsAI engine (AI Humanizer, Tone Shifter, Transcript Summarizer, SEO Meta Generator, or Grammar Doctor), your text is held strictly in volatile RAM for the duration of the HTTP inference request (typically under 200ms) and is immediately flushed. We do NOT store, log, inspect, sell, or train artificial intelligence models on your intellectual property.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">01.</span>
              <span>In-Memory Volatile Processing</span>
            </h2>
            <p className="text-neutral-300 mb-3">
              Unlike legacy cloud processors that write requests to relational databases or persistent server disks, TextToolsAI utilizes a stateless multi-region edge pipeline:
            </p>
            <ul className="space-y-2 pl-4 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00f5a0] shrink-0 mt-0.5" />
                <span>Text payloads exist only in RAM during execution and are never saved to disk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00f5a0] shrink-0 mt-0.5" />
                <span>Application error logs record HTTP response status codes and request latency, never the payload text.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00f5a0] shrink-0 mt-0.5" />
                <span>Client-side history vault is stored in your own browser&apos;s encrypted LocalStorage unless you explicitly link an authenticated Supabase vault.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">02.</span>
              <span>No AI Model Training On Customer Data</span>
            </h2>
            <p className="text-neutral-300">
              We contractually prohibit our downstream infrastructure providers and foundational model nodes from consuming customer prompts, inputs, or generated results for model training, reinforcement learning with human feedback (RLHF), or fine-tuning weights. Your proprietary essays, client drafts, confidential meeting transcripts, and code snippets remain strictly yours.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">03.</span>
              <span>Information We Collect & Why</span>
            </h2>
            <p className="text-neutral-300 mb-3">
              We collect minimal operational data necessary to deliver the service:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-bold text-white mb-1">Account & Billing Data</div>
                <div className="text-neutral-400 leading-relaxed">
                  Email address, full name, and subscription tier stored via Supabase and Razorpay to authenticate login and process recurring subscriptions.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-bold text-white mb-1">Anonymized Telemetry</div>
                <div className="text-neutral-400 leading-relaxed">
                  Word counts, inference execution latency (p95), and browser user-agent to monitor global cluster health and DDoS protection.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">04.</span>
              <span>PCI-DSS Payment Security</span>
            </h2>
            <p className="text-neutral-300">
              Payment processing for Pro Creator subscriptions is handled directly by Razorpay, a certified PCI-DSS Level 1 payment processor. TextToolsAI servers never see, handle, or store complete credit card numbers, CVVs, or bank login credentials.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">05.</span>
              <span>GDPR, CCPA & Data Subject Rights</span>
            </h2>
            <p className="text-neutral-300 mb-2">
              Regardless of your geographical location, we afford all users the rights guaranteed under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm">
              You have the right to request deletion of your account, request an export of your account metadata, and opt out of any non-essential cookies. Because input text is never saved on our servers, there is no proprietary text backlog to delete upon request.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-violet-950/20 to-[#0a0920] border border-white/15 backdrop-blur-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Contact the Data Protection Officer
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
              If you have any questions regarding this Privacy Policy or our zero-retention edge security architecture, please contact our compliance engineering team:
            </p>
            <div className="font-mono text-xs sm:text-sm text-cyan-300">
              Email: privacy@texttoolsai.org • security@texttoolsai.org
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
