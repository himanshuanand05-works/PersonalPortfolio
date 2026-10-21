import { Component, inject } from '@angular/core';
import { FAQS } from '../../core/data/faq.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiPanel } from '../../shared/ui/panel';

@Component({
  imports: [UiSectionHeader, UiPanel],
  styleUrl: './faq.scss',
  templateUrl: './faq.html',
})
export class FaqPage {
  protected readonly faqs = FAQS;

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'FAQ',
      description:
        'Quick answers about Himanshu Anand: who he is, what he specializes in, his microservices and AI experience, results delivered, and how to contact him.',
      path: '/faq',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('faq-page', jsonLd.faqPage(FAQS, '/faq'));
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ]));
  }
}
