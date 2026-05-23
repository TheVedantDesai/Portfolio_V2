/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SkillCategory, ExperienceItem } from "./types";

// Raw markdown imports from our content files
import omnisearchMd from "./content/projects/omnisearch-ai.md?raw";
import velosyncMd from "./content/projects/velosync-cache.md?raw";
import aetherVmMd from "./content/projects/aether-vm.md?raw";
import neuroflowMd from "./content/projects/neuroflow.md?raw";

export const PROJECTS: Project[] = [
  {
    id: "omnisearch-ai",
    title: "OmniSearch AI",
    tagline: "Enterprise Hybrid Vector & Sparse RAG Ingestion Pipeline",
    description: "An AI-powered search tool utilizing vector embeddings and hybrid RAG architecture to query multi-modal directories. Achieves 11.4ms sub-SLA recall rates.",
    category: "AI/ML",
    technologies: ["React", "FastAPI", "Milvus", "Gemini API", "Python", "NumPy"],
    markdownContent: omnisearchMd,
    githubUrl: "https://github.com/vedant27803/omnisearch-ai",
    demoUrl: "https://omnisearch-demo.example.com",
    stats: [
      { label: "P50 Latency", value: "11.4 ms" },
      { label: "Search Index SLA", value: "99.9%" },
      { label: "Recall @ Top-10", value: "94.8%" },
      { label: "Dataset Scale", value: "2M+ Docs" }
    ],
    downloads: [
      { label: "Intel x86 Linux Binary", url: "https://github.com/vedant27803/omnisearch-ai/releases/tag/v2.4.1/omnisearch-linux-amd64" },
      { label: "M1/M2 macOS Binary", url: "https://github.com/vedant27803/omnisearch-ai/releases/tag/v2.4.1/omnisearch-darwin-arm64" },
      { label: "Full Core Blueprint PDF", url: "https://github.com/vedant27803/omnisearch-ai/releases/download/v2.4.1/omnisearch-architecture.pdf" }
    ]
  },
  {
    id: "velosync-cache",
    title: "VeloSync Cache",
    tagline: "Log-Structured Merge-Tree Engine with Multi-Threaded Compaction",
    description: "Engineered in Go, VeloSync is a durable disk-backed Key-Value storage engine. Handles 410,000 writes/second with zero heap overhead and bloom filtering.",
    category: "Systems",
    technologies: ["Go", "Rust", "TCP Socket Protocol", "Bloom Filters", "Compaction STCS"],
    markdownContent: velosyncMd,
    githubUrl: "https://github.com/vedant27803/velosync-cache",
    demoUrl: "https://github.com/vedant27803/velosync-cache#cli-benchmarks",
    stats: [
      { label: "Writes/sec Max", value: "410,000 W/s" },
      { label: "Read Hit Ratio", value: "99.8%" },
      { label: "Memory Cost", value: "180MB" },
      { label: "Data Integrity", value: "WAL Journal" }
    ],
    downloads: [
      { label: "Static Linux Executable", url: "https://github.com/vedant27803/velosync-cache/releases/download/v1.2.0/velosync-linux-static" },
      { label: "Go Package Import", url: "https://github.com/vedant27803/velosync-cache/archive/refs/tags/v1.2.0.zip" },
      { label: "RESP2 Driver Reference", url: "https://github.com/vedant27803/velosync-cache/blob/main/docs/RESP2.md" }
    ]
  },
  {
    id: "aether-vm",
    title: "Aether-VM",
    tagline: "16-Bit Register-Based Virtual Machine & Assembler",
    description: "A complete virtual stack machine and assembler in TypeScript. Runs 12.5 MIPS in-browser with dedicated graphical frame-buffer rendering.",
    category: "Compilers",
    technologies: ["TypeScript", "ArrayBuffer", "HTML5 Canvas", "Lexer/Parser", "AST Compiler"],
    markdownContent: aetherVmMd,
    githubUrl: "https://github.com/vedant27803/aether-vm",
    demoUrl: "https://github.com/vedant27803/aether-vm#sandbox-gui",
    stats: [
      { label: "Execution Speed", value: "12.5 MIPS" },
      { label: "Shared Memory", value: "64 KB Array" },
      { label: "Compiler speed", value: "6.1ms / 5k LOC" },
      { label: "Target Registry", value: "16-Bit Slots" }
    ],
    downloads: [
      { label: "Visual Assembler Bundle (.zip)", url: "https://github.com/vedant27803/aether-vm/releases/download/v0.9.8/aether-assembler-v0.9.8.zip" },
      { label: "Pre-compiled Fibonacci ASM", url: "https://github.com/vedant27803/aether-vm/blob/main/programs/fibonacci.asm" },
      { label: "Instruction Set Reference", url: "https://github.com/vedant27803/aether-vm/blob/main/docs/ISA.md" }
    ]
  },
  {
    id: "neuroflow",
    title: "NeuroFlow",
    tagline: "Dependency-Free Autograd Computational Graph Machine Learning Engine",
    description: "An educational deep learning framework written from scratch in Python/NumPy, implementing dynamic backpropagation and multi-dimensional tensor sorting.",
    category: "AI/ML",
    technologies: ["Python", "NumPy", "Linear Algebra", "Topological Graph", "Autograd"],
    markdownContent: neuroflowMd,
    githubUrl: "https://github.com/vedant27803/neuroflow",
    demoUrl: "https://github.com/vedant27803/neuroflow#getting-started",
    stats: [
      { label: "MNIST Ingestion", value: "820 items/s" },
      { label: "Auto-Differentiation", value: "Dynamic DAG" },
      { label: "Code Footprint", value: "950 LOC" },
      { label: "Learning Accuracy", value: "97.8%" }
    ],
    downloads: [
      { label: "Distribution Wheel (.whl)", url: "https://github.com/vedant27803/neuroflow/releases/download/v0.4.0/neuroflow-0.4.0-py3-none-any.whl" },
      { label: "Source Archive (.tar.gz)", url: "https://github.com/vedant27803/neuroflow/archive/refs/tags/v0.4.0.tar.gz" },
      { label: "MLP Sandbox Script", url: "https://github.com/vedant27803/neuroflow/blob/main/examples/mnist_mlp_classifier.py" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    items: ["TypeScript", "JavaScript (ESNext)", "Python", "Go", "Rust", "C/C++", "HTML5/CSS3"]
  },
  {
    name: "AI & Machine Learning",
    items: ["Neural Networks", "Computational Graphs (Autograd)", "Vector Embeddings", "RAG Pipeline Architectures", "Gemini API Proxying", "NumPy & SciPy"]
  },
  {
    name: "Systems & Backend",
    items: ["High-Performance Caching", "Log-Structured Merge (LSM) Trees", "TCP Sockets & Frame Parsers", "Node.js & Express", "FastAPI / REST APIs", "Docker Containerization"]
  },
  {
    name: "Architecture & Tooling",
    items: ["AST Compilers", "Vite & Bundle Optimization", "Git & CI/CD Pipelines", "Semantic DOM Optimization", "Responsive Typography", "Linux Systems Coding"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Lead Systems Architect & Research Fellow",
    company: "Autonomous Intelligent Systems lab",
    period: "2024 - Present",
    description: "Directing development of high-performance localized computational infrastructures and embedded RAG execution modules.",
    achievements: [
      "Designed and implemented localized low-memory vector quantizer logic reducing node footprints by 75% across standard arrays.",
      "Optimized in-memory token processors enabling concurrent index traversals with a strict sub-15ms operational budget.",
      "Spearheaded compiling processes converting high-level ML definitions directly to optimal assembly layouts on 16-bit virtual instances."
    ]
  },
  {
    role: "Open Source Engineering Lead",
    company: "Acoustic AI & Systems Collective",
    period: "2022 - 2024",
    description: "Contributed core frameworks to educational compiler architectures and autonomous database engines.",
    achievements: [
      "Engineered a zero-heap Log-Structured Merge-Tree storage persistent layer hitting 410k operations per second on NVMe arrays.",
      "Authored clean AST parser and semantic validation logic for sandboxed code compilers written fully in vanilla TypeScript.",
      "Maintained modular structures used as key architectural research papers across computer science curriculum tools."
    ]
  }
];
