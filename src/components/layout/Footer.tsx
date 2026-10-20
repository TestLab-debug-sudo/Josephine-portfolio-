"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowUp, ExternalLink, Mail, Phone, MapPin, Award, Shield } from "lucide-react";
import { useData } from "@/context/DataContext";

export function Footer() {
  const { profile } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-card border-t border-border mt-24 pb-20 lg:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Identity & Institution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-heading leading-snug">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {profile.institution}
              <br />
              {profile.department}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Research & Lab Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-heading">
              Research Domains
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              {profile.researchInterests.slice(0, 5).map((interest, idx) => (
                <li key={idx} className="hover:text-card-foreground transition-colors">
                  <Link href={`/#research`}>{interest}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Identifiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-heading">
              Scholarly Profiles
            </h4>
            <div className="space-y-2">
              <a
                href={profile.identifiers.googleScholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted text-card-foreground transition-colors"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
              <a
                href={profile.identifiers.orcidId}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted text-card-foreground transition-colors"
              >
                <span>ORCID Record</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-card-foreground">
                <span className="text-muted-foreground">Scopus ID:</span>
                <span className="font-mono font-bold text-heading">{profile.identifiers.scopusId}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-card-foreground">
                <span className="text-muted-foreground">WoS Researcher:</span>
                <span className="font-mono font-bold text-heading">{profile.identifiers.wosResearcherId}</span>
              </div>
            </div>
          </div>

          {/* Academic Inquiries & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-heading">
              Academic Collaboration
            </h4>
            <div className="space-y-2 text-muted-foreground">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 hover:text-card-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phoneDisplay.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-card-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{profile.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted text-card-foreground hover:bg-card hover:border-primary transition-all font-medium"
              >
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Faculty CMS Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Citation Disclaimer & Top Button */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}. Reusable Universal Academic Portfolio. Built with Next.js 15, TypeScript & Tailwind CSS.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-card-foreground transition-all shadow-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
}
