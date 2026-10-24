import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-section-header',
  template: `
    <header class="section-header">
      <span class="section-header__kicker">{{ kicker() }}</span>
      <h1 class="section-header__title">{{ title() }}</h1>
      @if (lead()) {
        <p class="section-header__lead">{{ lead() }}</p>
      }
      <div class="section-header__meta">
        <ng-content />
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .section-header {
        margin-bottom: 28px;
      }

      .section-header__kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: 10px;
      }

      .section-header__kicker::before {
        content: '';
        width: 18px;
        height: 1px;
        background: var(--accent);
      }

      .section-header__title {
        font-size: clamp(1.7rem, 3.4vw, 2.4rem);
        font-weight: 700;
        margin: 0 0 10px;
        color: var(--text-1);
      }

      .section-header__lead {
        max-width: 68ch;
        font-size: 1.02rem;
        color: var(--text-2);
        margin: 0;
      }

      .section-header__meta:empty {
        display: none;
      }

      .section-header__meta {
        margin-top: 14px;
      }

      @media (max-width: 640px) {
        .section-header {
          margin-bottom: 20px;
        }

        .section-header__lead {
          font-size: 0.94rem;
        }
      }
    `,
  ],
})
export class UiSectionHeader {
  kicker = input.required<string>();
  title = input.required<string>();
  lead = input<string>();
}
