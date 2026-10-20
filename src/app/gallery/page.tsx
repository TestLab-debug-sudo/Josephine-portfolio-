"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Camera,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  RotateCw,
  Compass,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { GalleryItem, GalleryCategory } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import OrbitReel, { OrbitReelHandle, OrbitReelItem } from "@/components/ui/OrbitReel";

export default function GalleryPage() {
  const { gallery } = useData();
  const { resolvedMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Orbit Reel specific ref & view toggle
  const orbitReelRef = useRef<OrbitReelHandle>(null);
  const [orbitCurrentView, setOrbitCurrentView] = useState<"ring" | "arc">("arc");
  const [activeOrbitIndex, setActiveOrbitIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories: GalleryCategory[] = [
    "All",
    "Research & Labs",
    "International",
    "Conferences & Talks",
    "Student Mentorship",
    "Awards & Honors",
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  // Images formatted for Orbit Reel
  const orbitItems: OrbitReelItem[] = useMemo(() => {
    return filteredItems.map((item) => ({
      src: item.imageUrl,
      alt: item.title,
      title: item.title,
      subtitle: `${item.category} • ${item.dateOrYear} • ${item.location ?? "KARE"}`,
      category: item.category,
      location: item.location,
      dateOrYear: item.dateOrYear,
      tags: item.tags,
    }));
  }, [filteredItems]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const accentColorToken = "#0d6e48"; // Emerald Green

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Academic Visual Archive</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <ScrollFloat
                tag="h1"
                textClassName="text-3xl sm:text-5xl font-extrabold text-heading"
                effect="float"
                direction="up"
              >
                Photo Gallery & Field Engagements
              </ScrollFloat>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Visual documentation of international academic visits (Avignon University, France),
                global IEEE conferences (Jeju Korea), ISRO Mahendragiri research training,
                and state-of-the-art ₹74 Lakhs DBT biomedical lab setups.
              </p>
            </div>

            {/* View Mode Switcher Pills: Orbit Reel (Arc) / Grid Catalog */}
            <div className="flex items-center gap-1.5 p-1.5 bg-card border border-border rounded-2xl shadow-xs self-start lg:self-end">
              <button
                type="button"
                onClick={() => setViewMode("orbit")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === "orbit"
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-heading hover:bg-muted"
                }`}
              >
                <RotateCw className="w-3.5 h-3.5 text-accent" />
                <span>Orbit Reel (Arc)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-heading hover:bg-muted"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grid Catalog</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <FadeContent effect="focus" blur={4} duration={0.8} threshold={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-card border border-border rounded-2xl shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setLightboxIndex(null);
                    setActiveOrbitIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted-foreground hover:text-heading hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="px-3 py-1 text-[11px] text-muted-foreground font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{filteredItems.length} Milestones</span>
            </div>
          </div>
        </FadeContent>

        {/* MAIN VIEW AREA */}
        {viewMode === "orbit" ? (
          /* ORBIT REEL 3D EXPERIENCE: Turning wheel that sweeps into an arc */
          <div className="space-y-4">
            <div className="relative h-[520px] sm:h-[600px] md:h-[680px] w-full rounded-3xl border border-border shadow-elevated bg-card/60 backdrop-blur-md overflow-hidden flex flex-col">
              {/* Top Bar with Arc / Ring Switcher */}
              <div className="absolute top-4 right-4 pointer-events-auto z-20">
                <div className="flex items-center p-0.5 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      orbitReelRef.current?.setView("arc");
                      setOrbitCurrentView("arc");
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      orbitCurrentView === "arc"
                        ? "bg-primary text-white shadow-xs"
                        : "text-muted-foreground hover:text-heading"
                    }`}
                  >
                    Arc View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      orbitReelRef.current?.setView("ring");
                      setOrbitCurrentView("ring");
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      orbitCurrentView === "ring"
                        ? "bg-primary text-white shadow-xs"
                        : "text-muted-foreground hover:text-heading"
                    }`}
                  >
                    Ring View
                  </button>
                </div>
              </div>

              {/* Orbit Reel Component */}
              <OrbitReel
                ref={orbitReelRef}
                items={orbitItems}
                defaultView="arc"
                count={isMobile ? 12 : Math.min(20, Math.max(14, orbitItems.length))}
                spin={isMobile ? 3 : 6}
                autoplay={true}
                interval={isMobile ? 4.5 : 3.6}
                arc={isMobile ? 0.95 : 1.05}
                apex={isMobile ? 0.35 : 0.38}
                aspect={0.82}
                radius={0.08}
                gap={0.16}
                tilt={true}
                flipWave={true}
                accentColor={accentColorToken}
                captions={true}
                controls={true}
                draggable={true}
                wheel={true}
                pauseOnHover={true}
                zoomOnClick={true}
                onViewChange={(v) => setOrbitCurrentView(v)}
                onActiveChange={(_, idx) => setActiveOrbitIndex(idx)}
                onSelect={(_, idx) => setLightboxIndex(idx % filteredItems.length)}
                className="w-full h-full"
              >
                {/* Central Emblem inside Ring View */}
                <div className="flex flex-col items-center justify-center p-6 text-center max-w-xs">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3 shadow-xs">
                    <Compass className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Academic Visual Archive
                  </span>
                  <h3 className="text-sm font-bold text-heading mt-1">
                    Field Engagements Wheel
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Click any card to sweep into the arc view, or drag to turn
                  </p>
                </div>
              </OrbitReel>
            </div>
          </div>
        ) : (
          /* RESPONSIVE MASONRY / CARD GRID VIEW */
          <AnimatedContent
            key={selectedCategory}
            distance={35}
            direction="vertical"
            duration={0.7}
            stagger={0.06}
            threshold={0.05}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="academic-card overflow-hidden group cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay Badge & Expand Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </span>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {item.dateOrYear}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-card/90 backdrop-blur-md text-primary border border-border shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-heading group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    {item.location && (
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        {item.location}
                      </span>
                    )}
                    <span className="font-mono text-[11px] font-medium ml-auto">
                      {item.dateOrYear}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedContent>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {activeLightboxItem.category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image View */}
            <div className="relative aspect-[16/9] w-full bg-black/90">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                fill
                priority
                className="object-contain"
              />

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null
                      ? (prev - 1 + filteredItems.length) % filteredItems.length
                      : null
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null
                      ? (prev + 1) % filteredItems.length
                      : null
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption & Metadata */}
            <div className="p-6 space-y-3 bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-heading">
                  {activeLightboxItem.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {activeLightboxItem.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />{" "}
                      {activeLightboxItem.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />{" "}
                    {activeLightboxItem.dateOrYear}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed">
                {activeLightboxItem.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeLightboxItem.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
