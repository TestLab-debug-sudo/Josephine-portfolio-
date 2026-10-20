"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { BorderGlow } from "@/components/ui/BorderGlow";

export type StatCardVariant = "progress" | "wave" | "dual-line" | "histogram";

export interface StatCardProps {
  label: string;
  timeframe?: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trendText?: string;
  trendColor?: "green" | "red" | "blue";
  variant?: StatCardVariant;
  sublabel?: string;
  subvalue?: string;
  progressPercent?: number;
  description?: string;
  icon?: LucideIcon;
  colorClass?: string;
}

const HISTOGRAM_BARS = [
  28, 42, 35, 58, 45, 78, 38, 55, 68, 40, 100, 52, 62, 48, 75, 58, 44, 85, 62,
  50, 74, 65, 88, 42,
];

export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  trendText,
  trendColor = "green",
  variant = "progress",
  sublabel = "Conversion Rate",
  subvalue = "+6%",
  progressPercent = 85,
  description,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const trendColorClass =
    trendColor === "red"
      ? "text-rose-500 dark:text-rose-400"
      : trendColor === "blue"
      ? "text-blue-600 dark:text-blue-400"
      : "text-emerald-600 dark:text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <BorderGlow
        borderRadius={20}
        glowRadius={36}
        glowIntensity={1.2}
        edgeSensitivity={32}
        coneSpread={28}
        glowColor="217 91 60"
        colors={["#3b82f6", "#60a5fa", "#38bdf8"]}
        backgroundColor="var(--color-card, #ffffff)"
        className="h-full"
      >
        <div className="p-5 sm:p-6 h-full flex flex-col justify-between group relative overflow-hidden">
          {/* Subtle Background Radial Glow on Hover */}
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 blur-2xl pointer-events-none transition-all duration-500" />

          <div>
        {/* Header Row: Title */}
        <div className="flex items-center justify-between gap-2 pb-2">
          <span className="text-sm font-semibold text-muted-foreground truncate">
            {label}
          </span>
        </div>

        {/* Value + Trend Metric Row */}
        <div className="flex items-baseline gap-2 pt-1">
          <div className="flex items-baseline">
            {prefix && (
              <span className="text-2xl sm:text-3xl font-extrabold text-heading tracking-tight mr-0.5">
                {prefix}
              </span>
            )}
            <span className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight">
              {displayValue.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-xl sm:text-2xl font-bold text-heading ml-1 opacity-90">
                {suffix}
              </span>
            )}
          </div>

          {trendText && (
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className={`text-xs sm:text-sm font-bold ${trendColorClass} inline-flex items-center shrink-0`}
            >
              {trendText}
            </motion.span>
          )}
        </div>
      </div>

      {/* Visual Analytics Bottom Section with Animated Sparklines */}
      <div className="pt-4">
        {/* Variant 1: Conversion Rate & Shimmer Progress Bar */}
        {variant === "progress" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">{sublabel}</span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-emerald-600 dark:text-emerald-400 font-bold"
              >
                {subvalue}
              </motion.span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-100/80 dark:bg-blue-950/50 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-blue-600 dark:bg-blue-500 relative overflow-hidden shadow-xs"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Continuous Shimmer Light Reflection Sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* Variant 2: Smooth Continuous Wave Spline with Glowing Nodes */}
        {variant === "wave" && (
          <div className="w-full overflow-hidden pt-1">
            <svg
              viewBox="0 0 240 50"
              className="w-full h-12 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="statWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Animated Area Fill */}
              <motion.path
                d="M 0,38 Q 20,36 35,32 T 70,22 T 105,34 T 135,10 T 165,30 T 195,16 T 220,24 T 240,14 L 240,50 L 0,50 Z"
                fill="url(#statWaveGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              {/* Animated Wave Stroke Line */}
              <motion.path
                d="M 0,38 Q 20,36 35,32 T 70,22 T 105,34 T 135,10 T 165,30 T 195,16 T 220,24 T 240,14"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(37,99,235,0.35))",
                }}
              />
              {/* Pulsing Beacon Circles at Wave Peaks */}
              <g transform="translate(135, 10)">
                <circle r="2.5" fill="#2563eb" />
                <motion.circle
                  r="5.5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                />
              </g>
              <g transform="translate(240, 14)">
                <circle r="2.5" fill="#2563eb" />
                <motion.circle
                  r="5.5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    delay: 0.9,
                    ease: "easeOut",
                  }}
                />
              </g>
            </svg>
          </div>
        )}

        {/* Variant 3: Dual-Line Comparative Trend Chart with Path Draw-in */}
        {variant === "dual-line" && (
          <div className="w-full overflow-hidden pt-1">
            <svg
              viewBox="0 0 240 50"
              className="w-full h-12 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Dashed Baseline with Animated Path */}
              <motion.path
                d="M 0,26 Q 25,36 50,28 T 100,32 T 145,28 T 190,34 T 240,30"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.75"
                strokeDasharray="4 3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Solid Blue Line with Animated Path */}
              <motion.path
                d="M 0,34 Q 25,38 45,30 T 80,36 T 115,16 T 145,38 T 175,26 T 205,42 T 240,24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.15 }}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(37,99,235,0.35))",
                }}
              />
              {/* Active Terminal Beacon */}
              <g transform="translate(240, 24)">
                <circle r="2.5" fill="#2563eb" />
                <motion.circle
                  r="5.5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                />
              </g>
            </svg>
          </div>
        )}

        {/* Variant 4: Mini Vertical Bar Histogram with Rhythmic Equalizer Bounce */}
        {variant === "histogram" && (
          <div className="w-full h-12 flex items-end justify-between gap-1 pt-1">
            {HISTOGRAM_BARS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-blue-600 dark:bg-blue-500 rounded-t-xs hover:bg-blue-400 transition-colors cursor-pointer"
                initial={{ height: 0 }}
                animate={{
                  height: [
                    `${h * 0.88}%`,
                    `${h}%`,
                    `${h * 0.94}%`,
                    `${h}%`,
                  ],
                }}
                transition={{
                  height: {
                    duration: 2.2 + (i % 6) * 0.35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.03,
                  },
                }}
                whileHover={{ scaleY: 1.2, originY: 1 }}
                title={`Batch Volume: ${h}%`}
              />
            ))}
          </div>
        )}

        {/* Brief Academic Context Description */}
        {description && (
          <p className="text-[11px] text-muted-foreground mt-3 pt-2.5 border-t border-border/50 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      </div>
      </BorderGlow>
    </motion.div>
  );
}
