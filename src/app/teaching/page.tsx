import { TeachingSection } from "@/components/home/TeachingSection";
import { AllSyllabiCatalog } from "@/components/teaching/AllSyllabiCatalog";
import Link from "next/link";
import { ArrowRight, Users, Award } from "lucide-react";

export const metadata = {
  title: "Teaching Portfolio & Curricula | Dr. Josephine Selle Jeyanathan",
  description:
    "Core and elective engineering courses in Electromagnetic Waves, Control Systems, IoT, Numerical Analysis, and DSP Laboratories.",
};

export default function TeachingPage() {
  return (
    <div className="w-full py-6">
      <TeachingSection />

      <AllSyllabiCatalog />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/mentorship"
            className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
          >
            <div>
              <span className="text-xs font-bold text-secondary flex items-center gap-1.5 uppercase">
                <Users className="w-3.5 h-3.5" /> Student Mentorship
              </span>
              <h3 className="text-base font-bold text-heading mt-1">
                Student Welfare & Capstone Mentoring
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                36 B.Tech batches, Avignon France tutoring, and MathWorks hackathons.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about#achievements"
            className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
          >
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 uppercase">
                <Award className="w-3.5 h-3.5" /> Pedagogical Awards
              </span>
              <h3 className="text-base font-bold text-heading mt-1">
                Teaching Competency Recognitions
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                IQAC Teaching Awards and Best Course Manual distinctions.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
