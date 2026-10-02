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
  LayoutDashboard
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
      case "Sparkles": return <Sparkles className="w-4 h-4 text-[#00f5a0]" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-4 h-4 text-[#c084fc]" />;
      case "FileText": return <FileText className="w-4 h-4 text-[#06b6d4]" />;
      case "Search": return <Search className="w-4 h-4 text-[#fbbf24]" />;
      case "Stethoscope": return <Stethoscope className="w-4 h-4 text-[#f43f5e]" />;
      default: return <Sparkles className="w-4 h-4 text-[#06b6d4]" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top subtle specular reflection line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 via-violet-400/30 to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Clean Frosted Glass */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-center backdrop-blur-md group-hover:border-cyan-400/50 transition-all duration-200 shadow-sm">
                <span className="font-mono font-bold text-white text-sm">
                  TT
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base sm:text-lg">
                  texttools<span className="text-white/60">ai</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                  .org
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with High-Contrast Typography */}
            <nav className="hidden md:flex items-center ml-8 space-x-1">
              {/* Tools Dropdown with Chamfered Glass Panel */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                  <span>5 Core Engines</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180 text-cyan-400" : "text-white/60"}`} />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 p-2 mt-2 bg-[#0b0f19]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl grid gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold border-b border-white/[0.06] mb-1">
                      Neural Text Processors
                    </div>
                    {TOOLS.map((t) => (
                      <a
                        key={t.id}
                        href="#workspace"
                        onClick={() => {
                          const event = new CustomEvent("switch-tool", { detail: t.id });
                          window.dispatchEvent(event);
                          setToolsDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                          {getToolIcon(t.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {t.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/[0.06] text-cyan-300 border border-white/5">
                              {t.badge}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                            {t.tagline}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#workspace"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Studio
              </a>
              <a
                href="#showcase"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Engines
              </a>
              <a
                href="#features"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Benchmarks
              </a>
              <Link
                href="/docs"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Docs
              </Link>
              <a
                href="#pricing"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Right Action buttons with Luminous Gradient CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Sign In
            </Link>

            <a
              href="#workspace"
              className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity" />
              <span className="relative px-4 py-2 rounded-[11px] bg-[#0b0f19]/90 group-hover:bg-[#0b0f19]/75 text-white flex items-center gap-2 backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.45)]">
                <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                <span>Launch Studio</span>
              </span>
            </a>
          </div>

          {/* Mobile menu trigger with min 44px tap area */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all shadow-sm"
            >
              <Menu className="w-5 h-5 text-white" />
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
            className="fixed inset-0 z-50 sm:hidden bg-[#030712]/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.08]">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center">
                  <span className="font-mono font-bold text-white text-sm">TT</span>
                </div>
                <span className="font-bold text-white text-base">texttoolsai.org</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-white flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              {/* Section 1: 5 Core AI Engines */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-1 mb-2.5">
                  5 Neural Engines
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {TOOLS.map((t) => (
                    <a
                      key={t.id}
                      href="#workspace"
                      onClick={() => {
                        const event = new CustomEvent("switch-tool", { detail: t.id });
                        window.dispatchEvent(event);
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[50px] flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-neutral-200 active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                          {getToolIcon(t.icon)}
                        </div>
                        <span className="font-medium text-sm text-white">{t.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {t.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Section 2: Platform Links */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-semibold px-1 mb-2.5">
                  Navigation
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                      <span>User Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </Link>
                  <Link
                    href="/docs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span>Developer Docs & API</span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </Link>
                  <a
                    href="#pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span>Pricing Plans</span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </a>
                  <a
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span>Frequently Asked Questions</span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </a>
                </div>
              </div>

              {/* Section 3: Auth & Action CTAs */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <a
                  href="#workspace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-[0.98] transition-all"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Launch Studio Cockpit</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center justify-center py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold active:scale-95 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center justify-center py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-cyan-300 text-xs font-semibold active:scale-95 transition-all"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
