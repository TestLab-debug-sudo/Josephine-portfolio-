"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function WelcomeLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { currentTheme, resolvedMode, customPalette } = useTheme();

  // Compute the current active theme palette
  const basePalette =
    resolvedMode === "dark" ? currentTheme.dark : currentTheme.light;
  const palette = {
    ...basePalette,
    ...(customPalette || {}),
  };

  useEffect(() => {
    // Check session storage so return visits in the same tab don't force delay,
    // while ensuring fresh tabs/visits experience the cinematic opening.
    const hasSeen = sessionStorage.getItem("hasSeenAcademicWelcome");
    if (hasSeen === "true") {
      setLoading(false);
      return;
    }

    // Lightning-fast snappy academic welcome reveal (~350ms)
    const startTime = Date.now();
    const duration = 350; // Ultra-fast 350ms load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("hasSeenAcademicWelcome", "true");
        }, 80);
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setProgress(100);
    setLoading(false);
    sessionStorage.setItem("hasSeenAcademicWelcome", "true");
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="academic-welcome-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: {
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between items-center select-none overflow-hidden px-6 py-10 sm:py-14 transition-colors duration-500"
          style={{
            backgroundColor: palette.background,
            color: palette.heading,
          }}
        >
          {/* Subtle Theme Blueprint Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(to right, ${palette.heading} 1px, transparent 1px), linear-gradient(to bottom, ${palette.heading} 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />

          {/* Ambient Theme Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 45%, ${palette.primary} 0%, transparent 65%)`,
            }}
          />
          <div
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{
              backgroundColor: palette.secondary,
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{
              backgroundColor: palette.primary,
            }}
          />

          {/* Top Brand / University Crest Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs text-[11px] font-mono tracking-widest uppercase backdrop-blur-md"
            style={{
              borderColor: `${palette.primary}40`,
              backgroundColor: `${palette.primary}15`,
              color: palette.primary,
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" style={{ color: palette.primary }} />
            <span className="font-semibold">Academic Portfolio</span>
          </motion.div>

          {/* Centered Editorial Welcome & Scholar Credentials Layout */}
          <div className="relative z-10 max-w-2xl w-full text-center space-y-6 sm:space-y-8 my-auto">
            {/* 1. WELCOME Heading in Theme Accent */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.25em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-bold tracking-[0.45em] uppercase"
              style={{ color: palette.accent }}
            >
              WELCOME
            </motion.div>

            {/* 2. Scholar Name in Theme Heading */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
                style={{ color: palette.heading }}
              >
                Dr. Josephine Selle Jeyanathan
              </motion.h1>
            </div>

            {/* 3. Editorial Accent Divider Line in Theme Gradient */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-20 sm:w-28 h-[2px] mx-auto rounded-full"
              style={{
                background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)`,
              }}
            />

            {/* 4. Designation & Institution Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-2 font-light"
            >
              <p
                className="text-sm sm:text-base md:text-lg font-bold tracking-wide"
                style={{ color: palette.heading }}
              >
                Associate Professor
              </p>
              <p
                className="text-xs sm:text-sm md:text-base font-normal opacity-75"
                style={{ color: palette.heading }}
              >
                Department of Electronics & Communication Engineering
              </p>
              <p
                className="text-[11px] sm:text-xs md:text-sm tracking-wider uppercase font-semibold pt-1"
                style={{ color: palette.primary }}
              >
                Kalasalingam Academy of Research and Education
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress & Quick Skip Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="relative z-10 w-full max-w-xs flex flex-col items-center gap-3"
          >
            {/* Elegant Minimalist Progress Bar with Site Theme Gradient */}
            <div
              className="w-full h-[3px] rounded-full overflow-hidden relative"
              style={{
                backgroundColor: `${palette.heading}18`,
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary}, ${palette.button})`,
                }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Progress Percentage Display */}
            <div
              className="flex items-center justify-between w-full text-[10px] sm:text-xs font-mono tracking-wider opacity-75"
              style={{ color: palette.heading }}
            >
              <span className="font-semibold">INITIALIZING</span>
              <span className="font-bold" style={{ color: palette.primary }}>
                {progress}%
              </span>
            </div>

            {/* Subtle Non-Intrusive Skip Button */}
            <button
              onClick={handleSkip}
              className="text-[10px] uppercase tracking-widest pt-1 font-medium transition-opacity opacity-60 hover:opacity-100"
              style={{ color: palette.heading }}
            >
              Skip Introduction →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
