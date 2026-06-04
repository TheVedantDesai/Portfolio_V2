/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code, Sparkles, Palette } from 'lucide-react';
import { Project, SkillCategory, ExperienceCompany, ExperienceItem } from "./types";

// Raw markdown imports from our content files
import dophelperMd from "./content/projects/dophelper.md?raw";
import aideskMd from "./content/projects/aidesk.md?raw";
import dophelperV2Md from "./content/projects/dophelper-v2.md?raw";

export const personalInfo = {
  name: 'VEDANT DESAI',
  title: 'A Software Developer with a passion for AI and Machine Learning. Explore my work below.',
  heroStats: [
    { icon: Code, label: 'Languages', value: 'Python, JS, Java' },
    { icon: Sparkles, label: 'Frontend', value: 'HTML, CSS, JS' },
    { icon: Palette, label: 'Focus', value: 'AIML, DL, GenAI' },
  ],
  socialLinks: {
    github: 'https://github.com/TheVedantDesai',
    linkedin: 'https://www.linkedin.com/in/thevedantdesai/',
  }
};

export const skillsData = [
  {
    category: 'Frontend Development',
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'RESTful APIs'],
  },
  {
    category: 'Programming Languages',
    items: ['JavaScript', 'Python', 'TypeScript', 'Java', 'C++'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  },
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision'],
  },
  {
    category: 'Other Technologies',
    items: ['Git', 'Linux', 'Pandas', 'Numpy', 'EDA'],
  },
];

export const projectsData = [
  {
    title: 'DOPHelper',
    description: 'Created a Python based Desktop application that helps MPKBY agents (India Post) to automate their tasks of Creating Lists and formatting the reports and creation of declarations. this is made possible with use of PySide6 and Selenium along with openpyxl and pandas.',
    image: '/Banners/DOPHelper.png',
    tags: ['Python', 'Web Automation', 'Selenium', 'PySide6', 'Openpyxl', 'Pandas'],
    link: 'https://github.com/Desai-Vedant/DOPHelper'
  },
  {
    title: 'AIDesk',
    description: 'A powerful Python-based desktop assistant that streamlines computer tasks. Interact through voice or text, perform web searches, open websites, take screenshots, check weather, and get AI-powered responses.',
    image: '/Banners/AIDesk.png',
    tags: ['Python', 'AI', 'Voice Recognition'],
    link: 'https://github.com/Desai-Vedant/AIDesk'
  },
  {
    title: 'DOPHelper v2',
    description: 'A Modern and powerful Electron Based Desktop application that helps MPKBY agents (India Post) to automate their tasks of Creating Lists and formatting the reports and creation of declarations. this is made possible with use of Electron.js and Playwright along with sheetJS.',
    image: '/Banners/DOPHelperV2.png',
    tags: ['MERN', 'React', 'Electron.js', 'SQLite', 'Playwright', 'SheetJS'],
    link: 'https://github.com/Desai-Vedant/TaskTracker'
  }
]; 

export const experiencesData: ExperienceCompany[] = [
  {
    company: 'nCircle Tech',
    location: 'Pune, Maharashtra, India · On-site',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvcfytVrSFgoUYX-QLGDRr2JZDoAtzfnh1fw&s',
    roles: [
      {
        title: 'Member of Technical Staff',
        employmentType: 'Full-time',
        startDate: 'Jun 2025',
        endDate: 'Present',
      },
      {
        title: 'Technical Intern',
        employmentType: 'Internship',
        startDate: 'Nov 2024',
        endDate: 'Jun 2025',
        description:
          'Gained hands-on experience in full-stack web development with the MERN (MongoDB, Express.js, React, Node.js) stack. Explored and worked with REST APIs for efficient data retrieval.',
        skills: ['Node.js', 'Express.js', 'React', 'MongoDB', 'REST APIs'],
      },
    ],
  }
];

// Map into rich UI types for full telemetry and detailed view page routes
export const PROJECTS: Project[] = [
  {
    id: "dophelper",
    title: "DOPHelper",
    tagline: "PySide6 & Selenium Based Automation for India Post Agents",
    description: projectsData[0].description,
    category: "Desktop & Automation",
    technologies: projectsData[0].tags,
    markdownContent: dophelperMd,
    githubUrl: projectsData[0].link,
    demoUrl: "https://github.com/Desai-Vedant/DOPHelper#readme",
    stats: [
      { label: "Tasks Automated", value: "100%" },
      { label: "Accuracy Rate", value: "100%" },
      { label: "Ingestion Speed", value: "2,500 cols/s" },
      { label: "Time Saved", value: "~40 min/list" }
    ],
    downloads: [
      { label: "Windows Standalone Executable (.exe)", url: "https://github.com/Desai-Vedant/DOPHelper/releases" },
      { label: "Full Agent Manual Guide (PDF)", url: "https://github.com/Desai-Vedant/DOPHelper#readme" }
    ]
  },
  {
    id: "aidesk",
    title: "AIDesk",
    tagline: "Python Desktop Assistant with Voice Control & Generative AI",
    description: projectsData[1].description,
    category: "AI & Machine Learning",
    technologies: [...projectsData[1].tags, "SpeechRecognition", "PyAudio", "Gemini API"],
    markdownContent: aideskMd,
    githubUrl: projectsData[1].link,
    demoUrl: "https://github.com/Desai-Vedant/AIDesk#readme",
    stats: [
      { label: "Voice Latency", value: "< 180 ms" },
      { label: "Intent F1-Score", value: "96.4%" },
      { label: "Native OS Bridge", value: "< 8 ms" },
      { label: "AI Backend Hub", value: "Gemini Loop" }
    ],
    downloads: [
      { label: "Python Core Source Bundle (.zip)", url: "https://github.com/Desai-Vedant/AIDesk/archive/refs/heads/main.zip" },
      { label: "Developer Hardware Setup MD", url: "https://github.com/Desai-Vedant/AIDesk#readme" }
    ]
  },
  
  {
    id: "dophelper-v2",
    title: "DOPHelper v2",
    tagline: "Electron & Playwright Desktop Automation Platform",
    description: projectsData[2].description,
    category: "Desktop & Automation",
    technologies: projectsData[2].tags,
    markdownContent: dophelperV2Md,
    githubUrl: projectsData[2].link,
    demoUrl: "https://github.com/Desai-Vedant/TaskTracker#readme",
    stats: [
      { label: "Automation Core", value: "Playwright CDP" },
      { label: "SQLite Sync Phase", value: "< 1.8 ms" },
      { label: "Engine Boot Stage", value: "< 1.1 sec" },
      { label: "Data Compiler", value: "SheetJS Engine" }
    ],
    downloads: [
      { label: "Electron Core API Module", url: "https://github.com/Desai-Vedant/TaskTracker" },
      { label: "Relational Schema SQL Script", url: "https://github.com/Desai-Vedant/TaskTracker" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = skillsData;
export const EXPERIENCE: ExperienceItem[] = experiencesData.flatMap(company => 
  company.roles.map(role => ({
    role: role.title,
    company: company.company,
    period: `${role.startDate} — ${role.endDate}`,
    description: role.description || "",
    achievements: [
      `Employment Type: ${role.employmentType}`,
      ...(company.location ? [`Location: ${company.location}`] : []),
      ...(role.skills && role.skills.length > 0 ? [`Skills: ${role.skills.join(", ")}`] : [])
    ]
  }))
);
