import { MentorshipSection } from "@/components/home/MentorshipSection";
import Link from "next/link";
import { ArrowRight, GraduationCap, Camera } from "lucide-react";

export const metadata = {
  title: "Student Mentorship & Welfare | Dr. Josephine Selle Jeyanathan",
  description:
    "Mentoring 36 B.Tech batches, Avignon University France ISIP tutoring, MATLAB Student Chapter, and MathWorks hackathons.",
};

export default function MentorshipPage() {
  return (
    <div className="w-full py-6">
      <MentorshipSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/gallery"
            className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
          >
            <div>
              <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase">
                <Camera className="w-3.5 h-3.5" /> Visual Archive
              </span>
              <h3 className="text-base font-bold text-heading mt-1">
                View Student Hackathon & Lab Photos
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Moments from MathWorks competitions, Avignon visits, and hardware prototypes.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/teaching"
            className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
          >
            <div>
              <span className="text-xs font-bold text-secondary flex items-center gap-1.5 uppercase">
                <GraduationCap className="w-3.5 h-3.5" /> Instructional Design
              </span>
              <h3 className="text-base font-bold text-heading mt-1">
                Explore Engineering Course Syllabi
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Core and elective courses integrated with practical simulation tools.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
