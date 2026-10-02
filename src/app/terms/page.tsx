import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import { Shield, Scale, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | TextToolsAI",
  description:
    "Terms of Service governing the use of TextToolsAI's neural text transformation platform, commercial licensing, and subscription policies.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden">
      <NeonBackgroundOrbs />
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>Legal Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight sm:tracking-tighter">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-mono">
            Effective Date: October 2, 2026 • Version 2.5
          </p>
        </div>

        {/* Commercial Ownership Callout */}
        <div 
          style={{
            boxShadow: "0 20px 50px -15px rgba(99, 102, 241, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
          }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50/80 via-violet-50/60 to-white border border-indigo-200/80 backdrop-blur-2xl mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                100% Commercial Ownership: You Own All Outputs
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                As between you and TextToolsAI, you retain complete and unencumbered intellectual property ownership, copyright, and commercial distribution rights for all content, text, summaries, and metadata generated through our software. You may publish, monetize, license, or sell generated materials without royalty obligations or required attribution.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Legal Clauses */}
        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Clause 1 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">01.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              By accessing, browsing, registering for, or using TextToolsAI (&ldquo;the Service&rdquo;), hosted at texttoolsai.org and associated APIs, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, agency, or other legal entity, you represent that you possess legal authority to bind such entity.
            </p>
          </section>

          {/* Clause 2 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">02.</span>
              <span>Permitted Use & Prohibited Conduct</span>
            </h2>
            <p className="text-slate-600 mb-3 text-xs sm:text-sm">
              You agree to use TextToolsAI exclusively for legitimate and lawful text processing. You may NOT:
            </p>
            <ul className="space-y-2 pl-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Submit content that promotes hate speech, terrorist recruitment, or illegal acts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Attempt to reverse engineer, decompile, or extract proprietary model weights or edge pipeline logic.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Perform automated denial-of-service (DDoS) attacks or scrape our frontend endpoints outside authorized API rate limits.</span>
              </li>
            </ul>
          </section>

          {/* Clause 3 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">03.</span>
              <span>Subscriptions, Payments & Cancellation</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-3">
              Pro Creator subscriptions are billed on a recurring monthly or annual basis via Razorpay.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-1">Self-Serve Cancellation</div>
                <div className="text-slate-600 leading-relaxed">
                  You may cancel your subscription at any time via your Billing settings. Cancellation takes effect at the conclusion of the current prepaid billing period.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-1">Refund Policy</div>
                <div className="text-slate-600 leading-relaxed">
                  We offer a 7-day money-back satisfaction guarantee for initial Pro Creator subscriptions if you have processed fewer than 10,000 words. Contact billing@texttoolsai.org.
                </div>
              </div>
            </div>
          </section>

          {/* Clause 4 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">04.</span>
              <span>Disclaimer of Warranties</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              TextToolsAI provides simulated neural transformations on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While our AI Humanizer algorithm achieves statistically superior bypass rates against commercial AI detectors, detection algorithms evolve dynamically and we cannot guarantee 100% future immunity against arbitrary classifier updates.
            </p>
          </section>

          {/* Clause 5 */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-2">
              <span className="text-indigo-600 font-mono text-sm">05.</span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To the maximum extent permitted by applicable law, in no event shall TextToolsAI, its founders, directors, or employees be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including damages for loss of profits, goodwill, or academic standing.
            </p>
          </section>

          {/* Clause 6: Contact */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-violet-50/60 to-white border border-indigo-200/80 backdrop-blur-2xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              Legal Notices & Governing Law
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
              These Terms shall be governed and construed in accordance with the laws applicable to internet SaaS services. For formal legal notices or DMCA inquiries, contact:
            </p>
            <div className="font-mono text-xs sm:text-sm text-indigo-700 font-semibold">
              Email: legal@texttoolsai.org
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
