"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "magenta" | "emerald" | "amber" | "default";
  maxTilt?: number;
  scaleOnHover?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "default",
  maxTilt = 10,
  scaleOnHover = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-energy spring physics (stiff, responsive, no lag)
  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // 3D rotations derived from mouse coordinates
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Color mapping for atmospheric rim glow
  const glowMap = {
    cyan: "rgba(0, 242, 254, 0.25)",
    violet: "rgba(121, 40, 202, 0.3)",
    magenta: "rgba(255, 0, 128, 0.25)",
    emerald: "rgba(0, 245, 160, 0.25)",
    amber: "rgba(255, 183, 3, 0.25)",
    default: "rgba(255, 255, 255, 0.12)",
  };

  const currentGlow = glowMap[glowColor] || glowMap.default;

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="relative w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`relative w-full h-full rounded-2xl transition-shadow duration-300 ${className}`}
      >
        {/* Ambient colored rim glow on hover */}
        <div
          aria-hidden="true"
          style={{
            background: isHovered
              ? `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${currentGlow}, transparent 70%)`
              : "transparent",
            boxShadow: isHovered
              ? `0 25px 50px -12px ${currentGlow}`
              : "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
          }}
          className="absolute -inset-px rounded-2xl pointer-events-none transition-all duration-300 -z-10"
        />

        {/* Specular glare overlay that tracks cursor */}
        {isHovered && (
          <motion.div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
          />
        )}

        {/* Card Content with 3D depth */}
        <div className="relative z-10 w-full h-full transform-style-3d">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
