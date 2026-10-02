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
  maxTilt = 8,
  scaleOnHover = 1.025,
  perspective = 1100,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Normalized mouse coordinate motion values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-energy spring physics (stiff, responsive, realistic inertia)
  const springConfig = { stiffness: 420, damping: 26, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // 3D rotations derived from mouse coordinates
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    setMousePos({ x: relX, y: relY });

    const normX = relX / width - 0.5;
    const normY = relY / height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Color mapping for atmospheric radial glow
  const glowMap = {
    cyan: {
      aura: "rgba(0, 242, 254, 0.32)",
      specular: "rgba(0, 242, 254, 0.4)",
      border: "rgba(0, 242, 254, 0.6)",
    },
    violet: {
      aura: "rgba(76, 29, 149, 0.4)",
      specular: "rgba(121, 40, 202, 0.45)",
      border: "rgba(168, 85, 247, 0.6)",
    },
    magenta: {
      aura: "rgba(219, 39, 119, 0.35)",
      specular: "rgba(255, 0, 128, 0.4)",
      border: "rgba(244, 63, 94, 0.6)",
    },
    emerald: {
      aura: "rgba(0, 245, 160, 0.3)",
      specular: "rgba(0, 245, 160, 0.4)",
      border: "rgba(52, 211, 153, 0.6)",
    },
    amber: {
      aura: "rgba(255, 183, 3, 0.3)",
      specular: "rgba(255, 183, 3, 0.4)",
      border: "rgba(251, 191, 36, 0.6)",
    },
    default: {
      aura: "rgba(255, 255, 255, 0.15)",
      specular: "rgba(255, 255, 255, 0.35)",
      border: "rgba(255, 255, 255, 0.4)",
    },
  };

  const currentTheme = glowMap[glowColor] || glowMap.default;

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
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`relative w-full h-full rounded-2xl transition-all duration-300 ${className}`}
      >
        {/* Dynamic 1px Gradient Border that reacts to mouse coordinates */}
        <div
          aria-hidden="true"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${currentTheme.border} 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
          }}
          className="absolute -inset-[1px] rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
        />

        {/* Ambient Volumetric Rim Glow Behind Card */}
        <div
          aria-hidden="true"
          style={{
            boxShadow: isHovered
              ? `0 25px 60px -15px ${currentTheme.aura}, 0 0 35px -5px ${currentTheme.aura}`
              : "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 -z-10"
        />

        {/* Specular Chamfered Glass Layer */}
        <div
          aria-hidden="true"
          style={{
            boxShadow: isHovered
              ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 0 rgba(0, 0, 0, 0.45)"
              : "inset 0 1px 0 0 rgba(255, 255, 255, 0.14), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)",
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        />

        {/* Dynamic Specular Glare Tracking Mouse Cursor */}
        {isHovered && (
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`,
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
          />
        )}

        {/* Card Content with 3D Depth */}
        <div className="relative z-10 w-full h-full transform-style-3d">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
