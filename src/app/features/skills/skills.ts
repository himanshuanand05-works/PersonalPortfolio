import { Component, inject } from '@angular/core';
import { SKILL_GROUPS } from '../../core/data/skills.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiPanel } from '../../shared/ui/panel';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiSkillBar } from '../../shared/ui/skill-bar';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [UiPanel, UiSectionHeader, UiSkillBar, RevealDirective],
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class SkillsPage {
  protected readonly groups = SKILL_GROUPS;
  protected readonly allSkills = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.name));

  protected stagger(index: number): number {
    return Math.min(index, 4) * 80;
  }

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Skills',
      description:
        'Himanshu Anand’s technical skills: Node.js, TypeScript, NestJS, microservices, DDD, CQRS, SAGA, Kafka, Redis, MongoDB, PostgreSQL, Cassandra, AWS/GCP/Azure, Angular, React, Agentic RAG, LangChain, MCP and LLM guardrails.',
      path: '/skills',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Skills', path: '/skills' },
    ]));
  }
}
