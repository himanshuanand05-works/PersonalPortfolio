import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ARTICLES } from '../../core/data/generated/articles.generated';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiPanel } from '../../shared/ui/panel';
import { UiTagChip } from '../../shared/ui/tag-chip';
import { UiIcon } from '../../shared/ui/icon';

@Component({
  imports: [RouterLink, UiSectionHeader, UiPanel, UiTagChip, UiIcon],
  styleUrl: './knowledge.scss',
  templateUrl: './knowledge.html',
})
export class KnowledgePage {
  protected readonly articles = ARTICLES;

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Knowledge',
      description:
        'Engineering write-ups by Himanshu Anand on event-driven reliability (transactional outbox, idempotency) and building Agentic RAG systems with guardrails, RBAC and grounding.',
      path: '/knowledge',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Knowledge', path: '/knowledge' },
    ]));
  }
}
