"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  LayoutGrid,
  Sparkles,
  MousePointer,
  RotateCcw,
  DollarSign,
  GraduationCap,
  Users,
  Building,
  Bookmark,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import PageFlip, { PageFlipLeaf } from "@/components/ui/PageFlip";
import { AcademicAchievement } from "@/types";

type AchievementCategory = "all" | "award" | "certification" | "membership";
type DisplayViewMode = "flip" | "grid";

export function AchievementsSection() {
  const { achievements } = useData();
  const [activeFilter, setActiveFilter] = useState<AchievementCategory>("all");
  const [viewMode, setViewMode] = useState<DisplayViewMode>("flip");
  const [turnedCount, setTurnedCount] = useState<number>(0);
  const [bookResetKey, setBookResetKey] = useState<number>(0);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const checkSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setScreenSize("mobile");
      } else if (w < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return achievements;
    return achievements.filter((ach) => ach.category === activeFilter);
  }, [achievements, activeFilter]);

  const handleFilterChange = (cat: AchievementCategory) => {
    setActiveFilter(cat);
    setTurnedCount(0);
    setBookResetKey((prev) => prev + 1);
  };

  const handlePageChange = useCallback((turned: number) => {
    setTurnedCount((prev) => (prev === turned ? prev : turned));
  }, []);

  const getItemIcon = (ach: AcademicAchievement) => {
    const title = ach.title.toLowerCase();
    if (
      title.includes("74,00,000") ||
      title.includes("grant") ||
      title.includes("seed money")
    ) {
      return <DollarSign className="w-5 h-5 text-amber-500" />;
    }
    if (
      ach.category === "certification" ||
      title.includes("certified") ||
      title.includes("clad")
    ) {
      return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    }
    if (ach.category === "membership" || title.includes("member")) {
      return <Users className="w-5 h-5 text-purple-500" />;
    }
    if (
      title.includes("teaching") ||
      title.includes("manual") ||
      title.includes("p2bl")
    ) {
      return <GraduationCap className="w-5 h-5 text-blue-500" />;
    }
    return <Award className="w-5 h-5 text-amber-500" />;
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "award":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25";
      case "certification":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25";
      case "membership":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  // Render individual achievement certificate card content
  const renderAchievementCard = (
    ach: AcademicAchievement,
    idx: number,
    total: number,
    isBack = false
  ) => {
    const seqNum = String(idx + 1).padStart(2, "0");
    const totalNum = String(total).padStart(2, "0");

    return (
      <div className="h-full w-full p-6 sm:p-7 md:p-8 flex flex-col justify-between select-none relative overflow-hidden bg-card text-card-foreground">
        {/* Subtle decorative inner certificate border */}
        <div className="absolute inset-3 border border-border/50 rounded-xl pointer-events-none" />

        {/* Card Header: Sequence Number, Badge, Year */}
        <div className="relative z-10 flex items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/50">
              #{seqNum} / {totalNum}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getBadgeStyle(
                ach.category
              )}`}
            >
              {ach.badge || ach.category}
            </span>
          </div>

          <span className="font-mono text-xs sm:text-sm font-extrabold text-heading bg-muted/80 px-2.5 py-1 rounded-md border border-border/70">
            {ach.year}
          </span>
        </div>

        {/* Card Body: Icon, Title, Issuer, Narrative */}
        <div className="relative z-10 space-y-4 py-3 flex-1 flex flex-col justify-center">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-muted/90 border border-border/80 shrink-0 mt-0.5 shadow-xs">
              {getItemIcon(ach)}
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg md:text-xl font-black text-heading tracking-tight leading-snug">
                {ach.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-1.5 pt-0.5">
                <Building className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-[280px]">{ach.issuer}</span>
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-card-foreground/85 leading-relaxed line-clamp-6">
            {ach.description}
          </p>
        </div>

        {/* Card Footer: Verified Badge & Flip cue */}
        <div className="relative z-10 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Verified Conferred Record</span>
          </div>
          <span className="font-mono text-xs text-muted-foreground/80 flex items-center gap-1">
            {isBack ? "← Turn back" : "Turn page →"}
          </span>
        </div>
      </div>
    );
  };

  // Build the book leaves from the filtered list of achievements
  const bookPages: PageFlipLeaf[] = useMemo(() => {
    if (!filtered.length) return [];

    const leaves: PageFlipLeaf[] = [];

    // Cover Leaf (Leaf 0)
    const coverLeaf: PageFlipLeaf = {
      id: "leaf-cover",
      frontContent: (
        <div className="h-full w-full p-8 sm:p-10 md:p-12 flex flex-col justify-between items-center text-center bg-gradient-to-br from-card via-card to-primary/5 text-card-foreground relative overflow-hidden">
          {/* Ornate Framing */}
          <div className="absolute inset-3.5 border-2 border-primary/20 rounded-2xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-primary/30 rounded-xl pointer-events-none" />

          {/* Top Crest */}
          <div className="pt-6 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-primary font-mono">
              Academic Dossier
            </span>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm">
              <Award className="w-7 h-7 text-accent" />
            </div>
          </div>

          {/* Cover Titles */}
          <div className="space-y-3 max-w-[320px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-heading tracking-tight leading-snug">
              Academic Recognitions & Certifications
            </h2>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Official Conferred Honors, Sanctioned Research Grants & Professional Certifications
            </p>
          </div>

          {/* Bottom Cue */}
          <div className="pb-4 text-center space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <span>{filtered.length} Conferred Credentials</span>
            </span>
            <p className="text-xs text-muted-foreground font-mono">
              Click or drag to flip open &rarr;
            </p>
          </div>
        </div>
      ),
      backContent: renderAchievementCard(filtered[0], 0, filtered.length, true),
    };
    leaves.push(coverLeaf);

    // Intermediate Leaves
    for (let i = 1; i < filtered.length; i += 2) {
      const frontAch = filtered[i];
      const backAch = filtered[i + 1];

      leaves.push({
        id: `leaf-${i}`,
        frontContent: renderAchievementCard(frontAch, i, filtered.length, false),
        backContent: backAch ? (
          renderAchievementCard(backAch, i + 1, filtered.length, true)
        ) : (
          /* Colophon / End of Book */
          <div className="h-full w-full p-8 sm:p-10 flex flex-col justify-between items-center text-center bg-card text-card-foreground relative overflow-hidden">
            <div className="absolute inset-3.5 border border-border/70 rounded-2xl pointer-events-none" />
            <div className="pt-8">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground font-mono">
                Dossier Colophon
              </span>
            </div>

            <div className="space-y-2 max-w-[260px]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-heading">
                End of Conferred Honors
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All credentials certified and recorded under institutional verification archives.
              </p>
            </div>

            <div className="pb-6 text-center">
              <span className="text-xs font-mono text-muted-foreground">
                Click background to close book
              </span>
            </div>
          </div>
        ),
      });
    }

    return leaves;
  }, [filtered]);

  const pageWidth =
    screenSize === "mobile" ? 275 : screenSize === "tablet" ? 380 : 460;
  const pageHeight =
    screenSize === "mobile" ? 420 : screenSize === "tablet" ? 540 : 620;
  const spineShift =
    screenSize === "mobile" ? 80 : screenSize === "tablet" ? 190 : 230;

  return (
    <section id="achievements" className="py-20 border-b border-border/40 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Honors, Grants & Credentials</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-3xl sm:text-4xl md:text-5xl font-black text-heading tracking-tight leading-tight"
              effect="float"
              direction="up"
            >
              Academic Recognitions & Certifications
            </ScrollFloat>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore 16 officially conferred recognitions spanning ₹76 Lakhs in sanctioned R&D grants, IQAC Teaching Competency awards, IUCEE/IIT Jammu engineering certifications, and professional society life memberships.
            </p>
          </div>

          {/* Controls: Mode Switcher + Category Filters */}
          <FadeContent
            effect="focus"
            blur={4}
            duration={0.8}
            threshold={0.15}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0"
          >
            {/* View Mode Toggle: Page Flip Book vs Grid */}
            <div className="p-1 rounded-xl bg-muted/80 border border-border flex items-center gap-1 text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("flip")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === "flip"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Page Flip Book</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid Catalog</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-muted/80 border border-border rounded-xl flex-wrap shadow-xs">
              {(
                [
                  { id: "all", label: "All (16)" },
                  { id: "award", label: "Awards & Grants" },
                  { id: "certification", label: "Certifications" },
                  { id: "membership", label: "Memberships" },
                ] as { id: AchievementCategory; label: string }[]
              ).map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFilter === cat.id
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-heading hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeContent>
        </div>

        {/* 1. PAGE FLIP BOOK VIEW (React Bits Integration) */}
        {viewMode === "flip" && (
          <div className="space-y-4">
            {/* Interactive Book Control Bar */}
            <div className="py-2 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-amber-500 animate-bounce" />
                <span className="font-semibold text-heading">
                  Drag page corner or click to flip through the dossier:
                </span>
              </div>

              {/* Book Navigation Stats & Close Button */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/25">
                  Leaf {turnedCount} of {bookPages.length} Turned
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setTurnedCount(0);
                    setBookResetKey((prev) => prev + 1);
                  }}
                  title="Close & Reset Book"
                  className="p-1.5 rounded-lg border border-border/60 bg-card hover:bg-muted text-heading transition-colors shadow-xs flex items-center gap-1.5 text-xs font-semibold px-2.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Cover</span>
                </button>
              </div>
            </div>

            {/* Book Flip Stage */}
            <div
              key={`pageflip-stage-${activeFilter}-${bookResetKey}`}
              className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[720px] relative overflow-hidden flex items-center justify-center py-6 px-2 sm:px-4"
            >
              <PageFlip
                pages={bookPages}
                pageWidth={pageWidth}
                pageHeight={pageHeight}
                pageRadius={12}
                perspective={1400}
                spineShift={spineShift}
                turnAngle={180}
                peekAngle={14}
                duration={0.65}
                stagger={0.08}
                ease="easeInOut"
                shadow={0.4}
                trigger="click"
                closeOnLeave={false}
                interactive={true}
                onPageChange={handlePageChange}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* 2. GRID CATALOG VIEW */}
        {viewMode === "grid" && (
          <AnimatedContent
            key={activeFilter}
            distance={35}
            direction="vertical"
            duration={0.7}
            stagger={0.06}
            threshold={0.05}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((ach, idx) => (
              <div
                key={ach.id}
                className="academic-card p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getBadgeStyle(
                        ach.category
                      )}`}
                    >
                      {ach.badge || ach.category}
                    </span>
                    <span className="text-xs font-mono font-medium text-muted-foreground">
                      {ach.year}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-muted border border-border/80 shrink-0 mt-0.5">
                      {getItemIcon(ach)}
                    </div>
                    <h3 className="text-base font-bold text-heading leading-snug">
                      {ach.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-primary">
                    {ach.issuer}
                  </p>

                  <p className="text-xs text-card-foreground/80 leading-relaxed pt-1">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified Credential
                  </span>
                  <span className="font-mono text-muted-foreground">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
