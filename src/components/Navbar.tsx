"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Search, 
  Stethoscope, 
  ChevronDown, 
  Menu, 
  X, 
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  LayoutDashboard,
  Info,
  CreditCard
} from "lucide-react";
import { TOOLS } from "@/data/tools";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const getToolIcon = (name: string) => {
    switch (name) {
      case "Sparkles": return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-4 h-4 text-violet-600" />;
      case "FileText": return <FileText className="w-4 h-4 text-cyan-600" />;
      case "Search": return <Search className="w-4 h-4 text-amber-600" />;
      case "Stethoscope": return <Stethoscope className="w-4 h-4 text-rose-600" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)]"
          : "bg-white/60 backdrop-blur-md border-b border-slate-200/40"
      }`}
    >
      {/* Top subtle specular reflection line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/40 via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Clean Frosted Glass */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <span className="font-mono font-bold text-white text-sm tracking-tight">
                  TT
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 border border-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  texttools<span className="text-indigo-600">ai</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-200/80 shadow-xs">
                  .org
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with High-Contrast Typography */}
            <nav className="hidden lg:flex items-center ml-8 space-x-1">
              {/* Tools Dropdown with Chamfered Glass Panel */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <span>5 Core Engines</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`} />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-88 p-2 mt-2 bg-white/95 border border-slate-200/90 rounded-2xl shadow-2xl backdrop-blur-2xl grid gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold border-b border-slate-100 mb-1">
                      Neural Text Processors
                    </div>
                    {TOOLS.map((t) => (
                      <a
                        key={t.id}
                        href="/#workspace"
                        onClick={() => {
                          const event = new CustomEvent("switch-tool", { detail: t.id });
                          window.dispatchEvent(event);
                          setToolsDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 group-hover:border-indigo-300 transition-colors">
                          {getToolIcon(t.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {t.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              {t.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {t.tagline}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/#workspace"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Studio
              </a>
              <a
                href="/#showcase"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Engines
              </a>
              <a
                href="/#features"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Benchmarks
              </a>
              <Link
                href="/docs"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="px-3 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/70 transition-colors"
              >
                About
              </Link>
              <a
                href="/#pricing"
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>

          {/* Right Action buttons with Luminous Gradient CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100/70 transition-colors"
            >
              Sign In
            </Link>

            <a
              href="/#workspace"
              className="relative group inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-[0_4px_14px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transition-all active:scale-[0.98]"
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Launch Studio</span>
              </span>
            </a>
          </div>

          {/* Mobile menu trigger with min 44px tap area */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Full-Screen Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-md flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    TT
                  </div>
                  <span className="font-bold text-slate-900 text-base">texttoolsai.org</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Section 1: 5 Core AI Engines */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-bold px-1 mb-2.5">
                    5 Neural Engines
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {TOOLS.map((t) => (
                      <a
                        key={t.id}
                        href="/#workspace"
                        onClick={() => {
                          const event = new CustomEvent("switch-tool", { detail: t.id });
                          window.dispatchEvent(event);
                          setMobileMenuOpen(false);
                        }}
                        className="min-h-[50px] flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 transition-all text-slate-800 active:scale-[0.99]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                            {getToolIcon(t.icon)}
                          </div>
                          <span className="font-semibold text-sm text-slate-900">{t.name}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
                          {t.badge}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Section 2: Platform Links */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1 mb-2.5">
                    Navigation
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>User Dashboard</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Info className="w-4 h-4 text-indigo-600" />
                        <span>About Our Mission & Story</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-indigo-400" />
                    </Link>

                    <Link
                      href="/docs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span>Developer Docs & API</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      href="/settings/billing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-slate-500" />
                        <span>Billing & Quotas</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <a
                      href="/#pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span>Pricing Plans</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Section 3: Auth & Action CTAs */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <a
                    href="/#workspace"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 text-white font-bold text-sm shadow-[0_4px_16px_rgba(99,102,241,0.35)] active:scale-[0.98] transition-all"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Launch Studio Cockpit</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[44px] flex items-center justify-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold active:scale-95 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[44px] flex items-center justify-center py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold active:scale-95 transition-all"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
