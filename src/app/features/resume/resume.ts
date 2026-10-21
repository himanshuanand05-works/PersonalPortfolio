import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from '../../core/data/profile.data';
import { EXPERIENCE } from '../../core/data/experience.data';
import { SKILL_GROUPS } from '../../core/data/skills.data';
import { PROJECTS } from '../../core/data/projects.data';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiSectionHeader } from '../../shared/ui/section-header';
import { UiPanel } from '../../shared/ui/panel';
import { UiTagChip } from '../../shared/ui/tag-chip';
import { UiIcon } from '../../shared/ui/icon';

@Component({
  imports: [RouterLink, UiSectionHeader, UiPanel, UiTagChip, UiIcon],
  styleUrl: './resume.scss',
  templateUrl: './resume.html',
})
export class ResumePage {
  protected readonly profile = PROFILE;
  protected readonly experiences = EXPERIENCE;
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly projects = PROJECTS;
  protected readonly education = EDUCATION;
  protected readonly certifications = CERTIFICATIONS;
  protected readonly achievements = ACHIEVEMENTS;
  protected readonly pdfHref = 'resume/Himanshu_Anand_Resume.pdf';

  constructor() {
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    seo.set({
      title: 'Resume',
      description: `HTML resume of ${PROFILE.name} — ${PROFILE.headline}, ${PROFILE.location}. ${PROFILE.summary}`,
      path: '/resume',
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume' },
    ]));
  }
}
