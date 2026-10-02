"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  CreditCard,
  ArrowUpRight,
  Clock,
  Layers,
  Activity,
  RefreshCw
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/lib/auth-context";
import { 
  supabase,
  isSupabaseConfigured,
  fetchGenerations, 
  deleteGenerationRecord, 
  toggleFavoriteGeneration, 
  GenerationHistoryItem 
} from "@/lib/supabase";
import { TOOLS } from "@/data/tools";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";
import TiltCard from "@/components/TiltCard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut, refreshProfile } = useAuth();

  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToolFilter, setSelectedToolFilter] = useState("all");
  const [viewFilter, setViewFilter] = useState<"all" | "starred">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live generation loader from Supabase PostgreSQL
  const loadGenerations = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const records = await fetchGenerations(user?.id);
      setHistory(records);
    } catch (err) {
      console.error("Failed to load generations from Supabase:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user?.id]);

  // Sync generations and listen to realtime updates
  useEffect(() => {
    loadGenerations();

    // Listen to local workspace events within the same app session
    const handleLocalGen = () => {
      loadGenerations();
      refreshProfile();
    };
    window.addEventListener("generation-created", handleLocalGen);

    // Set up Supabase Realtime subscription on generations table
    let channel: any = null;
    if (isSupabaseConfigured && user?.id) {
      channel = supabase
        .channel(`dashboard-generations-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "generations",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadGenerations();
            refreshProfile();
          }
        )
        .subscribe();
    }

    return () => {
      window.removeEventListener("generation-created", handleLocalGen);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [loadGenerations, refreshProfile, user?.id]);

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
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6, x: 0.5 },
        colors: ["#00f2fe", "#00f5a0", "#7928ca", "#db2777"],
      });

      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDelete = async (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    await deleteGenerationRecord(id, user?.id);
  };

  const handleToggleStar = async (id: string, currentStarred?: boolean) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isStarred: !item.isStarred } : item
      )
    );
    await toggleFavoriteGeneration(id, Boolean(currentStarred), user?.id);
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

  const currentPlan = user?.plan || "free";
  const wordsUsed = user?.wordsUsedThisMonth || 3420;
  const wordLimit = currentPlan === "pro" ? "Unlimited" : (user?.wordLimit || 5000).toLocaleString();
  const usagePct = currentPlan === "pro" ? 100 : Math.min(100, Math.round((wordsUsed / (user?.wordLimit || 5000)) * 100));

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 selection:text-white relative pb-24 overflow-x-hidden">
      {/* 3D Volumetric Canvas */}
      <NeonBackgroundOrbs />

      {/* Enterprise Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-center backdrop-blur-md group-hover:border-cyan-400/50 transition-all duration-200 shadow-sm">
                  <span className="font-mono font-bold text-white text-sm">
                    TT
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white tracking-tight text-base">
                    texttools<span className="text-white/60">ai</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                    dashboard
                  </span>
                </div>
              </Link>

              <span className="text-white/20 hidden sm:inline">/</span>

              <Link
                href="/#workspace"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors font-medium"
              >
                <span>Studio Cockpit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/settings/billing"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-white/80 hover:text-white transition-all shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Billing</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono uppercase font-bold ${
                  currentPlan === "pro"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "bg-white/10 text-white/70"
                }`}>
                  {currentPlan}
                </span>
              </Link>

              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : "CR"}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-white tracking-tight leading-tight">
                    {user?.fullName || "Creator User"}
                  </div>
                  <div className="text-[10px] text-white/50 font-mono">
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
                  className="p-1.5 rounded-lg text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Header & Launch Studio Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight sm:tracking-tighter">
              Executive Workspace
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Neural transformations, telemetry benchmarks, and quota tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#workspace"
              className="relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity" />
              <span className="relative px-5 py-2.5 rounded-[11px] bg-[#09090b]/90 group-hover:bg-[#09090b]/75 text-white flex items-center gap-2 backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(0,242,254,0.25)] group-hover:shadow-[0_0_30px_rgba(0,242,254,0.45)]">
                <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>Launch Studio Cockpit</span>
              </span>
            </Link>
          </div>
        </div>

        {/* 4 Telemetry Metric Cards in High-Definition Chamfered Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Words Usage Meter */}
          <TiltCard glowColor="cyan" maxTilt={6}>
            <div 
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
              }}
              className="p-6 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Monthly Quota</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                    {usagePct}%
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono mt-3 tracking-tight">
                  {wordsUsed.toLocaleString()} <span className="text-xs text-white/50 font-normal">/ {wordLimit}</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-white/10 mt-3.5 overflow-hidden">
                  <div
                    style={{ width: `${currentPlan === "pro" ? 100 : usagePct}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/60">
                <span>Cycle resets in 18 days</span>
                {currentPlan === "free" && (
                  <Link href="/settings/billing" className="text-cyan-400 hover:text-cyan-300 font-semibold tracking-tight">
                    Upgrade →
                  </Link>
                )}
              </div>
            </div>
          </TiltCard>

          {/* Card 2: AI Bypass Rate */}
          <TiltCard glowColor="emerald" maxTilt={6}>
            <div 
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
              }}
              className="p-6 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Detection Bypass</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-[#00f5a0] border border-emerald-500/30">
                    Verified
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#00f5a0] font-mono mt-3 tracking-tight">
                  99.4%
                </div>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                  Average pass rate against Turnitin & GPTZero
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] font-mono text-white/60 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Detection Incidents</span>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Average Latency */}
          <TiltCard glowColor="violet" maxTilt={6}>
            <div 
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
              }}
              className="p-6 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Edge Latency</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
                    p95 Edge
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono mt-3 tracking-tight">
                  184ms
                </div>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                  Multi-region global edge inference speed
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] text-[11px] font-mono text-white/60 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-violet-400" />
                <span>US-East & EU-Central active</span>
              </div>
            </div>
          </TiltCard>

          {/* Card 4: Plan Status */}
          <TiltCard glowColor="magenta" maxTilt={6}>
            <div 
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
              }}
              className="p-6 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Membership</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    currentPlan === "pro"
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                      : "bg-white/10 text-white/70 border border-white/15"
                  }`}>
                    {currentPlan}
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white tracking-tight mt-3">
                  {currentPlan === "pro" ? "Pro Creator" : "Free Community"}
                </div>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                  {currentPlan === "pro" ? "Unlimited transformations & priority SLA" : "5,000 words per month allowance"}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.08]">
                {currentPlan === "free" ? (
                  <Link
                    href="/settings/billing"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 tracking-tight"
                  >
                    <span>Upgrade to Pro with Razorpay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link href="/settings/billing" className="text-[11px] text-white/60 hover:text-white font-mono">
                    Manage Subscription →
                  </Link>
                )}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* 5 Core Engine Quick-Launch Strip */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold mb-3.5 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch Engine in Studio</span>
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
                className="group p-4 rounded-2xl bg-[#09090b]/80 hover:bg-[#121217]/90 border border-white/10 hover:border-white/20 transition-all text-left backdrop-blur-xl shadow-lg flex items-center gap-3.5"
              >
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 transition-colors">
                  {getToolIcon(tool.id)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate tracking-tight">
                    {tool.name}
                  </div>
                  <div className="text-[10px] text-white/40 font-mono truncate">
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
            boxShadow: "0 30px 70px -20px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
          }}
          className="rounded-3xl border border-white/10 bg-[#09090b]/80 backdrop-blur-2xl p-6 sm:p-8"
        >
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Transformation Vault
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.06] text-white/80 border border-white/10">
                  {filteredHistory.length} saved
                </span>
                <button
                  type="button"
                  onClick={loadGenerations}
                  title="Refresh generations from Supabase"
                  className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingHistory ? "animate-spin text-cyan-400" : ""}`} />
                </button>
                {isSupabaseConfigured && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-[#00f5a0] border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] animate-pulse" />
                    Live Supabase Sync
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 mt-1">
                Filter by tool, search prompts, or copy historical outputs with one click.
              </p>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Tab: All vs Starred */}
              <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewFilter === "all" ? "bg-white/15 text-white shadow-sm" : "text-white/60 hover:text-white"
                  }`}
                >
                  All ({history.length})
                </button>
                <button
                  type="button"
                  onClick={() => setViewFilter("starred")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    viewFilter === "starred" ? "bg-white/15 text-white shadow-sm" : "text-white/60 hover:text-white"
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
                className="bg-white/[0.03] border border-white/10 text-white/80 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="all" className="bg-[#09090b] text-white">All Engines</option>
                {TOOLS.map((t) => (
                  <option key={t.id} value={t.id} className="bg-[#09090b] text-white">
                    {t.name}
                  </option>
                ))}
              </select>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search outputs..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* History Item Cards */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const isCopied = copiedId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className="p-5 rounded-2xl bg-[#0c0c0e]/70 border border-white/[0.08] hover:border-white/20 transition-all shadow-md backdrop-blur-xl group"
                  >
                    {/* Item Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10">
                          {getToolIcon(item.toolId)}
                        </div>
                        <span className="text-xs font-bold text-white tracking-tight">
                          {item.toolName}
                        </span>
                        <span className="text-white/20 font-mono">•</span>
                        <span className="text-[11px] text-white/50 font-mono">
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
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] text-white/70 border border-white/10">
                          {item.wordsIn}w → {item.wordsOut}w ({item.wordDeltaPct > 0 ? `+${item.wordDeltaPct}%` : `${item.wordDeltaPct}%`})
                        </span>

                        {/* Star Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleStar(item.id, item.isStarred)}
                          title={item.isStarred ? "Remove Star" : "Star output"}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              item.isStarred
                                ? "fill-amber-400 text-amber-400"
                                : "text-white/30 hover:text-white/60"
                            }`}
                          />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete generation"
                          className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Dual Snippet Display */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                      {/* Input Snippet */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-sans text-white/60 leading-relaxed">
                        <div className="text-[10px] font-mono uppercase text-white/40 mb-1.5 font-bold">
                          Input Prompt
                        </div>
                        <p className="line-clamp-3">{item.fullInput}</p>
                      </div>

                      {/* Output Snippet */}
                      <div className="p-4 rounded-xl bg-[#04040d]/80 border border-cyan-500/20 font-sans text-white/90 leading-relaxed shadow-inner">
                        <div className="text-[10px] font-mono uppercase text-cyan-400 mb-1.5 font-bold flex items-center justify-between">
                          <span>Synthesized Result</span>
                          <span className="text-[10px] text-white/40 font-mono">{item.latencyMs}ms</span>
                        </div>
                        <p className="line-clamp-4 whitespace-pre-wrap">{item.fullOutput}</p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-white/70 hover:text-white transition-all border border-white/5"
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
              <h3 className="text-base font-bold text-white tracking-tight">No transformations found</h3>
              <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
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
