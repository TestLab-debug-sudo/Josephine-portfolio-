import { HeroSection } from "@/components/home/HeroSection";
import { AcademicSnapshot } from "@/components/home/AcademicSnapshot";
import { FeaturedPublications } from "@/components/home/FeaturedPublications";
import { MobileHomeExperience } from "@/components/mobile/MobileHomeExperience";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import Link from "next/link";
import {
  Compass,
  Layers,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  Award,
  Mic2,
  Camera,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const portalCards = [
    {
      title: "Research, Projects & Papers",
      category: "Scientific Thrusts",
      description: "Medical Image Processing, Infrared Thermography, ₹76L DBT funded research grants, and 31+ peer-reviewed publications.",
      href: "/research",
      icon: Compass,
      color: "text-blue-500",
      stats: "Domains, ₹76L Grants & 31+ Papers",
    },
    {
      title: "Career & Education",
      category: "Academic Trajectory",
      description: "Ph.D. Anna University, M.E. Distinction, B.E., IGCAR JRF fellowship, and faculty appointments.",
      href: "/about#career",
      icon: Calendar,
      color: "text-purple-500",
      stats: "14 Years Experience",
    },
    {
      title: "Courses & Pedagogy",
      category: "Instructional Design",
      description: "Core and elective engineering curricula integrated with MATLAB, Simulink, and CST Studio Suite.",
      href: "/teaching",
      icon: GraduationCap,
      color: "text-indigo-500",
      stats: "UG & PG Syllabi",
    },
    {
      title: "Student Mentorship",
      category: "Student Welfare",
      description: "Mentoring 36 B.Tech batches, Avignon France ISIP tutoring, MATLAB Chapter, and MathWorks hackathons.",
      href: "/mentorship",
      icon: Users,
      color: "text-rose-500",
      stats: "36+ Cohorts",
    },
    {
      title: "Achievements & Honors",
      category: "Recognitions",
      description: "Teaching Competency awards, Best Course Manuals, IUCEE certification, and IIT Jammu AICTE-QIP.",
      href: "/about#achievements",
      icon: Award,
      color: "text-amber-600",
      stats: "16 Recognitions",
    },
    {
      title: "Conferences & Keynotes",
      category: "Global Outreach",
      description: "15+ invited keynotes at Jeju Korea, ISRO Mahendragiri, IEEE Madras, and national conference organizing.",
      href: "/conferences",
      icon: Mic2,
      color: "text-teal-500",
      stats: "15+ Keynotes",
    },
    {
      title: "Visual Photo Archive",
      category: "Field Engagements",
      description: "Moments from international research visits, laboratory instrumentation, student hackathons, and awards.",
      href: "/gallery",
      icon: Camera,
      color: "text-cyan-500",
      stats: "Photo Gallery",
    },
    {
      title: "Academic Collaboration",
      category: "Direct Inquiries",
      description: "Institutional coordinates at KARE, academic email, research collaborations, and prospective scholar guidance.",
      href: "/contact",
      icon: Mail,
      color: "text-primary",
      stats: "Get in Touch",
    },
  ];

  return (
    <div className="w-full">
      {/* 1. DEDICATED UNIVERSAL iPHONE / MOBILE UX (Active on < 768px) */}
      <div className="block md:hidden">
        <MobileHomeExperience />
      </div>

      {/* 2. EXISTING DESKTOP & TABLET EXPERIENCE (Completely preserved and untouched on >= 768px) */}
      <div className="hidden md:block">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Quantified Scholarly Metrics */}
        <AcademicSnapshot />

        {/* 4. Portals Grid: Navigation across all separate dedicated pages */}
        <section className="py-16 border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academic Sections</span>
                </div>
                <ScrollFloat
                  tag="h2"
                  textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
                  effect="float"
                  direction="up"
                >
                  Dedicated Academic Portals
                </ScrollFloat>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                Each academic domain is organized into its own dedicated section for focused exploration.
              </p>
            </div>

            <AnimatedContent
              distance={50}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              stagger={0.08}
              threshold={0.1}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {portalCards.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.title}
                    href={portal.href}
                    prefetch={true}
                    className="academic-card p-6 flex flex-col justify-between group hover:border-primary/50"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground uppercase">
                          {portal.category}
                        </span>
                        <span className="text-[11px] font-semibold text-primary">
                          {portal.stats}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl bg-muted/80 border border-border shrink-0 mt-0.5 ${portal.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-heading group-hover:text-primary transition-colors leading-snug">
                            {portal.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-primary group-hover:underline">
                      <span>Explore Section</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </AnimatedContent>
          </div>
        </section>

        {/* 5. Featured Publications Preview */}
        <FeaturedPublications />

        {/* 6. Separate Dedicated Academic Contact & Collaboration Gateway */}
        <section className="py-14 border-t border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeContent
              effect="mist"
              duration={1.2}
              threshold={0.15}
            >
              <div className="academic-card p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-primary/40 shadow-sm bg-card">
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Dedicated Contact & Collaboration Page</span>
                  </div>
                  <ScrollFloat
                    tag="h2"
                    textClassName="text-2xl sm:text-3xl font-extrabold text-heading"
                    effect="float"
                    direction="up"
                  >
                    Interested in Joint Research, Keynotes, or PG Supervision?
                  </ScrollFloat>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    Dr. Josephine Selle Jeyanathan welcomes inquiries for funded interdisciplinary research, keynote lectures, and research student mentoring. All direct coordinates and inquiry forms are maintained on the dedicated contact page.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-button text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 hover:shadow-sm transition-all shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Go to Contact Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeContent>
          </div>
        </section>
      </div>
    </div>
  );
}
