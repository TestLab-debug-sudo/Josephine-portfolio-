"use client";

import React from "react";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { Layers, ShieldCheck, CheckCircle2, Clock, Landmark, Sparkles, Cpu } from "lucide-react";

export function CurrentResearch() {
  const { projects } = useData();

  return (
    <section id="projects" className="py-20 bg-muted/15 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>Funded Research & Translational Grants</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Sponsored Research Projects
            </ScrollFloat>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Major externally and internally funded research initiatives advancing non-invasive clinical diagnostics and ambient health assistive technologies.
          </p>
        </div>

        {/* Project Cards Grid */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.85}
          ease="power3.out"
          stagger={0.15}
          threshold={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((proj) => {
            const isOngoing = proj.status === "ongoing";

            return (
              <div
                key={proj.id}
                className={`academic-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden ${
                  proj.isFeatured ? "border-primary/40 shadow-soft" : ""
                }`}
              >
                {/* Status & Funding Agency Top Bar */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                        isOngoing
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {isOngoing ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Ongoing Project
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completed Research
                        </>
                      )}
                    </span>

                    <span className="text-xs font-bold px-3 py-1 rounded-xl bg-muted border border-border text-heading">
                      {proj.amountSanctioned}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <span className="text-xs font-semibold text-primary block">
                      {proj.role} • {proj.duration}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-heading mt-1 leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      {proj.fundingAgency}
                      {proj.grantNumber && (
                        <span className="font-mono text-heading block mt-0.5">
                          Grant Ref: {proj.grantNumber}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Instrumentation & Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-muted/80 text-heading text-[11px] font-medium border border-border/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outcomes & Milestones */}
                <div className="mt-6 pt-5 border-t border-border space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-heading flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent" /> Key Research Deliverables & Outcomes
                  </span>
                  <ul className="space-y-1.5">
                    {proj.outcomes.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
