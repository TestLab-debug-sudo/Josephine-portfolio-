import { PresetTheme } from "@/types";

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: "warm-ivory-emerald",
    name: "Warm Ivory & Emerald",
    description: "Scholarly Warm Ivory (#faf6ee) canvas, distinguished Emerald Green (#0d6e48), vibrant Vermilion (#e24329), and deep Forest/Espresso typography.",
    light: {
      primary: "#0d6e48", // Emerald green
      secondary: "#e24329", // Vermilion
      accent: "#e24329", // Vermilion
      button: "#0d6e48", // Emerald button
      heading: "#132b20", // Deep forest emerald black
      background: "#faf6ee", // Warm ivory
    },
    dark: {
      primary: "#34d399", // Luminous emerald
      secondary: "#ff6b57", // Radiant vermilion
      accent: "#ff6b57", // Vermilion
      button: "#0d7a51", // Emerald button
      heading: "#faf6ee", // Warm ivory crisp text
      background: "#0c1410", // Deep midnight emerald
    },
  },
  {
    id: "olive-terracotta",
    name: "Olive & Terra Cotta",
    description: "Serene academic Olive (#8e9867), vibrant Terra Cotta (#e1937d), Warm Beige (#f8f3ec), and rich Acorn Brown (#8d6959).",
    light: {
      primary: "#8e9867", // Olive
      secondary: "#e1937d", // Terra cotta
      accent: "#e1937d", // Terra cotta
      button: "#8d6959", // Acorn brown
      heading: "#4a352a", // Deep Acorn brown
      background: "#f8f3ec", // Warm beige
    },
    dark: {
      primary: "#a8b380", // Luminous soft olive
      secondary: "#e8a491", // Soft terracotta
      accent: "#e1937d", // Terra cotta glow
      button: "#8d6959", // Acorn brown
      heading: "#f8f3ec", // Warm beige crisp text
      background: "#181412", // Deep roasted acorn midnight
    },
  },
  {
    id: "oxford-navy",
    name: "Oxford Navy",
    description: "Prestigious collegiate navy, pristine alabaster canvas, and refined academic gold.",
    light: {
      primary: "#1e3a8a", // deep navy (4.5:1+ contrast)
      secondary: "#2563eb", // vibrant royal blue
      accent: "#b45309", // warm amber gold
      button: "#1e40af", // bold navy button
      heading: "#0f172a", // deep slate 900
      background: "#f8fafc", // clean crisp slate 50
    },
    dark: {
      primary: "#60a5fa", // accessible soft sky
      secondary: "#93c5fd", // light blue
      accent: "#f59e0b", // vibrant amber
      button: "#2563eb", // vivid royal button
      heading: "#f8fafc", // pristine white
      background: "#090d16", // deep midnight carbon
    },
  },
  {
    id: "cambridge-teal",
    name: "Cambridge Slate",
    description: "Serene academic teal, balanced slate, and burnished bronze accents.",
    light: {
      primary: "#0f766e", // deep teal
      secondary: "#0284c7", // scientific sky blue
      accent: "#c2410c", // terracotta bronze
      button: "#0f766e", // teal button
      heading: "#0f172a", // deep slate heading for perfect contrast
      background: "#f8fafc", // neutral white canvas
    },
    dark: {
      primary: "#2dd4bf", // luminous teal
      secondary: "#38bdf8", // scientific blue
      accent: "#fb923c", // glowing amber
      button: "#0d9488", // balanced teal
      heading: "#f8fafc", // white
      background: "#0a101d", // refined dark slate
    },
  },
  {
    id: "ivy-emerald",
    name: "Ivy Scholar",
    description: "Traditional ivy-league pine, clean architectural canvas, and scholarly brass.",
    light: {
      primary: "#15803d", // rich pine emerald
      secondary: "#0d9488", // balanced teal
      accent: "#b45309", // warm brass
      button: "#166534", // emerald button
      heading: "#0f172a", // deep slate heading
      background: "#fbfbfa", // warm ivory paper (neutral, clean)
    },
    dark: {
      primary: "#4ade80", // luminous emerald
      secondary: "#2dd4bf", // soft teal
      accent: "#fbbf24", // bright brass
      button: "#16a34a", // vibrant green
      heading: "#f8fafc", // pale ivory
      background: "#0b1219", // sleek dark pine-charcoal
    },
  },
  {
    id: "bordeaux-scholar",
    name: "Bordeaux Heritage",
    description: "Distinguished burgundy claret, deep slate contrast, and champagne highlights.",
    light: {
      primary: "#881337", // deep burgundy claret
      secondary: "#be123c", // crimson accent
      accent: "#b45309", // champagne gold
      button: "#9f1239", // rose claret button
      heading: "#0f172a", // deep contrast heading (not pinkish!)
      background: "#fafafa", // pure neutral off-white
    },
    dark: {
      primary: "#fb7185", // bright rose claret
      secondary: "#f43f5e", // crimson glow
      accent: "#fcd34d", // champagne gold
      button: "#e11d48", // wine button
      heading: "#f8fafc", // crisp white
      background: "#0e0f17", // deep slate carbon
    },
  },
  {
    id: "geneva-slate",
    name: "Geneva Modernist",
    description: "Clean Swiss laboratory aesthetic with graphite, pure titanium, and cobalt.",
    light: {
      primary: "#2563eb", // cobalt blue
      secondary: "#475569", // slate
      accent: "#ea580c", // engineering amber
      button: "#1e293b", // dark slate button
      heading: "#0f172a", // solid charcoal
      background: "#f8fafc", // crisp laboratory white
    },
    dark: {
      primary: "#60a5fa", // scientific blue
      secondary: "#94a3b8", // titanium silver
      accent: "#fb923c", // amber
      button: "#334155", // titanium button
      heading: "#f8fafc", // clean white
      background: "#0a0e17", // deep titanium carbon
    },
  },
  {
    id: "nordic-onyx",
    name: "Nordic Obsidian",
    description: "High-contrast monochromatic darkroom with cyan lasers.",
    light: {
      primary: "#0f172a", // ink slate
      secondary: "#0284c7", // electric cyan
      accent: "#6366f1", // indigo accent
      button: "#0f172a", // ink button
      heading: "#020617", // rich jet black
      background: "#ffffff", // pure paper white
    },
    dark: {
      primary: "#f1f5f9", // platinum
      secondary: "#38bdf8", // laser cyan
      accent: "#818cf8", // soft indigo
      button: "#334155", // slate button
      heading: "#ffffff", // bright white
      background: "#05070c", // pure obsidian
    },
  },
];

export const DEFAULT_THEME_ID = "warm-ivory-emerald";
