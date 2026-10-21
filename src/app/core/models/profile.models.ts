export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

export interface NavLink {
  path: string;
  label: string;
  icon: string;
  kicker: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
  handle: string;
}

export interface Profile {
  name: string;
  headline: string;
  summary: string;
  shortAnswer: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  yearsExperience: string;
  stats: Stat[];
  socials: SocialLink[];
}

export interface Skill {
  name: string;
  level: number;
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  href?: string;
  hrefLabel?: string;
  metrics?: Stat[];
  status: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  score: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  html: string;
}
