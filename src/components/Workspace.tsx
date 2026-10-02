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
  Cpu
} from "lucide-react";
import confetti from "canvas-confetti";
import { TOOLS, ToolConfig } from "@/data/tools";
import { transformText, TransformResult } from "@/lib/transformer";
import TiltCard from "./TiltCard";

interface WorkspaceProps {
  activeToolId: string;
  onToolChange: (toolId: string) => void;
}

export default function Workspace({ activeToolId, onToolChange }: WorkspaceProps) {
  const currentTool: ToolConfig =
    TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  const [inputVal, setInputVal] = useState(currentTool.defaultInput);
  const [outputVal, setOutputVal] = useState(currentTool.defaultOutput);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
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
  const handleTransform = () => {
    if (!inputVal.trim()) return;

    setIsProcessing(true);
    setOutputVal("");

    setTimeout(() => {
      const result = transformText(currentTool.id, inputVal, activeOptions);
      setLatency(result.latencyMs);
      setCurrentMetrics(result.stats);
      
      const fullText = result.output;
      let currentIndex = 0;
      const step = Math.max(2, Math.floor(fullText.length / 32));
      
      const streamTimer = setInterval(() => {
        currentIndex += step;
        if (currentIndex >= fullText.length) {
          setOutputVal(fullText);
          setIsProcessing(false);
          clearInterval(streamTimer);
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
  }, [inputVal, activeOptions, currentTool]);

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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7, x: 0.7 },
        colors: ["#00f2fe", "#00f5a0", "#7928ca", "#db2777"],
      });

      setTimeout(() => setCopied(false), 2500);
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = outputVal;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  // Download Output as text file
  const handleDownload = () => {
    if (!outputVal) return;
    const blob = new Blob([outputVal], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentTool.id}-output.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputVal(text);
    } catch {
      // clipboard access denied
    }
  };

  const getToolIcon = (name: string) => {
    switch (name) {
      case "Sparkles": return <Sparkles className="w-4 h-4 text-[#00f5a0]" />;
      case "SlidersHorizontal": return <SlidersHorizontal className="w-4 h-4 text-[#c084fc]" />;
      case "FileText": return <FileText className="w-4 h-4 text-[#00f2fe]" />;
      case "Search": return <Search className="w-4 h-4 text-[#ffb703]" />;
      case "Stethoscope": return <Stethoscope className="w-4 h-4 text-[#db2777]" />;
      default: return <Sparkles className="w-4 h-4 text-[#00f2fe]" />;
    }
  };

  const getToolGlowColor = (id: string) => {
    switch (id) {
      case "humanizer": return "rgba(0, 245, 160, 0.35)";
      case "tone-shifter": return "rgba(121, 40, 202, 0.4)";
      case "summarizer": return "rgba(0, 242, 254, 0.35)";
      case "seo-generator": return "rgba(255, 183, 3, 0.35)";
      case "grammar-doctor": return "rgba(219, 39, 119, 0.38)";
      default: return "rgba(0, 242, 254, 0.35)";
    }
  };

  const activeGlow = getToolGlowColor(currentTool.id);
  const wordsInCount = inputVal.trim() ? inputVal.trim().split(/\s+/).length : 0;
  const charsInCount = inputVal.length;

  return (
    <section id="workspace" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 3D Depth */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive Neural Studio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight sm:tracking-tighter">
              Test Drive the 5 Core Engines
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base mt-1.5 max-w-xl">
              Switch engines, load scenario presets, or paste your own raw content to see instantaneous neural transformation.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline font-mono">Engine Status:</span>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#09081a]/90 border border-white/15 text-xs font-mono text-neutral-200 shadow-inner backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
              <span>Tuned Weights Active</span>
              <span className="text-neutral-600">|</span>
              <span className="text-cyan-300 font-bold">{latency}ms</span>
            </div>
          </div>
        </div>

        {/* 3D Chamfered Studio Workspace Cockpit Container */}
        <div 
          style={{
            boxShadow: `0 35px 90px -20px ${activeGlow}, 0 0 50px -15px ${activeGlow}, inset 0 1px 0 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 0 rgba(0, 0, 0, 0.5)`,
          }}
          className="relative rounded-3xl border border-white/20 bg-[#080816]/90 shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-500"
        >
          {/* Top Specular Rim Reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 via-violet-400/60 via-pink-400/50 to-transparent" />

          {/* Top Tool Tabs Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0c0c20]/90 px-3 sm:px-5 py-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-2 min-w-max">
              {TOOLS.map((tool) => {
                const isActive = activeToolId === tool.id;
                return (
                  <motion.button
                    key={tool.id}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    onClick={() => onToolChange(tool.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkspaceTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/18 via-white/8 to-transparent border border-white/25 shadow-[0_0_25px_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.3)]"
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{getToolIcon(tool.icon)}</span>
                    <span className="relative z-10">{tool.name}</span>
                    <span className="relative z-10 hidden lg:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-neutral-300 border border-white/10">
                      {tool.badge}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Preset Selector with Chamfered Glass Styling */}
            <div className="relative ml-4 min-w-max">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 hidden xl:inline font-mono">Preset:</span>
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
                  className="bg-[#100f24] border border-white/15 hover:border-cyan-400/50 text-neutral-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer transition-all shadow-inner"
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
          </div>

          {/* Contextual Options Bar for Active Tool */}
          <div className="px-5 py-3 bg-[#070617]/90 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-neutral-400 font-mono flex items-center gap-1.5 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                Parameters:
              </span>

              {currentTool.options.map((opt) => (
                <div key={opt.id} className="flex items-center gap-1.5">
                  <label className="text-neutral-400">{opt.label}:</label>
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
                      className="bg-[#121029] border border-white/15 hover:border-white/30 text-neutral-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
                    >
                      {opt.choices.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Micro Badge for active tool promise */}
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
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
            <div className="flex flex-col bg-[#050512]/95 p-5 sm:p-6">
              {/* Input Header & Controls */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Input Source
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    ({wordsInCount} words · {charsInCount} chars)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePaste}
                    title="Paste from clipboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/10"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Paste</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputVal("");
                      setOutputVal("");
                    }}
                    title="Clear text"
                    className="flex items-center gap-1 p-1.5 text-xs text-neutral-400 hover:text-rose-400 rounded-lg bg-white/[0.05] hover:bg-rose-500/10 transition-all border border-white/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Textarea with Chamfered Glass Inset */}
              <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] rounded-2xl bg-[#03030a]/80 border border-white/10 p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <textarea
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={`Paste your raw text here or load a sample scenario preset above to see ${currentTool.name} in action...`}
                  className="w-full h-full min-h-[260px] sm:min-h-[310px] bg-transparent text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none resize-none font-sans leading-relaxed selection:bg-cyan-500/30 selection:text-white"
                />
              </div>

              {/* Input Footer & Glowing Transform Button with Spring Physics */}
              <div className="pt-4 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="hidden sm:inline">Shortcut:</span>
                  <kbd className="px-2 py-0.5 rounded-md bg-[#0e0d22] border border-white/15 text-neutral-300 font-mono text-[11px] shadow-inner">
                    ⌘ + Enter
                  </kbd>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.035, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  onClick={handleTransform}
                  disabled={isProcessing || !inputVal.trim()}
                  className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white overflow-hidden shadow-[0_10px_35px_rgba(0,242,254,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00f2fe] via-[#7928ca] to-[#db2777] group-hover:opacity-100 opacity-95 transition-opacity" />
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
            <div className="flex flex-col bg-[#070716]/95 p-5 sm:p-6">
              {/* Output Header & View Mode Switcher */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00f5a0] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse shadow-[0_0_8px_#00f5a0]" />
                    Synthesized Output
                  </span>

                  {currentMetrics.wordsOut > 0 && (
                    <span className="text-[11px] font-mono text-neutral-400">
                      ({currentMetrics.wordsOut} words · {currentMetrics.charCount} chars)
                    </span>
                  )}
                </div>

                {/* Actions: Diff, Copy, Download */}
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(viewMode === "clean" ? "diff" : "clean")}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all font-medium border ${
                      viewMode === "diff"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                        : "text-neutral-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border-white/10"
                    }`}
                  >
                    Diff View
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg font-semibold transition-all border ${
                      copied
                        ? "bg-emerald-500/20 text-[#00f5a0] border-emerald-500/40 shadow-[0_0_20px_rgba(0,245,160,0.35)]"
                        : "bg-white/[0.08] hover:bg-white/[0.15] text-neutral-200 hover:text-white border-white/15"
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
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    title="Download text file"
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Output Content Container with 3D Depth */}
              <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] rounded-2xl bg-[#04040d]/80 p-5 border border-white/10 overflow-y-auto shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[240px] text-center space-y-4">
                    <div className="relative w-10 h-10">
                      <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                      <Sparkles className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <p className="text-xs text-neutral-300 font-mono animate-pulse">
                      Synthesizing neural weights & cadence adjustments...
                    </p>
                  </div>
                ) : outputVal ? (
                  viewMode === "diff" ? (
                    <div className="space-y-4 text-xs sm:text-sm font-mono leading-relaxed">
                      <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-800/40 text-rose-300 shadow-md">
                        <div className="text-[10px] uppercase font-bold text-rose-400 mb-1.5 tracking-wider">
                          Original Input
                        </div>
                        {inputVal}
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-800/40 text-emerald-300 shadow-[0_0_20px_rgba(0,245,160,0.15)]">
                        <div className="text-[10px] uppercase font-bold text-[#00f5a0] mb-1.5 tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0]" />
                          Synthesized Output
                        </div>
                        {outputVal}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-100 font-sans leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30 selection:text-white">
                      {outputVal}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[240px] text-center text-neutral-500">
                    <Sparkles className="w-10 h-10 mb-2 opacity-30 text-cyan-400" />
                    <p className="text-xs">
                      Click <span className="text-neutral-300 font-semibold">Transform</span> or press <kbd className="font-mono text-cyan-300">⌘+Enter</kbd> to generate optimized copy.
                    </p>
                  </div>
                )}
              </div>

              {/* Output Analytics Strip with Luminous Numbers */}
              <div className="pt-4 mt-3 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-neutral-400 font-mono">Bypass Score</div>
                  <div className="text-xs font-bold text-[#00f5a0] font-mono mt-0.5">
                    {currentMetrics.humanScore}% Human
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-neutral-400 font-mono">Word Delta</div>
                  <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">
                    {currentMetrics.wordDeltaPct > 0 ? `+${currentMetrics.wordDeltaPct}%` : `${currentMetrics.wordDeltaPct}%`}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-neutral-400 font-mono">Readability</div>
                  <div className="text-xs font-bold text-violet-300 font-mono mt-0.5">
                    {currentMetrics.readabilityGrade}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-sm">
                  <div className="text-[10px] text-neutral-400 font-mono">Execution</div>
                  <div className="text-xs font-bold text-amber-300 font-mono mt-0.5">
                    {latency}ms (p95)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights under Workspace Wrapped in 3D TiltCards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <TiltCard glowColor="emerald" maxTilt={8} scaleOnHover={1.025}>
            <div className="p-4 rounded-2xl bg-[#0a091d]/70 border border-white/10 backdrop-blur-2xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#00f5a0]/10 border border-[#00f5a0]/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,245,160,0.2)]">
                <ShieldCheck className="w-5 h-5 text-[#00f5a0]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Zero Retention Architecture</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">In-memory execution. Never trained on.</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="cyan" maxTilt={8} scaleOnHover={1.025}>
            <div className="p-4 rounded-2xl bg-[#0a091d]/70 border border-white/10 backdrop-blur-2xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Sub-200ms Edge Inference</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Multi-region global edge execution.</div>
              </div>
            </div>
          </TiltCard>

          <TiltCard glowColor="violet" maxTilt={8} scaleOnHover={1.025}>
            <div className="p-4 rounded-2xl bg-[#0a091d]/70 border border-white/10 backdrop-blur-2xl flex items-center gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#7928ca]/15 border border-[#7928ca]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(121,40,202,0.25)]">
                <Layers className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">Instant Multi-Format Export</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">One-click copy, diffs, and raw export.</div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
