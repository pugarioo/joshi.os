import type { ProjectItem, SkillCategory, FSNode } from '../types/os';

export const DEVELOPER_INFO = {
  name: 'Joshua Lopez',
  handle: '@pugarioo',
  avatar: 'https://avatars.githubusercontent.com/u/170714580?v=4',
  role: 'Computer Science Student | Data Engineer',
  bio: 'I like to explore things and try new tech. 3rd year CS Student at University of Cabuyao focused on Data Engineering, AI, and LLMs.',
  location: 'Philippines',
  email: 'lopezjoshuapanaligan@gmail.com',
  github: 'https://github.com/pugarioo',
  linkedin: 'https://www.linkedin.com/in/joshua-lopez-289551331',
  facebook: 'https://www.facebook.com/pugarioo',
  instagram: 'https://www.instagram.com/pugario_',
  twitter: 'https://twitter.com/pugarioo',
  badge: 'GitHub Pro',
  isAlive: true,
  isLearning: true,
  interests: [
    'Data Engineering',
    'Data Analysis',
    'Artificial Intelligence',
    'LLMs',
    'Software Engineering',
    'Music',
    'Movies',
  ],
  stack: [
    'React',
    'Tailwind CSS',
    'FastAPI',
    'Docker',
    'AI Agents',
    'Python',
    'TypeScript',
    'PostgreSQL',
    'Ollama / Local SLMs',
  ],
  stats: [
    { label: 'Year', value: '3rd Year' },
    { label: 'University', value: 'University of Cabuyao' },
    { label: 'Public Repos', value: '22' },
    { label: 'Followers', value: '17' },
  ],
  experience: [
    {
      role: 'Lecturer / Speaker',
      company: 'ACSS — University of Cabuyao',
      period: '2025',
      description: 'Conducted Session 2 of the Java Coding Camp for Freshies. Covered loops and error handling with real-world examples for repetitive tasks.',
    },
    {
      role: 'Student Relations Officer',
      company: 'Junior Blockchain Education Consortium of the Philippines – Dangals',
      period: 'AY 2024–2025',
      description: 'Served as Student Relations Officer, bridging student communities and blockchain education initiatives under the Dangals chapter.',
    },
    {
      role: 'Participant — Java Programming',
      company: '13th UMak IT Skills Olympics',
      period: '2024',
      description: 'Competed in Java Programming at the 13th University of Makati IT Skills Olympics.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Cabuyao',
      period: 'Year 3',
      year: '3rd Year',
      honors: 'CS Student',
    },
  ],
};

export const CHATBOT_KNOWLEDGE = [
  {
    keywords: ['hi', 'hello', 'hey', 'who are you', 'joshi'],
    response: "Hello! I am Joshua's Dev OS assistant. Ask me about Horizon AI (Thesis), Linx (Personal), ElderKey (School), or my tech stack!",
  },
  {
    keywords: ['horizon', 'horizon ai', 'java', 'refactor', 'slm', 'agent', 'thesis'],
    response: 'Horizon AI is my Thesis Project — an offline multi-agent Java refactoring engine powered by local SLMs (Qwen2.5-Coder / DeepSeek-R1) with a live visualizer!',
  },
  {
    keywords: ['linx', 'shortener', 'url', 'link', 'redis', 'personal'],
    response: 'Linx is my Personal Project — a sub-5ms URL shortener web service built with Node.js, Express, TypeScript, and Redis caching.',
  },
  {
    keywords: ['elderkey', 'elder', 'senior', 'qr', 'credential', 'health', 'school'],
    response: 'ElderKey is my School Project — a QR-enabled visual digital ID platform for senior citizens featuring bank-grade security and Senior-First accessible UX!',
  },
  {
    keywords: ['contact', 'email', 'hire', 'github'],
    response: 'Reach out via email at lopezjoshuapanaligan@gmail.com or check my GitHub at github.com/pugarioo!',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'horizon-ai',
    title: 'Horizon AI',
    tag: 'Thesis Project',
    description: 'A multi-agent AI system that automatically refactors Java code using local SLMs with a live pipeline visualizer — no cloud, fully offline.',
    longDescription: 'Horizon AI is an autonomous, multi-agent AI system built as my Thesis Project to refactor, modernize, and optimize Java codebases completely offline using local Small Language Models (SLMs).',
    category: 'AI / ML',
    technologies: ['FastAPI', 'AI Agents', 'Docker', 'Python', 'Local SLMs'],
    githubUrl: 'https://github.com/horizon-ai-code/horizon',
    stars: 128,
    featured: true,
    image: '/horizon.png',
  },
  {
    id: 'linx-shortener',
    title: 'Linx',
    tag: 'Personal Project',
    description: 'A sleek, lightweight URL shortener service built for lightning-fast link redirection, custom aliases, and link analytics.',
    longDescription: 'Linx is a minimal, ultra-fast URL shortening web service built as my Personal Project featuring instant link redirection, custom aliases, and live traffic analytics.',
    category: 'Fullstack',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Redis'],
    githubUrl: 'https://github.com/pugarioo/linx',
    stars: 42,
    featured: true,
    image: '/l1nx.png',
  },
  {
    id: 'elderkey',
    title: 'ElderKey',
    tag: 'School Project',
    description: 'A secure, QR-enabled digital credential platform for senior citizens featuring bank-grade encryption and Senior-First accessible design.',
    longDescription: 'ElderKey is a secure digital credential platform built as my School Project to replace traditional paper senior citizen cards with a high-contrast, QR-enabled visual digital ID.',
    category: 'Frontend',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Senior UX', 'QR Verification'],
    githubUrl: 'https://github.com/pugarioo/elderkey',
    stars: 18,
    featured: true,
    image: '/elderkey.png',
  },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'AI & Data Engineering',
    skills: [
      { name: 'AI Agents & Multi-Agent Systems', level: 94, experience: '3 yrs' },
      { name: 'FastAPI & Async Microservices', level: 92, experience: '3 yrs' },
      { name: 'Data Engineering & Analysis', level: 90, experience: '3 yrs' },
      { name: 'Ollama / Local SLMs & RAG', level: 92, experience: '3 yrs' },
    ],
  },
  {
    category: 'Frontend & UI Engineering',
    skills: [
      { name: 'React 19 & TypeScript', level: 95, experience: '4 yrs' },
      { name: 'Tailwind CSS v4 & Glassmorphism', level: 96, experience: '4 yrs' },
      { name: 'Interactive Web Applications', level: 92, experience: '4 yrs' },
      { name: 'Framer Motion & Micro-Animations', level: 90, experience: '3 yrs' },
    ],
  },
  {
    category: 'Backend & DevOps',
    skills: [
      { name: 'Docker & Containerization', level: 90, experience: '3 yrs' },
      { name: 'Python & Data Processing', level: 94, experience: '4 yrs' },
      { name: 'PostgreSQL & Vector Databases', level: 88, experience: '3 yrs' },
      { name: 'Redis Caching & PubSub', level: 90, experience: '3 yrs' },
    ],
  },
];

export const VIRTUAL_FILESYSTEM: FSNode = {
  name: 'root',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'home',
      type: 'folder',
      path: '/home',
      children: [
        {
          name: 'joshi',
          type: 'folder',
          path: '/home/joshi',
          children: [
            {
              name: 'AboutMe.md',
              type: 'file',
              path: '/home/joshi/AboutMe.md',
              content: `# Joshi - Lead Systems & AI Engineer

Welcome to my developer profile. I specialize in designing local AI multi-agent orchestration frameworks, accessible digital credential platforms, and desktop-grade web applications.

Repository: https://github.com/pugarioo

## Projects Overview

- Horizon AI (Thesis Project): Offline multi-agent Java code refactorer.
- Linx (Personal Project): Sub-5ms URL shortener & analytics engine.
- ElderKey (School Project): Accessible QR digital ID platform for seniors.

## Tech Stack Overview

| Domain | Technologies |
| --- | --- |
| Local AI | Qwen2.5-Coder, DeepSeek-R1, Ollama, Llama.cpp |
| Core Languages | Java, TypeScript, JavaScript, HTML, CSS |
| Web OS & UI | React 19, Tailwind v4, Framer Motion, Zustand |
| Accessibility | Senior-First UX, High Contrast, Digital Credentials |

## Engineering Philosophy

- Local-First Privacy: AI models and refactoring engines run entirely on-device with zero external API calls or telemetry.
- Inclusive Accessibility: Technology should empower everyone, creating zero-complexity interfaces for senior citizens and all age groups.
- Desktop-Grade Aesthetics: Web applications should offer fluid, high-frame-rate interaction models matching native desktop operating systems.`,
            },
            {
              name: 'Projects',
              type: 'folder',
              path: '/home/joshi/Projects',
              children: [
                {
                  name: 'Horizon-AI.md',
                  type: 'file',
                  path: '/home/joshi/Projects/Horizon-AI.md',
                  content: `# Horizon AI - Multi-Agent Java Refactoring Framework
Project Type: Thesis Project

![Horizon AI](/horizon.png)

Horizon AI is an autonomous, multi-agent AI system built as my **Thesis Project** to refactor, modernize, and optimize Java codebases completely offline using local Small Language Models (SLMs). It features a real-time web pipeline visualizer.

Repository: https://github.com/horizon-ai-code/horizon

## Key Capabilities

- Automated Java Code Modernization: Converts legacy Java patterns into modern idiom structures.
- Local Model Engine: Powered by GGUF quantizations via Ollama (Qwen2.5-Coder / DeepSeek-R1).
- Live Pipeline Visualizer: Web UI rendering real-time agent memory, AST diffs, and step telemetry.
- Zero Cloud Dependency: Fully offline execution ensuring corporate code stays on local disk.

## Agent Architecture Pipeline

- Agent 1: AST Parser & Smell Detector
- Agent 2: Refactoring Strategy Planner
- Agent 3: Code Synthesizer
- Agent 4: Test Suite Verifier`,
                },
                {
                  name: 'Linx.md',
                  type: 'file',
                  path: '/home/joshi/Projects/Linx.md',
                  content: `# Linx - Lightweight High-Speed URL Shortener
Project Type: Personal Project

![Linx Shortener](/l1nx.png)

Linx is a minimal, ultra-fast URL shortening web service built as my **Personal Project** featuring instant link redirection, custom aliases, and live traffic analytics.

Repository: https://github.com/pugarioo/linx

## Core Architecture

- High-Performance Redirection: Sub-5ms HTTP redirect responses backed by in-memory Redis caching.
- Custom Slugs & QR Codes: Generate personalized link aliases and downloadable QR badges.
- Real-Time Analytics: Tracks referral sources, geographic metrics, and click timelines.
- Simple REST API: Clean endpoints for creating, managing, and expiring short links.

## System Tech Stack

- Backend: Node.js, Express, TypeScript
- Caching & Persistence: Redis + PostgreSQL
- UI: React, Tailwind CSS`,
                },
                {
                  name: 'Elderkey.md',
                  type: 'file',
                  path: '/home/joshi/Projects/Elderkey.md',
                  content: `# ElderKey - Accessible Digital ID & Senior Credential Platform
Project Type: School Project

![ElderKey Platform](/elderkey.png)

ElderKey is a secure digital credential platform built as my **School Project** to replace traditional paper senior citizen cards with a high-contrast, QR-enabled visual digital ID.

Repository: https://github.com/pugarioo/elderkey

## Key Features

| Feature | Description |
| --- | --- |
| Unified Digital Credential | Secure, QR-enabled visual ID replacing paper senior citizen cards |
| Bank-Grade Security | Enterprise encryption protecting personal health and identity data |
| Senior-First UI | High-contrast visuals, large typography, zero-complexity navigation |
| Priority Access Pass | Automatic Fast Track verification at partner clinics & retail locations |

## Core Mission Statement

> To dismantle the digital divide for the elderly, ensuring that essential services, respect, and care are never more than one click away.

## Technical Highlights

- Verification Engine: Instant QR scanner validation for partner clinics and retail locations.
- Data Privacy: Encrypted storage safeguarding sensitive personal identification documents.
- Accessible Design System: WCAG AAA compliance, large tap targets, and intuitive visual cues.`,
                },
              ],
            },
            {
              name: 'Skills.json',
              type: 'file',
              path: '/home/joshi/Skills.json',
              content: JSON.stringify(SKILLS_DATA, null, 2),
            },
            {
              name: 'Contact.txt',
              type: 'file',
              path: '/home/joshi/Contact.txt',
              content: `Email: joshi@dev.os\nGitHub: https://github.com/pugarioo\nLinkedIn: https://linkedin.com/in/pugarioo\nStatus: Available for AI Systems & Full-Stack Work`,
            },
          ],
        },
      ],
    },
  ],
};
