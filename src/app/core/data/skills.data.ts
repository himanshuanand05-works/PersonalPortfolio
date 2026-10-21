import { SkillGroup } from '../models/profile.models';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'server',
    blurb:
      'Production Node.js and NestJS services: REST APIs, BFF layers, service orchestration, and performance tuning.',
    skills: [
      { name: 'Node.js', level: 95, note: '7+ yrs' },
      { name: 'TypeScript', level: 93, note: 'Primary language' },
      { name: 'NestJS', level: 92, note: 'Module & DDD architecture' },
      { name: 'Express', level: 85 },
      { name: 'REST APIs & BFF', level: 90 },
      { name: 'JavaScript', level: 93 },
    ],
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    icon: 'layers',
    blurb:
      'Event-driven design with strong consistency patterns: DDD, SAGA, outbox/inbox, idempotency, and CQRS.',
    skills: [
      { name: 'Microservices', level: 92 },
      { name: 'Event-driven architecture', level: 92 },
      { name: 'Domain-driven design (DDD)', level: 90 },
      { name: 'SAGA orchestration', level: 85 },
      { name: 'Transactional outbox/inbox', level: 88, note: 'Ghost-event recovery' },
      { name: 'CQRS', level: 87 },
      { name: 'Idempotency patterns', level: 88 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    blurb: 'Cloud-native delivery across AWS, GCP and Azure with containerized CI/CD pipelines.',
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'GCP', level: 75 },
      { name: 'Azure', level: 78, note: 'Azure AI Foundry' },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD pipelines', level: 82 },
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging & Caching',
    icon: 'zap',
    blurb: 'Asynchronous processing at scale with Kafka and Redis, plus cache invalidation strategies.',
    skills: [
      { name: 'Kafka', level: 88 },
      { name: 'Redis', level: 90, note: 'Caching & distributed work queues' },
      { name: 'Async processing', level: 90 },
      { name: 'Cache invalidation', level: 85 },
    ],
  },
  {
    id: 'data',
    title: 'Data Platforms',
    icon: 'database',
    blurb: 'Polyglot persistence — from high-write Cassandra to search and vector stores for AI retrieval.',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'Cassandra', level: 75, note: 'High write throughput' },
      { name: 'Elasticsearch', level: 75 },
      { name: 'Vector databases', level: 80, note: 'RAG retrieval' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: 'monitor',
    blurb:
      'Angular and React applications with micro-frontends, SSR, and performance/SEO optimization.',
    skills: [
      { name: 'Angular', level: 88, note: 'Standalone, SSR, Vite' },
      { name: 'React', level: 82 },
      { name: 'Next.js', level: 78 },
      { name: 'SSR & SEO', level: 85 },
      { name: 'Micro-frontends', level: 80 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Integration',
    icon: 'sparkles',
    blurb:
      'Agentic RAG systems with guardrails, MCP servers, and LLM integration done safely with RBAC.',
    skills: [
      { name: 'Agentic RAG', level: 88 },
      { name: 'LangChain / LangGraph', level: 82 },
      { name: 'MCP servers', level: 85 },
      { name: 'Azure AI Foundry', level: 75 },
      { name: 'LLM guardrails & RBAC', level: 85 },
    ],
  },
];
