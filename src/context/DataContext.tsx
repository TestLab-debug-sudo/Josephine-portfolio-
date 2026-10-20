"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AcademicProfile,
  Publication,
  ResearchProject,
  Course,
  TimelineMilestone,
  AcademicAchievement,
  InvitedTalk,
  EventOrganized,
  GalleryItem,
} from "@/types";
import { initialProfileData } from "@/data/profile";
import { initialPublicationsData } from "@/data/publications";
import { initialProjectsData } from "@/data/projects";
import { initialCoursesData } from "@/data/courses";
import { initialTimelineData } from "@/data/timeline";
import { initialAchievementsData } from "@/data/achievements";
import { initialTalksData } from "@/data/talks";
import { initialEventsOrganizedData } from "@/data/eventsOrganized";
import { initialGalleryData } from "@/data/gallery";

interface DataContextType {
  profile: AcademicProfile;
  publications: Publication[];
  projects: ResearchProject[];
  courses: Course[];
  timeline: TimelineMilestone[];
  achievements: AcademicAchievement[];
  talks: InvitedTalk[];
  eventsOrganized: EventOrganized[];
  gallery: GalleryItem[];
  isLoaded: boolean;
  hasCustomData: boolean;

  // Actions
  updateProfile: (profile: AcademicProfile) => void;

  addPublication: (publication: Publication) => void;
  updatePublication: (publication: Publication) => void;
  deletePublication: (id: string) => void;

  addProject: (project: ResearchProject) => void;
  updateProject: (project: ResearchProject) => void;
  deleteProject: (id: string) => void;

  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;

  addAchievement: (achievement: AcademicAchievement) => void;
  updateAchievement: (achievement: AcademicAchievement) => void;
  deleteAchievement: (id: string) => void;

  addTimeline: (milestone: TimelineMilestone) => void;
  updateTimeline: (milestone: TimelineMilestone) => void;
  deleteTimeline: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  resetToDefaults: () => void;
}

const STORAGE_KEY = "academic_portfolio_data_v2";

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<AcademicProfile>(initialProfileData);
  const [publications, setPublications] = useState<Publication[]>(initialPublicationsData);
  const [projects, setProjects] = useState<ResearchProject[]>(initialProjectsData);
  const [courses, setCourses] = useState<Course[]>(initialCoursesData);
  const [timeline, setTimeline] = useState<TimelineMilestone[]>(initialTimelineData);
  const [achievements, setAchievements] = useState<AcademicAchievement[]>(initialAchievementsData);
  const [talks, setTalks] = useState<InvitedTalk[]>(initialTalksData);
  const [eventsOrganized, setEventsOrganized] = useState<EventOrganized[]>(initialEventsOrganizedData);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGalleryData);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasCustomData, setHasCustomData] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.publications) setPublications(parsed.publications);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.courses) setCourses(parsed.courses);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.achievements) setAchievements(parsed.achievements);
        if (parsed.talks) setTalks(parsed.talks);
        if (parsed.eventsOrganized) setEventsOrganized(parsed.eventsOrganized);
        if (parsed.gallery) setGallery(parsed.gallery);
        setHasCustomData(true);
      }
    } catch {
      // Fall back to initial files on parse error
    }
    setIsLoaded(true);
  }, []);

  // Save changes helper
  const persistState = (overrides: Partial<{
    profile: AcademicProfile;
    publications: Publication[];
    projects: ResearchProject[];
    courses: Course[];
    timeline: TimelineMilestone[];
    achievements: AcademicAchievement[];
    talks: InvitedTalk[];
    eventsOrganized: EventOrganized[];
    gallery: GalleryItem[];
  }>) => {
    try {
      const payload = {
        profile: overrides.profile ?? profile,
        publications: overrides.publications ?? publications,
        projects: overrides.projects ?? projects,
        courses: overrides.courses ?? courses,
        timeline: overrides.timeline ?? timeline,
        achievements: overrides.achievements ?? achievements,
        talks: overrides.talks ?? talks,
        eventsOrganized: overrides.eventsOrganized ?? eventsOrganized,
        gallery: overrides.gallery ?? gallery,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setHasCustomData(true);
    } catch {
      // Storage quota exceeded or disabled
    }
  };

  const updateProfile = (newProfile: AcademicProfile) => {
    setProfile(newProfile);
    persistState({ profile: newProfile });
  };

  const addPublication = (pub: Publication) => {
    const updated = [pub, ...publications];
    setPublications(updated);
    persistState({ publications: updated });
  };

  const updatePublication = (pub: Publication) => {
    const updated = publications.map((p) => (p.id === pub.id ? pub : p));
    setPublications(updated);
    persistState({ publications: updated });
  };

  const deletePublication = (id: string) => {
    const updated = publications.filter((p) => p.id !== id);
    setPublications(updated);
    persistState({ publications: updated });
  };

  const addProject = (proj: ResearchProject) => {
    const updated = [proj, ...projects];
    setProjects(updated);
    persistState({ projects: updated });
  };

  const updateProject = (proj: ResearchProject) => {
    const updated = projects.map((p) => (p.id === proj.id ? proj : p));
    setProjects(updated);
    persistState({ projects: updated });
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    persistState({ projects: updated });
  };

  const addCourse = (course: Course) => {
    const updated = [course, ...courses];
    setCourses(updated);
    persistState({ courses: updated });
  };

  const updateCourse = (course: Course) => {
    const updated = courses.map((c) => (c.id === course.id ? course : c));
    setCourses(updated);
    persistState({ courses: updated });
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    persistState({ courses: updated });
  };

  const addAchievement = (achievement: AcademicAchievement) => {
    const updated = [achievement, ...achievements];
    setAchievements(updated);
    persistState({ achievements: updated });
  };

  const updateAchievement = (achievement: AcademicAchievement) => {
    const updated = achievements.map((a) => (a.id === achievement.id ? achievement : a));
    setAchievements(updated);
    persistState({ achievements: updated });
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    persistState({ achievements: updated });
  };

  const addTimeline = (milestone: TimelineMilestone) => {
    const updated = [milestone, ...timeline];
    setTimeline(updated);
    persistState({ timeline: updated });
  };

  const updateTimeline = (milestone: TimelineMilestone) => {
    const updated = timeline.map((m) => (m.id === milestone.id ? milestone : m));
    setTimeline(updated);
    persistState({ timeline: updated });
  };

  const deleteTimeline = (id: string) => {
    const updated = timeline.filter((m) => m.id !== id);
    setTimeline(updated);
    persistState({ timeline: updated });
  };

  const addGalleryItem = (item: GalleryItem) => {
    const updated = [item, ...gallery];
    setGallery(updated);
    persistState({ gallery: updated });
  };

  const updateGalleryItem = (item: GalleryItem) => {
    const updated = gallery.map((g) => (g.id === item.id ? item : g));
    setGallery(updated);
    persistState({ gallery: updated });
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    persistState({ gallery: updated });
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setProfile(initialProfileData);
    setPublications(initialPublicationsData);
    setProjects(initialProjectsData);
    setCourses(initialCoursesData);
    setTimeline(initialTimelineData);
    setAchievements(initialAchievementsData);
    setTalks(initialTalksData);
    setEventsOrganized(initialEventsOrganizedData);
    setGallery(initialGalleryData);
    setHasCustomData(false);
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        publications,
        projects,
        courses,
        timeline,
        achievements,
        talks,
        eventsOrganized,
        gallery,
        isLoaded,
        hasCustomData,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
