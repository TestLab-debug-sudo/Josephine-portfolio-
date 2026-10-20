"use client";

import React, { useState, useMemo } from "react";
import {
  Mic2,
  Calendar,
  MapPin,
  Sparkles,
  Building,
  Award,
  Users,
  Layers,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import DepthCarousel, { DepthCarouselItem } from "@/components/ui/DepthCarousel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

type ActivityTab = "talks" | "events";
type DisplayViewMode = "carousel" | "grid";

const TALK_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", // Keynote stage
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800", // Space AI ISRO
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800", // Healthcare imaging
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", // Academic lecture
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", // Digital tech interface
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", // Workshop lecture
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800", // International hall
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", // Professional talk
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800", // Research laboratory
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", // Conference panel
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", // MATLAB computing
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", // Neural networks
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", // University seminar
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800", // Global discussion
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", // Technology symposium
];

const EVENT_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", // VOICE Conference
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", // Numerical analysis workshop
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", // IEEE Workshop
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800", // Building a new internet
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", // Electromagnetic antennas
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", // Manuscript preparation
  "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800", // Deep learning mystery
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800", // Digital system design FDP
  "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800", // Semiconductor ATAL
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800", // TCAD IoT competition
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", // TechIgnite for schools
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", // EmpowerEd for teachers
];

export function AcademicActivity() {
  const { talks, eventsOrganized } = useData();
  const [activeTab, setActiveTab] = useState<ActivityTab>("talks");
  const [viewMode, setViewMode] = useState<DisplayViewMode>("carousel");
  const [activeTalkIndex, setActiveTalkIndex] = useState<number>(0);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  // Prepare 3D DepthCarousel items for talks
  const talkItems: DepthCarouselItem[] = useMemo(() => {
    return talks.map((t, idx) => ({
      image: TALK_BACKGROUNDS[idx % TALK_BACKGROUNDS.length],
      title: t.title,
      event: t.event,
      venue: t.venue,
      date: t.date,
      location: t.location,
      sponsor: t.sponsor,
      year: t.year,
      tag: t.type.replace("-", " "),
      type: t.type,
      id: t.id,
    }));
  }, [talks]);

  // Prepare 3D DepthCarousel items for events organized
  const eventItems: DepthCarouselItem[] = useMemo(() => {
    return eventsOrganized.map((e, idx) => ({
      image: EVENT_BACKGROUNDS[idx % EVENT_BACKGROUNDS.length],
      title: e.title,
      event: e.organizer,
      venue: e.collaborationOrSponsor ? `In collaboration with ${e.collaborationOrSponsor}` : e.organizer,
      date: e.dateOrDuration,
      tag: e.type,
      description: e.description,
      id: e.id,
    }));
  }, [eventsOrganized]);

  const activeTalk = talkItems[activeTalkIndex] || talkItems[0];
  const activeEvent = eventItems[activeEventIndex] || eventItems[0];

  return (
    <section id="conferences" className="py-20 border-b border-border/40 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Mic2 className="w-3.5 h-3.5" />
              <span>Conferences & Global Outreach</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-3xl sm:text-4xl md:text-5xl font-black text-heading tracking-tight leading-tight"
              effect="float"
              direction="up"
            >
              Academic Engagements & Invited Talks
            </ScrollFloat>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore 15 invited keynotes & resource person engagements (ISRO Mahendragiri, Jeju Korea, IEEE Madras, SRMIST/IGCAR) and 12 departmental conferences & workshops organized.
            </p>
          </div>

          {/* Controls: Mode Switcher + Activity Tabs */}
          <FadeContent
            effect="focus"
            blur={4}
            duration={0.8}
            threshold={0.15}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0"
          >
            {/* View Mode Toggle: 3D DepthCarousel vs Grid */}
            <div className="p-1 rounded-xl bg-muted/80 border border-border flex items-center gap-1 text-xs shadow-xs">
              <button
                onClick={() => setViewMode("carousel")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === "carousel"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Depth Carousel</span>
              </button>
              <button
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

            {/* Activity Category Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-card border border-border rounded-xl shadow-xs">
              <button
                onClick={() => {
                  setActiveTab("talks");
                  setActiveTalkIndex(0);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "talks"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <Mic2 className="w-3.5 h-3.5" />
                <span>Invited Lectures ({talks.length})</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("events");
                  setActiveEventIndex(0);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "events"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Events Organized ({eventsOrganized.length})</span>
              </button>
            </div>
          </FadeContent>
        </div>

        {/* 1. 3D DEPTH CAROUSEL VIEW (React Bits Integration) */}
        {viewMode === "carousel" && (
          <div className="space-y-6">
            {activeTab === "talks" ? (
              <div className="space-y-6">
                {/* 3D Depth Carousel Stage */}
                <div className="w-full h-[460px] sm:h-[500px] relative overflow-hidden flex items-center justify-center">
                  <DepthCarousel
                    items={talkItems}
                    depth={220}
                    spread={95}
                    tilt={22}
                    tiltDirection="right"
                    perspective={1400}
                    visibleCards={4}
                    falloff={0.2}
                    blur={5}
                    cardWidth={330}
                    cardHeight={400}
                    radius={22}
                    autoplay={false}
                    loop={true}
                    showControls={true}
                    showIndicators={true}
                    onChange={(idx) => setActiveTalkIndex(idx)}
                    className="w-full h-full"
                  />
                </div>

                {/* Active Talk Spotlight Card */}
                {activeTalk && (
                  <div className="academic-card p-6 sm:p-8 space-y-4 border-purple-500/30 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25">
                          Lecture #{String(activeTalkIndex + 1).padStart(2, "0")} of {talkItems.length}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {activeTalk.tag}
                        </span>
                      </div>

                      <span className="font-mono text-xs font-bold text-heading bg-muted px-2.5 py-1 rounded-lg">
                        {activeTalk.date}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black text-heading tracking-tight leading-snug">
                        {activeTalk.title}
                      </h3>
                      <p className="text-sm font-semibold text-secondary flex items-center gap-1.5">
                        <Building className="w-4 h-4" />
                        <span>{activeTalk.event} • {activeTalk.venue}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-border/60">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span><strong>Location:</strong> {activeTalk.location}</span>
                      </div>

                      {activeTalk.sponsor && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Award className="w-4 h-4 text-amber-500 shrink-0" />
                          <span><strong>Sponsor:</strong> {activeTalk.sponsor}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Resource Person / Keynote Engagement</span>
                      </span>
                      <span className="text-[11px] font-mono">
                        Drag or click arrows to explore depth stack →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* 3D Depth Carousel Stage for Events */}
                <div className="w-full h-[460px] sm:h-[500px] relative overflow-hidden flex items-center justify-center">
                  <DepthCarousel
                    items={eventItems}
                    depth={220}
                    spread={95}
                    tilt={22}
                    tiltDirection="right"
                    perspective={1400}
                    visibleCards={4}
                    falloff={0.2}
                    blur={5}
                    cardWidth={330}
                    cardHeight={400}
                    radius={22}
                    autoplay={false}
                    loop={true}
                    showControls={true}
                    showIndicators={true}
                    onChange={(idx) => setActiveEventIndex(idx)}
                    className="w-full h-full"
                  />
                </div>

                {/* Active Event Spotlight Card */}
                {activeEvent && (
                  <div className="academic-card p-6 sm:p-8 space-y-4 border-purple-500/30 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25">
                          Event #{String(activeEventIndex + 1).padStart(2, "0")} of {eventItems.length}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                          {activeEvent.tag}
                        </span>
                      </div>

                      <span className="font-mono text-xs font-bold text-heading bg-muted px-2.5 py-1 rounded-lg">
                        {activeEvent.date}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black text-heading tracking-tight leading-snug">
                        {activeEvent.title}
                      </h3>
                      <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
                        <Building className="w-4 h-4" />
                        <span>{activeEvent.event}</span>
                      </p>
                    </div>

                    {activeEvent.description && (
                      <p className="text-xs sm:text-sm text-card-foreground/85 leading-relaxed pt-1">
                        {activeEvent.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Organized Academic Program</span>
                      </span>
                      <span className="text-[11px] font-mono">
                        Drag or click arrows to explore depth stack →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. GRID CATALOG VIEW */}
        {viewMode === "grid" && (
          <div>
            {activeTab === "talks" ? (
              <AnimatedContent
                distance={35}
                direction="vertical"
                duration={0.7}
                stagger={0.06}
                threshold={0.05}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {talks.map((talk, idx) => (
                  <div
                    key={talk.id}
                    className="academic-card p-6 flex flex-col justify-between space-y-3 hover:border-purple-500/40 transition-all shadow-xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                          {talk.type.replace("-", " ")}
                        </span>
                        <span className="text-xs font-mono font-medium text-muted-foreground">
                          {talk.year}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-heading leading-snug">
                        {talk.title}
                      </h3>

                      <p className="text-xs font-semibold text-secondary">
                        {talk.event}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {talk.venue}
                      </p>

                      {talk.sponsor && (
                        <div className="text-[11px] text-accent font-semibold pt-1">
                          Sponsor: {talk.sponsor}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {talk.location}
                      </span>
                      <span>#{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                ))}
              </AnimatedContent>
            ) : (
              <AnimatedContent
                distance={35}
                direction="vertical"
                duration={0.7}
                stagger={0.06}
                threshold={0.05}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {eventsOrganized.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className="academic-card p-6 sm:p-8 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary/10 text-secondary uppercase">
                          {evt.type}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          {evt.dateOrDuration}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-heading leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-xs font-semibold text-primary">
                        {evt.organizer}
                      </p>

                      {evt.collaborationOrSponsor && (
                        <p className="text-xs text-accent font-medium">
                          In Collaboration With: {evt.collaborationOrSponsor}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed pt-1">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <span>Organized Academic Program</span>
                      <span className="font-mono">#{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                ))}
              </AnimatedContent>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
