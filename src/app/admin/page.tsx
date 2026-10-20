"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldAlert,
  LayoutDashboard,
  BookOpen,
  Layers,
  GraduationCap,
  User,
  Palette,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  ExternalLink,
  Split,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  AlertTriangle,
  X,
  Lock,
  LogOut,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Award,
  Calendar,
  Camera,
  Upload,
  Globe,
  Tag,
  Briefcase,
  Check,
  MapPin,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import {
  AcademicProfile,
  Publication,
  ResearchProject,
  Course,
  TimelineMilestone,
  AcademicAchievement,
  GalleryItem,
  ThemePalette,
} from "@/types";

type AdminTab =
  | "dashboard"
  | "profile"
  | "achievements"
  | "timeline"
  | "gallery"
  | "publications"
  | "projects"
  | "courses"
  | "theme";

export default function AdminPage() {
  const {
    profile,
    publications,
    projects,
    courses,
    timeline,
    achievements,
    gallery,
    updateProfile,
    addPublication,
    updatePublication,
    deletePublication,
    addProject,
    updateProject,
    deleteProject,
    addCourse,
    updateCourse,
    deleteCourse,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addTimeline,
    updateTimeline,
    deleteTimeline,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
  } = useData();

  const {
    currentTheme,
    customPalette,
    resolvedMode,
    setCustomToken,
    resetCustomPalette,
    setThemeId,
    presets,
    activeThemeId,
  } = useTheme();

  const { showToast } = useToast();
  const { isAuthenticated, isLoading: authLoading, user, login, logout } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("drjjosephine@gmail.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStepText, setAuthStepText] = useState("Authenticating...");
  const [authProgress, setAuthProgress] = useState(0);

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isSplitPreview, setIsSplitPreview] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Profile Form State (syncs from DataContext)
  const [profileForm, setProfileForm] = useState<AcademicProfile>(profile);
  const [newInterestInput, setNewInterestInput] = useState("");

  useEffect(() => {
    if (profile) {
      setProfileForm(profile);
    }
  }, [profile]);

  // Avatar file upload handler
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("File Too Large", "Please choose an image under 2MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfileForm((prev) => ({ ...prev, avatarUrl: result }));
          showToast("Avatar Loaded", "New profile photo preview ready. Click Save to persist.", "info");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Publication Modal State
  const [pubModalOpen, setPubModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [pubSearch, setPubSearch] = useState("");
  const [pubForm, setPubForm] = useState<Partial<Publication>>({
    title: "",
    authors: [],
    year: new Date().getFullYear(),
    venue: "",
    type: "journal",
    indexing: "Scopus",
    tags: [],
  });

  // Project Modal State
  const [projModalOpen, setProjModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<ResearchProject | null>(null);
  const [projForm, setProjForm] = useState<Partial<ResearchProject>>({
    title: "",
    role: "Principal Investigator",
    fundingAgency: "",
    amountSanctioned: "",
    amountNumericLakhs: 5,
    status: "ongoing",
    technologies: [],
    outcomes: [],
  });

  // Course Modal State
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: "",
    code: "",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "",
    toolsUsed: [],
    description: "",
    syllabusHighlights: [],
  });

  // Achievement Modal State
  const [achModalOpen, setAchModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<AcademicAchievement | null>(null);
  const [achFilter, setAchFilter] = useState<string>("all");
  const [achForm, setAchForm] = useState<Partial<AcademicAchievement>>({
    title: "",
    category: "award",
    year: "AY 2024-25",
    issuer: "",
    badge: "",
    description: "",
  });

  // Timeline Modal State
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [editingTime, setEditingTime] = useState<TimelineMilestone | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [timeForm, setTimeForm] = useState<Partial<TimelineMilestone>>({
    year: "2025",
    title: "",
    roleOrDegree: "",
    institution: "",
    location: "KARE Campus",
    category: "experience",
    description: "",
    gradeOrDistinction: "",
  });

  // Gallery Modal State
  const [galModalOpen, setGalModalOpen] = useState(false);
  const [editingGal, setEditingGal] = useState<GalleryItem | null>(null);
  const [galFilter, setGalFilter] = useState<string>("All");
  const [galForm, setGalForm] = useState<Partial<GalleryItem>>({
    title: "",
    category: "Research & Labs",
    imageUrl: "",
    dateOrYear: "2025",
    location: "KARE Campus",
    description: "",
    tags: [],
  });

  const galFileInputRef = useRef<HTMLInputElement>(null);
  const handleGalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast("File Too Large", "Please choose an image under 3MB.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setGalForm((prev) => ({ ...prev, imageUrl: result }));
          showToast("Photo Loaded", "Image ready for gallery record.", "info");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const tokens: (keyof ThemePalette)[] = [
    "primary",
    "secondary",
    "accent",
    "button",
    "heading",
    "background",
  ];

  const effectivePalette = {
    ...(resolvedMode === "dark" ? currentTheme.dark : currentTheme.light),
    ...(customPalette || {}),
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast(
      "Profile Updated Successfully",
      "All identity changes, bio, contact details, and avatar are live across the website.",
      "success"
    );
  };

  // Add / Remove Research Interest
  const handleAddInterest = () => {
    if (newInterestInput.trim()) {
      const updated = [...(profileForm.researchInterests || []), newInterestInput.trim()];
      setProfileForm({ ...profileForm, researchInterests: updated });
      setNewInterestInput("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    const updated = (profileForm.researchInterests || []).filter((_, i) => i !== index);
    setProfileForm({ ...profileForm, researchInterests: updated });
  };

  // Publications Handlers
  const handleOpenPubModal = (pub?: Publication) => {
    if (pub) {
      setEditingPub(pub);
      setPubForm(pub);
    } else {
      setEditingPub(null);
      setPubForm({
        id: `pub-custom-${Date.now()}`,
        title: "",
        authors: ["J. S. Jeyanathan"],
        year: new Date().getFullYear(),
        venue: "",
        type: "journal",
        indexing: "Scopus",
        tags: ["Medical Imaging"],
      });
    }
    setPubModalOpen(true);
  };

  const handleSavePub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm.title || !pubForm.venue) {
      showToast("Validation Error", "Title and Venue are required.", "error");
      return;
    }
    if (editingPub) {
      updatePublication(pubForm as Publication);
      showToast("Publication Updated", `Saved updates to "${pubForm.title?.slice(0, 30)}..."`, "success");
    } else {
      addPublication(pubForm as Publication);
      showToast("Publication Added", "New publication created and added to bibliography.", "success");
    }
    setPubModalOpen(false);
  };

  // Projects Handlers
  const handleOpenProjModal = (proj?: ResearchProject) => {
    if (proj) {
      setEditingProj(proj);
      setProjForm(proj);
    } else {
      setEditingProj(null);
      setProjForm({
        id: `proj-custom-${Date.now()}`,
        title: "",
        role: "Principal Investigator",
        fundingAgency: "",
        amountSanctioned: "₹5,00,000",
        amountNumericLakhs: 5,
        duration: "2025 – 2027",
        status: "ongoing",
        domain: "Biomedical Systems",
        description: "",
        technologies: ["MATLAB", "IoT"],
        outcomes: ["Prototype fabrication"],
      });
    }
    setProjModalOpen(true);
  };

  const handleSaveProj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title || !projForm.fundingAgency) {
      showToast("Validation Error", "Title and Funding Agency are required.", "error");
      return;
    }
    if (editingProj) {
      updateProject(projForm as ResearchProject);
      showToast("Project Updated", "Research grant updated successfully.", "success");
    } else {
      addProject(projForm as ResearchProject);
      showToast("Project Added", "New research grant registered.", "success");
    }
    setProjModalOpen(false);
  };

  // Courses Handlers
  const handleOpenCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm(course);
    } else {
      setEditingCourse(null);
      setCourseForm({
        id: `course-custom-${Date.now()}`,
        title: "",
        code: "ECE",
        category: "Core",
        level: "Undergraduate",
        practicalIntegration: "Integrated with practical laboratory sessions",
        toolsUsed: ["MATLAB", "Simulink"],
        description: "",
        syllabusHighlights: [],
      });
    }
    setCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title) {
      showToast("Validation Error", "Course title is required.", "error");
      return;
    }
    if (editingCourse) {
      updateCourse(courseForm as Course);
      showToast("Course Updated", `Updated course "${courseForm.title}".`, "success");
    } else {
      addCourse(courseForm as Course);
      showToast("Course Added", `Added new course "${courseForm.title}".`, "success");
    }
    setCourseModalOpen(false);
  };

  // Achievements Handlers
  const handleOpenAchModal = (ach?: AcademicAchievement) => {
    if (ach) {
      setEditingAch(ach);
      setAchForm(ach);
    } else {
      setEditingAch(null);
      setAchForm({
        id: `ach-custom-${Date.now()}`,
        title: "",
        category: "award",
        year: "AY 2024-25",
        issuer: "KARE",
        badge: "Honors Award",
        description: "",
      });
    }
    setAchModalOpen(true);
  };

  const handleSaveAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title || !achForm.issuer) {
      showToast("Validation Error", "Title and Issuer are required.", "error");
      return;
    }
    if (editingAch) {
      updateAchievement(achForm as AcademicAchievement);
      showToast("Achievement Updated", `Saved updates to "${achForm.title?.slice(0, 30)}..."`, "success");
    } else {
      addAchievement(achForm as AcademicAchievement);
      showToast("Achievement Added", "New recognition added to Page Flip and CV list.", "success");
    }
    setAchModalOpen(false);
  };

  // Timeline Handlers
  const handleOpenTimeModal = (time?: TimelineMilestone) => {
    if (time) {
      setEditingTime(time);
      setTimeForm(time);
    } else {
      setEditingTime(null);
      setTimeForm({
        id: `time-custom-${Date.now()}`,
        year: "2025",
        title: "",
        roleOrDegree: "",
        institution: "Kalasalingam Academy of Research and Education",
        location: "Krishnankoil, Tamil Nadu",
        category: "experience",
        description: "",
        gradeOrDistinction: "",
      });
    }
    setTimeModalOpen(true);
  };

  const handleSaveTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeForm.title || !timeForm.year) {
      showToast("Validation Error", "Year and Title are required.", "error");
      return;
    }
    if (editingTime) {
      updateTimeline(timeForm as TimelineMilestone);
      showToast("Timeline Updated", "Milestone record saved successfully.", "success");
    } else {
      addTimeline(timeForm as TimelineMilestone);
      showToast("Milestone Added", "New milestone added to career progression.", "success");
    }
    setTimeModalOpen(false);
  };

  // Gallery Handlers
  const handleOpenGalModal = (gal?: GalleryItem) => {
    if (gal) {
      setEditingGal(gal);
      setGalForm(gal);
    } else {
      setEditingGal(null);
      setGalForm({
        id: `gal-custom-${Date.now()}`,
        title: "",
        category: "Research & Labs",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
        dateOrYear: "2025",
        location: "Biomedical Lab, KARE",
        description: "",
        tags: ["Research", "Innovation"],
      });
    }
    setGalModalOpen(true);
  };

  const handleSaveGal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galForm.title || !galForm.imageUrl) {
      showToast("Validation Error", "Title and Image URL are required.", "error");
      return;
    }
    if (editingGal) {
      updateGalleryItem(galForm as GalleryItem);
      showToast("Gallery Item Updated", "Photo record updated in Orbit Reel and Gallery.", "success");
    } else {
      addGalleryItem(galForm as GalleryItem);
      showToast("Photo Added", "New photo engagement added to portfolio.", "success");
    }
    setGalModalOpen(false);
  };

  // Auth Submit Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    setAuthStepText("Verifying faculty credentials...");
    setAuthProgress(30);

    setTimeout(() => {
      setAuthStepText("Authorizing faculty session...");
      setAuthProgress(70);
    }, 450);

    setTimeout(() => {
      setAuthStepText("Opening workspace...");
      setAuthProgress(100);
    }, 900);

    setTimeout(() => {
      const success = login(loginPassword, loginEmail);
      if (success) {
        showToast("Access Granted", "Logged into Faculty Administrator Workspace.", "success");
      } else {
        setLoginError("Invalid credentials. Try 'kare2025' or use Quick Demo Sign In.");
        showToast("Authentication Failed", "Incorrect password entered.", "error");
      }
      setIsSubmitting(false);
      setAuthProgress(0);
    }, 1250);
  };

  const handleQuickDemo = () => {
    setLoginPassword("kare2025");
    setIsSubmitting(true);
    setLoginError("");
    setAuthStepText("Initiating faculty demo access...");
    setAuthProgress(50);

    setTimeout(() => {
      login("kare2025", "drjjosephine@gmail.com");
      showToast("Access Granted", "Signed in with Faculty Demo Access.", "success");
      setIsSubmitting(false);
      setAuthProgress(0);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    showToast("Signed Out", "You have ended your administrative session.", "info");
  };

  // If not logged in, render the secure Faculty Login screen
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="academic-card p-8 sm:p-10 shadow-xl border border-border space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mx-auto flex items-center justify-center shadow-xs">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  KARE Faculty Portal
                </span>
                <h1 className="text-2xl font-extrabold text-heading pt-1">
                  Faculty CMS Login
                </h1>
                <p className="text-xs text-muted-foreground">
                  Restricted to Dr. Josephine Selle Jeyanathan & Authorized Administrators
                </p>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading">Faculty Email / ID</label>
                <input
                  type="text"
                  value={loginEmail}
                  disabled={isSubmitting}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading">Security PIN / Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter faculty password..."
                    value={loginPassword}
                    disabled={isSubmitting}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                    required
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isSubmitting && (
                <div className="space-y-1.5 py-1">
                  <div className="flex justify-between text-[11px] font-semibold text-primary">
                    <span>{authStepText}</span>
                    <span>{authProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${authProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Authenticate Faculty Access</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-border">
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={isSubmitting}
                className="text-xs text-primary hover:underline font-semibold"
              >
                1-Click Quick Demo Sign In (kare2025)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Top Admin Sticky Ribbon */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Faculty Identifier & Status */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="font-bold text-heading">{user?.name || profile.name}</span>
              <span className="hidden sm:inline text-muted-foreground font-medium">
                ({user?.role || "Faculty Administrator"})
              </span>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
              <Sparkles className="w-3 h-3" /> Live Sync Active
            </span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-all shadow-xs"
              title="Open the live website in a new tab"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsSplitPreview(!isSplitPreview)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-heading font-semibold hover:bg-muted transition-all shadow-xs"
            >
              <Split className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">{isSplitPreview ? "Full Editor" : "Split Preview"}</span>
            </button>

            <button
              onClick={() => setConfirmResetOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted transition-colors"
              title="Reset data back to CV baseline"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 font-bold transition-all"
              title="Sign Out of Administrator Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 pt-6 ${isSplitPreview ? "max-w-[98%]" : "max-w-7xl"}`}>
        <div className={`grid gap-6 ${isSplitPreview ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
          {/* Editor Column */}
          <div className={isSplitPreview ? "lg:col-span-7 space-y-6" : "space-y-6"}>
            {/* Header / Tabs */}
            <div className="academic-card p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-heading">
                    Academic Portfolio CMS
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Live content editor: Add, edit, update, and delete everything on your academic website.
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/60 border border-border rounded-xl">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "profile", label: "Profile & Avatar", icon: User },
                  { id: "achievements", label: `Recognitions (${achievements.length})`, icon: Award },
                  { id: "timeline", label: `Timeline (${timeline.length})`, icon: Calendar },
                  { id: "gallery", label: `Photo Gallery (${gallery.length})`, icon: Camera },
                  { id: "publications", label: `Publications (${publications.length})`, icon: BookOpen },
                  { id: "projects", label: `Projects (${projects.length})`, icon: Layers },
                  { id: "courses", label: `Courses (${courses.length})`, icon: GraduationCap },
                  { id: "theme", label: "Theme Studio", icon: Palette },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as AdminTab)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-xs"
                          : "text-muted-foreground hover:text-heading hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB: Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="academic-card p-4">
                    <p className="text-xs text-muted-foreground">Recognitions & Awards</p>
                    <p className="text-2xl font-bold text-heading mt-1">{achievements.length}</p>
                    <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">Page Flip & Dossier</p>
                  </div>
                  <div className="academic-card p-4">
                    <p className="text-xs text-muted-foreground">Career Milestones</p>
                    <p className="text-2xl font-bold text-heading mt-1">{timeline.length}</p>
                    <p className="text-[10px] text-primary font-semibold mt-0.5">Interactive Stepper</p>
                  </div>
                  <div className="academic-card p-4">
                    <p className="text-xs text-muted-foreground">Gallery & Orbit Reel</p>
                    <p className="text-2xl font-bold text-heading mt-1">{gallery.length}</p>
                    <p className="text-[10px] text-amber-500 font-semibold mt-0.5">Field Engagements</p>
                  </div>
                  <div className="academic-card p-4">
                    <p className="text-xs text-muted-foreground">Publications</p>
                    <p className="text-2xl font-bold text-heading mt-1">{publications.length}</p>
                    <p className="text-[10px] text-purple-500 font-semibold mt-0.5">Scopus / WoS Live</p>
                  </div>
                </div>

                <div className="academic-card p-6 space-y-4">
                  <h3 className="text-sm font-bold text-heading">Quick Actions & Shortcuts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all space-y-1"
                    >
                      <User className="w-5 h-5 text-primary" />
                      <p className="text-xs font-bold text-heading">Edit Profile & Photo</p>
                      <p className="text-[11px] text-muted-foreground">Update avatar, title, bio, and contact info</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("achievements")}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all space-y-1"
                    >
                      <Award className="w-5 h-5 text-emerald-500" />
                      <p className="text-xs font-bold text-heading">Manage Recognitions</p>
                      <p className="text-[11px] text-muted-foreground">Add/edit awards in the 3D Page Flip book</p>
                    </button>
                    <button
                      onClick={() => setActiveTab("gallery")}
                      className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all space-y-1"
                    >
                      <Camera className="w-5 h-5 text-amber-500" />
                      <p className="text-xs font-bold text-heading">Update Photo Gallery</p>
                      <p className="text-[11px] text-muted-foreground">Add photos for the Orbit Reel wheel</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Profile & Avatar Editor */}
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="academic-card p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-heading">Academic Identity & Profile</h3>
                    <p className="text-xs text-muted-foreground">
                      Changes here update the Navbar, Hero banner, About page, and Footer across the entire site.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Profile Changes
                  </button>
                </div>

                {/* Profile Photo / Avatar Change Section */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> Profile Avatar / Photo Change
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Live Avatar Preview */}
                    <div className="relative group shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-md bg-muted flex items-center justify-center">
                        {profileForm.avatarUrl && !profileForm.avatarUrl.includes("images.unsplash.com") ? (
                          <img
                            src={profileForm.avatarUrl}
                            alt="Avatar Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="/avatar.jpg"
                            alt="Avatar Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1 border-2 border-card">
                        <Check className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Inputs & Uploader */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-heading">Avatar Image URL</label>
                        <input
                          type="text"
                          value={profileForm.avatarUrl || ""}
                          placeholder="https://... or upload below"
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={avatarFileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarFileUpload}
                        />
                        <button
                          type="button"
                          onClick={() => avatarFileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-heading hover:bg-muted"
                        >
                          <Upload className="w-3.5 h-3.5 text-primary" />
                          <span>Upload from Computer</span>
                        </button>
                        <span className="text-[11px] text-muted-foreground">PNG, JPG, WebP supported</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Identity Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Academic Role</label>
                    <select
                      value={profileForm.role}
                      onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    >
                      <option value="Professor">Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Scientist">Scientist</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Academician">Academician</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Department</label>
                    <input
                      type="text"
                      value={profileForm.department}
                      onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Institution</label>
                    <input
                      type="text"
                      value={profileForm.institution}
                      onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Tagline</label>
                    <input
                      type="text"
                      value={profileForm.tagline || ""}
                      placeholder="e.g. Associate Professor & DBT Principal Investigator"
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Campus Location</label>
                    <input
                      type="text"
                      value={profileForm.location || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Official Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Phone / WhatsApp Display</label>
                    <input
                      type="text"
                      value={profileForm.phoneDisplay}
                      onChange={(e) => setProfileForm({ ...profileForm, phoneDisplay: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Bio Summary & Career Objective */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Bio Summary</label>
                    <textarea
                      rows={3}
                      value={profileForm.bioSummary}
                      onChange={(e) => setProfileForm({ ...profileForm, bioSummary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">Career Objective</label>
                    <textarea
                      rows={2}
                      value={profileForm.careerObjective}
                      onChange={(e) => setProfileForm({ ...profileForm, careerObjective: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Research Interests Tag Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-heading">Research Thrusts & Keywords</label>
                  <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-background border border-border min-h-[46px]">
                    {(profileForm.researchInterests || []).map((interest, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary"
                      >
                        <span>{interest}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(idx)}
                          className="text-primary hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add research thrust (e.g. Infrared Thermography)..."
                      value={newInterestInput}
                      onChange={(e) => setNewInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-background border border-border text-xs outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddInterest}
                      className="px-3 py-1.5 rounded-xl bg-secondary text-white text-xs font-semibold hover:opacity-90"
                    >
                      Add Thrust
                    </button>
                  </div>
                </div>

                {/* Key Metrics / Numerical Indicators */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Academic Impact Metrics (Homepage Counters)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Years Experience</label>
                      <input
                        type="number"
                        value={profileForm.metrics.yearsExperience}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            metrics: { ...profileForm.metrics, yearsExperience: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Funded Grants (₹ Lakhs)</label>
                      <input
                        type="number"
                        value={profileForm.metrics.fundedGrantLakhs}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            metrics: { ...profileForm.metrics, fundedGrantLakhs: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Batches Mentored</label>
                      <input
                        type="number"
                        value={profileForm.metrics.batchesMentored}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            metrics: { ...profileForm.metrics, batchesMentored: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Invited Talks</label>
                      <input
                        type="number"
                        value={profileForm.metrics.invitedLectures}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            metrics: { ...profileForm.metrics, invitedLectures: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Scholar Identifiers */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Scholar Identifiers & Profile Links
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-muted-foreground">ORCID ID</label>
                      <input
                        type="text"
                        value={profileForm.identifiers.orcidId}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            identifiers: { ...profileForm.identifiers, orcidId: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Scopus Author ID</label>
                      <input
                        type="text"
                        value={profileForm.identifiers.scopusId}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            identifiers: { ...profileForm.identifiers, scopusId: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">Google Scholar URL</label>
                      <input
                        type="text"
                        value={profileForm.identifiers.googleScholarUrl}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            identifiers: { ...profileForm.identifiers, googleScholarUrl: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={profileForm.identifiers.linkedInUrl}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            identifiers: { ...profileForm.identifiers, linkedInUrl: e.target.value },
                          })
                        }
                        className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Profile Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB: Achievements (Academic Recognitions & Certifications) */}
            {activeTab === "achievements" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Academic Recognitions & Certifications</h3>
                    <p className="text-xs text-muted-foreground">
                      Powers the 3D Page Flip book and About dossier. All updates are live.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={achFilter}
                      onChange={(e) => setAchFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-background border border-border text-xs outline-none"
                    >
                      <option value="all">All Categories</option>
                      <option value="award">Awards</option>
                      <option value="certification">Certifications</option>
                      <option value="recognition">Recognitions</option>
                      <option value="membership">Memberships</option>
                    </select>
                    <button
                      onClick={() => handleOpenAchModal()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Recognition
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {achievements
                    .filter((ach) => achFilter === "all" || ach.category === achFilter)
                    .map((ach) => (
                      <div key={ach.id} className="academic-card p-4 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                              {ach.category}
                            </span>
                            <span className="text-xs font-bold text-heading">{ach.year}</span>
                            {ach.badge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {ach.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-heading">{ach.title}</h4>
                          <p className="text-[11px] text-muted-foreground font-medium">{ach.issuer}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{ach.description}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenAchModal(ach)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                            title="Edit Recognition"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove recognition "${ach.title}"?`)) {
                                deleteAchievement(ach.id);
                                showToast("Recognition Deleted", "Item removed from Page Flip book.", "info");
                              }
                            }}
                            className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB: Career Timeline Milestones */}
            {activeTab === "timeline" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Career & Education Milestones</h3>
                    <p className="text-xs text-muted-foreground">
                      Manage career progression, doctoral degrees, and leadership tenures.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-background border border-border text-xs outline-none"
                    >
                      <option value="all">All Categories</option>
                      <option value="experience">Experience</option>
                      <option value="education">Education</option>
                      <option value="fellowship">Fellowship</option>
                    </select>
                    <button
                      onClick={() => handleOpenTimeModal()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Milestone
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {timeline
                    .filter((m) => timeFilter === "all" || m.category === timeFilter)
                    .map((item) => (
                      <div key={item.id} className="academic-card p-4 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary uppercase">
                              {item.category}
                            </span>
                            <span className="text-xs font-bold text-heading">{item.year}</span>
                          </div>
                          <h4 className="text-xs font-bold text-heading">{item.title}</h4>
                          <p className="text-[11px] text-muted-foreground">
                            {item.roleOrDegree} • {item.institution} ({item.location})
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenTimeModal(item)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                            title="Edit Milestone"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove milestone "${item.title}"?`)) {
                                deleteTimeline(item.id);
                                showToast("Milestone Deleted", "Milestone removed from timeline.", "info");
                              }
                            }}
                            className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB: Photo Gallery & Orbit Reel */}
            {activeTab === "gallery" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Photo Gallery & Field Engagements</h3>
                    <p className="text-xs text-muted-foreground">
                      Powers the Orbit Reel wheel and photo gallery with live thumbnail previews.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={galFilter}
                      onChange={(e) => setGalFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-background border border-border text-xs outline-none"
                    >
                      <option value="All">All Categories</option>
                      <option value="Research & Labs">Research & Labs</option>
                      <option value="International">International</option>
                      <option value="Conferences & Talks">Conferences & Talks</option>
                      <option value="Student Mentorship">Student Mentorship</option>
                      <option value="Awards & Honors">Awards & Honors</option>
                    </select>
                    <button
                      onClick={() => handleOpenGalModal()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery
                    .filter((g) => galFilter === "All" || g.category === galFilter)
                    .map((item) => (
                      <div key={item.id} className="academic-card p-3 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-muted">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                              {item.category}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-heading line-clamp-1">{item.title}</h4>
                            <p className="text-[11px] text-muted-foreground">
                              {item.dateOrYear} • {item.location || "KARE"}
                            </p>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
                          <div className="flex flex-wrap gap-1">
                            {item.tags?.slice(0, 2).map((t, idx) => (
                              <span key={idx} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                #{t}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenGalModal(item)}
                              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove photo "${item.title}"?`)) {
                                  deleteGalleryItem(item.id);
                                  showToast("Photo Deleted", "Item removed from gallery.", "info");
                                }
                              }}
                              className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB: Publications */}
            {activeTab === "publications" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Publications Directory</h3>
                    <p className="text-xs text-muted-foreground">
                      Full control of peer-reviewed journals, conferences, and chapters.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search papers..."
                        value={pubSearch}
                        onChange={(e) => setPubSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-background border border-border text-xs outline-none focus:border-primary w-40 sm:w-48"
                      />
                    </div>
                    <button
                      onClick={() => handleOpenPubModal()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Paper
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {publications
                    .filter((p) => {
                      if (!pubSearch) return true;
                      const q = pubSearch.toLowerCase();
                      return (
                        p.title.toLowerCase().includes(q) ||
                        p.venue.toLowerCase().includes(q) ||
                        p.tags?.some((t) => t.toLowerCase().includes(q))
                      );
                    })
                    .map((pub) => (
                      <div key={pub.id} className="academic-card p-4 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                              {pub.type}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              {pub.indexing}
                            </span>
                            <span className="text-xs font-semibold text-muted-foreground">{pub.year}</span>
                          </div>
                          <h4 className="text-xs font-bold text-heading">{pub.title}</h4>
                          <p className="text-[11px] text-muted-foreground">{pub.venue}</p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleOpenPubModal(pub)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove publication "${pub.title}"?`)) {
                                deletePublication(pub.id);
                                showToast("Publication Deleted", "Publication removed from bibliography.", "info");
                              }
                            }}
                            className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Sponsored Projects & Grants</h3>
                    <p className="text-xs text-muted-foreground">Manage ongoing and completed sponsored research.</p>
                  </div>
                  <button
                    onClick={() => handleOpenProjModal()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="academic-card p-4 flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                            {proj.status}
                          </span>
                          <span className="text-xs font-bold text-primary">{proj.amountSanctioned}</span>
                        </div>
                        <h4 className="text-xs font-bold text-heading">{proj.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{proj.fundingAgency}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenProjModal(proj)}
                          className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast("Project Deleted", "Project removed from records.", "info");
                            }
                          }}
                          className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Teaching Courses & Curricula */}
            {activeTab === "courses" && (
              <div className="space-y-4">
                <div className="academic-card p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">Teaching Courses & Syllabi</h3>
                    <p className="text-xs text-muted-foreground">Manage core engineering courses, labs, and pedagogy.</p>
                  </div>
                  <button
                    onClick={() => handleOpenCourseModal()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Course
                  </button>
                </div>

                <div className="space-y-3">
                  {courses.map((course) => (
                    <div key={course.id} className="academic-card p-4 flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {course.code && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {course.code}
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary uppercase">
                            {course.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{course.level}</span>
                        </div>
                        <h4 className="text-xs font-bold text-heading">{course.title}</h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">{course.practicalIntegration}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenCourseModal(course)}
                          className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-heading hover:bg-muted"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove course "${course.title}"?`)) {
                              deleteCourse(course.id);
                              showToast("Course Deleted", "Course removed from catalog.", "info");
                            }
                          }}
                          className="p-1.5 rounded-lg border border-border text-rose-500 hover:bg-rose-500/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Theme Studio */}
            {activeTab === "theme" && (
              <div className="academic-card p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-heading">Theme Design Studio</h3>
                    <p className="text-xs text-muted-foreground">Modify the 6 theme tokens in real time.</p>
                  </div>
                  {customPalette && (
                    <button
                      onClick={resetCustomPalette}
                      className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Overrides
                    </button>
                  )}
                </div>

                {/* Preset Switcher */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Base Presets
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setThemeId(preset.id);
                          resetCustomPalette();
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          preset.id === activeThemeId
                            ? "border-primary bg-primary/10 font-bold text-heading shadow-xs"
                            : "border-border hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="truncate">{preset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tokens */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Custom Color Overrides
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tokens.map((token) => (
                      <div
                        key={token}
                        className="flex items-center justify-between p-3 rounded-xl bg-background border border-border"
                      >
                        <div>
                          <p className="text-xs font-bold text-heading capitalize">{token}</p>
                          <p className="text-[10px] font-mono text-muted-foreground">
                            {effectivePalette[token]}
                          </p>
                        </div>
                        <input
                          type="color"
                          value={effectivePalette[token] || "#000000"}
                          onChange={(e) => setCustomToken(token, e.target.value)}
                          className="w-8 h-8 rounded-lg border border-border cursor-pointer bg-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Pane (Split Screen) */}
          {isSplitPreview && (
            <div className="lg:col-span-5 h-[800px] rounded-2xl border border-border shadow-elevated overflow-hidden bg-background sticky top-24 flex flex-col">
              <div className="px-4 py-2 bg-muted/80 border-b border-border flex items-center justify-between text-xs">
                <span className="font-bold text-heading flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" /> Live Synchronized Preview
                </span>
                <span className="text-[10px] text-muted-foreground">Updates on every edit</span>
              </div>
              <iframe
                src="/"
                className="w-full flex-1 border-none"
                title="Live Portfolio Preview"
              />
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Publication */}
      {pubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingPub ? "Edit Publication" : "Add New Publication"}
              </h3>
              <button onClick={() => setPubModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSavePub} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-heading">Title *</label>
                <input
                  type="text"
                  required
                  value={pubForm.title || ""}
                  onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Type</label>
                  <select
                    value={pubForm.type || "journal"}
                    onChange={(e) => setPubForm({ ...pubForm, type: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="journal">Journal</option>
                    <option value="conference">Conference</option>
                    <option value="book-chapter">Book Chapter</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Indexing</label>
                  <select
                    value={pubForm.indexing || "Scopus"}
                    onChange={(e) => setPubForm({ ...pubForm, indexing: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="Scopus">Scopus</option>
                    <option value="WoS">Web of Science</option>
                    <option value="Both">Both</option>
                    <option value="Peer-Reviewed">Peer-Reviewed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Venue / Journal *</label>
                  <input
                    type="text"
                    required
                    value={pubForm.venue || ""}
                    onChange={(e) => setPubForm({ ...pubForm, venue: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Year</label>
                  <input
                    type="number"
                    value={pubForm.year || new Date().getFullYear()}
                    onChange={(e) => setPubForm({ ...pubForm, year: parseInt(e.target.value) || 2025 })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">DOI / URL</label>
                <input
                  type="text"
                  placeholder="10.1080/..."
                  value={pubForm.doi || ""}
                  onChange={(e) => setPubForm({ ...pubForm, doi: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPubModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Project */}
      {projModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingProj ? "Edit Research Project" : "Add Research Project"}
              </h3>
              <button onClick={() => setProjModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSaveProj} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-heading">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projForm.title || ""}
                  onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Funding Agency *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Department of Biotechnology (DBT)"
                    value={projForm.fundingAgency || ""}
                    onChange={(e) => setProjForm({ ...projForm, fundingAgency: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Amount Sanctioned</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹74,00,000 (74 Lakhs)"
                    value={projForm.amountSanctioned || ""}
                    onChange={(e) => setProjForm({ ...projForm, amountSanctioned: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Status</label>
                  <select
                    value={projForm.status || "ongoing"}
                    onChange={(e) => setProjForm({ ...projForm, status: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Grant Ref Number</label>
                  <input
                    type="text"
                    value={projForm.grantNumber || ""}
                    onChange={(e) => setProjForm({ ...projForm, grantNumber: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProjModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Course */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingCourse ? "Edit Course" : "Add Course / Curriculum"}
              </h3>
              <button onClick={() => setCourseModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-heading">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electromagnetic Waves and Waveguides"
                  value={courseForm.title || ""}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. ECE208"
                    value={courseForm.code || ""}
                    onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Category</label>
                  <select
                    value={courseForm.category || "Core"}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Level</label>
                  <select
                    value={courseForm.level || "Undergraduate"}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Practical Integration</label>
                <input
                  type="text"
                  placeholder="e.g. Integrated with practical using MATLAB / CS Studio"
                  value={courseForm.practicalIntegration || ""}
                  onChange={(e) => setCourseForm({ ...courseForm, practicalIntegration: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Description</label>
                <textarea
                  rows={2}
                  value={courseForm.description || ""}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Achievement */}
      {achModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingAch ? "Edit Recognition / Award" : "Add Recognition / Award"}
              </h3>
              <button onClick={() => setAchModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSaveAch} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-heading">Award / Recognition Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Teaching Competency Award"
                  value={achForm.title || ""}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Category</label>
                  <select
                    value={achForm.category || "award"}
                    onChange={(e) => setAchForm({ ...achForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="award">Award</option>
                    <option value="certification">Certification</option>
                    <option value="recognition">Recognition</option>
                    <option value="membership">Membership</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Year / Academic Session *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AY 2024-25"
                    value={achForm.year || ""}
                    onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Conferring Body / Issuer *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IQAC – KARE"
                    value={achForm.issuer || ""}
                    onChange={(e) => setAchForm({ ...achForm, issuer: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Badge Text (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Pedagogy Award"
                    value={achForm.badge || ""}
                    onChange={(e) => setAchForm({ ...achForm, badge: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Description / Citation</label>
                <textarea
                  rows={3}
                  placeholder="Official citation details..."
                  value={achForm.description || ""}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAchModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Recognition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Timeline */}
      {timeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingTime ? "Edit Milestone" : "Add Timeline Milestone"}
              </h3>
              <button onClick={() => setTimeModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSaveTime} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Year / Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2022 – Present"
                    value={timeForm.year || ""}
                    onChange={(e) => setTimeForm({ ...timeForm, year: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Category</label>
                  <select
                    value={timeForm.category || "experience"}
                    onChange={(e) => setTimeForm({ ...timeForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                    <option value="fellowship">Fellowship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Academic Leadership & DBT PI"
                  value={timeForm.title || ""}
                  onChange={(e) => setTimeForm({ ...timeForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Role or Degree</label>
                <input
                  type="text"
                  placeholder="e.g. Associate Professor & PI"
                  value={timeForm.roleOrDegree || ""}
                  onChange={(e) => setTimeForm({ ...timeForm, roleOrDegree: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. KARE"
                    value={timeForm.institution || ""}
                    onChange={(e) => setTimeForm({ ...timeForm, institution: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Krishnankoil, Tamil Nadu"
                    value={timeForm.location || ""}
                    onChange={(e) => setTimeForm({ ...timeForm, location: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Description</label>
                <textarea
                  rows={2}
                  value={timeForm.description || ""}
                  onChange={(e) => setTimeForm({ ...timeForm, description: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTimeModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Gallery */}
      {galModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-heading">
                {editingGal ? "Edit Photo Record" : "Add Photo to Gallery"}
              </h3>
              <button onClick={() => setGalModalOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSaveGal} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-heading">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biomedical Laboratory Setup"
                  value={galForm.title || ""}
                  onChange={(e) => setGalForm({ ...galForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-heading">Category</label>
                  <select
                    value={galForm.category || "Research & Labs"}
                    onChange={(e) => setGalForm({ ...galForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  >
                    <option value="Research & Labs">Research & Labs</option>
                    <option value="Conferences & Talks">Conferences & Talks</option>
                    <option value="International">International</option>
                    <option value="Student Mentorship">Student Mentorship</option>
                    <option value="Awards & Honors">Awards & Honors</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-heading">Date / Year</label>
                  <input
                    type="text"
                    placeholder="e.g. March 2024"
                    value={galForm.dateOrYear || ""}
                    onChange={(e) => setGalForm({ ...galForm, dateOrYear: e.target.value })}
                    className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-heading">Image Source *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={galForm.imageUrl || ""}
                    onChange={(e) => setGalForm({ ...galForm, imageUrl: e.target.value })}
                    className="flex-1 p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                  />
                  <input
                    type="file"
                    ref={galFileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => galFileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl border border-border bg-muted text-heading font-semibold hover:bg-card shrink-0 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>
                </div>

                {galForm.imageUrl && (
                  <div className="w-full h-28 rounded-xl overflow-hidden border border-border bg-muted">
                    <img
                      src={galForm.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Location</label>
                <input
                  type="text"
                  placeholder="e.g. KARE Campus, Krishnankoil"
                  value={galForm.location || ""}
                  onChange={(e) => setGalForm({ ...galForm, location: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-heading">Description</label>
                <textarea
                  rows={2}
                  placeholder="Context and details of this event or laboratory milestone..."
                  value={galForm.description || ""}
                  onChange={(e) => setGalForm({ ...galForm, description: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGalModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:opacity-90 shadow-xs"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Reset Modal */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-heading">Reset Demo Data?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This will restore all publications, sponsored projects, courses, achievements, and gallery items back to the original authenticated baseline.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  resetCustomPalette();
                  setConfirmResetOpen(false);
                  showToast("Data Restored", "Portfolio reset to original baseline.", "success");
                }}
                className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
