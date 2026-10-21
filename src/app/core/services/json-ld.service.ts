import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SITE_CONFIG } from '../site.config';
import { PROFILE } from '../data/profile.data';

type JsonLd = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly doc = inject(DOCUMENT);
  private readonly config = inject(SITE_CONFIG);

  /**
   * Absolute base (no trailing slash) for `@id`/`url`/`mainEntityOfPage`.
   * Prefers the configured siteUrl override; otherwise falls back to the
   * deployed document.baseURI so structured data is correct on any host.
   */
  private get base(): string {
    return (this.config.siteUrl || this.doc.baseURI).replace(/\/+$/, '');
  }

  person(): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.base}/#person`,
      name: this.config.siteName,
      headline: this.config.tagline,
      description: PROFILE.shortAnswer,
      jobTitle: this.config.jobTitle,
      email: PROFILE.email,
      telephone: PROFILE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: this.config.location,
      },
      url: this.base,
      sameAs: this.config.sameAs,
      knowsAbout: [
        'Node.js',
        'TypeScript',
        'NestJS',
        'Microservices',
        'Domain-driven design',
        'Event-driven architecture',
        'CQRS',
        'SAGA pattern',
        'Transactional outbox',
        'Kafka',
        'Redis',
        'Angular',
        'React',
        'Agentic RAG',
        'MCP (Model Context Protocol)',
        'LLM guardrails',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'JSS Academy of Technical Education, Noida',
      },
    };
  }

  website(): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.base}/#website`,
      name: this.config.siteName,
      description: PROFILE.shortAnswer,
      url: `${this.base}/`,
      inLanguage: this.config.locale,
      publisher: { '@id': `${this.base}/#person` },
      mainEntity: { '@id': `${this.base}/#person` },
    };
  }

  profilePage(path = '/'): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${this.base}${path}#webpage`,
      name: `${this.config.siteName} — ${this.config.tagline}`,
      url: `${this.base}${path}`,
      isPartOf: { '@id': `${this.base}/#website` },
      mainEntity: { '@id': `${this.base}/#person` },
      about: { '@id': `${this.base}/#person` },
    };
  }

  breadcrumb(items: { name: string; path: string }[]): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${this.base}${item.path}`,
      })),
    };
  }

  faqPage(items: { question: string; answer: string }[], path: string): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${this.base}${path}#faq`,
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }

  article(options: { title: string; description: string; slug: string; date: string }): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: options.title,
      description: options.description,
      datePublished: options.date,
      dateModified: options.date,
      author: { '@id': `${this.base}/#person` },
      publisher: { '@id': `${this.base}/#person` },
      mainEntityOfPage: `${this.base}/knowledge/${options.slug}`,
      inLanguage: this.config.locale,
      keywords: options.title,
    };
  }

  /** Upserts a JSON-LD script tag; runs in constructor context so prerender serializes it. */
  upsert(id: string, data: JsonLd | JsonLd[]): void {
    const selector = `script[type="application/ld+json"][data-jsonld="${id}"]`;
    let script = this.doc.querySelector<HTMLScriptElement>(selector);
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-jsonld', id);
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
