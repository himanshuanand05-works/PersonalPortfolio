import { Experience } from '../models/profile.models';

export const EXPERIENCE: Experience[] = [
  {
    id: 'dbiz-ai',
    company: 'DBiz-AI (Pickles)',
    role: 'Lead / Senior Software Engineer',
    period: 'Mar 2024 – Dec 2025',
    start: '2024-03',
    summary:
      'Led the design and modernization of distributed services and an AI-assisted SDLC framework, strengthening reliability, boundaries, and delivery speed across the platform.',
    highlights: [
      'Designed and improved distributed services using domain-driven design (DDD) and SAGA-oriented workflows, strengthening service boundaries and resilience.',
      'Investigated duplicate/ghost event scenarios and implemented transactional outbox/inbox patterns with idempotency and resumable processing state to improve message reliability and recovery after failures.',
      'Simplified domain models and decomposed oversized aggregates to reduce unnecessary joins; reduced database query time by up to 50% in selected cases.',
      'Introduced CQRS-style read/write separation and acknowledgement controls to reduce pressure on the primary database.',
      'Led engineering work on an AI-assisted SDLC framework that standardized project setup, prototyping, and documentation from the start of development.',
      'Improved Angular application loading by up to 25% through standalone components, deferred views, and lazy-loading refinements; reduced build pipeline time by 40% using the Vite builder.',
    ],
    tags: ['TypeScript', 'NestJS', 'DDD', 'SAGA', 'CQRS', 'Transactional Outbox', 'Kafka', 'Angular', 'Vite'],
  },
  {
    id: 'highlevel',
    company: 'HighLevel LLC',
    role: 'Software Development Engineer III',
    period: 'Mar 2023 – Dec 2023',
    start: '2023-03',
    summary:
      'Built an Agentic RAG platform with grounding, RBAC and guardrails, and exposed product APIs to AI agents via an MCP server.',
    highlights: [
      'Built an Agentic RAG system with response grounding, RBAC, sensitive-data masking, and guardrails to reduce hallucination and improve response quality; the delivered capability was associated with 15% higher customer retention and 10% higher DAU.',
      'Designed a modular retrieval pipeline spanning website crawling/document parsing, configurable fixed-size/recursive/semantic chunking, retrieval, prompt construction, and summarization services.',
      'Used event-driven processing and a centralized Redis store to distribute and parallelize work; implemented rate limiting and access-control protections.',
      'Exposed existing APIs through an MCP server as a foundation for agent-based integrations.',
    ],
    tags: ['Agentic RAG', 'LangChain', 'MCP', 'Redis', 'RBAC', 'LLM Guardrails'],
  },
  {
    id: 'iwebservices',
    company: 'iWebServices',
    role: 'Senior Software Engineer',
    period: '2022 – 2023',
    start: '2022-01',
    summary:
      'Delivered high-volume fintech workflows, a backend-for-frontend orchestration layer, and a micro-frontend architecture with SSR-based SEO improvements.',
    highlights: [
      'Developed fintech workflows that handled high-volume user data and used Cassandra to support high write throughput.',
      'Helped build a backend-for-frontend (BFF) layer to orchestrate frontend communication with backend services.',
      'Implemented caching and cache-invalidation logic to address recurring cache consistency issues.',
      'Built React and Angular remote applications for a micro-frontend architecture and improved SEO/perceived performance using SSR, semantic HTML, metadata, skeleton states, and chunked loading.',
    ],
    tags: ['Node.js', 'BFF', 'Cassandra', 'Redis', 'Micro-frontends', 'React', 'Angular', 'SSR'],
  },
  {
    id: 'contata',
    company: 'Contata',
    role: 'Software Developer',
    period: '2020 – 2022',
    start: '2020-01',
    summary:
      'Engineered low-latency WebTransport communication and speech-to-text tooling for a virtual courtroom platform.',
    highlights: [
      'Built a WebTransport-based communication channel for text and voice between peers in a virtual courtroom, focusing on low-latency and secure communication.',
      'Integrated speech-to-text capabilities for live captions and transcript generation to support court-proceeding records.',
      'Developed document search, sharing, and signing capabilities to make case materials easier to retrieve and reference.',
    ],
    tags: ['WebTransport', 'Real-time', 'Speech-to-Text', 'Node.js'],
  },
  {
    id: 'smart-cube',
    company: 'The Smart Cube',
    role: 'Associate Engineer',
    period: '2018 – 2019',
    start: '2018-07',
    summary:
      'Worked on a full-stack fleet analytics platform serving 100K+ daily active users, with high-frequency sensor visualization.',
    highlights: [
      'Worked on a full-stack fleet analytics platform, improving the core reasoning framework for expense tracking, trend forecasting, and savings analysis.',
      'Supported microservices serving more than 100K daily active users and resolved production defects.',
      'Built data-visualization components with D3 and SVG for high-frequency sensor data over WAMP, minimizing unnecessary rendering/layout work.',
    ],
    tags: ['Microservices', 'D3.js', 'SVG', 'WAMP', 'Analytics'],
  },
];
