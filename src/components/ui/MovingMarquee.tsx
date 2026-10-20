"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Globe2,
  Cpu,
  Layers,
} from "lucide-react";

export function MovingMarquee() {
  const tickerItems = [
    {
      icon: Layers,
      text: "Principal Investigator: DBT Sanctioned Grant ₹74,00,000",
      category: "National Grant",
      href: "/research?tab=projects",
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      icon: GraduationCap,
      text: "Ph.D. in Information & Communication Engineering — Anna University",
      category: "Doctorate",
      href: "/career",
      badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      icon: BookOpen,
      text: "31+ Peer-Reviewed Articles in Scopus & Web of Science",
      category: "Scholarship",
      href: "/research?tab=publications",
      badgeClass: "bg-primary/10 text-primary border-primary/20",
    },
    {
      icon: Globe2,
      text: "Visiting Tutor — 2025 ISIP Program at Avignon University, France",
      category: "International",
      href: "/mentorship",
      badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      icon: Award,
      text: "International Engineering Educator Certified (IIEECP — IUCEE)",
      category: "Pedagogy",
      href: "/achievements",
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    {
      icon: Cpu,
      text: "AICTE-QIP Postgraduate Fellow on IoT at IIT Jammu",
      category: "IIT Jammu",
      href: "/achievements",
      badgeClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
    {
      icon: Sparkles,
      text: "Best Teaching Competence & P2BL Implementation Awardee",
      category: "Excellence",
      href: "/achievements",
      badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
    {
      icon: ShieldCheck,
      text: "Life Member — Biomedical Engineering Society of India (BMESI)",
      category: "Professional Body",
      href: "/achievements",
      badgeClass: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    },
  ];

  // Duplicate the array once for seamless infinite continuous scroll
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-card/60 backdrop-blur-md border-y border-border/80 overflow-hidden py-3 select-none relative">
      {/* Side Fade Mask Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Moving Ribbon */}
      <div className="animate-marquee flex items-center gap-6 text-xs">
        {duplicatedItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-background border border-border hover:border-primary/50 text-card-foreground transition-all shrink-0 hover:scale-102 group shadow-xs"
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeClass}`}
              >
                {item.category}
              </span>
              <Icon className="w-3.5 h-3.5 text-primary shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="font-semibold text-heading tracking-tight whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-muted-foreground/40 font-mono pl-1">✦</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
