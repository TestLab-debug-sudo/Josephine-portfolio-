"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Quote, ArrowRight, ShieldCheck } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Publication } from "@/types";
import { CitationModal } from "@/components/ui/CitationModal";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

export function FeaturedPublications() {
  const { publications } = useData();
  const [selectedCitationPub, setSelectedCitationPub] = useState<Publication | null>(null);

  const featured = publications.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      <section className="py-20 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Selected Scholarship</span>
              </div>
              <ScrollFloat
                tag="h2"
                textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
                effect="float"
                direction="up"
              >
                Featured Peer-Reviewed Publications
              </ScrollFloat>
            </div>
            <Link
              href="/research?tab=publications"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              <span>Explore All {publications.length} Publications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <AnimatedContent
            distance={40}
            direction="vertical"
            duration={0.8}
            ease="power3.out"
            stagger={0.08}
            threshold={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((pub) => (
              <div
                key={pub.id}
                className="academic-card p-6 flex flex-col justify-between group hover:border-primary/50"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                      {pub.type.replace("-", " ")}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-border text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {pub.indexing}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-heading group-hover:text-primary transition-colors line-clamp-3 leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {pub.authors.join(", ")}
                  </p>

                  {/* Venue & Year */}
                  <p className="text-xs font-semibold text-secondary">
                    {pub.venue} ({pub.year})
                  </p>

                  {/* Abstract preview if available */}
                  {pub.abstract && (
                    <p className="text-xs text-card-foreground/80 line-clamp-3 leading-relaxed pt-1">
                      {pub.abstract}
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedCitationPub(pub)}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-heading font-medium transition-colors"
                  >
                    <Quote className="w-3.5 h-3.5 text-primary" />
                    <span>Cite</span>
                  </button>

                  {pub.doi ? (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline font-semibold"
                    >
                      <span>DOI Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">Scopus Verified</span>
                  )}
                </div>
              </div>
            ))}
          </AnimatedContent>

          {/* Bottom Banner */}
          <FadeContent
            effect="focus"
            blur={6}
            duration={0.9}
            threshold={0.15}
          >
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-heading">
                  Comprehensive Academic Bibliography
                </h4>
                <p className="text-xs text-muted-foreground">
                  Access full citations, BibTeX export files, conference proceedings (IEEE TENCON, INCCES), and book chapters.
                </p>
              </div>
              <Link
                href="/research?tab=publications"
                className="px-5 py-2.5 rounded-xl bg-button text-white text-xs font-bold hover:opacity-90 shadow-soft transition-all shrink-0"
              >
                Open Full Publication Index
              </Link>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Citation Modal */}
      <CitationModal
        publication={selectedCitationPub}
        isOpen={!!selectedCitationPub}
        onClose={() => setSelectedCitationPub(null)}
      />
    </>
  );
}
