import { Component, inject } from '@angular/core';
import { PROJECTS } from '../../core/data/projects.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiTagChip } from '../../shared/ui/tag-chip';
import { UiIcon } from '../../shared/ui/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [UiSectionHeader, UiTagChip, UiIcon, RevealDirective],
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class ProjectsPage {
  protected readonly projects = PROJECTS;

  protected stagger(index: number): number {
    return Math.min(index, 5) * 70;
  }

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Projects',
      description:
        'Some selected personal projects by Himanshu Anand: an AI Financial Wellness Assistant, a face clustering library published on npm, and a toddler alphabet learning app.',
      path: '/projects',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]));
  }
}
