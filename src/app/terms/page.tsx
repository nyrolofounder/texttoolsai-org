import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import { FileText, Shield, Scale, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | TextToolsAI",
  description:
    "Terms of Service governing the use of TextToolsAI's neural text transformation platform, commercial licensing, and subscription policies.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span>Legal Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-mono">
            Effective Date: October 2, 2026 • Version 2.5
          </p>
        </div>

        {/* Commercial Ownership Callout */}
        <div 
          style={{
            boxShadow: "0 25px 60px -20px rgba(0, 242, 254, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
          }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/30 via-violet-950/20 to-[#0a0920] border border-cyan-500/40 backdrop-blur-2xl mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                100% Commercial Ownership: You Own All Outputs
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                As between you and TextToolsAI, you retain complete and unencumbered intellectual property ownership, copyright, and commercial distribution rights for all content, text, summaries, and metadata generated through our software. You may publish, monetize, license, or sell generated materials without royalty obligations or required attribution.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Legal Clauses */}
        <div className="space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
          {/* Clause 1 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">01.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              By accessing, browsing, registering for, or using TextToolsAI (&ldquo;the Service&rdquo;), hosted at texttoolsai.org and associated APIs, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, agency, or other legal entity, you represent that you possess legal authority to bind such entity.
            </p>
          </section>

          {/* Clause 2 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">02.</span>
              <span>Permitted Use & Prohibited Conduct</span>
            </h2>
            <p className="text-neutral-300 mb-3 text-xs sm:text-sm">
              You agree to use TextToolsAI exclusively for legitimate and lawful text processing. You may NOT:
            </p>
            <ul className="space-y-2 pl-4 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Submit content that promotes hate speech, terrorist recruitment, or illegal acts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Attempt to reverse engineer, decompile, or extract proprietary model weights or edge pipeline logic.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Perform automated denial-of-service (DDoS) attacks or scrape our frontend endpoints outside authorized API rate limits.</span>
              </li>
            </ul>
          </section>

          {/* Clause 3 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">03.</span>
              <span>Subscriptions, Payments & Cancellation</span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm mb-3">
              Pro Creator subscriptions are billed on a recurring monthly or annual basis via Razorpay.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-bold text-white mb-1">Self-Serve Cancellation</div>
                <div className="text-neutral-400 leading-relaxed">
                  You may cancel your subscription at any time via your Billing settings. Cancellation takes effect at the conclusion of the current prepaid billing period.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-bold text-white mb-1">Refund Policy</div>
                <div className="text-neutral-400 leading-relaxed">
                  We offer a 7-day money-back satisfaction guarantee for initial Pro Creator subscriptions if you have processed fewer than 10,000 words. Contact billing@texttoolsai.org.
                </div>
              </div>
            </div>
          </section>

          {/* Clause 4 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">04.</span>
              <span>Disclaimer of Warranties</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              TextToolsAI provides simulated neural transformations on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While our AI Humanizer algorithm achieves statistically superior bypass rates against commercial AI detectors, detection algorithms evolve dynamically and we cannot guarantee 100% future immunity against arbitrary classifier updates.
            </p>
          </section>

          {/* Clause 5 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-[#08081a]/80 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">05.</span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              To the maximum extent permitted by applicable law, in no event shall TextToolsAI, its founders, directors, or employees be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including damages for loss of profits, goodwill, or academic standing.
            </p>
          </section>

          {/* Clause 6: Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-violet-950/20 to-[#0a0920] border border-white/15 backdrop-blur-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              Legal Notices & Governing Law
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
              These Terms shall be governed and construed in accordance with the laws applicable to internet SaaS services. For formal legal notices or dmca inquiries, contact:
            </p>
            <div className="font-mono text-xs sm:text-sm text-cyan-300">
              Email: legal@texttoolsai.org
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
