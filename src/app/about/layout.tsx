import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Josephine Selle Jeyanathan | Academic Curriculum Vitae & Dossier",
  description:
    "Comprehensive academic portfolio and official curriculum vitae of Dr. Josephine Selle Jeyanathan. Ph.D. Anna University, M.E. Distinction, B.E., Associate Professor & DBT Principal Investigator.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
