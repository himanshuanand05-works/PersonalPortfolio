import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, OnDestroy, PLATFORM_ID, inject, input, signal } from '@angular/core';
import { observeInView, prefersReducedMotion } from '../utils/in-view';

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
        <div class="skill__fill" [style.width.%]="displayLevel() ?? 0"></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .skill {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 6px;
      }

      .skill__row {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
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
        transition: width 0.9s var(--ease-out);
      }

      @media (max-width: 480px) {
        .skill__note {
          margin-left: 0;
        }
      }
    `,
  ],
})
export class UiSkillBar implements OnDestroy {
  name = input.required<string>();
  level = input.required<number>();
  note = input<string>();

  protected readonly displayLevel = signal<number | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private teardown: (() => void) | undefined;

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    if (prefersReducedMotion()) {
      this.displayLevel.set(this.level());
      return;
    }

    this.teardown = observeInView(this.host.nativeElement, () => {
      this.displayLevel.set(0);
      // Two frames: the first paints the empty track, the second starts the fill.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.displayLevel.set(this.level()));
      });
    });
  }

  ngOnDestroy(): void {
    this.teardown?.();
  }
}
