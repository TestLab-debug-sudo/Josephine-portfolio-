import { AcademicActivity } from "@/components/home/AcademicActivity";
import Link from "next/link";
import { ArrowRight, Camera, BookOpen } from "lucide-react";

export const metadata = {
  title: "Conferences, Keynotes & Outreach | Dr. Josephine Selle Jeyanathan",
  description:
    "15+ invited guest lectures, session chair roles, ISRO collaborative workshops, and organized national conferences (VOICE '18, TCAD, AICTE-ATAL).",
};

export default function ActivityPage() {
  return (
    <div className="w-full py-6">
      <AcademicActivity />

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
                View Conference & Workshop Photos
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Snapshots from TENCON Korea, ISRO sessions, and national conferences.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/research?tab=publications"
            className="academic-card p-6 flex items-center justify-between group hover:border-primary/50"
          >
            <div>
              <span className="text-xs font-bold text-secondary flex items-center gap-1.5 uppercase">
                <BookOpen className="w-3.5 h-3.5" /> Publications
              </span>
              <h3 className="text-base font-bold text-heading mt-1">
                Browse Conference Proceedings & Papers
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                IEEE TENCON, INCCES, ICESC, ICRITO, and Springer proceedings.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
