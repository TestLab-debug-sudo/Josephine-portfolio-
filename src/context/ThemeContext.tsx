"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PRESET_THEMES, DEFAULT_THEME_ID } from "@/config/themes";
import { ThemePalette, PresetTheme } from "@/types";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  activeThemeId: string;
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  customPalette: Partial<ThemePalette> | null;
  presets: PresetTheme[];
  currentTheme: PresetTheme;
  setThemeId: (id: string) => void;
  setMode: (mode: ThemeMode) => void;
  setCustomToken: (token: keyof ThemePalette, value: string) => void;
  resetCustomPalette: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [mode, setMode] = useState<ThemeMode>("light");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");
  const [customPalette, setCustomPalette] = useState<Partial<ThemePalette> | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedThemeId = localStorage.getItem("academic_theme_id");
      const savedMode = localStorage.getItem("academic_theme_mode") as ThemeMode | null;
      const savedCustom = localStorage.getItem("academic_theme_custom");

      // Default to warm-ivory-emerald or migrate previous default
      if (savedThemeId && PRESET_THEMES.some((t) => t.id === savedThemeId) && savedThemeId !== "oxford-navy" && savedThemeId !== "olive-terracotta") {
        setActiveThemeId(savedThemeId);
      } else {
        setActiveThemeId("warm-ivory-emerald");
        localStorage.setItem("academic_theme_id", "warm-ivory-emerald");
      }

      if (savedMode && ["light", "dark", "system"].includes(savedMode)) {
        setMode(savedMode);
      }
      if (savedCustom) {
        setCustomPalette(JSON.parse(savedCustom));
      }
    } catch {
      // Ignore localStorage read errors
    }
    setMounted(true);
  }, []);

  // Handle system color scheme detection
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const determineResolved = () => {
      if (mode === "system") {
        return mediaQuery.matches ? "dark" : "light";
      }
      return mode;
    };

    const updateResolved = () => {
      const res = determineResolved();
      setResolvedMode(res);
    };

    updateResolved();
    mediaQuery.addEventListener("change", updateResolved);
    return () => mediaQuery.removeEventListener("change", updateResolved);
  }, [mode, mounted]);

  // Apply CSS variables to root and document element
  useEffect(() => {
    if (!mounted) return;

    const currentPreset =
      PRESET_THEMES.find((t) => t.id === activeThemeId) || PRESET_THEMES[0];
    const basePalette =
      resolvedMode === "dark" ? currentPreset.dark : currentPreset.light;

    const effectivePalette: ThemePalette = {
      ...basePalette,
      ...(customPalette || {}),
    };

    const root = document.documentElement;

    // Toggle dark class for tailwind
    if (resolvedMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Set standard 6 CSS variables
    root.style.setProperty("--color-primary", effectivePalette.primary);
    root.style.setProperty("--color-secondary", effectivePalette.secondary);
    root.style.setProperty("--color-accent", effectivePalette.accent);
    root.style.setProperty("--color-button", effectivePalette.button);
    root.style.setProperty("--color-heading", effectivePalette.heading);
    root.style.setProperty("--color-background", effectivePalette.background);

    // Calibrated contrast variables for optimal readability and depth
    if (resolvedMode === "dark") {
      if (activeThemeId === "warm-ivory-emerald") {
        root.style.setProperty("--color-card", "#131e18");
        root.style.setProperty("--color-card-foreground", "#faf6ee");
        root.style.setProperty("--color-border", "rgba(52, 211, 153, 0.16)");
        root.style.setProperty("--color-muted", "#192720");
        root.style.setProperty("--color-muted-foreground", "#9db5a7");
      } else if (activeThemeId === "olive-terracotta") {
        root.style.setProperty("--color-card", "#221d1a");
        root.style.setProperty("--color-card-foreground", "#f8f3ec");
        root.style.setProperty("--color-border", "rgba(225, 147, 125, 0.18)");
        root.style.setProperty("--color-muted", "#2d2622");
        root.style.setProperty("--color-muted-foreground", "#c2b4aa");
      } else {
        root.style.setProperty("--color-card", "#111827");
        root.style.setProperty("--color-card-foreground", "#f8fafc");
        root.style.setProperty("--color-border", "rgba(255, 255, 255, 0.10)");
        root.style.setProperty("--color-muted", "#1e293b");
        root.style.setProperty("--color-muted-foreground", "#94a3b8");
      }
    } else {
      if (activeThemeId === "warm-ivory-emerald") {
        root.style.setProperty("--color-card", "#ffffff");
        root.style.setProperty("--color-card-foreground", "#1c2b22");
        root.style.setProperty("--color-border", "#ebe4d8");
        root.style.setProperty("--color-muted", "#f2ebe0");
        root.style.setProperty("--color-muted-foreground", "#5c6b60");
      } else if (activeThemeId === "olive-terracotta") {
        root.style.setProperty("--color-card", "#ffffff");
        root.style.setProperty("--color-card-foreground", "#433128");
        root.style.setProperty("--color-border", "#e8ded3");
        root.style.setProperty("--color-muted", "#f0e7dc");
        root.style.setProperty("--color-muted-foreground", "#7d6a5e");
      } else {
        root.style.setProperty("--color-card", "#ffffff");
        root.style.setProperty("--color-card-foreground", "#0f172a");
        root.style.setProperty("--color-border", "#e2e8f0");
        root.style.setProperty("--color-muted", "#f1f5f9");
        root.style.setProperty("--color-muted-foreground", "#64748b");
      }
    }
  }, [activeThemeId, resolvedMode, customPalette, mounted]);

  const handleSetThemeId = (id: string) => {
    setActiveThemeId(id);
    try {
      localStorage.setItem("academic_theme_id", id);
    } catch {}
  };

  const handleSetMode = (m: ThemeMode) => {
    setMode(m);
    try {
      localStorage.setItem("academic_theme_mode", m);
    } catch {}
  };

  const handleSetCustomToken = (token: keyof ThemePalette, value: string) => {
    setCustomPalette((prev) => {
      const updated = { ...(prev || {}), [token]: value };
      try {
        localStorage.setItem("academic_theme_custom", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleResetCustomPalette = () => {
    setCustomPalette(null);
    try {
      localStorage.removeItem("academic_theme_custom");
    } catch {}
  };

  const currentTheme =
    PRESET_THEMES.find((t) => t.id === activeThemeId) || PRESET_THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        mode,
        resolvedMode,
        customPalette,
        presets: PRESET_THEMES,
        currentTheme,
        setThemeId: handleSetThemeId,
        setMode: handleSetMode,
        setCustomToken: handleSetCustomToken,
        resetCustomPalette: handleResetCustomPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
