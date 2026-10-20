"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Palette, Sun, Moon, Monitor, RotateCcw, Check, Sparkles } from "lucide-react";
import { ThemePalette } from "@/types";

export function ThemeSwitcher() {
  const {
    activeThemeId,
    mode,
    resolvedMode,
    presets,
    customPalette,
    setThemeId,
    setMode,
    setCustomToken,
    resetCustomPalette,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const currentPreset = presets.find((p) => p.id === activeThemeId) || presets[0];
  const activePalette = resolvedMode === "dark" ? currentPreset.dark : currentPreset.light;
  const effectivePalette = { ...activePalette, ...(customPalette || {}) };

  const tokens: (keyof ThemePalette)[] = [
    "primary",
    "secondary",
    "accent",
    "button",
    "heading",
    "background",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 rounded-xl border border-border bg-card/80 hover:bg-muted text-card-foreground shadow-sm transition-all text-xs font-medium"
        title="Customize Theme & Appearance"
        aria-label="Theme Switcher"
      >
        <Palette className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">{currentPreset.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-card border border-border shadow-2xl z-50 animate-slide-up space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mode Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Display Appearance
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
              <button
                onClick={() => setMode("light")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === "light"
                    ? "bg-card text-heading shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button
                onClick={() => setMode("dark")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === "dark"
                    ? "bg-card text-heading shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
              <button
                onClick={() => setMode("system")}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === "system"
                    ? "bg-card text-heading shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Auto
              </button>
            </div>
          </div>

          {/* Preset Palettes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Academic Presets
              </span>
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> {showCustomizer ? "Hide Tokens" : "Edit Tokens"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => {
                const isSelected = preset.id === activeThemeId;
                const pColor = resolvedMode === "dark" ? preset.dark.primary : preset.light.primary;
                const aColor = resolvedMode === "dark" ? preset.dark.accent : preset.light.accent;

                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setThemeId(preset.id);
                      resetCustomPalette();
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all text-xs ${
                      isSelected
                        ? "border-primary bg-primary/5 font-semibold text-heading shadow-sm"
                        : "border-border hover:bg-muted text-muted-foreground hover:text-card-foreground"
                    }`}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white dark:border-black shadow-xs"
                        style={{ backgroundColor: pColor }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white dark:border-black shadow-xs"
                        style={{ backgroundColor: aColor }}
                      />
                    </div>
                    <span className="truncate">{preset.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-primary ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strict 6-Token Customizer */}
          {showCustomizer && (
            <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-2.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  6-Token Customizer
                </span>
                {customPalette && (
                  <button
                    onClick={resetCustomPalette}
                    className="text-[10px] text-muted-foreground hover:text-rose-500 flex items-center gap-1"
                  >
                    <RotateCcw className="w-2.5 h-2.5" /> Reset
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {tokens.map((token) => (
                  <div key={token} className="flex items-center justify-between gap-2">
                    <label className="text-[11px] capitalize text-card-foreground">
                      {token}
                    </label>
                    <input
                      type="color"
                      value={effectivePalette[token] || "#000000"}
                      onChange={(e) => setCustomToken(token, e.target.value)}
                      className="w-6 h-6 rounded-md border border-border cursor-pointer bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground hover:text-card-foreground font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
