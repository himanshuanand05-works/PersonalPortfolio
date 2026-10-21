import { NavLink, Profile } from '../models/profile.models';

export const PROFILE: Profile = {
  name: 'Himanshu Anand',
  headline: 'Senior Full-Stack & Node.js Backend Engineer',
  summary:
    'Senior software engineer with 7+ years of experience building and modernizing web applications, Node.js services, event-driven systems, and distributed platforms using JavaScript, TypeScript, and NestJS. Experienced in backend service design, domain-driven design (DDD), microservices, asynchronous messaging, reliability patterns, caching, API orchestration, and production performance optimization. Also brings hands-on frontend experience with Angular and React, plus exposure to AWS, GCP, Azure, Docker, Kubernetes, and CI/CD. Has led engineering initiatives and collaborated across teams to deliver scalable, maintainable systems.',
  shortAnswer:
    'Himanshu Anand is a senior full-stack software engineer based in Noida, India, with 7+ years of experience designing Node.js, NestJS and TypeScript microservices, event-driven architectures (Kafka, SAGA, CQRS, transactional outbox) and Agentic RAG platforms with LLM guardrails. He is currently open to senior/lead backend and full-stack opportunities.',
  location: 'Noida, India',
  email: 'himanshuanand05@gmail.com',
  phone: '+91-9457177820',
  availability: 'Open to opportunities',
  yearsExperience: '7+',
  stats: [
    { value: '7+', label: 'Years experience', detail: 'Backend, distributed systems & full-stack' },
    { value: '100K+', label: 'Daily active users', detail: 'Microservices scale maintained at The Smart Cube' },
    { value: '50%', label: 'Faster DB queries', detail: 'Aggregate decomposition & CQRS at DBiz-AI' },
    { value: '25%', label: 'Faster app loads', detail: 'Angular standalone components & lazy loading' },
  ],
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/himanshuanand05',
      icon: 'linkedin',
      handle: 'linkedin.com/in/himanshuanand05',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/himanshuanand05-works',
      icon: 'github',
      handle: 'github.com/himanshuanand05-works',
    },
    {
      label: 'npm',
      url: 'https://www.npmjs.com/~himanshuanand05-works',
      icon: 'npm',
      handle: '~himanshuanand05-works',
    },
    {
      label: 'Email',
      url: 'mailto:himanshuanand05@gmail.com',
      icon: 'mail',
      handle: 'himanshuanand05@gmail.com',
    },
  ],
};

export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Overview', icon: 'grid', kicker: '00' },
  { path: '/experience', label: 'Experience', icon: 'activity', kicker: '01' },
  { path: '/projects', label: 'Projects', icon: 'box', kicker: '02' },
  { path: '/skills', label: 'Skills', icon: 'cpu', kicker: '03' },
  { path: '/knowledge', label: 'Knowledge', icon: 'book', kicker: '04' },
  { path: '/faq', label: 'FAQ', icon: 'help', kicker: '05' },
  { path: '/resume', label: 'Resume', icon: 'file', kicker: '06' },
  { path: '/contact', label: 'Contact', icon: 'send', kicker: '07' },
];

export const EDUCATION = {
  degree: 'B.E. / Bachelor’s in Computer Science & Engineering',
  school: 'JSS Academy of Technical Education, Noida',
  year: '2014 – 2018',
  score: '72%',
};

export const CERTIFICATIONS = [
  { name: 'Advanced Node.js', issuer: 'CutShort' },
  { name: 'NestJS', issuer: 'Udemy' },
  { name: 'Next.js', issuer: 'LinkedIn Learning' },
];

export const ACHIEVEMENTS = [
  { name: 'All India Hackathon (SIH) — Winner', detail: 'National-level smart India Hackathon' },
  { name: 'State Hackathon (NIT) — Winner', detail: 'State-level hackathon hosted by NIT' },
];
