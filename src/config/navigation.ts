export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Teaching", href: "/teaching" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const QUICK_METRIC_TAGS = [
  "DBT Grantee (₹74L)",
  "Ph.D. Anna Univ",
  "31+ Indexed Papers",
  "36 Student Batches",
  "ISRO & IUCEE Certified",
];
