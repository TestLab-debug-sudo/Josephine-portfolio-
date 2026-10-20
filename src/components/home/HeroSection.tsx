"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileDown,
  Mail,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { useToast } from "@/context/ToastContext";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-72 rounded-2xl border border-border/40 bg-card/20 animate-pulse flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-primary/10" />
        <div className="w-28 h-3 rounded bg-muted/60" />
        <div className="w-20 h-2 rounded bg-muted/40" />
      </div>
    </div>
  ),
});
import SplitText from "@/components/ui/SplitText";

export function HeroSection() {
  const { profile } = useData();
  const { showToast } = useToast();

  const handleDownloadCV = () => {
    showToast(
      "Curriculum Vitae",
      "Generating academic dossier and preparing print-ready CV...",
      "info"
    );
    window.print();
  };

  return (
    <section
      id="overview"
      className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden border-b border-border/40"
    >
      {/* Subtle Background Radial Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Academic Credentials & Identity */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Headline */}
            <div className="space-y-2">
              <SplitText
                text={profile.name}
                tag="h1"
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-heading leading-[1.12]"
                effect="rise"
                splitType="chars"
                delay={50}
                duration={1.25}
                staggerFrom="start"
                trigger="view"
                hoverEffect="lift"
                loop={false}
                loopDelay={1.5}
                mask={false}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
                {profile.tagline || (
                  <>
                    <span>{profile.title}</span>
                    <span> • </span>
                    <span>{profile.role}, Department of ECE</span>
                    <span> • </span>
                    <span className="text-primary font-semibold">{profile.institution}</span>
                  </>
                )}
              </p>
            </div>

            {/* Bio Summary / About */}
            <div className="text-xs sm:text-sm text-card-foreground/90 leading-relaxed max-w-2xl font-normal space-y-3">
              {profile.bioSummary.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>


            {/* CTA Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-button text-white text-xs sm:text-sm font-semibold hover:opacity-95 shadow-soft transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>

              <Link
                href="/research?tab=projects"
                prefetch={true}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-card-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                <span>Research Projects</span>
              </Link>

              <a
                href={profile.identifiers.googleScholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-card-foreground text-xs sm:text-sm font-medium transition-all"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/contact"
                prefetch={true}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-transparent hover:border-border text-muted-foreground hover:text-card-foreground text-xs sm:text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-secondary" />
                <span>Collaboration Inquiries</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic 3D Lanyard Academic Identity (No enclosing box or border) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-[580px] sm:h-[620px] select-none">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />

              {/* Seamless 3D Physics Lanyard Stage (No box, no border, transparent background) */}
              <Lanyard
                frontImage="/card-front.svg"
                backImage="/card-back.svg"
                imageFit="cover"
                cardColor="#ffffff"
                finish="glossy"
                orientation="portrait"
                metal="silver"
                strapColor="#21271b"
                size={0.7}
                strapLength={0.4}
                breeze={0.4}
                gravity={1}
                damping={0.45}
                elasticity={0.5}
                interactive={true}
                intro={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
