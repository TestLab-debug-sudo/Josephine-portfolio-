"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { Course } from "@/types";
import { CourseDetailDrawer } from "@/components/ui/CourseDetailDrawer";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

export function TeachingSection() {
  const { courses } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDrawerCourse, setActiveDrawerCourse] = useState<Course | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerShowAll, setDrawerShowAll] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"stack" | "grid">("stack");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [outIndex, setOutIndex] = useState<number | null>(null);

  const categories = ["All", "Core", "Elective", "Laboratory"];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === "All") return true;
    return c.category === selectedCategory;
  });

  const count = filteredCourses.length;

  const handleNextCard = () => {
    if (count <= 1) return;
    setOutIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % count);

    setTimeout(() => {
      setOutIndex(null);
    }, 600);
  };

  const handlePrevCard = () => {
    if (count <= 1) return;
    setOutIndex(null);
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  const handleCardClick = (idx: number) => {
    if (idx !== currentIndex) {
      setOutIndex(currentIndex);
      setCurrentIndex(idx);
      setTimeout(() => {
        setOutIndex(null);
      }, 600);
    } else {
      handleNextCard();
    }
  };

  return (
    <>
      <section id="teaching" className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Pedagogical Portfolio</span>
              </div>
              <ScrollFloat
                tag="h2"
                textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
                effect="float"
                direction="up"
              >
                Courses & Instructional Design
              </ScrollFloat>
            </div>

            {/* Controls Bar: Category Filter Pills, View Mode Switcher, and View All Syllabi */}
            <FadeContent
              effect="focus"
              blur={4}
              duration={0.8}
              threshold={0.15}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 border border-border rounded-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentIndex(0);
                      setOutIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-white shadow-xs"
                        : "text-muted-foreground hover:text-heading"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Switcher: Stack vs Grid */}
              <div className="flex items-center gap-1 p-1 bg-muted/60 border border-border rounded-xl">
                <button
                  onClick={() => setViewMode("stack")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "stack"
                      ? "bg-card text-heading shadow-xs font-bold"
                      : "text-muted-foreground hover:text-heading"
                  }`}
                  title="3D Interactive Stack Deck"
                >
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span className="hidden sm:inline">Stack Deck</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "grid"
                      ? "bg-card text-heading shadow-xs font-bold"
                      : "text-muted-foreground hover:text-heading"
                  }`}
                  title="Standard Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Grid View</span>
                </button>
              </div>

              {/* View All Syllabi Action Button */}
              <button
                onClick={() => {
                  setActiveDrawerCourse(null);
                  setDrawerShowAll(true);
                  setIsDrawerOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all shadow-xs"
                title="View Full Syllabus for All Courses"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Full Syllabus (All {courses.length})</span>
              </button>
            </FadeContent>
          </div>

          {/* MODE 1: 3D INTERACTIVE STACK DECK (Requested Style) */}
          {viewMode === "stack" && (
            <div className="space-y-6">
              {/* Deck Subtitle & Flip Instructions */}
              <div className="flex items-center justify-between flex-wrap gap-3 text-xs text-muted-foreground max-w-xl mx-auto px-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Click card to cycle through course stack</span>
                </div>
                <div className="font-semibold text-heading">
                  Course {count > 0 ? currentIndex + 1 : 0} of {count}
                </div>
              </div>

              {/* The Stacking Cards Container */}
              <ul className="deck-cards">
                {filteredCourses.map((course, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isOut = idx === outIndex;
                  const isNext = idx === (currentIndex + 1) % count;
                  const isThird = idx === (currentIndex + 2) % count;

                  let stateClass = "hidden";
                  if (isCurrent) {
                    stateClass = "deck-card--current";
                  } else if (isOut) {
                    stateClass = "deck-card--out";
                  } else if (isNext) {
                    stateClass = "deck-card--next";
                  } else if (isThird && count > 2) {
                    stateClass = "deck-card--third";
                  }

                  return (
                    <li
                      key={course.id}
                      onClick={() => handleCardClick(idx)}
                      className={`deck-card ${stateClass} flex flex-col justify-between`}
                    >
                      <div className="space-y-4">
                        {/* Top Category & Course Code */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                            {course.category}
                          </span>
                          {course.code && (
                            <span className="text-xs font-mono font-extrabold text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                              {course.code}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-heading leading-tight">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Practical Component / Tool Integration */}
                        {course.practicalIntegration && (
                          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-xs text-foreground flex items-start gap-2.5">
                            <Award className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                            <span className="font-medium">
                              {course.practicalIntegration}
                            </span>
                          </div>
                        )}

                        {/* Software & Tools Tags */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {course.toolsUsed.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-semibold border border-border text-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: View Full Syllabus CTA */}
                      <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground font-medium italic">
                          Click card to flip
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDrawerCourse(course);
                            setDrawerShowAll(false);
                            setIsDrawerOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all"
                        >
                          <span>View Full Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Navigation Controls: Previous / Next & Indicator Dots */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handlePrevCard}
                  className="p-2.5 rounded-full border border-border bg-card hover:bg-muted text-heading shadow-xs transition-all hover:scale-105 active:scale-95"
                  title="Previous Course"
                  aria-label="Previous Course"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {filteredCourses.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => handleCardClick(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === currentIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-border hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to course ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextCard}
                  className="p-2.5 rounded-full border border-border bg-card hover:bg-muted text-heading shadow-xs transition-all hover:scale-105 active:scale-95"
                  title="Next Course"
                  aria-label="Next Course"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick View Full Syllabus for All Courses Action */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => {
                    setActiveDrawerCourse(null);
                    setDrawerShowAll(true);
                    setIsDrawerOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/50 text-heading hover:text-primary text-xs font-bold transition-all shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-secondary" />
                  <span>View Full Syllabus for All Courses ({courses.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: STANDARD 3-COLUMN GRID VIEW */}
          {viewMode === "grid" && (
            <div className="space-y-8 animate-fade-in">
              <AnimatedContent
                distance={35}
                direction="vertical"
                duration={0.7}
                stagger={0.06}
                threshold={0.05}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="academic-card p-6 flex flex-col justify-between group hover:border-primary/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                          {course.category}
                        </span>
                        {course.code && (
                          <span className="text-xs font-mono font-bold text-muted-foreground">
                            {course.code}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-heading group-hover:text-primary transition-colors leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-card-foreground/80 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>

                      {course.practicalIntegration && (
                        <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/15 text-[11px] text-primary flex items-start gap-2">
                          <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                          <span className="line-clamp-2">
                            {course.practicalIntegration}
                          </span>
                        </div>
                      )}

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {course.toolsUsed.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-muted text-[10px] font-medium border border-border text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex justify-end">
                      <button
                        onClick={() => {
                          setActiveDrawerCourse(course);
                          setDrawerShowAll(false);
                          setIsDrawerOpen(true);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                      >
                        <span>View Full Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </AnimatedContent>

              {/* Grid View All Syllabi Action */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => {
                    setActiveDrawerCourse(null);
                    setDrawerShowAll(true);
                    setIsDrawerOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 text-xs font-bold transition-all shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Full Syllabus Catalog (All {courses.length} Courses)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Detail Drawer Modal */}
      <CourseDetailDrawer
        course={activeDrawerCourse}
        courses={courses}
        showAll={drawerShowAll}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setActiveDrawerCourse(null);
          setDrawerShowAll(false);
        }}
      />
    </>
  );
}
