"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Layers, Award, Terminal, ArrowRight, CornerDownLeft } from "lucide-react";
import { useData } from "@/context/DataContext";
import { buildSearchIndex, filterSearchResults } from "@/lib/search";
import { SearchResultItem } from "@/types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { profile, publications, projects, courses, achievements, talks } = useData();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex = React.useMemo(() => {
    return buildSearchIndex(profile, publications, projects, courses, achievements, talks);
  }, [profile, publications, projects, courses, achievements, talks]);

  const results = React.useMemo(() => {
    return filterSearchResults(searchIndex, query);
  }, [searchIndex, query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled outside or toggled
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    if (item.url.startsWith("http")) {
      window.open(item.url, "_blank");
    } else {
      router.push(item.url);
    }
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Publications":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "Projects":
        return <Layers className="w-4 h-4 text-emerald-500" />;
      case "Awards":
      case "Certifications":
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Terminal className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search publications, research grants, courses, talks... (Press ESC to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-card-foreground placeholder-muted-foreground outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-card-foreground p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-card-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-border/40">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No academic records found matching &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-muted-foreground/80">Try searching for &quot;Thermography&quot;, &quot;DBT&quot;, &quot;Control Systems&quot;, or &quot;IoT&quot;</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-muted shadow-sm" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="mt-1 p-2 rounded-lg bg-background border border-border shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/15 text-secondary">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded border border-border text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-heading truncate mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {item.snippet}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                      isSelected ? "text-primary translate-x-0.5" : "text-transparent"
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-t border-border text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-background border text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" />
              Open
            </span>
          </div>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
