import { Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'ui-panel',
  template: `
    <section class="panel" [class.panel--wide]="wide()">
      @if (kicker() || title()) {
        <header class="panel__head">
          <div class="panel__titles">
            @if (kicker()) {
              <span class="panel__kicker">{{ kicker() }}</span>
            }
            @if (title()) {
              <h2 class="panel__title">{{ title() }}</h2>
            }
          </div>
          <div class="panel__actions">
            <ng-content select="[actions]" />
          </div>
        </header>
      }
      <div class="panel__body">
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .panel {
        position: relative;
        background: linear-gradient(180deg, rgba(20, 32, 58, 0.55), rgba(14, 21, 36, 0.9));
        border: 1px solid var(--line);
        border-radius: var(--radius);
        padding: 22px 24px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .panel:hover {
        border-color: var(--accent-line);
        box-shadow: 0 0 0 1px rgba(0, 255, 156, 0.06), 0 12px 40px -18px var(--accent-glow);
      }

      .panel::before {
        content: '';
        position: absolute;
        top: -1px;
        left: 22px;
        width: 42px;
        height: 2px;
        background: linear-gradient(90deg, var(--accent), transparent);
        border-radius: 2px;
      }

      .panel__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }

      .panel__kicker {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.68rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: 4px;
      }

      .panel__title {
        font-size: 1.15rem;
        font-weight: 650;
        color: var(--text-1);
        margin: 0;
      }

      .panel__body {
        color: var(--text-2);
      }

      .panel--wide {
        grid-column: 1 / -1;
      }

      @media (max-width: 640px) {
        .panel {
          padding: 16px 16px 18px;
        }

        .panel::before {
          left: 16px;
        }

        .panel__head {
          gap: 10px;
          margin-bottom: 12px;
        }

        .panel__title {
          font-size: 1.05rem;
        }
      }
    `,
  ],
})
export class UiPanel {
  kicker = input<string>();
  title = input<string>();
  wide = input(false, { transform: booleanAttribute });
}
