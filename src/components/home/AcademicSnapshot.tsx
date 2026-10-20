"use client";

import React from "react";
import { useData } from "@/context/DataContext";
import { StatCard } from "@/components/ui/StatCard";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import {
  Calendar,
  BookOpen,
  DollarSign,
  Users,
  Compass,
  Award,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export function AcademicSnapshot() {
  const { profile, publications, projects, achievements, talks } = useData();

  const totalPapers = publications.length;
  const journalCount = publications.filter((p) => p.type === "journal").length;
  const confCount = publications.filter((p) => p.type === "conference").length;
  const bookChapters = publications.filter((p) => p.type === "book-chapter").length;

  return (
    <section className="py-16 bg-muted/20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Academic Metrics & Visual Dashboard</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-3xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >Quantified Scholarly Impact</ScrollFloat>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Continuously tracked academic contributions spanning funded national R&D, peer-reviewed indexed publications, engineering pedagogies, and industry-partnered curricula.
          </p>
        </div>

        {/* Primary Stat Cards Grid */}
        {/* Primary Stat Cards Grid (Replicating Image 2 Sparkline Analytics) */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          stagger={0.1}
          threshold={0.15}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Conversion Rate & Progress Bar */}
          <StatCard
            label="Research & Teaching"
            value={profile.metrics.yearsExperience}
            suffix=" Years"
            variant="progress"
            sublabel="Conversion Rate"
            subvalue="+6%"
            progressPercent={85}
            description="Continuous faculty experience across academic instruction, R&D labs, and curriculum development."
          />

          {/* Card 2: Closed Metrics & Blue Wave Area Spline */}
          <StatCard
            label="Research Publications"
            value={totalPapers}
            suffix=" Papers"
            trendText="-3%"
            trendColor="red"
            variant="wave"
            description="Indexed articles in Scopus and Web of Science across Springer, IEEE, and QIRT journals."
          />

          {/* Card 3: New Inquiries & Dual-Line Trend Chart */}
          <StatCard
            label="Funded Grants"
            value={76}
            prefix="₹"
            suffix=" Lakhs"
            trendText="+9%"
            trendColor="green"
            variant="dual-line"
            description="Sanctioned R&D grants including Department of Biotechnology (₹74L) and KARE Seed Fund (₹2L)."
          />

          {/* Card 4: Mentorship Cohorts & Vertical Bar Histogram */}
          <StatCard
            label="B.Tech Mentorship"
            value={profile.metrics.batchesMentored}
            suffix=" Batches"
            trendText="+3%"
            trendColor="green"
            variant="histogram"
            description="Undergraduate student cohorts guided through Project-to-Business Learning (P2BL) and national hackathons."
          />
        </AnimatedContent>

        {/* Secondary Visual Breakdown: SVG Chart & Indexing Breakdown */}
        <FadeContent
          effect="focus"
          blur={6}
          duration={0.9}
          threshold={0.15}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Publication Distribution Card */}
            <div className="lg:col-span-7 academic-card p-6 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-heading">
                  Scholarly Output Distribution
                </h3>
                <p className="text-xs text-muted-foreground">
                  Breakdown of peer-reviewed journals, international IEEE conference proceedings, and book chapters.
                </p>
              </div>

              {/* Custom SVG / Pure CSS Visual Bars */}
              <div className="space-y-4 my-6">
                {/* Journal */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-heading">Indexed Journals (Scopus / WoS)</span>
                    <span className="text-primary font-bold">{journalCount} Articles ({Math.round((journalCount / totalPapers) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(journalCount / totalPapers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Conference */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-heading">International Conferences (IEEE / Springer)</span>
                    <span className="text-secondary font-bold">{confCount} Papers ({Math.round((confCount / totalPapers) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{ width: `${(confCount / totalPapers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Book Chapters */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-heading">Authored Book Chapters (Springer / Academic Press)</span>
                    <span className="text-accent font-bold">{bookChapters} Chapters ({Math.round((bookChapters / totalPapers) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(bookChapters / totalPapers) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center text-xs">
                <div>
                  <p className="text-[11px] text-muted-foreground">Scopus ID</p>
                  <p className="font-mono font-bold text-heading mt-0.5">{profile.identifiers.scopusId}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">WoS ID</p>
                  <p className="font-mono font-bold text-heading mt-0.5">{profile.identifiers.wosResearcherId}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">ORCID</p>
                  <p className="font-mono font-bold text-heading mt-0.5">0000-0003-2219-6748</p>
                </div>
              </div>
            </div>

            {/* Academic Engagements Card */}
            <div className="lg:col-span-5 academic-card p-6 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-heading">
                  Academic Outreach & Professional Milestones
                </h3>
                <p className="text-xs text-muted-foreground">
                  Participation in national forums, professional bodies, and advanced faculty training.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-2xl font-bold text-heading">24</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">Faculty Dev Programs (FDP)</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-2xl font-bold text-heading">19</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">Workshops & Symposia</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-2xl font-bold text-heading">15+</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">Invited Keynotes & Talks</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-2xl font-bold text-heading">5</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">Teaching & Research Awards</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Professional Societies:</span>
                <span className="font-semibold text-primary">BMESI (Life Member) • IEEE Member</span>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
