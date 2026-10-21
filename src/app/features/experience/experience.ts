import { Component, inject } from '@angular/core';
import { EXPERIENCE } from '../../core/data/experience.data';
import { PROFILE } from '../../core/data/profile.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiPanel } from '../../shared/ui/panel';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiTagChip } from '../../shared/ui/tag-chip';

@Component({
  imports: [UiPanel, UiSectionHeader, UiTagChip],
  styleUrl: './experience.scss',
  templateUrl: './experience.html',
})
export class ExperiencePage {
  protected readonly experiences = EXPERIENCE;
  protected readonly journey =
    'Himanshu Anand’s career journey runs from full-stack fleet analytics at The Smart Cube (100K+ DAU microservices), through real-time courtroom systems at Contata and fintech micro-frontends at iWebServices, to Agentic RAG platforms at HighLevel and lead-level distributed systems engineering at DBiz-AI using DDD, SAGA and CQRS.';

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Experience',
      description: `${this.journey} Open to senior backend opportunities — ${PROFILE.email}.`,
      path: '/experience',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Experience', path: '/experience' },
    ]));
  }
}
