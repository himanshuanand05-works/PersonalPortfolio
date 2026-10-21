import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_CONFIG } from '../site.config';

export interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  dateModified?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly config = inject(SITE_CONFIG);

  set(options: SeoOptions): void {
    const url = `${this.base}${options.path}`;
    const fullTitle =
      options.path === '/'
        ? `${this.config.siteName} — ${this.config.tagline}`
        : `${options.title} · ${this.config.siteName}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ name: 'author', content: this.config.siteName });
    this.updateCanonical(url);

    this.meta.updateTag({ property: 'og:type', content: options.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.config.siteName });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: this.config.locale });
    if (options.image) {
      this.meta.updateTag({ property: 'og:image', content: options.image });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });

    if (options.dateModified) {
      this.meta.updateTag({ name: 'dateModified', content: options.dateModified });
    }
  }

  /**
   * Absolute base (no trailing slash). Prefers the configured siteUrl override;
   * otherwise falls back to the deployed document.baseURI so canonical/OG URLs
   * are correct regardless of host or --base-href.
   */
  private get base(): string {
    return (this.config.siteUrl || this.doc.baseURI).replace(/\/+$/, '');
  }

  private updateCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
