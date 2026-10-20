import { Course } from "@/types";

export const initialCoursesData: Course[] = [
  // 1. Core Courses
  {
    id: "course-emw",
    title: "Electromagnetic Waves and Transmission Lines",
    code: "ECE301",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "Integrated with practical laboratory simulations using CST Studio Suite",
    toolsUsed: ["CST Studio Suite", "Smith Chart Utilities", "MATLAB RF Toolbox"],
    description:
      "Rigorous mathematical and computational analysis of Maxwell's equations, plane wave propagation, skin depth, boundary conditions, wave reflection, transmission lines, and impedance matching networks.",
    syllabusHighlights: [
      "Static & Time-Varying Electromagnetic Fields and Maxwell's Equations",
      "Uniform Plane Wave Propagation in Lossless, Lossy, and Conducting Media",
      "Poynting Vector, Power Flow, and Polarization Analysis",
      "Transmission Line Theory, Characteristic Impedance, and Standing Waves",
      "Smith Chart Analysis, Stub Matching, and CST Studio 3D Simulations",
    ],
  },
  {
    id: "course-circuits",
    title: "Electronic Circuits",
    code: "ECE202",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "Integrated with circuit simulation and benchtop breadboard validation",
    toolsUsed: ["Multisim / SPICE", "Oscilloscopes", "Function Generators"],
    description:
      "Analysis and design of analog electronic circuits including BJT and MOSFET small-signal amplifiers, frequency response, feedback topologies, power amplifiers, and tuned circuits.",
    syllabusHighlights: [
      "Small-Signal BJT and MOSFET Amplifier Topologies (CE, CB, CC, CS, CD)",
      "Low and High Frequency Response Analysis (Bode Plots, Miller Effect)",
      "Feedback Amplifiers: Voltage/Current Series and Shunt Configurations",
      "Power Amplifiers: Class A, Class B Push-Pull, Class AB, and Efficiency Analysis",
      "Tuned Amplifiers, LC Oscillators, and Active Filter Design",
    ],
  },
  {
    id: "course-control",
    title: "Control Systems Engineering",
    code: "ECE208",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "Integrated with practical experimentation using MATLAB (Awarded Best Theory with Practical Component Manual AY 2016-17)",
    toolsUsed: ["MATLAB", "Simulink", "Control System Toolbox"],
    description:
      "Linear time-invariant system modeling, transient and steady-state responses, Root Locus, Nyquist & Bode frequency response analysis, state-space controllers, and PID tuning.",
    syllabusHighlights: [
      "Transfer Function Formulation and Block Diagram Reduction Techniques",
      "Time Domain Response: Transient Specifications and Steady-State Error",
      "Routh-Hurwitz Stability Criterion and Root Locus Design",
      "Frequency Response: Bode Plots, Nyquist Stability Criterion, and Margins",
      "State Space Modeling, Controllability, Observability, and PID Tuning in Simulink",
    ],
  },
  {
    id: "course-analog-dig-comm",
    title: "Analog and Digital Communication",
    code: "ECE304",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "Practical modulation testing using SDR kits and MATLAB Communication Toolbox",
    toolsUsed: ["MATLAB Communications Toolbox", "SDR Kits", "Spectrum Analyzers"],
    description:
      "Principles of analog modulation (AM, FM, PM) and digital transmission (PCM, DPCM, ASK, FSK, PSK, QAM), noise performance, eye diagrams, and channel capacity theorems.",
    syllabusHighlights: [
      "Amplitude Modulation, DSB-SC, SSB, VSB, and Superheterodyne Receivers",
      "Angle Modulation: Frequency and Phase Modulation, Carson's Rule",
      "Pulse Modulation: Sampling Theorem, PAM, PWM, PPM, and PCM Quantization",
      "Digital Carrier Modulation: BPSK, QPSK, QAM, and Matched Filter Detection",
      "Error Performance in AWGN Channels and Information Theory Theorems",
    ],
  },
  {
    id: "course-iot",
    title: "Internet of Things (IoT)",
    code: "ECE412",
    category: "Core",
    level: "Undergraduate",
    practicalIntegration: "Hands-on hardware labs with ESP32, Raspberry Pi, and Cloud Dashboards",
    toolsUsed: ["ESP32 / Arduino IDE", "MQTT Protocols", "Node-RED", "Python"],
    description:
      "Architectural foundations of modern IoT systems from sensor interfacing to low-power WAN communications, edge preprocessing, and cloud telemetry.",
    syllabusHighlights: [
      "IoT Ecosystem Architecture: Sensing, Actuation, and Gateway Layers",
      "Embedded Protocols: I2C, SPI, UART, MQTT, CoAP, and HTTP REST APIs",
      "Wireless Connectivity: BLE, Wi-Fi 6, Zigbee, and LoRaWAN",
      "Edge Computing with MicroPython and FreeRTOS Task Scheduling",
      "Cloud Telemetry Dashboards, End-to-End Security, and Device Management",
    ],
  },

  // 2. Elective Courses
  {
    id: "course-num-analysis",
    title: "Numerical Analysis using MATLAB",
    code: "ECE18R253",
    category: "Elective",
    level: "Undergraduate",
    practicalIntegration: "Awarded 'Best Theory with Practical Component' Manual (AY 2018-19)",
    toolsUsed: ["MATLAB", "Symbolic Math Toolbox"],
    description:
      "Computational algorithms for roots of non-linear equations, systems of linear algebraic equations, spline interpolation, numerical differentiation, integration, and ODE solvers.",
    syllabusHighlights: [
      "Errors in Numerical Calculations & Floating-Point Arithmetic",
      "Roots of Equations: Bisection, Newton-Raphson, and Secant Methods",
      "Matrix Inversion, Gauss-Seidel, and LU Decomposition",
      "Lagrange and Newton Interpolating Polynomials",
      "Numerical Integration: Trapezoidal, Simpson's Rules, and Runge-Kutta 4th Order",
    ],
  },
  {
    id: "course-ethics",
    title: "Professional Ethics",
    code: "ECE401",
    category: "Elective",
    level: "Undergraduate",
    toolsUsed: ["Case Study Analysis", "Engineering Ethics Frameworks"],
    description:
      "Instilling core moral values, research integrity, intellectual property stewardship, environmental considerations, and professional codes of ethics (IEEE/ACM) in engineering practice.",
    syllabusHighlights: [
      "Morals, Values, and Ethics in Global Engineering Practice",
      "Kohlberg's and Gilligan's Theories of Moral Development",
      "Safety, Risk Analysis, and Engineers' Responsibility in Industrial Catastrophes",
      "Intellectual Property Rights, Plagiarism, and Research Publication Integrity",
      "Environmental Ethics, Corporate Social Responsibility, and Global Codes of Conduct",
    ],
  },
  {
    id: "course-soft-comp",
    title: "Soft Computing",
    code: "ECE435",
    category: "Elective",
    level: "Undergraduate",
    practicalIntegration: "Practical AI models using Python and MATLAB Fuzzy Logic Toolbox",
    toolsUsed: ["Python", "MATLAB Neural Network & Fuzzy Logic Toolboxes"],
    description:
      "Explores synergistic combinations of Artificial Neural Networks, Fuzzy Logic, Genetic Algorithms, and Hybrid Neuro-Fuzzy inference systems for intelligent decision support and pattern recognition.",
    syllabusHighlights: [
      "Perceptrons, Multilayer Feedforward Networks, and Backpropagation",
      "Radial Basis Function Networks and Self-Organizing Maps (SOM)",
      "Classical Sets vs. Fuzzy Sets, Membership Functions, and Fuzzy Inference",
      "Genetic Algorithms: Crossover, Mutation, and Fitness Optimization",
      "Neuro-Fuzzy Systems (ANFIS) and Biomedical Image Pattern Classification",
    ],
  },
  {
    id: "course-wsn",
    title: "Wireless Sensor Networks",
    code: "ECE442",
    category: "Elective",
    level: "Undergraduate",
    practicalIntegration: "Sensor node network modeling and simulation using NS-2 / MATLAB",
    toolsUsed: ["NS-2", "MATLAB", "Zigbee Modules"],
    description:
      "Architecture, routing protocols, energy management, localization, and quality of service challenges in distributed wireless sensor networks for environmental and healthcare monitoring.",
    syllabusHighlights: [
      "WSN Architecture: Hardware Components of Sensor Nodes and Operating Systems",
      "MAC Protocols for WSN: Energy Efficiency, Contention vs. Scheduled Protocols",
      "Routing Strategies: Clustering, LEACH, Directed Diffusion, and Geographic Routing",
      "Node Localization, Time Synchronization, and Target Tracking Techniques",
      "Healthcare and Environmental WSN Case Studies with Low-Power Nodes",
    ],
  },
  {
    id: "course-eng-mgmt",
    title: "Engineering Management",
    code: "ECE450",
    category: "Elective",
    level: "Undergraduate",
    toolsUsed: ["Project Scheduling Tools", "PERT/CPM Models"],
    description:
      "Principles of leadership, organizational behavior, financial accounting, project lifecycle scheduling (PERT/CPM), resource allocation, quality standards (ISO/TQM), and supply chain management for engineering leaders.",
    syllabusHighlights: [
      "Functions of Management: Planning, Organizing, Staffing, and Leading",
      "Project Planning and Control: Critical Path Method (CPM) and PERT Networks",
      "Engineering Economics: Cost-Benefit Analysis, Depreciation, and Capital Budgeting",
      "Total Quality Management (TQM), Six Sigma, and ISO Certification Standards",
      "Human Resource Management, Team Leadership, and Organizational Dynamics",
    ],
  },

  // 3. Laboratory Courses
  {
    id: "course-linear-lab",
    title: "Digital and Linear Electronics Laboratory",
    code: "ECE252",
    category: "Laboratory",
    level: "Undergraduate",
    practicalIntegration: "Hands-on discrete IC testing, op-amp signal conditioning, and logic analyzer experiments",
    toolsUsed: ["Digital IC Trainer Kits", "Op-Amp ICs (LM741, LM324)", "Digital Storage Oscilloscopes"],
    description:
      "Hands-on laboratory designing and testing digital logic circuits, combinational/sequential blocks, operational amplifier active filters, instrumentation amplifiers, multivibrators, and timer ICs.",
    syllabusHighlights: [
      "Design of Combinational Circuits: Adders, Subtractors, Multiplexers, and Decoders",
      "Sequential Circuits: Flip-Flops, Synchronous/Asynchronous Counters, and Shift Registers",
      "Linear Op-Amp Circuits: Inverting/Non-inverting Amplifiers, Integrators, and Differentiators",
      "Active Filters: Low-Pass, High-Pass, and Band-Pass Filter Responses",
      "Timer IC 555 Applications: Astable and Monostable Multivibrators",
    ],
  },
  {
    id: "course-dsp-lab",
    title: "Digital Signal Processing Laboratory",
    code: "ECE354",
    category: "Laboratory",
    level: "Undergraduate",
    practicalIntegration: "Implementation on Texas Instruments TMS320C6713 DSP Starter Kits & MATLAB",
    toolsUsed: ["TI Code Composer Studio", "MATLAB Signal Processing Toolbox", "TMS320C6713 DSK"],
    description:
      "Laboratory-driven implementation of DFT/FFT algorithms, FIR/IIR digital filter design using windowing and bilinear transformation, and real-time audio/biomedical signal processing.",
    syllabusHighlights: [
      "Discrete-Time Signals, Linear Convolution, and Circular Convolution",
      "Computation of Radix-2 Decimation-in-Time and Decimation-in-Frequency FFT",
      "Design of Butterworth and Chebyshev IIR Filters via Bilinear Transformation",
      "Design of Linear-Phase FIR Filters using Rectangular, Hamming, and Kaiser Windows",
      "Real-Time DSP Hardware Deployment and Spectral Analysis",
    ],
  },
];
