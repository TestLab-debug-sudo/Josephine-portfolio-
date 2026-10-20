"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  Compass,
  BookOpen,
  Layers,
  Calendar,
  Mic2,
  Award,
  Users,
  Camera,
  Mail,
  FileDown,
  ShieldCheck,
  Grid,
  Sparkles,
} from "lucide-react";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { useToast } from "@/context/ToastContext";

export function MobileNav() {
  const pathname = usePathname();
  const { showToast } = useToast();
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  // 5-Tab iOS Bottom Dock
  const primaryTabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: GraduationCap },
    { label: "Research", href: "/research", icon: Compass },
    { label: "Teaching", href: "/teaching", icon: BookOpen },
  ];

  // Secondary academic portals opened in bottom sheet
  const secondaryPortals = [
    {
      title: "Student Mentorship",
      href: "/mentorship",
      icon: Users,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      subtitle: "36+ Cohorts & Hackathons",
    },
    {
      title: "Photo Archive",
      href: "/gallery",
      icon: Camera,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      subtitle: "Field Moments & Labs",
    },
    {
      title: "Contact Portal",
      href: "/contact",
      icon: Mail,
      color: "text-primary",
      bg: "bg-primary/10",
      subtitle: "Direct Scholar Coordinates",
    },
  ];

  const handleDownloadCV = () => {
    setIsMoreSheetOpen(false);
    showToast(
      "Academic Dossier",
      "Preparing print-ready Curriculum Vitae...",
      "info"
    );
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const isMoreActive = secondaryPortals.some((p) => pathname === p.href);

  return (
    <>
      {/* Dedicated iOS-style Bottom Dock (visible only on mobile: block md:hidden) */}
      <nav
        aria-label="Mobile Navigation"
        className="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/92 backdrop-blur-xl border-t border-border/80 px-2 pt-1 shadow-elevated"
        style={{
          paddingBottom: "max(0.6rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.label}
                href={tab.href}
                prefetch={true}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-2xl transition-all ${
                  isActive
                    ? "text-primary font-bold scale-105"
                    : "text-muted-foreground hover:text-heading"
                }`}
              >
                <div
                  className={`p-1 rounded-xl transition-colors ${
                    isActive ? "bg-primary/15 text-primary" : "bg-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* "More" Trigger Tab for Bottom Sheet */}
          <button
            type="button"
            onClick={() => setIsMoreSheetOpen(true)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-2xl transition-all ${
              isMoreActive || isMoreSheetOpen
                ? "text-primary font-bold scale-105"
                : "text-muted-foreground hover:text-heading"
            }`}
            aria-label="Open more academic portals"
            aria-expanded={isMoreSheetOpen}
          >
            <div
              className={`p-1 rounded-xl transition-colors ${
                isMoreActive || isMoreSheetOpen
                  ? "bg-primary/15 text-primary"
                  : "bg-transparent"
              }`}
            >
              <Grid className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 leading-none">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* iOS-Inspired Expandable Secondary Bottom Sheet */}
      <MobileBottomSheet
        isOpen={isMoreSheetOpen}
        onClose={() => setIsMoreSheetOpen(false)}
        title="Academic Portals"
        subtitle="Explore specific research domains, pedagogy, and credentials"
      >
        <div className="space-y-4">
          {/* Secondary Portals 2-Column Grid */}
          <div className="grid grid-cols-2 gap-2">
            {secondaryPortals.map((portal) => {
              const Icon = portal.icon;
              const isActive = pathname === portal.href;

              return (
                <Link
                  key={portal.title}
                  href={portal.href}
                  prefetch={true}
                  onClick={() => setIsMoreSheetOpen(false)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col justify-between min-h-[82px] ${
                    isActive
                      ? "border-primary bg-primary/10 text-heading font-semibold"
                      : "border-border/60 bg-muted/40 hover:bg-muted text-card-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${portal.bg} ${portal.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-bold leading-tight">
                      {portal.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {portal.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Dossier & Faculty Actions */}
          <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
            <button
              onClick={handleDownloadCV}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs touch-target transition-transform active:scale-[0.98]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Academic Dossier (CV)</span>
            </button>

            <Link
              href="/admin"
              onClick={() => setIsMoreSheetOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-muted text-muted-foreground hover:text-heading font-semibold text-xs border border-border/60 touch-target"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Faculty Admin Workspace</span>
            </Link>
          </div>
        </div>
      </MobileBottomSheet>
    </>
  );
}
