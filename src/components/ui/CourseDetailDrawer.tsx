"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  BookOpen,
  Cpu,
  CheckCircle,
  Award,
  Layers,
  ChevronRight,
  Printer,
  ChevronLeft,
} from "lucide-react";
import { Course } from "@/types";

interface CourseDetailDrawerProps {
  course: Course | null;
  courses: Course[];
  showAll?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailDrawer({
  course,
  courses,
  showAll = false,
  isOpen,
  onClose,
}: CourseDetailDrawerProps) {
  const [selectedId, setSelectedId] = useState<string>("all");

  useEffect(() => {
    if (showAll || !course) {
      setSelectedId("all");
    } else {
      setSelectedId(course.id);
    }
  }, [course, showAll, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCourse =
    selectedId === "all" ? null : courses.find((c) => c.id === selectedId) || courses[0];

  const currentIdx = currentCourse
    ? courses.findIndex((c) => c.id === currentCourse.id)
    : -1;

  const handlePrev = () => {
    if (courses.length === 0) return;
    const nextIdx = (currentIdx - 1 + courses.length) % courses.length;
    setSelectedId(courses[nextIdx].id);
  };

  const handleNext = () => {
    if (courses.length === 0) return;
    const nextIdx = (currentIdx + 1) % courses.length;
    setSelectedId(courses[nextIdx].id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border bg-muted/20 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                {selectedId === "all" ? "Comprehensive Curricula" : `${currentCourse?.category} Course`}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md border border-border text-muted-foreground">
                {selectedId === "all" ? `${courses.length} Courses Total` : currentCourse?.level}
              </span>
              {currentCourse?.code && selectedId !== "all" && (
                <span className="text-xs font-mono font-bold text-muted-foreground">
                  {currentCourse.code}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-heading leading-snug">
              {selectedId === "all"
                ? "All Courses & Instructional Syllabi"
                : currentCourse?.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedId === "all"
                ? "Full unit-by-unit curricula, laboratory integrations, software toolsets, and student competencies."
                : "Course syllabus breakdown, software lab tools, and pedagogical outcomes."}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors hidden sm:flex"
              title="Print Syllabus"
              aria-label="Print Syllabus"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
              title="Close Drawer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Navigation Tabs: View All vs Individual Courses */}
        <div className="px-6 py-3 border-b border-border bg-background/50 overflow-x-auto scrollbar-none flex items-center gap-2">
          <button
            onClick={() => setSelectedId("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedId === "all"
                ? "bg-primary text-white shadow-xs"
                : "bg-muted text-muted-foreground hover:text-heading"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View All ({courses.length})</span>
          </button>

          <div className="h-4 w-px bg-border shrink-0" />

          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedId === c.id
                  ? "bg-heading text-background font-bold shadow-xs"
                  : "bg-muted/70 text-muted-foreground hover:text-heading hover:bg-muted"
              }`}
            >
              {c.code || c.title.slice(0, 14)}
            </button>
          ))}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* VIEW ALL COURSES SYLLABI MODE */}
          {selectedId === "all" ? (
            <div className="space-y-8">
              {courses.map((c, idx) => (
                <div
                  key={c.id}
                  className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5 transition-all hover:border-primary/40"
                >
                  {/* Course Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border/60 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                          {c.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md border border-border text-muted-foreground">
                          {c.level}
                        </span>
                        {c.code && (
                          <span className="text-xs font-mono font-bold text-accent">
                            {c.code}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-heading">
                        {idx + 1}. {c.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => setSelectedId(c.id)}
                      className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline shrink-0"
                    >
                      <span>Focus view</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Course Description */}
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {c.description}
                  </p>

                  {/* Practical Component / Award Integration */}
                  {c.practicalIntegration && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/10 border border-accent/20 text-xs text-foreground">
                      <Award className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                      <div>
                        <span className="font-bold text-heading">Applied Practical Integration: </span>
                        <span>{c.practicalIntegration}</span>
                      </div>
                    </div>
                  )}

                  {/* Software & Tools */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-accent" /> Laboratory Software & Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.toolsUsed.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted border border-border text-heading"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Modules */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Syllabus Modules & Core Units
                    </span>
                    <ul className="space-y-2">
                      {c.syllabusHighlights.map((unit, uIdx) => (
                        <li
                          key={uIdx}
                          className="flex items-start gap-2.5 text-xs text-foreground/90 p-2.5 rounded-lg bg-muted/40 border border-border/50"
                        >
                          <span className="w-5 h-5 rounded-full bg-background border border-border text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                            {uIdx + 1}
                          </span>
                          <span className="leading-relaxed">{unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : currentCourse ? (
            /* SINGLE COURSE DRILL-DOWN MODE */
            <div className="space-y-6">
              {/* Practical Integration Notice */}
              {currentCourse.practicalIntegration && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 text-xs text-foreground leading-relaxed">
                  <Award className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                  <div>
                    <p className="font-bold text-heading">Applied Pedagogical Integration</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {currentCourse.practicalIntegration}
                    </p>
                  </div>
                </div>
              )}

              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-secondary" /> Course Overview & Scope
                </h4>
                <p className="text-sm text-card-foreground leading-relaxed">
                  {currentCourse.description}
                </p>
              </div>

              {/* Software & Tools */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-accent" /> Laboratory Software & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentCourse.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted border border-border text-heading"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syllabus Modules */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Syllabus Modules & Competencies
                </h4>
                <ul className="space-y-2.5">
                  {currentCourse.syllabusHighlights.map((unit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-card-foreground/90 leading-relaxed p-3 rounded-xl bg-muted/40 border border-border/50"
                    >
                      <span className="w-5 h-5 rounded-full bg-background border border-border text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{unit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
          {selectedId !== "all" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-heading"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Course</span>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-medium text-heading"
              >
                <span>Next Course</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              Showing complete curricula for {courses.length} courses
            </div>
          )}

          <div className="flex items-center gap-2">
            {selectedId !== "all" && (
              <button
                onClick={() => setSelectedId("all")}
                className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold"
              >
                View All Syllabi
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-heading hover:bg-muted transition-colors shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

