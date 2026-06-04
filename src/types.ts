/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodeStat {
  label: string;
  value: string;
}

export interface ProjectDownload {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  markdownContent: string;
  githubUrl: string;
  demoUrl?: string;
  ctaText?: string;
  stats: CodeStat[];
  downloads: ProjectDownload[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceRole {
  title: string;
  employmentType: string; // e.g., Full-time, Internship
  startDate: string; // e.g., 'Jun 2025'
  endDate: string; // e.g., 'Present' or 'Jun 2025'
  description?: string;
  skills?: string[];
}

export interface ExperienceCompany {
  company: string;
  location?: string; // 'Pune, Maharashtra, India · On-site'
  logoUrl?: string; // Optional company logo URL; falls back to initials avatar
  roles: ExperienceRole[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface AppState {
  currentRoute: string; // "#/" (home) or "#/project/:id"
  theme: "light" | "dark";
}
