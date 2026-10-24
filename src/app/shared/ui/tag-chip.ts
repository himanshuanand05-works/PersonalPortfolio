import { Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'ui-tag-chip',
  template: `
    <span class="chip" [class.chip--accent]="accent()">
      {{ label() }}
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        color: var(--text-2);
        background: rgba(148, 163, 184, 0.08);
        border: 1px solid var(--line);
        border-radius: 999px;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        transition:
          color 0.2s ease,
          border-color 0.2s ease,
          background 0.2s ease,
          transform 0.2s var(--ease-out);
      }

      .chip:hover {
        color: var(--text-1);
        border-color: var(--accent-line);
        transform: translateY(-1px);
      }

      .chip--accent {
        color: var(--accent);
        background: var(--accent-soft);
        border-color: var(--accent-line);
      }

      @media (prefers-reduced-motion: reduce) {
        .chip:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class UiTagChip {
  label = input.required<string>();
  accent = input(false, { transform: booleanAttribute });
}
