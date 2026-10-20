export type AcademicRole =
  | "Professor"
  | "Associate Professor"
  | "Assistant Professor"
  | "Researcher"
  | "Scientist"
  | "Faculty"
  | "Academician";

export interface ScholarIdentifiers {
  scopusId: string;
  orcidId: string;
  wosResearcherId: string;
  googleScholarUrl: string;
  linkedInUrl: string;
}

export interface AcademicMetric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface SoftwareSkill {
  skill: string;
  proficiency: "Proficient" | "Advanced" | "Intermediate";
  levelPercent?: number;
  category?: string;
  applicationContext?: string;
  colorGradient?: string;
}

export interface LanguageProficiency {
  language: string;
  level: string;
}

export interface AcademicProfile {
  name: string;
  title: string;
  role: AcademicRole;
  department: string;
  institution: string;
  tagline?: string;
  location: string;
  email: string;
  phoneDisplay: string;
  avatarUrl: string;
  bioSummary: string;
  careerObjective: string;
  identifiers: ScholarIdentifiers;
  researchInterests: string[];
  softwareSkills: SoftwareSkill[];
  languages: LanguageProficiency[];
  metrics: {
    yearsExperience: number;
    publicationsCount: number;
    fundedGrantLakhs: number;
    batchesMentored: number;
    eventsAttended: number;
    invitedLectures: number;
    awardsCount: number;
  };
}

export type PublicationType = "journal" | "conference" | "book-chapter";
export type IndexingBody = "Scopus" | "WoS" | "Both" | "Peer-Reviewed";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  type: PublicationType;
  indexing: IndexingBody;
  doi?: string;
  url?: string;
  abstract?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publisher?: string;
  tags: string[];
  isFeatured?: boolean;
}

export type ProjectStatus = "ongoing" | "completed";

export interface ResearchProject {
  id: string;
  title: string;
  role: string;
  fundingAgency: string;
  grantNumber?: string;
  amountSanctioned: string; // e.g. "₹74,00,000 (74 Lakhs)"
  amountNumericLakhs: number;
  duration: string;
  status: ProjectStatus;
  domain: string;
  description: string;
  technologies: string[];
  collaborators?: string[];
  outcomes: string[];
  isFeatured?: boolean;
}

export type CourseCategory = "Core" | "Elective" | "Laboratory" | "Workshop";

export interface Course {
  id: string;
  title: string;
  code?: string;
  category: CourseCategory;
  level: "Undergraduate" | "Postgraduate";
  practicalIntegration?: string; // e.g. "Integrated with practical using MATLAB / CS Studio"
  toolsUsed: string[];
  description: string;
  syllabusHighlights: string[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  roleOrDegree: string;
  institution: string;
  location: string;
  category: "education" | "experience" | "fellowship";
  description: string;
  gradeOrDistinction?: string;
}

export interface AcademicAchievement {
  id: string;
  title: string;
  category: "award" | "certification" | "recognition" | "membership";
  year: string;
  issuer: string;
  description: string;
  badge?: string;
}

export interface InvitedTalk {
  id: string;
  title: string;
  event: string;
  venue: string;
  date: string;
  year: number;
  location: string;
  type: "keynote" | "invited-lecture" | "webinar" | "hands-on" | "session-chair";
  sponsor?: string;
}

export interface EventOrganized {
  id: string;
  title: string;
  type: "conference" | "workshop" | "webinar" | "fdp" | "competition" | "extension";
  dateOrDuration: string;
  year: number;
  organizer: string;
  collaborationOrSponsor?: string;
  description: string;
}

export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  button: string;
  heading: string;
  background: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  description: string;
  light: ThemePalette;
  dark: ThemePalette;
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Publications" | "Research" | "Projects" | "Courses" | "Conferences" | "Awards" | "Certifications" | "Gallery";
  snippet: string;
  url: string;
  badge?: string;
}

export type GalleryCategory =
  | "All"
  | "Research & Labs"
  | "Conferences & Talks"
  | "International"
  | "Student Mentorship"
  | "Awards & Honors";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Research & Labs" | "Conferences & Talks" | "International" | "Student Mentorship" | "Awards & Honors";
  description: string;
  imageUrl: string;
  dateOrYear: string;
  location?: string;
  tags: string[];
}
