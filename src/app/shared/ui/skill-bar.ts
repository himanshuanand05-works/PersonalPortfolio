import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-skill-bar',
  template: `
    <div class="skill">
      <div class="skill__row">
        <span class="skill__name">{{ name() }}</span>
        @if (note()) {
          <span class="skill__note">{{ note() }}</span>
        }
        <span class="skill__level">{{ level() }}%</span>
      </div>
      <div class="skill__track" role="presentation">
        <div class="skill__fill" [style.width.%]="level()"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .skill {
        display: grid;
        gap: 6px;
      }

      .skill__row {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }

      .skill__name {
        font-size: 0.9rem;
        font-weight: 550;
        color: var(--text-1);
      }

      .skill__note {
        font-size: 0.74rem;
        color: var(--text-3);
        margin-left: auto;
        font-family: var(--font-mono);
      }

      .skill__level {
        font-family: var(--font-mono);
        font-size: 0.74rem;
        color: var(--accent);
      }

      .skill__note + .skill__level {
        margin-left: 0;
      }

      .skill__track {
        height: 5px;
        border-radius: 4px;
        background: rgba(148, 163, 184, 0.1);
        overflow: hidden;
      }

      .skill__fill {
        height: 100%;
        border-radius: 4px;
        background: linear-gradient(90deg, rgba(0, 255, 156, 0.55), var(--accent));
        box-shadow: 0 0 12px var(--accent-glow);
      }
    `,
  ],
})
export class UiSkillBar {
  name = input.required<string>();
  level = input.required<number>();
  note = input<string>();
}
