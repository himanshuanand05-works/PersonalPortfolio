import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-stat-tile',
  template: `
    <div class="stat">
      <span class="stat__value">{{ value() }}</span>
      <span class="stat__label">{{ label() }}</span>
      @if (detail()) {
        <span class="stat__detail">{{ detail() }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 18px 20px;
        background: rgba(10, 15, 28, 0.7);
        border: 1px solid var(--line);
        border-radius: 12px;
        transition: border-color 0.2s ease, transform 0.2s ease;
      }

      .stat:hover {
        border-color: var(--accent-line);
        transform: translateY(-2px);
      }

      .stat__value {
        font-family: var(--font-mono);
        font-size: 1.9rem;
        font-weight: 700;
        line-height: 1.1;
        color: var(--accent);
        text-shadow: 0 0 24px var(--accent-glow);
      }

      .stat__label {
        font-size: 0.86rem;
        font-weight: 600;
        color: var(--text-1);
        margin-top: 4px;
      }

      .stat__detail {
        font-size: 0.78rem;
        color: var(--text-3);
      }

      @media (max-width: 640px) {
        .stat {
          padding: 14px 14px 16px;
        }

        .stat__value {
          font-size: 1.5rem;
        }

        .stat__label {
          font-size: 0.8rem;
        }

        .stat__detail {
          font-size: 0.72rem;
        }
      }
    `,
  ],
})
export class UiStatTile {
  value = input.required<string>();
  label = input.required<string>();
  detail = input<string>();
}
