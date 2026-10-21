import { Project } from '../models/profile.models';

export const PROJECTS: Project[] = [
  {
    id: 'ai-financial-wellness',
    name: 'AI Financial Wellness Assistant',
    tagline: 'LLM-powered financial guidance assistant',
    description:
      'An AI assistant that helps users understand and improve their financial wellness using large language models, turning raw financial signals into clear, actionable guidance.',
    stack: ['LLM', 'RAG', 'Node.js', 'TypeScript'],
    href: 'https://github.com/himanshuanand05-works/AI-Financial-Wellness-Assistant',
    hrefLabel: 'github.com/…/AI-Financial-Wellness-Assistant',
    status: 'Open source',
  },
  {
    id: 'face-clustering',
    name: 'Face Clustering Library',
    tagline: 'Reusable npm package for unsupervised face grouping',
    description:
      'A published npm library that clusters face embeddings without labeled training data — drop-in tooling for photo organization, deduplication, and media pipelines.',
    stack: ['TypeScript', 'Node.js', 'Computer Vision', 'npm'],
    href: 'https://www.npmjs.com/package/@himanshuanand05/face-clustering',
    hrefLabel: 'npmjs.com/package/@himanshuanand05/face-clustering',
    status: 'Published on npm',
  },
  {
    id: 'alphabet-app',
    name: 'Learning App for Toddlers',
    tagline: 'Browser-based alphabet learning game',
    description:
      'A lightweight web app that helps toddlers learn the alphabet through playful interaction — fast, accessible, and deployable as a static site.',
    stack: ['Angular', 'PWA', 'Static hosting'],
    href: 'https://himanshuanand05-works.github.io/alphabet-app/',
    hrefLabel: 'himanshuanand05-works.github.io/alphabet-app/',
    status: 'Live',
  },
];
