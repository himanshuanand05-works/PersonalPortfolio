import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE, ACHIEVEMENTS } from '../../core/data/profile.data';
import { PROJECTS } from '../../core/data/projects.data';
import { SKILL_GROUPS } from '../../core/data/skills.data';
import { EXPERIENCE } from '../../core/data/experience.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiPanel } from '../../shared/ui/panel';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiStatTile } from '../../shared/ui/stat-tile';
import { UiTagChip } from '../../shared/ui/tag-chip';
import { UiIcon } from '../../shared/ui/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [
    RouterLink,
    UiPanel,
    UiSectionHeader,
    UiStatTile,
    UiTagChip,
    UiIcon,
    RevealDirective,
  ],
  styleUrl: './overview.scss',
  templateUrl: './overview.html',
})
export class OverviewPage {
  protected readonly profile = PROFILE;
  protected readonly projects = PROJECTS;
  protected readonly achievements = ACHIEVEMENTS;
  protected readonly latest = EXPERIENCE[0];
  protected readonly topSkills = SKILL_GROUPS.flatMap((g) => g.skills)
    .sort((a, b) => b.level - a.level)
    .slice(0, 10);

  protected stagger(index: number): number {
    return Math.min(index, 4) * 70;
  }

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Senior Full-Stack & Node.js Backend Engineer',
      description: PROFILE.shortAnswer,
      path: '/',
    });

    jsonLd.upsert('website', jsonLd.website());
    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('profile-page', jsonLd.profilePage('/'));
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([{ name: 'Home', path: '/' }]));
  }
}
