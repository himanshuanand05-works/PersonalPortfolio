import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../core/data/profile.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiPanel } from '../../shared/ui/panel';
import { UiIcon } from '../../shared/ui/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [RouterLink, UiSectionHeader, UiPanel, UiIcon, RevealDirective],
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class ContactPage {
  protected readonly profile = PROFILE;
  protected readonly pdfHref = 'resume/Himanshu_Anand_Resume.pdf';

  protected stagger(index: number): number {
    return Math.min(index, 5) * 70;
  }

  protected readonly emailHref = `mailto:${PROFILE.email}?subject=Opportunity%20for%20${encodeURIComponent(
    PROFILE.name,
  )}`;
  protected readonly telHref = `tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`;

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Contact',
      description: `Contact ${PROFILE.name} — ${PROFILE.headline} in ${PROFILE.location}. Email ${PROFILE.email}, phone ${PROFILE.phone}, or connect on LinkedIn and GitHub. Open to senior backend and full-stack opportunities.`,
      path: '/contact',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]));
    jsonLd.upsert('contact-page', {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: 'https://himanshuanand.dev/contact',
      name: `Contact ${PROFILE.name}`,
      mainEntity: {
        '@type': 'Person',
        name: PROFILE.name,
        email: PROFILE.email,
        telephone: PROFILE.phone,
        sameAs: PROFILE.socials.filter((s) => s.icon !== 'mail').map((s) => s.url),
      },
    });
  }
}
