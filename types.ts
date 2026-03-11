
export type WindowID = 'aboutMe' | 'resume' | 'projects' | 'certificates' | 'contact';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}
