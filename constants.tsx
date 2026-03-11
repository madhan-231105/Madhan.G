
import React from 'react';
import { 
  FileText, 
  Code, 
  Briefcase, 
  Award, 
  Mail, 
  Github, 
  Linkedin,
  Monitor,
  Database,
  Globe,
  Smartphone,
  Info,
  User
} from 'lucide-react';
import { Project, Skill, Certificate, WindowID } from './types';

export const NAV_ITEMS: { id: WindowID; label: string; icon: React.ReactNode }[] = [
  { id: 'aboutMe', label: 'About Me', icon: <User size={24} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={24} /> },
  { id: 'projects', label: 'Projects', icon: <Briefcase size={24} /> },
  { id: 'certificates', label: 'Awards', icon: <Award size={24} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={24} /> },
];

export const PROJECTS: Project[] = [
  {
    title: "AI Narrative Engine",
    description: "A real-time collaborative writing tool using Gemini API for dynamic storytelling prompts.",
    tags: ["React", "Gemini", "WebSockets"],
    image: "https://picsum.photos/seed/writing/800/500",
    link: "#",
    github: "https://github.com"
  },
  {
    title: "EcoTrack Dashboard",
    description: "Monitoring environmental data points across smart city sensors with D3 visualizations.",
    tags: ["D3.js", "TypeScript", "Node.js"],
    image: "https://picsum.photos/seed/eco/800/500",
    link: "#",
    github: "https://github.com"
  },
  {
    title: "Nexus OS UI",
    description: "A comprehensive UI kit for glassmorphism design systems in React applications.",
    tags: ["Tailwind", "Framer Motion"],
    image: "https://picsum.photos/seed/nexus/800/500",
    link: "#",
    github: "https://github.com"
  }
];

export const CERTIFICATES: Certificate[] = [
  { 
    name: "Advanced React Patterns", 
    issuer: "Frontend Masters", 
    date: "Jan 2024",
    image: "https://picsum.photos/seed/cert1/1200/800"
  },
  { 
    name: "Google Cloud Professional", 
    issuer: "Google Cloud", 
    date: "Nov 2023",
    image: "https://picsum.photos/seed/cert2/1200/800"
  },
  { 
    name: "UI/UX Design Specialist", 
    issuer: "Coursera", 
    date: "Sep 2023",
    image: "https://picsum.photos/seed/cert3/1200/800"
  },
];
