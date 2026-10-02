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
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00f5a0] text-xs font-mono shadow-[0_0_15px_rgba(0,245,160,0.2)] ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5a0]"></span>
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
      className={`inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full bg-neutral-950/85 hover:bg-neutral-900/90 border border-white/15 hover:border-cyan-400/40 backdrop-blur-2xl text-xs sm:text-sm text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(0,242,254,0.12)] transition-all ${className}`}
    >
      {/* 3D Pulsing Dual Glow Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5a0] opacity-80"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f5a0] shadow-[0_0_10px_#00f5a0]"></span>
      </span>

      {/* Words Count */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-neutral-400 font-mono text-xs">Live:</span>
        <span className="font-mono font-bold tracking-tight">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0.6, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className={recentIncrement ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" : "text-white"}
            >
              {formatNumber(count)}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-neutral-300">words transformed today</span>
      </div>

      <span className="text-neutral-600 hidden sm:inline">•</span>

      {/* Latency badge */}
      <div className="hidden sm:flex items-center gap-1 text-neutral-300 font-mono text-xs">
        <Zap className="w-3.5 h-3.5 text-[#ffb703] fill-[#ffb703]" />
        <span>180ms p95</span>
      </div>

      <span className="text-neutral-600 hidden md:inline">•</span>

      {/* Active users badge */}
      <div className="hidden md:flex items-center gap-1 text-[#00f5a0] font-mono text-xs font-semibold">
        <Activity className="w-3.5 h-3.5" />
        <span>{activeUsers} online</span>
      </div>
    </motion.div>
  );
}
