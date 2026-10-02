"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  ArrowLeft, 
  Zap, 
  AlertTriangle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import TiltCard from "@/components/TiltCard";

export default function BillingPage() {
  const { user, upgradeToPro } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelConfirmed, setCancelConfirmed] = useState(false);

  const currentPlan = user?.plan || "free";
  const wordsUsed = user?.wordsUsedThisMonth || 3420;
  const wordLimit = currentPlan === "pro" ? "Unlimited" : (user?.wordLimit || 5000).toLocaleString();

  // Razorpay payment links
  const razorpayLink =
    billingCycle === "annual"
      ? process.env.NEXT_PUBLIC_RAZORPAY_ANNUAL_LINK || "https://rzp.io/l/texttools-pro-annual"
      : process.env.NEXT_PUBLIC_RAZORPAY_MONTHLY_LINK || "https://rzp.io/l/texttools-pro-monthly";

  // Mock invoice records
  const invoices = [
    {
      id: "INV-2026-003",
      date: "Oct 01, 2026",
      plan: currentPlan === "pro" ? "Pro Creator (Annual)" : "Free Community",
      amount: currentPlan === "pro" ? "$180.00" : "$0.00",
      status: "Paid",
      paymentMethod: currentPlan === "pro" ? "Razorpay (UPI / Visa •••• 4242)" : "N/A",
    },
    {
      id: "INV-2026-002",
      date: "Sep 01, 2026",
      plan: "Free Community",
      amount: "$0.00",
      status: "Paid",
      paymentMethod: "Free Tier",
    },
    {
      id: "INV-2026-001",
      date: "Aug 01, 2026",
      plan: "Free Community",
      amount: "$0.00",
      status: "Paid",
      paymentMethod: "Free Tier",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 selection:text-white relative pb-24 overflow-x-hidden">
      {/* 3D Volumetric Canvas */}
      <NeonBackgroundOrbs />

      {/* Enterprise Frosted Glass Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        {/* Top subtle specular reflection line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 via-violet-400/40 to-transparent opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-all shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs text-white/50 font-mono hidden sm:inline">Active Plan:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider ${
                currentPlan === "pro"
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(121,40,202,0.25)]"
                  : "bg-white/[0.06] text-white/80 border border-white/10"
              }`}>
                {currentPlan === "pro" ? "Pro Creator" : "Free Community"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(0,242,254,0.15)]">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Subscription & Quotas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            Billing & Usage Settings
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Manage your Razorpay payment methods, subscription renewal, and download tax invoices.
          </p>
        </div>

        {/* Current Plan Overview Card (High-Definition Chamfered Glass) */}
        <div 
          style={{
            boxShadow: currentPlan === "pro"
              ? "0 30px 80px -20px rgba(121, 40, 202, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)"
              : "0 25px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
          }}
          className="rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden mb-10 bg-[#09090b]/80 border border-white/10"
        >
          {/* Top specular reflection line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-violet-400/40 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {currentPlan === "pro" ? "Pro Creator Plan" : "Free Community Plan"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-[#00f5a0] border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-xl leading-relaxed">
                {currentPlan === "pro"
                  ? "You have unlimited high-bypass word transformations, ultra-low edge latency, and full visual diff auditing."
                  : "You are currently on the Free Community tier with standard edge inference (~300ms) and 5,000 monthly words."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Renewal / Reset: Nov 01, 2026</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Words this cycle: <span className="text-white font-bold">{wordsUsed}</span> / {wordLimit}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              {currentPlan === "pro" ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-rose-500/40 text-neutral-300 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-all shadow-sm active:scale-95"
                  >
                    Cancel Subscription
                  </button>
                  <a
                    href="mailto:billing@texttoolsai.org?subject=Billing%20Support%20Request"
                    className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/90 text-xs font-semibold text-center transition-all border border-white/10 active:scale-95"
                  >
                    Contact Billing Support
                  </a>
                </>
              ) : (
                <button
                  type="button"
                  onClick={upgradeToPro}
                  className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-95"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity" />
                  <span className="relative px-6 py-3 rounded-[11px] bg-[#09090b]/90 group-hover:bg-[#09090b]/75 text-white flex items-center gap-2 backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Instant Simulate Upgrade</span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Upgrade / Change Plan Section (If Free or comparing) */}
        {currentPlan === "free" && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Upgrade to Pro Creator via Razorpay
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Unlock unlimited throughput, sub-180ms edge inference, and 99.4% Turnitin bypass weights.
                </p>
              </div>

              {/* Billing Switcher */}
              <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    billingCycle === "monthly" 
                      ? "bg-white/15 text-white shadow-sm" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Monthly ($19 / ₹1,499)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("annual")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    billingCycle === "annual" 
                      ? "bg-white/15 text-white shadow-sm" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span>Annual ($15 / ₹1,199)</span>
                  <span className="text-[10px] font-mono text-[#00f5a0] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Save 20%</span>
                </button>
              </div>
            </div>

            {/* Pro Feature Spotlight Card (Chamfered Glass Panel) */}
            <div 
              style={{
                boxShadow: "0 25px 70px -15px rgba(121, 40, 202, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)",
              }}
              className="rounded-2xl border border-white/10 bg-[#09090b]/80 p-7 sm:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 via-violet-400/50 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 font-bold uppercase tracking-wider">
                      Recommended for Power Users
                    </span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white tracking-tight">
                    Pro Creator Plan — Unlimited Everything
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white/80">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>Unlimited words & daily transformations</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>Highest bypass neural weights (99.4% Pass)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>Sub-180ms priority edge node execution</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>Interactive visual diff comparison & export</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>8 specialized Tone Shifter voices</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#00f5a0] shrink-0" />
                      <span>Priority support SLA (&lt; 1 hour)</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                  <div className="text-center lg:text-right mb-4">
                    <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
                      {billingCycle === "annual" ? "$15" : "$19"}
                      <span className="text-xs font-normal text-white/50 font-sans"> / mo</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300 mt-1">
                      {billingCycle === "annual" ? "~₹1,199/month (Billed annually)" : "~₹1,499/month"}
                    </div>
                  </div>

                  <a
                    href={razorpayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-bold text-sm tracking-tight transition-all active:scale-95 shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity" />
                    <span className="relative w-full px-7 py-3 rounded-[11px] bg-[#09090b]/90 group-hover:bg-[#09090b]/75 text-white flex items-center justify-center gap-2.5 backdrop-blur-xl transition-all">
                      {/* Razorpay SVG */}
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M22.436 0l-11.91 7.773-3.626 5.679 4.382-2.859 3.037-1.982 7.026-4.587-6.096 19.976h4.375l6.812-24zm-14.34 9.369l-8.096 5.284 3.737 9.347h4.721l-2.091-5.231 4.707-3.072 2.378-3.729-5.356-2.599z" />
                      </svg>
                      <span>Upgrade via Razorpay</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>

                  <div className="mt-2 text-[10px] font-mono text-white/50 text-center lg:text-right">
                    Supports UPI, Credit/Debit, NetBanking
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice & Payment History */}
        <div 
          style={{
            boxShadow: "0 25px 60px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
          }}
          className="rounded-2xl border border-white/10 bg-[#09090b]/80 backdrop-blur-xl p-6 sm:p-8 mb-10 relative overflow-hidden"
        >
          {/* Top specular reflection line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 via-violet-400/30 to-transparent" />

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Billing Invoices & Receipts
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Download official receipts for tax and accounting reconciliation.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-white/50 font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {inv.id}
                    </td>
                    <td className="py-3.5 px-4 text-white/80">
                      {inv.date}
                    </td>
                    <td className="py-3.5 px-4 text-white/80">
                      {inv.plan}
                    </td>
                    <td className="py-3.5 px-4 text-white/60 font-mono text-[11px]">
                      {inv.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {inv.amount}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-[#00f5a0] border border-emerald-500/30">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading tax invoice receipt: ${inv.id}`)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-cyan-300 font-mono transition-all active:scale-95"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & FAQ strip */}
        <div className="p-5 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 font-mono">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>256-bit encrypted checkout handled securely by Razorpay. We never store raw card numbers.</span>
          </div>
          <a
            href="mailto:billing@texttoolsai.org"
            className="text-cyan-300 hover:text-cyan-200 transition-colors shrink-0 flex items-center gap-1"
          >
            <span>Need enterprise invoicing? Contact sales</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Cancel Subscription Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-white/15 bg-[#09090b] p-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 text-amber-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white tracking-tight">Cancel Subscription?</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Are you sure you want to cancel your Pro Creator plan? You will retain access until the end of the current billing period on Nov 01, 2026. Afterwards, your account will revert to the Free Community plan (5,000 words/mo).
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCancelConfirmed(true);
                    setShowCancelModal(false);
                    alert("Your subscription cancellation request has been scheduled with Razorpay. You retain access until Nov 01, 2026.");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-xs font-semibold text-white transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
