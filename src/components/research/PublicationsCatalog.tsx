"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Search,
  Filter,
  Quote,
  ExternalLink,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { Publication } from "@/types";
import { CitationModal } from "@/components/ui/CitationModal";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";
import { generateBibTeX } from "@/lib/citation";
import { useToast } from "@/context/ToastContext";

interface PublicationsCatalogProps {
  hideHeader?: boolean;
}

export function PublicationsCatalog({ hideHeader = false }: PublicationsCatalogProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { publications } = useData();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedIndexing, setSelectedIndexing] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [expandedPubIds, setExpandedPubIds] = useState<Record<string, boolean>>({});
  const [citationModalPub, setCitationModalPub] = useState<Publication | null>(null);

  // Extract available years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
    return years;
  }, [publications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications
      .filter((pub) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = pub.title.toLowerCase().includes(q);
          const matchesAuthor = pub.authors.some((a) => a.toLowerCase().includes(q));
          const matchesVenue = pub.venue.toLowerCase().includes(q);
          const matchesTags = pub.tags.some((t) => t.toLowerCase().includes(q));
          const matchesAbstract = pub.abstract?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesAuthor && !matchesVenue && !matchesTags && !matchesAbstract) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== "all" && pub.type !== selectedType) {
          return false;
        }

        // Year filter
        if (selectedYear !== "all" && pub.year.toString() !== selectedYear) {
          return false;
        }

        // Indexing filter
        if (selectedIndexing !== "all") {
          if (selectedIndexing === "Scopus" && pub.indexing !== "Scopus" && pub.indexing !== "Both") {
            return false;
          }
          if (selectedIndexing === "WoS" && pub.indexing !== "WoS" && pub.indexing !== "Both") {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.year - a.year;
        return a.year - b.year;
      });
  }, [publications, searchQuery, selectedType, selectedYear, selectedIndexing, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedPubIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportAllBibTeX = () => {
    const bibtexAll = filteredPublications.map((p) => generateBibTeX(p)).join("\n\n");
    const blob = new Blob([bibtexAll], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dr_josephine_publications_${new Date().getFullYear()}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("BibTeX Exported", `Downloaded ${filteredPublications.length} citations as .bib file`, "success");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedYear("all");
    setSelectedIndexing("all");
    setSortBy("newest");
  };

  return (
    <>
      <div className="w-full space-y-8">
        {/* Header (optional if embedded) */}
        {!hideHeader && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic Bibliography</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <ScrollFloat
                  tag="h2"
                  textClassName="text-3xl sm:text-4xl font-extrabold text-heading"
                  effect="float"
                  direction="up"
                >
                  Publications & Scholarship
                </ScrollFloat>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Complete peer-reviewed journal articles, international IEEE conference proceedings, and book chapters indexed in Scopus and Web of Science.
                </p>
              </div>

              {/* Download BibTeX All */}
              <button
                onClick={handleExportAllBibTeX}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-button text-white text-xs font-semibold hover:opacity-90 shadow-soft transition-all shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export BibTeX ({filteredPublications.length})</span>
              </button>
            </div>
          </div>
        )}

        {hideHeader && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-heading">
                Peer-Reviewed Publications Catalog
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Filter across 31+ articles indexed in Scopus and Web of Science.
              </p>
            </div>

            <button
              onClick={handleExportAllBibTeX}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-button text-white text-xs font-semibold hover:opacity-90 shadow-soft transition-all shrink-0 self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Export BibTeX ({filteredPublications.length})</span>
            </button>
          </div>
        )}

        {/* Search & Filtering Bar */}
        <FadeContent effect="focus" blur={4} duration={0.8} threshold={0.1}>
          <div className="academic-card p-4 sm:p-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword (e.g. 'Thermography', 'Ulcer', 'Contourlet', 'IoT', 'SVM')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-card-foreground outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-background border border-border text-card-foreground outline-none focus:border-primary"
                >
                  <option value="all">All Document Types</option>
                  <option value="journal">Journals</option>
                  <option value="conference">Conferences</option>
                  <option value="book-chapter">Book Chapters</option>
                </select>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-background border border-border text-card-foreground outline-none focus:border-primary"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Indexing Filter */}
                <select
                  value={selectedIndexing}
                  onChange={(e) => setSelectedIndexing(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-background border border-border text-card-foreground outline-none focus:border-primary"
                >
                  <option value="all">All Indexing Bodies</option>
                  <option value="Scopus">Scopus</option>
                  <option value="WoS">Web of Science</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                  className="px-3 py-1.5 rounded-lg bg-background border border-border text-card-foreground outline-none focus:border-primary"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                </select>
              </div>

              {/* Active Results & Reset */}
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground font-medium">
                  Showing <strong className="text-heading">{filteredPublications.length}</strong> of {publications.length}
                </span>
                {(searchQuery || selectedType !== "all" || selectedYear !== "all" || selectedIndexing !== "all") && (
                  <button
                    onClick={resetFilters}
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Publications List */}
        {filteredPublications.length === 0 ? (
          <FadeContent effect="fade" duration={0.6}>
            <div className="academic-card p-12 text-center text-muted-foreground space-y-2">
              <p className="text-base font-semibold text-heading">No publications match your filter</p>
              <p className="text-xs">Try clearing some filters or searching for broader terms.</p>
              <button
                onClick={resetFilters}
                className="mt-3 px-4 py-2 rounded-xl bg-muted text-xs font-semibold text-heading hover:bg-card border border-border"
              >
                Clear All Filters
              </button>
            </div>
          </FadeContent>
        ) : (
          <AnimatedContent
            key={`${searchQuery}-${selectedType}-${selectedYear}-${selectedIndexing}-${sortBy}`}
            distance={30}
            direction="vertical"
            duration={0.7}
            stagger={0.04}
            threshold={0.05}
            className="space-y-4"
          >
            {filteredPublications.map((pub) => {
              const isExpanded = !!expandedPubIds[pub.id];

              return (
                <div
                  key={pub.id}
                  className="academic-card p-5 sm:p-6 transition-all hover:border-primary/40 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                        {pub.type.replace("-", " ")}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-border text-muted-foreground flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        {pub.indexing}
                      </span>
                      {pub.publisher && (
                        <span className="text-[11px] text-muted-foreground hidden sm:inline">
                          • {pub.publisher}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono font-bold text-heading flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {pub.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-heading leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-card-foreground">Authors:</strong> {pub.authors.join(", ")}
                  </p>

                  {/* Venue */}
                  <p className="text-xs font-semibold text-secondary">
                    {pub.venue}
                    {pub.volume && `, Vol. ${pub.volume}`}
                    {pub.issue && ` (${pub.issue})`}
                    {pub.pages && `, pp. ${pub.pages}`}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pub.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Collapsible Abstract if available */}
                  {pub.abstract && (
                    <div className="pt-2">
                      {isExpanded ? (
                        <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs text-card-foreground/90 leading-relaxed space-y-1 animate-fade-in">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                            Abstract
                          </span>
                          <p>{pub.abstract}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {pub.abstract}
                        </p>
                      )}
                      <button
                        onClick={() => toggleExpand(pub.id)}
                        className="mt-1.5 text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" /> Collapse Abstract
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" /> Read Full Abstract
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <button
                      onClick={() => setCitationModalPub(pub)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-card border border-border text-card-foreground font-semibold transition-all shadow-xs"
                    >
                      <Quote className="w-3.5 h-3.5 text-primary" />
                      <span>Cite (APA / IEEE / BibTeX)</span>
                    </button>

                    {pub.doi ? (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:underline font-bold"
                      >
                        <span>DOI: {pub.doi}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Scopus / WoS Repository</span>
                    )}
                  </div>
                </div>
              );
            })}
          </AnimatedContent>
        )}
      </div>

      {/* Citation Modal */}
      <CitationModal
        publication={citationModalPub}
        isOpen={!!citationModalPub}
        onClose={() => setCitationModalPub(null)}
      />
    </>
  );
}
