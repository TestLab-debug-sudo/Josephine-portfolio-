"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Activity,
  Cpu,
  Brain,
  Sliders,
  Sparkles,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

interface ResearchDomain {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  technologies: string[];
  keyApplication: string;
}

export function ResearchFocus() {
  const { profile, publications, projects } = useData();
  const [selectedDomain, setSelectedDomain] = useState<string>("Medical Image Processing");

  const domains: ResearchDomain[] = [
    {
      id: "dom-med-img",
      title: "Medical Image Processing",
      subtitle: "Infrared Thermography & Multi-Spectral Imaging",
      icon: Activity,
      description:
        "Developing automated computer-aided detection (CAD) systems for breast thermograms, ocular contour mapping, and non-invasive early pathology diagnostics using advanced texture transforms and contourlet decomposition.",
      technologies: ["MATLAB", "Contourlet Transforms", "GLCM Texture Descriptors", "Level-Set Segmentation"],
      keyApplication: "PhD Dissertation & DBT Plantar Diagnostics",
    },
    {
      id: "dom-iot",
      title: "Internet of Things (IoT)",
      subtitle: "Embedded Telemetry & Smart Sensor Networks",
      icon: Cpu,
      description:
        "Designing low-power wireless biomedical nodes, ambient assistive health mats, and smart consumer safety devices utilizing microcontrollers, Time-of-Flight sensors, and cloud communication pipelines.",
      technologies: ["ESP32 / Arduino", "MQTT", "Time-of-Flight (ToF)", "Gas Sensor Arrays", "LoRa / BLE"],
      keyApplication: "Assistive Care Mats, Smart Kitchen Safety & Maritime Beacons",
    },
    {
      id: "dom-ml",
      title: "Machine Learning & Pattern Classification",
      subtitle: "Supervised Diagnostics & Edge Inference",
      icon: Brain,
      description:
        "Applying Support Vector Machines (SVM), Logistic Regression, Collaborative Filtering, and Convolutional Neural Networks (CNNs) to biomedical datasets, thermal asymmetry maps, and agricultural recommender engines.",
      technologies: ["Python", "PyTorch", "Scikit-Learn", "SVM", "Deep CNNs", "Collaborative Filtering"],
      keyApplication: "Diabetic Foot Ulcer Grading & Mass Mammogram Classification",
    },
    {
      id: "dom-breast-thermo",
      title: "Infrared Thermography",
      subtitle: "Thermal Vascularity & Bilateral Asymmetry",
      icon: Layers,
      description:
        "Pioneering protocol standardizations for lateral view breast thermogram captures and automated Region of Interest (ROI) segmentation, establishing thermal asymmetry indicators with IGCAR Kalpakkam.",
      technologies: ["FLIR Infrared Cameras", "Thermal Calibrations", "Bilateral Asymmetry Analysis"],
      keyApplication: "TENCON Korea 2018 Keynotes & QIRT Publications",
    },
    {
      id: "dom-control-sys",
      title: "Control Systems & Instrumentation",
      subtitle: "Model-Based Design & Hardware-in-the-Loop",
      icon: Sliders,
      description:
        "Integrating classical control theory with practical MATLAB/Simulink laboratories. Awarded Best Course Manual for Control System Engineering (ECE208) integrating root-locus and state-space PID design.",
      technologies: ["Simulink", "State-Space Modeling", "Bode / Nyquist Analysis", "PID Regulators"],
      keyApplication: "Awarded Academic Manual & Mechatronic Actuators",
    },
  ];

  const currentDomainObj = domains.find((d) => d.title === selectedDomain) || domains[0];

  // Count related publications roughly
  const relatedPubs = publications.filter((p) =>
    p.tags.some((tag) =>
      tag.toLowerCase().includes(selectedDomain.toLowerCase().slice(0, 5))
    )
  );

  return (
    <section id="research" className="py-20 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Core Scientific Thrusts</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Research Domains & Specializations
            </ScrollFloat>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Bridging electronic instrumentation, infrared imaging physics, and clinical machine learning to build translational medical diagnostics.
          </p>
        </div>

        {/* Interactive Domain Pills */}
        <FadeContent
          effect="focus"
          blur={6}
          duration={0.8}
          threshold={0.15}
        >
          <div className="flex flex-wrap gap-2.5 pb-2">
            {domains.map((dom) => {
              const isSelected = dom.title === selectedDomain;
              const Icon = dom.icon;
              return (
                <button
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom.title)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-soft"
                      : "bg-card border-border text-muted-foreground hover:text-heading hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{dom.title}</span>
                </button>
              );
            })}
          </div>
        </FadeContent>

        {/* Highlighted Domain Showcase Card */}
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          threshold={0.1}
        >
          <div className="academic-card p-6 sm:p-8 bg-gradient-to-br from-card via-card to-muted/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {currentDomainObj.subtitle}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">
                  Active Investigation
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold text-heading">
                {currentDomainObj.title}
              </h3>

              <p className="text-sm sm:text-base text-card-foreground/90 leading-relaxed font-normal">
                {currentDomainObj.description}
              </p>

              {/* Technologies */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Methodologies & Toolsets
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDomainObj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-muted text-heading text-xs font-semibold border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <div className="text-xs">
                  <span className="text-muted-foreground">Primary Field Translation: </span>
                  <span className="font-bold text-heading">{currentDomainObj.keyApplication}</span>
                </div>
              </div>
            </div>

            {/* Right Mini Panel: Filter Link to Publications */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-muted/40 border border-border space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-heading flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Associated Scholarship
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explore peer-reviewed publications and conference disseminations focused on {currentDomainObj.title}.
              </p>
              <div className="pt-2">
                <Link
                  href={`/research?tab=publications&q=${encodeURIComponent(currentDomainObj.title.split(" ")[0])}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary text-xs font-semibold text-heading transition-all shadow-xs group"
                >
                  <span>View Filtered Publications</span>
                  <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
      </div>
    </section>
  );
}
