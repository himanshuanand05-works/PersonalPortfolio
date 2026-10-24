import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { UiPanel } from '../../shared/ui/panel';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [RouterLink, UiPanel, RevealDirective],
  template: `
    <section class="nf" appReveal>
      <ui-panel kicker="404" title="Signal lost">
        <p>This route doesn’t exist — but the main systems are all online.</p>
        <p class="nf__links">
          <a routerLink="/">Back to overview</a>
          <a routerLink="/projects">Projects</a>
          <a routerLink="/contact">Contact</a>
        </p>
      </ui-panel>
    </section>
  `,
  styles: [
    `
      .nf {
        max-width: 520px;
      }

      .nf__links {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin: 0;
      }
    `,
  ],
})
export class NotFoundPage {
  constructor() {
    inject(SeoService).set({
      title: 'Page not found',
      description: 'The requested page could not be found.',
      path: '/404',
    });
  }
}
