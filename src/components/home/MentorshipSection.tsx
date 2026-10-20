"use client";

import React from "react";
import { Users, Globe2, Award, Sparkles, Compass, Lightbulb } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";

export function MentorshipSection() {
  const mentorshipHighlights = [
    {
      title: "36+ B.Tech Batches Supervised",
      period: "2016 – Present",
      description:
        "Supervised capstone engineering projects leading to IEEE conference presentations, student hardware prototypes, and industrial patent disclosures in smart electronics and healthcare sensing.",
      icon: Users,
      badge: "Undergraduate Cohorts",
    },
    {
      title: "Visiting Tutor – 2025 ISIP Avignon University, France",
      period: "June 23 – July 26, 2025",
      description:
        "Supported and tutored the 2025 International Student Internship Program (ISIP) at CERI/LIA, Avignon University, France, guiding students in applied research and international collaborative engineering.",
      icon: Globe2,
      badge: "International Tutoring",
    },
    {
      title: "Advisor – MATLAB Student Chapter",
      period: "Continuous Faculty Role",
      description:
        "Guided hands-on computational modeling workshops, student certification drives, and coordinated two national hackathons in direct collaboration with MathWorks Bangalore.",
      icon: Sparkles,
      badge: "MathWorks Collaboration",
    },
    {
      title: "Project-to-Business Learning (P2BL) Champion",
      period: "AY 2024-25 IQAC Award",
      description:
        "Facilitated structured P2BL frameworks for second-year undergraduates, guiding students through ideation, PCB fabrication, microcontroller firmware, and commercial patent drafting.",
      icon: Lightbulb,
      badge: "Pedagogical Excellence",
    },
  ];

  return (
    <section className="py-20 bg-muted/20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Student Welfare & Mentorship</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Mentoring Tomorrow&apos;s Innovators
            </ScrollFloat>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Guiding undergraduate and postgraduate engineering scholars from classroom fundamentals to high-impact prototypes, international internships, and national hackathons.
          </p>
        </div>

        {/* Highlights Grid */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {mentorshipHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="academic-card p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {item.period}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-muted border border-border text-primary shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-heading leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed pl-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Mentorship Focus: Prototype Validation & Research Authorship</span>
                </div>
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
