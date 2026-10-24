import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { observeInView, prefersReducedMotion } from '../utils/in-view';

/**
 * Fades and lifts an element into place the first time it scrolls into view.
 *
 * Usage: `<div appReveal [revealDelay]="120">` — the delay staggers siblings.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly revealDelay = input(0);

  private teardown: (() => void) | undefined;

  ngOnInit(): void {
    const element = this.host.nativeElement;

    if (prefersReducedMotion()) {
      element.classList.add('reveal', 'reveal--visible');
      return;
    }

    const delay = this.revealDelay();
    if (delay > 0) {
      element.style.setProperty('--reveal-delay', `${delay}ms`);
    }

    element.classList.add('reveal');
    this.teardown = observeInView(element, () => element.classList.add('reveal--visible'));
  }

  ngOnDestroy(): void {
    this.teardown?.();
  }
}
