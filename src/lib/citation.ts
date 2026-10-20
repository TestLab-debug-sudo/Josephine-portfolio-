import { Publication } from "@/types";

export function generateBibTeX(pub: Publication): string {
  const firstAuthor = pub.authors[0]
    ? pub.authors[0].split(" ")[0].toLowerCase().replace(/[^a-z]/g, "")
    : "author";
  const citeKey = `${firstAuthor}${pub.year}${pub.title.slice(0, 5).replace(/\s+/g, "").toLowerCase()}`;

  const entryType =
    pub.type === "journal"
      ? "article"
      : pub.type === "book-chapter"
      ? "incollection"
      : "inproceedings";

  const authorsString = pub.authors.join(" and ");

  let bib = `@${entryType}{${citeKey},\n`;
  bib += `  author = {${authorsString}},\n`;
  bib += `  title = {${pub.title}},\n`;

  if (pub.type === "journal") {
    bib += `  journal = {${pub.venue}},\n`;
    if (pub.volume) bib += `  volume = {${pub.volume}},\n`;
    if (pub.issue) bib += `  number = {${pub.issue}},\n`;
  } else if (pub.type === "book-chapter") {
    bib += `  booktitle = {${pub.venue}},\n`;
    if (pub.publisher) bib += `  publisher = {${pub.publisher}},\n`;
  } else {
    bib += `  booktitle = {${pub.venue}},\n`;
  }

  if (pub.pages) bib += `  pages = {${pub.pages}},\n`;
  bib += `  year = {${pub.year}},\n`;
  if (pub.doi) bib += `  doi = {${pub.doi}}\n`;
  bib += `}`;

  return bib;
}

export function generateAPA(pub: Publication): string {
  const authorsStr =
    pub.authors.length > 1
      ? `${pub.authors.slice(0, -1).join(", ")}, & ${pub.authors[pub.authors.length - 1]}`
      : pub.authors[0] || "Unknown Author";

  let citation = `${authorsStr} (${pub.year}). ${pub.title}. *${pub.venue}*`;
  if (pub.volume) citation += `, ${pub.volume}`;
  if (pub.issue) citation += `(${pub.issue})`;
  if (pub.pages) citation += `, ${pub.pages}`;
  citation += ".";
  if (pub.doi) citation += ` https://doi.org/${pub.doi}`;

  return citation;
}

export function generateIEEE(pub: Publication): string {
  const authorsStr = pub.authors.join(", ");
  let citation = `${authorsStr}, "${pub.title}," *${pub.venue}*`;
  if (pub.volume) citation += `, vol. ${pub.volume}`;
  if (pub.issue) citation += `, no. ${pub.issue}`;
  if (pub.pages) citation += `, pp. ${pub.pages}`;
  citation += `, ${pub.year}.`;
  if (pub.doi) citation += ` doi: ${pub.doi}.`;

  return citation;
}
