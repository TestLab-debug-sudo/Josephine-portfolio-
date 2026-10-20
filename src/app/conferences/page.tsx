"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Mic,
  Calendar,
  MapPin,
  Building,
  Award,
  Search,
  Filter,
  Users,
  Sparkles,
  ArrowRight,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import { initialTalksData } from "@/data/talks";
import { initialEventsOrganizedData } from "@/data/eventsOrganized";
import { InvitedTalk, EventOrganized } from "@/types";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

export default function ConferencesPage() {
  const [activeTab, setActiveTab] = useState<"talks" | "organized">("talks");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const talksList: InvitedTalk[] = initialTalksData;
  const eventsList: EventOrganized[] = initialEventsOrganizedData;

  const filteredTalks = useMemo(() => {
    return talksList.filter((talk: InvitedTalk) => {
      const matchesType =
        selectedType === "all" || talk.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        talk.title.toLowerCase().includes(q) ||
        talk.event.toLowerCase().includes(q) ||
        talk.venue.toLowerCase().includes(q) ||
        talk.location.toLowerCase().includes(q) ||
        (talk.sponsor && talk.sponsor.toLowerCase().includes(q));
      return matchesType && matchesSearch;
    });
  }, [talksList, selectedType, searchQuery]);

  const filteredEvents = useMemo(() => {
    return eventsList.filter((evt: EventOrganized) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.type.toLowerCase().includes(q) ||
        evt.organizer.toLowerCase().includes(q) ||
        (evt.description && evt.description.toLowerCase().includes(q)) ||
        (evt.collaborationOrSponsor &&
          evt.collaborationOrSponsor.toLowerCase().includes(q))
      );
    });
  }, [eventsList, searchQuery]);

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header Banner */}
      <section className="academic-card p-8 sm:p-10 relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/5">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Mic className="w-3.5 h-3.5" />
            <span>Academic Dissemination & Professional Activities</span>
          </div>
          <ScrollFloat
            tag="h1"
            textClassName="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight"
            effect="float"
            direction="up"
          >
            Conferences, Keynotes & Invited Talks
          </ScrollFloat>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            International and national keynote addresses, session chair appointments, ISRO & DBT sponsored lectures, and technical workshop organizations by Dr. Josephine Selle Jeyanathan.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <AnimatedContent
          distance={25}
          direction="vertical"
          duration={0.7}
          stagger={0.08}
          threshold={0.1}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/80"
        >
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-2xl font-extrabold text-heading">15+</p>
            <p className="text-xs text-muted-foreground font-medium">Invited Keynotes & Lectures</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-2xl font-extrabold text-primary">ICSTEPS &apos;25</p>
            <p className="text-xs text-muted-foreground font-medium">Session Chair Duties</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Avignon & Jeju</p>
            <p className="text-xs text-muted-foreground font-medium">Global International Talks</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border">
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">7+</p>
            <p className="text-xs text-muted-foreground font-medium">Flagship FDPs & Workshops</p>
          </div>
        </AnimatedContent>
      </section>

      {/* Tabs & Search Controls */}
      <FadeContent effect="focus" blur={4} duration={0.8} threshold={0.1}>
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Main Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/60 border border-border w-fit">
              <button
                onClick={() => setActiveTab("talks")}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "talks"
                    ? "bg-card text-heading shadow-sm border border-border/80"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Invited Talks & Lectures ({talksList.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("organized")}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "organized"
                    ? "bg-card text-heading shadow-sm border border-border/80"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Conferences & Events Organized ({eventsList.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, venue, sponsor..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Filter Pills for Talks Tab */}
          {activeTab === "talks" && (
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {[
                { id: "all", label: "All Engagements" },
                { id: "session-chair", label: "Session Chair" },
                { id: "keynote", label: "Keynotes" },
                { id: "invited-lecture", label: "Invited Lectures" },
                { id: "webinar", label: "Webinars" },
                { id: "hands-on", label: "Hands-on Workshops" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedType(pill.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    selectedType === pill.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-border/80 text-muted-foreground"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}
        </section>
      </FadeContent>

      {/* Content Area */}
      {activeTab === "talks" ? (
        <section className="space-y-4">
          {filteredTalks.length === 0 ? (
            <FadeContent effect="fade">
              <div className="academic-card p-12 text-center text-muted-foreground">
                No invited talks or lectures match your search criteria.
              </div>
            </FadeContent>
          ) : (
            <AnimatedContent
              key={`talks-${selectedType}-${searchQuery}`}
              distance={35}
              direction="vertical"
              duration={0.7}
              stagger={0.05}
              threshold={0.05}
              className="grid grid-cols-1 gap-4"
            >
              {filteredTalks.map((talk: InvitedTalk, idx: number) => (
                <div
                  key={talk.id || `talk-${idx}`}
                  className="academic-card p-5 sm:p-6 hover:border-primary/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                        {talk.type.replace("-", " ")}
                      </span>
                      {talk.sponsor && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Sponsor: {talk.sponsor}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{talk.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-heading">
                    {talk.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-semibold text-foreground/80">{talk.event}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{talk.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{talk.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedContent>
          )}
        </section>
      ) : (
        <section className="space-y-4">
          {filteredEvents.length === 0 ? (
            <FadeContent effect="fade">
              <div className="academic-card p-12 text-center text-muted-foreground">
                No events organized match your query.
              </div>
            </FadeContent>
          ) : (
            <AnimatedContent
              key={`events-${searchQuery}`}
              distance={35}
              direction="vertical"
              duration={0.7}
              stagger={0.05}
              threshold={0.05}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredEvents.map((evt: EventOrganized, idx: number) => (
                <div
                  key={evt.id || `evt-${idx}`}
                  className="academic-card p-5 sm:p-6 hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-muted text-muted-foreground uppercase">
                        {evt.type}
                      </span>
                      <span className="text-xs font-semibold text-primary">
                        {evt.dateOrDuration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-heading">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 text-xs space-y-1 text-muted-foreground">
                    <p className="font-medium text-foreground/80">
                      Organizer: {evt.organizer}
                    </p>
                    {evt.collaborationOrSponsor && (
                      <p className="text-primary font-medium">
                        Sponsored by: {evt.collaborationOrSponsor}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </AnimatedContent>
          )}
        </section>
      )}

      {/* Navigation Footer */}
      <FadeContent effect="mist" duration={1.2} threshold={0.15}>
        <section className="pt-6 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/research?tab=publications"
              className="academic-card p-4 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">Peer Reviewed</p>
                <p className="text-sm font-bold text-heading">31+ Publications</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/activity"
              className="academic-card p-4 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">FDPs & Workshops</p>
                <p className="text-sm font-bold text-heading">Academic Activity</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about#achievements"
              className="academic-card p-4 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">Honors & Grants</p>
                <p className="text-sm font-bold text-heading">Achievements</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </FadeContent>
    </div>
  );
}
