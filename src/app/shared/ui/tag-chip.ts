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
      }

      .chip--accent {
        color: var(--accent);
        background: var(--accent-soft);
        border-color: var(--accent-line);
      }
    `,
  ],
})
export class UiTagChip {
  label = input.required<string>();
  accent = input(false, { transform: booleanAttribute });
}
