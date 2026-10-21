import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NAV_LINKS, PROFILE } from './core/data/profile.data';
import { UiIcon } from './shared/ui/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UiIcon],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly navLinks = NAV_LINKS;
  protected readonly profile = PROFILE;
  protected readonly sidebarOpen = signal(false);
  protected readonly sectionTitle = signal('Overview');

  private readonly navRef = viewChild<ElementRef<HTMLElement>>('primaryNav');
  private readonly menuBtnRef = viewChild<ElementRef<HTMLButtonElement>>('menuBtn');

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.resolveTitle(this.router.routerState.snapshot.root)),
      )
      .pipe(takeUntilDestroyed())
      .subscribe((title) => {
        this.sectionTitle.set(title);
        this.closeSidebar();
      });

    this.sectionTitle.set(this.resolveTitle(this.router.routerState.snapshot.root));

    // Lock background scrolling while the mobile drawer is open.
    effect(() => {
      this.document.documentElement.classList.toggle('is-locked', this.sidebarOpen());
    });

    this.destroyRef.onDestroy(() => {
      this.document.documentElement.classList.remove('is-locked');
    });
  }

  protected toggleSidebar(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
      return;
    }

    this.sidebarOpen.set(true);
    this.navRef()?.nativeElement.focus();
  }

  protected closeSidebar(): void {
    if (!this.sidebarOpen()) {
      return;
    }
    this.sidebarOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    if (!this.sidebarOpen()) {
      return;
    }
    this.closeSidebar();
    this.menuBtnRef()?.nativeElement.focus();
  }

  private resolveTitle(route: Router['routerState']['snapshot']['root']): string {
    let r: typeof route = route;
    let title = r.data['title'] ?? 'Overview';
    while (r.firstChild) {
      r = r.firstChild;
      if (r.data['title']) {
        title = r.data['title'];
      }
    }
    return String(title);
  }
}
