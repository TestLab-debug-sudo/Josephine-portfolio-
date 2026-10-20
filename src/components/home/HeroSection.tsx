"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileDown,
  Mail,
  ExternalLink,
  BookOpen,
  ArrowRight,
  IndianRupee,
  Users,
  Mic2,
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

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1400;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Silky easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

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
            {/* Top Animated Announcement Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/research?tab=projects"
                prefetch={true}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs hover:bg-emerald-500/15 transition-all group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-bold">Active National Grant:</span>
                <span className="truncate max-w-[240px] sm:max-w-[340px]">
                  DBT Sanctioned ₹74L Diabetic Foot IR Device
                </span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

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

            {/* Quick Metrics Badges with Animated Count-Up, Spring Entrance & Hover Shimmer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {[
                {
                  label: "National Grant",
                  value: 74,
                  prefix: "₹",
                  suffix: " Lakhs",
                  subtitle: "DBT Sanctioned",
                  href: "/research?tab=projects",
                  icon: IndianRupee,
                  badgeColor: "text-emerald-700 dark:text-emerald-300",
                  glowColor: "hover:border-emerald-500/50 hover:shadow-[0_10px_25px_-4px_rgba(13,110,72,0.20)] dark:hover:shadow-[0_10px_25px_-4px_rgba(52,211,153,0.22)]",
                  dotColor: "bg-emerald-500",
                  gradientColor: "from-emerald-500/10 via-transparent to-transparent",
                },
                {
                  label: "Publications",
                  value: 31,
                  prefix: "",
                  suffix: "+ Articles",
                  subtitle: "Scopus / WoS",
                  href: "/research?tab=publications",
                  icon: BookOpen,
                  badgeColor: "text-primary",
                  glowColor: "hover:border-primary/50 hover:shadow-[0_10px_25px_-4px_rgba(13,110,72,0.20)] dark:hover:shadow-[0_10px_25px_-4px_rgba(52,211,153,0.22)]",
                  dotColor: "bg-primary",
                  gradientColor: "from-primary/10 via-transparent to-transparent",
                },
                {
                  label: "Mentorship",
                  value: 36,
                  prefix: "",
                  suffix: " Batches",
                  subtitle: "B.Tech Innovations",
                  href: "/mentorship",
                  icon: Users,
                  badgeColor: "text-secondary",
                  glowColor: "hover:border-secondary/50 hover:shadow-[0_10px_25px_-4px_rgba(226,67,41,0.20)] dark:hover:shadow-[0_10px_25px_-4px_rgba(255,107,87,0.22)]",
                  dotColor: "bg-secondary",
                  gradientColor: "from-secondary/10 via-transparent to-transparent",
                },
                {
                  label: "Invited Talks",
                  value: 15,
                  prefix: "",
                  suffix: "+ Keynotes",
                  subtitle: "ISRO, IEEE, Jeju",
                  href: "/activity",
                  icon: Mic2,
                  badgeColor: "text-accent",
                  glowColor: "hover:border-accent/50 hover:shadow-[0_10px_25px_-4px_rgba(226,67,41,0.20)] dark:hover:shadow-[0_10px_25px_-4px_rgba(255,107,87,0.22)]",
                  dotColor: "bg-accent",
                  gradientColor: "from-accent/10 via-transparent to-transparent",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.025,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      className={`block p-3 sm:p-3.5 rounded-2xl bg-card border border-border transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden ${item.glowColor}`}
                    >
                      {/* Ambient Corner Gradient */}
                      <div
                        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${item.gradientColor} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`}
                      />

                      {/* Shimmer sweep effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 dark:via-white/5 to-transparent pointer-events-none" />

                      {/* Top Label & Micro Icon */}
                      <div className="flex items-center justify-between gap-1 mb-1 relative z-10">
                        <p className="text-[11px] font-medium text-muted-foreground truncate">
                          {item.label}
                        </p>
                        <Icon className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 group-hover:scale-115 duration-200" />
                      </div>

                      {/* Main Animated Number */}
                      <p className="text-lg sm:text-xl font-extrabold text-heading group-hover:text-primary transition-colors tracking-tight relative z-10">
                        <AnimatedCounter
                          target={item.value}
                          prefix={item.prefix}
                          suffix={item.suffix}
                        />
                      </p>

                      {/* Subtitle with Animated Pulse Dot */}
                      <div className="flex items-center gap-1.5 mt-0.5 relative z-10">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.dotColor} animate-pulse shrink-0`}
                        />
                        <p className={`text-[10px] font-bold ${item.badgeColor} truncate`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
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
                <span>Active Grants</span>
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
