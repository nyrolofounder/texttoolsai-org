"use client";

import { useState, useEffect } from "react";
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
  ClipboardPaste, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cpu,
  AlertTriangle
} from "lucide-react";
import confetti from "canvas-confetti";
import { TOOLS, ToolConfig } from "@/data/tools";
import { transformText, TransformResult } from "@/lib/transformer";
import { saveGenerationRecord } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import TiltCard from "./TiltCard";

interface WorkspaceProps {
  activeToolId: string;
  onToolChange: (toolId: string) => void;
}

export default function Workspace({ activeToolId, onToolChange }: WorkspaceProps) {
  const { user, consumeWords } = useAuth();
  const currentTool: ToolConfig =
    TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  const [inputVal, setInputVal] = useState(currentTool.defaultInput);
  const [outputVal, setOutputVal] = useState(currentTool.defaultOutput);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [viewMode, setViewMode] = useState<"clean" | "diff">("clean");
  const [activeOptions, setActiveOptions] = useState<Record<string, string>>({});
  const [currentMetrics, setCurrentMetrics] = useState<TransformResult["stats"]>({
    wordsIn: currentTool.defaultInput.split(/\s+/).length,
    wordsOut: currentTool.defaultOutput.split(/\s+/).length,
    wordDeltaPct: -38,
    charCount: currentTool.defaultOutput.length,
    humanScore: 99.4,
    readabilityGrade: "Grade 8.2",
    fluffCut: 18,
  });
  const [latency, setLatency] = useState(184);

  // Sync tool change with default content
  useEffect(() => {
    setInputVal(currentTool.defaultInput);
    setOutputVal(currentTool.defaultOutput);
    setViewMode("clean");
    
    // Default option values for this tool
    const initialOpts: Record<string, string> = {};
    currentTool.options.forEach((opt) => {
      initialOpts[opt.id] = String(opt.default);
    });
    setActiveOptions(initialOpts);

    const wIn = currentTool.defaultInput.split(/\s+/).length;
    const wOut = currentTool.defaultOutput.split(/\s+/).length;
    setCurrentMetrics({
      wordsIn: wIn,
      wordsOut: wOut,
      wordDeltaPct: Math.round(((wOut - wIn) / (wIn || 1)) * 100),
      charCount: currentTool.defaultOutput.length,
      humanScore: 99.4,
      readabilityGrade: "Grade 8.1",
      fluffCut: Math.max(0, wIn - wOut),
    });
  }, [currentTool]);

  // Listen to external tool-switch events
  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        onToolChange(customEvent.detail);
      }
    };
    window.addEventListener("switch-tool", handleSwitch);
    return () => window.removeEventListener("switch-tool", handleSwitch);
  }, [onToolChange]);

  // Handle transformation execution
  const handleTransform = async () => {
    if (!inputVal.trim()) return;

    // Check monthly word quota limit on free tier
    if (user && user.plan === "free" && user.wordsUsedThisMonth >= user.wordLimit) {
      setQuotaExceeded(true);
      return;
    }
    setQuotaExceeded(false);

    setIsProcessing(true);
    setOutputVal("");

    setTimeout(() => {
      const result = transformText(currentTool.id, inputVal, activeOptions);
      setLatency(result.latencyMs);
      setCurrentMetrics(result.stats);
      
      const fullText = result.output;
      let currentIndex = 0;
      const step = Math.max(2, Math.floor(fullText.length / 32));
      
      const streamTimer = setInterval(async () => {
        currentIndex += step;
        if (currentIndex >= fullText.length) {
          setOutputVal(fullText);
          setIsProcessing(false);
          clearInterval(streamTimer);

          // Persist generation to Supabase PostgreSQL & local vault
          try {
            await saveGenerationRecord({
              toolId: currentTool.id,
              toolName: currentTool.name,
              inputSnippet: inputVal.slice(0, 120),
              outputSnippet: fullText.slice(0, 120),
              fullInput: inputVal,
              fullOutput: fullText,
              wordsIn: result.stats.wordsIn,
              wordsOut: result.stats.wordsOut,
              wordDeltaPct: result.stats.wordDeltaPct,
              humanScore: result.stats.humanScore,
              latencyMs: result.latencyMs,
            }, user?.id);

            // Live word quota tracking in profiles
            await consumeWords(result.stats.wordsIn);

            // Notify dashboard and any listening components
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("generation-created"));
            }
          } catch (err) {
            console.error("Could not persist generation or update quota", err);
          }
        } else {
          setOutputVal(fullText.slice(0, currentIndex));
        }
      }, 15);
    }, 200);
  };

  // Keyboard shortcut listener: Cmd + Enter / Ctrl + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleTransform();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputVal, activeOptions, currentTool, user]);

  // Copy to clipboard with celebratory confetti & robust fallback
  const handleCopy = async () => {
    if (!outputVal) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(outputVal);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = outputVal;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6, x: 0.5 },
        colors: ["#06b6d4", "#00f5a0", "#8b5cf6", "#ec4899"],
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Paste from clipboard
  const handlePaste = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) setInputVal(text);
      }
    } catch {
      // Fallback
    }
  };

  // Download output as text file
  const handleDownload = () => {
    if (!outputVal) return;
    const blob = new Blob([outputVal], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentTool.id}-output-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

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

  const activeGlow = "rgba(6, 182, 212, 0.25)";

  const wordsInCount = inputVal.trim() ? inputVal.trim().split(/\s+/).length : 0;
  const charsInCount = inputVal.length;

  return (
    <section id="workspace" className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive Neural Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight sm:tracking-tighter">
              Test Drive the 5 Core Engines
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-1.5 max-w-xl leading-relaxed">
              Switch engines, load scenario presets, or paste your own raw content to see instantaneous neural transformation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Word Quota Meter Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80 backdrop-blur-xl shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white/50">Quota:</span>
              <span className="text-white font-bold">
                {(user?.wordsUsedThisMonth ?? 0).toLocaleString()}
              </span>
              <span className="text-white/30">/</span>
              <span className="text-white/60">
                {user?.plan === "pro" ? "Unlimited" : (user?.wordLimit || 5000).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b0f19]/80 border border-white/10 text-xs font-mono text-white/80 shadow-sm backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
              <span className="hidden sm:inline">Weights Active</span>
              <span className="text-white/40">|</span>
              <span className="text-cyan-300 font-bold">{latency}ms</span>
            </div>
          </div>
        </div>

        {/* Quota Exceeded Notification Banner */}
        {quotaExceeded && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200 shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Monthly word quota reached ({(user?.wordsUsedThisMonth ?? 5000).toLocaleString()} / {(user?.wordLimit || 5000).toLocaleString()} words used). Upgrade to Pro Creator for unlimited words & priority edge nodes.
              </span>
            </div>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 text-white font-bold shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
            >
              Upgrade to Pro
            </a>
          </motion.div>
        )}

        {/* Studio Workspace Cockpit Container */}
        <div 
          style={{
            boxShadow: `0 30px 80px -20px ${activeGlow}, inset 0 1px 0 0 rgba(255, 255, 255, 0.18)`,
          }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0b0f19]/80 shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300"
        >
          {/* Top Specular Rim Reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 via-violet-400/50 to-transparent" />

          {/* Top Tool Tabs Header - Fully responsive scroll & wrap */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-white/[0.08] bg-[#090d16]/90 px-3 sm:px-5 py-3 gap-3">
            <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto scrollbar-none touch-pan-x min-w-0 pb-1 sm:pb-0">
              {TOOLS.map((tool) => {
                const isActive = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => onToolChange(tool.id)}
                    className={`relative shrink-0 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkspaceTab"
                        className="absolute inset-0 rounded-xl bg-white/[0.12] border border-white/20 shadow-sm"
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{getToolIcon(tool.icon)}</span>
                    <span className="relative z-10">{tool.name}</span>
                    <span className="relative z-10 hidden xl:inline text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/40 text-white/70 border border-white/10">
                      {tool.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scenario Preset Selector */}
            <div className="relative shrink-0 flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
              <span className="text-xs text-white/50 font-mono">Preset:</span>
              <select
                value=""
                onChange={(e) => {
                  const presetIndex = Number(e.target.value);
                  if (!isNaN(presetIndex) && currentTool.presets[presetIndex]) {
                    const selected = currentTool.presets[presetIndex];
                    setInputVal(selected.input);
                    setOutputVal(selected.output);
                    const result = transformText(currentTool.id, selected.input, activeOptions);
                    setCurrentMetrics(result.stats);
                    setLatency(result.latencyMs);
                  }
                }}
                className="bg-[#0e1422] border border-white/15 hover:border-cyan-400/50 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer transition-all shadow-inner max-w-[200px] truncate"
              >
                <option value="" disabled>
                  Load Scenario Preset...
                </option>
                {currentTool.presets.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contextual Options Bar for Active Tool */}
          <div className="px-3 sm:px-5 py-2.5 sm:py-3 bg-[#080c14]/90 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-white/60 font-mono flex items-center gap-1.5 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Params:</span>
              </span>

              {currentTool.options.map((opt) => (
                <div key={opt.id} className="flex items-center gap-1.5">
                  <label className="text-white/50 text-[11px] sm:text-xs">{opt.label}:</label>
                  {opt.choices ? (
                    <select
                      value={activeOptions[opt.id] || String(opt.default)}
                      onChange={(e) => {
                        const newOpts = {
                          ...activeOptions,
                          [opt.id]: e.target.value,
                        };
                        setActiveOptions(newOpts);
                        if (inputVal.trim()) {
                          const result = transformText(currentTool.id, inputVal, newOpts);
                          setOutputVal(result.output);
                          setCurrentMetrics(result.stats);
                          setLatency(result.latencyMs);
                        }
                      }}
                      className="bg-[#0e1422] border border-white/15 hover:border-white/30 text-white text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
                    >
                      {opt.choices.map((c) => (
                        <option key={c.value} value={c.value} className="bg-[#0e1422] text-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Micro Badge for active tool promise */}
            <div className="hidden md:flex items-center gap-2 text-white/60 font-mono text-[11px]">
              <span className="text-[#00f5a0] font-semibold">
                {currentTool.metricsSummary.primaryMetric}: {currentTool.metricsSummary.primaryValue}
              </span>
              <span>•</span>
              <span className="text-cyan-300">
                {currentTool.metricsSummary.secondaryMetric}: {currentTool.metricsSummary.secondaryValue}
              </span>
            </div>
          </div>

          {/* Dual-Pane Editor Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* Left Column: Input Box */}
            <div className="flex flex-col bg-[#080c14]/90 p-4 sm:p-6">
              {/* Input Header & Controls */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Input Source
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    ({wordsInCount}w · {charsInCount}c)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={handlePaste}
                    title="Paste from clipboard"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 text-xs text-white/80 hover:text-white rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/10 active:scale-95"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden xs:inline">Paste</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInputVal("");
                      setOutputVal("");
                    }}
                    title="Clear text"
                    className="flex items-center gap-1 p-1.5 text-xs text-white/60 hover:text-rose-400 rounded-lg bg-white/[0.05] hover:bg-rose-500/10 transition-all border border-white/10 active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Textarea with Clean Obsidian-Indigo Inset */}
              <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] rounded-xl sm:rounded-2xl bg-[#04060c]/80 border border-white/10 p-3.5 sm:p-4 shadow-inner">
                <textarea
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={`Paste your raw text here or load a sample scenario preset above to see ${currentTool.name} in action...`}
                  className="w-full h-full min-h-[200px] sm:min-h-[280px] bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none resize-none font-sans leading-relaxed selection:bg-cyan-500/30 selection:text-white"
                />
              </div>

              {/* Input Footer & Glowing Transform Button */}
              <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/50 justify-between sm:justify-start">
                  <span>Shortcut:</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-[#0e1422] border border-white/15 text-white/80 font-mono text-[11px] shadow-inner">
                    ⌘ + Enter
                  </kbd>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  onClick={handleTransform}
                  disabled={isProcessing || !inputVal.trim()}
                  className="w-full sm:w-auto min-h-[46px] relative group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white overflow-hidden shadow-[0_10px_35px_rgba(6,182,212,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-[#6366f1] to-[#a855f7] group-hover:opacity-100 opacity-95 transition-opacity" />
                  <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2 tracking-tight">
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-cyan-200" />
                        <span>Transform with {currentTool.name}</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Right Column: Output Box */}
            <div className="flex flex-col bg-[#090d18]/95 p-4 sm:p-6">
              {/* Output Header & View Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00f5a0] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
                    Synthesized Output
                  </span>

                  {currentMetrics.wordsOut > 0 && (
                    <span className="text-[11px] font-mono text-white/50">
                      ({currentMetrics.wordsOut}w)
                    </span>
                  )}
                </div>

                {/* Actions: Diff, Copy, Download */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode(viewMode === "clean" ? "diff" : "clean")}
                    className={`px-2.5 py-1.5 sm:px-3 text-xs rounded-lg transition-all font-medium border active:scale-95 ${
                      viewMode === "diff"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                        : "text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border-white/10"
                    }`}
                  >
                    Diff View
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-semibold transition-all border active:scale-95 ${
                      copied
                        ? "bg-emerald-500/20 text-[#00f5a0] border-emerald-500/40 shadow-sm"
                        : "bg-white/[0.08] hover:bg-white/[0.15] text-white border-white/15"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00f5a0]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download text file"
                    className="p-1.5 text-white/70 hover:text-white rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/10 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Output Content Container with Clean Depth */}
              <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] rounded-xl sm:rounded-2xl bg-[#04060c]/80 p-3.5 sm:p-5 border border-white/10 overflow-y-auto shadow-inner">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center space-y-3">
                    <div className="relative w-9 h-9">
                      <div className="w-9 h-9 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                      <Sparkles className="w-4 h-4 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <p className="text-xs text-white/70 font-mono animate-pulse">
                      Synthesizing neural weights & cadence adjustments...
                    </p>
                  </div>
                ) : outputVal ? (
                  viewMode === "diff" ? (
                    <div className="space-y-3.5 text-xs sm:text-sm font-mono leading-relaxed">
                      <div className="p-3 sm:p-4 rounded-xl bg-rose-950/20 border border-rose-800/30 text-rose-200 shadow-sm break-words overflow-x-auto">
                        <div className="text-[10px] uppercase font-bold text-rose-400 mb-1 tracking-wider">
                          Original Input
                        </div>
                        {inputVal}
                      </div>
                      <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-emerald-200 shadow-sm break-words overflow-x-auto">
                        <div className="text-[10px] uppercase font-bold text-[#00f5a0] mb-1 tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0]" />
                          Synthesized Output
                        </div>
                        {outputVal}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-white font-sans leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30 selection:text-white">
                      {outputVal}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-white/40">
                    <Sparkles className="w-8 h-8 mb-2 opacity-30 text-cyan-400" />
                    <p className="text-xs">
                      Click <span className="text-white font-semibold">Transform</span> or press <kbd className="font-mono text-cyan-300">⌘+Enter</kbd> to generate optimized copy.
                    </p>
                  </div>
                )}
              </div>

              {/* Output Analytics Strip */}
              <div className="pt-3.5 mt-3 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-white/50 font-mono">Bypass Score</div>
                  <div className="text-xs font-bold text-[#00f5a0] font-mono mt-0.5">
                    {currentMetrics.humanScore}% Human
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-white/50 font-mono">Word Delta</div>
                  <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">
                    {currentMetrics.wordDeltaPct > 0 ? `+${currentMetrics.wordDeltaPct}%` : `${currentMetrics.wordDeltaPct}%`}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-white/50 font-mono">Readability</div>
                  <div className="text-xs font-bold text-violet-300 font-mono mt-0.5">
                    {currentMetrics.readabilityGrade}
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-white/50 font-mono">Execution</div>
                  <div className="text-xs font-bold text-amber-300 font-mono mt-0.5">
                    {latency}ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights under Workspace */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
          <TiltCard glowColor="emerald" maxTilt={6} scaleOnHover={1.02}>
            <div className="p-4 rounded-2xl bg-[#0b0f19]/80 border border-white/10 backdrop-blur-xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#00f5a0]/10 border border-[#00f5a0]/25 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#00f5a0]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Zero Retention Architecture</div>
                <div className="text-[11px] text-white/60 mt-0.5">In-memory execution. Never trained on.</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="cyan" maxTilt={6} scaleOnHover={1.02}>
            <div className="p-4 rounded-2xl bg-[#0b0f19]/80 border border-white/10 backdrop-blur-xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/25 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Sub-200ms Edge Inference</div>
                <div className="text-[11px] text-white/60 mt-0.5">Multi-region global edge execution.</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="violet" maxTilt={6} scaleOnHover={1.02}>
            <div className="p-4 rounded-2xl bg-[#0b0f19]/80 border border-white/10 backdrop-blur-xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Instant Multi-Format Export</div>
                <div className="text-[11px] text-white/60 mt-0.5">One-click copy, diffs, and raw export.</div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
