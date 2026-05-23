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
  category: "Systems" | "AI/ML" | "Compilers";
  technologies: string[];
  markdownContent: string;
  githubUrl: string;
  demoUrl?: string;
  stats: CodeStat[];
  downloads: ProjectDownload[];
}

export interface SkillCategory {
  name: string;
  items: string[];
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
