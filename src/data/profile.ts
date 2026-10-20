import { AcademicProfile } from "@/types";

export const initialProfileData: AcademicProfile = {
  name: "Dr. Josephine Selle Jeyanathan",
  title: "Ph.D. in Information & Communication Engineering",
  role: "Associate Professor",
  department: "Department of Electronics and Communication Engineering",
  institution: "Kalasalingam Academy of Research and Education",
  tagline:
    "Associate Professor, Kalasalingam University | Medical Thermography | Machine Learning | IEEE Member | IIEECP certified | IEEE KARE student branch SPS advisor | Empowering students through right believing!",
  location: "Krishnankoil, Tamil Nadu, India",
  email: "drjjosephine@gmail.com",
  phoneDisplay: "+91-994-070-6395",
  avatarUrl: "/avatar.jpg",
  bioSummary:
    "I am Josephine Selle Jeyanathan, serving as an Associate Professor at Kalasalingam Academy of Research and Education since 2016. With a Ph.D. in Information and Communication Engineering from Anna University, my research focuses on \"Analysis of Breast Thermograms Using Pattern Classification.\" My expertise lies in Medical Image Processing, Soft Computing, and Pattern Classification, highlighted by my active contributions to a project at the Indira Gandhi Centre for Atomic Research from 2012 to 2015.\n\nAs a dedicated member of IEEE and the Biomedical Engineering Society for India, I am committed to advancing technology and promoting biomedical engineering in the country. Additionally, I am an IIEECP certified candidate with a keen interest in incorporating digital pedagogies for teaching and learning processes.",
  careerObjective:
    "Seeking a position in a leading organization where I can apply the knowledge gained through my research experience and post-graduation. I firmly believe in the principle of implementing my duties with dedication and determination. I am looking for good career growth opportunities where my talent and knowledge could be best subjected and utilized for the benefit of the organization and society.",
  identifiers: {
    scopusId: "57207916322",
    orcidId: "https://orcid.org/0000-0003-2219-6748",
    wosResearcherId: "U-1254-2019",
    googleScholarUrl: "https://scholar.google.com/citations?user=byOW1VQAAAAJ&hl=en",
    linkedInUrl: "https://www.linkedin.com/in/drjosephine",
  },
  researchInterests: [
    "Medical Image Processing",
    "IoT",
    "Machine Learning techniques",
    "Breast Thermography",
    "Control Systems",
  ],
  softwareSkills: [
    {
      skill: "MATLAB",
      proficiency: "Proficient",
      levelPercent: 96,
      category: "Simulation & Medical Imaging",
      applicationContext:
        "Medical Image Processing, Control Systems Toolbox, Simulink Modeling & Advisor to MATLAB Student Chapter",
      colorGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    },
    {
      skill: "LabVIEW (CLAD Certified)",
      proficiency: "Proficient",
      levelPercent: 92,
      category: "Instrumentation & DAQ",
      applicationContext:
        "Certified LabVIEW Associate Developer (CLAD), Virtual Instrumentation, Sensor Interfacing & Data Acquisition",
      colorGradient: "from-amber-500 via-orange-600 to-yellow-500",
    },
    {
      skill: "MS Office",
      proficiency: "Proficient",
      levelPercent: 94,
      category: "Technical Documentation",
      applicationContext:
        "High-Impact Research Manuscripts, Course Plan Manuals (Best Manual Awards), and Institutional Accreditation Reports",
      colorGradient: "from-emerald-600 via-teal-600 to-green-500",
    },
    {
      skill: "Python",
      proficiency: "Intermediate",
      levelPercent: 82,
      category: "Machine Learning & AI",
      applicationContext:
        "Pattern Classification, Scikit-Learn Models, Deep Learning Pipelines for Diabetic Foot & Thermogram Analysis",
      colorGradient: "from-sky-500 via-blue-500 to-indigo-500",
    },
    {
      skill: "C Language",
      proficiency: "Intermediate",
      levelPercent: 80,
      category: "Embedded & Programming",
      applicationContext:
        "Microcontroller Firmware, Embedded C, Industry Curriculum Design with Nanochip Solutions Bangalore",
      colorGradient: "from-purple-600 via-violet-600 to-pink-500",
    },
    {
      skill: "SPSS for Statistical Analysis",
      proficiency: "Intermediate",
      levelPercent: 76,
      category: "Statistical & Clinical",
      applicationContext:
        "Biostatistical Evaluation, Multivariate Analysis, Logistic Regression & Clinical Diagnostics Validation",
      colorGradient: "from-rose-500 via-pink-600 to-amber-500",
    },
  ],
  languages: [
    { language: "English", level: "Fluent (Speak, Read & Understand)" },
    { language: "Hindi", level: "Fluent (Speak, Read & Understand)" },
    { language: "Tamil", level: "Fluent (Speak, Read & Understand)" },
    { language: "Marathi", level: "Conversational" },
    { language: "French", level: "Beginner (Speak, Read & Understand)" },
  ],
  metrics: {
    yearsExperience: 14,
    publicationsCount: 46, // 28 Journal Articles + 15 Conferences + 3 Book Chapters
    fundedGrantLakhs: 76, // ₹74L DBT + ₹2L KARE Seed
    batchesMentored: 36, // 36 B.Tech batches since 2016
    eventsAttended: 43, // 19 Workshops/Seminars + 24 Short-term courses/FDPs
    invitedLectures: 15,
    awardsCount: 5,
  },
};
