import { SearchResultItem, AcademicProfile, Publication, ResearchProject, Course, AcademicAchievement, InvitedTalk } from "@/types";

export function buildSearchIndex(
  profile: AcademicProfile,
  publications: Publication[],
  projects: ResearchProject[],
  courses: Course[],
  achievements: AcademicAchievement[],
  talks: InvitedTalk[]
): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // Research domains & interests
  profile.researchInterests.forEach((interest, idx) => {
    items.push({
      id: `res-interest-${idx}`,
      title: interest,
      category: "Research",
      snippet: `Research specialization and domain interest under ${profile.department}`,
      url: `/#research?domain=${encodeURIComponent(interest)}`,
      badge: "Domain",
    });
  });

  // Projects
  projects.forEach((proj) => {
    items.push({
      id: proj.id,
      title: proj.title,
      category: "Projects",
      snippet: `${proj.fundingAgency} (${proj.amountSanctioned}) - ${proj.status.toUpperCase()}`,
      url: `/#projects`,
      badge: proj.status === "ongoing" ? "Active Grant" : "Completed",
    });
  });

  // Publications
  publications.forEach((pub) => {
    items.push({
      id: pub.id,
      title: pub.title,
      category: "Publications",
      snippet: `${pub.authors.slice(0, 2).join(", ")}${pub.authors.length > 2 ? " et al." : ""} • ${pub.venue} (${pub.year})`,
      url: `/publications?q=${encodeURIComponent(pub.title.slice(0, 20))}`,
      badge: pub.indexing,
    });
  });

  // Courses
  courses.forEach((course) => {
    items.push({
      id: course.id,
      title: `${course.code ? `${course.code}: ` : ""}${course.title}`,
      category: "Courses",
      snippet: `${course.category} • ${course.level} • Tools: ${course.toolsUsed.join(", ")}`,
      url: `/#teaching`,
      badge: course.category,
    });
  });

  // Achievements & Certifications
  achievements.forEach((ach) => {
    items.push({
      id: ach.id,
      title: ach.title,
      category: ach.category === "certification" ? "Certifications" : "Awards",
      snippet: `${ach.issuer} (${ach.year}) - ${ach.description}`,
      url: `/#achievements`,
      badge: ach.badge || ach.category,
    });
  });

  // Talks & Conferences
  talks.forEach((talk) => {
    items.push({
      id: talk.id,
      title: talk.title,
      category: "Conferences",
      snippet: `${talk.event} • ${talk.venue}, ${talk.location} (${talk.year})`,
      url: `/#activity`,
      badge: talk.type.replace("-", " "),
    });
  });

  // Gallery
  items.push({
    id: "nav-gallery",
    title: "Photo Gallery & Field Archives",
    category: "Gallery",
    snippet: "Visual archive of international visits, lab instrumentation, hackathons, and awards",
    url: "/gallery",
    badge: "Archive",
  });

  return items;
}

export function filterSearchResults(items: SearchResultItem[], query: string): SearchResultItem[] {
  if (!query.trim()) return items.slice(0, 8);
  const q = query.toLowerCase().trim();
  return items
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    )
    .slice(0, 15);
}
