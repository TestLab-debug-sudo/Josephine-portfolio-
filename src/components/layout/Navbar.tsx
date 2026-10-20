"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  Mail,
  Calendar,
  Users,
  Award,
  Mic2,
  Camera,
  LogOut,
  ShieldCheck,
  Search,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const { profile } = useData();
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track scroll state with requestAnimationFrame throttling (zero unnecessary re-renders)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = window.scrollY || document.documentElement.scrollTop;
          const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${scrolled}%`;
          }
          const hasScrolled = winScroll > 15;
          setIsScrolled((prev) => (prev !== hasScrolled ? hasScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Primary top links shown directly in the centered pill dock (Projects and Publications are inside Research)
  const primaryLinks = [
    { label: "Overview", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Teaching", href: "/teaching" },
  ];

  // Secondary items placed under the "More" dropdown
  const moreLinks = [
    { label: "Student Mentorship", href: "/mentorship", icon: Users },
    { label: "Photo Gallery", href: "/gallery", icon: Camera },
  ];

  const getPageTitle = (path: string) => {
    if (path.startsWith("/about")) return "Academic Profile & Dossier";
    if (path.startsWith("/research")) return "Research, Grants & Papers";
    if (path.startsWith("/teaching")) return "Pedagogy & Syllabi";
    if (path.startsWith("/conferences")) return "Talks & Keynotes";
    if (path.startsWith("/mentorship")) return "Student Mentorship";
    if (path.startsWith("/gallery")) return "Photo Archive";
    if (path.startsWith("/contact")) return "Contact Portal";
    if (path.startsWith("/admin")) return "Faculty Workspace";
    return "Academic Portfolio";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav border-b border-border/80 shadow-xs"
            : "bg-background/95 backdrop-blur-md border-b border-border/40"
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        {/* Subtle Top Reading Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent overflow-hidden pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary via-accent to-button transition-all duration-75 ease-out"
            style={{ width: "0%" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* 1. DEDICATED COMPACT MOBILE HEADER (< 768px) */}
          <div className="flex md:hidden items-center justify-between h-14 gap-2">
            {pathname !== "/" ? (
              <div className="flex items-center gap-2 min-w-0">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full bg-muted/80 text-heading text-xs font-semibold touch-target shrink-0 border border-border/60 active:scale-95 transition-transform"
                  aria-label="Back to Overview"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </Link>
                <span className="text-sm font-extrabold text-heading truncate">
                  {getPageTitle(pathname)}
                </span>
              </div>
            ) : (
              <Link href="/" className="flex items-center min-w-0">
                <span className="font-extrabold text-xs tracking-tight text-heading truncate leading-tight">
                  {profile.name}
                </span>
              </Link>
            )}

            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-button text-white text-xs font-bold touch-target shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl border border-border/80 bg-card hover:bg-muted text-muted-foreground hover:text-card-foreground touch-target flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 2. EXISTING DESKTOP & TABLET HEADER (>= 768px) - 100% UNCHANGED */}
          <div className="hidden md:flex items-center justify-between h-16 sm:h-[72px] gap-4">
            {/* Left: Scholar Identity / Brand */}
            <Link
              href="/"
              className="flex items-center group text-card-foreground focus:outline-none shrink-0"
            >
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-heading leading-tight group-hover:text-primary transition-colors">
                {profile.name}
              </span>
            </Link>

            {/* Center: Balanced Floating Pill Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-card/85 border border-border/80 rounded-full px-2.5 py-1.5 shadow-xs backdrop-blur-xs">
              {primaryLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    prefetch={true}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                        : "text-muted-foreground hover:text-heading hover:bg-muted/70 font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* "More" Dropdown Menu */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
                    moreLinks.some((l) => pathname === l.href)
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-heading hover:bg-muted/70 font-medium"
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-xl p-2 z-50 animate-slide-up space-y-1">
                    {moreLinks.map((sub) => {
                      const Icon = sub.icon;
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          prefetch={true}
                          onClick={() => setIsMoreOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                            isSubActive
                              ? "bg-primary text-primary-foreground font-bold"
                              : "text-muted-foreground hover:text-heading hover:bg-muted"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Primary Call to Action & Optional Faculty Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Only on Admin page: Admin Tools */}
              {isAdminPage && (
                <>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-card-foreground transition-all shadow-xs text-xs"
                    title="Global Search (Cmd/Ctrl + K)"
                    aria-label="Global Search"
                  >
                    <Search className="w-4 h-4 text-primary" />
                    <span className="hidden md:inline">Search</span>
                    <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border text-muted-foreground">
                      ⌘K
                    </kbd>
                  </button>
                  <ThemeSwitcher />
                </>
              )}

              {/* On Public User Pages: Clean, Proportional Contact CTA */}
              {!isAdminPage && (
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-button text-white text-xs font-bold shadow-xs hover:opacity-95 hover:shadow-sm transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </Link>
              )}

              {/* Authenticated Faculty Indicator (When Logged In) */}
              {isAuthenticated && !isAdminPage && (
                <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-border">
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-all"
                    title="Faculty Admin Workspace"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-full border border-border bg-card hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 text-muted-foreground transition-all"
                    title="Sign Out of Faculty Portal"
                    aria-label="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-card border-b border-border shadow-xl animate-slide-up space-y-3">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[...primaryLinks, ...moreLinks].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all touch-target flex items-center ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold shadow-xs"
                        : "text-muted-foreground hover:text-heading hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-button text-white text-xs font-bold touch-target shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </Link>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/10 text-red-600 text-xs font-semibold touch-target"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette (Active only when triggered via Search or Shortcut) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
