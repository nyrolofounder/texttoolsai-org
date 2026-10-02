import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Zero-Retention Privacy Policy | TextToolsAI",
  description:
    "Our ironclad zero-retention privacy policy. We process AI text transformations exclusively in volatile memory without logging, saving, or training on user data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Retention Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight sm:tracking-tighter">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-mono">
            Effective Date: October 2, 2026 • Last Audited: Q4 2026
          </p>
        </div>

        {/* Highlight Guarantee Box */}
        <div 
          style={{
            boxShadow: "0 20px 50px -15px rgba(16, 185, 129, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
          }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white border border-emerald-200/80 backdrop-blur-2xl mb-12 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
              <Lock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Our Non-Negotiable Core Guarantee: Zero Data Retention
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                When you submit text to any TextToolsAI engine (AI Humanizer, Tone Shifter, Transcript Summarizer, SEO Meta Generator, or Grammar Doctor), your text is held strictly in volatile RAM for the duration of the HTTP inference request (typically under 200ms) and is immediately flushed. We do NOT store, log, inspect, sell, or train artificial intelligence models on your intellectual property.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">01.</span>
              <span>In-Memory Volatile Processing</span>
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm">
              Unlike legacy cloud processors that write requests to relational databases or persistent server disks, TextToolsAI utilizes a stateless multi-region edge pipeline:
            </p>
            <ul className="space-y-2 pl-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Text payloads exist only in RAM during execution and are never saved to disk.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Application error logs record HTTP response status codes and request latency, never the payload text.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Client-side history vault is stored in your own browser&apos;s encrypted LocalStorage unless you explicitly link an authenticated Supabase vault.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">02.</span>
              <span>No AI Model Training On Customer Data</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We contractually prohibit our downstream infrastructure providers and foundational model nodes from consuming customer prompts, inputs, or generated results for model training, reinforcement learning with human feedback (RLHF), or fine-tuning weights. Your proprietary essays, client drafts, confidential meeting transcripts, and code snippets remain strictly yours.
            </p>
          </section>

          {/* Section 3 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">03.</span>
              <span>Information We Collect & Why</span>
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm">
              We collect minimal operational data necessary to deliver the service:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-1">Account & Billing Data</div>
                <div className="text-slate-600 leading-relaxed">
                  Email address, full name, and subscription tier stored via Supabase and Razorpay to authenticate login and process recurring subscriptions.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-1">Anonymized Telemetry</div>
                <div className="text-slate-600 leading-relaxed">
                  Word counts, inference execution latency (p95), and browser user-agent to monitor global cluster health and DDoS protection.
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">04.</span>
              <span>PCI-DSS Payment Security</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Payment processing for Pro Creator subscriptions is handled directly by Razorpay, a certified PCI-DSS Level 1 payment processor. TextToolsAI servers never see, handle, or store complete credit card numbers, CVVs, or bank login credentials.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">05.</span>
              <span>GDPR, CCPA & Data Subject Rights</span>
            </h2>
            <p className="text-slate-600 mb-2 text-xs sm:text-sm">
              Regardless of your geographical location, we afford all users the rights guaranteed under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              You have the right to request deletion of your account, request an export of your account metadata, and opt out of any non-essential cookies. Because input text is never saved on our servers, there is no proprietary text backlog to delete upon request.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-teal-50/50 to-white border border-indigo-200/80 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              Contact the Data Protection Officer
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              If you have any questions regarding this Privacy Policy or our zero-retention edge security architecture, please contact our compliance engineering team:
            </p>
            <div className="font-mono text-xs sm:text-sm text-indigo-700 font-semibold">
              Email: privacy@texttoolsai.org • security@texttoolsai.org
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
