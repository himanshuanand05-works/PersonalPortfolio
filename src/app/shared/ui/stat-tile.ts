import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  input,
  signal,
} from '@angular/core';
import { observeInView, prefersReducedMotion } from '../utils/in-view';

interface ParsedValue {
  target: number;
  suffix: string;
  decimals: number;
  grouped: boolean;
}

@Component({
  selector: 'ui-stat-tile',
  template: `
    <div class="stat">
      <span class="stat__value">{{ displayValue() || value() }}</span>
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
        transition:
          border-color 0.2s ease,
          box-shadow 0.25s ease,
          transform 0.25s var(--ease-out);
      }

      .stat:hover {
        border-color: var(--accent-line);
        box-shadow: 0 14px 40px -22px var(--accent-glow);
        transform: translateY(-3px);
      }

      .stat__value {
        font-family: var(--font-mono);
        font-size: 1.9rem;
        font-weight: 700;
        line-height: 1.1;
        color: var(--accent);
        text-shadow: 0 0 24px var(--accent-glow);
        font-variant-numeric: tabular-nums;
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

      @media (prefers-reduced-motion: reduce) {
        .stat:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class UiStatTile implements OnDestroy {
  value = input.required<string>();
  label = input.required<string>();
  detail = input<string>();

  protected readonly displayValue = signal('');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private teardown: (() => void) | undefined;

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const parsed = this.parse(this.value());
    if (!parsed) {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    // Start from zero so the tile never flashes its final value before counting up.
    this.displayValue.set(this.format(0, parsed));

    this.teardown = observeInView(this.host.nativeElement, () => this.run(parsed));
  }

  ngOnDestroy(): void {
    this.teardown?.();
  }

  private parse(raw: string): ParsedValue | null {
    const match = /^([\d][\d.,]*)(.*)$/.exec(raw.trim());
    if (!match) {
      return null;
    }

    const digits = match[1];
    const target = Number(digits.replace(/,/g, ''));
    if (!Number.isFinite(target) || target <= 0) {
      return null;
    }

    return {
      target,
      suffix: match[2],
      decimals: digits.split('.')[1]?.length ?? 0,
      grouped: digits.includes(','),
    };
  }

  private format(current: number, parsed: ParsedValue): string {
    const value = parsed.grouped
      ? Math.round(current).toLocaleString('en-US')
      : current.toFixed(parsed.decimals);
    return `${value}${parsed.suffix}`;
  }

  private run(parsed: ParsedValue): void {
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValue.set(this.format(parsed.target * eased, parsed));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        this.displayValue.set(this.value());
      }
    };

    this.displayValue.set(this.format(0, parsed));
    requestAnimationFrame(tick);
  }
}
