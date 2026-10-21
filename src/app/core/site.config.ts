import { InjectionToken } from '@angular/core';

export interface SiteConfig {
  siteUrl: string;
  siteName: string;
  tagline: string;
  locale: string;
  jobTitle: string;
  location: string;
  sameAs: string[];
}

export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG');

export const SITE_CONFIG_VALUE: SiteConfig = {
  // Optional absolute override. Leave '' to auto-derive the base from the
  // deployed document.baseURI (respects --base-href), so the site works at any URL.
  siteUrl: '',
  siteName: 'Himanshu Anand',
  tagline: 'Senior Full-Stack & Node.js Backend Engineer',
  locale: 'en-US',
  jobTitle: 'Lead / Senior Software Engineer',
  location: 'Noida, India',
  sameAs: [
    'https://linkedin.com/in/himanshuanand05',
    'https://github.com/himanshuanand05-works',
    'https://www.npmjs.com/~himanshuanand05-works',
  ],
};
