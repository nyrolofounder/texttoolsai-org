"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  SlidersHorizontal, 
  FileText, 
  Search, 
  Stethoscope, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Star, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  LogOut, 
  Settings, 
  CreditCard,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Filter
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/lib/auth-context";
import { 
  getSavedHistory, 
  deleteHistoryItem, 
  toggleFavoriteHistoryItem, 
  GenerationHistoryItem 
} from "@/lib/supabase";
import { TOOLS } from "@/data/tools";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import TiltCard from "@/components/TiltCard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signOut, upgradeToPro } = useAuth();

  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToolFilter, setSelectedToolFilter] = useState("all");
  const [viewFilter, setViewFilter] = useState<"all" | "starred">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync history on mount
  useEffect(() => {
    setHistory(getSavedHistory());
  }, []);

  // Filter history based on search, tool, and starred status
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.inputSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.outputSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.toolName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTool =
        selectedToolFilter === "all" || item.toolId === selectedToolFilter;

      const matchesView =
        viewFilter === "all" || (viewFilter === "starred" && item.isStarred);

      return matchesSearch && matchesTool && matchesView;
    });
  }, [history, searchQuery, selectedToolFilter, viewFilter]);

  const handleCopy = async (text: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedId(id);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6, x: 0.5 },
        colors: ["#00f2fe", "#00f5a0", "#7928ca", "#db2777"],
      });

      setTimeout(() => setCopiedId(null), 2200);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getSavedHistory());
  };

  const handleToggleStar = (id: string) => {
    toggleFavoriteHistoryItem(id);
    setHistory(getSavedHistory());
  };

  const handleDownload = (item: GenerationHistoryItem) => {
    const content = `Tool: ${item.toolName}\nCreated: ${new Date(item.createdAt).toLocaleString()}\nBypass Score: ${item.humanScore || 99}%\n\n--- ORIGINAL INPUT ---\n${item.fullInput}\n\n--- SYNTHESIZED OUTPUT ---\n${item.fullOutput}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.toolId}-${item.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getToolIcon = (toolId: string) => {
    switch (toolId) {
      case "humanizer": return <Sparkles className="w-4 h-4 text-[#00f5a0]" />;
      case "tone-shifter": return <SlidersHorizontal className="w-4 h-4 text-[#c084fc]" />;
      case "summarizer": return <FileText className="w-4 h-4 text-[#00f2fe]" />;
      case "seo-generator": return <Search className="w-4 h-4 text-[#ffb703]" />;
      case "grammar-doctor": return <Stethoscope className="w-4 h-4 text-[#db2777]" />;
      default: return <Sparkles className="w-4 h-4 text-[#00f2fe]" />;
    }
  };

  const getToolGlow = (toolId: string) => {
    switch (toolId) {
      case "humanizer": return "rgba(0, 245, 160, 0.35)";
      case "tone-shifter": return "rgba(121, 40, 202, 0.35)";
      case "summarizer": return "rgba(0, 242, 254, 0.35)";
      case "seo-generator": return "rgba(255, 183, 3, 0.35)";
      case "grammar-doctor": return "rgba(219, 39, 119, 0.35)";
      default: return "rgba(0, 242, 254, 0.35)";
    }
  };

  const currentPlan = user?.plan || "free";
  const wordsUsed = user?.wordsUsedThisMonth || 3420;
  const wordLimit = currentPlan === "pro" ? "Unlimited" : (user?.wordLimit || 5000).toLocaleString();
  const usagePct = currentPlan === "pro" ? 100 : Math.min(100, Math.round((wordsUsed / (user?.wordLimit || 5000)) * 100));

  return (
    <main className="min-h-screen bg-[#05050a] text-white selection:bg-cyan-500/30 selection:text-white relative pb-24 overflow-x-hidden">
      {/* 3D Volumetric Canvas */}
      <NeonBackgroundOrbs />

      {/* Dashboard Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#05050a]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-white/20 flex items-center justify-center shadow-inner group-hover:border-cyan-400/60 transition-all duration-300">
                  <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#ff0080] text-sm">
                    TT
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-tight text-base">
                    texttools<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">ai</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    dashboard
                  </span>
                </div>
              </Link>

              <span className="text-neutral-600 hidden sm:inline">|</span>

              <Link
                href="/#workspace"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-cyan-300 transition-colors font-medium"
              >
                <span>Interactive Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/settings/billing"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Billing</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono uppercase font-bold ${
                  currentPlan === "pro"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "bg-neutral-800 text-neutral-400"
                }`}>
                  {currentPlan}
                </span>
              </Link>

              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : "CR"}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-white leading-tight">
                    {user?.fullName || "Creator User"}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {user?.email || "creator@texttoolsai.org"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    router.push("/login");
                  }}
                  title="Sign out"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Welcome & Notification Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight sm:tracking-tighter">
              Welcome back, {user?.fullName?.split(" ")[0] || "Creator"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Your neural transformation vault, telemetry benchmarks, and quota tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777] shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Studio Cockpit</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Telemetry Meters in Chamfered 3D TiltCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Words Usage Meter */}
          <TiltCard glowColor="cyan" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#0a091e]/80 border border-white/12 backdrop-blur-2xl h-full flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Monthly Quota</span>
                  <span className="text-cyan-300 font-bold">{usagePct}%</span>
                </div>
                <div className="text-2xl font-extrabold text-white font-mono mt-2">
                  {wordsUsed.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">/ {wordLimit}</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                  <div
                    style={{ width: `${currentPlan === "pro" ? 100 : usagePct}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_#00f2fe]"
                  />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
                <span>Resets in 18 days</span>
                {currentPlan === "free" && (
                  <Link href="/settings/billing" className="text-cyan-400 hover:underline font-semibold">
                    Upgrade →
                  </Link>
                )}
              </div>
            </div>
          </TiltCard>

          {/* Card 2: AI Bypass Rate */}
          <TiltCard glowColor="emerald" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#0a091e]/80 border border-white/12 backdrop-blur-2xl h-full flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Detection Bypass</span>
                  <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
                </div>
                <div className="text-2xl font-extrabold text-[#00f5a0] font-mono mt-2">
                  99.4%
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  Average pass rate against Turnitin & GPTZero
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Detection Incidents</span>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Average Latency */}
          <TiltCard glowColor="violet" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#0a091e]/80 border border-white/12 backdrop-blur-2xl h-full flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Edge Latency</span>
                  <span className="text-violet-300 font-mono">p95</span>
                </div>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono mt-2">
                  184ms
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  Multi-region global edge inference speed
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                <span>US-East & EU-Central active</span>
              </div>
            </div>
          </TiltCard>

          {/* Card 4: Plan Status */}
          <TiltCard glowColor="magenta" maxTilt={6}>
            <div className="p-5 rounded-2xl bg-[#0a091e]/80 border border-white/12 backdrop-blur-2xl h-full flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Membership Plan</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-bold uppercase">
                    {currentPlan}
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white tracking-tight mt-2">
                  {currentPlan === "pro" ? "Pro Creator" : "Free Community"}
                </div>
                <p className="text-xs text-neutral-300 mt-1">
                  {currentPlan === "pro" ? "Unlimited transformations & priority SLA" : "Standard edge inference"}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                {currentPlan === "free" ? (
                  <Link
                    href="/settings/billing"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 hover:underline"
                  >
                    <span>Upgrade to Pro with Razorpay</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                  </Link>
                ) : (
                  <Link href="/settings/billing" className="text-[11px] text-neutral-400 hover:text-white font-mono">
                    Manage Subscription →
                  </Link>
                )}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* 5 Core Engine Quick-Launch Strip */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Quick-Launch Engine Studio</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  const event = new CustomEvent("switch-tool", { detail: tool.id });
                  window.dispatchEvent(event);
                  router.push("/#workspace");
                }}
                className="group p-3.5 rounded-2xl bg-[#09081e]/75 hover:bg-[#12102e]/90 border border-white/10 hover:border-white/25 transition-all text-left backdrop-blur-xl shadow-md flex items-center gap-3"
              >
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                  {getToolIcon(tool.id)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {tool.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono truncate">
                    {tool.badge}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transformation History Vault Section */}
        <div 
          style={{
            boxShadow: "0 30px 80px -25px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)",
          }}
          className="rounded-3xl border border-white/15 bg-[#08081a]/90 backdrop-blur-2xl p-6 sm:p-8"
        >
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Transformation Vault
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-white/10 text-cyan-300 border border-white/10">
                  {filteredHistory.length} saved
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Filter by tool, search prompts, or copy historical generations with one click.
              </p>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tab: All vs Starred */}
              <div className="inline-flex items-center p-1 rounded-xl bg-[#04040e] border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewFilter === "all" ? "bg-white/15 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  All ({history.length})
                </button>
                <button
                  type="button"
                  onClick={() => setViewFilter("starred")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewFilter === "starred" ? "bg-white/15 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Starred</span>
                </button>
              </div>

              {/* Tool Dropdown Filter */}
              <select
                value={selectedToolFilter}
                onChange={(e) => setSelectedToolFilter(e.target.value)}
                className="bg-[#04040e] border border-white/10 text-neutral-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="all">All Engines</option>
                {TOOLS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search outputs..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#04040e] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* History Item Cards */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const glow = getToolGlow(item.toolId);
                const isCopied = copiedId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className="p-5 rounded-2xl bg-[#0a0920]/80 border border-white/10 hover:border-white/25 transition-all shadow-md backdrop-blur-xl group"
                  >
                    {/* Item Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10">
                          {getToolIcon(item.toolId)}
                        </div>
                        <span className="text-xs font-bold text-white">
                          {item.toolName}
                        </span>
                        <span className="text-neutral-600 font-mono">•</span>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Right Tags & Telemetry */}
                      <div className="flex items-center gap-2">
                        {item.humanScore && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-[#00f5a0] border border-emerald-500/30 font-bold">
                            {item.humanScore}% Human
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                          {item.wordsIn}w → {item.wordsOut}w ({item.wordDeltaPct > 0 ? `+${item.wordDeltaPct}%` : `${item.wordDeltaPct}%`})
                        </span>

                        {/* Star Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleStar(item.id)}
                          title={item.isStarred ? "Remove Star" : "Star output"}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              item.isStarred
                                ? "fill-amber-400 text-amber-400"
                                : "text-neutral-500 hover:text-neutral-300"
                            }`}
                          />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete generation"
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Dual Snippet Display */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                      {/* Input Snippet */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-sans text-neutral-400 leading-relaxed">
                        <div className="text-[10px] font-mono uppercase text-neutral-500 mb-1 font-bold">
                          Input Prompt
                        </div>
                        <p className="line-clamp-3">{item.fullInput}</p>
                      </div>

                      {/* Output Snippet */}
                      <div className="p-3.5 rounded-xl bg-[#04040f]/90 border border-cyan-500/20 font-sans text-neutral-100 leading-relaxed shadow-inner">
                        <div className="text-[10px] font-mono uppercase text-cyan-400 mb-1 font-bold flex items-center justify-between">
                          <span>Synthesized Result</span>
                          <span className="text-[10px] text-neutral-500 font-mono">{item.latencyMs}ms</span>
                        </div>
                        <p className="line-clamp-4 whitespace-pre-wrap">{item.fullOutput}</p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-neutral-300 hover:text-white transition-all border border-white/5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export .txt</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopy(item.fullOutput, item.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          isCopied
                            ? "bg-emerald-500/20 text-[#00f5a0] border-emerald-500/40"
                            : "bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border-cyan-500/30"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Copy Output</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3 text-cyan-400">
                <Sparkles className="w-6 h-6 opacity-40" />
              </div>
              <h3 className="text-base font-bold text-white">No transformations found</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? "No saved outputs match your current query. Try adjusting your search term."
                  : "Launch any tool in the studio to generate and automatically save results to your vault."}
              </p>
              <Link
                href="/#workspace"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md"
              >
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
