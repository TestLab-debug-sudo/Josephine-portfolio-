"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Award,
  CheckCircle,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

export function AllSyllabiCatalog() {
  const { courses } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedIds, setExpandedIds] = useState<string[]>(() =>
    courses.map((c) => c.id)
  );

  const categories = ["All", "Core", "Elective", "Laboratory"];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === "All") return true;
    return c.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setExpandedIds(courses.map((c) => c.id));
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  return (
    <section id="all-syllabi" className="py-12 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Full Syllabi Directory</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-3xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Complete Course Curricula & Syllabus Outlines
            </ScrollFloat>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Unit-by-unit curricula, laboratory software environments, hands-on
              competencies, and pedagogical outcomes across all {courses.length} courses.
            </p>
          </div>

          {/* Controls: Category Filter & Expand/Collapse All */}
          <FadeContent
            effect="focus"
            blur={4}
            duration={0.8}
            threshold={0.15}
            className="flex flex-wrap items-center gap-2.5"
          >
            {/* Category Pills */}
            <div className="flex items-center gap-1 p-1 bg-muted/60 border border-border rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted-foreground hover:text-heading"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Expand / Collapse All Toggle */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-heading text-xs font-semibold transition-colors"
                title="Expand All Syllabi"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-heading text-xs font-semibold transition-colors"
                title="Collapse All Syllabi"
              >
                Collapse All
              </button>
            </div>
          </FadeContent>
        </div>

        {/* Courses Syllabi Accordion Grid */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          duration={0.7}
          stagger={0.05}
          threshold={0.05}
          className="space-y-4"
        >
          {filteredCourses.map((course, idx) => {
            const isExpanded = expandedIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-primary/40 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleExpand(course.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 bg-muted/20 hover:bg-muted/40 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">
                        {course.level}
                      </span>
                      {course.code && (
                        <span className="text-xs font-mono font-bold text-accent">
                          {course.code}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-heading">
                      {idx + 1}. {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-4xl line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-card border border-border text-heading shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Accordion Expanded Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-border space-y-6 bg-card animate-fade-in">
                    {/* Practical Component Callout */}
                    {course.practicalIntegration && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 text-xs text-foreground">
                        <Award className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                        <div>
                          <p className="font-bold text-heading">Applied Pedagogical Integration</p>
                          <p className="mt-0.5 text-muted-foreground">
                            {course.practicalIntegration}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Laboratory Tools & Software */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-accent" /> Laboratory Software & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.toolsUsed.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-muted border border-border text-heading"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Full Syllabus Modules / Units */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Syllabus Modules & Core Competencies
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.syllabusHighlights.map((unit, uIdx) => (
                          <div
                            key={uIdx}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs leading-relaxed"
                          >
                            <span className="w-6 h-6 rounded-lg bg-background border border-border text-primary font-bold text-xs flex items-center justify-center shrink-0">
                              U{uIdx + 1}
                            </span>
                            <div>
                              <span className="font-bold text-heading block mb-0.5">
                                Unit {uIdx + 1} Module
                              </span>
                              <span className="text-card-foreground/90">{unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
