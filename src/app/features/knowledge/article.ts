import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARTICLES, ARTICLE_BY_SLUG } from '../../core/data/generated/articles.generated';
import { SeoService } from '../../core/services/seo.service';
import { JsonLdService } from '../../core/services/json-ld.service';
import { UiTagChip } from '../../shared/ui/tag-chip';
import { UiIcon } from '../../shared/ui/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [RouterLink, UiTagChip, UiIcon, RevealDirective],
  styleUrl: './article.scss',
  templateUrl: './article.html',
})
export class ArticlePage {
  protected readonly article;

  constructor() {
    const route = inject(ActivatedRoute);
    const seo = inject(SeoService);
    const jsonLd = inject(JsonLdService);

    const slug = route.snapshot.paramMap.get('slug') ?? '';
    const found = ARTICLE_BY_SLUG[slug] ?? ARTICLES[0];
    this.article = signal(found).asReadonly();

    seo.set({
      title: found.title,
      description: found.description,
      path: `/knowledge/${found.slug}`,
      type: 'article',
      dateModified: found.date,
    });

    jsonLd.upsert('person', jsonLd.person());
    jsonLd.upsert('article', jsonLd.article(found));
    jsonLd.upsert('breadcrumb', jsonLd.breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Knowledge', path: '/knowledge' },
      { name: found.title, path: `/knowledge/${found.slug}` },
    ]));
  }
}
