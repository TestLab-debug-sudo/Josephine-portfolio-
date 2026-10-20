"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Gauge,
  FileSpreadsheet,
  Terminal,
  Activity,
  BarChart3,
  Award,
  Sparkles,
  RotateCw,
  Radio,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

type ViewMode = "radial" | "radar" | "spectrum";
type FilterType = "all" | "Proficient" | "Intermediate";

interface SkillItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  proficiency: "Proficient" | "Intermediate";
  percent: number;
  badge: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
  application: string;
  toolboxes: string[];
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: "matlab",
    name: "MATLAB",
    shortName: "MATLAB",
    category: "Simulation & Medical Imaging",
    proficiency: "Proficient",
    percent: 96,
    badge: "MathWorks Chapter Lead",
    gradient: "linear-gradient(135deg, #0076a8 0%, #00b4d8 50%, #90e0ef 100%)",
    glowColor: "rgba(0, 180, 216, 0.45)",
    accentColor: "#00b4d8",
    application:
      "Medical Image Processing, Control Systems Toolbox, Simulink Modeling & Advisor to MATLAB Student Chapter",
    toolboxes: ["Image Processing Toolbox", "Simulink", "Control System", "Signal Processing"],
  },
  {
    id: "labview",
    name: "LabVIEW (CLAD Certified)",
    shortName: "LabVIEW",
    category: "Instrumentation & DAQ",
    proficiency: "Proficient",
    percent: 92,
    badge: "CLAD Certified Developer",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #f97316 100%)",
    glowColor: "rgba(245, 158, 11, 0.45)",
    accentColor: "#f59e0b",
    application:
      "Certified LabVIEW Associate Developer (CLAD), Virtual Instrumentation, Sensor Interfacing & Real-Time Data Acquisition",
    toolboxes: ["NI-DAQmx", "Virtual Instruments", "Hardware Interfacing", "FPGA / Real-Time"],
  },
  {
    id: "msoffice",
    name: "MS Office",
    shortName: "MS Office",
    category: "Technical Documentation",
    proficiency: "Proficient",
    percent: 94,
    badge: "Best Manual Awards",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
    glowColor: "rgba(16, 185, 129, 0.45)",
    accentColor: "#10b981",
    application:
      "High-Impact Research Manuscripts, Course Plan Manuals (Best Manual Awards), and Institutional Accreditation Reports",
    toolboxes: ["Advanced Analytics", "Research Publishing", "Symposium Slides", "Data Spreadsheets"],
  },
  {
    id: "python",
    name: "Python",
    shortName: "Python",
    category: "Machine Learning & AI",
    proficiency: "Intermediate",
    percent: 82,
    badge: "AI / ML Pipelines",
    gradient: "linear-gradient(135deg, #0284c7 0%, #3b82f6 50%, #6366f1 100%)",
    glowColor: "rgba(59, 130, 246, 0.45)",
    accentColor: "#3b82f6",
    application:
      "Pattern Classification, Scikit-Learn Models, Deep Learning Pipelines for Diabetic Foot & Thermogram Analysis",
    toolboxes: ["Scikit-Learn", "TensorFlow / Keras", "NumPy & Pandas", "OpenCV Imaging"],
  },
  {
    id: "c-lang",
    name: "C Language",
    shortName: "C Language",
    category: "Embedded & Programming",
    proficiency: "Intermediate",
    percent: 80,
    badge: "Nanochip Curriculum Lead",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #ec4899 100%)",
    glowColor: "rgba(139, 92, 246, 0.45)",
    accentColor: "#8b5cf6",
    application:
      "Microcontroller Firmware, Embedded C, Industry Curriculum Design with Nanochip Solutions Bangalore",
    toolboxes: ["Embedded C Firmware", "Microcontrollers", "Hardware Registers", "Low-Level Drivers"],
  },
  {
    id: "spss",
    name: "SPSS for Statistical Analysis",
    shortName: "SPSS",
    category: "Statistical & Clinical",
    proficiency: "Intermediate",
    percent: 76,
    badge: "Clinical Biostatistics",
    gradient: "linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)",
    glowColor: "rgba(244, 63, 94, 0.45)",
    accentColor: "#f43f5e",
    application:
      "Biostatistical Evaluation, Multivariate Analysis, Logistic Regression & Clinical Diagnostics Validation",
    toolboxes: ["Multivariate ANOVA", "Logistic Regression", "ROC Curves", "Diagnostic Power"],
  },
];

export function SoftwareSkillsGraph() {
  const [viewMode, setViewMode] = useState<ViewMode>("radial");
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeSkillId, setActiveSkillId] = useState<string>("labview");
  const [animationCycle, setAnimationCycle] = useState<number>(0);

  const filteredSkills = SKILLS_DATA.filter((item) => {
    if (filter === "all") return true;
    return item.proficiency === filter;
  });

  const activeSkill =
    SKILLS_DATA.find((s) => s.id === activeSkillId) || SKILLS_DATA[0];

  const handleReplay = () => {
    setAnimationCycle((prev) => prev + 1);
  };

  const getSkillIcon = (id: string, className = "w-4 h-4") => {
    switch (id) {
      case "matlab":
        return <Cpu className={className} />;
      case "labview":
        return <Gauge className={className} />;
      case "msoffice":
        return <FileSpreadsheet className={className} />;
      case "python":
        return <Terminal className={className} />;
      case "c-lang":
        return <Activity className={className} />;
      case "spss":
        return <BarChart3 className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  // Radar geometry for 6 axes
  const radarCenter = { x: 160, y: 160 };
  const radarRadius = 105;
  const numAxes = SKILLS_DATA.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = index * ((2 * Math.PI) / numAxes) - Math.PI / 2;
    const r = radarRadius * valueRatio;
    return {
      x: radarCenter.x + r * Math.cos(angle),
      y: radarCenter.y + r * Math.sin(angle),
    };
  };

  const radarPoints = SKILLS_DATA.map((skill, i) => {
    const pt = getCoordinates(i, skill.percent / 100);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  return (
    <div className="rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden bg-background border border-border/80 shadow-xs">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-700 opacity-20"
        style={{ background: activeSkill.accentColor }}
      />

      {/* Top Header with Proper Responsive Alignment */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-all duration-300 shrink-0"
            style={{ background: activeSkill.gradient }}
          >
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-heading tracking-tight">
              Software Skills &amp; Engineering Environments
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Simulation, Virtual DAQ, Embedded Firmware &amp; Statistical Analytics
            </p>
          </div>
        </div>

        {/* View Switcher Controls (No squishing, ample room) */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <div className="p-1.5 rounded-2xl bg-muted/70 border border-border flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode("radial")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "radial"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-heading"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Telemetry Cards</span>
            </button>

            <button
              onClick={() => setViewMode("radar")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "radar"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-heading"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Radar Matrix</span>
            </button>

            <button
              onClick={() => setViewMode("spectrum")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "spectrum"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-heading"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Spectrum EQ</span>
            </button>
          </div>

          <button
            onClick={handleReplay}
            title="Replay Visual Telemetry Animation"
            className="p-2.5 rounded-2xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-heading hover:border-primary/40 transition-all shadow-xs"
            aria-label="Replay animation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Chips Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              filter === "all"
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-muted/50 border-border/70 text-muted-foreground hover:text-heading hover:bg-muted"
            }`}
          >
            All Tools ({SKILLS_DATA.length})
          </button>
          <button
            onClick={() => setFilter("Proficient")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              filter === "Proficient"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-muted/50 border-border/70 text-muted-foreground hover:text-heading hover:bg-muted"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Proficient (3)</span>
          </button>
          <button
            onClick={() => setFilter("Intermediate")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              filter === "Intermediate"
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-muted/50 border-border/70 text-muted-foreground hover:text-heading hover:bg-muted"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Intermediate (3)</span>
          </button>
        </div>

        <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Interactive Telemetry Engine</span>
        </div>
      </div>

      {/* VIEW 1: TELEMETRY GAUGES (Proper 3-Column Balanced Grid) */}
      {viewMode === "radial" && (
        <div key={`radial-${animationCycle}`} className="pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, idx) => {
                const isSelected = activeSkillId === skill.id;
                const radius = 22;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset =
                  circumference - (skill.percent / 100) * circumference;

                return (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    onClick={() => setActiveSkillId(skill.id)}
                    onMouseEnter={() => setActiveSkillId(skill.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                      isSelected
                        ? "bg-muted/60 border-primary ring-2 ring-primary/20 shadow-sm"
                        : "bg-muted/30 border-border/75 hover:border-primary/40 hover:bg-muted/50 shadow-xs"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Dial + Name + Badges */}
                      <div className="flex items-center gap-3">
                        {/* Circular SVG Radial Gauge */}
                        <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 54 54">
                            <circle
                              cx="27"
                              cy="27"
                              r={radius}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="text-muted/60"
                            />
                            <motion.circle
                              cx="27"
                              cy="27"
                              r={radius}
                              fill="none"
                              stroke={skill.accentColor}
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              animate={{ strokeDashoffset }}
                              transition={{
                                duration: 0.9,
                                delay: idx * 0.08,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                filter: `drop-shadow(0 0 5px ${skill.glowColor})`,
                              }}
                            />
                          </svg>
                          <span className="absolute font-mono text-[11px] font-black text-heading">
                            {skill.percent}%
                          </span>
                        </div>

                        {/* Title, Badge & Proficiency */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <h4 className="text-sm font-bold text-heading truncate">
                              {skill.name}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                                skill.proficiency === "Proficient"
                                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25"
                                  : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25"
                              }`}
                            >
                              {skill.proficiency}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border truncate"
                              style={{
                                color: skill.accentColor,
                                borderColor: `${skill.accentColor}40`,
                                background: `${skill.accentColor}12`,
                              }}
                            >
                              <Award className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{skill.badge}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Glowing Luminous Progress Track */}
                      <div className="relative h-2 w-full bg-muted/80 rounded-full overflow-hidden p-[1px] border border-border/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percent}%` }}
                          transition={{
                            duration: 0.9,
                            delay: idx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="h-full rounded-full relative"
                          style={{
                            background: skill.gradient,
                            boxShadow: `0 0 10px ${skill.glowColor}`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
                        </motion.div>
                      </div>

                      {/* Application Context */}
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {skill.application}
                      </p>
                    </div>

                    {/* Active / Inspect status indicator at bottom of card */}
                    <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-border/40 text-[10px] font-mono text-muted-foreground">
                      <span className="truncate flex items-center gap-1.5">
                        {isSelected ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                            <span className="text-primary font-bold">Active in Console</span>
                          </>
                        ) : (
                          <span className="truncate">{skill.category}</span>
                        )}
                      </span>
                      <span className="text-primary group-hover:translate-x-0.5 transition-transform font-bold shrink-0 ml-1">
                        {isSelected ? "Inspected" : "Inspect →"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* VIEW 2: HEXAGONAL RADAR MATRIX (Proper 2-Column Balanced Alignment) */}
      {viewMode === "radar" && (
        <div key={`radar-${animationCycle}`} className="pt-1">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Radar Chart (Center Column) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                <svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  className="overflow-visible"
                >
                  <defs>
                    <radialGradient id="radarSweepGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={activeSkill.accentColor} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={activeSkill.accentColor} stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="polyGradFull" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.55" />
                    </linearGradient>
                  </defs>

                  {/* Ambient Glow */}
                  <circle
                    cx={radarCenter.x}
                    cy={radarCenter.y}
                    r={radarRadius}
                    fill="url(#radarSweepGlow)"
                  />

                  {/* Concentric rings */}
                  {[0.25, 0.5, 0.75, 1.0].map((level) => {
                    const pts = SKILLS_DATA.map((_, i) => {
                      const pt = getCoordinates(i, level);
                      return `${pt.x},${pt.y}`;
                    }).join(" ");
                    return (
                      <polygon
                        key={`ring-${level}`}
                        points={pts}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-border/70"
                      />
                    );
                  })}

                  {/* Spokes */}
                  {SKILLS_DATA.map((_, i) => {
                    const pt = getCoordinates(i, 1.0);
                    return (
                      <line
                        key={`spoke-${i}`}
                        x1={radarCenter.x}
                        y1={radarCenter.y}
                        x2={pt.x}
                        y2={pt.y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-border/50"
                        strokeDasharray="2,2"
                      />
                    );
                  })}

                  {/* Animated Polygon Area */}
                  <motion.polygon
                    points={radarPoints}
                    fill="url(#polyGradFull)"
                    stroke={activeSkill.accentColor}
                    strokeWidth="2.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      filter: `drop-shadow(0 0 12px ${activeSkill.glowColor})`,
                      transformOrigin: `${radarCenter.x}px ${radarCenter.y}px`,
                    }}
                  />

                  {/* Rotating Scientific Radar Scanner Sweep */}
                  <motion.line
                    x1={radarCenter.x}
                    y1={radarCenter.y}
                    x2={radarCenter.x + radarRadius}
                    y2={radarCenter.y}
                    stroke={activeSkill.accentColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: `${radarCenter.x}px ${radarCenter.y}px`,
                      filter: `drop-shadow(0 0 8px ${activeSkill.glowColor})`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                  />

                  {/* Vertices */}
                  {SKILLS_DATA.map((skill, i) => {
                    const pt = getCoordinates(i, skill.percent / 100);
                    const labelPt = getCoordinates(i, 1.25);
                    const isSelected = activeSkillId === skill.id;

                    return (
                      <g
                        key={`radar-node-${skill.id}`}
                        className="cursor-pointer"
                        onClick={() => setActiveSkillId(skill.id)}
                        onMouseEnter={() => setActiveSkillId(skill.id)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 6 : 4}
                          fill={skill.accentColor}
                          stroke="#ffffff"
                          strokeWidth="2"
                          style={{
                            filter: isSelected
                              ? `drop-shadow(0 0 8px ${skill.accentColor})`
                              : "none",
                          }}
                        />
                        <text
                          x={labelPt.x}
                          y={labelPt.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={`text-[11px] font-bold transition-all ${
                            isSelected
                              ? "fill-primary font-black scale-105"
                              : "fill-muted-foreground"
                          }`}
                        >
                          {skill.shortName}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Radar Coordinates Breakdown Table */}
            <div className="lg:col-span-6 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3">
                <Radio className="w-3.5 h-3.5 text-primary" />
                <span>Polar Telemetry Coordinate Spectrum</span>
              </h4>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {SKILLS_DATA.map((s) => {
                  const isSelected = activeSkillId === s.id;
                  return (
                    <div
                      key={`radar-list-${s.id}`}
                      onClick={() => setActiveSkillId(s.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-muted/60 border-primary ring-2 ring-primary/20 shadow-xs"
                          : "bg-muted/30 border-border/70 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: s.accentColor }}
                        />
                        <span className="font-bold text-heading truncate">
                          {s.shortName}
                        </span>
                      </div>
                      <span className="font-mono font-black text-heading ml-1">
                        {s.percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: SPECTRUM EQ COLUMNS */}
      {viewMode === "spectrum" && (
        <div key={`spectrum-${animationCycle}`} className="pt-1">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/80 shadow-xs">
            <div className="relative h-64 sm:h-72 w-full flex items-end justify-around gap-2 sm:gap-6 pt-8 pb-3">
              {/* Reference Grid lines */}
              <div className="absolute inset-x-0 top-0 border-b border-border/40 text-[10px] font-mono text-muted-foreground flex justify-between">
                <span>100%</span>
                <span className="uppercase font-bold">Research Mastery</span>
              </div>
              <div className="absolute inset-x-0 top-1/4 border-b border-border/30 text-[10px] font-mono text-muted-foreground flex justify-between">
                <span>75%</span>
                <span className="uppercase text-muted-foreground/60">Advanced Engineering</span>
              </div>
              <div className="absolute inset-x-0 top-2/4 border-b border-border/30 text-[10px] font-mono text-muted-foreground flex justify-between">
                <span>50%</span>
                <span className="uppercase text-muted-foreground/60">Applied Systems</span>
              </div>
              <div className="absolute inset-x-0 top-3/4 border-b border-border/30 text-[10px] font-mono text-muted-foreground flex justify-between">
                <span>25%</span>
                <span className="uppercase text-muted-foreground/60">Foundational</span>
              </div>

              {/* Columns */}
              {filteredSkills.map((skill, idx) => {
                const isSelected = activeSkillId === skill.id;

                return (
                  <div
                    key={`col-${skill.id}`}
                    onClick={() => setActiveSkillId(skill.id)}
                    onMouseEnter={() => setActiveSkillId(skill.id)}
                    className="flex-1 max-w-[80px] h-full flex flex-col justify-end items-center relative cursor-pointer z-10 group"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.08 }}
                      className="text-xs font-mono font-black text-heading mb-1.5"
                    >
                      {skill.percent}%
                    </motion.span>

                    <div className="w-full h-full flex items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: [
                            `${skill.percent * 0.94}%`,
                            `${skill.percent}%`,
                            `${skill.percent * 0.96}%`,
                            `${skill.percent}%`,
                          ],
                        }}
                        transition={{
                          height: {
                            duration: 2.8 + idx * 0.35,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          },
                        }}
                        className={`w-full max-w-[50px] rounded-t-xl relative group-hover:scale-105 transition-all ${
                          isSelected
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : ""
                        }`}
                        style={{
                          background: skill.gradient,
                          boxShadow: isSelected
                            ? `0 0 16px ${skill.glowColor}`
                            : `0 0 8px ${skill.glowColor}`,
                        }}
                      >
                        <div className="absolute inset-x-0 top-0 h-2 bg-white/40 rounded-t-xl" />
                      </motion.div>
                    </div>

                    <span
                      className={`text-xs font-bold mt-2 truncate w-full text-center transition-colors ${
                        isSelected ? "text-primary font-black" : "text-heading"
                      }`}
                    >
                      {skill.shortName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LIVE INSTRUMENT TELEMETRY INSPECTOR CONSOLE (Full-Width Responsive Bar) */}
      <div className="p-5 rounded-2xl bg-muted/60 border border-border/80 space-y-3 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none -z-10 opacity-30"
          style={{ background: activeSkill.accentColor }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl text-white shadow-xs shrink-0"
              style={{ background: activeSkill.gradient }}
            >
              {getSkillIcon(activeSkill.id, "w-5 h-5")}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Inspected Environment Console
              </span>
              <h4 className="text-base font-bold text-heading">
                {activeSkill.name} • {activeSkill.category}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-heading px-2.5 py-1 rounded-lg bg-background border border-border shadow-xs">
              {activeSkill.percent}% Mastery Level
            </span>
            <span
              className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg text-white shadow-xs"
              style={{ background: activeSkill.accentColor }}
            >
              {activeSkill.badge}
            </span>
          </div>
        </div>

        {/* Practical Research Application Context */}
        <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed font-normal flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>{activeSkill.application}</span>
        </p>

        {/* Core Toolboxes / Module Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-muted-foreground font-semibold uppercase mr-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-accent" /> Key Modules:
          </span>
          {activeSkill.toolboxes.map((tb) => (
            <span
              key={tb}
              className="px-2.5 py-1 rounded-lg bg-background border border-border/70 text-[11px] font-semibold text-heading shadow-xs"
            >
              {tb}
            </span>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>National Instruments Certified (CLAD) • MathWorks Student Chapter Lead</span>
        </span>
        <span className="font-mono text-[11px]">
          6 Core Environments Documented
        </span>
      </div>
    </div>
  );
}
