"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileDown,
  Mail,
  ExternalLink,
  BookOpen,
  Award,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Layers,
  Compass,
  Calendar,
  Sparkles,
  Share2,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { useToast } from "@/context/ToastContext";
import { MobileBottomSheet } from "./MobileBottomSheet";
import SplitText from "@/components/ui/SplitText";

export function MobileHomeExperience() {
  const { profile, publications, projects, timeline, courses } = useData();
  const { showToast } = useToast();

  const sortedTimeline = [...timeline].sort((a, b) => {
    const yearA = parseInt(a.year.match(/\b(19\d{2}|20\d{2})\b/)?.[1] || "0", 10);
    const yearB = parseInt(b.year.match(/\b(19\d{2}|20\d{2})\b/)?.[1] || "0", 10);
    return yearA - yearB;
  });

  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(
    sortedTimeline[0]?.id || null
  );
  const [activeCitePub, setActiveCitePub] = useState<any | null>(null);

  const handleDownloadCV = () => {
    showToast(
      "Curriculum Vitae",
      "Generating academic dossier and preparing print-ready CV...",
      "info"
    );
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `${profile.name} - ${profile.role} at ${profile.institution}`,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied", "Portfolio URL copied to clipboard", "success");
    }
  };

  return (
    <div className="md:hidden w-full pb-24 space-y-8 safe-x">
      {/* 1. UNIVERSAL MOBILE HERO */}
      <section className="pt-4 pb-6 flex flex-col items-center text-center space-y-4">
        {/* Profile Portrait with iOS-style Squircle & Verified Pill */}
        <div className="relative">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] overflow-hidden border-2 border-primary/30 shadow-elevated relative bg-muted mx-auto">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              sizes="128px"
              priority
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-2 inset-x-0 flex justify-center">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold shadow-xs">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Scholar</span>
            </span>
          </div>
        </div>

        {/* Scholar Identity Hierarchy */}
        <div className="space-y-1.5 pt-1 px-2">
          <SplitText
            text={profile.name}
            tag="h1"
            className="text-fluid-h1 font-extrabold text-heading tracking-tight leading-tight"
            effect="rise"
            splitType="chars"
            delay={50}
            duration={1.25}
            staggerFrom="start"
            trigger="view"
            hoverEffect="lift"
            loop={false}
            loopDelay={1.5}
            mask={false}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto">
            {profile.tagline || `${profile.role} • ${profile.department} • ${profile.institution}`}
          </p>
        </div>

        {/* Research Areas (Scrollable Chips) */}
        <div className="w-full overflow-x-auto no-scrollbar py-1 flex items-center justify-start sm:justify-center gap-1.5 px-2">
          {profile.researchInterests.map((interest, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted/80 border border-border text-heading shrink-0"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Short Academic Statement / About */}
        <div className="text-xs text-card-foreground/85 leading-relaxed px-3 max-w-sm space-y-2 text-center">
          {profile.bioSummary.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Primary Touch CTAs (Min 44px Height Target) */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm pt-2">
          <Link
            href="/research"
            className="touch-target flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-soft active:scale-98 transition-transform"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Research</span>
          </Link>

          <button
            onClick={handleDownloadCV}
            className="touch-target flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-button text-white text-xs font-bold shadow-soft active:scale-98 transition-transform"
          >
            <FileDown className="w-4 h-4" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Quick External Identifiers */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
          <a
            href={profile.identifiers.googleScholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1.5 rounded-lg hover:text-heading"
          >
            <span>Scholar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <a
            href={profile.identifiers.orcidId}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1.5 rounded-lg hover:text-heading"
          >
            <span>ORCID</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 p-1.5 rounded-lg hover:text-heading"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
      </section>

      {/* 2. DYNAMIC 2-COLUMN ACADEMIC STATISTICS */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Scholarly Metrics & Output</span>
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Publications
            </span>
            <div className="text-2xl font-extrabold text-heading">
              {publications.length}+
            </div>
            <span className="text-[11px] text-secondary font-medium block">
              Scopus & WoS Indexed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Funded Grants
            </span>
            <div className="text-2xl font-extrabold text-heading">
              ₹76L
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block">
              DBT & KARE Supported
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Experience
            </span>
            <div className="text-2xl font-extrabold text-heading">
              14 Yrs
            </div>
            <span className="text-[11px] text-accent font-medium block">
              Teaching & Research
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Mentorship
            </span>
            <div className="text-2xl font-extrabold text-heading">
              36
            </div>
            <span className="text-[11px] text-primary font-medium block">
              B.Tech Cohorts Supervised
            </span>
          </div>
        </div>
      </section>

      {/* 3. MOBILE ACADEMIC STORYTELLING (EXPANDABLE MILESTONES) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Academic Journey & Milestones</span>
          </h2>
          <Link
            href="/about#career"
            className="text-xs text-primary font-bold hover:underline"
          >
            All Career →
          </Link>
        </div>

        <div className="space-y-2">
          {sortedTimeline.slice(0, 4).map((milestone) => {
            const isExpanded = expandedMilestone === milestone.id;

            return (
              <div
                key={milestone.id}
                className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden transition-colors"
              >
                <button
                  onClick={() =>
                    setExpandedMilestone(isExpanded ? null : milestone.id)
                  }
                  className="w-full text-left p-4 flex items-center justify-between gap-3 touch-target"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-muted text-primary">
                      {milestone.year}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-heading leading-snug">
                        {milestone.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {milestone.institution}
                      </p>
                    </div>
                  </div>

                  <div className="text-muted-foreground">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-card-foreground/85 border-t border-border/50 space-y-2 leading-relaxed animate-fade-in">
                    <p>{milestone.description}</p>
                    {milestone.gradeOrDistinction && (
                      <div className="pt-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-heading">
                          {milestone.gradeOrDistinction}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MOBILE FEATURED PUBLICATIONS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>Featured Scholarly Articles</span>
          </h2>
          <Link
            href="/research?tab=publications"
            className="text-xs text-primary font-bold hover:underline"
          >
            All Papers ({publications.length}) →
          </Link>
        </div>

        <div className="space-y-2.5">
          {publications.slice(0, 3).map((pub) => (
            <div
              key={pub.id}
              className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {pub.year}
                </span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">
                  {pub.type}
                </span>
              </div>

              <h4 className="text-xs font-bold text-heading leading-snug">
                {pub.title}
              </h4>

              <p className="text-[11px] text-muted-foreground italic line-clamp-1">
                {pub.venue}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-border/50 text-xs">
                {pub.doi ? (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                  >
                    <span>DOI Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-[10px]">
                    Indexed Article
                  </span>
                )}

                <button
                  onClick={() => setActiveCitePub(pub)}
                  className="px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-heading font-semibold text-[11px] transition-colors"
                >
                  Cite Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MOBILE SPONSORED PROJECTS HIGHLIGHT */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span>Active Funded Grants</span>
          </h2>
          <Link
            href="/research?tab=projects"
            className="text-xs text-primary font-bold hover:underline"
          >
            All Projects →
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-card to-muted/40 border border-primary/20 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
              DBT Funded (Active)
            </span>
            <span className="text-xs font-extrabold text-heading">
              ₹74,00,000
            </span>
          </div>

          <h3 className="text-xs font-bold text-heading leading-snug">
            Design of an AI-Based IR Grading Device for Early Detection of Diabetic Foot Ulcers
          </h3>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Department of Biotechnology (DBT), Govt. of India • Role: Principal Investigator
          </p>
        </div>
      </section>

      {/* 6. MOBILE QUICK CONTACT & COLLABORATION ACTION */}
      <section className="p-5 rounded-2xl bg-card border border-border shadow-xs text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-heading">
            Academic Collaboration & Inquiries
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Open for joint funded research proposals, keynote lectures, and Ph.D. mentoring.
          </p>
        </div>

        <div className="pt-1">
          <Link
            href="/contact"
            className="touch-target inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-button text-white text-xs font-bold shadow-soft"
          >
            <span>Send Direct Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Citation Bottom Sheet */}
      <MobileBottomSheet
        isOpen={!!activeCitePub}
        onClose={() => setActiveCitePub(null)}
        title="Cite Scholarly Work"
        subtitle={activeCitePub?.title}
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-muted/60 border border-border font-mono text-[11px] leading-relaxed select-all">
            {activeCitePub?.authors?.join(", ") || "Dr. Josephine Selle Jeyanathan"}. (
            {activeCitePub?.year}). "{activeCitePub?.title}".{" "}
            <em>{activeCitePub?.journal || activeCitePub?.conference}</em>.
            {activeCitePub?.doi && ` https://doi.org/${activeCitePub?.doi}`}
          </div>

          <button
            onClick={() => {
              const text = `${activeCitePub?.authors?.join(", ") || "Dr. Josephine Selle Jeyanathan"}. (${activeCitePub?.year}). "${activeCitePub?.title}". ${activeCitePub?.journal || activeCitePub?.conference}.`;
              navigator.clipboard.writeText(text);
              showToast("Citation Copied", "Citation copied to clipboard", "success");
              setActiveCitePub(null);
            }}
            className="touch-target w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs"
          >
            Copy Standard Citation
          </button>
        </div>
      </MobileBottomSheet>
    </div>
  );
}
