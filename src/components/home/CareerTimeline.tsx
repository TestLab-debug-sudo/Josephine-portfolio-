"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Bookmark,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import FadeContent from "@/components/ui/FadeContent";
import { TimelineMilestone } from "@/types";

type TimelineFilter = "all" | "experience" | "education" | "fellowship";

// Concise labels for the 6-tile stepper grid
const STEPPER_LABELS: Record<string, { year: string; shortRole: string }> = {
  "time-be": { year: "2005", shortRole: "B.E. (Karunya)" },
  "time-me": { year: "2009", shortRole: "M.E. (Distinction)" },
  "time-jrf": { year: "2012", shortRole: "JRF (IGCAR)" },
  "time-asst-prof": { year: "2016", shortRole: "Asst. Professor" },
  "time-phd": { year: "2019", shortRole: "Ph.D. (Anna Univ)" },
  "time-assoc-prof": { year: "2022 – Now", shortRole: "Assoc. Professor & PI" },
};

// Enhanced metadata highlights for each milestone era
const ERA_METADATA: Record<
  string,
  {
    eraTitle: string;
    stageNumber: string;
    badgeColor: string;
    tags: string[];
    keyTakeaway: string;
  }
> = {
  "time-be": {
    eraTitle: "Undergraduate Foundations",
    stageNumber: "01",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    tags: ["Analog & Digital Systems", "Signals & Systems", "Microprocessors", "Comm Theory"],
    keyTakeaway: "Graduated First Class (75.00%) from Karunya University with core engineering acumen.",
  },
  "time-me": {
    eraTitle: "Postgraduate Specialization",
    stageNumber: "02",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    tags: ["Microwave Systems", "Active Imaging", "Wireless Networks", "Signal Processing"],
    keyTakeaway: "Awarded First Class with Distinction (80.70%) at National Engineering College.",
  },
  "time-jrf": {
    eraTitle: "National Research Fellowship",
    stageNumber: "03",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    tags: ["IGCAR Kalpakkam", "Thermal Imaging", "Pattern Recognition", "Medical Diagnostics"],
    keyTakeaway: "Funded project on AI-based Computer Aided Detection for Medical Non-destructive testing.",
  },
  "time-asst-prof": {
    eraTitle: "Faculty & Curriculum Pedagogy",
    stageNumber: "04",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    tags: ["Electromagnetic Waves", "Control Systems", "DSP Lab", "MathWorks", "Teaching Competency"],
    keyTakeaway: "6-year tenure pioneering industry-aligned engineering courses and student labs at KARE.",
  },
  "time-phd": {
    eraTitle: "Doctoral Dissertation Milestone",
    stageNumber: "05",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    tags: ["Anna University", "Breast Thermography", "Texture Features", "Machine Learning"],
    keyTakeaway: "Doctor of Philosophy awarded for breakthroughs in automated lateral thermogram ROI extraction.",
  },
  "time-assoc-prof": {
    eraTitle: "Senior Academic Leadership",
    stageNumber: "06",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    tags: ["DBT ₹74 Lakhs PI", "Diabetic Foot Ulcers", "IR Grading", "Doctoral Supervision"],
    keyTakeaway: "Serving as Associate Professor & Principal Investigator for DBT-funded clinical device R&D.",
  },
};

export function CareerTimeline() {
  const { timeline } = useData();
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    "time-assoc-prof": true, // Default open current flagship role
  });

  const extractStartYear = (yearStr: string): number => {
    const match = yearStr.match(/\b(19\d{2}|20\d{2})\b/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const filteredItems = timeline.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  // Always sorted chronologically starting from 2005 – 2009
  const sortedItems = [...filteredItems].sort((a, b) => {
    const yearA = extractStartYear(a.year);
    const yearB = extractStartYear(b.year);
    return yearA - yearB;
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToMilestone = (id: string) => {
    setActiveHighlightId(id);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "experience":
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case "fellowship":
        return <Flame className="w-4 h-4 text-amber-500" />;
      default:
        return <Calendar className="w-4 h-4 text-purple-500" />;
    }
  };

  const filterTabs: { id: TimelineFilter; label: string; count: number }[] = [
    { id: "all", label: "All Milestones", count: timeline.length },
    {
      id: "experience",
      label: "Academic Positions",
      count: timeline.filter((t) => t.category === "experience").length,
    },
    {
      id: "education",
      label: "Degrees & Doctorate",
      count: timeline.filter((t) => t.category === "education").length,
    },
    {
      id: "fellowship",
      label: "Fellowships",
      count: timeline.filter((t) => t.category === "fellowship").length,
    },
  ];

  return (
    <section
      id="career"
      className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 border-b border-border/40 relative overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Header & Robust Uncramped Filter Bar */}
        <div className="space-y-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Academic Trajectory • 2005 to Present</span>
            </div>

            <ScrollFloat
              tag="h2"
              textClassName="text-3xl sm:text-4xl md:text-5xl font-black text-heading tracking-tight leading-tight"
              effect="float"
              direction="up"
            >
              Career & Education Journey
            </ScrollFloat>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore two decades of continuous scholarly advancement from undergraduate foundations at Karunya (2005) through IGCAR research fellowship, Anna University Ph.D., to Associate Professor and DBT Principal Investigator at KARE.
            </p>
          </div>

          {/* Clean, Full-Width Flex-Wrap Filter Bar with shrink-0 buttons */}
          <FadeContent
            effect="focus"
            blur={4}
            duration={0.8}
            threshold={0.15}
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1"
          >
            {filterTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border shadow-xs ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary font-extrabold shadow-sm scale-102"
                      : "bg-card/90 border-border/80 text-muted-foreground hover:text-heading hover:bg-muted/60 hover:border-primary/40"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </FadeContent>
        </div>

        {/* 2. Responsive 6-Tile Quick-Jump Stepper Grid */}
        <FadeContent
          effect="focus"
          blur={6}
          duration={0.9}
          threshold={0.15}
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-card/80 border border-border/80 backdrop-blur-md shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Chronological Milestones (Click to Jump):</span>
            </span>
            <span className="text-[11px] text-primary font-mono hidden sm:inline-block">
              2005 ─────────── 2026+
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {sortedItems.map((milestone, idx) => {
              const meta = ERA_METADATA[milestone.id];
              const stepperInfo = STEPPER_LABELS[milestone.id];
              const isCurrent = milestone.year.includes("Present");
              const isSelected = activeHighlightId === milestone.id;

              return (
                <button
                  key={`stepper-${milestone.id}`}
                  onClick={() => scrollToMilestone(milestone.id)}
                  className={`group p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between min-h-[58px] ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs scale-102 ring-2 ring-primary/20"
                      : isCurrent
                      ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-background border-border/80 text-muted-foreground hover:text-heading hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="text-[10px] font-mono font-bold opacity-70">
                      #{meta?.stageNumber || String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-black font-mono">
                      {stepperInfo?.year || milestone.year.split("–")[0].trim()}
                    </span>
                    {isCurrent && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-semibold truncate w-full mt-0.5">
                    {stepperInfo?.shortRole || milestone.title.split("(")[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </FadeContent>

        {/* 3. The Animated Chronological Timeline Track */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 space-y-8 sm:space-y-10">
          {/* Central Vertical Spine */}
          <div className="absolute left-[13px] sm:[21px] md:left-[25px] top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-accent to-secondary rounded-full opacity-30 pointer-events-none" />

          <AnimatePresence mode="popLayout">
            {sortedItems.map((item, idx) => {
              const meta = ERA_METADATA[item.id];
              const isCurrent = item.year.includes("Present");
              const isExpanded = expandedCards[item.id];
              const isHighlighted = activeHighlightId === item.id;

              return (
                <motion.div
                  key={item.id}
                  id={`milestone-${item.id}`}
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative group scroll-mt-28"
                >
                  {/* Glowing Node on the Spine */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] md:-left-[43px] top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-2xl flex items-center justify-center transition-all duration-300 z-10 ${
                      isCurrent
                        ? "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg ring-4 ring-emerald-500/20 scale-110"
                        : isHighlighted
                        ? "bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-md"
                        : "bg-card border-2 border-primary/50 text-primary shadow-xs group-hover:scale-115 group-hover:border-primary group-hover:shadow-md"
                    }`}
                  >
                    {isCurrent ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold">
                        {meta?.stageNumber || String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Connecting Horizontal Branch Line precisely aligned */}
                  <div className="absolute -left-[14px] sm:-left-[18px] top-[38px] sm:top-[40px] w-4 sm:w-6 h-[2px] bg-primary/30 group-hover:bg-primary transition-colors" />

                  {/* Milestone Card */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.008 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`rounded-3xl border bg-card/95 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden ${
                      isHighlighted
                        ? "border-primary ring-2 ring-primary/20"
                        : isCurrent
                        ? "border-emerald-500/50 bg-gradient-to-br from-card via-card to-emerald-500/5"
                        : "border-border/80 hover:border-primary/50"
                    }`}
                  >
                    {/* Top ambient gradient slice */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                        isCurrent
                          ? "from-emerald-500 via-teal-400 to-primary"
                          : "from-primary via-accent to-secondary"
                      }`}
                    />

                    <div className="space-y-4">
                      {/* Badge Ribbon Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Year Badge */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-black font-mono shadow-xs">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.year}</span>
                          </span>

                          {/* Era Title Badge */}
                          {meta?.eraTitle && (
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                                meta.badgeColor || "bg-muted text-heading"
                              }`}
                            >
                              {getCategoryIcon(item.category)}
                              <span>{meta.eraTitle}</span>
                            </span>
                          )}

                          {/* Active / Current indicator */}
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs animate-pulse">
                              Active Position
                            </span>
                          )}
                        </div>

                        {/* Distinction / Award Ribbon */}
                        {item.gradeOrDistinction && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/25 shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item.gradeOrDistinction}</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Affiliation Details */}
                      <div className="space-y-1.5 pt-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-heading tracking-tight leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        {item.roleOrDegree && (
                          <p className="text-xs sm:text-sm font-semibold text-primary/95 flex items-center gap-2">
                            <span>{item.roleOrDegree}</span>
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap pt-0.5">
                          <span className="font-medium text-heading/90">
                            {item.institution}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {item.location}
                          </span>
                        </p>
                      </div>

                      {/* Descriptive Narrative */}
                      <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed pt-1">
                        {item.description}
                      </p>

                      {/* Expandable Core Focus & Competency Artifacts */}
                      {meta && (
                        <div className="pt-2 border-t border-border/70">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="flex items-center justify-between w-full py-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors group/btn touch-target"
                            aria-expanded={isExpanded}
                          >
                            <span className="flex items-center gap-1.5">
                              <Bookmark className="w-3.5 h-3.5 text-accent" />
                              <span>
                                {isExpanded ? "Hide Era Highlights" : "View Era Highlights & Key Skills"}
                              </span>
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
                            )}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden space-y-3 pt-3"
                              >
                                {meta.keyTakeaway && (
                                  <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/60 text-xs text-foreground/90 leading-relaxed flex items-start gap-2.5">
                                    <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-bold text-heading">Milestone Significance: </span>
                                      <span>{meta.keyTakeaway}</span>
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-1.5">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                                    Core Domains & Engineering Competencies:
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {meta.tags.map((tag, tIdx) => (
                                      <span
                                        key={`tag-${tIdx}`}
                                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-background border border-border/80 text-heading shadow-xs hover:border-primary/40 transition-colors"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
