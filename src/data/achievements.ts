import { AcademicAchievement } from "@/types";

export const initialAchievementsData: AcademicAchievement[] = [
  // Grants & Research Seed Support
  {
    id: "ach-dbt-grant",
    title: "Sanctioned Research Grant of ₹74,00,000 (74 Lakhs) as Principal Investigator",
    category: "award",
    year: "2023 – Ongoing",
    issuer: "Department of Biotechnology (DBT), Govt. of India",
    description:
      "Principal Investigator for ongoing project funded by Department of Biotechnology (DBT) titled 'Design of an AI-Based IR Grading Device for Early Detection of Diabetic Foot Ulcers' (Grant No. BT/PR51612/CMD/150/200/2023) sanctioned for amount Rs. 74L.",
    badge: "National Grant (₹74L)",
  },
  {
    id: "ach-kare-seed",
    title: "KARE Seed Money Research Scheme Award (₹2,00,000)",
    category: "award",
    year: "2021",
    issuer: "Kalasalingam Academy of Research and Education",
    description:
      "Received financial support of amount Rs. 2,00,000 towards seed money for the project titled 'An IoT Based Ambient Assistive Technology Grading System for Diabetic Foot Ulcer Patients using Hybrid Machine Learning Techniques' under KARE Seed Money Research Scheme.",
    badge: "Seed Grant (₹2L)",
  },

  // Teaching Competency & Pedagogical Awards
  {
    id: "ach-p2bl-2024",
    title: "Awarded for 'Effective Implementation of P2BL' – Teaching Competency Award",
    category: "award",
    year: "AY 2024-25",
    issuer: "Internal Quality Assurance Cell (IQAC) – KARE",
    description:
      "Awarded for the 'Effective Implementation of P2BL' during the Teaching Competency Award by IQAC – KARE for AY 2024-25, encouraging student prototype development and patent filing.",
    badge: "Pedagogy Award",
  },
  {
    id: "ach-teaching-comp-2016",
    title: "Best Teaching Competence – Course Plan & Lecture Note Preparation & Implementation",
    category: "award",
    year: "AY 2016-17",
    issuer: "Kalasalingam Academy of Research and Education",
    description:
      "Awarded for Best Teaching Competence – Course Plan & Lecture Note Preparation & Implementation for the academic year 2016-2017.",
    badge: "Teaching Excellence",
  },
  {
    id: "ach-manual-control",
    title: "Best Theory with Practical Component Manual – Control System Engineering",
    category: "award",
    year: "AY 2016-17",
    issuer: "Academic Council – KARE",
    description:
      "Awarded for the manual prepared by the title 'Best Theory with Practical Component' for the course, Control System Engineering ECE208 during the academic year 2016-2017.",
    badge: "Best Manual Award",
  },
  {
    id: "ach-manual-matlab",
    title: "Best Theory with Practical Component Manual – Numerical Analysis using MATLAB",
    category: "award",
    year: "AY 2018-19",
    issuer: "Academic Council – KARE",
    description:
      "Awarded for the manual prepared by the title 'Best Theory with Practical Component' for the course, Numerical Analysis using MATLAB ECE18R253 during the academic year 2018-2019.",
    badge: "Best Manual Award",
  },

  // International Recognition & Keynote Presentations
  {
    id: "ach-tencon-2018",
    title: "Paper Presentation at IEEE Region 10 TENCON 2018, Jeju, Korea",
    category: "recognition",
    year: "2018",
    issuer: "IEEE Region 10 (Asia - Pacific)",
    description:
      "Presented a paper titled 'Analysis of Breast Thermograms in Lateral Views using Texture Features', IEEE Region 10 (Asia - Pacific) Conference, TENCON 2018 held from 28th to 31st October 2018 at Ramada Hotel, Jeju, Korea.",
    badge: "IEEE TENCON Korea",
  },
  {
    id: "ach-ictiee-2025",
    title: "Paper Presentation at 12th ICTIEE 2025, IUCEE",
    category: "recognition",
    year: "2025",
    issuer: "IUCEE at VJIET, Hyderabad",
    description:
      "Presented a paper titled 'Assessment of Learning: Student Teams Achievement Division Technique for Empowering Students in Problem Solving Courses' in 12th International Conference on Transformations in Engineering Education (ICTIEE 2025) organized by IUCEE at VJIET, Hyderabad during 8th – 10th Jan 2025.",
    badge: "ICTIEE 2025",
  },
  {
    id: "ach-isip-avignon",
    title: "Academic Mentorship – 2025 ISIP Internship at Avignon University, France",
    category: "recognition",
    year: "2025",
    issuer: "Avignon University, France",
    description:
      "Supported and tutored the 2025 ISIP internship students at Avignon University, France from 23rd June to 26th July 2025.",
    badge: "Global Mentorship",
  },

  // Professional Certifications
  {
    id: "ach-iueecp-cert",
    title: "IIEECP - IUCEE International Engineering Educator Certification Program",
    category: "certification",
    year: "Fall 2022",
    issuer: "IUCEE Foundation",
    description:
      "Completed certification course on IIEECP - IUCEE International Engineering Educator Certification Program Fall 2022 organized by IUCEE Foundation.",
    badge: "IUCEE Certified",
  },
  {
    id: "ach-aicte-qip",
    title: "AICTE-QIP-PG Programme on 'Internet of Things' at IIT Jammu",
    category: "certification",
    year: "July – Dec 2024",
    issuer: "Indian Institute of Technology (IIT) Jammu",
    description:
      "Completed AICTE-QIP-PG programme on 'Internet of Things' which was held at IIT Jammu from July – December 2024.",
    badge: "IIT Jammu Fellow",
  },
  {
    id: "ach-iad-isro",
    title: "Remote Sensing and Digital Image Analysis – IIRS, ISRO",
    category: "certification",
    year: "Aug – Sept 2017",
    issuer: "Indian Institute of Remote Sensing (IIRS), ISRO, Dehradun",
    description:
      "Completed a certificate course on 'Remote Sensing and Digital Image Analysis' conducted by Indian Institute of Remote Sensing (IIRS), ISRO, from August 21, 2017, to September 15, 2017.",
    badge: "IIRS / ISRO",
  },
  {
    id: "ach-clad",
    title: "Certified LabVIEW Associate Developer (CLAD)",
    category: "certification",
    year: "National Instruments",
    issuer: "National Instruments",
    description:
      "Completed the Certified course in LabVIEW and achieved the title as Certified LabView Associate Developer (CLAD).",
    badge: "CLAD Certified",
  },
  {
    id: "ach-nptel",
    title: "NPTEL Multi-Course Certifications in Research & Pedagogy",
    category: "certification",
    year: "NPTEL / SWAYAM",
    issuer: "NPTEL / IIT Madras",
    description:
      "Completed NPTEL certification course on Introduction to Research, Health Research Fundamentals, and Effective Engineering Teaching in Practice.",
    badge: "NPTEL Certified",
  },

  // Professional Society Memberships
  {
    id: "ach-bmesi",
    title: "Life Member – Biomedical Engineering Society of India (BMESI)",
    category: "membership",
    year: "Life Member",
    issuer: "Biomedical Engineering Society of India",
    description:
      "Life member in Biomedical Engineering Society of India (LM No. 1066).",
    badge: "LM No. 1066",
  },
  {
    id: "ach-ieee",
    title: "IEEE Professional Member",
    category: "membership",
    year: "Professional Member",
    issuer: "Institute of Electrical and Electronics Engineers (IEEE)",
    description:
      "IEEE Professional body membership no 94191964.",
    badge: "IEEE 94191964",
  },
];
