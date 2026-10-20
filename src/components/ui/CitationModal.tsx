"use client";

import React, { useState } from "react";
import { X, Check, Copy, Quote, BookOpen } from "lucide-react";
import { Publication } from "@/types";
import { generateAPA, generateIEEE, generateBibTeX } from "@/lib/citation";
import { useToast } from "@/context/ToastContext";

interface CitationModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

type CitationStyle = "APA" | "IEEE" | "BibTeX";

export function CitationModal({ publication, isOpen, onClose }: CitationModalProps) {
  const [activeStyle, setActiveStyle] = useState<CitationStyle>("APA");
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  if (!isOpen || !publication) return null;

  const getCitationText = () => {
    switch (activeStyle) {
      case "APA":
        return generateAPA(publication);
      case "IEEE":
        return generateIEEE(publication);
      case "BibTeX":
        return generateBibTeX(publication);
    }
  };

  const citationText = getCitationText();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      showToast("Citation Copied", `Formatted as ${activeStyle} and copied to clipboard!`, "success");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Copy Failed", "Please manually highlight and copy the citation text.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2.5">
            <Quote className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-heading">Cite this Research Work</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-card-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Selected Article
            </span>
            <h4 className="text-sm font-medium text-heading line-clamp-2">
              {publication.title}
            </h4>
          </div>

          {/* Style Selector Buttons */}
          <div className="flex items-center gap-2 p-1 bg-muted/60 rounded-xl border border-border">
            {(["APA", "IEEE", "BibTeX"] as CitationStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => {
                  setActiveStyle(style);
                  setCopied(false);
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                  activeStyle === style
                    ? "bg-card text-heading shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Formatted Citation Block */}
          <div className="relative">
            <pre className="p-4 rounded-xl bg-background border border-border text-xs text-card-foreground font-mono whitespace-pre-wrap break-words max-h-48 overflow-y-auto leading-relaxed">
              {citationText}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-muted/30 border-t border-border">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Verified Academic Bibliography
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-card-foreground"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-button text-white text-xs font-semibold hover:opacity-90 shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Citation
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
