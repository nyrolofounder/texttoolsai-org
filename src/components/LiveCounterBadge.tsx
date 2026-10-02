"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface LiveCounterBadgeProps {
  initialCount?: number;
  className?: string;
  variant?: "hero" | "compact" | "banner";
}

export default function LiveCounterBadge({
  initialCount = 1489240,
  className = "",
  variant = "hero",
}: LiveCounterBadgeProps) {
  const [count, setCount] = useState(initialCount);
  const [activeUsers, setActiveUsers] = useState(847);
  const [recentIncrement, setRecentIncrement] = useState(false);

  useEffect(() => {
    // Ticking simulated live usage every 3 to 5 seconds
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 45) + 12;
      setCount((prev) => prev + increment);
      setRecentIncrement(true);

      setActiveUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(810, Math.min(890, prev + delta));
      });

      const timer = setTimeout(() => setRecentIncrement(false), 900);
      return () => clearTimeout(timer);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono shadow-xs ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{formatNumber(count)} words processed</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 backdrop-blur-2xl text-xs sm:text-sm text-slate-700 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.08),0_0_1px_1px_rgba(226,232,240,0.8)] transition-all ${className}`}
    >
      {/* 3D Pulsing Dual Glow Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
      </span>

      {/* Words Count */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-slate-400 font-mono text-xs">Live:</span>
        <span className="font-mono font-bold tracking-tight text-slate-900">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0.6, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className={recentIncrement ? "text-indigo-600 drop-shadow-xs" : "text-slate-900"}
            >
              {formatNumber(count)}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-slate-600">words transformed today</span>
      </div>

      <span className="text-slate-300 hidden sm:inline">•</span>

      {/* Latency badge */}
      <div className="hidden sm:flex items-center gap-1 text-slate-600 font-mono text-xs">
        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span className="font-semibold text-slate-800">180ms p95</span>
      </div>

      <span className="text-slate-300 hidden md:inline">•</span>

      {/* Active users badge */}
      <div className="hidden md:flex items-center gap-1 text-emerald-600 font-mono text-xs font-semibold">
        <Activity className="w-3.5 h-3.5" />
        <span>{activeUsers} online</span>
      </div>
    </motion.div>
  );
}
