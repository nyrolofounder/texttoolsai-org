"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  Command
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

  const getToolIcon = (name: string) => {
    switch (name) {
      case "Sparkles": return <Sparkles className="w-4 h-4 text-[#00f5a0]" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-4 h-4 text-[#9d4edd]" />;
      case "FileText": return <FileText className="w-4 h-4 text-[#00f2fe]" />;
      case "Search": return <Search className="w-4 h-4 text-[#ffb703]" />;
      case "Stethoscope": return <Stethoscope className="w-4 h-4 text-[#ff0080]" />;
      default: return <Sparkles className="w-4 h-4 text-[#00f2fe]" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05050a]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top subtle specular reflection line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-violet-400/50 via-pink-400/40 to-transparent opacity-85" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with 3D neon glow */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-white/20 flex items-center justify-center shadow-inner group-hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]">
                <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080] text-sm">
                  TT
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base sm:text-lg">
                  texttools<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">ai</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                  .org
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center ml-8 space-x-1">
              {/* Tools Dropdown with 3D glass panel */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all"
                >
                  <span className="font-medium">5 Core Engines</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180 text-cyan-400" : ""}`} />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 p-2 mt-2 bg-[#09081a]/95 border border-white/20 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-2xl grid gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold border-b border-white/[0.08] mb-1">
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
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-white/[0.08] hover:to-transparent transition-all group border border-transparent hover:border-white/10"
                      >
                        <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-all">
                          {getToolIcon(t.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-200 group-hover:text-white">
                              {t.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/[0.06] text-cyan-300 border border-white/5">
                              {t.badge}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
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
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                Workspace
              </a>
              <a
                href="#showcase"
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                Engines
              </a>
              <a
                href="#features"
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                Benchmarks
              </a>
              <Link
                href="/docs"
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                Docs
              </Link>
              <a
                href="#pricing"
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all font-medium"
            >
              Sign In
            </Link>

            <a
              href="#workspace"
              className="relative group overflow-hidden rounded-xl p-[1px] transition-all active:scale-[0.98]"
            >
              {/* Animated neon rainbow border */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080] rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 px-4 py-2 rounded-[11px] bg-neutral-950 font-semibold text-sm text-white group-hover:bg-neutral-900/90 transition-all shadow-[0_0_20px_rgba(121,40,202,0.35)] group-hover:shadow-[0_0_28px_rgba(0,242,254,0.5)]">
                <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                <span>Launch Studio</span>
              </span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#070617]/98 border-b border-white/10 space-y-3 backdrop-blur-2xl">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold px-2 font-mono">
            5 Core AI Engines
          </div>
          <div className="grid grid-cols-1 gap-1">
            {TOOLS.map((t) => (
              <a
                key={t.id}
                href="#workspace"
                onClick={() => {
                  const event = new CustomEvent("switch-tool", { detail: t.id });
                  window.dispatchEvent(event);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-sm text-neutral-200"
              >
                <div className="flex items-center gap-2.5">
                  {getToolIcon(t.icon)}
                  <span className="font-medium">{t.name}</span>
                </div>
                <span className="text-xs font-mono text-cyan-300">{t.badge}</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-cyan-300 font-semibold hover:text-white"
            >
              User Dashboard
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Developer Docs
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Sign In / Sign Up
            </Link>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Pricing & Plans
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-fuchsia-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(0,242,254,0.4)]"
            >
              Open Interactive Studio Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
