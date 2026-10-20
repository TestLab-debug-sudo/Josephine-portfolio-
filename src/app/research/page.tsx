"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResearchFocus } from "@/components/home/ResearchFocus";
import { CurrentResearch } from "@/components/home/CurrentResearch";
import { PublicationsCatalog } from "@/components/research/PublicationsCatalog";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import Link from "next/link";
import {
  Compass,
  Layers,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";

type ResearchTab = "all" | "domains" | "projects" | "publications";

function ResearchHubContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = (searchParams.get("tab") as ResearchTab) || "all";
  const [activeTab, setActiveTab] = useState<ResearchTab>(
    ["all", "domains", "projects", "publications"].includes(initialTab) ? initialTab : "all"
  );

  useEffect(() => {
    const tab = searchParams.get("tab") as ResearchTab;
    if (tab && ["all", "domains", "projects", "publications"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: ResearchTab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      newParams.delete("tab");
    } else {
      newParams.set("tab", tab);
    }
    const query = newParams.toString();
    router.replace(`/research${query ? `?${query}` : ""}`, { scroll: false });
  };

  return (
    <div className="w-full py-10 space-y-12">
      {/* 1. Header Banner & Quick Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Unified Research & Innovation Hub</span>
          </div>

          <ScrollFloat
            tag="h1"
            textClassName="text-3xl sm:text-5xl font-black text-heading tracking-tight leading-tight"
            effect="float"
            direction="up"
          >
            Research, Projects & Scholarship
          </ScrollFloat>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Consolidated scientific domains, ₹76+ Lakhs in funded clinical diagnostics grants from the Department of Biotechnology (DBT), and complete peer-reviewed publications indexed in Scopus and Web of Science.
          </p>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <AnimatedContent
          distance={25}
          direction="vertical"
          duration={0.7}
          stagger={0.08}
          threshold={0.1}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"
        >
          <div
            onClick={() => handleTabChange("domains")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "domains"
                ? "bg-primary/10 border-primary ring-2 ring-primary/20"
                : "bg-card border-border hover:border-primary/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-heading">5</span>
              <Compass className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs font-bold text-heading mt-1">Research Domains</p>
            <p className="text-[11px] text-muted-foreground">Thermography, IoT & AI</p>
          </div>

          <div
            onClick={() => handleTabChange("projects")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20"
                : "bg-card border-border hover:border-emerald-500/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">₹76L</span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs font-bold text-heading mt-1">Funded Projects</p>
            <p className="text-[11px] text-muted-foreground">DBT PI & Seed Grants</p>
          </div>

          <div
            onClick={() => handleTabChange("publications")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "publications"
                ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20"
                : "bg-card border-border hover:border-amber-500/40 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">31+</span>
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xs font-bold text-heading mt-1">Publications</p>
            <p className="text-[11px] text-muted-foreground">Scopus & Web of Science</p>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-secondary">100+</span>
              <Award className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-xs font-bold text-heading mt-1">Citations & Impact</p>
            <p className="text-[11px] text-muted-foreground">Global Academic Reach</p>
          </div>
        </AnimatedContent>

        {/* 2. Interactive Navigation Tabs */}
        <FadeContent effect="focus" blur={4} duration={0.8} threshold={0.15}>
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border shadow-xs w-fit">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "all"
                  ? "bg-card text-heading shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-primary" />
              <span>All Research Hub</span>
            </button>

            <button
              onClick={() => handleTabChange("domains")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "domains"
                  ? "bg-card text-heading shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-blue-500" />
              <span>Research Domains</span>
            </button>

            <button
              onClick={() => handleTabChange("projects")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "projects"
                  ? "bg-card text-heading shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sponsored Projects (₹76L)</span>
            </button>

            <button
              onClick={() => handleTabChange("publications")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "publications"
                  ? "bg-card text-heading shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Publications & Papers (31+)</span>
            </button>
          </div>
        </FadeContent>
      </section>

      {/* 3. Dynamic Tab Content */}
      <div className="space-y-16">
        {/* TAB: ALL (Render all 3 pillars in continuous flowing layout) */}
        {activeTab === "all" && (
          <div className="space-y-16 animate-fade-in">
            {/* Section 1: Domains */}
            <div>
              <ResearchFocus />
            </div>

            {/* Section 2: Projects */}
            <div>
              <CurrentResearch />
            </div>

            {/* Section 3: Publications */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <PublicationsCatalog hideHeader={false} />
            </div>
          </div>
        )}

        {/* TAB: DOMAINS */}
        {activeTab === "domains" && (
          <div className="animate-fade-in">
            <ResearchFocus />
          </div>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === "projects" && (
          <div className="animate-fade-in">
            <CurrentResearch />
          </div>
        )}

        {/* TAB: PUBLICATIONS */}
        {activeTab === "publications" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <PublicationsCatalog hideHeader={false} />
          </div>
        )}
      </div>

      {/* 4. Cross-Links Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-border">
        <FadeContent effect="focus" blur={4} duration={0.8} threshold={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/teaching"
              className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase">
                  <GraduationCap className="w-3.5 h-3.5" /> Pedagogical Portfolio
                </span>
                <h3 className="text-base font-bold text-heading mt-1">
                  Explore Courses & Engineering Syllabi
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Electromagnetic Waves, Control Systems, IoT, and DSP Laboratories.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <span className="text-xs font-bold text-secondary flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" /> Academic Profile
                </span>
                <h3 className="text-base font-bold text-heading mt-1">
                  Education & Career Trajectory
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ph.D. Anna University, M.E. Distinction, Karunya B.E., and IGCAR Fellowship.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeContent>
      </section>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-sm text-muted-foreground">
          Loading Research, Projects & Publications...
        </div>
      }
    >
      <ResearchHubContent />
    </Suspense>
  );
}
