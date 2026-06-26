import profilePhoto from './assets/images/Fika.jpeg';
import certificateMockup from './assets/images/certificate_mockup_1782129612246.jpg';

import { 
  EducationItem, 
  AchievementItem, 
  WorkExperienceItem, 
  ProjectItem, 
  CertificationItem 
} from './types';

export const personalInfo = {
  fullName: "Fika Zekhaya Siximba",
  title: "AI Engineer & Full-Stack Developer",
  tagline: "Unifying Intelligent Systems with Creative Engineered Front-Ends",
  summary: "A highly versatile AI Engineer and Full-Stack Developer interning under the YES Youth Program at CAPACITI. Currently based in Gqeberha, South Africa, and actively available for full-stack system building, prompt design, and AI development opportunities. Deeply competent in modern web development ecosystem tools (React, Vite, Tailwind CSS), server-side configurations, and deploying advanced generative workflows. Proud holder of a South African Code 14 (EC) Professional Driving Licence.",
  photoUrl: profilePhoto,
  email: "siximbazekhaya@gmail.com",
  github: "https://github.com/Zkingsa",
  linkedin: "https://www.linkedin.com/in/fika-zekhaya-siximba-332859312",
  bio: {
    background: "Born in South Africa, I developed a strong foundation in programmatic logic and system mechanics. In 2025, I graduated with an ICT Diploma in Applications Development from Walter Sisulu University. I focus on sculpting highly interactive client layouts and powering them with robust AI tools and back-ends. I have mentored dozens of student teams as a tutor and assistant, and am currently scaling AI capabilities at CAPACITI.",
    vision: "To streamline human-machine interfaces by crafting fast, beautiful front-ends and deploying functional, modern AI solutions.",
    mission: "Deploy clean, type-safe full-stack products while maintaining exceptional reliability and responsive layouts across all device scopes.",
    careerGoals: [
      "Master high-throughput LLM prompt architecture and local agent integrations.",
      "Collaborate as a Senior AI Architect designing smart responsive portals.",
      "Build educational tech utilities that empower youth across South African communities."
    ],
    interests: [
      "AI Engineering & LLM Prompts",
      "Full-Stack Web Development (React & Node.js)",
      "High-Density Interactive Systems",
      "Database Modeling & Performance Tuning",
      "Heavy Vehicle Operation & Logistics (Code 14 PrDP)"
    ]
  }
};

export const educationHistory: EducationItem[] = [
  {
    id: "edu1",
    period: "2022 - 2025",
    institution: "Walter Sisulu University (Potsdam Campus)",
    degree: "Diploma in Information and Communications Technology in Applications Development",
    description: "Successfully graduated with specializations in database systems, systems analysis, object-oriented applications, and internet technologies.",
    skills: ["Applications Development", "Database Management", "Object-Oriented Programming", "Web Development"]
  },
  {
    id: "edu2",
    period: "2018 - 2020",
    institution: "Milton Mbekela Senior Secondary School (Umtata, Qunu)",
    degree: "National Senior Certificate (Matriculated)",
    description: "Completed secondary education with university admission qualification. Excels in technical design and natural science workflows.",
    skills: ["Mathematics", "Logical Reasoning", "Analytical Problem Solving"]
  }
];

export const achievementsHistory: AchievementItem[] = [
  {
    id: "ach1",
    year: "2026",
    title: "YES Youth Program Delegate Selection",
    issuer: "CAPACITI",
    description: "Selected into the competitive youth employment program, specializing in advanced AI Engineering and Full-Stack development initiatives.",
    category: "Leadership"
  },
  {
    id: "ach2",
    year: "2025",
    title: "Professional Driver Merit Certification",
    issuer: "Buffalo City Municipality DLTC",
    description: "Earning professional passenger and heavyweight driver clearance (Code 14 / EC with PrDP) at level 21, showing multi-disciplinary versatility.",
    category: "Award"
  },
  {
    id: "ach3",
    year: "2024",
    title: "Distinction in Tutorial Co-ordination",
    issuer: "WSU Computing Department",
    description: "Awarded top performance mark for coordinating weekly peer tutorial labs and boosting students' core academic coding scores.",
    category: "Academics"
  }
];

export const workExperience: WorkExperienceItem[] = [
  {
    id: "work1",
    period: "April 2026 - Present",
    role: "AI Engineer & Full-Stack Developer",
    company: "CAPACITI (YES Youth Program)",
    type: "Internship",
    logoPlaceholderText: "CAP",
    responsibilities: [
      "Engineering innovative prompt structures and implementing AI pipelines with Google AI Essentials methodologies.",
      "Developing highly robust React 18 dashboards using TypeScript and Vite for streamlined development workflows.",
      "Creating modular backend microservices to interface with state management units safely."
    ],
    outcomes: [
      "Designed clean modular codebases that reduced UI component friction and improved page load transitions.",
      "Collaborated in deploying secure, cloud-hosted analytics for trainee metrics."
    ],
    skills: ["AI Engineering", "Generative AI", "React", "TypeScript", "Tailwind CSS", "Node.js"]
  },
  {
    id: "work_kelsaf",
    period: "Jan 2026 - April 2026",
    role: "Code 14 Driver",
    company: "Kelsaf Packaging",
    type: "Full-time",
    logoPlaceholderText: "KLS",
    responsibilities: [
      "I handle goods and deliveries across the Eastern Cape province, including intercity deliveries.",
      "Operated heavy duty commercial trucks safely and completed transit logs in compliance with road safety regulations.",
      "Coordinated with dispatch managers and warehouse coordinators to ensure accurate delivery times."
    ],
    outcomes: [
      "Successfully delivered all cargo undamaged across intercity routes with zero transit safety incidents.",
      "Optimized vehicle routing paths, improving delivery dispatch times across the province."
    ],
    skills: ["Heavy Vehicle Operation", "Intercity Logistics", "Route Planning", "Safety Compliance", "Time Management"]
  },
  {
    id: "work2",
    period: "July 2025 - Dec 2025",
    role: "Stock Inventory Specialist",
    company: "Makro EL (Retail Solutions)",
    type: "Full-time",
    logoPlaceholderText: "MKO",
    responsibilities: [
      "Supervised bulk stock verification pipelines, recorded real-time asset indices, and troublesated handheld scanner hardware.",
      "Managed overnight database updates and communicated logistics steps to stock floor managers."
    ],
    outcomes: [
      "Secured 100% item audit accuracy over three major quarterly stock counts.",
      "Implemented a simplified structural grid tracking system for swift warehouse location queries."
    ],
    skills: ["Inventory Management", "Systems Auditing", "Database Tracking", "Troubleshooting"]
  },
  {
    id: "work3",
    period: "Dec 2024 - Jun 2025",
    role: "IT Technician",
    company: "Game Stores",
    type: "Full-time",
    logoPlaceholderText: "GME",
    responsibilities: [
      "Supported client point-of-sale setups, managed LAN routing, and diagnosed networking bottlenecks.",
      "Assembled hardware peripherals, replaced malfunctioning drives, and preserved business continuity."
    ],
    outcomes: [
      "Minimised sales team hardware downtime by 35% through proactive maintenance routines.",
      "Maintained exemplary customer review scores by offering clear solutions to POS errors."
    ],
    skills: ["IT Support & Repairs", "Network Diagnostics", "OS Configurations", "Customer Care"]
  },
  {
    id: "work4",
    period: "May 2024 - November 2024",
    role: "FASSET Tutor",
    company: "Walter Sisulu University",
    type: "Leadership",
    logoPlaceholderText: "WSU",
    responsibilities: [
      "Formulated lessons and tutored academic computational courses for FASSET delegates.",
      "Offered hands-on compiler debugging tips, version control workshops, and system structure explanations."
    ],
    outcomes: [
      "Guided 90%+ participating students to successfully pass their semester apps-development modules.",
      "Lauded by the ICT HOD for translating dense system-level design themes into digestible visual briefs."
    ],
    skills: ["Technical Tutoring", "Apps Development", "Database Analysis", "Mentorship"]
  },
  {
    id: "work5",
    period: "May 2023 - Nov 2023",
    role: "Peer Assistant Learner",
    company: "Walter Sisulu University",
    type: "Volunteer",
    logoPlaceholderText: "PAL",
    responsibilities: [
      "Aided peer students in learning foundational software engineering practices, C# scripting, and SQL commands.",
      "Facilitated computer lab schedules and assisted in solving compiler setup friction."
    ],
    outcomes: [
      "Coached 15+ student teams to successful system project rollouts.",
      "Created helpful cheat-sheets used by freshman programming cohorts."
    ],
    skills: ["Coaching", "Interactive Debugging", "Relational Datasets", "Communication"]
  }
];

export const projects: ProjectItem[] = [
  {
    id: "proj1",
    title: "AI Prompt Optimization Studio",
    category: "Artificial Intelligence",
    stackCategory: "AI Projects",
    overview: "A developer playground designed to analyze, test, and optimize Google AI and modern model prompt sequences. Integrates custom prompt-engineering rulesets to test visual layouts and output styles before execution.",
    role: "AI Developer, CAPACITI",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage", "Lucide Icons"],
    outcomes: [
      "Assigned real-time response ratings using custom prompt templates.",
      "Created highly responsive canvas to view markdown prompts side-by-side."
    ],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "proj2",
    title: "Logistics Fleet Operations Grid",
    category: "System Engineering",
    stackCategory: "Full Stack",
    overview: "An interactive operations dashboard designed to monitor high-volume inventory moves and verify vehicle compliance checklists. Features real-time GPS simulations tailored for heavy vehicle categories (Code 14 EC).",
    role: "Lead Full-Stack UI Architect",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Motion"],
    outcomes: [
      "Built beautiful mock maps and vehicle telemetry trackers displaying state compliance.",
      "Achieved sub-5ms rendering speeds for sorting through multiple inventory categories."
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    id: "proj3",
    title: "Walter Sisulu Student Success Tracker",
    category: "Education Technology",
    stackCategory: "Back-End",
    overview: "A custom localized portal allowing college departments to coordinate tutor schedules, log peer delegate lecture attendances, and outline grade distributions.",
    role: "Database Admin & UI Engineer",
    technologies: ["React Hooks", "Vite", "Local Storage", "CSS Transitions"],
    outcomes: [
      "Enabled tutors to register classes and trace performance graphs instantly.",
      "Greatly eliminated departmental paperwork for scheduling classroom allocations."
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    featured: false
  },
  {
    id: "proj4",
    title: "Legacy Portfolio Website",
    category: "Web Portfolio",
    stackCategory: "Front end",
    overview: "A polished legacy showcase website for Fika’s earlier professional portfolio, now served as a live reference for the portfolio history.",
    role: "Full-Stack Portfolio Owner",
    technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
    outcomes: [
      "Delivered an accessible and memorable career portfolio landing experience.",
      "Maintained a lightweight production website with fast navigation and clear contact pathways."
    ],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://fika-zekhaya-siximba.netlify.app",
    featured: false
  }
];

export const certifications: CertificationItem[] = [
  {
    id: "cert1",
    title: "Google AI Essentials Specialization",
    issuer: "Google Career Certificates (Coursera)",
    date: "May 28, 2026",
    credentialId: "MLY7RGPYQ1GY",
    skillsCode: ["Artificial Intelligence", "AI Tools Mastery", "Prompt Crafting", "Responsible AI Usage"],
    certificateImageUrl: certificateMockup,
    externalLink: "https://coursera.org/verify/specialization/MLY7RGPYQ1GY"
  },
  {
    id: "cert2",
    title: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM (Coursera)",
    date: "May 25, 2026",
    credentialId: "FRBLMAADT2UA",
    skillsCode: ["Generative AI Models", "Prompt Engineering", "Large Language Models", "IBM Skills Networks"],
    certificateImageUrl: certificateMockup,
    externalLink: "https://coursera.org/verify/FRBLMAADT2UA"
  },
  {
    id: "cert3",
    title: "Heavy Vehicle Driving Licence (Code EC/14 with PrDP)",
    issuer: "South African Department of Transport (Buffalo City DLTC)",
    date: "August 19, 2021",
    credentialId: "Ref: 130400005HZF",
    skillsCode: ["Heavy Vehicles > 16t (Code EC)", "Professional Driving Permit (PrDP GP)", "Cargo Logistics Support", "Defensive Driving Rules"],
    certificateImageUrl: profilePhoto,
    externalLink: "#"
  }
];
