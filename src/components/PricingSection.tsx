"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Shield, CreditCard, Loader2 } from "lucide-react";
import TiltCard from "./TiltCard";
import { useAuth } from "@/lib/auth-context";
import { loadRazorpayScript, launchRazorpayCheckout, RAZORPAY_PLANS } from "@/lib/razorpay";

export default function PricingSection() {
  const router = useRouter();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Pre-load Razorpay Checkout script on component mount for sub-50ms modal opening
  useEffect(() => {
    loadRazorpayScript().catch(() => {});
  }, []);

  const handleUpgradeToPro = async () => {
    try {
      setIsLoadingCheckout(true);
      setCheckoutError(null);

      const targetPlanId =
        billingCycle === "annual" ? RAZORPAY_PLANS.annual : RAZORPAY_PLANS.monthly;

      // 1. Initiate subscription creation via backend route with active plan ID
      const res = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: targetPlanId,
          billingCycle,
          userId: user?.id,
          email: user?.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to create subscription session.");
      }

      const data = await res.json();

      // 2. Launch official Razorpay Checkout popup modal using active plan ID
      await launchRazorpayCheckout({
        planId: targetPlanId,
        billingCycle,
        subscriptionId: data.subscriptionId,
        keyId: data.keyId,
        customerName: user?.fullName || undefined,
        customerEmail: user?.email || undefined,
        userId: user?.id,
        onSuccess: (response) => {
          console.info("[PricingSection] Razorpay payment successful:", response);
          router.push("/dashboard?success=true");
        },
        onDismiss: () => {
          setIsLoadingCheckout(false);
        },
      });
    } catch (err: unknown) {
      console.error("[PricingSection] Razorpay Checkout Error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to open Razorpay checkout. Please check your internet connection.";
      setCheckoutError(msg);
      setIsLoadingCheckout(false);
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free Community",
      tagline: "Ideal for students, light editing, and testing the 5 core engines.",
      price: "$0",
      period: "forever",
      cta: "Start Free Now",
      ctaLink: "#workspace",
      highlighted: false,
      isRazorpay: false,
      glowColor: "default" as const,
      features: [
        "Up to 5,000 words per month",
        "Full access to all 5 core tools",
        "Standard edge inference (~300ms)",
        "Zero data retention & privacy guarantee",
        "Clean text copy & raw download",
        "Community Discord support",
      ],
    },
    {
      id: "pro",
      name: "Pro Creator",
      tagline: "For professional writers, founders, copywriters, and developers.",
      price: billingCycle === "annual" ? "$15" : "$19",
      priceInr: billingCycle === "annual" ? "₹1,199" : "₹1,499",
      period: "/ month",
      billingNote:
        billingCycle === "annual"
          ? "Billed annually ($180 / ~₹14,399/yr)"
          : "Billed monthly (~₹1,499/mo)",
      cta: "Pay & Upgrade with Razorpay",
      highlighted: true,
      isRazorpay: true,
      badge: "Most Popular",
      glowColor: "violet" as const,
      features: [
        "Unlimited words & transformations",
        "Highest bypass neural weights (99.4% guarantee)",
        "Ultra-low latency edge nodes (< 180ms p95)",
        "Visual diff comparison & change analysis",
        "8 specialized Tone Shifter voices",
        "Priority customer support (< 1 hour SLA)",
        "Early access to beta tools & prompt tuning",
      ],
    },
    {
      id: "enterprise",
      name: "Team & Enterprise",
      tagline: "For marketing agencies, high-volume publishers, and engineering orgs.",
      price: billingCycle === "annual" ? "$69" : "$89",
      period: "/ month",
      cta: "Contact Enterprise Sales",
      ctaLink: "mailto:enterprise@texttoolsai.org?subject=Enterprise%20Inquiry",
      highlighted: false,
      isRazorpay: false,
      glowColor: "cyan" as const,
      features: [
        "Everything in Pro Creator",
        "5 included team seats & shared workspace",
        "Full REST API access (500 req/min)",
        "Custom fine-tuned brand voice models",
        "Dedicated account manager",
        "Custom enterprise invoice & DPA",
        "99.99% uptime guarantee",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-24 md:py-32 relative border-t border-slate-200/80 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-fluid-title font-extrabold text-slate-900 tracking-tight sm:tracking-tighter">
            Predictable Pricing. Zero Hidden Fees.
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Start completely free with zero credit card required. Upgrade to Pro via Razorpay for instant unlimited volume and priority edge throughput.
          </p>

          {/* Billing Switcher with Spring Animation */}
          <div className="mt-6 sm:mt-8 inline-flex items-center p-1 rounded-xl sm:rounded-2xl bg-slate-200/70 border border-slate-300/80 backdrop-blur-xl shadow-inner max-w-full">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Card Grid Wrapped with Chamfered TiltCards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((p) => (
            <TiltCard
              key={p.id}
              glowColor={p.glowColor}
              maxTilt={p.highlighted ? 6 : 4}
              scaleOnHover={1.02}
            >
              <div
                style={{
                  boxShadow: p.highlighted
                    ? "0 25px 70px -15px rgba(99, 102, 241, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)"
                    : "0 15px 35px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
                }}
                className={`relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all backdrop-blur-xl ${
                  p.highlighted
                    ? "bg-white border-2 border-indigo-500/70 shadow-xl ring-4 ring-indigo-500/10"
                    : "bg-white/95 border border-slate-200/90 hover:border-slate-300 shadow-md"
                }`}
              >
                {/* Pro Tier Specular Highlight Ribbon */}
                {p.highlighted && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500" />
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white text-[10px] font-mono uppercase tracking-wider font-extrabold shadow-md">
                      {p.badge}
                    </div>
                  </>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{p.name}</h3>
                    {p.isRazorpay && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold flex items-center gap-1 shadow-xs">
                        <CreditCard className="w-3 h-3" />
                        Razorpay
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1.5 min-h-[34px] leading-relaxed">
                    {p.tagline}
                  </p>

                  <div className="mt-5 sm:mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-mono">
                      {p.price}
                    </span>
                    <span className="text-sm text-slate-500 font-mono">
                      {p.period}
                    </span>
                    {p.priceInr && (
                      <span className="ml-2 text-xs font-mono text-slate-500">
                        (~{p.priceInr})
                      </span>
                    )}
                  </div>
                  {p.billingNote && (
                    <p className="text-[11px] text-indigo-600 font-mono mt-1 font-medium">
                      {p.billingNote}
                    </p>
                  )}

                  <div className="my-6 border-t border-slate-100" />

                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Included Capabilities:
                    </div>
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 space-y-3">
                  {p.isRazorpay ? (
                    <div>
                      {/* Direct Dynamic Razorpay Checkout Popup */}
                      <motion.button
                        type="button"
                        onClick={handleUpgradeToPro}
                        disabled={isLoadingCheckout}
                        whileHover={{ scale: isLoadingCheckout ? 1 : 1.02 }}
                        whileTap={{ scale: isLoadingCheckout ? 1 : 0.98 }}
                        transition={{ type: "spring", stiffness: 450, damping: 20 }}
                        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isLoadingCheckout ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Opening Razorpay Checkout...</span>
                          </>
                        ) : (
                          <>
                            {/* Razorpay SVG Mark */}
                            <svg
                              className="w-4 h-4 fill-white shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22.436 0l-11.91 7.773-3.626 5.679 4.382-2.859 3.037-1.982 7.026-4.587-6.096 19.976h4.375l6.812-24zm-14.34 9.369l-8.096 5.284 3.737 9.347h4.721l-2.091-5.231 4.707-3.072 2.378-3.729-5.356-2.599z" />
                            </svg>
                            <span>{p.cta}</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </>
                        )}
                      </motion.button>

                      {/* Error Banner if Script or Checkout Fails */}
                      {checkoutError && (
                        <p className="mt-2 text-xs text-rose-600 text-center font-mono">
                          {checkoutError}
                        </p>
                      )}

                      {/* Razorpay Trust Badge */}
                      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 text-center">
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Secured by Razorpay • UPI, Cards & NetBanking</span>
                      </div>
                    </div>
                  ) : (
                    <motion.a
                      href={p.ctaLink}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                      className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      <span>{p.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
