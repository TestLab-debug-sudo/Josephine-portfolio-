"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Languages,
  ArrowRight,
  Sparkles,
  Target,
  Mail,
  ExternalLink,
  Calendar,
  Award,
  Mic2,
  Cpu,
  GraduationCap,
  Users,
  ShieldCheck,
  Building,
  Briefcase,
  Phone,
  FileText,
  Globe,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import { CareerTimeline } from "@/components/home/CareerTimeline";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { AcademicActivity } from "@/components/home/AcademicActivity";
import { SoftwareSkillsGraph } from "@/components/about/SoftwareSkillsGraph";
import { SoftwareSkill, LanguageProficiency } from "@/types";

export default function AboutPage() {
  const { profile } = useData();

  const quickNav = [
    { label: "Objective & Vision", href: "#overview", icon: Target },
    { label: "Education Synopsis", href: "#education", icon: GraduationCap },
    { label: "Career & Education", href: "#career", icon: Calendar },
    { label: "Academic Recognitions & Certifications", href: "#achievements", icon: Award },
    { label: "Conferences & Talks", href: "#conferences", icon: Mic2 },
    { label: "Academic Leadership", href: "#responsibilities", icon: Briefcase },
    { label: "Technical Skills", href: "#skills", icon: Code },
    { label: "References & Dossier", href: "#references", icon: Globe },
  ];

  const educationHistory = [
    {
      degree: "Doctor of Philosophy (Ph.D.)",
      dateOrPeriod: "Completed 14.06.2019",
      institution: "Anna University, Chennai, India",
      thesisOrBoard: "Thesis: “Some Studies on Analysis of Breast Thermograms with Pattern Classification”",
      score: "Ph.D. Awarded",
      badgeClass: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/25",
    },
    {
      degree: "Master of Engineering (M.E.) in Communication Systems",
      dateOrPeriod: "2009 – 2011",
      institution: "National Engineering College, Kovilpatti",
      thesisOrBoard: "Department of Electronics and Communication Engineering",
      score: "Aggregate: 80.70% (First Class with Distinction)",
      badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    },
    {
      degree: "Bachelor of Engineering (B.E.) in Electronics and Communication Engineering",
      dateOrPeriod: "2005 – 2009",
      institution: "Karunya University, Coimbatore",
      thesisOrBoard: "School of Electrical and Computer Sciences",
      score: "Aggregate: 75.00% (First Class)",
      badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25",
    },
    {
      degree: "Higher Secondary Certificate (HSC) – Science Stream",
      dateOrPeriod: "2003 – 2005",
      institution: "Vivek Vidyalaya College of Science, Mumbai",
      thesisOrBoard: "Maharashtra State Board of Secondary and Higher Secondary Education, Pune",
      score: "Aggregate: 76.67%",
      badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25",
    },
    {
      degree: "Secondary School Certificate (SSLC)",
      dateOrPeriod: "2002 – 2003",
      institution: "St. Joseph’s High School, Mumbai",
      thesisOrBoard: "Maharashtra State Board of Secondary and Higher Secondary Education, Pune",
      score: "Aggregate: 78.13% (Distinction)",
      badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
    },
  ];

  const nationalReferences = [
    {
      name: "Dr. D Devaraj",
      designation: "Senior Professor, Department of Electrical & Electronics Engineering",
      institution: "Kalasalingam Academy of Research and Education, Krishnankoil – 626 126",
      email: "deva230@yahoo.com",
    },
    {
      name: "Dr. A Shenbagavalli",
      designation: "Director of Academics",
      institution: "National Engineering College, Kovilpatti",
      email: "shenbanec@gmail.com",
    },
    {
      name: "Dr. S L Mannan",
      designation: "Former Outstanding Scientist & Director, Metallurgy & Materials Group",
      institution: "Indira Gandhi Centre for Atomic Research (IGCAR), Kalpakkam",
      email: "sardari.mannan@gmail.com",
    },
  ];

  const internationalReferences = [
    {
      name: "Prof. Abderrahim Benslimane, SIEEE",
      designation: "Professor of Computer Sciences",
      institution: "CERI/LIA, University of Avignon, 339 Chemin des Meinajaries, 84911 Avignon Cedex 9, France",
      email: "abderrahim.benslimane@univ-avignon.fr",
    },
    {
      name: "Dr. Kalaivani Chellappan, Ph.D.",
      designation: "Associate Professor, Department of Electrical, Electronic & Systems Engineering",
      institution: "Faculty of Engineering & Built Environment, Universiti Kebangsaan Malaysia (UKM), 43600 UKM Bangi, Selangor, Malaysia",
      email: "kckalai@ukm.edu.my",
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Header Banner & Quick Jump Nav */}
      <section className="border-b border-border/40 bg-gradient-to-b from-card via-background to-background py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Curriculum Vitae & Scholar Dossier</span>
              </div>
              <ScrollFloat
                tag="h1"
                textClassName="text-3xl sm:text-5xl font-extrabold text-heading tracking-tight"
                effect="float"
                direction="up"
              >
                {profile.name}
              </ScrollFloat>
              <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed max-w-2xl">
                {profile.tagline || `${profile.role} • ${profile.department} • ${profile.institution}`}
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 shadow-xs transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Dr. Josephine</span>
              </Link>
              <a
                href="tel:+919940706395"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-muted text-heading transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+91-994-070-6395</span>
              </a>
            </div>
          </div>

          {/* Quick Jump In-Page Anchor Pill Dock */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Quick Dossier Directory:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {quickNav.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-border hover:border-primary/50 text-card-foreground text-xs font-semibold shrink-0 hover:bg-primary/5 transition-all shadow-xs"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview & Academic Mission Section */}
      <section id="overview" className="py-12 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Biographical Overview & Background */}
          <FadeContent
            effect="focus"
            blur={6}
            duration={0.8}
            threshold={0.1}
          >
            <div className="academic-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-heading">About Dr. Josephine</h2>
                  <p className="text-xs text-muted-foreground">Scholarly Background, Professional Affiliations & Pedagogies</p>
                </div>
              </div>
              <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
                {profile.bioSummary.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </FadeContent>

          <AnimatedContent
            distance={40}
            direction="vertical"
            duration={0.8}
            stagger={0.1}
            threshold={0.1}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Career Objective */}
            <div className="academic-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-heading">Career Objective</h2>
                  <p className="text-xs text-muted-foreground">Professional Mission & Ethos</p>
                </div>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {profile.careerObjective}
              </p>
              <div className="pt-2">
                <p className="text-xs italic text-muted-foreground border-l-2 border-primary/40 pl-3">
                  &quot;I firmly believe in the principle of implementing my duties with dedication and determination, subjected and utilized for the benefit of the organization and society.&quot;
                </p>
              </div>
            </div>

            {/* Research Specializations & Areas of Interest */}
            <div className="academic-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-heading">Areas of Interest</h2>
                  <p className="text-xs text-muted-foreground">Primary Scientific Thrusts & Specializations</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {profile.researchInterests.map((interest: string, idx: number) => (
                  <div
                    key={`interest-${idx}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/60 border border-border/70 text-xs font-semibold text-heading shadow-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* 3. Edifying Synopsis (Complete Formal Educational Qualifications) */}
      <section id="education" className="py-14 border-b border-border/40 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Degrees & Schooling</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Edifying Synopsis
            </ScrollFloat>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Complete trajectory of formal qualifications from secondary schooling in Mumbai through Anna University doctoral research.
            </p>
          </div>

          <AnimatedContent
            distance={30}
            direction="vertical"
            duration={0.7}
            stagger={0.06}
            threshold={0.08}
            className="grid grid-cols-1 gap-4"
          >
            {educationHistory.map((edu, idx) => (
              <div
                key={`edu-${idx}`}
                className="academic-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-all"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-muted-foreground px-2 py-0.5 rounded bg-muted">
                      {edu.dateOrPeriod}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${edu.badgeClass}`}>
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-heading leading-snug">
                    {edu.degree}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-primary">
                    {edu.institution}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {edu.thesisOrBoard}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center justify-end gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="hidden sm:inline text-[11px]">Verified</span>
                </div>
              </div>
            ))}
          </AnimatedContent>
        </div>
      </section>

      {/* 4. Interactive Animated Career & Education Timeline (Starts from 2005 – 2009) */}
      <CareerTimeline />

      {/* 5. Notable Achievements, Grants & Honors */}
      <AchievementsSection />

      {/* 6. Conferences, Invited Keynotes & Academic Activities */}
      <AcademicActivity />

      {/* 7. Academic Responsibilities & Student Welfare Contributions */}
      <section id="responsibilities" className="py-16 border-b border-border/40 bg-muted/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Administrative Leadership & Student Welfare</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="wave"
              direction="up"
            >
              Academic Responsibilities & Contributions
            </ScrollFloat>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Academic Responsibilities Card */}
            <div className="academic-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">Institutional & Department Roles</h3>
                  <p className="text-xs text-muted-foreground">Academic Administration & Curriculum Leadership</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-card-foreground/90">
                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Examination In-Charge & Non-CGPA Coordinator</p>
                  <p className="text-muted-foreground">
                    Managing departmental examination logistics, evaluation oversight, and non-CGPA credit certifications at KARE.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Coordinator – Industry-Based Curriculum Development</p>
                  <p className="text-muted-foreground">
                    Spearheaded the design and implementation of industry-aligned courses such as C Programming and Data Structures in collaboration with Nanochip Solutions, Bangalore and MathWorks, Bangalore.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Department-Level Faculty Mentorship Roles</p>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground pt-1">
                    <li><strong className="text-heading">Faculty Advisor:</strong> Guided students in academic progression and professional career planning.</li>
                    <li><strong className="text-heading">Class Coordinator:</strong> Ensured disciplined academic delivery and active student engagement.</li>
                    <li><strong className="text-heading">Course Coordinator:</strong> Managed instructional design, lecture delivery, and course manual preparation.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Students Welfare & Mentorship Contributions */}
            <div className="academic-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">Student Welfare & Mentorship</h3>
                  <p className="text-xs text-muted-foreground">Empowering Student Innovation & Hackathons</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-card-foreground/90">
                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Academic Project Supervision: 36 Batches</p>
                  <p className="text-muted-foreground">
                    Supervised 36 B.Tech student batches since 2016 till date, yielding publications, conference presentations, and IoT prototypes.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Advisor, MATLAB Student Chapter</p>
                  <p className="text-muted-foreground">
                    Mentored workshops, technical training sessions, and hands-on algorithm prototyping for undergraduate students.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">National Hackathons with MathWorks</p>
                  <p className="text-muted-foreground">
                    Coordinated two national-level hackathons in collaboration with MathWorks, Bangalore to foster creative problem-solving.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border/80 space-y-1">
                  <p className="font-bold text-heading text-sm">Facilitated Project-to-Business Learning (P2BL)</p>
                  <p className="text-muted-foreground">
                    Facilitated P2BL for second-year students, encouraging practical hardware prototype development and patent filing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Technical Proficiencies, Languages & Scholarly Identifiers */}
      <section id="skills" className="py-16 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Code className="w-3.5 h-3.5" />
              <span>Technical & Scientific Foundations</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="flip"
              direction="up"
            >
              Software Skills, Languages & Academic IDs
            </ScrollFloat>
          </div>

          {/* Interactive Animated Software Skills Graph (Hero Full Width Dashboard) */}
          <SoftwareSkillsGraph />

          {/* Languages & Scholarly Profiles (Balanced 2-Column Side-by-Side Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
            {/* Languages Known */}
            <div className="academic-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Languages className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-heading">Languages Known</h3>
                      <p className="text-xs text-muted-foreground">Scholarly, National &amp; Regional Fluency</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    5 Languages
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {profile.languages.map((lang: LanguageProficiency, idx: number) => {
                    const isFullFluency = lang.level.includes("Fluent");
                    const isConversational = lang.level.includes("Conversational");
                    return (
                      <div
                        key={`lang-${idx}`}
                        className={`p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:border-purple-500/40 hover:bg-muted/40 ${
                          idx === 4 ? "sm:col-span-2" : ""
                        } bg-muted/30 border-border/70`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-heading">{lang.language}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isFullFluency
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25"
                                : isConversational
                                ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25"
                                : "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25"
                            }`}
                          >
                            {isFullFluency ? "Fluent" : isConversational ? "Conversational" : "Beginner"}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1.5 font-medium leading-tight">
                          {lang.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>Pan-Indian &amp; International Academic Fluency</span>
                <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 font-bold">Multilingual Scholar</span>
              </div>
            </div>

            {/* Scholarly Identifiers */}
            <div className="academic-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-heading">Scholarly Identifiers</h3>
                      <p className="text-xs text-muted-foreground">Indexed Databases &amp; Academic Registries</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    Verified Registries
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <a
                    href={profile.identifiers.googleScholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border/80 bg-card hover:border-teal-500/50 hover:bg-muted/40 transition-all flex flex-col justify-between group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-heading text-sm">Google Scholar</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-2 font-mono">
                      Citations, h-index &amp; Metrics
                    </span>
                  </a>

                  <a
                    href={profile.identifiers.orcidId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border/80 bg-card hover:border-teal-500/50 hover:bg-muted/40 transition-all flex flex-col justify-between group shadow-xs hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-heading text-sm">ORCID iD</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-2 font-mono truncate">
                      {profile.identifiers.orcidId.replace("https://orcid.org/", "")}
                    </span>
                  </a>

                  <div className="p-3.5 rounded-xl border border-border/80 bg-card flex flex-col justify-between shadow-xs">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      Scopus Author ID
                    </span>
                    <span className="font-mono font-bold text-foreground text-sm mt-1">
                      {profile.identifiers.scopusId}
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-1">
                      Elsevier Scopus Indexed
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/80 bg-card flex flex-col justify-between shadow-xs">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      WoS Researcher ID
                    </span>
                    <span className="font-mono font-bold text-foreground text-sm mt-1">
                      {profile.identifiers.wosResearcherId}
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-1">
                      Clarivate Analytics Indexed
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 text-[11px] text-muted-foreground font-medium flex items-center justify-between">
                <span>Officially Indexed in Scopus, WoS &amp; ORCID</span>
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold">100% Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. National & International Academic References */}
      <section id="references" className="py-16 border-b border-border/40 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Academic References & Endorsements</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              National & International References
            </ScrollFloat>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Distinguished senior professors, research directors, and global research collaborators.
            </p>
          </div>

          <div className="space-y-8">
            {/* National References */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <span>National References (India)</span>
              </h3>
              <FadeContent
                effect="focus"
                blur={4}
                duration={0.8}
                stagger={0.08}
                threshold={0.1}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {nationalReferences.map((ref, idx) => (
                  <div key={`nat-${idx}`} className="academic-card p-5 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-heading">{ref.name}</h4>
                      <p className="text-xs font-semibold text-primary">{ref.designation}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{ref.institution}</p>
                    </div>
                    <a
                      href={`mailto:${ref.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline pt-2 border-t border-border"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ref.email}</span>
                    </a>
                  </div>
                ))}
              </FadeContent>
            </div>

            {/* International References */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>International References (France & Malaysia)</span>
              </h3>
              <FadeContent
                effect="focus"
                blur={4}
                duration={0.8}
                stagger={0.08}
                threshold={0.1}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {internationalReferences.map((ref, idx) => (
                  <div key={`intl-${idx}`} className="academic-card p-6 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-heading">{ref.name}</h4>
                      <p className="text-xs font-semibold text-primary">{ref.designation}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{ref.institution}</p>
                    </div>
                    <a
                      href={`mailto:${ref.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline pt-2 border-t border-border"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{ref.email}</span>
                    </a>
                  </div>
                ))}
              </FadeContent>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Biographical Dossier & Avowal */}
      <section className="py-14 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academic-card p-8 sm:p-10 space-y-6 bg-card border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-heading">Biographical Details & Institutional Affiliation</h3>
                <p className="text-xs text-muted-foreground">Certified Personal Dossier</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5">
                <span className="text-muted-foreground font-semibold">Date of Birth:</span>
                <p className="font-bold text-heading text-sm">01-07-1987</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5">
                <span className="text-muted-foreground font-semibold">Father&apos;s Name:</span>
                <p className="font-bold text-heading text-sm">S Jeyanathan</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5">
                <span className="text-muted-foreground font-semibold">Marital Status & Spouse:</span>
                <p className="font-bold text-heading text-sm">Married • Antony Infant Nishanth</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5">
                <span className="text-muted-foreground font-semibold">Passport Number:</span>
                <p className="font-mono font-bold text-heading text-sm">Z6310708</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5 sm:col-span-2">
                <span className="text-muted-foreground font-semibold">Permanent Address:</span>
                <p className="font-medium text-heading">310 SPG Koil, Keela Shanmugapuram, Tuticorin – 628002, Tamil Nadu, India.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-0.5 sm:col-span-2 lg:col-span-3">
                <span className="text-muted-foreground font-semibold">Corresponding Address:</span>
                <p className="font-medium text-heading">5/674 A Andal Nagar 1st Street, Krishnankovil, Virudhunagar Dist. 626 138, Tamil Nadu, India.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/70 text-xs text-muted-foreground italic leading-relaxed">
              <strong className="text-heading font-semibold not-italic">Avowal: </strong>
              It is therefore asserted that this document is an interpretation of my edificial and supplemental application, and the information specified here is true to the finest of my comprehension.
            </div>
          </div>
        </div>
      </section>

      {/* 11. Next Portals Navigation Footer */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-base font-bold text-heading">Explore Other Academic Portals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/research"
              className="academic-card p-5 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">5 Scientific Thrusts</p>
                <p className="text-sm font-bold text-heading">Research Domains</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/research?tab=projects"
              className="academic-card p-5 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">₹76L Grants (₹74L DBT + ₹2L Seed)</p>
                <p className="text-sm font-bold text-heading">Sponsored Projects</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/research?tab=publications"
              className="academic-card p-5 flex items-center justify-between group hover:border-primary/50"
            >
              <div>
                <p className="text-xs text-muted-foreground font-medium">31+ Indexed Publications & BibTeX</p>
                <p className="text-sm font-bold text-heading">Publications Library</p>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
